<template>
  <g :transform="`translate(${-width / 2}, 2)`">
    <rect
      v-for="period in periods"
      :key="'scarf' + word + period"
      :x="xScale(period)"
      :width="xScale(1)"
      y="0"
      :height="
        period > (selectedPeriod ?? -1) - 4 && period <= (selectedPeriod ?? -1)
          ? 15
          : 2
      "
      :fill="getColor(word, period)"
    />
  </g>
</template>
<script setup lang="ts">
  import * as d3 from 'd3'
  import { useGlobalWordStore } from '@/stores/globalWordStore'
  import { storeToRefs } from 'pinia'
  import { useDatasetStore } from '@/stores/datasetStore'
  import { usePeriodStore } from '@/stores/periodStore'

  const globalWordStore = useGlobalWordStore()
  const { wordsToHighestTopicPerPeriod } = storeToRefs(globalWordStore)

  const periodStore = usePeriodStore()
  const { selectedPeriod } = storeToRefs(periodStore)

  const datasetStore = useDatasetStore()

  const periods = Array.from(Array(datasetStore.periodCount).keys())

  const props = defineProps<{
    width: number
    word: string
  }>()

  const xScale = d3
    .scaleLinear()
    .domain([0, datasetStore.periodCount])
    .range([0, props.width])

  const getColor = (word: string, period: number) => {
    const highestTopicForWordForPeriod =
      wordsToHighestTopicPerPeriod.value[word][period.toString()]
    if (highestTopicForWordForPeriod) {
      return datasetStore.colorScale(highestTopicForWordForPeriod.topic)
    }
    return 'none'
  }
</script>
