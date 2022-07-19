import { defineStore } from 'pinia'

export const useTopicStore = defineStore('topicStore', {
  state: () => {
    return {
      selectedTopic: {
        id: 'V2',
        index: 1,
      },
    }
  },
  actions: {
    updateSelectedTopic(topic: { id: string; index: number }): void {
      this.selectedTopic = topic
    },
  },
  getters: {},
})
