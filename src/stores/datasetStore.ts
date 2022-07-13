import { Topic } from '@/models/Topic'
import * as d3 from 'd3'
import { defineStore } from 'pinia'

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
      const topicNames = Object.keys(simData[0]).filter(
        (topicName) => topicName.length > 0
      )

      this.topics = topicNames.map((topicName) => ({
        id: topicName,
        periods: [],
      }))

      this.topics.forEach((topic) => {
        simData.slice(1).forEach((row, index) => {
          const similarity = row[topic.id] ?? 0
          const threshold = thresholdData.slice(1)[index][topic.id] ?? 0
          topic.periods.push({
            id: `${topic.id}-${index}`,
            similarity: +similarity,
            threshold: +threshold,
            words: [],
          })
        })
      })
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
