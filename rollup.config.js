import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { uglify } from 'rollup-plugin-uglify';

export default defineConfig({
    input: 'src/index.ts',
    output: {
        dir: './dist',
        format: 'cjs'
    },
    plugins: [
        typescript({ exclude: ['**/*.test.ts'] }),
        uglify()
    ]
});
