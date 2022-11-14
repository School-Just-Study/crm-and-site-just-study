module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'simple-import-sort/sort': 'off',
        'react/no-unescaped-entities': 'off',
        '@next/next/no-page-custom-font': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'jsx-a11y/aria-role': 'off',
        'import/no-cycle': 'off',
        'import/no-duplicates': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/no-thenable': 'off'
    }
};
