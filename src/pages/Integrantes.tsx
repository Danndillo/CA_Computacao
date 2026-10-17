import { MemberCard } from '../components/cards'
import { DemoNotice, PageHeader } from '../components/ui'
import { getMembers } from '../services/content'

export function Integrantes() {
  const { items, isDemo } = getMembers()
  return (
    <>
      <PageHeader eyebrow="Gestão" title="Integrantes" lead="Quem faz o Centro Acadêmico: cargos, responsabilidades e formas de contato da gestão atual." />
      <div className="wrap py-14 md:py-20">
        {isDemo && (
          <div className="mb-8">
            <DemoNotice>
              <strong>[Adicionar integrantes da gestão]</strong> Os cartões abaixo esperam os dados oficiais: nome completo, cargo, foto, descrição e links. Edite <span className="font-mono">src/content/members.ts</span>.
            </DemoNotice>
          </div>
        )}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((m) => (
            <li key={m.id} className="min-w-0">
              <MemberCard member={m} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
