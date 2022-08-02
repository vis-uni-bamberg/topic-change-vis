import { defineStore } from 'pinia'
import { MyWord } from '@/models/Word'
import { Topic } from '@/models/Topic'
import { TopicPeriod } from '@/models/TopicPeriod'

export const useGlobalWordStore = defineStore('globalWordStore', {
  state: () => {
    return {
      allWords: [] as MyWord[],
      words: { '': [] } as { [key: string]: TopicPeriod[] },
    }
  },
  actions: {
    loadData(payload: Topic[]): void {
      this.allWords = payload
        .map((topic) => topic.periods.map((period) => period.words))
        .flat()
        .flat()
        .reduce((words: MyWord[], otherWord: MyWord) => {
          const word = words.find((word) => word.word === otherWord.word)
          if (word) {
            word.count += otherWord.count
          } else {
            words.push(otherWord)
          }
          return words
        }, [])

      this.words = payload.reduce(
        (acc, topic) => ({
          ...acc,
          [topic.id]: topic.periods,
        }),
        {}
      )
    },
  },
  getters: {},
})
