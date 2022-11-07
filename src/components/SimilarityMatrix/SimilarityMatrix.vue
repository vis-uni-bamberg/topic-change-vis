<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex">
      <div class="w-1/12"></div>
      <div v-for="topic in topics" :key="topic.id" class="w-1/12">
        {{ topic.id }}
      </div>
    </div>
    <div
      v-for="(outerTopic, outerIndex) in topics"
      :key="outerTopic.id"
      class="flex h-1/6"
    >
      <div class="pr-2 w-1/12 flex items-center justify-center">
        {{ outerTopic.id }}
      </div>
      <div
        v-for="(innerTopic, innerIndex) in topics"
        :key="innerTopic.id"
        class="w-1/12 border-1 border-slate-900 flex items-center justify-center"
      >
        <div v-if="outerTopic.id !== innerTopic.id && outerIndex > innerIndex">
          <SimilarityMatrixPlotCell
            :topic="innerTopic"
            :other-topic="outerTopic"
          />
        </div>
        <div
          v-else-if="outerTopic.id !== innerTopic.id && outerIndex < innerIndex"
          class="h-full w-full"
        >
          <SimilarityMatrixMetricCell
            :topic="innerTopic"
            :other-topic="outerTopic"
          />
        </div>
        <div
          v-else
          class="w-full h-full"
          :style="'background-color: ' + datasetStore.colorScale(outerTopic.id)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useDatasetStore } from '@/stores/datasetStore'
  import { storeToRefs } from 'pinia'
  import SimilarityMatrixPlotCell from './SimilarityMatrixPlotCell.vue'
  import SimilarityMatrixMetricCell from './SimilarityMatrixMetricCell.vue'

  const datasetStore = useDatasetStore()
  const { topics } = storeToRefs(datasetStore)
</script>
