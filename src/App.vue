<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import EventSequence from './components/EventSequences/EventSequence.vue'
  import WordCloud from './components/WordCloud/WordCloud.vue'
  import SimilarityMatrix from './components/SimilarityMatrix/SimilarityMatrix.vue'
  import { useDatasetStore } from './stores/datasetStore'
  import { useGlobalWordStore } from './stores/globalWordStore'
  import { useTopicStore } from './stores/topicStore'
  import { storeToRefs } from 'pinia'

  const datasetStore = useDatasetStore()
  const wordCloudStore = useGlobalWordStore()
  const topicStore = useTopicStore()
  const { selectedTopic } = storeToRefs(topicStore)
  datasetStore.loadData()
</script>

<template>
  <BContainer>
    <BRow>
      <BCol>
        <BListGroup>
          <BListGroupItem
            v-for="topic in datasetStore.topics"
            :key="topic.id"
            :active="selectedTopic.id === topic.id"
            @click="topicStore.updateSelectedTopic(topic)"
          >
            {{ topic.id }}
            <EventSequence
              :topic="topic"
              :color="datasetStore.colorScale(topic.id)"
            />
          </BListGroupItem>
        </BListGroup>
      </BCol>
      <BCol>
        <BRow v-if="wordCloudStore.allWords.length > 0">
          <WordCloud />
        </BRow>
        <BRow>
          <SimilarityMatrix />
        </BRow>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
