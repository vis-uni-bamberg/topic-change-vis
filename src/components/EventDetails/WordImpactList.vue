<template>
  <svg class="w-full" :height="height" :viewbox="`0 0 ${width} ${height}`">
    <g :transform="`translate(${[margin.left, margin.top]})`">
      <g :transform="`translate(${[width, 0]})`">
        <g ref="xAxis"></g>
      </g>
      <WordImpactWord
        v-for="(word, index) in event.loo"
        :key="word.word + word.impact"
        :word="word"
        :y="yScale(index)! + yScale(1)/2"
        :height="yScale(1) * 0.9"
        :x="width"
        :value="xScale(word.impact)"
        :color="color"
        :event="event"
      />
      <g :transform="`translate(${[width, 0]})`">
        <path :d="centralLine" stroke="black" />
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { onMounted, ref } from 'vue'
  import WordImpactWord from './WordImpactWord.vue'
  import { useDatasetStore } from '@/stores/datasetStore'
  import { TopicPeriod } from '@/models/TopicPeriod'

  const props = defineProps<{
    event: TopicPeriod
    color: string
  }>()

  const margin = {
    top: 40,
    right: 5,
    bottom: 5,
    left: 5,
  }

  const width = 400
  const height = 800

  const xScale = d3
    .scaleLinear()
    .domain([useDatasetStore().maxLoo, -useDatasetStore().maxLoo])
    .range([-width / 2, width / 2])

  const yScale = d3
    .scaleLinear()
    .domain([0, props.event.loo.length])
    .range([0, height - margin.top])

  const axis = d3
    .axisTop(xScale)
    .ticks(5)
    .tickFormat((d) => Math.abs(d.valueOf()).toString())

  const xAxis = ref<SVGSVGElement | null>()

  onMounted(() => {
    if (xAxis.value) {
      d3.select(xAxis.value)
        .call(axis)
        .selectAll('.tick text')
        .attr('font-size', 18)
    }
  })

  const centralLine =
    d3.line()([
      [0, 0],
      [0, height],
    ]) ?? ''
</script>
