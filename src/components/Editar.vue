<template>
  <div>
    <h1>Editar</h1>
    <p v-if="databaseStore.loadingDoc">Loading doc...</p>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Enter URL" v-model="url">
      <button type="submit">Edit</button>
    </form>

  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";

const route = useRoute();
const databaseStore = useDatabaseStore();
const url = ref("");

//console.log(route.params.id)
const handleSubmit = () => {
  // validaciones de el input
  databaseStore.updateUrl(route.params.id, url.value)
}
onMounted(async() => {
  url.value = await databaseStore.leerUrl(route.params.id)
})

</script>