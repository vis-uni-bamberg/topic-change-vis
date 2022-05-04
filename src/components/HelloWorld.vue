<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useCounterStore } from '@/stores/counter'

  const store = useCounterStore()
  const { count } = storeToRefs(store)
  store.count++
</script>

<template>
  <button type="button" @click="store.increment(2)">
    count is: {{ count }}
  </button>
</template>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
