<template>
  <g :transform="`translate(${10}, ${y})`">
    <text y="5" @click="useWordStore().updateSelectedWord(word.word)">
      {{ word.word }}
    </text>
    <g :transform="`translate(190, 0)`">
      <rect
        :transform="`translate(0, ${-height / 2})`"
        :width="value"
        :height="height"
        :fill="datasetStore.colorScale(selectedEvent?.topic!)"
      />
      <text x="5" y="5">
        {{
          `${frequency[frequency.length - 1]} (Ø${
            frequency
              .slice(0, frequency.length - 1)
              .reduce((a, b) => a + b, 0) / 4
          })`
        }}
      </text>
    </g>
  </g>
</template>

<script setup lang="ts">
  import { LooWord } from '@/models/Word'
  import { useDatasetStore } from '@/stores/datasetStore'
  import { useEventStore } from '@/stores/eventStore'
  import { useWordStore } from '@/stores/wordStore'
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'

  const eventStore = useEventStore()
  const { selectedEvent } = storeToRefs(eventStore)

  const datasetStore = useDatasetStore()

  const props = defineProps<{
    word: LooWord
    y: number
    value: number
    height: number
  }>()

  const period = ref(selectedEvent.value?.period ?? 0)

  const frequency = ref(
    datasetStore.topics
      .find((topic) => topic.id === selectedEvent.value?.topic)
      ?.periods.slice(Math.max(0, period.value - 4), period.value + 1)
      .map(
        (referencePeriod) =>
          referencePeriod.words.find((word) => word.word === props.word.word)
            ?.count ?? 0
      ) ?? []
  )
</script>
