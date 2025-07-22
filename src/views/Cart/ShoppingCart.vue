<template>
   <div class="text-center my-5" v-if="!cart.length">
      <p>Your Shopping Cart is currently empty</p>
      <base-button mode="reverse" @click="router.push('/music')">Continue Shopping</base-button>
  </div>
  <div class="container py-5" v-if="cart.length">
    <div class="inline">
      <div class="d-flex align-items-center crsr mb-3" @click="router.back">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-sm-2 me-0 px-sm-0 px-1"/>
      </div>  
    </div>
    
    <div class="row table-responsive-md px-2">
        <table>
           <tbody>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          
            <tr v-for="(c, index) in cart">
              <td class="text-center" @click="deleteItem(c, index)"><font-awesome-icon :icon="['fas', 'xmark']" class="trash"></font-awesome-icon></td>
              <td @click="backToDetails(c)">
                <img :src="c.img" class="img-fluid small rounded crsr">
              </td>
              <td class="crsr underL" @click="backToDetails(c)">{{ c.title }}</td>
              <td>${{ c.price }}.00</td>
              <td class="quantity">
                <button @click="decrease(c)">-</button>
                <input type="number" class="mx-1" v-model="c.quantity" @input="validateQuantity(c)">
                <button @click="increase(c)">+</button>
              </td>
              <td>${{ c.subtotal = c.price * c.quantity }}.00</td>
            </tr>
          </tbody>
        </table>
        
      </div>
      <div class="d-flex justify-content-between pt-3">
        <p>Total: &nbsp; <span class="orng1">${{ total }}.00</span></p>
        <base-button mode="reverse" @click="router.push('/checkout')">Continue to Checkout</base-button>
      </div>
    </div>

    <div class="position">
      <font-awesome-icon :icon="['fas', 'angle-up']" class="absoluteTop crsr rounded" v-if="top" @click="backToTop" />
    </div>
</template>

<script setup>

  import { useRouter } from 'vue-router';
  const router = useRouter();

  import { useMusicStore } from '@/stores/music';
  const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';
    const { cart, CartCount } = storeToRefs(store);

    import { useUserStore } from '@/stores/user';
    const userStore = useUserStore();

    // router.beforeEach((to, from, next) => {
    //   if (to.name !== 'Signin' && !userStore.auth) next({ name: 'Signin' })
    //   else next()
    // })

    
    const deleteItem = (c, idx) => {
      cart.value.splice(idx, 1)
      CartCount.value -= c.quantity
      total.value -= c.subtotal
    }

    const backToDetails = (item) => {
      router.push({name: 'musicDetails', params: {id: item.title.toLowerCase().split(' ').join('-')} })
    }
    
    const total = ref(cart.value.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0))
    

      function calculateTotal() {
        total.value = cart.value.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
      }

    const decrease = (c) => {
      if(c.quantity > 1) {
        c.quantity--
        CartCount.value--
        calculateTotal();
      } 
    }
    const increase = (c) => {
      if(c.quantity < 25 ){
        c.quantity++
        CartCount.value++
        console.log(c.subtotal)
        calculateTotal();
      } 
    }

    function validateQuantity(c) {
      if (c.quantity < 1) c.quantity = 1;
      if (c.quantity > 25) c.quantity = 25;
      CartCount.value = cart.value.reduce((acc, item) => acc + item.quantity, 0); // Update CartCount based on quantity of all items
      calculateTotal();
    }


    import { useToTop } from '@/ToTop.js'
    const { top, backToTop } = useToTop();

  //   watch(cart.value, ( newValue, oldValue ) => {

  // })
</script>

<style scoped>
    table, td, th {
    border: 1px solid #333537;
    border-collapse: collapse;
    padding: 7px 13px;
   }

    .crsr {
      cursor: pointer;
    }
    .orng {
      color: #F89829;
    }
    .orng1 {
      color: #333537;
      font-weight: bold;
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
      color: #F89829;
    }
    .trash {
      font-size: 19px;
      color: #333537;
      cursor: pointer;
    }
    .small {
      width: 50px;
    }

    .quantity input {
      width: 50px;
      padding: 10px 15px 6px 15px;
      background-color: transparent;
      border: 1px solid #333537;
      border-radius: .2rem;
      color: #333537;
      text-align: center;
    }
    .quantity button {
      padding: 5px 15px;
      background-color: transparent;
      border: 1px solid #333537;
      color: #333537;
      border-radius: .2rem;
      font-size: 20px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
  .inline {
    display: inline-block;
  }
  svg {
      font-size: 18px;
    }
   
     .underL:hover {
      text-decoration: underline;
    }
    @media screen and (max-width: 780px) {
      .quantity input {
      width: 30px;
      padding: 0;
      background-color: transparent;
      border: 0px solid #333537;
      border-radius: .2rem;
      color: #333537;
      text-align: center;
    }
    .quantity button {
      padding: 0;
      background-color: transparent;
      border: 0px solid #333537;
      color: #333537;
      border-radius: .2rem;
      font-size: 20px;
    }
    }
</style>