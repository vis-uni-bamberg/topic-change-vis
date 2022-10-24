import { AbsoluteRelativeSettings } from '@/models/AbsoluteRelativeSettings'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settingsStore', {
  state: () => {
    return {
      metricsSettings: AbsoluteRelativeSettings.ABSOLUTE,
    }
  },
  actions: {},
  getters: {},
})
