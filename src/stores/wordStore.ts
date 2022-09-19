import { defineStore } from 'pinia'

export const useWordStore = defineStore('wordStore', {
  state: () => {
    return {
      selectedWord: '' as string,
    }
  },
  actions: {
    updateSelectedWord(word: string): void {
      if (word !== this.selectedWord) {
        this.selectedWord = word
      } else {
        this.selectedWord = ''
      }
    },
  },
  getters: {},
})
