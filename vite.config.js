import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function preserveBackdropFilter() {
  return {
    name: 'preserve-backdrop-filter',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === 'asset' && file.fileName.endsWith('.css')) {
          file.source = file.source.replaceAll(
            /-webkit-backdrop-filter:\s*([^;}]+)/g,
            (match, val) => {
              const formatted = val.replace(/\)\s*([a-zA-Z])/g, ') $1');
              return `-webkit-backdrop-filter:${formatted};backdrop-filter:${formatted}`;
            }
          );
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preserveBackdropFilter()],
})
