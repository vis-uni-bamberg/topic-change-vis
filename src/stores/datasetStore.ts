import { Topic } from '@/models/Topic'
import * as d3 from 'd3'
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
              threshold: 0.35,
              words: ['This', 'is', 'a', 'test'],
            },
            {
              id: '12',
              start: '2',
              end: '3',
              similarity: 0.7,
              threshold: 0.45,
              words: ['And', 'another', 'test'],
            },
            {
              id: '12',
              start: '2',
              end: '3',
              similarity: 0.7,
              threshold: 0.55,
              words: ['Yet', 'another', 'test'],
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
              words: ['This', 'is', 'a', 'test'],
            },
            {
              id: '22',
              start: '2',
              end: '3',
              similarity: 0.65,
              threshold: 0.65,
              words: ['This', 'is', 'a', 'test'],
            },
            {
              id: '23',
              start: '4',
              end: '4',
              similarity: 0.65,
              threshold: 0.65,
              words: ['This', 'is', 'a', 'test'],
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
              threshold: 0.7,
              words: ['This', 'is', 'a', 'test'],
            },
            {
              id: '32',
              start: '2',
              end: '3',
              similarity: 0.75,
              threshold: 0.7,
              words: ['This', 'is', 'a', 'test'],
            },
            {
              id: '32',
              start: '2',
              end: '3',
              similarity: 0.8,
              threshold: 0.75,
              words: ['This', 'is', 'a', 'test'],
            },
          ],
          events: [],
        },
      ] as Topic[],
    }
  },
  actions: {},
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
