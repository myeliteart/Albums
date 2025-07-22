<template>
  <div class="container py-5">
    <div class="inline">
      <div class="d-flex align-items-center crsr mb-1" @click="router.back" v-if="favorites.length">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-sm-2 me-0 px-sm-0 px-1"/>
      </div> 
    </div> 
    
     <!-- <base-button mode="reverse" @click="router.back" v-if="favorites.length">Back</base-button> -->
    <div class="row px-sm-0 px-2">
        <div class="text-center my-2" v-if="!Filteredfav.length">
            <p>Your Favorite List is currently empty</p>
            <base-button mode="reverse" @click="router.push('/music')">Add items to your list</base-button>
        </div>
          <div class="d-flex justify-content-between align-items-center">
            <h1 class="pb-2 pt-3" v-if="Filteredfav.length">My Favorite Music</h1>
            <base-button mode="reverse" v-if="itemAdded" @click="router.push('/shopping-cart')">Item added to your cart</base-button>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3 mb-4 zoom" v-for="fav in Filteredfav" :key="fav.id">
            <base-card>
              <template v-slot:top>
                <div class="position">
                    <span class="absolute badge bg-primary">{{ fav.tag }}</span>
                    <img :src="fav.img" @click="toMusicDetail(fav)" class="card-img-top crsr" :alt="fav.title">
                </div>
              </template>
              <template v-slot:bottom>
                <div class="d-flex justify-content-between">
                  <div>
                    <p class="card-text crsr underL" @click="artistDetails(fav)">{{ fav.artist }}</p>
                    <h6 class="my-1 crsr card-title underL" @click="toMusicDetail(fav)">{{ fav.title }}</h6>
                    <p class="card-text">${{ fav.price }}.00</p>
                  </div>
                  <div class="mt-1 crsr iconn">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="me-3 iconnn" :class="cart.find(itm => itm.id == fav.id) ? 'orng' : 'cart'"  @click="addToCart(fav)" />
                    <font-awesome-icon :icon="['far', 'trash-can']" class="iconnn" @click="selectedFav = fav"/>
                  </div>
                </div>
              </template>
          </base-card>
        </div>

        <teleport to="body">
          <div class="w">
          <base-modal v-if="selectedFav">
            <div class="text-end pb-1">
              <font-awesome-icon @click="cancel" :icon="['fas', 'xmark']" class="crsr"></font-awesome-icon>
            </div>
            <div class="p-2">
            <h5>Are you sure you want to delete <b>{{ selectedFav.title }}</b>?</h5>
            <div class="d-flex justify-content-end align-items-center mt-3">
              <div class="me-3 crsr" @click="cancel">Cancel</div>
              <base-button @click="removeFav">Delete</base-button>
            </div>
          </div>
          </base-modal>
        </div>
        </teleport> 
    </div>
  </div>

   <div class="position">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded orng" v-if="top" @click="backToTop" />
    </div>
</template>

<script setup>
   import { useRouter } from 'vue-router';
   const router = useRouter()

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { favorites, listCount, selectedFav, cart, CartCount, itemAdded, searchedText } = storeToRefs(store);

    import { useToTop } from '@/ToTop.js'
import { computed } from 'vue';
  
    const { top, backToTop } = useToTop();

    const toMusicDetail = (fav) => {
      router.push({ name: 'musicDetails', params: {id: fav.title.toLowerCase().split(' ').join('-')}});
    }

    // const openDialog = (fav) => {
    //   selectedFav.value = fav
    //   console.log(selectedFav.value.artist)
    // }

    const removeFav = () => {
        favorites.value = favorites.value.filter(itm => itm.id !== selectedFav.value.id)
        listCount.value--
        selectedFav.value = null
    }

    const cancel = () => {
      selectedFav.value = null;
    }

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
    }, 10000);
    }

    const Filteredfav = computed(() => {
      return favorites.value.filter(itm => itm.title.toLowerCase().includes(searchedText.value.trim().toLocaleLowerCase()))
    })

    const artistDetails = (item) => {
      router.push({name: 'Artist', params: {aid: item.artist.toLowerCase().split(' ').join('-')}})
    }
</script>


<style scoped>
  .w {
    width: 100%;
  }
  .position{
        position: relative;
    }
    .absolute {
        position: absolute;
        top: 7px;
        left: 7px;
        /* font-weight: bold;
         border-radius: .2rem;
        background-color: #F89829;
        padding: 3px 9px; */
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
     .iconnn {
      font-size: 19px;
    }
    .crsr {
      cursor: pointer;
    }

    svg {
      font-size: 18px;
    }
    .orng {
      color: #F89829;
    }
    .cart{
      color: #333537;
    }
    .inline{
      display: inline-block;
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
      .w {
      width: 60%;
    }
    .zoom {
      transition: transform 0s; 
    }
    .zoom:hover {
      transform:none;
    }
 
    }
</style>