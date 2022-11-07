<template>
  <svg
    class="h-20"
    :viewBox="`0 0 ${width} ${height}`"
    @click="topicStore.updateSelectedTopic(topic)"
  >
    <EventSequenceAxis
      :top="margin.top"
      :bottom="height - margin.bottom"
      :left="margin.left"
    />
    <g :transform="`translate(${[margin.left, margin.top]})`">
      <PeriodTimeline :y="yRange" :width="xRange" />
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
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import EventSequenceVariableLine from './EventSequenceVariableLine.vue'
  import EventGlyph from './EventGlyph.vue'
  import { config } from '@/config'
  import { Topic } from '@/models/Topic'
  import EventSequenceAxis from './EventSequenceAxis.vue'
  import { useTopicStore } from '@/stores/topicStore'
  import TopicSizeAreaChart from './TopicSizeAreaChart.vue'
  import PeriodTimeline from '../PeriodTimeline.vue'

  const topicStore = useTopicStore()

  const props = defineProps<{
    topic: Topic
    color: string
    margin: { [direction: string]: number }
    xScale: d3.ScaleLinear<number, number, never>
    xRange: number
    width: number
  }>()

  const height = 50
  const yRange = height - props.margin.top - props.margin.bottom
  const glyphSize = config.eventGlyphSize

  const yScale = d3.scaleLinear().domain([0, 1]).range([yRange, 0])
</script>
