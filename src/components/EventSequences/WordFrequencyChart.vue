<template>
  <div v-if="selectedWord.length > 0">
    <span>{{ selectedWord }}</span>
    <svg :viewBox="`0 0 ${width} ${height}`">
      <g :transform="`translate(${[margin.left, margin.top]})`">
        <rect
          v-for="(period, index) in topic.periods"
          :key="period.id"
          :x="xScale(index)"
          :y="yScale(period.words.find((word) => word.word === selectedWord)?.count!)"
          :width="xRange / topic.periods.length"
          :height="
            yRange -
            yScale(
              period.words.find((word) => word.word === selectedWord)?.count ??
                0
            )
          "
          :fill="color"
        />
      </g>
    </svg>
  </div>
</template>
<script setup lang="ts">
  import { AbsoluteRelativeSettings } from '@/models/AbsoluteRelativeSettings'
  import { Topic } from '@/models/Topic'
  import { useGlobalWordStore } from '@/stores/globalWordStore'
  import { useSettingsStore } from '@/stores/settingsStore'
  import { useWordStore } from '@/stores/wordStore'
  import * as d3 from 'd3'
  import { storeToRefs } from 'pinia'
  import { ref, watchEffect } from 'vue'

  const wordStore = useWordStore()
  const { selectedWord } = storeToRefs(wordStore)

  const { maxPeriodWordCount, maxPeriodWordCountPerTopic } = storeToRefs(
    useGlobalWordStore()
  )

  const { metricsSettings } = storeToRefs(useSettingsStore())

  const props = defineProps<{
    topic: Topic
    xScale: d3.ScaleLinear<number, number>
    color: string
  }>()

  const margin = {
    top: 1,
    right: 5,
    bottom: 1,
    left: 5,
  }
  const width = 400
  const height = 20
  const xRange = width - margin.left - margin.right
  const yRange = height - margin.top - margin.bottom

  let yScale = ref(d3.scaleLinear().domain([0, 0]).range([yRange, 0]))
  watchEffect(() => {
    switch (metricsSettings.value) {
      case AbsoluteRelativeSettings.ABSOLUTE:
        yScale.value = d3
          .scaleLinear()
          .domain([0, maxPeriodWordCount.value])
          .range([yRange, 0])
        break
      case AbsoluteRelativeSettings.RELATIVE_TOPIC:
        yScale.value = d3
          .scaleLinear()
          .domain([0, maxPeriodWordCountPerTopic.value[props.topic.id]])
          .range([yRange, 0])
        break
    }
  })
</script>
