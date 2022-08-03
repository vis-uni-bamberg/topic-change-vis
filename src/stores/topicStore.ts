import { Topic } from '@/models/Topic'
import { defineStore } from 'pinia'

export const useTopicStore = defineStore('topicStore', {
  state: () => {
    return {
      selectedTopic: { id: '', periods: [] } as Topic,
    }
  },
  actions: {
    updateSelectedTopic(topic: Topic): void {
      if (topic.id !== this.selectedTopic.id) {
        this.selectedTopic = topic
      } else {
        this.selectedTopic = { id: '', periods: [] } as Topic
      }
    },
  },
  getters: {},
})
