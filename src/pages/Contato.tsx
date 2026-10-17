import { useRef, useState, type FormEvent } from 'react'
import { Icon } from '../components/Icon'
import { Button, CopyButton, PageHeader, Placeholder } from '../components/ui'
import { placeholders, site } from '../content/site'
import { ContactNotConfigured, sendContact, type ContactPayload } from '../services/contact'

type Errors = Partial<Record<keyof ContactPayload, string>>
type Status = 'idle' | 'sending' | 'sent' | 'not-configured' | 'error'

const subjects = ['Dúvida', 'Sugestão', 'Solicitação', 'Outro assunto']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v: ContactPayload): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 3) e.name = 'Informe seu nome com pelo menos 3 letras.'
  if (!v.email.trim()) e.email = 'Informe seu e-mail.'
  else if (!EMAIL.test(v.email.trim())) e.email = 'Esse e-mail parece incompleto. Exemplo: nome@exemplo.com'
  if (!v.subject) e.subject = 'Escolha um assunto.'
  if (v.message.trim().length < 10) e.message = 'Escreva uma mensagem com pelo menos 10 caracteres.'
  else if (v.message.length > 1500) e.message = 'A mensagem passa de 1500 caracteres. Resuma um pouco.'
  return e
}

const labels: Record<keyof ContactPayload, string> = { name: 'Nome', email: 'E-mail', subject: 'Assunto', message: 'Mensagem' }
const order: (keyof ContactPayload)[] = ['name', 'email', 'subject', 'message']

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label} <span className="font-normal text-muted">(obrigatório)</span>
      </label>
      {children}
      {hint && !error && <p id={`${id}-d`} className="mt-1.5 text-sm text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-d`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-ink">
          <Icon name="warning" size={16} className="mt-0.5 shrink-0 text-accent-text" />
          {error}
        </p>
      )}
    </div>
  )
}

