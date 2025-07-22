<template>
   <div class="container-fluid bg-dark bar">
    <div class="container">
        <div class="row py-3">
            <div class="col text-white">
                <p class="mb-0">&copy; Copyright {{ year }} &nbsp; | &nbsp; Vue by Eli</p>
            </div>
        </div>
    </div>
        
   </div>
</template>

<script setup>
    const date = new Date()
    const year = date.getFullYear()
</script>

<style scoped>
    .bar {
        border-top: 2px solid #F89829;
    }
</style>