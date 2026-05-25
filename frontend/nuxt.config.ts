// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'vuetify-nuxt-module'],
  devServer: {
    port: 8000,
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000',
    },
  },
  css: ['~/assets/styles/main.scss'],
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap',
        },
      ],
    },
  },
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            dark: false,
            colors: {
              primary: '#4CB3F8',
              secondary: '#32A8F8',
              success: '#43A047',
              error: '#D32F2F',
              'on-primary': '#FFFFFF',
              'text-regular': '#333333',
              'text-light': '#4D4D4D',
              'button-normal': '#B3B3B3',
              'bg-light': '#F5F8FA',
              'bg-dark': '#C8E6FA',
              background: '#FFFFFF',
              surface: '#FFFFFF',
            },
          },
        },
      },
      defaults: {
        global: {
          ripple: false,
        },
        VBtn: {
          variant: 'flat',
          color: 'primary',
          rounded: 'md',
        },
      },
    },
  },
})
