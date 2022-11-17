<template>
  <rect
    v-if="selectedPeriod !== undefined && selectedPeriod >= 0"
    :x="xScale(topic.id + '-' + selectedPeriod)"
    :width="xScale.step()"
    :y="0"
    :height="height"
    stroke="black"
    stroke-width="0.5"
    fill="lightgray"
    opacity="0.5"
  />
  <rect
    v-if="selectedPeriod !== undefined && selectedPeriod >= 0"
    :transform="`translate(${-xScale.step() * referencePeriodSize}, 0)`"
    :x="xScale(topic.id + '-' + selectedPeriod)"
    :width="xScale.step() * referencePeriodSize"
    :y="0"
    :height="height"
    stroke="black"
    stroke-width="0.5"
    fill="lightgray"
    opacity="0.25"
  />
</template>

<script setup lang="ts">
  import { Topic } from '@/models/Topic'
  import { usePeriodStore } from '@/stores/periodStore'
  import { ScaleBand } from 'd3-scale'
  import { storeToRefs } from 'pinia'
  import { ref, watchEffect } from 'vue'

  const props = defineProps<{
    topic: Topic
    xScale: ScaleBand<string>
    height: number
  }>()

  const { selectedPeriod } = storeToRefs(usePeriodStore())

  const referencePeriodSize = ref(0)

  watchEffect(() => {
    if (selectedPeriod.value) {
      referencePeriodSize.value =
        props.topic.periods[selectedPeriod.value].referencePeriodSize
    }
  })
</script>
