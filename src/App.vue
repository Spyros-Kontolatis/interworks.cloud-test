<template>
  <nav class="bg-primary flex justify-between w-full mb-4">
    <img
      src="./assets/logo.png"
      width="20"
      height="20"
      alt="logo"
      class="cursor-pointer"
      @click="router.push({ name: 'plp' })"
    />
    <div class="relative">
      <img
        src="./assets/icons/basket.svg"
        width="20"
        height="20"
        alt="basket_icon"
        class="cursor-pointer"
        @click="router.push({ name: 'cart' })"
      />
      <div
        v-if="cart.totalQty"
        class="bg-secondary w-4 h-4 text-xs rounded-full absolute -top-2 -right-2"
      >
        {{ cart.totalQty }}
      </div>
    </div>
  </nav>
  <div class="m-auto mb-16 w-4/5 h-[calc(100%-160px)] bg-website-background">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "./stores/cart";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const router = useRouter();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color: #eceefb;
  overflow: auto;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
