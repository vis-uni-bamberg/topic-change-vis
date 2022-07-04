<template>
  <table>
    <tr>
      <th></th>
      <th v-for="topic in topics" :key="topic.name">
        {{ topic.name }}
      </th>
    </tr>
    <tr v-for="outerTopic in topics" :key="outerTopic.name">
      <th class="pr-4">
        {{ outerTopic.name }}
      </th>
      <td v-for="innerTopic in topics" :key="innerTopic.name">
        <div>
          <svg class="matrix-cell" :viewBox="`0 0 ${width} ${height}`">
            <rect
              v-for="(period, index) in periods"
              :key="period.start"
              :x="index * squareSize"
              :width="squareSize"
              :height="height"
              fill="grey"
            />
          </svg>
        </div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts" setup>
  const periods = [
    {
      start: '1',
    },
    {
      start: '2',
    },
    {
      start: '3',
    },
    {
      start: '4',
    },
  ]

  const topics = [
    {
      name: 'abc',
    },
    {
      name: 'def',
    },
    {
      name: 'ghi',
    },
  ]

  const width = 300 / topics.length
  const height = 10
  const squareSize = width / periods.length
</script>
