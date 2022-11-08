<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import WordCloud from './components/WordCloud/WordCloud.vue'
  import SimilarityMatrix from './components/SimilarityMatrix/SimilarityMatrix.vue'
  import EventSequenceContainer from './components/EventSequences/EventSequenceContainer.vue'
  import { useDatasetStore } from './stores/datasetStore'
  import { useGlobalWordStore } from './stores/globalWordStore'
  import { useSimilarityStore } from './stores/similarityStore'

  const similarityStore = useSimilarityStore()
  const datasetStore = useDatasetStore()
  const wordCloudStore = useGlobalWordStore()
  datasetStore.loadData()
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- <div>
      <AbsoluteRelativeSelector />
    </div> -->
    <div class="h-full">
      <div class="grid grid-cols-3 h-full">
        <div class="h-screen grid grid-rows-12">
          <div v-for="topic in datasetStore.topics" :key="topic.id">
            <EventSequenceContainer
              :topic="topic"
              :color="datasetStore.colorScale(topic.id)"
            />
          </div>
        </div>
        <div class="h-screen w-full">
          <div v-if="wordCloudStore.allWords.length > 0" class="h-2/3 w-full">
            <WordCloud />
          </div>
          <div
            v-if="
              Object.keys(similarityStore.similaritiesBetweenTopics).length > 0
            "
            class="h-1/3 w-full"
          >
            <SimilarityMatrix />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
