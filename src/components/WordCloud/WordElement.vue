<template>
  <g :transform="`translate(${x}, ${y})`">
    <text
      :id="`text-element-${text}`"
      class="cursor-pointer"
      :font-size="fontSize"
      :text-anchor="'middle'"
      :fill="textColor"
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

  const globalWordStore = useGlobalWordStore()
  const { topicsToWords } = storeToRefs(globalWordStore)

  const topicStore = useTopicStore()
  const { selectedTopic, topicColor } = storeToRefs(topicStore)

  const wordStore = useWordStore()

  const props = defineProps<{
    x: number | undefined
    y: number | undefined
    size: number | undefined
    text: string | undefined
    wordSizeScale: d3.ScaleLinear<number, number, never>
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
</script>
