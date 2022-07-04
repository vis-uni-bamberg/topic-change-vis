<template>
  <table>
    <tr>
      <th></th>
      <th v-for="topic in topics" :key="topic.id">
        {{ topic.id }}
      </th>
    </tr>
    <tr v-for="outerTopic in topics" :key="outerTopic.id">
      <th class="pr-4">
        {{ outerTopic.id }}
      </th>
      <td v-for="innerTopic in topics" :key="innerTopic.id">
        <div>
          <svg class="matrix-cell" :viewBox="`0 0 ${width} ${height}`">
            <rect
              v-for="(period, index) in innerTopic.periods"
              :key="period.start"
              :x="index * periodWidth"
              :width="periodWidth"
              :height="height"
              :fill="
                similarityScale(
                  period.similarity - outerTopic.periods[index].threshold
                )
              "
            />
          </svg>
        </div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts" setup>
  import { useDatasetStore } from '@/stores/datasetStore'
  import * as d3 from 'd3'
  import { storeToRefs } from 'pinia'

  const datasetStore = useDatasetStore()
  const { topics } = storeToRefs(datasetStore)

  const width = 300 / datasetStore.periodCount
  const height = 10
  const periodWidth = width / datasetStore.periodCount

  const similarityScale = d3.interpolateGreys
</script>
