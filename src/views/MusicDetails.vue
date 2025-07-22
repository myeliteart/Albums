<template>
    <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center crsr mb-1" @click="router.back">
                <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-sm-2 me-0 px-sm-0 px-1"/>
            </div>            
            <div>
                <base-button mode="reverse" v-if="itemAdded" @click="router.push('/shopping-cart')">Item added to your cart</base-button>
            </div>
        </div>
    <div class="row gx-5 px-sm-0 px-2 mb-4" v-if="currentAlbumItem">
        <div class="col-lg-6 my-3 position">
            <span class="absolute s p-2" @click="bigImage = true"><font-awesome-icon class="crsr" :icon="['fas', 'magnifying-glass-plus']" /></span>
            <img :src="currentAlbumItem.img" class="img-fluid rounded size" :alt-="currentAlbumItem.title">
        </div>
        <div class="col-lg-6 my-3">
            <p class="artist mb-1 crsr inline underL" @click="artistDetails(currentAlbumItem)">{{ currentAlbumItem.artist }}</p>
            <h3>{{ currentAlbumItem.title }}</h3>
            <p class="badge bg-primary mb-3 mt-1">{{ currentAlbumItem.tag }}</p>
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h5 class="card-text mb-0">${{ currentAlbumItem.price }}.00</h5>
            </div>
            <audio controls :src="currentAlbumItem.audio" v-if="currentAlbumItem.audio" class="my-2"></audio> <br>
            <div class="d-flex mt-2">
                <base-button mode="round" @click="addToCart" class="me-5">Add to Cart</base-button>
                <base-button mode="round-reverse" @click="MyList" :class="favorites.find(item => item.id == currentAlbumItem.id) ? 'card-text' : ''">{{ favorites.find(item => item.id == currentAlbumItem.id) ? 'Favorite Added' : 'Add to Favorites' }}</base-button>
            </div>

            <div class="pt-5 mt-3 d-flex crsr">
                <p v-for="tab in tabs" class="me-5 stly" @click="matchTab(tab)" :class="selectedTab == tab.toLowerCase().split(' ').join('-').replace('information', 'info') ? 'tabStyle' : ''">{{ tab }} &nbsp; <b>{{ tab.toLowerCase().split(' ').join('-').replace('information', 'info') == 'reviews' ? currentAlbumItem.reviewCount : '' }}</b></p>
            </div>
            <component :is="selectedTab"></component>
        </div>
     </div>

     <div v-if="sameArtistItems.length" class="pb-2">
        <h3>You may also like</h3>
        <hr class="m-0">
     </div>
     <div class="row px-sm-0 px-2 mt-4">
            <div v-for="item in sameArtistItems" :key="item.id" class="col-sm-6 col-md-4 col-lg-3 mb-4 zoom">
            <base-card>
                <template v-slot:top>
                    <div class="position">
                        <span class="absolute33 badge bg-primary">{{ item.tag }}</span>
                        <img :src="item.img" @click="relatedMusicDetail(item)" class="card-img-top crsr" :alt="item.title">
                    </div>
                </template>
                <template v-slot:bottom>
                    <div class="d-flex justify-content-between">
                        <div>
                            <p class="card-text crsr underL" @click="artistDetails(item)">{{ item.artist }}</p>
                            <h6 class="my-1 crsr card-title underL" @click="relatedMusicDetail(item)">{{ item.title }}</h6>
                            <p class="card-text">${{ item.price }}.00</p>
                        </div>
                    
                        <div class="mt-1 crsr">
                            <font-awesome-icon  @click="MyList2(item)" :icon="[favorites.find(itm => itm.id == item.id) ? favSolid : favRegular, 'heart']"  class="me-3 iconnn orng"/>
                            <font-awesome-icon class="iconnn" :icon="['fas', 'cart-shopping']" :class="cart.find(itm => itm.id == item.id) ? 'orng' : 'cart'" @click="addToCart2(item)" />
                        </div>
                    </div>
                    </template>
                </base-card>
            </div>
        </div>
    </div>

    <teleport to="body">
        <base-modal mode="dialog2" v-if="bigImage">
        <div class="p-0 position">
            <span class="absolute2 s p-2 crsr" @click="bigImage = false"><font-awesome-icon :icon="['fas', 'xmark']"></font-awesome-icon></span>
            <img :src="currentAlbumItem.img" class="img-fluid rounded size2" :alt-="currentAlbumItem.title">
            <div class="absoluteDown">{{ currentAlbumItem.artist }} - {{ currentAlbumItem.title }}</div>
        </div>
        </base-modal>
    </teleport>

    <div class="position">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded orng" v-if="top" @click="backToTop" />
    </div>
