import { Topic } from '@/models/Topic'
import * as d3 from 'd3'
import { defineStore } from 'pinia'
import { useGlobalWordStore } from './globalWordStore'
import { useSimilarityStore } from './similarityStore'

export const useDatasetStore = defineStore('datasetStore', {
  state: () => {
    return {
      topics: [] as Topic[],
    }
  },
  actions: {
    async loadData(): Promise<void> {
      const simData = await d3.csv('./data/sim.csv')
      const thresholdData = await d3.csv('./data/quantiles.csv')
      const periods: any[] = []
      const looFileForTopics: d3.DSVRowArray<string>[] = []

      const filenames = []
      for (let i = 0; i < 79; i++) {
        filenames.push('./data/periods/period' + i + '.csv')
      }
      const looFilenames = []
      for (let i = 1; i <= 12; i++) {
        looFilenames.push('./data/loos_in_topics/loos_in_topic' + i + '.csv')
      }

      await Promise.all(filenames.map((filename) => d3.csv(filename))).then(
        (files) => {
          files.forEach((file) => {
            periods.push(file)
          })
        }
      )

      await Promise.all(looFilenames.map((filename) => d3.csv(filename))).then(
        (files) => {
          files.forEach((file) => {
            looFileForTopics.push(file)
          })
        }
      )

      this.topics = Object.keys(simData[0])
        .filter((topicName) => topicName.length > 0)
        .map((topicName) => ({
          id: topicName,
          periods: [],
        }))

      this.topics.forEach((topic, topicIndex) => {
        simData.forEach((period, periodIndex) => {
          const similarity = period[topic.id] ?? 0
          const threshold = thresholdData[periodIndex][topic.id] ?? 0

          const words = periods[periodIndex]
            ? Object.entries(
                periods[periodIndex]?.find(
                  (period: { [x: string]: string }) =>
                    +period[''] === topicIndex + 1
                )
              )
                .slice(1)
                .map((word) => ({
                  word: word[0],
                  count: +(word[1] as string),
                }))
                .filter((word) => word.count > 10)
            : []

          const looWords = Object.values(
            looFileForTopics[topicIndex][periodIndex]
          )
            .slice(1)
            .map((word: string | undefined) => {
              if (word) {
                return {
                  word: word.slice(0, word.indexOf(' ')),
                  impact: +word.slice(word.indexOf(' ') + 1),
                }
              }
              return {
                word: '',
                impact: -1,
              }
            })

          topic.periods.push({
            id: `${topic.id}-${periodIndex}`,
            topic: topic.id,
            period: periodIndex,
            similarity: +similarity,
            threshold: +threshold,
            words: words,
            loo: looWords,
          })
        })
      })

      const globalWordStore = useGlobalWordStore()
      globalWordStore.loadData(this.topics)

      useSimilarityStore().loadSimilaritiesBetweenTopics()
      useSimilarityStore().loadSimilaritiesWithinTopics()
    },
  },
  getters: {
    timerange: (state) => [
      state.topics[0].periods[0].start,
      state.topics[0].periods[-1].end,
    ],
    periodCount: (state) => state.topics[0].periods.length,
    colorScale: (state) =>
      d3
        .scaleOrdinal(d3.schemeCategory10)
        .domain(state.topics.map((topic) => topic.id)),
  },
})
