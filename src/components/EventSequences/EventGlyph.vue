<template>
  <rect
    :x="x"
    :y="y"
    :width="size"
    :height="size"
    :fill="color"
    stroke="black"
  />
</template>

<script lang="ts" setup>
  defineProps<{
    x: number
    y: number
    size: number
    color: string
  }>()
</script>
