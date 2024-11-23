import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'


// Determine the path to load the environment variables from
dotenv.config({ path: path.resolve(__dirname, '../.env') })
console.log('NODE_ENV:', process.env.NODE_ENV)
const envPath = "../"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //envDir: path.resolve(__dirname, envPath),
})
