import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Determine the path to load the environment variables from
console.log('NODE_ENV:', process.env.NODE_ENV)
const envPath = "../"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: path.resolve(__dirname, envPath),
})
