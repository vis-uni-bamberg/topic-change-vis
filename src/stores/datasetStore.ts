import { Topic } from '@/models/Topic'
import * as d3 from 'd3'
import { defineStore } from 'pinia'
import { useGlobalWordStore } from './globalWordStore'

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
      await Promise.all([
        d3.csv('./data/period0.csv'),
        d3.csv('./data/period1.csv'),
      ]).then((files) => {
        files.forEach((file) => {
          periods.push(file)
        })
      })

      const topicNames = Object.keys(simData[0]).filter(
        (topicName) => topicName.length > 0
      )

      this.topics = topicNames.map((topicName) => ({
        id: topicName,
        periods: [],
      }))

      this.topics.forEach((topic, topicIndex) => {
        simData.slice(1, 3).forEach((period, periodIndex) => {
          const similarity = period[topic.id] ?? 0
          const threshold = thresholdData.slice(1)[periodIndex][topic.id] ?? 0

          const words = Object.entries(
            periods[periodIndex]?.find(
              (period: { [x: string]: number }) => period[''] == topicIndex + 1
            )
          )
            .slice(1)
            .map((word) => ({
              word: word[0],
              count: word[1] as number,
            }))
            .filter((word) => word.count > 100)

          topic.periods.push({
            id: `${topic.id}-${periodIndex}`,
            similarity: +similarity,
            threshold: +threshold,
            words: words,
          })
        })
      })

      const globalWordStore = useGlobalWordStore()
      globalWordStore.loadData(
        this.topics.map((topic) => topic.periods.map((period) => period.words))
      )
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
