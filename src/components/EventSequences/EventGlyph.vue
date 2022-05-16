<template>
  <rect
    :x="x"
    :y="selected?.id === data.id ? y + 10 : y"
    :width="size"
    :height="size"
    :fill="color"
    :stroke-width="hovered?.id === data.id ? 2 : 1"
    stroke="black"
    @mouseover="hoverEvent(data)"
    @mouseleave="hoverEvent(null)"
    @click="selectEvent(data)"
  />
</template>

<script lang="ts" setup>
  import { Event } from '@/models/Event'
  import { useEventStore } from '@/stores/eventStore'
  import { storeToRefs } from 'pinia'

  const eventStore = useEventStore()
  const { selected, hovered } = storeToRefs(eventStore)

  defineProps<{
    data: Event
    x: number
    y: number
    size: number
    color: string
  }>()

  const hoverEvent = (event: Event | null) => {
    eventStore.setHovered(event)
  }
  const selectEvent = (event: Event) => {
    eventStore.setSelected(event)
  }
</script>
