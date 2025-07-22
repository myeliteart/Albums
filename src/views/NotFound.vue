<template>
    <div class="container py-5">
    <div class="inline">
      <div class="d-flex align-items-center crsr mb-2" @click="router.back">
          <font-awesome-icon :icon="['fas', 'angle-left']" class="me-sm-2 me-0 px-sm-0 px-1 orng"/>
          <small>Back</small>
      </div> 
    </div>
    <div class="row px-sm-0 px-2">
        <div class="text-center py-5">
            <h1>404 Page</h1>
        </div>
    </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter()
</script>

<style scoped>
     svg {
      font-size: 18px;
    }
    .orng {
      color: #F89829;
    }

    .crsr {
        cursor: pointer;
    }
</style>