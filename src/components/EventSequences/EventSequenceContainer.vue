<template>
  <div
    class="flex w-full text-xs"
    :class="
      selectedTopic?.id === topic.id
        ? 'bg-slate-100 mt-4 mb-4 border-t-2 border-b-2 border-slate-700  '
        : ''
    "
  >
    <div
      class="w-1/6 flex flex-col"
      @click="useTopicStore().updateSelectedTopic(topic)"
    >
      <span class="font-bold text-2xl">
        {{ topic.id }}
      </span>
      <div class="text-base">
        <SvgLegend type="line" :color="color" name="Similarity" />
        <SvgLegend type="line" color="black" name="Threshold" />
        <SvgLegend type="area" :color="color" name="Topic Size" />
        <SvgLegend
          type="dotLine"
          :color="color"
          :name="`Relevance: ${selectedWord}`"
        />
      </div>
      <div class="mt-2">
        <b-button
          v-b-toggle="`matrix-collapse-${topic.id}`"
          pill
          size="sm"
          @click="(e: MouseEvent) => e.stopPropagation()"
        >
          <span class="when-open">Collapse</span
          ><span class="when-closed">Inner-Topic Similarity</span>
        </b-button>
      </div>
    </div>
    <div class="w-5/6">
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
  import SvgLegend from './SvgLegend.vue'
  import { useWordStore } from '@/stores/wordStore'

  const topicStore = useTopicStore()
  const { selectedTopic } = storeToRefs(topicStore)

  const wordStore = useWordStore()
  const { selectedWord } = storeToRefs(wordStore)

  const props = defineProps<{
    topic: Topic
    color: string
  }>()

  const margin = {
    right: 5,
    left: 0,
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
