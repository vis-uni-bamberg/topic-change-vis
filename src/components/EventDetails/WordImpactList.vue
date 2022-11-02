<template>
  <svg>
    <text
      v-for="(word, index) in words"
      :key="word.word + 'WordImpactList'"
      :x="10"
      :y="(index + 1) * 20"
    >
      {{ word.word }}
    </text>
  </svg>
</template>

<script setup lang="ts">
  import { MyWord } from '@/models/Word'

  defineProps<{
    words: MyWord[]
  }>()
</script>
