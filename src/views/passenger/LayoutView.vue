<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Data } from '@/types'
import PassengerServices from '@/services/PassengerServices';
import { useRouter } from 'vue-router'

const data = ref<Data | null>(null)
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
const router = useRouter()


onMounted(() => {
  PassengerServices.getEvent(parseInt(props.id))
        .then((response) => {
            event.value = response.data
        })
        .catch((error) => {
            if (error.respose && error.response.status === 404) {
                router.push({
                    name: '404-resource-view',
                    params: { resource: 'event' }
                })
            } else {
                router.push({ name: 'network-error-view' })
            }
        })
})
</script>
<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <nav>
            <RouterLink :to="{ name: 'event-detail-view' }">Details</RouterLink>
            |
            <RouterLink :to="{ name: 'event-register-view' }">Register</RouterLink>
            |
            <RouterLink :to="{ name: 'event-edit-view' }">Edit</RouterLink>
        </nav>
        <RouterView :event="event" />
    </div>
</template>
