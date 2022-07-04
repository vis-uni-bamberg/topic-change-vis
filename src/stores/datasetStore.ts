import { Topic } from '@/models/Topic'
import { defineStore } from 'pinia'

export const useDatasetStore = defineStore('datasetStore', {
  state: () => {
    return {
      topics: [
        {
          id: '1',
          periods: [
            {
              id: '11',
              start: '1',
              end: '2',
              similarity: 0.7,
              threshold: 0.65,
              words: [],
            },
            {
              id: '12',
              start: '2',
              end: '3',
              similarity: 0.7,
              threshold: 0.65,
              words: [],
            },
            {
              id: '12',
              start: '2',
              end: '3',
              similarity: 0.7,
              threshold: 0.65,
              words: [],
            },
          ],
          events: [],
        },
        {
          id: '2',
          periods: [
            {
              id: '21',
              start: '1',
              end: '2',
              similarity: 0.65,
              threshold: 0.6,
              words: [],
            },
            {
              id: '22',
              start: '2',
              end: '3',
              similarity: 0.65,
              threshold: 0.65,
              words: [],
            },
            {
              id: '23',
              start: '4',
              end: '4',
              similarity: 0.65,
              threshold: 0.65,
              words: [],
            },
          ],
          events: [],
        },
        {
          id: '3',
          periods: [
            {
              id: '31',
              start: '1',
              end: '2',
              similarity: 0.7,
              threshold: 0.65,
              words: [],
            },
            {
              id: '32',
              start: '2',
              end: '3',
              similarity: 0.7,
              threshold: 0.65,
              words: [],
            },
            {
              id: '32',
              start: '2',
              end: '3',
              similarity: 0.7,
              threshold: 0.65,
              words: [],
            },
          ],
          events: [],
        },
      ] as Topic[],
    }
  },
  actions: {},
  getters: {
    timerange: (state) => {
      return [state.topics[0].periods[0].start, state.topics[0].periods[-1].end]
    },
    periodCount: (state) => {
      return state.topics[0].periods.length
    },
  },
})
