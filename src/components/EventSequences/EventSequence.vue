<template>
  <div>
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      @click="topicStore.updateSelectedTopic(topic)"
    >
      <EventSequenceAxis
        :top="margin.top"
        :bottom="height - margin.bottom"
        :left="margin.left"
      />
      <g :transform="`translate(${[margin.left, margin.top]})`">
        <path :d="bottomLine!" stroke="black" stroke-width="0.5" />
        <TopicSizeAreaChart
          :color="color"
          :x-scale="xScale"
          :periods="topic.periods"
          :y-max="yRange"
        />
        <g>
          <EventSequenceVariableLine
            :events="topic.periods"
            :x-scale="xScale"
            :y-scale="yScale"
            variable="threshold"
            color="black"
            :glyph-size="glyphSize"
          />
          <EventSequenceVariableLine
            :events="topic.periods"
            :x-scale="xScale"
            :y-scale="yScale"
            variable="similarity"
            :color="color"
            :glyph-size="glyphSize"
          />
        </g>
        <g>
          <EventGlyph
            v-for="period in topic.periods.filter(
              (period) => period.similarity <= period.threshold
            )"
            :key="period.id"
            :data="period"
            :x="xScale(topic.periods.indexOf(period))"
            :y="yScale(period.similarity)"
            :size="glyphSize"
            :color="color"
          />
        </g>
      </g>
    </svg>
    <WordFrequencyChart :color="color" :topic="topic" :x-scale="xScale" />
    <TopicSimilarityMatrix :topic="topic" />
  </div>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import EventSequenceVariableLine from './EventSequenceVariableLine.vue'
  import EventGlyph from './EventGlyph.vue'
  import { config } from '@/config'
  import { Topic } from '@/models/Topic'
  import { toRefs } from 'vue'
  import EventSequenceAxis from './EventSequenceAxis.vue'
  import WordFrequencyChart from './WordFrequencyChart.vue'
  import TopicSimilarityMatrix from './TopicSimilarityMatrix.vue'
  import { useTopicStore } from '@/stores/topicStore'
  import TopicSizeAreaChart from './TopicSizeAreaChart.vue'

  const topicStore = useTopicStore()

  const props = defineProps<{
    topic: Topic
    color: string
  }>()

  const { topic } = toRefs(props)

  const margin = {
    top: 1,
    right: 5,
    bottom: 1,
    left: 5,
  }
  const width = 400
  const height = 50
  const xRange = width - margin.left - margin.right
  const yRange = height - margin.top - margin.bottom
  const glyphSize = config.eventGlyphSize

  const xScale = d3
    .scaleLinear()
    .domain([0, topic.value.periods.length - 1])
    .range([0, xRange])

  const yScale = d3.scaleLinear().domain([0, 1]).range([yRange, 0])

  const bottomLine = d3.line()([
    [xScale.range()[0], yRange],
    [xScale.range()[1], yRange],
  ])
</script>
