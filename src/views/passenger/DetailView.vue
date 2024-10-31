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
    <p>{{ data.name }}{{ data.trips }}</p>
</template>
