import { ButtonLink, ArrowLink, Section, DemoNotice } from '../components/ui'
import { EventCard, NewsCard, ProjectCard } from '../components/cards'
import { Icon, type IconName } from '../components/Icon'
import { OwlMark } from '../components/Logo'
import { Tape } from '../components/Tape'
import { complementares, complementaresSource } from '../content/complementares'
import { docCategories } from '../content/documents'
import { getDocuments, getEvents, getNews, getProjects } from '../services/content'

function CircuitBackdrop() {
  return (
    <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke="#F26F20" strokeWidth="1.5" opacity="0.28" strokeLinecap="round" strokeLinejoin="round">
        <path d="M600 90h220l40 40h180l30-30h130" />
        <path d="M560 200h180l44 44h160l30 30h230" />
        <path d="M640 330h120l40-40h200l36 36h104" />
        <path d="M600 450h260l40 40h300" />
        <path d="M700 560h150l30-30h320" />
      </g>
      <g fill="#020101" stroke="#F26F20" strokeWidth="1.5" opacity="0.5">
        <circle cx="1130" cy="100" r="5" />
        <circle cx="1190" cy="274" r="5" />
        <circle cx="1144" cy="326" r="5" />
        <circle cx="1190" cy="490" r="5" />
        <circle cx="1170" cy="530" r="5" />
      </g>
    </svg>
  )
}

function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-night text-white" aria-labelledby="titulo-pagina">
      <CircuitBackdrop />
      <div className="wrap relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.25fr_1fr]">
        <div className="min-w-0">
          <p className="eyebrow rise text-orange" style={{ animationDelay: '0ms' }}>
            Ciência da Computação · UFES · Alegre
          </p>
          <h1 id="titulo-pagina" tabIndex={-1} className="display rise mt-5 text-[clamp(2.4rem,7.2vw,5.6rem)] leading-[0.98] !text-white outline-none" style={{ animationDelay: '80ms' }}>
            Representando estudantes.{' '}
            <span className="text-orange">Construindo o futuro da Computação.</span>
          </h1>
          <p className="rise mt-6 max-w-[54ch] text-lg text-white/80" style={{ animationDelay: '160ms' }}>
            Canal de comunicação entre o Centro Acadêmico e a turma: avisos, eventos, projetos, documentos e as formas de participar da vida do curso.
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
            <ButtonLink href="#sobre">Conheça o Centro Acadêmico</ButtonLink>
            <ButtonLink href="#eventos" variant="outline-dark">
              Confira os próximos eventos
            </ButtonLink>
          </div>
        </div>
        <div className="rise relative mx-auto w-full max-w-[26rem]" style={{ animationDelay: '200ms' }}>
          <OwlMark className="h-auto w-full" title="Coruja tecnológica, símbolo do Centro Acadêmico (marca provisória)" />
        </div>
      </div>
      <Tape drift className="relative text-orange/70" />
    </section>
  )
}

const quick: { href: string; title: string; text: string; icon: IconName }[] = [
  { href: '#documentos', title: 'Documentos', text: 'Estatuto, atas, editais e relatórios', icon: 'file' },
  { href: '#complementares', title: 'Atividades complementares', text: `${complementares.length} atividades da lista da UFES`, icon: 'hours' },
  { href: '#eventos', title: 'Eventos', text: 'Próximos encontros e os anteriores', icon: 'calendar' },
  { href: '#contato', title: 'Contato', text: 'Dúvidas, sugestões e solicitações', icon: 'mail' },
]

export function Home() {
  const news = getNews()
  const events = getEvents()
  const projects = getProjects()
  const docs = getDocuments()
  const upcoming = events.items.filter((e) => e.status === 'proximos').slice(0, 2)
  const cA = complementares.find((a) => a.code === 'ATV01609')

  return (
    <>
      <Hero />

      <section aria-label="Acesso rápido" className="bg-sand">
        <div className="wrap py-10">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quick.map((q) => (
              <li key={q.href}>
                <a href={q.href} className="group flex h-full items-start gap-4 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-ink">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-night text-orange">
                    <Icon name={q.icon} size={22} />
                  </span>
                  <span className="min-w-0">
                    <span className="display block text-lg leading-tight text-ink">{q.title}</span>
                    <span className="mt-1 block text-sm text-muted">{q.text}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section title="Notícias recentes" eyebrow="Comunicados" action={<ArrowLink href="#noticias">Todas as notícias</ArrowLink>}>
        {news.isDemo && (
          <div className="mb-6">
            <DemoNotice>Ainda não há publicações oficiais. Os cartões abaixo são modelos de layout.</DemoNotice>
          </div>
        )}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {news.items.slice(0, 3).map((p) => (
            <NewsCard key={p.id} post={p} />
          ))}
        </div>
      </Section>

      <Section title="Próximos eventos" eyebrow="Agenda" tone="sand" action={<ArrowLink href="#eventos">Ver todos os eventos</ArrowLink>}>
        {events.isDemo && (
          <div className="mb-6">
            <DemoNotice>Sem eventos oficiais cadastrados. Datas, horários e locais abaixo são marcadores a preencher.</DemoNotice>
          </div>
        )}
        <div className="grid gap-5 lg:grid-cols-2">
          {upcoming.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </Section>

      <Section title="Projetos estudantis" eyebrow="Iniciativas" tone="dark" action={<a className="link-arrow !text-orange" href="#projetos">Conheça os projetos</a>}>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.items.slice(0, 2).map((p) => (
            <ProjectCard key={p.id} project={p} dark />
          ))}
        </div>
      </Section>

      <Section title="Documentos importantes" eyebrow="Transparência" action={<ArrowLink href="#documentos">Todos os documentos</ArrowLink>}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {docCategories.map((c) => {
            const n = docs.filter((d) => d.category === c).length
            return (
              <li key={c}>
                <a href="#documentos" className="flex h-full items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4 hover:border-ink">
                  <span className="min-w-0 font-semibold text-ink">{c}</span>
                  <span className="eyebrow shrink-0 text-[0.66rem] text-muted">{n > 0 ? `${n} ${n === 1 ? 'arquivo' : 'arquivos'}` : 'Aguardando publicação'}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </Section>

      <section aria-labelledby="horas-t" className="bg-orange text-night">
        <div className="wrap grid items-center gap-6 py-12 md:grid-cols-[1.6fr_1fr] md:py-14">
          <div className="min-w-0">
            <p className="eyebrow text-night/75">Horas complementares</p>
            <h2 id="horas-t" className="display mt-2 text-[clamp(1.6rem,3.6vw,2.4rem)] !text-night">
              Participar do Centro Acadêmico pode contar horas.
            </h2>
            <p className="mt-3 max-w-[60ch] text-night/90">
              No relatório do Colegiado emitido em {complementaresSource.issuedAt}, a atividade {cA?.code} (participação efetiva em Diretórios e Centros Acadêmicos…) aparece com CH total de {cA?.ch}. Confirme as regras em vigor com o Colegiado.
            </p>
          </div>
          <div className="md:justify-self-end">
            <a
              href="#complementares"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-md border-2 border-night bg-night px-5 py-2.5 font-semibold text-white transition-colors hover:bg-transparent hover:text-night"
            >
              Ver a lista completa <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
