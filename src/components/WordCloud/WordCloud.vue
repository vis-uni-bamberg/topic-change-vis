<template>
  <svg class="word-cloud" :viewBox="`0 0 ${width} ${height}`">
    <g :transform="`translate(${width / 2}, ${height / 2})`">
      <WordElement
        v-for="word in wordCloud.words()"
        :key="word.text"
        :x="word.x"
        :y="word.y"
        :size="word.size"
        :text="word.text"
      />
    </g>
  </svg>
</template>

<script lang="ts" setup>
  import { useGlobalWordStore } from '@/stores/globalWordStore'
  import cloud from 'd3-cloud'
  import { storeToRefs } from 'pinia'
  import WordElement from './WordElement.vue'

  const globalWordStore = useGlobalWordStore()
  const { words } = storeToRefs(globalWordStore)

  const margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  }
  const width = 400
  const height = 400

  const wordCloud = cloud()
    .size([
      width - margin.left - margin.right,
      height - margin.top - margin.bottom,
    ])
    .words(words.value)
    .padding(5)
    .rotate(() => 0)
    .fontSize((d) => d.size ?? 10)

  wordCloud.start()
</script>
