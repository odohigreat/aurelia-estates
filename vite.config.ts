import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Warm up the Supabase connection (DNS, TLS, CORS preflight origin) before the
// first listings request. Only added when the configured URL is a valid project origin.
function supabasePreconnect(url: string | undefined): Plugin {
  let origin: string | undefined
  try {
    const parsed = new URL(url ?? '')
    if (parsed.protocol === 'https:' && parsed.hostname.endsWith('.supabase.co')) origin = parsed.origin
  } catch {
    origin = undefined
  }
  return {
    name: 'supabase-preconnect',
    transformIndexHtml: () => origin
      ? [{ tag: 'link', attrs: { rel: 'preconnect', href: origin, crossorigin: '' }, injectTo: 'head-prepend' }]
      : [],
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), supabasePreconnect(env.VITE_SUPABASE_URL)],
    build: {
      chunkSizeWarningLimit: 1000,
    },
  }
})
