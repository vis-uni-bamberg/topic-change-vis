<template>
  <div class="border-2 border-black h-96">
    <div v-if="selectedEvent">
      <h3>
        Selected Event:
        <span :style="`color: ${color}`">
          {{ selectedEvent?.id }}
        </span>
      </h3>
      <span>from: {{ selectedEvent.start }}, to: {{ selectedEvent.end }}</span>
    </div>
    <div>
      <WordImpactList :words="selectedEvent?.words.slice(0, 5) ?? []" />
    </div>
    <div>
      <WordImpactList :words="selectedEvent?.words.slice(5, 10) ?? []" />
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
