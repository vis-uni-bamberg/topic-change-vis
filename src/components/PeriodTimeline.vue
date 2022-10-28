<template>
  <g ref="group" :transform="`translate(0, ${y})`"> </g>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { onMounted, ref } from 'vue'

  const props = defineProps<{
    width: number
    y: number
  }>()

  // "2020-01-22" "2020-01-31" - "2021-08-02""2021-08-05
  const start = new Date(2020, 0, 22)
  const stop = new Date(2021, 7, 5)

  const timeScale = d3.scaleTime().domain([start, stop]).range([0, props.width])

  const axis = d3
    .axisTop<Date>(timeScale)
    .ticks(d3.timeMonth.every(3))
    .tickFormat(d3.timeFormat('%m/%y'))
    .tickSize(2)

  const group = ref<SVGSVGElement | null>(null)

  onMounted(() => {
    if (group.value) {
      d3.select(group.value).style('font-size', 8).call(axis)
    }
  })
</script>
