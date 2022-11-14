<template>
  <rect
    v-if="selectedPeriod !== undefined && selectedPeriod >= 0"
    :x="xScale(topic.id + '-' + selectedPeriod)"
    :width="xScale.step()"
    :y="0"
    :height="height"
    stroke="black"
    fill="none"
  />
</template>

<script setup lang="ts">
  import { Topic } from '@/models/Topic'
  import { usePeriodStore } from '@/stores/periodStore'
  import { ScaleBand } from 'd3-scale'
  import { storeToRefs } from 'pinia'

  defineProps<{
    topic: Topic
    xScale: ScaleBand<string>
    height: number
  }>()

  const { selectedPeriod } = storeToRefs(usePeriodStore())
</script>
