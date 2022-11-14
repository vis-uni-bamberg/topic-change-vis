<template>
  <g :transform="`translate(${x},${y})`">
    <g :transform="`translate(0,${size})`">
      <polygon
        :points="`${-size / 2},${size / 2} ${size / 2},${size / 2} 0,${
          -size / 2
        }`"
        :fill="color"
        stroke="black"
        @click="handleClick"
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
  import { Topic } from '@/models/Topic'
  import { usePeriodStore } from '@/stores/periodStore'
  import { useTopicStore } from '@/stores/topicStore'
  import { line } from 'd3-shape'

  const props = defineProps<{
    topic: Topic
    period: number
    x: number
    y: number
    size: number
    color: string
  }>()

  const leader = line()

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation() // So that it does not trigger the topic selection
    usePeriodStore().setSelected(props.period)
    useTopicStore().updateSelectedTopic(props.topic)
  }
</script>
