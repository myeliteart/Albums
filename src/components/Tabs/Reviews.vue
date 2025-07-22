<template>
   <base-button mode="reverse" @click="router.push({ name: 'AddReview'})">Add Review</base-button>
   <p v-if="!oneAlbum.reviews.length" class="pt-2">There are no reviews yet</p>
    <div v-for="review in oneAlbum.reviews" :key="review" class="my-3 brk">
        <div v-if="review.rating">Rating: <b>{{ review.rating }}</b></div>
        <p class="pt-2 mb-1"><b>{{ review.title }}</b></p>
        <small class="py-0 mt-0">{{ review.review }}</small>
        <p class="pb-0 pt-2 mb-0">{{ review.name }} &nbsp; | &nbsp; {{ dateWithoutTime }}</p>
        <hr>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    const router = useRouter()
    const route = useRoute();

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    const oneAlbum = computed(() =>{
        return store.albums.find((itemm) => itemm.title.toLowerCase().split(' ').join('-') == route.params.id) 
    })

    const date = new Date();
    const dateWithoutTime = date.toLocaleDateString();
</script>

<style scoped>
     .brk {
      word-wrap: break-word;
      padding: 0;
    }
    
</style>
