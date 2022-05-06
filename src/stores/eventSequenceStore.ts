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
  getters: {
    variableExtent: (state) => {
      return (accessor: keyof Event) => {
        return [
          Math.min(
            ...state.events.map((event: Event) => event[accessor] as number)
          ),
          Math.max(
            ...state.events.map((event: Event) => event[accessor] as number)
          ),
        ]
      }
    },
  },
})
