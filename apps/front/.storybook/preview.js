import '../src/pages/globals.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#0c0101',
      },
      {
        name: 'pink',
        value: '#e1b0b2;',
      },
    ],
  },
}
