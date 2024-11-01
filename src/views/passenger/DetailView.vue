<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Data } from '@/types'

const props = defineProps<{
    data: Data
    id: string
}>()
const { data } = toRefs(props)

</script>
<template>
  <div v-if="data">
    <h1>{{ data.name }}</h1>
    <p>{{ data.name }} has tripped {{ data.trips }} times</p>
    <h2>Airlines</h2>
    <ul>
      <li v-for="airline in data.airline" :key="airline._id">
        <router-link :to="{ name: 'airline-detail-view', params: { id: $route.params.id, airlineId: airline._id } }">
          {{ airline.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
