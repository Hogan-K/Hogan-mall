export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  runtimeConfig: {},
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-quasar-ui',
    '@nuxt/eslint'
  ],
  plugins: ['@/plugins/firebase.js'],

  // quasar
  quasar: {
    plugins: [
        'Notify',
        'Dialog',
        'Loading'
    ],
    config: {
      brand: {
        primary: '#a675ee',
        secondary: '#75EECB',
        dark: '#444444',
        accent: '#F2F2F2'
      }
    },
    extras: {
      font: 'roboto-font',
      fontIcons: ['fontawesome-v6'],
      animations: 'all'
    },
    sassVariables: true
  },

  // i18n
  i18n: {
    locales: [
      { code: 'tw', language: 'zh-TW' },
      { code: 'en', language: 'en-US' }
    ],
    defaultLocale: 'tw',
    vueI18n: './i18n.config.ts',
    // 偵測瀏覽器語言
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    }
  }
})
