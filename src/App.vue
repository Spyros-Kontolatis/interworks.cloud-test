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
      <Transition name="fade">
        <div
          v-if="cart.totalQty"
          :key="cart.totalQty"
          class="bg-secondary w-4 h-4 text-xs rounded-full absolute -top-2 -right-2"
        >
          {{ cart.totalQty }}
        </div>
      </Transition>
    </div>
  </nav>

  <Loader v-if="loading" class="w-40 h-40 top-1/2" />
  <div
    v-else
    class="m-auto mb-16 w-[90%] md:w-4/5 h-[calc(100%-160px)] bg-website-background"
  >
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "./stores/cart";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import Service from "./services/Service";
const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const router = useRouter();
const loading = ref(false);

onMounted(() => {
  if (!cart.value.id) {
    Service.cart()
      .index()
      .onStart(() => {
        loading.value = true;
      })
      .onFinish(() => {
        loading.value = false;
      })
      .onSuccess((response) => {
        cart.value = response[0];
      })
      .execute();
  }
});
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