export function Contato() {
  const [values, setValues] = useState<ContactPayload>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorText, setErrorText] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const set = (k: keyof ContactPayload) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }
  const blur = (k: keyof ContactPayload) => () => {
    const msg = validate(values)[k]
    setErrors((x) => ({ ...x, [k]: msg }))
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = order.find((k) => found[k])
    if (first) {
      setStatus('idle')
      formRef.current?.querySelector<HTMLElement>(`#c-${first}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      await sendContact({ ...values, name: values.name.trim(), email: values.email.trim(), message: values.message.trim() })
      setStatus('sent')
      setValues({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      if (err instanceof ContactNotConfigured) setStatus('not-configured')
      else {
        setErrorText(err instanceof Error ? err.message : 'Erro desconhecido.')
        setStatus('error')
      }
    }
  }

  const invalid = order.filter((k) => errors[k])
  const input = (k: keyof ContactPayload) =>
    `min-h-[46px] w-full rounded-md border-2 bg-surface px-3 py-2 text-fg ${errors[k] ? 'border-ink' : 'border-line'}`
  const aria = (k: keyof ContactPayload) => ({
    id: `c-${k}`,
    name: k,
    'aria-invalid': errors[k] ? (true as const) : undefined,
    'aria-describedby': errors[k] || k === 'message' ? `c-${k}-d` : undefined,
    required: true,
    onBlur: blur(k),
  })
  const draft = `Assunto: ${values.subject || '(sem assunto)'}\nDe: ${values.name} <${values.email}>\n\n${values.message}`

  return (
    <>
      <PageHeader eyebrow="Fale com a gestão" title="Contato e participação" lead="Dúvidas, sugestões e solicitações dos estudantes chegam à gestão por aqui. Também mostramos como participar das atividades do Centro Acadêmico." />
      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[1.3fr_1fr]">
        <section aria-labelledby="form-t" className="min-w-0">
          <h2 id="form-t" className="display text-2xl">Envie uma mensagem</h2>

          {invalid.length > 0 && (
            <div role="alert" className="mt-5 rounded-md border-2 border-ink bg-surface p-4">
              <p className="font-semibold text-ink">Corrija {invalid.length === 1 ? 'este campo' : 'estes campos'} para enviar:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {invalid.map((k) => (
                  <li key={k}>
                    <a className="underline underline-offset-4" href={`#contato`} onClick={(e) => { e.preventDefault(); formRef.current?.querySelector<HTMLElement>(`#c-${k}`)?.focus() }}>
                      {labels[k]}
                    </a>
                    : {errors[k]}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form ref={formRef} noValidate onSubmit={onSubmit} className="mt-6 grid gap-5">
            <Field id="c-name" label="Nome" error={errors.name}>
              <input type="text" autoComplete="name" value={values.name} onChange={set('name')} className={input('name')} {...aria('name')} />
            </Field>
            <Field id="c-email" label="E-mail" error={errors.email}>
              <input type="email" autoComplete="email" inputMode="email" value={values.email} onChange={set('email')} className={input('email')} {...aria('email')} />
            </Field>
            <Field id="c-subject" label="Assunto" error={errors.subject}>
              <select value={values.subject} onChange={set('subject')} className={input('subject')} {...aria('subject')}>
                <option value="">Escolha um assunto</option>
                {subjects.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field id="c-message" label="Mensagem" error={errors.message} hint={`${values.message.length} de 1500 caracteres`}>
              <textarea rows={6} value={values.message} onChange={set('message')} className={input('message')} {...aria('message')} />
            </Field>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
                <Icon name="arrow" size={18} />
              </Button>
            </div>
          </form>

          <div role="status" aria-live="polite" className="mt-6">
            {status === 'sent' && (
              <p className="flex items-start gap-2 rounded-md border-2 border-ink bg-surface p-4 font-medium text-ink">
                <Icon name="check" className="mt-0.5 shrink-0 text-accent-text" /> Mensagem enviada. A gestão responde pelo e-mail informado.
              </p>
            )}
            {status === 'not-configured' && (
              <div className="rounded-md border-2 border-dashed border-ink bg-surface p-5">
                <p className="font-semibold text-ink">Os campos estão corretos, mas nada foi enviado.</p>
                <p className="mt-2 text-sm text-muted">
                  Este site ainda não tem um serviço de recebimento de mensagens ligado. Copie o texto e envie para o e-mail do Centro Acadêmico: {site.email ?? <Placeholder>{placeholders.email}</Placeholder>}
                </p>
                <div className="mt-4"><CopyButton getText={() => draft} label="Copiar mensagem" doneLabel="Mensagem copiada" /></div>
              </div>
            )}
            {status === 'error' && (
              <p className="rounded-md border-2 border-ink bg-surface p-4 text-sm">
                <span className="font-semibold text-ink">Não foi possível enviar.</span> {errorText} Tente de novo em alguns minutos.
              </p>
            )}
          </div>
        </section>

        <div className="min-w-0 space-y-10">
          <section aria-labelledby="canais-t">
            <h2 id="canais-t" className="display text-2xl">Canais oficiais</h2>
            <dl className="mt-5 space-y-4">
              {([
                ['E-mail institucional', site.email, placeholders.email, 'mail'],
                ['Instagram', site.instagram, placeholders.instagram, 'user'],
                ['Localização', site.location, placeholders.location, 'pin'],
                ['Atendimento', site.openingHours, placeholders.openingHours, 'clock'],
              ] as const).map(([k, v, ph, icon]) => (
                <div key={k} className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-night text-orange"><Icon name={icon} size={20} /></span>
                  <div className="min-w-0">
                    <dt className="eyebrow text-[0.66rem] text-muted">{k}</dt>
                    <dd className="mt-0.5">{v ? <span className="select-all break-words">{v}</span> : <Placeholder>{ph}</Placeholder>}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="part-t" className="rounded-lg bg-sand p-6">
            <h2 id="part-t" className="display text-2xl">Como participar</h2>
            <ul className="mt-4 space-y-3 text-[0.98rem]">
              <li className="flex gap-3"><Icon name="check" className="mt-1 shrink-0 text-accent-text" /> Acompanhe os comunicados e a agenda de eventos.</li>
              <li className="flex gap-3"><Icon name="check" className="mt-1 shrink-0 text-accent-text" /> Mande sugestões e pedidos de pauta pelo formulário.</li>
              <li className="flex gap-3"><Icon name="check" className="mt-1 shrink-0 text-accent-text" /> Entre em um <a className="link-arrow" href="#projetos">projeto ou iniciativa</a>.</li>
              <li className="flex gap-3"><Icon name="check" className="mt-1 shrink-0 text-accent-text" /> Veja quanto a participação pode valer em <a className="link-arrow" href="#complementares">horas complementares</a>.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}
