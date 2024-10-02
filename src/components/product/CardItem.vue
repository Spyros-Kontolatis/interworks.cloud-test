<template>
  <div class="bg-gray-200 rounded-2xl flex flex-col">
    <img class="h-2/3 rounded-t-2xl cursor-pointer" :src="image" />
    <div class="px-4">
      <p class="mt-2">{{ name }}</p>
      <p class="my-2">{{ description }}</p>
      <PriceItem :price="price" class="my-2 grow" />
      <Button color="primary" size="md" rounded class="mb-2 w-full"
        >Add To Cart</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import PriceItem from "./PriceItem.vue";
import Button from "../base/Button.vue";
defineProps({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
});
</script>
