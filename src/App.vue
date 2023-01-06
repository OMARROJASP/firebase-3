<template>
<h1 class="d-flex justify-content-center ">App</h1>
  <div v-if="!userStore.loadingSession">

    <router-link class="btn btn-primary m-2"   to="login"> Login </router-link>
    <router-link class="btn btn-primary m-2"   to="register">Register</router-link>
  </div>
      <div v-else-if="userStore.loadingSession">
        <router-link class="btn btn-success  m-2" type="submit" to="/">Home</router-link>
        <button   @click="userStore.signOutUser" type="submit">Sign Out</button>
      </div>



  <div v-if="userStore.loadingUser">
    <h2>Loading ...</h2>
  </div>
  <router-view></router-view>
</template>

<script setup>
import {useUserStore} from "./stores/users.js";

const userStore =  useUserStore();

</script>




