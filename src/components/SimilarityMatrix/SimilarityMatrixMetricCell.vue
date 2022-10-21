<template>
  <div>
    {{ (similarity / periodCount).toPrecision(2) }}
  </div>
</template>
<script setup lang="ts">
  import { Topic } from '@/models/Topic'
  import { useDatasetStore } from '@/stores/datasetStore'
  import { useSimilarityStore } from '@/stores/similarityStore'
  import { storeToRefs } from 'pinia'

  const similarityStore = useSimilarityStore()
  const { similaritiesBetweenTopics } = storeToRefs(similarityStore)

  const datasetStore = useDatasetStore()
  const { periodCount } = storeToRefs(datasetStore)

  const props = defineProps<{
    topic: Topic
    otherTopic: Topic
  }>()

  const similarity = Object.entries(similaritiesBetweenTopics.value)
    .map((period) => {
      return period[1][props.topic.id.slice(1)].find(
        (similarity) => similarity.otherTopicId === props.otherTopic.id.slice(1)
      )
    })
    .reduce((a, b) => a + (b ? b.similarity : 0), 0)

  console.log(similarity)
</script>
