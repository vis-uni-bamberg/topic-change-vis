<template>
  <g :transform="`translate(${x - size},${y + size / 2})`">
    <polygon
      :points="`0,${size} ${size},${size} ${size / 2},0`"
      :fill="color"
      :stroke-width="hovered?.id === data.id ? 2 : 1"
      stroke="black"
      @mouseover="hoverEvent(data)"
      @mouseleave="hoverEvent(null)"
      @click="selectEvent(data)"
    />
  </g>
  <path
    :d="
      leader([
        [x - size / 2, y + size / 2],
        [x - size / 2, y],
      ])!
    "
    :stroke="color"
  >
  </path>
</template>

<script lang="ts" setup>
  import { TopicPeriod } from '@/models/TopicPeriod'
  import { useEventStore } from '@/stores/eventStore'
  import { storeToRefs } from 'pinia'
  import { line } from 'd3-shape'

  const eventStore = useEventStore()
  const { hovered } = storeToRefs(eventStore)

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
