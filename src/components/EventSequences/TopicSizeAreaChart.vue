<template>
  <g>
    <path :d="areaGenerator(periods)!" :fill="color" opacity="0.25"> </path>
  </g>
</template>

<script setup lang="ts">
  import { TopicPeriod } from '@/models/TopicPeriod'
  import { useGlobalWordStore } from '@/stores/globalWordStore'
  import * as d3 from 'd3'

  const props = defineProps<{
    periods: TopicPeriod[]
    xScale: d3.ScaleLinear<number, number>
    yMax: number
    color: string
  }>()

  const yScale = d3
    .scaleLinear()
    .domain([0, useGlobalWordStore().maxGlobalTopicSizeInSinglePeriod])
    .range([props.yMax, 0])

  const areaGenerator = d3
    .area<TopicPeriod>()
    .x((d, index) => props.xScale(index))
    .y1((d) => yScale(d.words.reduce((a, b) => a + b.count, 0)))
    .y0(yScale(0))
    .curve(d3.curveCatmullRom.alpha(0.5))
</script>
