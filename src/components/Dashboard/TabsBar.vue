<template>
    <ul class="nav flex-column">
    
    </ul>
</template>

<script setup>
     import { useUserStore } from '@/stores/user';
    const store = useUserStore();

    import { storeToRefs } from 'pinia';
    const { tabs } = storeToRefs(store);

</script>