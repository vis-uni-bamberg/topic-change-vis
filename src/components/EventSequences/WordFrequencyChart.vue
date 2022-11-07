<template>
  <div v-if="selectedWord.length > 0">
    <span>{{ selectedWord }}</span>
    <svg :viewBox="`0 0 ${width} ${height}`">
      <g :transform="`translate(${[margin.left, margin.top]})`">
        <rect
          v-for="(period, index) in topic.periods"
          :key="period.id"
          :x="xScale(period.id)"
          :y="yScale(value(topic, period, index))"
          :width="xScale.bandwidth()"
          :height="yRange - yScale(value(topic, period, index))"
          :fill="color"
        />
      </g>
    </svg>
  </div>
</template>
<script setup lang="ts">
  import { Topic } from '@/models/Topic'
  import { TopicPeriod } from '@/models/TopicPeriod'
  import { useGlobalWordStore } from '@/stores/globalWordStore'
  import { useWordStore } from '@/stores/wordStore'
  import * as d3 from 'd3'
  import { storeToRefs } from 'pinia'

  const wordStore = useWordStore()
  const { selectedWord } = storeToRefs(wordStore)

  const { topicToPeriodToSize } = storeToRefs(useGlobalWordStore())

  const props = defineProps<{
    topic: Topic
    xScale: d3.ScaleLinear<number, number>
    color: string
  }>()

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

  const xScale = d3
    .scaleBand()
    .domain(props.topic.periods.map((period) => period.id))
    .range([0, xRange])
    .padding(0.0)

  let yScale = d3.scaleLinear().domain([0, 1]).range([yRange, 0])

  const value = (topic: Topic, period: TopicPeriod, index: number) => {
    if (topicToPeriodToSize.value[topic.id][index] === 0) return 0
    return (
      (period.words.find((word) => word.word === selectedWord.value)?.count ??
        0) / topicToPeriodToSize.value[topic.id][index]
    )
  }
</script>
