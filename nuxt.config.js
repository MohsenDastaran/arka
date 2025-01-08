export default {
  target: 'static',

  head: {
    title: 'Arka Auth App',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ]
  },

  css: [
    '~/assets/css/main.css'
  ],

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  router: {
    middleware: ['auth']
  }
}