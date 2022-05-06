<template>
  <rect
    :x="x"
    :y="store.selected?.id === data.id ? y + 10 : y"
    :width="size"
    :height="size"
    :fill="color"
    :stroke-width="store.hovered?.id === data.id ? 2 : 1"
    stroke="black"
    @mouseover="hoverEvent(data)"
    @mouseleave="hoverEvent(null)"
    @click="selectEvent(data)"
  />
</template>

<script lang="ts" setup>
  import { Event } from '@/models/Event'
  import { useEventStore } from '@/stores/eventStore'

  const store = useEventStore()

  defineProps<{
    data: Event
    x: number
    y: number
    size: number
    color: string
  }>()

  const hoverEvent = (event: Event | null) => {
    store.setHovered(event)
  }
  const selectEvent = (event: Event) => {
    store.setSelected(event)
  }
</script>
