module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'import', '@typescript-eslint'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    semi: 0,
    camelcase: 0,
    'object-curly-newline': 0,

    'no-param-reassign': 0,
    'prefer-arrow-callback': 0,
    'comma-dangle': ['error', 'only-multiline'],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 0,
    'react/display-name': 0,
    'react/require-default-props': 0,
    'react/no-unescaped-entities': 0,
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx'],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': ['warn'],
    '@typescript-eslint/no-unused-vars': ['error'],

    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  overrides: [
    {
      files: ['*.stories.*'],
      rules: {
        'no-shadow': 0,
        'import/no-extraneous-dependencies': 0,
        'react/jsx-props-no-spreading': 0,
      },
    },
  ],
}
