<template>
  <text :x="x" :y="y" :font-size="size" :text-anchor="'middle'">
    {{ text }}
  </text>
</template>

<script lang="ts" setup>
  defineProps<{
    x: number | undefined
    y: number | undefined
    size: number | undefined
    text: string | undefined
  }>()
</script>
