<template>
  <text :x="10" :y="y" @click="useWordStore().updateSelectedWord(word.word)">
    {{ word.word + frequency }}
  </text>
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
  }>()

  const period = ref(selectedEvent.value?.period ?? 0)

  const frequency = ref(
    datasetStore.topics
      .find((topic) => topic.id === selectedEvent.value?.topic)
      ?.periods[period.value].words.find(
        (word) => word.word === props.word.word
      )?.count
  )
</script>
