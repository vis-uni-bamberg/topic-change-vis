import { Event } from '@/models/Event'
import { defineStore } from 'pinia'

export const useEventStore = defineStore('eventStore', {
  state: () => {
    return {
      selected: null as Event | null,
      hovered: null as Event | null,
    }
  },
  actions: {
    setSelected(payload: Event): void {
      this.selected === payload
        ? (this.selected = null)
        : (this.selected = payload)
    },
    setHovered(payload: Event | null): void {
      this.hovered = payload
    },
  },
  getters: {},
})
