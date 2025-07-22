                                       n                <template>
    <div class="container py-5">
        <div class="inline">
            <div class="d-flex align-items-center crsr mb-3" @click="router.back">
                <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-sm-2 me-0 px-sm-0 px-1"/>
            </div> 
        </div> 
       <div class="row px-sm-0 px-2">
            <div class="col-lg-7">
                <div class="d-flex justify-content-between align-items-center my-3" v-if="oneAlbum">
                  <h4 class="pb-2">Review: <span class="orng">{{ oneAlbum.title }}</span></h4>
                  <img :src="oneAlbum.img" class="rounded">  
                </div>
                
                <Form @submit="seeReviews" :validation-schema="schema">
                <Field name="name" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <div class="mt-2">
                        <label>Name:</label>
                        <input 
                        type="text"
                        class="form-control mt-1 stylee"
                        placeholder="Your Name"
                        v-bind="field"
                        :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                        />
                    </div>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>

                    <div class="mt-2">
                        <label>Rating:</label>
                        <select
                            v-model="rating"
                            class="form-control mt-1 stylee gray" 
                            >
                            <option v-for="r in rate" :value="r">{{ r }}</option>
                        </select>
                    </div>
                <Field name="title" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <div class="mt-2">
                        <label>Review Title:</label>
                        <input 
                        type="text"
                        class="form-control mt-1 stylee"
                        placeholder="Your review title" 
                        v-bind="field"
                        :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                        />
                    </div>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                <Field name="review" type="text"
                    v-slot="{field, errors, errorMessage}" 
                    >
                    <div class="mt-2">
                        <label>Review:</label>
                        <textarea 
                        type="text"
                        rows="5"
                        class="form-control mt-1 stylee"
                        placeholder="Your review"
                        v-bind="field"
                        :class="errors.length !== 0 ? 'is-invalid' : 'gray'"
                        ></textarea>
                    </div>
                    <div class="input_alert"
                        v-if="errors.length !== 0">
                        <small class="red">{{ errorMessage }}</small>
                    </div>
                </Field>
                
                <base-button type="submit" class="mt-3 w-100">Submit Review</base-button>
            </Form>
            </div>
       </div>
    </div>
    
</template>

<script setup>
     import { computed } from 'vue'

    import { useRouter, useRoute } from 'vue-router';
    const router = useRouter()
    const route = useRoute()


     import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { selectedReview, albums, rating, rate } = storeToRefs(store);

    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';

    const schema = yup.object({
        name: yup.string().trim()
        .required('Name is required'),
        title: yup.string().trim()
        .required('Title is required')
        .min(7, 'Please enter minimum 7 characters'),
        review: yup.string().trim()
        .required('Review is required')
        .min(20, 'Please enter minimum 20 characters'),
    })

    const oneAlbum = computed(() =>{
        return albums.value.find((itemm) => itemm.title.toLowerCase().split(' ').join('-') == route.params.id) 
    })
    console.log(oneAlbum.value)

    const seeReviews = (values) => {
        oneAlbum.value.reviewCount++
        router.push({name: 'musicDetails'})
        const reviewTest = {
            name: values.name,
            title: values.title,
            review: values.review,
            rating: rating.value
        }
        oneAlbum.value.reviews.push(reviewTest)
        rating.value = ''
    }
</script>

<style scoped>
    .stylee {
    background-color: transparent;
    color: #333537;
    }
    .stylee::placeholder{
        color: #828181;
    }
    .gray {
        border-color: #828181;
    }
    .red {
        color: red;
    }
    .orng {
        color: #F89829;
    }
    .crsr {
        cursor: pointer;
    }
    img {
        width: 55px;
        height: 55px;
    }
    .inline {
        display: inline-block;
    }
</style>