import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { readdirSync } from 'node:fs';
import { getConfig } from '@powerhousedao/codegen';

const { documentModelsDir, editorsDir } = getConfig();

const entry = {
    index: 'index.ts',
    documentModels: resolve(documentModelsDir, 'index.ts'),
    editors: resolve(editorsDir, 'index.ts'),
};

// add subpackage for each document model
readdirSync(documentModelsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .forEach(name => {
        entry[name] = resolve(documentModelsDir, name, 'index.ts');
    });

export default defineConfig(() => {
    const external = [
        'document-model',
        'document-model/document',
        'react',
        'react-dom',
    ];

    return {
        build: {
            outDir: `dist`,
            emptyOutDir: true,
            lib: {
                entry,
                formats: ['es', 'cjs'],
                fileName: (format, entryName) =>
                    `${entryName}.${format === 'cjs' ? 'cjs' : 'js'}`,
            },
            rollupOptions: {
                external,
                output: {
                    exports: 'named',
                },
            },
        },
        plugins: [dts({ insertTypesEntry: true })],
    };
});
