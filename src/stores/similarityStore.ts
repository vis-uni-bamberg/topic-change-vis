import {
  SimilarityMatrix,
  SimilarityMatrixWithinTopic,
} from '@/models/Similarity'
import * as d3 from 'd3'
import { defineStore } from 'pinia'

export const useSimilarityStore = defineStore('similarityStore', {
  state: () => {
    return {
      similaritiesBetweenTopics: {} as SimilarityMatrix,
      similaritiesWithinTopic: {} as SimilarityMatrixWithinTopic,
    }
  },
  actions: {
    async loadSimilaritiesBetweenTopics(): Promise<void> {
      const similarities = {} as SimilarityMatrix
      const filenames = []
      for (let i = 0; i < 76; i++) {
        filenames.push(
          './data/similarities_between_topics/similarity_beteen_topics' +
            i +
            '.csv'
        )
        similarities[i.toString()] = {}
      }

      await Promise.all(filenames.map((filename) => d3.csv(filename))).then(
        (files) => {
          files.forEach((file, period) => {
            file.forEach((topic) => {
              Object.keys(topic)
                .slice(1)
                .forEach((otherTopicId) => {
                  const topicNumber = topic[''] ?? '-1'
                  if (!similarities[period.toString()][topicNumber]) {
                    similarities[period.toString()][topicNumber] = []
                  }
                  similarities[period.toString()][topicNumber].push({
                    otherTopicId: otherTopicId.slice(1),
                    similarity: +(topic[otherTopicId] ?? 0),
                  })
                })
            })
          })
        }
      )
      this.similaritiesBetweenTopics = similarities
    },

    async loadSimilaritiesWithinTopics(): Promise<void> {
      const similarities = {} as SimilarityMatrixWithinTopic
      const filenames = []
      for (let i = 0; i < 12; i++) {
        filenames.push(
          './data/similarities_within_topics/similarity_within_topic' +
            (i + 1) +
            '.csv'
        )
        similarities[(i + 1).toString()] = {}
      }

      await Promise.all(filenames.map((filename) => d3.csv(filename))).then(
        (files) => {
          files.forEach((file, topicIndex) => {
            file.forEach((row) => {
              const periodNumber = row[''] ?? '-1'
              Object.keys(row)
                .slice(1)
                .forEach((column) => {
                  const columnNumber = column.slice(1)
                  if (
                    !similarities[(topicIndex + 1).toString()][periodNumber]
                  ) {
                    similarities[(topicIndex + 1).toString()][periodNumber] = {}
                  }
                  similarities[(topicIndex + 1).toString()][periodNumber][
                    columnNumber
                  ] = +(row[column] ?? 0)
                })
            })
          })
        }
      )
      this.similaritiesWithinTopic = similarities
    },
  },
  getters: {},
})
