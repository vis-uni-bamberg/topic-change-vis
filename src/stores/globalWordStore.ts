import { defineStore } from 'pinia'

export const useGlobalWordStore = defineStore('globalWordStore', {
  state: () => {
    return {
      words: [
        'Hello',
        'world',
        'normally',
        'you',
        'want',
        'more',
        'words',
        'than',
        'this',
      ].map(function (d) {
        return { text: d, size: 10 + Math.random() * 40 }
      }),
    }
  },
  actions: {},
  getters: {},
})
