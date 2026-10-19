import { absoluteLink, newsHref } from '../lib/route'
import type { DocItem, EventItem, Member, NewsPost, Project } from '../types'
import { Icon } from './Icon'
import { ButtonLink, CopyButton, DemoTag, Placeholder } from './ui'

/* ---------- Notícia ---------- */
export function NewsCard({ post }: { post: NewsPost }) {
  const dark = !!post.urgent
  return (
    <article
      className={`group relative flex min-w-0 flex-col overflow-hidden rounded-lg border transition-[transform,border-color] duration-200 hover:border-orange motion-safe:hover:-translate-y-0.5 ${dark ? 'on-dark border-night bg-night text-white' : 'border-line bg-surface'}`}
    >
      {post.cover && <img src={post.cover.src} alt={post.cover.alt} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          {post.urgent && (
            <span className="eyebrow inline-flex items-center gap-1.5 rounded-sm bg-orange px-2 py-1 text-[0.65rem] text-night">
              <Icon name="warning" size={14} /> Urgente
            </span>
          )}
          {post.demo && <DemoTag />}
          <span className={`eyebrow text-[0.68rem] ${dark ? 'text-white/70' : 'text-muted'}`}>
            {post.category} · {post.dateLabel}
          </span>
        </div>
        <h3 className={`display text-xl ${dark ? 'text-white' : ''}`}>
          <a href={newsHref(post.id)} className="after:absolute after:inset-0 hover:underline decoration-2 underline-offset-4">
            {post.title}
          </a>
        </h3>
        <p className={`text-[0.95rem] ${dark ? 'text-white/80' : 'text-muted'}`}>{post.summary}</p>
        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-2">
          <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${dark ? 'text-orange' : 'text-accent-text'}`}>
            Ler publicação <Icon name="arrow" size={16} />
          </span>
          <CopyButton getText={() => absoluteLink(newsHref(post.id))} className={dark ? '!border-white/30 !bg-transparent !text-white' : ''} />
        </div>
      </div>
    </article>
  )
}

/* ---------- Evento ---------- */
export function EventCard({ event }: { event: EventItem }) {
  const upcoming = event.status === 'proximos'
  return (
    <article className="grid min-w-0 overflow-hidden rounded-lg border border-line bg-surface sm:grid-cols-[9.5rem_1fr]">
      <div className="on-dark flex flex-row items-center justify-between gap-3 bg-night p-5 text-white sm:flex-col sm:items-start sm:justify-between">
        <div>
          <p className="eyebrow text-[0.65rem] text-white/60">Data</p>
          <p className="display mt-1 text-2xl leading-tight text-white">{event.dateLabel}</p>
        </div>
        <span className="eyebrow inline-flex items-center gap-1.5 rounded-sm border border-white/30 px-2 py-1 text-[0.62rem]">
          <span aria-hidden="true" className={`h-2 w-2 ${upcoming ? 'rounded-full bg-orange' : 'bg-white/50'}`} />
          {upcoming ? 'Próximo' : 'Encerrado'}
        </span>
      </div>
      <div className="flex min-w-0 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">{event.demo && <DemoTag />}</div>
        <h3 className="display text-xl">{event.name}</h3>
        <p className="text-[0.95rem] text-muted">{event.description}</p>
        <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Horário</dt>
            <Icon name="clock" size={16} className="shrink-0 text-accent-text" />
            <dd>{event.time}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Local</dt>
            <Icon name="pin" size={16} className="shrink-0 text-accent-text" />
            <dd className="min-w-0">{event.place}</dd>
          </div>
        </dl>
        <div className="mt-auto pt-2">
          {event.registrationUrl ? (
            <ButtonLink href={event.registrationUrl}>Fazer inscrição</ButtonLink>
          ) : (
            <p className="text-sm text-muted">
              Inscrição: <Placeholder>[Link de inscrição, quando disponível]</Placeholder>
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

/* ---------- Integrante ---------- */
export function MemberCard({ member }: { member: Member }) {
  return (
    <article className="flex min-w-0 flex-col items-center rounded-lg border border-line bg-surface p-6 text-center">
      {member.photo ? (
        <img src={member.photo.src} alt={member.photo.alt} loading="lazy" decoding="async" className="h-28 w-28 rounded-full object-cover" />
      ) : (
        <div className="grid h-28 w-28 place-items-center rounded-full bg-sand text-muted" role="img" aria-label="Foto ainda não disponível">
          <Icon name="user" size={44} />
        </div>
      )}
      <h3 className="display mt-4 text-lg">{member.placeholder ? <Placeholder>{member.name}</Placeholder> : member.name}</h3>
      <p className="eyebrow mt-2 text-[0.68rem] text-accent-text">{member.placeholder ? <Placeholder>{member.role}</Placeholder> : member.role}</p>
      {member.bio && <p className="mt-3 text-sm text-muted">{member.placeholder ? <Placeholder>{member.bio}</Placeholder> : member.bio}</p>}
      {member.links && member.links.length > 0 && (
        <ul className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
          {member.links.map((l) => (
            <li key={l.href}>
              <a className="link-arrow" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

/* ---------- Projeto ---------- */
export function ProjectCard({ project, dark = false }: { project: Project; dark?: boolean }) {
  const rows: [string, string][] = [
    ['Objetivo', project.objective],
    ['Responsáveis', project.owners],
    ['Situação', project.status],
    ['Como participar', project.howToJoin],
  ]
  const isPh = (v: string) => v.startsWith('[')
  return (
    <article className={`flex min-w-0 flex-col gap-4 rounded-lg border p-6 ${dark ? 'border-graphite bg-white/[0.04] text-white on-dark' : 'border-line bg-surface'}`}>
      <div className="flex flex-wrap items-center gap-2">{project.demo && (dark ? <span className="eyebrow rounded-sm bg-white px-2 py-1 text-[0.62rem] text-night">Demonstração</span> : <DemoTag />)}</div>
      {project.image && <img src={project.image.src} alt={project.image.alt} loading="lazy" decoding="async" className="aspect-[16/9] w-full rounded-md object-cover" />}
      <h3 className={`display text-xl ${dark ? 'text-white' : ''}`}>{project.title}</h3>
      <p className={`text-[0.95rem] ${dark ? 'text-white/80' : 'text-muted'}`}>{project.description}</p>
      <dl className="grid gap-3 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 sm:grid-cols-[8.5rem_1fr]">
            <dt className={`eyebrow text-[0.66rem] ${dark ? 'text-orange' : 'text-accent-text'}`}>{k}</dt>
            <dd className="min-w-0">{isPh(v) ? <Placeholder>{v}</Placeholder> : v}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

/* ---------- Documento ---------- */
export function DocRow({ doc }: { doc: DocItem }) {
  const external = /^https?:/.test(doc.href)
  return (
    <li className="grid min-w-0 gap-3 rounded-lg border border-line bg-surface p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
      <Icon name="file" size={28} className="hidden text-accent-text sm:block" />
      <div className="min-w-0">
        <h3 className="display text-lg">{doc.title}</h3>
        <p className="eyebrow mt-1 text-[0.66rem] text-muted">
          {doc.category} · {doc.dateLabel}
          {doc.source ? ` · ${doc.source}` : ''}
        </p>
        <p className="mt-2 text-sm text-muted">{doc.description}</p>
      </div>
      <ButtonLink href={doc.href} variant="outline">
        {external ? 'Abrir documento' : 'Ver nesta página'}
        <Icon name="arrow" size={16} />
      </ButtonLink>
    </li>
  )
}
