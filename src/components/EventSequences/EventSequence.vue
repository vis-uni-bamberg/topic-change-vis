<template>
  <svg :viewBox="`0 0 ${width} ${height}`">
    <path
      :d="connectionLineGenerator(events)!"
      stroke="grey"
      stroke-width="0.25"
      fill="none"
    />
    <g>
      <EventSequenceVariableLine
        v-for="variable in variablesToPlot"
        :key="variable"
        :events="events"
        :x-scale="xScale"
        :y-scale="yScale(variable)"
        :variable="variable"
        :color="variableColorScale(variable)"
        :glyph-size="glyphSize"
      />
    </g>
    <g>
      <EventGlyph
        v-for="event in events"
        :key="event.id"
        :data="event"
        :x="xScale(events.indexOf(event))"
        :y="height / 2 - glyphSize / 2"
        :size="glyphSize"
        color="teal"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
  import { useEventSequenceStore } from '@/stores/eventSequenceStore'
  import { storeToRefs } from 'pinia'
  import * as d3 from 'd3'
  import { Event } from '@/models/Event'
  import EventSequenceVariableLine from './EventSequenceVariableLine.vue'
  import EventGlyph from './EventGlyph.vue'

  const store = useEventSequenceStore()
  const { events } = storeToRefs(store)

  const variablesToPlot = ['score' as keyof Event, 'value' as keyof Event]
  const variableColorScale = d3
    .scaleOrdinal(d3.schemeCategory10)
    .domain(variablesToPlot)

  const margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  }
  const width = 400
  const height = 50
  const glyphSize = 10

  const xScale = d3
    .scaleLinear()
    .domain([0, events.value.length - 1])
    .range([margin.left, width - margin.right - glyphSize])

  const yScale = (accessor: keyof Event) =>
    d3
      .scaleLinear()
      .domain(store.variableExtent(accessor))
      .range([height - margin.bottom, margin.top])

  const connectionLineGenerator = d3
    .line<Event>()
    .x((d: Event, i: number) => xScale(i) + glyphSize / 2)
    .y(height / 2)
</script>
