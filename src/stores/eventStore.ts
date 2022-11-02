import { TopicPeriod } from '@/models/TopicPeriod'
import { defineStore } from 'pinia'

export const useEventStore = defineStore('eventStore', {
  state: () => {
    return {
      selectedEvent: null as TopicPeriod | null,
      hoveredEvent: null as TopicPeriod | null,
    }
  },
  actions: {
    setSelected(payload: TopicPeriod): void {
      this.selectedEvent === payload
        ? (this.selectedEvent = null)
        : (this.selectedEvent = payload)
      console.log(this.selectedEvent)
    },
    setHovered(payload: TopicPeriod | null): void {
      this.hoveredEvent = payload
    },
  },
  getters: {},
})
