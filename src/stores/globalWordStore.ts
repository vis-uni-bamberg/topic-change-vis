import { defineStore } from 'pinia'
import { MyWord } from '@/models/Word'
import { Topic } from '@/models/Topic'

export const useGlobalWordStore = defineStore('globalWordStore', {
  state: () => {
    return {
      allWords: [] as MyWord[],
      topicsToWords: {} as { [key: string]: MyWord[] },
      maxPeriodWordCount: 0,
      maxPeriodWordCountPerTopic: {} as { [topicId: string]: number },
      maxPeriodTopicSize: 0,
      wordsToHighestTopicPerPeriod: {} as {
        [key: string]: { [period: string]: { topic: string; count: number } }
      },
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

      this.topicsToWords = payload.reduce(
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

      this.getMaxPeriodWordCount(payload)
      this.getMaxPeriodWordCountPerTopic(payload)
      this.getMaxPeriodTopicSize(payload)
      this.getHighestTopicPerPeriodPerWord(payload)
    },

    getMaxPeriodWordCount(payload: Topic[]): void {
      let max = 0
      payload
        .map((topic) => topic.periods.map((period) => period.words))
        .flat()
        .flat()
        .forEach((word) => {
          if (word.count > max) {
            max = word.count
          }
        })
      this.maxPeriodWordCount = max
    },

    getMaxPeriodWordCountPerTopic(payload: Topic[]): void {
      payload.forEach((topic) => {
        let max = 0
        topic.periods
          .map((period) => period.words)
          .flat()
          .forEach((word) => {
            if (word.count > max) {
              max = word.count
            }
          })
        this.maxPeriodWordCountPerTopic[topic.id] = max
      })
    },

    getHighestTopicPerPeriodPerWord(payload: Topic[]): void {
      const result = {} as {
        [key: string]: { [period: string]: { topic: string; count: number } }
      }
      payload.forEach((topic) => {
        for (let period = 0; period < payload[0].periods.length; period++) {
          topic.periods[period].words.forEach((word: MyWord) => {
            if (!result[word.word]) {
              result[word.word] = {}
            }
            if (!result[word.word][period.toString()]) {
              result[word.word][period.toString()] = {
                topic: topic.id,
                count: word.count,
              }
            } else if (
              word.count > result[word.word][period.toString()].count
            ) {
              result[word.word][period.toString()].topic = topic.id
              result[word.word][period.toString()].count = word.count
            }
          })
        }
      })
      this.wordsToHighestTopicPerPeriod = result
    },

    getMaxPeriodTopicSize(payload: Topic[]): void {
      const result = Math.max(
        ...payload
          .map((topic) => topic.periods)
          .flat()
          .map((period) => period.words.reduce((a, b) => a + b.count, 0))
      )
      this.maxPeriodTopicSize = result
    },
  },
  getters: {},
})
