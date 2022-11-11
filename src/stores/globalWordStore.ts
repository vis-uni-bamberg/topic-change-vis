import { defineStore } from 'pinia'
import { MyWord } from '@/models/Word'
import { Topic } from '@/models/Topic'

export const useGlobalWordStore = defineStore('globalWordStore', {
  state: () => {
    return {
      allWords: [] as MyWord[],
      topicsToWords: {} as { [key: string]: MyWord[] },
      maxGlobalWordCountInSinglePeriod: 0,
      maxWordRatioPerTopicInSinglePeriod: {} as { [topicId: string]: number },
      maxGlobalTopicSizeInSinglePeriod: 0,
      wordsToHighestTopicPerPeriod: {} as {
        [key: string]: { [period: string]: { topic: string; share: number } }
      },
      topicToPeriodToSize: {} as {
        [topicId: string]: { [period: string]: number }
      },
    }
  },
  actions: {
    loadData(payload: Topic[]): void {
      this.getTopicsToWords(payload)
      this.getAllWords()
      this.getTopicToPeriodToSize(payload)
      this.getMaxGlobalWordCountInSinglePeriod(payload)
      this.getMaxWordRatioPerTopicInSinglePeriod(payload)
      this.getMaxGlobalTopicSizeInSinglePeriod(payload)
      this.getWordsToHighestTopicPerPeriod(payload)
    },

    getTopicsToWords(payload: Topic[]): void {
      const topicsToWords = {} as { [topicId: string]: MyWord[] }

      payload.forEach((topic) => {
        const words = {} as { [word: string]: MyWord }

        topic.periods
          .map((period) => period.words)
          .flat()
          .forEach((word) => {
            if (!words[word.word]) {
              words[word.word] = {
                word: word.word,
                count: 0,
              }
            }
            words[word.word].count += word.count
          })

        topicsToWords[topic.id] = Object.values(words)
      })

      this.topicsToWords = topicsToWords
    },

    getAllWords(): void {
      const words = {} as { [word: string]: MyWord }

      Object.values(this.topicsToWords)
        .flat()
        .forEach((word) => {
          if (!words[word.word]) {
            words[word.word] = {
              word: word.word,
              count: 0,
            }
          }
          words[word.word].count += word.count
        })

      this.allWords = Object.values(words).sort((a, b) => b.count - a.count)
    },

    getMaxGlobalWordCountInSinglePeriod(payload: Topic[]): void {
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
      this.maxGlobalWordCountInSinglePeriod = max
    },

    getMaxWordRatioPerTopicInSinglePeriod(payload: Topic[]): void {
      payload.forEach((topic) => {
        let max = 0
        topic.periods.forEach((period, periodIndex) => {
          period.words.forEach((word) => {
            max = Math.max(
              word.count / this.topicToPeriodToSize[topic.id][periodIndex],
              max
            )
          })
        })
        this.maxWordRatioPerTopicInSinglePeriod[topic.id] = max
      })
    },

    getWordsToHighestTopicPerPeriod(payload: Topic[]): void {
      const result = {} as {
        [key: string]: { [period: string]: { topic: string; share: number } }
      }
      payload.forEach((topic) => {
        for (let period = 0; period < payload[0].periods.length; period++) {
          topic.periods[period].words.forEach((word: MyWord) => {
            const wordShareInTopicInPeriod =
              word.count / this.topicToPeriodToSize[topic.id][period]
            if (!result[word.word]) {
              result[word.word] = {}
            }
            if (!result[word.word][period.toString()]) {
              result[word.word][period.toString()] = {
                topic: topic.id,
                share: wordShareInTopicInPeriod,
              }
            } else if (
              wordShareInTopicInPeriod >
              result[word.word][period.toString()].share
            ) {
              result[word.word][period.toString()].topic = topic.id
              result[word.word][period.toString()].share =
                wordShareInTopicInPeriod
            }
          })
        }
      })
      this.wordsToHighestTopicPerPeriod = result
    },

    getMaxGlobalTopicSizeInSinglePeriod(payload: Topic[]): void {
      const result = Math.max(
        ...payload
          .map((topic) => topic.periods)
          .flat()
          .map((period) => period.words.reduce((a, b) => a + b.count, 0))
      )
      this.maxGlobalTopicSizeInSinglePeriod = result
    },

    getTopicToPeriodToSize(payload: Topic[]): void {
      payload.forEach((topic) => {
        this.topicToPeriodToSize[topic.id] = {}
        topic.periods.forEach((period, periodIndex) => {
          this.topicToPeriodToSize[topic.id][periodIndex] = period.words.reduce(
            (a, b) => a + b.count,
            0
          )
        })
      })
    },
  },
  getters: {},
})
