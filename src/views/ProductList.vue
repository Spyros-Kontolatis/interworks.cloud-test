<template>
  <div class="flex flex-col w-full items-start">
    <h1 class="font-extrabold text-2xl">Product List</h1>
    <FilterBar class="my-4" />
    <div class="grid grid-cols-4 gap-6 w-full my-4">
      <CardItem
        v-for="{ id, name, image, description, price } in products"
        :key="`product-${id}`"
        :name="name"
        :description="description"
        :price="price"
        :image="image"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import FilterBar from "@/components/product/FilterBar.vue";
import CardItem from "@/components/product/CardItem.vue";
import Service from "@/services/Service";
import { onMounted, ref } from "vue";
import type { Product } from "@/types/products/product.ts";

const products = ref<Product[]>([]);
onMounted(() => {
  Service.products()
    .index()
    .onSuccess((response) => {
      products.value = response;
    })
    .execute();
});
</script>
