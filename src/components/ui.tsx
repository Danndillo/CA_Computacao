import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { copyText } from '../lib/clipboard'
import { Icon } from './Icon'

/* ---------- Botões ---------- */
type Variant = 'primary' | 'outline' | 'outline-dark'
const base =
  'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[0.95rem] font-semibold leading-tight transition-[background-color,color,transform,border-color] duration-150 active:translate-y-px'
const variants: Record<Variant, string> = {
  primary: 'bg-orange text-night hover:bg-orange-hot border-2 border-orange hover:border-orange-hot',
  outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-bg',
  'outline-dark': 'border-2 border-white/50 text-white hover:bg-white hover:text-night hover:border-white',
}

export function ButtonLink({ href, variant = 'primary', children, className = '' }: { href: string; variant?: Variant; children: ReactNode; className?: string }) {
  const external = /^https?:/.test(href)
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}

export function Button({ variant = 'primary', className = '', ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type="button" className={`${base} ${variants[variant]} disabled:opacity-60 ${className}`} {...rest} />
}

/* ---------- Copiar com retorno visual ---------- */
export function CopyButton({ getText, label = 'Copiar link', doneLabel = 'Link copiado', className = '' }: { getText: () => string; label?: string; doneLabel?: string; className?: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'fail'>('idle')
  const timer = useRef<number>()
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const onClick = async () => {
    const ok = await copyText(getText())
    setState(ok ? 'done' : 'fail')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2600)
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-[40px] items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm font-medium text-fg transition-colors hover:border-ink ${className}`}
    >
      <Icon name={state === 'done' ? 'check' : 'copy'} size={16} />
      <span aria-live="polite">{state === 'done' ? doneLabel : state === 'fail' ? 'Não foi possível copiar' : label}</span>
    </button>
  )
}

/* ---------- Filtros ---------- */
export function Chips<T extends string>({ label, options, value, onChange }: { label: string; options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            style={on ? { background: 'var(--chip-on-bg)', color: 'var(--chip-on-fg)', borderColor: 'var(--chip-on-bg)' } : undefined}
            className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors ${on ? '' : 'border-line bg-surface text-fg hover:border-ink'}`}
          >
            {on && <Icon name="check" size={15} />}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Texto provisório e avisos ---------- */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block max-w-full rounded border border-dashed border-muted/70 bg-surface-2 px-1.5 py-px font-mono text-[0.86em] text-muted [overflow-wrap:anywhere]">
      {children}
    </span>
  )
}

export function DemoNotice({ children }: { children: ReactNode }) {
  return (
    <div role="note" className="flex items-start gap-3 rounded-md border border-dashed border-muted/70 bg-surface-2 p-4 text-sm text-fg">
      <span className="eyebrow mt-0.5 shrink-0 rounded-sm bg-night px-2 py-1 text-[0.65rem] text-white">Demonstração</span>
      <p className="min-w-0 [overflow-wrap:anywhere]">{children}</p>
    </div>
  )
}

export function DemoTag() {
  return <span className="eyebrow rounded-sm bg-sand px-2 py-1 text-[0.62rem] text-ink">Demonstração</span>
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-md border border-dashed border-line bg-surface p-8 text-center">
      <p className="display text-lg text-ink">{title}</p>
      {children && <p className="mx-auto mt-2 max-w-prose text-sm text-muted">{children}</p>}
    </div>
  )
}

/* ---------- Estrutura de página ---------- */
export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: ReactNode }) {
  return (
    <div className="border-b-4 border-orange bg-sand">
      <div className="wrap py-[clamp(2rem,6vw,4rem)]">
        <p className="eyebrow text-accent-text">{eyebrow}</p>
        <h1 id="titulo-pagina" tabIndex={-1} className="display mt-3 text-[clamp(1.9rem,5.5vw,3.4rem)] outline-none">
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-[62ch] text-lg text-fg">{lead}</p>}
      </div>
    </div>
  )
}

export function Section({ title, eyebrow, action, children, tone = 'plain', id }: { title: string; eyebrow?: string; action?: ReactNode; children: ReactNode; tone?: 'plain' | 'sand' | 'dark'; id?: string }) {
  const bg = tone === 'dark' ? 'bg-night text-white on-dark' : tone === 'sand' ? 'bg-sand' : ''
  return (
    <section id={id} aria-labelledby={`${id ?? title}-t`.replace(/\s+/g, '-')} className={`py-[clamp(2.5rem,7vw,5rem)] ${bg}`}>
      <div className="wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div className="min-w-0">
            {eyebrow && <p className={`eyebrow ${tone === 'dark' ? 'text-orange' : 'text-accent-text'}`}>{eyebrow}</p>}
            <h2 id={`${id ?? title}-t`.replace(/\s+/g, '-')} className={`display mt-2 text-[clamp(1.7rem,4vw,2.6rem)] ${tone === 'dark' ? '!text-white' : ''}`}>
              {title}
            </h2>
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  )
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="link-arrow">
      {children}
      <Icon name="arrow" size={18} />
    </a>
  )
}
