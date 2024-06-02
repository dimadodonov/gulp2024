import prettierConfig from 'eslint-config-prettier';
import babelParser from '@babel/eslint-parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    {
        ignores: [
            'build/**',
            'app/**',
            'dist/**',
            'coverage/**',
            'templates/**',
            'sass/**',
            'src/js/dev/**',
            'src/js/_lib/**',
            'test.js',
            '!.eslintrc.js',
            'build/js/app.min.js', // добавьте сюда файл, который хотите игнорировать
        ],
        languageOptions: {
            parser: babelParser,
            ecmaVersion: 2020,
            sourceType: 'module',
            parserOptions: {
                requireConfigFile: false,
            },
            globals: {
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                $: 'readonly',
                jQuery: 'readonly',
            },
        },
        rules: {
            'jsx-quotes': [1, 'prefer-double'],
            'no-debugger': 2,
        },
        plugins: {
            prettier: prettierPlugin,
        },
    },
    prettierConfig,
];
