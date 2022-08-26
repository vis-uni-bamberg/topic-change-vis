<template>
  <path :d="line!" stroke-width="0.5" stroke="black" />
  <text :x="2" :y="props.top + 6" font-size="8px" text-anchor="middle">
    1
  </text>
  <text :x="2" :y="props.bottom - 1" font-size="8px" text-anchor="middle">
    0
  </text>
</template>
<script lang="ts" setup>
  import * as d3 from 'd3'

  const props = defineProps<{
    top: number
    bottom: number
    left: number
  }>()

  const line = d3.line()([
    [props.left, props.top],
    [props.left, props.bottom],
  ])
</script>
