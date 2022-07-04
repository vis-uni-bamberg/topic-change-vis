import { TopicPeriod } from '@/models/TopicPeriod'
import { defineStore } from 'pinia'

export const useEventStore = defineStore('eventStore', {
  state: () => {
    return {
      selected: null as TopicPeriod | null,
      hovered: null as TopicPeriod | null,
    }
  },
  actions: {
    setSelected(payload: TopicPeriod): void {
      this.selected === payload
        ? (this.selected = null)
        : (this.selected = payload)
    },
    setHovered(payload: TopicPeriod | null): void {
      this.hovered = payload
    },
  },
  getters: {},
})
