import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        solid(),
        tsconfigPaths(),
        devtools({
            autoname: true,
            locator: {
                targetIDE: 'vscode',
                componentLocation: true,
                jsxLocation: true,
            }
        })
    ],
})
