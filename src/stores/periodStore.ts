import { defineStore } from 'pinia'

export const usePeriodStore = defineStore('periodStore', {
  state: () => {
    return {
      selectedPeriod: undefined as number | undefined,
      hoveredPeriod: undefined as number | undefined,
    }
  },
  actions: {
    setSelected(payload: number): void {
      this.selectedPeriod === payload
        ? (this.selectedPeriod = undefined)
        : (this.selectedPeriod = payload)
    },
    setHovered(payload: number): void {
      this.hoveredPeriod = payload
    },
  },
  getters: {},
})
