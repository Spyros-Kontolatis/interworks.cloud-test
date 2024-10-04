<template>
  <div class="bg-light-gray rounded-2xl flex flex-col">
    <img class="h-2/3 rounded-t-2xl cursor-pointer" :src="product.image" />
    <div class="px-4">
      <p class="mt-2">{{ product.name }}</p>
      <p class="my-2">{{ product.description }}</p>
      <PriceItem :price="product.price" class="my-2 grow" />
      <Button
        color="primary"
        size="xl"
        rounded
        :loading="loading"
        class="mb-2 w-full"
        @click="addItemToCart"
        >Add To Cart</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import PriceItem from "./PriceItem.vue";
import Button from "../base/Button.vue";
import type { Product } from "@/types/components/products/product";

const { addToCart } = useCartStore();
const loading = ref(false);
const props = defineProps({
  product: { type: Object as PropType<Product>, required: true },
});

const addItemToCart = () => {
  loading.value = true;
  addToCart({ product: props.product, quantity: 1 });
  loading.value = false;
};
</script>
