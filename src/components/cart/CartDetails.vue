<template>
  <div class="border border-gray-400 p-4 rounded-md ml-0 md:ml-4">
    <div class="flex flex-col">
      <h4 class="font-bold text-start" v-if="cart.items.length">Products:</h4>
      <div
        class="flex justify-between cart-items"
        v-for="{ product: { name, id, price }, quantity } in cart.items"
        :key="id"
      >
        <div class="flex grow">
          {{ name }}
          <div class="text-xs flex items-center ml-2">
            ({{ quantity }} x <PriceItem :price="price" />)
          </div>
        </div>
        <div class="flex gap-2">
          <PriceItem :price="price * quantity" />
        </div>
      </div>
      <div
        class="flex justify-between font-extrabold border-t border-t-gray-400 pt-2 totals"
      >
        <div class="">TOTAL:</div>
        <div class="total-price">
          <PriceItem :price="cart.totalPrice" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../../stores/cart";
import { storeToRefs } from "pinia";
import PriceItem from "../product/PriceItem.vue";

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
</script>
