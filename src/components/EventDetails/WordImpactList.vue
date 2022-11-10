<template>
  <svg class="w-full">
    <g :transform="`translate(${[margin.left, margin.top]})`">
      <g :transform="`translate(${[200, 0]})`">
        <g ref="xAxis"></g>
      </g>
      <WordImpactWord
        v-for="(word, index) in words"
        :key="word.word + 'WordImpactList'"
        :word="word"
        :y="(index + 1) * 20"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { LooWord } from '@/models/Word'
  import { ref, watchEffect } from 'vue'
  import WordImpactWord from './WordImpactWord.vue'

  const props = defineProps<{
    words: LooWord[]
  }>()

  const margin = {
    top: 20,
    right: 5,
    bottom: 5,
    left: 5,
  }

  const width = 400

  let xScale = d3
    .scaleLinear()
    .domain([0, Math.min(...props.words.map((word) => word.impact))])
    .range([0, width])

  const axis = d3.axisTop(xScale)

  const xAxis = ref<SVGSVGElement | null>(null)

  watchEffect(() => {
    xScale.domain([0, Math.min(...props.words.map((word) => word.impact))])
    axis.scale(xScale)
    if (xAxis.value) {
      d3.select(xAxis.value).call(axis)
    }
  })
</script>
