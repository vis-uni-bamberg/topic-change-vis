import { Event } from '@/models/Event'
import { defineStore } from 'pinia'

export const useEventSequenceStore = defineStore('eventSequenceStore', {
  state: () => {
    return {
      events: [
        {
          id: '1',
          eventType: 'A',
          score: 1,
          value: 100,
        },
        {
          id: '2',
          eventType: 'B',
          score: 4,
          value: 25,
        },
        {
          id: '3',
          eventType: 'C',
          score: 0,
          value: 10,
        },
      ] as Event[],
    }
  },
  actions: {},
  getters: {},
})
