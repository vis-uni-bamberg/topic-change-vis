<template>
  <g :transform="`translate(${x}, ${y})`">
    <text
      :id="`text-element-${text}`"
      class="cursor-pointer"
      :font-size="size"
      :text-anchor="'middle'"
      :fill="
      topicsToWords[selectedTopic?.id]
        ? topicsToWords[selectedTopic?.id].find(
            (wordInTopic) => wordInTopic.word === props.text
          )?.count! > 200
          ? topicColor
          : 'black'
        : 'black'
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
  import { onMounted, ref } from 'vue'
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
  }>()

  let textWidth = ref(0)
  let textHeight = ref(0)

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
