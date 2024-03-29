<template>
  <div>
    <b-collapse :id="`matrix-collapse-${topic.id}`">
      <div v-if="similaritiesWithinTopic[topic.id.slice(1)]" class="mt-2">
        <svg :viewBox="`0 0 ${width} ${height}`">
          <g :transform="`translate(${[margin.left, margin.top]})`">
            <g
              v-for="(period, index) in topic.periods"
              :key="`${period.id}-similarity-row`"
            >
              <rect
                v-for="(periodColumn, indexColumn) in topic.periods"
                :key="`${periodColumn.id}-similarity-column-rect`"
                :x="xScale(periodColumn.id)"
                :y="yScale(index)"
                :width="xScale.bandwidth()"
                :height="yScale(1)"
                :fill="
                  similarityScale(
                    similaritiesWithinTopic[topic.id.slice(1)][index + 1][
                      indexColumn + 1
                    ]
                  )
                "
              />
            </g>
          </g>
        </svg>
      </div>
    </b-collapse>
  </div>
</template>

<script setup lang="ts">
  import * as d3 from 'd3'
  import { Topic } from '@/models/Topic'
  import { useDatasetStore } from '@/stores/datasetStore'
  import { useSimilarityStore } from '@/stores/similarityStore'
  import { storeToRefs } from 'pinia'

  const datasetStore = useDatasetStore()

  const similarityStore = useSimilarityStore()
  const { similaritiesWithinTopic } = storeToRefs(similarityStore)

  const props = defineProps<{
    topic: Topic
    xScale: d3.ScaleBand<string>
  }>()

  const margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 0,
  }
  const width = 400
  const height = 150
  const yRange = height - margin.top - margin.bottom

  const yScale = d3
    .scaleLinear()
    .domain([0, props.topic.periods.length])
    .range([0, yRange])

  const similarityScale = d3
    .scaleLinear<string>()
    .domain([0, 1])
    .range(['white', datasetStore.colorScale(props.topic.id)])
</script>
