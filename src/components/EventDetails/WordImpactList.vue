<template>
  <svg class="w-full" :height="height" :viewbox="`0 0 ${width} ${height}`">
    <g :transform="`translate(${[margin.left, margin.top]})`">
      <g :transform="`translate(${[200, 0]})`">
        <g ref="xAxis" font-size="18"></g>
      </g>
      <WordImpactWord
        v-for="(word, index) in words"
        :key="word.word + word.impact"
        :word="word"
        :y="yScale(index)! + yScale(1)/2"
        :height="yScale(1) * 0.9"
        :value="xScale(word.impact)"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { LooWord } from '@/models/Word'
  import { onMounted, ref } from 'vue'
  import WordImpactWord from './WordImpactWord.vue'
  import { useDatasetStore } from '@/stores/datasetStore'

  const props = defineProps<{
    words: LooWord[]
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
    .domain([0, useDatasetStore().maxLoo])
    .range([0, width])

  const yScale = d3
    .scaleLinear()
    .domain([0, props.words.length])
    .range([0, height - margin.top])

  const axis = d3.axisTop(xScale).ticks(5)
  const xAxis = ref<SVGSVGElement | null>()

  onMounted(() => {
    if (xAxis.value) {
      d3.select(xAxis.value).call(axis)
    }
  })
</script>
