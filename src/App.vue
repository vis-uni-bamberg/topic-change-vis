<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import EventSequence from './components/EventSequences/EventSequence.vue'
  import WordCloud from './components/WordCloud/WordCloud.vue'
  import SimilarityMatrix from './components/SimilarityMatrix/SimilarityMatrix.vue'
  import { useDatasetStore } from './stores/datasetStore'

  const datasetStore = useDatasetStore()
  datasetStore.loadData()
</script>

<template>
  <BContainer>
    <BRow>
      <BCol>
        <BListGroup>
          <BListGroupItem v-for="topic in datasetStore.topics" :key="topic.id">
            {{ topic.id }}
            <EventSequence
              :topic="topic"
              :color="datasetStore.colorScale(topic.id)"
            />
          </BListGroupItem>
        </BListGroup>
      </BCol>
      <BCol>
        <BRow>
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
