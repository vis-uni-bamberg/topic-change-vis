import { SimilarityMatrix } from '@/models/Similarity'
import * as d3 from 'd3'
import { defineStore } from 'pinia'

export const useSimilarityStore = defineStore('similarityStore', {
  state: () => {
    return {
      similaritiesBetweenTopics: {} as SimilarityMatrix,
    }
  },
  actions: {
    async loadSimilarities(): Promise<void> {
      const similarities = {} as SimilarityMatrix
      const filenames = []
      for (let i = 0; i < 79; i++) {
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
  },
  getters: {},
})
