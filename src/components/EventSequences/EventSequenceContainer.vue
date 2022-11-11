<template>
  <div
    class="flex w-full text-xs"
    :class="selectedTopic?.id === topic.id ? 'border-slate-800 border-4' : ''"
    @click="useTopicStore().updateSelectedTopic(topic)"
  >
    <div class="w-1/5 flex flex-col">
      <span class="font-bold">
        {{ topic.id }}
      </span>
      <div>
        <span> Similarity: </span>
        <span> Threshold: </span>
      </div>
      <div>
        <span> Topic size: </span>
        <span> Word Relevance: </span>
      </div>
      <div class="mt-2">
        <b-button v-b-toggle="`matrix-collapse-${topic.id}`" pill size="sm">
          <span class="when-open">Close</span
          ><span class="when-closed">Open</span>
        </b-button>
      </div>
    </div>
    <div class="w-4/5">
      <EventSequence
        :topic="topic"
        :color="color"
        :x-margins="margin"
        :x-range="xRange"
        :x-scale="xScale"
        :width="width"
      />
      <TopicSimilarityMatrix :x-scale="xScale" :topic="topic" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { Topic } from '@/models/Topic'
  import { useTopicStore } from '@/stores/topicStore'
  import { storeToRefs } from 'pinia'
  import EventSequence from '@/components/EventSequences/EventSequence.vue'
  import TopicSimilarityMatrix from './TopicSimilarityMatrix.vue'
  import { toRefs } from 'vue'

  const topicStore = useTopicStore()
  const { selectedTopic } = storeToRefs(topicStore)

  const props = defineProps<{
    topic: Topic
    color: string
  }>()

  const margin = {
    right: 5,
    left: 5,
  }

  const width = 400
  const xRange = width - margin.left - margin.right

  const { topic } = toRefs(props)

  const xScale = d3
    .scaleBand()
    .domain(props.topic.periods.map((period) => period.id))
    .range([0, xRange])
</script>

<style scoped>
  .collapsed > .when-open {
    display: none;
  }
  button:not(.collapsed) > .when-closed {
    display: none;
  }
</style>
