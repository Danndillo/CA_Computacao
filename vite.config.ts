import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// O build gera um único index.html (JS e CSS embutidos), fácil de hospedar em qualquer lugar.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { target: 'es2020', cssCodeSplit: false },
})
