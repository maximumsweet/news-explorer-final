const presets = [
  [
    '@babel/env',
    {
      // указать цели, для полифилов
      targets: {
        edge: '17',
        ie: '11',
        firefox: '50',
        chrome: '64',
        safari: '11.1',
      },
      // эта настройка babel-polyfill, если стоит значение usage, то будут подставлятся полифилы для версий браузеров которые указали ниже.
      useBuiltIns: 'usage',
      // явно проставить версию corejs
      corejs: '3.4.1',
    },
  ],
];

module.exports = { presets };
