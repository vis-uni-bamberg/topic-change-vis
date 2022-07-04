<template>
  <svg
    :viewBox="`0 0 ${width + margin.left + margin.right} ${
      height + margin.top + margin.bottom
    }`"
  >
    <g :transform="`translate(${[margin.left, margin.top]})`">
      <path :d="connectionLine!" stroke="grey" stroke-width="0.25" />
      <g>
        <EventSequenceVariableLine
          v-for="variable in variablesToPlot"
          :key="variable"
          :events="topic.periods"
          :x-scale="xScale"
          :y-scale="yScale"
          :variable="variable"
          :color="variableColorScale(variable)"
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
          :y="height / 2 - glyphSize / 2"
          :size="glyphSize"
          color="teal"
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
  import { toRefs } from 'vue'
  import { TopicPeriod } from '@/models/TopicPeriod'

  const props = defineProps<{
    topic: Topic
  }>()

  const { topic } = toRefs(props)

  const variablesToPlot = [
    'similarity' as keyof TopicPeriod,
    'threshold' as keyof TopicPeriod,
  ]
  const variableColorScale = d3
    .scaleOrdinal(d3.schemeCategory10)
    .domain(variablesToPlot)

  const margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  }
  const width = 400
  const height = 50
  const glyphSize = config.eventGlyphSize

  const xScale = d3
    .scaleLinear()
    .domain([0, topic.value.periods.length - 1])
    .range([margin.left, width - margin.right])

  const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0])

  const connectionLine = d3.line()([
    [margin.left, height / 2],
    [width - margin.right, height / 2],
  ])
</script>
