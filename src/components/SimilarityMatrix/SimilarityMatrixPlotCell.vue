<template>
  <svg class="w-full h-full" :viewBox="`0 0 ${width / periodCount} ${height}`">
    <rect
      v-for="(period, index) in topic.periods"
      :key="period.start"
      :x="(index * width) / periodCount / periodCount"
      :width="width / periodCount / periodCount"
      :height="height"
      :fill="
        similarityScale(
          similaritiesBetweenTopics[index][otherTopic.id.slice(1)].find(
            (similarity) => similarity.otherTopicId === topic.id.slice(1)
          )?.similarity ?? 0
        )
      "
    />
  </svg>
</template>
<script setup lang="ts">
  import { Topic } from '@/models/Topic'
  import { useDatasetStore } from '@/stores/datasetStore'
  import { useSimilarityStore } from '@/stores/similarityStore'
  import * as d3 from 'd3'
  import { storeToRefs } from 'pinia'

  const similarityStore = useSimilarityStore()
  const { similaritiesBetweenTopics } = storeToRefs(similarityStore)

  const datasetStore = useDatasetStore()
  const { periodCount } = storeToRefs(datasetStore)

  defineProps<{
    topic: Topic
    otherTopic: Topic
  }>()

  const width = 320
  const height = 2

  const similarityScale = d3.interpolateGreys
</script>
