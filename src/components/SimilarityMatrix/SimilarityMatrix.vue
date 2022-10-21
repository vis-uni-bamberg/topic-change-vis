<template>
  <table class="table-fixed">
    <tr>
      <th></th>
      <th v-for="topic in topics" :key="topic.id">
        {{ topic.id }}
      </th>
    </tr>
    <tr v-for="outerTopic in topics" :key="outerTopic.id">
      <th class="pr-2">
        {{ outerTopic.id }}
      </th>
      <td
        v-for="innerTopic in topics"
        :key="innerTopic.id"
        class="border-1 border-slate-900"
      >
        <div v-if="outerTopic.id !== innerTopic.id">
          <SimilarityMatrixPlotCell
            :topic="innerTopic"
            :other-topic="outerTopic"
          />
        </div>
        <div
          v-else
          class="w-full h-5"
          :style="'background-color: ' + datasetStore.colorScale(outerTopic.id)"
        ></div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts" setup>
  import { useDatasetStore } from '@/stores/datasetStore'
  import { storeToRefs } from 'pinia'
  import SimilarityMatrixPlotCell from './SimilarityMatrixPlotCell.vue'

  const datasetStore = useDatasetStore()
  const { topics } = storeToRefs(datasetStore)
</script>
