<template>
  <g :transform="`translate(0, ${y})`">
    <text
      :id="`word-label-${word.word}`"
      class="cursor-pointer"
      y="5"
      @click="useWordStore().updateSelectedWord(word.word)"
    >
      {{ word.word }} </text
    ><rect
      v-if="word.word === useWordStore().selectedWord"
      :transform="`translate(${0} ${-textHeight * 0.5})`"
      x="-1"
      :width="textWidth"
      :height="textHeight"
      fill="none"
      stroke="black"
    />
  </g>
  <g
    :transform="`translate(${
      frequency < frequnecyReference ? x + value : x
    }, ${y})`"
  >
    <rect
      :transform="`translate(0, ${-height / 2})`"
      :width="-value"
      :height="height"
      :fill="color"
    />
    <text
      :x="frequency < frequnecyReference ? -value - 5 : 5"
      y="5"
      :text-anchor="frequency < frequnecyReference ? 'end' : 'start'"
    >
      {{ `${frequency} (Ø${frequnecyReference})` }}
    </text>
  </g>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { LooWord } from '@/models/Word'
  import { useDatasetStore } from '@/stores/datasetStore'
  import { useWordStore } from '@/stores/wordStore'
  import { onMounted, ref } from 'vue'
  import { TopicPeriod } from '@/models/TopicPeriod'

  const datasetStore = useDatasetStore()

  const props = defineProps<{
    word: LooWord
    y: number
    x: number
    value: number
    height: number
    color: string
    event: TopicPeriod
  }>()

  const period = ref(props.event?.period ?? 0)

  const frequencies = ref(
    datasetStore.topics
      .find((topic) => topic.id === props.event?.topic)
      ?.periods.slice(Math.max(0, period.value - 4), period.value + 1)
      .map(
        (referencePeriod) =>
          referencePeriod.words.find((word) => word.word === props.word.word)
            ?.count ?? 0
      ) ?? []
  )

  const frequency = frequencies.value[frequencies.value.length - 1]
  const frequnecyReference =
    Math.round(
      (100 *
        frequencies.value
          .slice(0, frequencies.value.length - 1)
          .reduce((a, b) => a + b, 0)) /
        props.event.referencePeriodSize
    ) / 100

  let textWidth = ref(0)
  let textHeight = ref(0)

  onMounted(() => {
    textWidth.value =
      d3
        .select<SVGGraphicsElement, unknown>(`#word-label-${props.word.word}`)
        .node()
        ?.getBBox().width ?? 0
    textHeight.value =
      d3
        .select<SVGGraphicsElement, unknown>(`#word-label-${props.word.word}`)
        .node()
        ?.getBBox().height ?? 0
  })
</script>
