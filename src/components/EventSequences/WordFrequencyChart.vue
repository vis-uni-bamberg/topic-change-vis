<template>
  <g v-if="selectedWord.length > 0">
    <g :transform="`translate(${xScale.step() / 2}, 0)`">
      <rect
        v-for="(period, index) in topic.periods"
        :key="period.id"
        :transform="`translate(${-width / 2}, ${-height / 2})`"
        :x="xScale(period.id)"
        :y="yScale(value(topic, period, index))"
        :width="width"
        :height="height"
        :fill="value(topic, period, index) === 0 ? 'none' : color"
      />
      <path
        :d="connectionLineGenerator(topic.periods) ?? ''"
        :stroke="color"
        fill="none"
      />
    </g>
  </g>
</template>
<script setup lang="ts">
  import { Topic } from '@/models/Topic'
  import { TopicPeriod } from '@/models/TopicPeriod'
  import { useGlobalWordStore } from '@/stores/globalWordStore'
  import { useWordStore } from '@/stores/wordStore'
  import * as d3 from 'd3'
  import { storeToRefs } from 'pinia'

  const wordStore = useWordStore()
  const { selectedWord } = storeToRefs(wordStore)

  const { topicToPeriodToSize } = storeToRefs(useGlobalWordStore())

  const props = defineProps<{
    topic: Topic
    xScale: d3.ScaleBand<string>
    yScale: d3.ScaleLinear<number, number>
    color: string
  }>()

  const width = 3
  const height = 3

  const value = (topic: Topic, period: TopicPeriod, index: number) => {
    if (topicToPeriodToSize.value[topic.id][index] === 0) return 0
    return (
      ((period.words.find((word) => word.word === selectedWord.value)?.count ??
        0) *
        5) /
      topicToPeriodToSize.value[topic.id][index]
    )
  }

  const connectionLineGenerator = d3
    .line<TopicPeriod>()
    .x((d: TopicPeriod) => props.xScale(d.id) ?? 0)
    .y((d: TopicPeriod, i: number): number =>
      props.yScale(value(props.topic, d, i))
    )
    .curve(d3.curveCatmullRom.alpha(0.5))
</script>
