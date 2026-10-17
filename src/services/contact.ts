export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export class ContactNotConfigured extends Error {
  constructor() {
    super('Nenhum serviço de recebimento de mensagens foi configurado.')
  }
}

/**
 * Envio do formulário de contato.
 *
 * Para ativar o envio real, defina VITE_CONTACT_ENDPOINT no build com a URL de um serviço
 * que aceite POST JSON (Formspree, Getform, uma função serverless, etc.).
 * Enquanto não houver endpoint, nada é enviado e a interface avisa isso à pessoa.
 */
export async function sendContact(payload: ContactPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
  if (!endpoint) throw new ContactNotConfigured()

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`O serviço respondeu com status ${res.status}.`)
}
