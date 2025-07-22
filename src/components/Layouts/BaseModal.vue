<template>
    <div @click="cancel"></div>
   <dialog open :class="mode">
     <slot></slot>
   </dialog>
</template>

<script setup>
    const props = defineProps(['mode'])

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { selectedFav, bigImage, NewAlbumError, selectedAlbumToDelete } = storeToRefs(store);

const cancel = () => {
    selectedFav.value = null;
    bigImage.value = false;
    NewAlbumError.value = false;
    selectedAlbumToDelete.value = null;
}
</script>

<style scoped>
div{
    position: fixed;
    opacity: 0.8;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
}
    dialog {
        position: fixed;
        top: 40%;
        left: 0%;
        margin: 0 auto;
        border: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: .4rem;
        overflow: hidden;
        z-index: 100;
    }
    .dialog2 {
        position: fixed;
        top: 8%;
        left: 0%;
        margin: 0 auto;
        border: none;
        padding: 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: .4rem;
        overflow: hidden;
        z-index: 100;
    }

    @media screen and (max-width: 780px) {
        .dialog2 {
        position: fixed;
        top: 20%;
        left: 0%;
        margin: 0 auto;
        border: none;
        padding: 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: .4rem;
        overflow: hidden;
        z-index: 100;
    }
    }
</style>