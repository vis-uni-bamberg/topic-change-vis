import { defineStore } from 'pinia'
import { MyWord } from '@/models/Word'
import { Topic } from '@/models/Topic'

export const useGlobalWordStore = defineStore('globalWordStore', {
  state: () => {
    return {
      allWords: [] as MyWord[],
      words: { '': [] } as { [key: string]: MyWord[] },
    }
  },
  actions: {
    loadData(payload: Topic[]): void {
      this.allWords = payload
        .map((topic) => topic.periods.map((period) => period.words))
        .flat()
        .flat()
        .filter((word) => word.count > 100)
        .reduce((words: MyWord[], otherWord: MyWord) => {
          const word = words.find((word) => word.word === otherWord.word)
          if (word) {
            word.count += otherWord.count
          } else {
            words.push({
              word: otherWord.word,
              count: otherWord.count,
            })
          }
          return words
        }, [])

      this.words = payload.reduce(
        (acc, topic) => ({
          ...acc,
          [topic.id]: topic.periods
            .map((period) => period.words)
            .flat()
            .reduce((words: MyWord[], otherWord: MyWord) => {
              const word = words.find((word) => word.word === otherWord.word)
              if (word) {
                word.count += otherWord.count
              } else {
                words.push({
                  word: otherWord.word,
                  count: otherWord.count,
                })
              }
              return words
            }, []),
        }),
        {}
      )
    },
  },
  getters: {},
})
