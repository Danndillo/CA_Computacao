// Converte dist/index.html (build com tudo embutido) em um fragmento HTML pronto para publicar
// como página única: sem <html>, <head> ou <body>.
import { readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
const all = (re) => [...html.matchAll(re)].map((m) => m[0])

const title = all(/<title>[\s\S]*?<\/title>/g)[0]
const metas = all(/<meta\b[^>]*>/g).filter((m) => !/charset|name="viewport"/.test(m))
const links = all(/<link\b[^>]*>/g)
const styles = all(/<style\b[\s\S]*?<\/style>/g)
const scripts = all(/<script\b[\s\S]*?<\/script>/g)
const root = '<div id="root"></div>'

const out = [title, ...metas, ...links, ...styles, root, ...scripts].join('\n')
writeFileSync(new URL('../dist/artifact.html', import.meta.url), out)
console.log('artifact.html', (out.length / 1024).toFixed(0) + ' KB')
