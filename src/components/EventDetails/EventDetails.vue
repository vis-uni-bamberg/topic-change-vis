<template>
  <div class="flex flex-col">
    <h3>
      Topic:
      <span :style="`color: ${color}`">
        {{ selectedTopic?.id }}
      </span>
      - Period:
      <span :style="`color: ${color}`">
        {{ selectedPeriod }}
      </span>
    </h3>
    <span>from: {{ selectedEvent?.start }}, to: {{ selectedEvent?.end }}</span>
  </div>
  <div v-if="selectedEvent">
    <div>
      <WordImpactList :color="color" :event="selectedEvent" />
    </div>
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
      selectedEvent.value =
        selectedTopic.value.periods[selectedPeriod.value ?? 0]
    } else {
      color.value = 'black'
      selectedEvent.value = undefined
    }
  })
</script>
