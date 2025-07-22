<template>
    <h4 class="mb-4">Albums</h4>
    <div class="row table-responsive-md px-2">
        <table>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
         
          <tr v-for="item in albums" :key="item.id">
            <td class="">{{ item.title }}</td>
            <td class="">{{ item.artist }}</td>
            <td>{{ dateWithoutTime }}</td>
            <td class="text-center crsr" @click="editAlbum(item)">
                <font-awesome-icon :icon="['fas', 'pen']" class="trash"/>
            </td>
            <td class="text-center crsr" @click="selectedAlbumToDelete = item">
              <font-awesome-icon :icon="['far', 'trash-can']" class="trash"/>
            </td>
        </tr>
        </table>  
    </div>

    <teleport to="body">
        <div class="">
        <base-modal v-if="selectedAlbumToDelete">
          <div class="text-end pb-1">
            <font-awesome-icon @click="cancel" :icon="['fas', 'xmark']" class="crsr"></font-awesome-icon>
          </div>
          <div class="p-2">
            <h5>Are you sure you want to delete <b>{{ selectedAlbumToDelete.title }}</b>?</h5>
            <div class="d-flex justify-content-end align-items-center mt-3">
              <div class="me-3 crsr" @click="cancel">Cancel</div>
              <base-button @click="removeAlbum">Delete</base-button>
            </div>
        </div>
        </base-modal>
      </div>
    </teleport> 

</template>

<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter()

    import { useMusicStore } from '@/stores/music';
    const store = useMusicStore();

    import { storeToRefs } from 'pinia';
    const { albums, fieldsToEdit, editText, filteredMusic, selectedAlbumToDelete } = storeToRefs(store);

    import { useUserStore } from '@/stores/user';
    const storeuser = useUserStore();

    // const deleteAlbum = (item) => {
    //    albums.value = albums.value.filter(itm => itm !== item) 
    // }

    const editAlbum = (item) => {
      router.push({ name: 'Dashboard', hash: `#${storeuser.tabs[2].name.toLowerCase().split(' ').join('-')}`})
      fieldsToEdit.value = true
       editText.value = {
          id: item.id,
          title: item.title,
          artist: item.artist,
          price: item.price,
          tag: item.tag,
          cat: item.cat,
          desc: item.desc,
          img: item.img
       }
    }

    const date = new Date();
    const dateWithoutTime = date.toLocaleDateString();
    console.log(dateWithoutTime);

    const cancel = () => {
      selectedAlbumToDelete.value = null;
    }

    const removeAlbum = () => {
        albums.value = albums.value.filter(itm => itm.id !== selectedAlbumToDelete.value.id)
        selectedAlbumToDelete.value = null
    }
</script>

<style scoped>
     h4 {
        color: #F89829;
    }
    table, td, th {
      border: 1px solid #333537;
      border-collapse: collapse;
      padding: 7px 13px;
   }

    .crsr {
      cursor: pointer;
    }
</style>