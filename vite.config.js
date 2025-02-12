import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  console.log(`Mode actif : ${mode}`);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "src/assets"),
      }
    },
    define: {
      __IS_DEV__: mode === 'development',
      __IS_PROD__: mode === 'production',
      __API_BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL),
    },
  };
});