import { Topic } from '@/models/Topic'
import { defineStore } from 'pinia'
import { useDatasetStore } from './datasetStore'

export const useTopicStore = defineStore('topicStore', {
  state: () => {
    return {
      selectedTopic: { id: '', periods: [] } as Topic,
      topicColor: 'black',
    }
  },
  actions: {
    updateSelectedTopic(topic: Topic): void {
      if (topic.id !== this.selectedTopic.id) {
        this.selectedTopic = topic
        this.topicColor = useDatasetStore().colorScale(topic.id)
      } else {
        this.selectedTopic = { id: '', periods: [] } as Topic
        this.topicColor = 'black'
      }
    },
  },
  getters: {},
})
