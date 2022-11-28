<template>
  <g :transform="`translate(${x}, ${y})`">
    <text
      :id="`text-element-${text}`"
      class="cursor-pointer"
      :font-size="fontSize"
      :text-anchor="'middle'"
      :fill="textColor"
      :opacity="
        selectedTopic && selectedPeriod
          ? value(
              selectedTopic,
              selectedTopic?.periods[selectedPeriod ?? 0],
              selectedPeriod ?? 0
            )
          : selectedPeriod
          ? valueGlobal(selectedPeriod)
          : 1
      "
      @click="wordStore.updateSelectedWord(text!)"
    >
      {{ text }}
    </text>
    <WordScarfPlot v-if="textWidth > 0" :width="textWidth" :word="text!" />
  </g>
  <rect
    v-if="text === wordStore.selectedWord"
    :transform="`translate(${-textWidth / 2} ${-textHeight * 0.75})`"
    :x="x"
    :y="y"
    :width="textWidth"
    :height="textHeight"
    fill="none"
    stroke="black"
  />
</template>

<script lang="ts" setup>
  import { useWordStore } from '@/stores/wordStore'
  import { onMounted, ref, watchEffect } from 'vue'
  import * as d3 from 'd3'
  import { storeToRefs } from 'pinia'
  import { useGlobalWordStore } from '@/stores/globalWordStore'
  import { useTopicStore } from '@/stores/topicStore'
  import WordScarfPlot from './WordScarfPlot.vue'
  import { Topic } from '@/models/Topic'
  import { TopicPeriod } from '@/models/TopicPeriod'
  import { usePeriodStore } from '@/stores/periodStore'
  import { useDatasetStore } from '@/stores/datasetStore'

  const globalWordStore = useGlobalWordStore()
  const { topicsToWords, topicToPeriodToSize } = storeToRefs(globalWordStore)

  const topicStore = useTopicStore()
  const { selectedTopic, topicColor } = storeToRefs(topicStore)

  const periodStore = usePeriodStore()
  const { selectedPeriod } = storeToRefs(periodStore)

  const datasetStore = useDatasetStore()
  const { topics } = storeToRefs(datasetStore)

  const wordStore = useWordStore()

  const props = defineProps<{
    x: number | undefined
    y: number | undefined
    size: number | undefined
    text: string | undefined
    wordSizeScale: d3.ScalePower<number, number, never>
  }>()

  let textWidth = ref(0)
  let textHeight = ref(0)

  let textColor = ref('black')
  let fontSize = ref(props.size)

  watchEffect(() => {
    if (selectedTopic.value) {
      textColor.value =
        (topicsToWords.value[selectedTopic.value.id]?.find(
          (wordInTopic) => wordInTopic.word === props.text
        )?.count ?? 0) > 500
          ? topicColor.value
          : 'black'

      const count = topicsToWords.value[selectedTopic.value.id]?.find(
        (wordInTopic) => wordInTopic.word === props.text
      )?.count

      fontSize.value = count ? props.wordSizeScale(count) : 0
    } else {
      fontSize.value = props.size
      textColor.value = topicColor.value
    }
  })

  onMounted(() => {
    textWidth.value =
      d3
        .select<SVGGraphicsElement, unknown>(`#text-element-${props.text}`)
        .node()
        ?.getBBox().width ?? 0
    textHeight.value =
      d3
        .select<SVGGraphicsElement, unknown>(`#text-element-${props.text}`)
        .node()
        ?.getBBox().height ?? 0
  })

  const opacityScale = d3.scaleLinear().domain([0, 1]).range([0.1, 1])
  const value = (topic: Topic, period: TopicPeriod, index: number) => {
    if (topicToPeriodToSize.value[topic.id][index] === 0) return 0
    return opacityScale(
      (((period.words.find((word) => word.word === props.text)?.count ?? 0) *
        5) /
        topicToPeriodToSize.value[topic.id][index]) *
        20
    )
  }
  const valueGlobal = (periodIndex: number) => {
    const wordRelevanceInPeriod =
      topics.value
        .map((topic) => topic.periods[periodIndex])
        .map(
          (period) =>
            ((period.words.find((word) => word.word === props.text)?.count ??
              0) *
              5) /
            period.words.reduce((a, word) => a + word.count, 0)
        )
        .reduce((a, b) => a + b, 0) * 1.5
    return opacityScale(wordRelevanceInPeriod)
  }
</script>
