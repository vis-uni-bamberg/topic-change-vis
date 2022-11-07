<template>
  <div :class="selectedTopic?.id === topic.id ? 'bg-slate-300' : 'flex'">
    <div>
      {{ topic.id }}
      <b-button v-b-toggle="`matrix-collapse-${topic.id}`">
        <span class="when-open">-</span><span class="when-closed">+</span>
      </b-button>
    </div>
    <div>
      <EventSequence
        :topic="topic"
        :color="color"
        :margin="margin"
        :x-range="xRange"
        :x-scale="xScale"
        :width="width"
      />
      <WordFrequencyChart :color="color" :topic="topic" :x-scale="xScale" />
      <TopicSimilarityMatrix :topic="topic" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { Topic } from '@/models/Topic'
  import { useTopicStore } from '@/stores/topicStore'
  import { storeToRefs } from 'pinia'
  import EventSequence from '@/components/EventSequences/EventSequence.vue'
  import WordFrequencyChart from './WordFrequencyChart.vue'
  import TopicSimilarityMatrix from './TopicSimilarityMatrix.vue'
  import { toRefs } from 'vue'

  const topicStore = useTopicStore()
  const { selectedTopic } = storeToRefs(topicStore)

  const props = defineProps<{
    topic: Topic
    color: string
  }>()

  const margin = {
    top: 1,
    right: 5,
    bottom: 1,
    left: 5,
  }

  const width = 400
  const xRange = width - margin.left - margin.right

  const { topic } = toRefs(props)

  const xScale = d3
    .scaleLinear()
    .domain([0, topic.value.periods.length - 1])
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
