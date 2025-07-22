<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark bar py-3">
  <div class="container">
    <router-link class="navbar-brand me-5" to="/" @click="closeNavbar"><h4 class="m-0">vue by <span class="orng">eli</span></h4></router-link>
        <!-- <img :src="logo" class="img-fluid logo"> -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse ms-lg-5 ms-0" id="navbarNav">
      <ul class="navbar-nav me-auto my-2 my-lg-0">
        <li class="nav-item me-3">
            <router-link class="nav-link" aria-current="page" to="/" @click="closeNavbar">Home</router-link>
        </li>
        <li class="nav-item me-3">
            <router-link class="nav-link" aria-current="page" to="/about" @click="closeNavbar">About</router-link>
        </li>
        <li class="nav-item me-3">
            <router-link class="nav-link" aria-current="page" to="/music" @click="closeNavbar">Music</router-link>
        </li>
        <li class="nav-item me-3">
            <router-link class="nav-link" aria-current="page" to="/favorites" @click="closeNavbar">
              Favorites &nbsp; <span class="cnt">{{ listCount }}</span>
            </router-link>
        </li>
      </ul>
      <form class="d-flex">
          <input class="form-control me-2" type="search" v-model="searchedText" placeholder="Search Albums..." aria-label="Search">
          <!-- <select class="form-select me-2">
            <option :value="option1.id" v-for="option1 in options">{{ option1.name }}</option>
          </select> -->
          <!-- <button class="btn btn-outline-light" type="submit">Search</button> -->
      </form>
      <ul class="navbar-nav ms-auto my-2 my-lg-0">
        <li class="nav-item me-0">
            <router-link class="nav-link" aria-current="page" to="/shopping-cart" @click="closeNavbar">
              <font-awesome-icon :icon="['fas', 'cart-shopping']" /> &nbsp; <span class="cnt">{{ CartCount }}</span>
            </router-link>
        </li>
        <!-- <li class="nav-item" v-if="!userStore.auth">
            <router-link class="nav-link" aria-current="page" to="/sign-in" @click="closeNavbar">Sign In</router-link>
          </li>
          <li class="nav-item me-0" v-if="userStore.auth">
            <a href="#" @click.prevent="logoutt" class="nav-link" aria-current="page">Logout</a>
          </li>
        <li class="nav-item me-0 ms-sm-3 ms-0" v-if="userStore.auth">
          <router-link class="round nav-link active" to="/dashboard" @click="closeNavbar">{{ userStore.profileValues.firstName.trim().substring(1, 0).toUpperCase() }}{{ userStore.profileValues.lastName.trim().substring(1, 0).toUpperCase() }}</router-link>
        </li> -->
      </ul>
    </div>
  </div>
</nav>

</template>

<script setup>
    import { Collapse } from 'bootstrap'
    import { onMounted } from 'vue'
    const logo = new URL('@/assets/img/logo.png', import.meta.url).href

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { listCount, searchedText, CartCount } = storeToRefs(store);

    import { useUserStore } from '@/stores/user';
import router from '@/router';
    const userStore = useUserStore();

    console.log(userStore.profileValues)
    // const changeLinkDesc = () => {
    //   if(userStore.auth == true) {
    //     userStore.auth = false
    //   }
    // }
    // const titleOrArtist = () => {
  //   albums.value.filter(item => item.title.toLowerCase().includes(searchedText.value.toLocaleLowerCase()))
  // }

  function logoutt() {
    userStore.auth = false
    userStore.profileValues = {
      firstName: '',
      lastName: '',
      email: ''
    }
    userStore.role = 'user';
    router.push('/')
  }

let collapse = null

onMounted(() => {
  const navbar = document.getElementById('navbarNav')
  if (navbar && window.bootstrap) {
    collapse = window.bootstrap.Collapse.getOrCreateInstance(navbar)
  }
  console.log(collapse)
})

function closeNavbar() {
 const collapseElement = document.getElementById('navbarNav')
      if (!collapseElement) return

      const bsCollapse = Collapse.getInstance(collapseElement)
      if (bsCollapse) {
        bsCollapse.hide()
      } else {
        // Initialize and hide if no instance yet
        const newCollapse = new Collapse(collapseElement)
        newCollapse.hide()
      }
}

</script>

<style scoped>
    .form-control, .form-control:focus {
        background-color: transparent;
        outline: none !important;
        color: #fff;
    }
    .form-control:hover{
        border-color: #F89829;
    }
    .form-control::placeholder {
        color: #afaeae;
    }

    .bar {
        border-bottom: 2px solid #F89829;
    }
    .logo {
        width: 185px;
    }
    .dropdown-item.active, .dropdown-item:active {
      text-decoration: none;
      background-color: #ededed;
      color: #000;
  }
  .dropdown-item:hover {
      text-decoration: none;
      background-color: #ededed;
      color: #000;
  }

  .cnt {
    font-weight: bold;
    color: #F89829;
  }
  .cnt:hover {
    font-weight: bold;
    color: #fff;
  }

  .form-select {
    width: 100px;
  }

.round {
  border-radius: 50px;
  background-color:transparent;
  border: 1px solid #F89829;;
  width: 41px;
  height: 41px;
  align-items: center;
  text-align: center;
  padding-top: 7px;
  font-size: 15px;
}
.navbar-brand {
  font-weight: 500;
}
.orng {
   color: #F89829;
}
</style>