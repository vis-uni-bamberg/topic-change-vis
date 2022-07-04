<template>
  <path
    :d="variableLineGenerator(variable)(events)!"
    :stroke="color"
    fill="none"
  />
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { TopicPeriod } from '@/models/TopicPeriod'

  const props = defineProps<{
    events: TopicPeriod[]
    xScale: d3.ScaleLinear<number, number>
    yScale: d3.ScaleLinear<number, number>
    color: string
    variable: keyof TopicPeriod
    glyphSize: number
  }>()

  const variableLineGenerator = (accessor: keyof TopicPeriod) =>
    d3
      .line<TopicPeriod>()
      .x((d: TopicPeriod, i: number) => props.xScale(i))
      .y((d: TopicPeriod): number => props.yScale(d[accessor] as number))
      .curve(d3.curveCatmullRom.alpha(0.5))
</script>
