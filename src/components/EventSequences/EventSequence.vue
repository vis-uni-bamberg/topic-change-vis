<template>
  <svg class="w-full" :viewBox="`0 0 ${width} ${height}`" @click="handleClick">
    <g :transform="`translate(${[xMargins.left, margin.top]})`">
      <PeriodTimeline :y="yRange" :width="xRange" />
      <TopicSizeAreaChart
        :color="color"
        :x-scale="xScale"
        :periods="topic.periods"
        :y-max="yRange"
      />
      <g>
        <EventSequenceVariableLine
          :events="topic.periods"
          :x-scale="xScale"
          :y-scale="yScale"
          variable="threshold"
          color="black"
          :glyph-size="glyphSize"
        />
        <EventSequenceVariableLine
          :events="topic.periods"
          :x-scale="xScale"
          :y-scale="yScale"
          variable="similarity"
          :color="color"
          :glyph-size="glyphSize"
        />
      </g>
      <g>
        <EventGlyph
          v-for="period in topic.periods.filter(
            (period) => period.similarity <= period.threshold
          )"
          :key="period.id"
          :topic="topic"
          :period="period.period"
          :x="(xScale(period.id) ?? 0) + xScale.step() / 2"
          :y="yScale(period.similarity)"
          :size="glyphSize"
          :color="color"
        />
      </g>
      <WordFrequencyChart
        :color="color"
        :topic="topic"
        :x-scale="xScale"
        :y-scale="yScale"
      />
      <TimeIndicator :topic="topic" :x-scale="xScale" :height="yRange" />
    </g>
  </svg>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import EventSequenceVariableLine from './EventSequenceVariableLine.vue'
  import EventGlyph from './EventGlyph.vue'
  import { config } from '@/config'
  import { Topic } from '@/models/Topic'
  import { toRefs } from 'vue'
  import WordFrequencyChart from './WordFrequencyChart.vue'
  import TopicSizeAreaChart from './TopicSizeAreaChart.vue'
  import PeriodTimeline from '../PeriodTimeline.vue'
  import TimeIndicator from './TimeIndicator.vue'
  import { usePeriodStore } from '@/stores/periodStore'
  import { useTopicStore } from '@/stores/topicStore'
  import { useDatasetStore } from '@/stores/datasetStore'

  const periodStore = usePeriodStore()
  const topicStore = useTopicStore()
  const datasetStore = useDatasetStore()

  const props = defineProps<{
    topic: Topic
    color: string
    xMargins: { [direction: string]: number }
    xScale: d3.ScaleBand<string>
    xRange: number
    width: number
  }>()

  const { topic } = toRefs(props)

  const margin = {
    top: 1,
    bottom: 12,
  }
  const width = 400
  const height = 60
  const yRange = height - margin.top - margin.bottom

  const glyphSize = config.eventGlyphSize

  const yScale = d3.scaleLinear().domain([0, 1]).range([yRange, 0])

  const handleClick = (e: MouseEvent) => {
    const ptr = d3.pointer(e)
    const clickedPeriod = Math.round(
      (ptr[0] - props.xMargins.left - props.xScale.step() / 2) /
        props.xScale.step()
    )

    const periodChange = clickedPeriod !== periodStore.selectedPeriod
    const topicChange = topic.value !== topicStore.selectedTopic

    if (topicChange && periodChange) {
      if (clickedPeriod >= 0 && clickedPeriod < datasetStore.periodCount) {
        periodStore.setSelected(clickedPeriod)
      }
      topicStore.updateSelectedTopic(props.topic)
    } else if (topicChange && !periodChange) {
      topicStore.updateSelectedTopic(props.topic)
    } else if (!topicChange && periodChange) {
      if (clickedPeriod >= 0 && clickedPeriod < datasetStore.periodCount) {
        periodStore.setSelected(clickedPeriod)
      }
    } else {
      if (clickedPeriod >= 0 && clickedPeriod < datasetStore.periodCount) {
        periodStore.setSelected(clickedPeriod)
      }
      topicStore.updateSelectedTopic(props.topic)
    }
  }
</script>
