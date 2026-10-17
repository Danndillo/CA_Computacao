import type { EventItem } from '../types'

/** Eventos reais. Use `status: 'proximos'` ou `'anteriores'`. */
export const events: EventItem[] = []

/** Modelos para mostrar o layout. Somem sozinhos quando `events` tiver itens. */
export const eventsDemo: EventItem[] = [
  {
    id: 'modelo-proximo-1',
    name: '[Modelo] Nome do evento',
    description: 'Descrição curta do evento: palestra, semana acadêmica, oficina, encontro ou confraternização.',
    dateLabel: '[Data]',
    time: '[Horário]',
    place: '[Local]',
    status: 'proximos',
    demo: true,
  },
  {
    id: 'modelo-proximo-2',
    name: '[Modelo] Oficina ou minicurso',
    description: 'Quando houver inscrição, o botão leva ao link informado. Sem link, aparece o aviso de preenchimento.',
    dateLabel: '[Data]',
    time: '[Horário]',
    place: '[Local]',
    registrationUrl: undefined,
    status: 'proximos',
    demo: true,
  },
  {
    id: 'modelo-anterior-1',
    name: '[Modelo] Evento já realizado',
    description: 'Eventos encerrados ficam disponíveis no filtro "Anteriores".',
    dateLabel: '[Data]',
    time: '[Horário]',
    place: '[Local]',
    status: 'anteriores',
    demo: true,
  },
]
