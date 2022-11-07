<template>
  <svg
    class="h-[55rem] w-[50rem]"
    :viewBox="`0 0 ${wordCloud.size()[0]} ${wordCloud.size()[1]}`"
  >
    <g
      :transform="`translate(${wordCloud.size()[0] / 2}, ${
        wordCloud.size()[1] / 2
      })`"
    >
      <WordElement
        v-for="word in wordCloud.words()"
        :key="word.word + word.count"
        :x="word.x"
        :y="word.y"
        :size="word.size"
        :text="word.word"
        :word-size-scale="wordSizeScale"
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
  import { myLayout } from '@/helper/wordCloud'

  const globalWordStore = useGlobalWordStore()
  const { allWords } = storeToRefs(globalWordStore)

  const margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  }
  const width = 400
  const height = 500

  const wordSizeScale = d3
    .scaleLinear()
    .domain([
      0,
      Math.max(...allWords.value.slice(0, 60).map((word) => word.count)),
    ])
    .range([10, 80])

  let wordCloud = buildWordCloud(allWords.value.slice(0, 60))

  function buildWordCloud(words: MyWord[]) {
    const layout = cloud<MyWord>()
      .size([
        width - margin.left - margin.right,
        height - margin.top - margin.bottom,
      ])
      .words(words)
      .text((d) => d.word)
      .padding(5)
      .rotate(() => 0)
      .random(() => 1)
      .spiral(myLayout)
      .fontSize((d) => wordSizeScale(+d.count))

    return layout.start()
  }
</script>
