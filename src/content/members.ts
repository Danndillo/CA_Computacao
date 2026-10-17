import type { Member } from '../types'

/** Integrantes reais da gestão. Enquanto vazio, o site mostra cartões de preenchimento. */
export const members: Member[] = []

export const membersPlaceholder: Member[] = [1, 2, 3, 4].map((n) => ({
  id: `vaga-${n}`,
  name: '[Nome completo]',
  role: '[Cargo ou função]',
  bio: '[Breve descrição, quando pertinente]',
  placeholder: true,
}))
