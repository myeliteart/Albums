<template>
    <h4 class="mb-4">Add Album</h4>
    <Form @submit="submitAlbum" :validation-schema="schema" class="w">
      <Field name="title" type="text"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-2">
                <label>Music Title</label>
                <input 
                type="text"
                class="form-control mt-1"
                placeholder="Enter music title" 
                v-bind="field"
                :class="{'is-invalid': errors.length !== 0, 'stylee': errors.length == 0}"
                />
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>
        <Field name="artist" type="text"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-2">
                <label>Music Artist</label>
                <input 
                type="text"
                class="form-control mt-1"
                placeholder="Enter music artist" 
                v-bind="field"
                :class="errors.length !== 0 ? 'is-invalid' : 'stylee'"
                />
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>
        <Field name="price" type="number"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-2">
                <label>Price</label>
                <input 
                type="number"
                class="form-control mt-1"
                placeholder="Enter price" 
                v-bind="field"
                 :class="errors.length !== 0 ? 'is-invalid' : 'stylee'"
                />
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>
        
        <Field name="tag" type="text"
            v-slot="{field}">
            <div class="mt-2">
                <label>Tag</label>
                <input 
                type="text"
                class="form-control mt-1 stylee"
                placeholder="Enter Tag" 
                v-bind="field"
                />
            </div>
        </Field>

        <!-- <Field name="cat" type="text"
        v-slot="{field}" 
        >
        <label class="mt-3">Choose your Catagories</label>
            <div class="mt-2" v-for="albm in musicStore.albumTitle">
                <input 
                type="checkbox"
                class="me-2"
                :value="albm"
                v-bind="field"
                />
                <label>{{ albm }}</label>
            </div>
        </Field> -->

            <label class="mt-3 mb-1">Choose your Catagories</label>
            <div class="mt-1 me-3 align-items-center" v-for="albm in musicStore.albumTitle">
                <input type="checkbox" class="me-2 crsr" :value="albm" v-model="musicStore.selectedAlbum" />
                <label>{{ albm }} Music</label>
            </div>

            <Field name="desc" type="text"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-3">
                <label>Music Description</label>
                <textarea 
                    type="text"
                    rows="5"
                    class="form-control mt-1"
                    placeholder="Enter a description" 
                    v-bind="field"
                    :class="errors.length !== 0 ? 'is-invalid' : 'stylee'">
                </textarea>
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>
        <Field name="img" type="text"
            v-slot="{field, errors, errorMessage}" 
            >
            <div class="mt-3">
                <label>Music Image</label>
                <input 
                type="text"
                class="form-control mt-1"
                placeholder="Upload image" 
                v-bind="field"
                :class="errors.length !== 0 ? 'is-invalid' : 'stylee'"
                />
            </div>
            <div class="input_alert"
                v-if="errors.length !== 0">
                <small class="red">{{ errorMessage }}</small>
            </div>
        </Field>
        <div class="d-flex mt-3">
            <base-button type="submit">Publish Album</base-button>
        </div>
    </Form>

    <teleport to="body">
          <div class="wi">
          <base-modal v-if="musicStore.NewAlbumError">
            <div class="text-end pb-1">
              <font-awesome-icon @click="cancel" :icon="['fas', 'xmark']" class="crsr"></font-awesome-icon>
            </div>
            <div class="p-2">
            <h5>Please select at least one category</h5>
            <div class="d-flex justify-content-end align-items-center mt-3">
            <base-button class="crsr" @click="cancel">Ok</base-button>
            </div>
          </div>
          </base-modal>
        </div>
    </teleport> 
</template>

<script setup>
    import { useUserStore } from '@/stores/user';
    const store = useUserStore();

    import { useMusicStore } from '@/stores/music';
    const musicStore = useMusicStore();
    
    import { useRouter } from 'vue-router';
    const router = useRouter()
    
    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';
    
    const cancel = () => {
      musicStore.NewAlbumError = false;
    }

    const schema = yup.object({
        // desc: yup.string().trim()
        // .when([], {
        //     is: () => fieldsToEdit.value == false,
        //     then: () => yup.string().required('Music description is required')
        //     .min(20, 'Please enter minimum 20 characters'),
        //     otherwise: () => yup.string().notRequired()
        // }),
        title: yup.string().trim()
        .required('Music title is required')
        .min(4, 'Please enter minimum 4 characters'),
        artist: yup.string().trim()
        .required('Music artist is required')
        .min(3, 'Please enter minimum 3 characters'),
        price: yup.string().trim()
        .required('Price is required'),
        tag: yup.string()
        .notRequired(),
        desc: yup.string().trim()
        .required('Music description is required')
        .min(20, 'Please enter minimum 20 characters'),
        img: yup.string()
        .required('Image is required')
        .url()
      })

       const submitAlbum = (values) => {
        if(musicStore.selectedAlbum.length == 0) {
           musicStore.NewAlbumError = true
        } else {
            // db.collection('albums').doc().set({
            //     title: values.title,
            //     artist: values.artist,
            //     price: values.price,
            //     tag: values.tag,
            //     cat: musicStore.selectedAlbum,
            //     desc: values.desc
            // })
         const newitem = {
            id: musicStore.albums.length + 1,
            title: values.title,
            artist: values.artist,
            img: values.img,
            price: values.price,
            tag: values.tag,
            cat: musicStore.selectedAlbum,
            reviews: [],
            reviewCount: 0,
            desc: values.desc
        }
          musicStore.albums.unshift(newitem)
          router.push('/music')
          
          musicStore.selectedAlbum = []
    }
        
        console.log(musicStore.albums)
    }

    //   const submitAlbum = (values) => {
    //     if(musicStore.selectedAlbum.length == 0) {
    //        musicStore.NewAlbumError = true
    //     } else {
    //         const newitem = {
    //         id: musicStore.albums.length + 1,
    //         title: values.title,
    //         artist: values.artist,
    //         img: values.img,
    //         price: values.price,
    //         tag: values.tag,
    //         cat: musicStore.selectedAlbum,
    //         reviews: [],
    //         reviewCount: 0,
    //         desc: values.desc
    //     }
    //     musicStore.albums.unshift(newitem)
    //     router.push('/music')
    //     }
        
    //     musicStore.selectedAlbum = []
    //     console.log(musicStore.albums)
    // }

      import { Cloudinary } from '@cloudinary/url-gen';

      // Create a Cloudinary instance and set your cloud name.
      const cld = new Cloudinary({
        cloud: {
          cloudName: 'demo',
        },
      });
</script>

<style scoped>
    h4 { color: #F89829; }

    .red {
        color: red;
    }
    .crsr{
        cursor: pointer;
    }
    .stylee {        
        color: #333537;
        border-color: #333537;
    }
    .stylee::placeholder{
        color: #828181;
    }
    input[type=checkbox] {
      width: 16px;
      height: 16px;
      accent-color: #F89829;
    }
    .w {
        width: 85%;
    }
    .wi {
      width: 100%;
    }
    @media screen and (max-width: 780px) {
    .wi {
      width: 60%;
    }
    .w {
        width: 100%;
    }
    }
</style>