</template>

<script setup>
    import { computed, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    const router = useRouter()
    const route = useRoute();

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { itemAdded, CartCount, cart, bigImage, listCount, filteredMusic, reviewCount, albums, favSolid, favRegular, favorites } = storeToRefs(store);

    const currentAlbumItem = computed(() => {
        return albums.value.find(item => item.title.toLowerCase().split(' ').join('-') == route.params.id)
    });

    const sameArtistItems = computed(() => {
        return albums.value.filter(itm => itm.artist == currentAlbumItem.value.artist && itm.id !== currentAlbumItem.value.id)
    });
    
    let tabs = ref (['Additional Information', 'Reviews'])
    console.log(tabs.value)
    
    const selectedTab = ref ('additional-info')

    const matchTab = (tab) => {
        selectedTab.value = tab.toLowerCase().split(' ').join('-').replace('information', 'info')
    }

     const addToCart = () => {
     const here = cart.value.find(itm => itm.id == currentAlbumItem.value.id)
      if(here) {
        CartCount.value++
        currentAlbumItem.value.quantity++
        itemAdded.value = false
        return;
        } else {
            cart.value.unshift(currentAlbumItem.value)
            CartCount.value++
            currentAlbumItem.value.quantity = 1
            itemAdded.value = true
        }
        setTimeout(function(){
            itemAdded.value = false
        }, 6000);
     }

     const addToCart2 = (item) => {
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
    const relatedMusicDetail = (item) => {
      router.push({ name: 'musicDetails', params: {id: item.title.toLowerCase().split(' ').join('-')}});
    };

    const MyList = () => {
      const inTheList = favorites.value.find(item => item.id == currentAlbumItem.value.id)
      if(inTheList) {
        return;
      } else {
        favorites.value.unshift(currentAlbumItem.value)
        store.listCount++
      }
    }

    const MyList2 = (item1) => {
      const inTheList = favorites.value.find(item => item.id == item1.id)
      if(inTheList) {
        return;
      } else {
        favorites.value.unshift(item1)
        listCount.value++
      }
    }

    import { useToTop } from '@/ToTop.js'
    const { top, backToTop } = useToTop();

    const artistDetails = (item) => {
      router.push({name: 'Artist', params: {aid: item.artist.toLowerCase().split(' ').join('-')}})
    }
</script>


<style scoped>
    /* .s {
        filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
    } */
     .orng {
      color: #F89829;
     }
    .inline{
      display: inline-block;
    }
    .s {
        background-color: #fff;
        border-radius: 50% !important;
        opacity: .6;
    }
    .s svg{
        padding: 3px 5px;
        color:#000;
    }
    
    .position {
        position: relative;
    }
    .absolute {
      position: absolute;
      top: 9px;
      right: 35px; 
    }
    .absolute33 {
      position: absolute;
      top: 7px;
      left: 7px; 
    }
    .absolute2 {
      position: absolute;
      top: 9px;
      right: 15px; 
      color: #fff;
    }
    .absoluteDown {
     position: absolute;
      bottom: 0;
      text-align: center;
      padding: 8px 13px;
      color: #fff;
      background-color: #333537;
      width: 100%;
      margin: 0 auto;
    }
    .absoluteTop{
      position: fixed;
      background-color: #333537;
      padding: 6px 8px;
      bottom: 15px;
      right: 15px;
    }
    .card-text {
        color: #333537;
        margin-bottom: 0;
    }
    .size {
       width: 100%; 
    }
    .size2 {
       width: 625px; 
    }
    .artist {
        color: #333537;
    }
    .bg-primary {
      background-color: #F89829 !important;
    }
    .card-text {
        color: #333537;
    }
    svg {
      font-size: 18px;
    }
    .cart{
      color: #333537;
    }
     .iconnn {
      font-size: 19px;
    }
    
    .underL:hover {
      text-decoration: underline;
    }
    
    .crsr {
      cursor: pointer;
    }
    
    .stly:hover {
        color: #F89829;
        border-bottom: 2px solid #333537;
        padding-bottom: 7px;
    }
    .tabStyle {
        color: #F89829;
        border-bottom: 2px solid #333537;
        padding-bottom: 7px;
    }
    .zoom {
      transition: transform .2s; 
    }
    .zoom:hover {
      transform: scale(1.06);
    }

    @media screen and (max-width: 780px) {
        .size2 {
            width: 360px; 
        }
        .w {
        width: 52%;
        }
      .zoom {
        transition: transform 0s; 
      }
      .zoom:hover {
        transform:none;
      }
    }
</style>