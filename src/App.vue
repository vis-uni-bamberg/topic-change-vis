<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import EventSequence from './components/EventSequences/EventSequence.vue'
  import WordCloud from './components/WordCloud/WordCloud.vue'
</script>

<template>
  <BContainer>
    <BRow>
      <BCol>
        <BCard>
          <BListGroup>
            <BListGroupItem
              v-for="number in Array.from(Array(10).keys())"
              :key="number"
            >
              <EventSequence />
            </BListGroupItem>
          </BListGroup>
        </BCard>
      </BCol>
      <BCol>
        <BCard>
          <WordCloud />
        </BCard>
      </BCol>
    </BRow>
  </BContainer>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
