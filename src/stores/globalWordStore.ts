import { defineStore } from 'pinia'
import { MyWord } from '@/models/Word'

export const useGlobalWordStore = defineStore('globalWordStore', {
  state: () => {
    return {
      words: [] as MyWord[],
    }
  },
  actions: {
    loadData(payload: MyWord[][][]): void {
      const flattened = payload.flat().flat()

      this.words = flattened
    },
  },
  getters: {},
})
