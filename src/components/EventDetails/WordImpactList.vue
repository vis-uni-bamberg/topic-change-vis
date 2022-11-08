<template>
  <svg class="w-full">
    <g :transform="`translate(${[margin.left, margin.top]})`">
      <g :transform="`translate(${[200, 0]})`">
        <g ref="xAxis"></g>
      </g>
      <text
        v-for="(word, index) in words"
        :key="word.word + 'WordImpactList'"
        :x="10"
        :y="(index + 1) * 20"
      >
        {{ word.word }}
      </text>
    </g>
  </svg>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { MyWord } from '@/models/Word'
  import { ref, watchEffect } from 'vue'

  const props = defineProps<{
    words: MyWord[]
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
    .domain([0, Math.max(...props.words.map((word) => word.count))])
    .range([0, width])

  const axis = d3.axisTop(xScale)

  const xAxis = ref<SVGSVGElement | null>(null)

  watchEffect(() => {
    xScale.domain([0, Math.max(...props.words.map((word) => word.count))])
    axis.scale(xScale)
    if (xAxis.value) {
      d3.select(xAxis.value).call(axis)
    }
  })
</script>
