<script setup lang="ts">

import { type Data } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import PassengerCard from '@/components/PassengerCard.vue';


const datas = ref<Data[] | null>(null)
const totalDatas = ref(0)
</script>


<template>
  <h1>Events For Good</h1>
  <!-- new element -->
  <div class="datas">
    <template v-for="data in datas" :key="data._id">
      <PassengerCard :data="data" />
      <CategoryCard :data="data" />
    </template>
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

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

</style>
