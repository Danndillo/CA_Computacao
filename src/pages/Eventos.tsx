import { useState } from 'react'
import { EventCard } from '../components/cards'
import { Chips, DemoNotice, EmptyState, PageHeader } from '../components/ui'
import { getEvents } from '../services/content'

type Filter = 'proximos' | 'anteriores' | 'todos'

export function Eventos() {
  const { items, isDemo } = getEvents()
  const [filter, setFilter] = useState<Filter>('proximos')
  const shown = items.filter((e) => filter === 'todos' || e.status === filter)
  return (
    <>
      <PageHeader eyebrow="Agenda" title="Eventos" lead="Palestras, semanas acadêmicas, oficinas, encontros e confraternizações organizados ou apoiados pelo Centro Acadêmico." />
      <div className="wrap py-[clamp(2rem,6vw,4rem)]">
        {isDemo && (
          <div className="mb-8">
            <DemoNotice>Sem eventos oficiais cadastrados. Datas, horários e locais abaixo são marcadores a preencher, não uma agenda real.</DemoNotice>
          </div>
        )}
        <Chips<Filter>
          label="Filtrar por situação"
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'proximos', label: 'Próximos eventos' },
            { value: 'anteriores', label: 'Eventos anteriores' },
            { value: 'todos', label: 'Todos' },
          ]}
        />
        <p className="sr-only" role="status" aria-live="polite">{shown.length} {shown.length === 1 ? 'evento' : 'eventos'}</p>
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,26rem),1fr))] gap-5">
          {shown.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
        {shown.length === 0 && <EmptyState title="Nenhum evento nesta situação">Quando houver eventos divulgados, eles aparecem aqui.</EmptyState>}
      </div>
    </>
  )
}
