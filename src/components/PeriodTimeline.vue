<template>
  <g ref="group" :transform="`translate(0, ${y})`"> </g>
</template>

<script setup lang="ts">
  import { useDatasetStore } from '@/stores/datasetStore'
  import * as d3 from 'd3'
  import { onMounted, ref } from 'vue'

  const datasetStore = useDatasetStore()

  const props = defineProps<{
    width: number
    y: number
  }>()

  // "2020-01-22" "2020-01-31" - "2021-08-02""2021-08-05
  const timeParser = d3.timeParse('%Y-%m-%d')
  const start = timeParser(datasetStore.timerange[0] ?? '')
  const stop = timeParser(datasetStore.timerange[1] ?? '')
  const timeScale = d3.scaleTime()

  if (start && stop) {
    timeScale.domain([start, stop]).range([0, props.width])
  }

  const axis = d3
    .axisBottom<Date>(timeScale)
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
