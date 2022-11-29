<template>
  <div class="flex flex-col">
    <h3>
      Topic:
      <span :style="`color: ${color}`">
        {{ selectedTopic?.id }}
      </span>
      - Time Step:
      <span :style="`color: ${color}`">
        {{ selectedPeriod }}
      </span>
    </h3>
    <span>from: {{ selectedEvent?.start }}, to: {{ selectedEvent?.end }}</span>
    <span
      >Similarity: {{ selectedEvent?.similarity.toPrecision(2) }} - Threshold:
      {{ selectedEvent?.threshold.toPrecision(2) }}</span
    >
  </div>
  <div v-if="selectedEvent" class="grid place-items-center">
    <WordImpactList :color="color" :event="selectedEvent" />
  </div>
</template>
<script setup lang="ts">
  import { TopicPeriod } from '@/models/TopicPeriod'
  import { useDatasetStore } from '@/stores/datasetStore'
  import { usePeriodStore } from '@/stores/periodStore'
  import { useTopicStore } from '@/stores/topicStore'
  import { storeToRefs } from 'pinia'
  import { ref, watchEffect } from 'vue'
  import WordImpactList from './WordImpactList.vue'

  const { selectedTopic } = storeToRefs(useTopicStore())
  const { selectedPeriod } = storeToRefs(usePeriodStore())

  let selectedEvent = ref(undefined as TopicPeriod | undefined)

  let color = ref('black')

  watchEffect(() => {
    if (selectedTopic.value) {
      color.value = useDatasetStore().colorScale(selectedTopic.value?.id)
      if (selectedPeriod.value !== undefined) {
        selectedEvent.value = selectedTopic.value.periods[selectedPeriod.value]
      } else {
        selectedEvent.value = undefined
      }
    } else {
      color.value = 'black'
      selectedEvent.value = undefined
    }
  })
</script>
