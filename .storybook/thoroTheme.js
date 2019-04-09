import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: '#26276f',
  colorSecondary: '#4c4dd4',

  // UI
  appBg: 'white',
  appContentBg: '#F7F8FB',
  appBorderColor: '#26276f',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: 'black',
  barBg: '#F7F8FB',

  // Form colors
  inputBg: 'white',
  inputBorder: '#F7F8FB',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Thoro News Components & Style Guidelines',
  brandUrl: 'https://thoro.news',
  brandImage: 'https://thoro.news/favicons/favicon-32x32.png',
});
