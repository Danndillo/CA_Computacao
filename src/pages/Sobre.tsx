import { PageHeader, Placeholder } from '../components/ui'
import { aboutIntro, aboutSections } from '../content/about'

export function Sobre() {
  return (
    <>
      <PageHeader eyebrow="Institucional" title="Sobre o Centro Acadêmico" lead={aboutIntro} />
      <div className="wrap py-[clamp(2.5rem,7vw,5rem)]">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[14rem_1fr]">
          <nav aria-label="Nesta página" className="hidden lg:block">
            <ul className="sticky top-24 border-l-2 border-line pl-4 text-sm">
              {aboutSections.map((s) => (
                <li key={s.id}>
                  <a href={`#sobre`} onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ block: 'start' }) }} className="block py-3 text-muted transition-colors hover:text-ink">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0 max-w-3xl space-y-12">
            {aboutSections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className="scroll-mt-24">
                <h2 id={`${s.id}-t`} className="display text-2xl md:text-3xl">{s.title}</h2>
                {s.text ? (
                  <div className="mt-4 space-y-4 text-lg">
                    {s.text.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                ) : (
                  <div className="mt-4 rounded-md border border-dashed border-line bg-surface p-5">
                    <p><Placeholder>{s.prompt}</Placeholder></p>
                    <p className="mt-3 text-sm text-muted">Texto a ser escrito pela gestão. Edite em <span className="font-mono">src/content/about.ts</span>.</p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
