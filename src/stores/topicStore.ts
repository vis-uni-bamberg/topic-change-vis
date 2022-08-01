import { Topic } from '@/models/Topic'
import { defineStore } from 'pinia'

export const useTopicStore = defineStore('topicStore', {
  state: () => {
    return {
      selectedTopic: null as Topic | null,
    }
  },
  actions: {
    updateSelectedTopic(topic: Topic): void {
      if (this.selectedTopic) {
        if (topic.id !== this.selectedTopic.id) {
          this.selectedTopic = topic
        }
        this.selectedTopic = null
      }
      this.selectedTopic = topic
    },
  },
  getters: {},
})
