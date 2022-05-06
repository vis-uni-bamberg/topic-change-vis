<template>
  <svg :viewBox="`0 0 ${width} ${height}`">
    <g>
      <path
        :d="connectionLineGenerator(events)!"
        stroke="grey"
        stroke-width="0.25"
        fill="none"
      />
      <rect
        v-for="event in events"
        :key="event.id"
        :x="xScale(events.indexOf(event))"
        :y="height / 2 - glyphWidth / 2"
        :width="glyphWidth"
        :height="glyphWidth"
        fill="teal"
        stroke="black"
      />
      <path
        v-for="variable in variablesToPlot"
        :key="variable"
        :d="variableLineGenerator(variable)(events)!"
        :stroke="variableColorScale(variable)"
        fill="none"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
  import { useEventSequenceStore } from '@/stores/eventSequenceStore'
  import { storeToRefs } from 'pinia'
  import * as d3 from 'd3'
  import { Event } from '@/models/Event'

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
  const glyphWidth = 10

  const xScale = d3
    .scaleLinear()
    .domain([0, events.value.length - 1])
    .range([margin.left, width - margin.right - glyphWidth])

  const yExtent = (accessor: keyof Event) => [
    Math.min(...events.value.map((event: Event) => event[accessor] as number)),
    Math.max(...events.value.map((event: Event) => event[accessor] as number)),
  ]
  const yScale = (accessor: keyof Event) =>
    d3
      .scaleLinear()
      .domain(yExtent(accessor))
      .range([height - margin.bottom, margin.top])

  const variableLineGenerator = (accessor: keyof Event) =>
    d3
      .line<Event>()
      .x((d: Event, i: number) => xScale(i) + glyphWidth / 2)
      .y((d: Event): number => yScale(accessor)(d[accessor] as number))
      .curve(d3.curveCatmullRom.alpha(0.5))

  const connectionLineGenerator = d3
    .line<Event>()
    .x((d: Event, i: number) => xScale(i) + glyphWidth / 2)
    .y(height / 2)
</script>
