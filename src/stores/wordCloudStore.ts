import { defineStore } from 'pinia'

export const useWordCloudStore = defineStore('wordCloudStore', {
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
        return { text: d, size: 10 + Math.random() * 90 }
      }),
    }
  },
  actions: {},
  getters: {},
})
