<template>
    <div class="container py-5">
        <div class="row px-2 px-sm-0 d-lg-flex">
         <div class="col-lg-3 col-xl-2">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <font-awesome-icon :icon="['fas', 'filter']" />
                Filter by:
              </div>
              <div @click="reset" class="crsr" v-if="searchedText.trim() !== '' || checks.length !== 0 || minPrice !== '' || maxPrice !== ''"> 
                <font-awesome-icon :icon="['fas', 'rotate-right']" class="me-0"/>
                Reset
              </div>
            </div>
            <p>
              <h5 class="pb-1 cart">Catagory</h5>
              <div v-for="title in albumTitle">
                <div class="my-2">
                  <input name="cat" type="radio" class="me-2 crsr" :value="title" v-model="selectedFilterCat">
                  <label>{{ title }} Music</label> 
                </div>
              </div>
            </p>

            <p>
              <h5 class="py-1 cart">Artist</h5>
              <div v-for="i in allArtists" :key="i" v-if="allArtists.length">
                <div class="my-2">
                  <input type="checkbox" class="me-2 crsr" :value="i" v-model="checks">
                  <label>{{ i }} <small>({{ artistCounts[i] || 0 }})</small></label> 
                </div>
              </div>
            </p>

             <p>
              <h5 class="py-1 cart">Price</h5>
                  <div class="my-2">
                    <label class="me-lg-0 me-2">Min Price</label> 
                    <input type="number" class="me-2 form-control" v-model="minPrice">   
                  </div>
                  <div class="mt-1">
                    <label class="me-lg-0 me-2">Max Price</label> 
                    <input type="number" class="me-2 form-control" v-model="maxPrice">   
                  </div>
            </p>
        </div>

          <div class="col-lg-9 col-xl-10 msg">
          <div class="row">
            <p class="text-center b mt-4" v-if="!filteredMusic.length">{{ selectedFilterCat }} music is currently empty</p>

            <div class="me-3 my-lg-0 my-3 text-end" v-if="filteredMusic.length">
              <font-awesome-icon :icon="['fas', 'list']" class="me-3 crsr" title="List View" :class="view == 'list' ? 'orng' : ''" @click="view = 'list'" />
              <font-awesome-icon :icon="['fas', 'grip-vertical']" class="crsr" title="Grid View" :class="view == 'grid' ? 'orng' : ''" @click="view = 'grid'" />
            </div>
            
                <div class="d-flex align-items-center" v-if="filteredMusic.length">
                  <h1 class="pb-2">{{ selectedFilterCat }} Music</h1>
                  <div class="ms-auto">
                    <select class="form-control" v-model="sortedSelected">
                      <option disabled :value="''">Sort By:</option>
                      <option v-for="s in sorted" :value="s">{{ s }}</option>
                    </select>
                  </div>
                  <base-button mode="reverse" class="ms-3" v-if="itemAdded" @click="router.push('/shopping-cart')">Item added to your cart</base-button>
                </div>

          <!-- grid View -->
          <div v-if="view == 'grid'" class="col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4 zoom" v-for="album in filteredMusic" :key="album.id">
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

                    <div class="mt-1 crsr">
                      <font-awesome-icon  @click="MyList(album)" :icon="[favorites.find(itm => itm.id == album.id) ? favSolid : favRegular, 'heart']"  class="me-3 orng iconnn"/>
                      <font-awesome-icon class="iconnn" :icon="['fas', 'cart-shopping']" :class="cart.find(itm => itm.id == album.id) ? 'orng' : 'cart'" @click="addToCart(album)" />
                    </div>
                </div>
              </template>
          </base-card>
        </div>  

          <!-- list View -->
          <div v-if="view == 'list'">
            <div v-for="album in filteredMusic" :key="album.id" class="d-flex justify-content-between text-left align-items-center my-2">
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
    </div>
  </div> 

    <div class="position">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded iconn" v-if="top" @click="backToTop" />
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter()
   
    import { useToTop } from '@/ToTop.js'

    const { top, backToTop } = useToTop();

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { albumTitle, selectedFilterCat, searchedText, favSolid, favRegular, sorted, minPrice, maxPrice, allArtists, sortedSelected, favorites, listCount, filteredMusic, selectedAlbum, view, CartCount, itemAdded, cart, checks, albums, artistCounts } = storeToRefs(store);

    const toMusicDetail = (item) => {
      router.push({ name: 'musicDetails', params: {id: item.title.toLowerCase().split(' ').join('-')}});
    };

    const MyList = (album) => {
      const inTheList = favorites.value.find(item => item.id == album.id)
      if(inTheList) {
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

    const artistDetails = (item) => {
      router.push({name: 'Artist', params: {aid: item.artist.toLowerCase().split(' ').join('-')}})
    }

    const reset = () => {
      searchedText.value = ''
      checks.value.length = 0
      selectedFilterCat.value = 'Featured'
      maxPrice.value = ''
      minPrice.value = ''
    } 
</script>

<style scoped>
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
    .crsr {
      cursor: pointer;
    }
   .b {
    color: #333537;
   }
    /* svg {
      font-size: 18px;
    } */
     .underL:hover {
      text-decoration: underline;
    }
    
    .iconn {
      color: #F89829;
    }
    .iconnn {
      font-size: 19px;
    }
    .cart{
      color: #333537;
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
    .vh {
      height: 100vh;
    }
    input[type=checkbox], input[type=radio] {
      width: 14px;
      height: 14px;
      accent-color: #F89829;
    }

    .small-img {
      width: 165px;
      height: 165px;
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