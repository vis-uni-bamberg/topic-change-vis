<template>
  <div class="h-full w-full text-white" :style="`background-color: ${color}`">
    {{ similarity.toPrecision(2) }}
  </div>
</template>
<script setup lang="ts">
  import { Topic } from '@/models/Topic'
  import { useSimilarityStore } from '@/stores/similarityStore'
  import { storeToRefs } from 'pinia'
  import * as d3 from 'd3'

  const similarityStore = useSimilarityStore()
  const { similaritiesBetweenTopics } = storeToRefs(similarityStore)

  const props = defineProps<{
    topic: Topic
    otherTopic: Topic
  }>()

  const similarity =
    d3.quantile(
      Object.entries(similaritiesBetweenTopics.value)
        .map((period) => {
          return period[1][props.topic.id.slice(1)].find(
            (similarity) =>
              similarity.otherTopicId === props.otherTopic.id.slice(1)
          )
        })
        .sort((a, b) => (b ? b.similarity : 0) - (a ? a.similarity : 0))
        .filter((entry) => entry)
        .map((entry) => entry?.similarity),
      0.95
    ) ?? -1

  const color = d3.interpolateGreys(similarity)
</script>
