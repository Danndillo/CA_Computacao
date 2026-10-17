import { ProjectCard } from '../components/cards'
import { DemoNotice, PageHeader } from '../components/ui'
import { getProjects } from '../services/content'

export function Projetos() {
  const { items, isDemo } = getProjects()
  return (
    <>
      <PageHeader eyebrow="Iniciativas" title="Projetos e iniciativas" lead="Projetos do Centro Acadêmico e ações para a comunidade do curso, abertos à participação de estudantes de todos os períodos." />
      <div className="wrap py-12 md:py-16">
        {isDemo && (
          <div className="mb-8">
            <DemoNotice>Ainda não há projetos oficiais cadastrados. Os cartões são modelos com campos a preencher.</DemoNotice>
          </div>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </>
  )
}
