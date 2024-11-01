<script setup lang="ts">

import { type Data } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import PassengerCard from '@/components/PassengerCard.vue';
import PassengerServices from '@/services/PassengerServices';

const datas = ref<Data[] | null>(null)
const totalDatas = ref(0)
const pageSize = ref(2)
const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalDatas.value / pageSize.value)
  return page.value < totalPages
})
const page = computed(() => props.page)

const start = computed(() => (page.value - 1) * pageSize.value);
const end = computed(() => start.value + pageSize.value);
const displayedData = computed(() => {
  if (!datas.value) return [];
  return datas.value.slice(start.value, end.value);
});
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    default: 2
  }
})


onMounted(() => {
  fetchPassengers()
})

const fetchPassengers = () => {
  PassengerServices.getPassengers(pageSize.value, page.value)
    .then((response) => {
      console.log('API Response:', response.data);
      datas.value = response.data.data;
      totalDatas.value = response.data.totalPassengers;
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
};

watchEffect(fetchPassengers);
</script>


<template>
  <h1>Passengers List</h1>
  <div class="datas">
    <template v-for="data in displayedData" :key="data._id">
      <PassengerCard :data="data" />
    </template>
  </div>
  <div class="pagination">
    <RouterLink id="page-prev" :to="{ name: 'passenger-list-view', query: { page: page - 1, size: pageSize } }" rel="prev"
      v-if="page != 1">
      &#60; Prev Page</RouterLink>
    <RouterLink id="page-next" :to="{ name: 'passenger-list-view', query: { page: page + 1, size: pageSize } }" rel="next"
      v-if="hasNexPage">
      Next Page &#62;</RouterLink>
  </div>
  <div class="pagination-size-selector">
    <select @change="fetchPassengers" v-model="pageSize">
      <option value="2">2 per page</option>
      <option value="4">4 per page</option>
      <option value="8">8 per page</option>
      <option value="10">10 per page</option>
    </select>
  </div>
</template>

<style scoped>
.datas {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
  justify-content: space-between;
  align-items: baseline;
}

.pagination .pagination-size-selector {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

</style>
