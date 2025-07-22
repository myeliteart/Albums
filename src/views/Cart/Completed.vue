<template>
     <div class="container py-5" v-if="completed.length">
        <div class="inline">
            <div class="d-flex align-items-center crsr mb-4" @click="goHome">
                <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-sm-2 me-0 px-sm-0 px-1"/>
                <small>Home</small>
            </div> 
        </div>
       
        <div class="row gx-5 px-sm-0 px-2" v-if="completed.length">
            <div class="d-flex align-items-center py-1">
                <p><font-awesome-icon :icon="['fas', 'circle-check']" style="color: green;"/></p>
                <p class="ms-2">Order placed, thanks</p>
            </div>
            <div class="col-lg-3 border-secondary border-end">
                <h4 class="orng pb-2">Shipping Details</h4>
                <p v-for="c in shipping">
                    <div>{{ c.name }}</div>
                    <div>{{ c.coName }}</div>
                    <div>{{ c.country }}</div>
                    <div>{{ c.address }}</div>
                    <div>{{ c.city }}</div>
                    <div>{{ c.state }}</div>
                    <div>{{ c.zip }}</div>
                    <div class="brk">Notes: <br>
                        {{ c.notes }}
                    </div>
                </p>
            </div>
            <div class="col-lg-3 border-secondary border-end">
                <h4 class="orng pb-2">Billing Details</h4>
                <p v-for="c in billing">
                    <div>{{ c.Sname }}</div>
                    <div>{{ c.Scountry }}</div>
                    <div>{{ c.Saddress }}</div>
                    <div>{{ c.Scity }}</div>
                    <div>{{ c.Sstate }}</div>
                    <div>{{ c.Szip }}</div>
                    <div>{{ c.phone }}</div>
                    <div>{{ c.email }}</div>
                </p>
            </div>
            <div class="col-lg-3 text-left border-secondary border-end">
                <h4 class="orng pb-2">Order Details</h4>
                <p v-for="c in completed">
                    <div class="d-flex justify-content-between">
                        <div>Product:</div> 
                        <div>{{ c.title }} x {{ c.quantity }}</div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div>Price:</div> 
                        <div>${{ c.price }}.00</div>
                    </div>
                    <div class="d-flex justify-content-between">
                          <div>Total:</div>
                          <div>${{ c.subtotal }}.00</div>
                    </div>
                </p>
                <div class="d-flex justify-content-between">
                    <div>Shipping:</div>
                    <div>{{ shippingResult }}</div>
                </div>
                <div class="d-flex justify-content-between">
                    <div>Grand Total:</div>
                    <div>${{ totalWithSHipping }}.00</div>
                </div>
                
            </div>
             <div class="col-lg-3" v-if="card.length">
                <h4 class="orng pb-2">Payment Details</h4>
                <p v-for="c in card">
                    <div>Card number: &nbsp;{{ c.cardNumber }}</div>
                    <div>Exp date: &nbsp;{{ c.cardExp }}</div>
                    <div>Cvv: &nbsp;{{ c.cardCode }}</div>
                </p>
             </div>
        </div>
     </div>
</template>

<script setup>
    import { computed } from 'vue';
     import { useRouter } from 'vue-router';
     const router = useRouter()
   
    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { cart, card, billing, completed, shipDetails, shipping, shipRate } = storeToRefs(store);

    const goHome = () => {
        router.push('/');
        billing.value = []
        shipping.value = []
        completed.value = cart.value
        shipDetails.value = false
        card.value = []
    }
    console.log(completed.value)

    const total = completed.value.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    const shippingResult = computed(() =>{
        if(total.value >= 300){
            return shipRate.value = 'Free Shipping'
        } else {
            return shipRate.value = '$' + 25
        }
    })

    const totalWithSHipping = computed(() => {
        if(shipRate.value !== 'Free Shipping') {
            return total + 25
        } else {
            return total
        }
    })
</script>

<style scoped>
    svg {
      font-size: 18px;
    }
    .crsr {
      cursor: pointer;
    }
    .orng {
      color: #F89829;
    }
    .inline {
        display: inline-block;
    }
  .brk {
      word-wrap: break-word;
      padding: 0;
    }
</style>