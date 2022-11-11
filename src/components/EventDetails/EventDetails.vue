<template>
  <div class="h-full flex flex-col">
    <div>
      <h3>
        Selected Event:
        <span :style="`color: ${color}`">
          {{ selectedEvent?.id }}
        </span>
      </h3>
      <span
        >from: {{ selectedEvent?.start }}, to: {{ selectedEvent?.end }}</span
      >
    </div>
    <div v-if="selectedEvent">
      <div>
        <WordImpactList :words="selectedEvent?.loo ?? []" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useDatasetStore } from '@/stores/datasetStore'
  import { useEventStore } from '@/stores/eventStore'
  import { storeToRefs } from 'pinia'
  import { ref, watchEffect } from 'vue'
  import WordImpactList from './WordImpactList.vue'

  const eventStore = useEventStore()
  const { selectedEvent } = storeToRefs(eventStore)

  let topic = ref('')
  let color = ref('black')

  watchEffect(() => {
    if (selectedEvent) {
      topic.value =
        selectedEvent.value?.id.slice(
          0,
          selectedEvent.value?.id.indexOf('-')
        ) ?? ''

      color.value = useDatasetStore().colorScale(topic.value ?? '')
    }
  })
</script>
