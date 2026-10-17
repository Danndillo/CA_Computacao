import type { Project } from '../types'

/** Projetos reais. Enquanto vazio, o site mostra modelos. */
export const projects: Project[] = []

export const projectsDemo: Project[] = [
  {
    id: 'modelo-projeto-1',
    title: '[Modelo] Nome do projeto ou iniciativa',
    description: 'Descrição do que o projeto faz e para quem.',
    objective: '[Objetivo do projeto]',
    owners: '[Responsáveis]',
    status: '[Situação atual]',
    howToJoin: '[Como participar]',
    demo: true,
  },
  {
    id: 'modelo-projeto-2',
    title: '[Modelo] Iniciativa de integração entre períodos',
    description: 'Projetos que juntam estudantes de períodos diferentes têm destaque nesta área.',
    objective: '[Objetivo da iniciativa]',
    owners: '[Responsáveis]',
    status: '[Situação atual]',
    howToJoin: '[Como participar]',
    demo: true,
  },
]
