import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => {
    const languages = [
      {
        code: 'us',
        name: 'English'
      },
      {
        code: 'es',
        name: 'Spanish'
      }
    ]

    return {
      languages: languages,
      language: languages[0]
    }
  },
  actions: {
    setLanguage(code) {
      this.language = this.languages.find((l) => l.code === code) || this.languages[0]
    }
  }
})
