import { defineStore } from 'pinia'
import { MyWord } from '@/models/Word'

export const useGlobalWordStore = defineStore('globalWordStore', {
  state: () => {
    return {
      words: [] as MyWord[][][],
    }
  },
  actions: {
    loadData(payload: MyWord[][][]): void {
      //topic -> period -> words
      this.words = payload
    },
  },
  getters: {
    aggregatedWords: (state) => {
      return state.words.flat().flat()
    },

    wordsForTopic: (state) => {
      return (topicIndex: number) => state.words[topicIndex].flat()
    },
  },
})
