<template>
  <path
    :d="variableLineGenerator(variable)(events)!"
    :stroke="color"
    fill="none"
  />
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { Event } from '@/models/Event'

  const props = defineProps<{
    events: Event[]
    xScale: d3.ScaleLinear<number, number>
    yScale: d3.ScaleLinear<number, number>
    color: string
    variable: keyof Event
    glyphSize: number
  }>()

  const variableLineGenerator = (accessor: keyof Event) =>
    d3
      .line<Event>()
      .x((d: Event, i: number) => props.xScale(i) + props.glyphSize / 2)
      .y((d: Event): number => props.yScale(d[accessor] as number))
      .curve(d3.curveCatmullRom.alpha(0.5))
</script>
