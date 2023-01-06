<template>
<h1 class="d-flex justify-content-center">Register</h1>
  <div>
    <form @submit.prevent = "handleSubmit">
      <input  class="m-2" type="email" placeholder="email"  v-model.trim="email">
      <input type="password" placeholder="password" v-model.trim="password">
      <div>
      <button class="mt-2" type="submit">Log In</button>
      </div>
    </form>

  </div>
</template>

<script setup>
import {useUserStore} from "../stores/users.js";
import {ref} from "vue";

const userStore = useUserStore();

const email    = ref("omarrojas@gmail.com")
const password = ref("123123")

const handleSubmit = () => {
  if(!email.value || password.value.length < 6) {
    alert("Enter camp")
  }
  userStore.registerUser(email.value, password.value);
}
</script>

<style scoped>

</style>