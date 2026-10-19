import { useMemo, useState } from 'react'
import { NewsCard } from '../components/cards'
import { CopyButton, Chips, DemoNotice, EmptyState, PageHeader, ArrowLink } from '../components/ui'
import { newsCategories } from '../content/news'
import { absoluteLink, newsHref } from '../lib/route'
import { getNews } from '../services/content'
import type { NewsCategory } from '../types'

type Filter = 'todas' | NewsCategory

export function Noticias() {
  const { items, isDemo } = getNews()
  const [filter, setFilter] = useState<Filter>('todas')
  const shown = useMemo(() => items.filter((p) => filter === 'todas' || p.category === filter), [items, filter])
  const urgent = shown.filter((p) => p.urgent)
  const rest = shown.filter((p) => !p.urgent)

  return (
    <>
      <PageHeader eyebrow="Comunicados" title="Notícias e comunicados" lead="Informações para os estudantes do curso, organizadas por assunto." />
      <div className="wrap py-[clamp(2rem,6vw,4rem)]">
        {isDemo && (
          <div className="mb-8">
            <DemoNotice>Ainda não há publicações oficiais. Estes cartões são modelos para mostrar o layout e os filtros.</DemoNotice>
          </div>
        )}
        <Chips<Filter>
          label="Filtrar por categoria"
          value={filter}
          onChange={setFilter}
          options={[{ value: 'todas', label: 'Todas' }, ...newsCategories.map((c) => ({ value: c, label: c }))]}
        />
        <p className="sr-only" role="status" aria-live="polite">{shown.length} {shown.length === 1 ? 'publicação' : 'publicações'}</p>

        <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,19rem),1fr))] gap-5">
          {[...urgent, ...rest].map((p) => (
            <div key={p.id} className={p.urgent ? 'col-[1/-1]' : ''}>
              <NewsCard post={p} />
            </div>
          ))}
        </div>
        {shown.length === 0 && <EmptyState title="Nenhuma publicação nesta categoria ainda">Escolha outra categoria ou volte mais tarde.</EmptyState>}
      </div>
    </>
  )
}

export function Noticia({ id }: { id: string }) {
  const { items } = getNews()
  const post = items.find((p) => p.id === id)
  if (!post) {
    return (
      <>
        <PageHeader eyebrow="Notícias" title="Publicação não encontrada" lead="O link pode estar incorreto ou a publicação foi retirada." />
        <div className="wrap py-14"><ArrowLink href="#noticias">Voltar às notícias</ArrowLink></div>
      </>
    )
  }
  return (
    <>
      <PageHeader eyebrow={`${post.category} · ${post.dateLabel}`} title={post.title} lead={post.summary} />
      <article className="wrap py-[clamp(2rem,6vw,4rem)]">
        <div className="mx-auto max-w-3xl">
          {post.cover && <img src={post.cover.src} alt={post.cover.alt} decoding="async" className="aspect-[16/9] w-full rounded-lg object-cover" />}
          {post.demo && (
            <div className="mt-6"><DemoNotice>Publicação de modelo, sem informação oficial.</DemoNotice></div>
          )}
          <div className="mt-8 space-y-5 text-lg">
            {post.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <ArrowLink href="#noticias">Voltar às notícias</ArrowLink>
            <CopyButton getText={() => absoluteLink(newsHref(post.id))} />
          </div>
        </div>
      </article>
    </>
  )
}
