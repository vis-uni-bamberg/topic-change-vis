<template>
  <g :transform="`translate(${x},${y})`">
    <g :transform="`translate(0,${size})`">
      <polygon
        :points="`${-size / 2},${size / 2} ${size / 2},${size / 2} 0,${
          -size / 2
        }`"
        :fill="color"
        :stroke-width="hoveredEvent?.id === data.id ? 2 : 1"
        stroke="black"
        @mouseover="hoverEvent(data)"
        @mouseleave="hoverEvent(null)"
        @click="selectEvent(data)"
      />
    </g>
    <path
      :d="
      leader([
        [0, 0],
        [0, size / 2],
      ])!
    "
      :stroke="color"
    >
    </path>
  </g>
</template>

<script lang="ts" setup>
  import { TopicPeriod } from '@/models/TopicPeriod'
  import { useEventStore } from '@/stores/eventStore'
  import { storeToRefs } from 'pinia'
  import { line } from 'd3-shape'

  const eventStore = useEventStore()
  const { hoveredEvent } = storeToRefs(eventStore)

  defineProps<{
    data: TopicPeriod
    x: number
    y: number
    size: number
    color: string
  }>()

  const leader = line()

  const hoverEvent = (event: TopicPeriod | null) => {
    eventStore.setHovered(event)
  }
  const selectEvent = (event: TopicPeriod) => {
    eventStore.setSelected(event)
  }
</script>
