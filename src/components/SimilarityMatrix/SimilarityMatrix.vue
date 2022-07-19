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
          <svg
            class="matrix-cell"
            :viewBox="`0 0 ${width / periodCount} ${height}`"
          >
            <rect
              v-for="(period, index) in innerTopic.periods"
              :key="period.start"
              :x="(index * width) / periodCount / periodCount"
              :width="width / periodCount / periodCount"
              :height="height"
              :fill="
                similarityScale(
                  Math.abs(
                    period.similarity - outerTopic.periods[index]?.threshold
                  )
                )
              "
            />
          </svg>
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
  import { Topic } from '@/models/Topic'
  import { TopicPeriod } from '@/models/TopicPeriod'
  import { useDatasetStore } from '@/stores/datasetStore'
  import * as d3 from 'd3'
  import { storeToRefs } from 'pinia'

  const datasetStore = useDatasetStore()
  const { topics, periodCount } = storeToRefs(datasetStore)

  const width = 300
  const height = 2

  const similarityScale = d3.interpolateGreys
</script>
