import { ProjectCard } from '../components/cards'
import { DemoNotice, PageHeader } from '../components/ui'
import { getProjects } from '../services/content'

export function Projetos() {
  const { items, isDemo } = getProjects()
  return (
    <>
      <PageHeader eyebrow="Iniciativas" title="Projetos e iniciativas" lead="Projetos do Centro Acadêmico e ações para a comunidade do curso, abertos à participação de estudantes de todos os períodos." />
      <div className="wrap py-[clamp(2rem,6vw,4rem)]">
        {isDemo && (
          <div className="mb-8">
            <DemoNotice>Ainda não há projetos oficiais cadastrados. Os cartões são modelos com campos a preencher.</DemoNotice>
          </div>
        )}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,22rem),1fr))] gap-5">
          {items.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </>
  )
}
