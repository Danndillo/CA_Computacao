import type { DocItem, Member } from '../types'
import { Icon } from './Icon'
import { ButtonLink, Placeholder } from './ui'

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
