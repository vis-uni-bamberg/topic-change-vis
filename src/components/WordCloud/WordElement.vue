<template>
  <text
    :id="`text-element-${text}`"
    class="cursor-pointer"
    :x="x"
    :y="y"
    :font-size="size"
    :text-anchor="'middle'"
    :fill="color"
    @click="wordStore.updateSelectedWord(text!)"
  >
    {{ text }}
  </text>
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

  const wordStore = useWordStore()

  const props = defineProps<{
    x: number | undefined
    y: number | undefined
    size: number | undefined
    text: string | undefined
    color: string | undefined
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
