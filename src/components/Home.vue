<template>
<h1 class="d-flex justify-content-center">Home</h1>

  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="url" v-model.trim="url" />
    <input type="text" placeholder="short" v-model.trim="short" />
    <button type="submit" :disabled="dataBaseStore.loadingDoc">
      Agregar
    </button>
  </form>

  <p v-if="dataBaseStore.loadingDoc">loading docs...</p>
  <ul v-else>
    <li v-for="item of dataBaseStore.documents" :key="item.id">
      {{item.id}}
      <br>
      {{item.name}}
      <br>
      {{item.short}}
      <br>
      <div>
        <button
            @click="dataBaseStore.deleteUrl(item.id)"
            :disabled="dataBaseStore.loadingDoc"
        >
          Eliminar
        </button>
        <button
        @click="router.push(`/editar/${item.id}`)"
        >
          Editar
        </button>
      </div>
    </li>
  </ul>

     <div v-if="userStore.loadingUser">
          <h2>Loading ...</h2>
     </div>
</template>

<script setup>
import {useUserStore} from "../stores/users.js";
import {useDatabaseStore} from "../stores/database.js";
import {useRouter} from "vue-router"
import {ref} from "vue";

const userStore =  useUserStore();
const dataBaseStore = useDatabaseStore()
const router = useRouter()

dataBaseStore.getUrls();
const url = ref("");
const short = ref("")

const handleSubmit = async () => {
  await dataBaseStore.addUrl(url.value, short.value);
  console.log("agregado");
};

</script>
