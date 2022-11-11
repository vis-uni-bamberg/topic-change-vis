<template>
  <div class="grid grid-cols-3">
    <span class="col-span-2">{{ name }} </span>
    <svg width="30" height="15">
      <path
        v-if="type === 'line' || type === 'dotLine'"
        :d="pathD"
        :stroke="color"
        stroke-width="1.5"
      ></path>
      <rect
        v-if="type === 'dotLine'"
        x="12"
        y="4"
        width="6"
        height="6"
        :fill="color"
      />
      <rect
        v-if="type === 'area'"
        width="30"
        height="15"
        :fill="color"
        opacity="0.25"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'

  defineProps<{
    name: string
    color: string
    type: string
  }>()

  const pathD =
    d3.line()([
      [0, 7],
      [30, 7],
    ]) ?? ''
</script>
