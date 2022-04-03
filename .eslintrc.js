module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'react-hooks',
    '@typescript-eslint',
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],

  rules: {
    'import/extensions': 0,
    'linebreak-style': 0,
    //   'no-tabs': 0,
  //   'react/jsx-props-no-spreading': 'off',
  //   'react/require-default-props': 'off',
  //   'jsx-a11y/no-static-element-interactions': 'off',
  //   'jsx-a11y/click-events-have-key-events': 'off',
  //   'jsx-a11y/no-noninteractive-tabindex': 'off',
  //   'max-len': ['error', {
  //     code: 140,
  //   }],
  //   'react/function-component-definition': ['error', {
  //     namedComponents: 'arrow-function',
  //   }],
  },
};
