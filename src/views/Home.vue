<template>
  <div class="container-fluid px-0">
    <div class="bg-image" :style="{'background-image': `url(${banner})`}"></div>
  </div>
  <div class="container py-5">
        <div class="row px-sm-0 px-2">
          <p class="text-center" v-if="!slicedAlbums.length">Your Music page is currently empty</p>
          <div class="d-flex justify-content-between align-items-center">
            <h1 class="pb-2" v-if="slicedAlbums.length">Featured Music</h1>

            <div class="ms-auto d-flex" v-if="slicedAlbums.length">
              <div>
                <font-awesome-icon :icon="['fas', 'list']" class="me-3 crsr" title="List View" :class="view == 'list' ? 'orng' : ''" @click="view = 'list'" />
                <font-awesome-icon :icon="['fas', 'grip-vertical']" class="crsr" title="Grid View" :class="view == 'grid' ? 'orng' : ''" @click="view = 'grid'" />
              </div>
              <p @click="router.push({name: 'music'})" class="crsr ms-5 underL">View all Music</p>
            </div>
          </div>

          <div class="col-sm-6 col-md-4 col-lg-3 mb-4 zoom" v-for="album in slicedAlbums" :key="album.id"  v-if="view == 'grid'">
            <base-card>
              <template v-slot:top>
                <div class="position">
                    <span class="absolute badge bg-primary">{{ album.tag }}</span>
                    <img :src="album.img" @click="toMusicDetail(album)" class="card-img-top crsr" :alt="album.title">
                </div>
              </template>
              <template v-slot:bottom>
                <div class="d-flex justify-content-between">
                  <div>
                    <p class="card-text crsr underL" @click="artistDetails(album)">{{ album.artist }}</p>
                    <h6 class="my-1 crsr card-title underL" @click="toMusicDetail(album)">{{ album.title }}</h6>
                    <p class="card-text">${{ album.price }}.00</p>
                  </div>
                 <!-- <div class="mt-1"> <base-button @click="MyList(album, index)" :mode="favorites.find(itm => itm.id == album.id) ? 'orange' : 'reverse'">{{ favorites.find(itm => itm.id == album.id) ? 'Added' : 'Favorite' }}</base-button></div> -->
                 <div class="mt-1 crsr">
                  <font-awesome-icon  @click="MyList(album)" :icon="[favorites.find(itm => itm.id == album.id) ? favSolid : favRegular, 'heart']" class="me-3 orng iconnn"/>
                  <font-awesome-icon class="iconnn" :icon="['fas', 'cart-shopping']" :class="cart.find(itm => itm.id == album.id) ? 'orng' : 'cart'" @click="addToCart(album)" />
                 </div>
                </div>
              </template>
          </base-card>
        </div>

        <!-- list View -->
        <div v-if="view == 'list'">
            <div v-for="album in slicedAlbums" :key="album.id" class="d-flex justify-content-between my-2 text-left align-items-center">
             <div class="d-flex align-items-center">
              <img :src="album.img" @click="toMusicDetail(album)" class="small-img rounded crsr me-4 my-2" :alt="album.title">
                <div class="me-4">
                    <div class="card-text crsr underL" @click="artistDetails(album)">{{ album.artist }}</div>
                    <h6 class="my-1 crsr card-title underL" @click="toMusicDetail(album)">{{ album.title }}</h6>
                    <span class="badge bg-primary">{{ album.tag }}</span>
                    <div class="card-text my-2">${{ album.price }}.00</div>
               </div>
               </div>
                  <div class="mt-2 crsr">
                    <font-awesome-icon  @click="MyList(album)" :icon="[favorites.find(itm => itm.id == album.id) ? favSolid : favRegular, 'heart']"  class="me-3 orng iconnn"/>
                    <font-awesome-icon class="iconnn" :icon="['fas', 'cart-shopping']" :class="cart.find(itm => itm.id == album.id) ? 'orng' : 'cart'" @click="addToCart(album)" />
                  </div>
        </div>
        </div>

    </div>
  </div>
 
  <div class="position">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded orng" v-if="top" @click="backToTop" />
    </div>
   
</template>

<script setup>
    import  { ref } from 'vue'

    import { useRouter } from 'vue-router';
    const router = useRouter()

    import { useToTop } from '@/ToTop.js'
    const { top, backToTop } = useToTop();

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { listCount, favorites, slicedAlbums, CartCount, cart, view } = storeToRefs(store);

    const banner = ref (new URL('@/assets/img/banner.jpg', import.meta.url).href)
    const favSolid = 'fas'
    const favRegular = 'far'

    const toMusicDetail = (album) => {
      router.push({ name: 'musicDetails', params: {id: album.title.toLowerCase().split(' ').join('-')}});
    }

    const MyList = (album) => {
      const inTheList = favorites.value.findIndex(item => item.id == album.id)
      if(inTheList >= 0) {
        return;
      } else {
        favorites.value.unshift(album)
        listCount.value++
      }
    }
    
    const addToCart = (item) => {
      const here = cart.value.find(itm => itm.id == item.id)
      if(here) {
        CartCount.value++
        item.quantity++
        return;
      } else {
        cart.value.unshift(item)
        console.log(cart.value)
        item.quantity = 1
        CartCount.value++
      }
    }

    const artistDetails = (item) => {
      router.push({name: 'Artist', params: {aid: item.artist.toLowerCase().split(' ').join('-')}})
    }
 </script>

<style scoped>
    .position{
      position: relative;
    }
    .absolute {
      position: absolute;
      top: 7px;
      left: 7px; 
    }
    .absoluteTop{
      position: fixed;
      background-color: #333537;
      padding: 6px 8px;
      bottom: 15px;
      right: 15px;
    }
    .bg-primary {
      background-color: #F89829 !important;
    }
    .card-text {
        color: #333537;
        margin-bottom: 0;
    }
    .crsr {
      cursor: pointer;
    }

    .small-img {
      width: 165px;
      height: 165px;
    }

    .orange {
        background-color: #F89829;
        color:  #fff;
        padding: 5px 15px;
        border-radius: .3rem;
        border: 1px solid #F89829;
    }

    .bg-image {
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 455px;
    }

    svg {
      font-size: 18px;
    }

     .iconnn {
      font-size: 19px;
    }

    .cart{
      color: #333537;
    }

    .relative {
      position: relative;
    }
  
    .zoom {
      transition: transform .2s; 
    }
    .zoom:hover {
      transform: scale(1.06);
    }

    .orng {
      color: #F89829;
    }
    .underL:hover {
      text-decoration: underline;
    }
    @media screen and (max-width: 780px) {
    .zoom {
      transition: transform 0s; 
    }
    .zoom:hover {
      transform:none;
    }

    .bg-image {
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 325px;
    }
    }

</style>