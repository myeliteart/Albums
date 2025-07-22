<template>
  <div class="container py-5">
  <div class="row gx-4 px-md-0 px-2">
    <h2>About us</h2>
    <div class="col-lg-6 about">
      <p class="py-1">
         Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
      </p>
      <p>
         Sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
      </p>
    </div>
    <div class="col-lg-6">
      <img :src="image" class="rounded img-fluid" alt="bobov rebbe">
    </div>
  </div>
  </div>
</template>

<script setup>
  const image = new URL('@/assets/img/preview.jpg', import.meta.url).href
</script>

<style scoped>
.about p{
  color: #333537;
}
@media (min-width: 1024px) {
 
}
</style>
