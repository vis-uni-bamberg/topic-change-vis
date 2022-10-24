<template>
  <b-form-select v-model="metricsSettings" :options="options" class="mb-3">
  </b-form-select>
</template>

<script setup lang="ts">
  import { AbsoluteRelativeSettings } from '@/models/AbsoluteRelativeSettings'
  import { useSettingsStore } from '@/stores/settingsStore'
  import { storeToRefs } from 'pinia'

  const settingsStore = useSettingsStore()
  const { metricsSettings } = storeToRefs(settingsStore)

  const options = [
    { value: AbsoluteRelativeSettings.ABSOLUTE, text: 'Absolute' },
    {
      value: AbsoluteRelativeSettings.RELATIVE_TOPIC,
      text: 'Relative to Topic',
    },
  ]
</script>
