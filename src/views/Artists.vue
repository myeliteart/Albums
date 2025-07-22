<template>
    <div class="container py-5">
      <div class="inline">
      <div class="d-flex align-items-center crsr mb-1" @click="router.back">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-sm-2 me-0 px-sm-0 px-1"/>
      </div> 
    </div> 
    <p class="text-center b mt-4" v-if="!artists.length">{{ selectedFilterCat }} Music artist is currently empty</p>

    <div class="row px-sm-0 px-2" v-if="artists.length">
        <div class="d-flex justify-content-between align-items-center">
            <h1 class="pb-2 pt-3">{{ oneArtist.artist }}</h1>
            <base-button mode="reverse" v-if="itemAdded" @click="router.push('/shopping-cart')">Item added to your cart</base-button>
        </div>

        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4 zoom" v-for="album in artists" :key="album.id">
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
                    <p class="card-text">{{ album.artist }}</p>
                    <h6 class="my-1 crsr card-title underL" @click="toMusicDetail(album)">{{ album.title }}</h6>
                    <p class="card-text">${{ album.price }}.00</p>
                  </div>

                    <div class="mt-1 crsr">
                      <font-awesome-icon  @click="MyList(album)" :icon="[favorites.find(itm => itm.id == album.id) ? favSolid : favRegular, 'heart']"  class="me-3 orng"/>
                      <font-awesome-icon :icon="['fas', 'cart-shopping']" :class="cart.find(itm => itm.id == album.id) ? 'orng' : 'cart'" @click="addToCart(album)" />
                    </div>
                </div>
              </template>
          </base-card>
        </div>  

    </div>
    </div>
    <div class="position">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded iconn orng" v-if="top" @click="backToTop" />
    </div>
</template> 

<script setup>
    import { computed, watch } from 'vue';
     import { useRoute, useRouter } from 'vue-router';
     const route = useRoute()
     const router = useRouter()

     import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { cart, CartCount, itemAdded, listCount, albums, favorites, favSolid, favRegular, searchedText } = storeToRefs(store);

    const toMusicDetail = (item) => {
      router.push({ name: 'musicDetails', params: {id: item.title.toLowerCase().split(' ').join('-')}});
    };
    
    
    const addToCart = (item) => {
      const here = cart.value.find(itm => itm.id == item.id)
      if(here) {
        CartCount.value++
        item.quantity++
        itemAdded.value = false
        return;
      } else {
        cart.value.unshift(item)
        console.log(cart.value)
        CartCount.value++
        item.quantity = 1
        itemAdded.value = true
      }  
      setTimeout(function(){
        itemAdded.value = false
    }, 6000);
    }

    const MyList = (album) => {
      const inTheList = favorites.value.find(item => item.id == album.id)
      if(inTheList) {
        return;
      } else {
        favorites.value.unshift(album)
        listCount.value++
      }
    }

    const artists = computed(() => {
        return albums.value.filter(itm => 
          itm.title.toLowerCase().includes(searchedText.value.trim().toLocaleLowerCase()) &&
          itm.artist.toLowerCase().split(' ').join('-') == route.params.aid
        )
    })

    const oneArtist = computed(() => {
        return albums.value.find(item => item.artist.toLowerCase().split(' ').join('-') == route.params.aid)
    })

    import { useToTop } from '@/ToTop.js'

    const { top, backToTop } = useToTop();
</script>

<style scoped>
    .crsr {
      cursor: pointer;
    }

    svg {
      font-size: 18px;
    }
    .orng {
      color: #F89829;
    }
    .position{
      position: relative;
    }
    .absoluteTop{
      position: fixed;
      background-color: #333537;
      padding: 6px 8px;
      bottom: 15px;
      right: 15px;
    }
    .absolute {
      position: absolute;
      top: 7px;
      left: 7px; 
    }
    .bg-primary {
      background-color: #F89829 !important;
    }
    .card-text {
        color: #333537;
        margin-bottom: 0;
    }
    .zoom {
      transition: transform .2s; 
    }
    .zoom:hover {
      transform: scale(1.06);
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
    }
</style>