<template>
    <div class="container-fluid px-0">
        <the-nav></the-nav>
    </div>
        <div class="">
          <router-view :key="$route.fullPath"/>
          <!-- <the-footer></the-footer> -->
        </div>
      <the-footer></the-footer> 
</template>

<script setup>
  import TheNav from './components/TheNav.vue';
  import TheFooter from './components/TheFooter.vue';
  import { RouterView } from 'vue-router'
</script>

<style>
body {
  padding: 0;
  background-color: #f9f9f9 !important;
  height: 100vh;
}

@media (min-width: 1024px) {
 
}
</style>
