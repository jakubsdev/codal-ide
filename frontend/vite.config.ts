import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                reactClient: path.resolve(
                    __dirname,
                    "/packages/examples/react-client/index.html"
                ),
            },
        },
    },
    resolve: {
        alias: {
            path: "path-browserify",
        },
    },
    server: {
        host: true,
        strictPort: true,
        port: 3000,
        proxy: {
            "/auth/google": "http://localhost:5000",
            "/auth/google/callback": "http://localhost:5000",
        },
    },
});
