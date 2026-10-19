import { documents } from '../content/documents'
import { members, membersPlaceholder } from '../content/members'

/**
 * Camada de acesso ao conteúdo. Hoje lê arquivos TypeScript em src/content.
 * Para ligar um CMS ou banco de dados (Supabase, Sanity, Strapi...), troque o corpo
 * destas funções por chamadas assíncronas e ajuste as páginas para aguardar os dados.
 * Edição online exige autenticação e permissões do próprio serviço escolhido.
 */
function real<T>(items: T[], fallback: T[]) {
  return items.length > 0 ? { items, isDemo: false } : { items: fallback, isDemo: true }
}

export const getMembers = () => real(members, membersPlaceholder)
export const getDocuments = () => documents
