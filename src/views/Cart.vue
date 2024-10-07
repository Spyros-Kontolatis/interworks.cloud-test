<template>
  <div class="flex flex-col md:flex-row h-full">
    <div class="basis-full md:basis-2/3 md:overflow-auto">
      <div v-if="cart.totalQty">
        <h2 class="font-extrabold text-lg text-start">
          {{ cart.totalQty }} Products added to the Cart
        </h2>
        <CartItem
          v-for="item in cart.items"
          :key="`item-${item.product.id}`"
          :item="item"
          class="my-8"
        />
      </div>
      <div v-else>
        <h2 class="font-extrabold text-lg">
          No products added to the cart yet. Browse products
          <router-link :to="{ name: 'plp' }" class="text-primary"
            >here</router-link
          >
        </h2>
      </div>
    </div>
    <div
      class="basis-full md:basis-1/3 md:border-l border-l-none md:border-l-gray-300 md:pl-4 mt-4 md:mt-0"
      v-if="cart.totalQty"
    >
      <h2 class="font-extrabold text-lg text-start">Detailed Cost Analysis</h2>
      <CartDetails class="mt-8" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CartDetails from "@/components/cart/CartDetails.vue";
import CartItem from "@/components/cart/CartItem.vue";
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
</script>
