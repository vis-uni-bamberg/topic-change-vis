import { Topic } from '@/models/Topic'
import * as d3 from 'd3'
import { DSVRowArray } from 'd3'
import { defineStore } from 'pinia'
import { useGlobalWordStore } from './globalWordStore'
import { useSimilarityStore } from './similarityStore'

export const useDatasetStore = defineStore('datasetStore', {
  state: () => {
    return {
      topics: [] as Topic[],
      maxLoo: 0,
    }
  },
  actions: {
    async loadData(): Promise<void> {
      const simData = await d3.csv('./data/sim.csv')
      const thresholdData = await d3.csv('./data/quantiles.csv')
      const periods: DSVRowArray<string>[] = []
      const looFilesForTopics: d3.DSVRowArray<string>[] = []
      let maxLoo = 0
      const topicSizes = {} as { [topicId: string]: number }

      const filenames = []
      for (let i = 0; i < 79; i++) {
        filenames.push('./data/periods/period' + i + '.csv')
      }
      const looFilenames = []
      for (let i = 1; i <= 12; i++) {
        looFilenames.push('./data/loos_in_topics/loos_in_topic' + i + '.csv')
      }

      await Promise.all(
        filenames.map((filename) => d3.csv<string>(filename))
      ).then((files) => {
        files.forEach((file) => {
          periods.push(file)
        })
      })

      await Promise.all(looFilenames.map((filename) => d3.csv(filename))).then(
        (files) => {
          files.forEach((file) => {
            looFilesForTopics.push(file)
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
        topicSizes[topic.id] = 0
        simData.forEach((period, periodIndex) => {
          const similarity = period[topic.id] ?? 0
          const threshold = thresholdData[periodIndex][topic.id] ?? 0

          const words = periods[periodIndex]
            ? Object.entries(
                periods[periodIndex]?.find(
                  (period) => +(period[''] ?? 0) === topicIndex + 1
                ) ?? {}
              )
                .slice(1)
                .map((word: [string, string | undefined]) => {
                  if (word[1]) {
                    topicSizes[topic.id] += +word[1]
                  }
                  return {
                    word: word[0],
                    count: +(word[1] as string),
                  }
                })
                .filter((word) => word?.count > 0)
            : []

          const looWords = Object.values(
            looFilesForTopics[topicIndex][periodIndex]
          )
            .slice(1)
            .map((word: string | undefined) => {
              if (word) {
                const looWord = {
                  word: word.slice(0, word.indexOf(' ')),
                  impact: +word.slice(word.indexOf(' ') + 1),
                }
                if (looWord.impact < maxLoo) maxLoo = looWord.impact
                return looWord
              }
              return {
                word: '',
                impact: -1,
              }
            })

          const maxReferencePeriod = Math.min(4, periodIndex)

          const distanceToLastChangePoint = topic.periods
            .slice(periodIndex - maxReferencePeriod, periodIndex)
            .reverse()
            .findIndex((period) => period.isChangePoint)

          const referencePeriodSize =
            distanceToLastChangePoint > -1
              ? distanceToLastChangePoint + 1
              : maxReferencePeriod

          topic.periods.push({
            id: `${topic.id}-${periodIndex}`,
            topic: topic.id,
            period: periodIndex,
            similarity: +similarity,
            threshold: +threshold,
            isChangePoint: +similarity < +threshold,
            referencePeriodSize: referencePeriodSize,
            words: words,
            loo: looWords,
          })
        })
      })

      this.topics.sort((a, b) => topicSizes[b.id] - topicSizes[a.id])

      const globalWordStore = useGlobalWordStore()
      globalWordStore.loadData(this.topics)

      this.maxLoo = maxLoo

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
      d3.scaleOrdinal(colorList).domain(state.topics.map((topic) => topic.id)),
  },
})

const colorList = [
  '#1F77B4',
  '#FF7F0E',
  '#2CA02C',
  '#D62728',
  '#9467BD',
  '#8C564B',
  '#E377C2',
  // '#7F7F7F',
  '#BCBD22',
  '#17BECF',
  '#AEC7E8',
  '#FFBB78',
  '#98DF8A',
  '#FF9896',
  '#C5B0D5',
  '#C49C94',
  '#F7B6D2',
  '#C7C7C7',
  '#DBDB8D',
  '#9EDAE5',
]
