<template>
  <svg
    class="word-cloud"
    :viewBox="`0 0 ${wordCloud.size()[0]} ${wordCloud.size()[1]}`"
  >
    <g
      :transform="`translate(${wordCloud.size()[0] / 2}, ${
        wordCloud.size()[1] / 2
      })`"
    >
      <WordElement
        v-for="word in wordCloud.words()"
        :key="word.word"
        :x="word.x"
        :y="word.y"
        :size="word.size"
        :text="word.word"
      />
    </g>
  </svg>
</template>

<script lang="ts" setup>
  import { useGlobalWordStore } from '@/stores/globalWordStore'
  import * as d3 from 'd3'
  import cloud from 'd3-cloud'
  import { storeToRefs } from 'pinia'
  import WordElement from './WordElement.vue'
  import { MyWord } from '@/models/Word'

  const globalWordStore = useGlobalWordStore()
  const { aggregatedWords } = storeToRefs(globalWordStore)

  const margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  }
  const width = 400
  const height = 1050

  const wordSizeScale = d3
    .scaleLinear()
    .domain([0, Math.max(...aggregatedWords.value.map((word) => word.count))])
    .range([0, 80])

  const wordCloud = cloud<MyWord>()
    .size([
      width - margin.left - margin.right,
      height - margin.top - margin.bottom,
    ])
    .words(aggregatedWords.value as MyWord[])
    .text((d) => d.word)
    .padding(1)
    .rotate(() => 0)
    .spiral('rectangular')
    .fontSize((d) => wordSizeScale(+d.count))

  wordCloud.start()
</script>
