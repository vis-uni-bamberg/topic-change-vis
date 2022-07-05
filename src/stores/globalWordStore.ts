import { defineStore } from 'pinia'
import _ from 'lodash'

export const useGlobalWordStore = defineStore('globalWordStore', {
  state: () => {
    return {
      words: [] as { text: string; size: number }[],
    }
  },
  actions: {
    loadData(payload: string[][][]): void {
      const flattened = payload.flat().flat()

      const wordToCountMapping = _.countBy(flattened)

      this.words = Object.entries(wordToCountMapping).map((entry) => ({
        text: entry[0],
        size: entry[1] * 5,
      }))
    },
  },
  getters: {},
})
