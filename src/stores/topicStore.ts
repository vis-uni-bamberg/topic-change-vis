import { Topic } from '@/models/Topic'
import { defineStore } from 'pinia'
import { useDatasetStore } from './datasetStore'

export const useTopicStore = defineStore('topicStore', {
  state: () => {
    return {
      selectedTopic: undefined as Topic | undefined,
      topicColor: 'black',
    }
  },
  actions: {
    updateSelectedTopic(topic: Topic): void {
      if (topic.id !== this.selectedTopic?.id) {
        this.selectedTopic = topic
        this.topicColor = useDatasetStore().colorScale(topic.id)
      } else {
        this.selectedTopic = undefined as Topic | undefined
        this.topicColor = 'black'
      }
    },
  },
  getters: {},
})
