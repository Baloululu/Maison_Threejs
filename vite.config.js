import { defineConfig } from "vite";

export default defineConfig({
    server: {
        https: {
            key: './threejs-maison-privateKey.key',
            cert: './threejs-maison.crt'
        }
    }
})