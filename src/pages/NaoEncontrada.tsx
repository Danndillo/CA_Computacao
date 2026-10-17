import { ArrowLink, PageHeader } from '../components/ui'

export function NaoEncontrada() {
  return (
    <>
      <PageHeader eyebrow="Erro 404" title="Página não encontrada" lead="O endereço não existe ou foi movido." />
      <div className="wrap py-14"><ArrowLink href="#inicio">Voltar ao início</ArrowLink></div>
    </>
  )
}
