const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'apps/**/src/**/!(*.stories|*.spec).{ts,html}'),
    join(__dirname, 'libs/**/src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    ...createGlobPatternsForDependencies(__dirname),
  ],

  theme: {
    extend: {
      colors: {
        'black': '#303030',
        'white': '#FAFAFA',
        'primary-green': '#83C142',
        'primary-blue': '#00A6F4',
        'background-gray': '#F8F8F8',
        'primary-yellow': '#F5A623'
      },
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
