<template>
  <div class="flex flex-col w-full items-start">
    <h1 class="font-extrabold text-2xl">Product List</h1>
    <FilterBar
      class="my-4"
      @search="searchProducts"
      @sort="sortProducts"
      :sortingOptions="sortingOptions"
    />
    <div
      class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full my-4"
    >
      <CardItem
        v-for="product in filteredProducts"
        :key="`product-${product.id}`"
        :product="product"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import FilterBar from "@/components/product/FilterBar.vue";
import CardItem from "@/components/product/CardItem.vue";
import Service from "@/services/Service";
import { onMounted, ref } from "vue";
import type { Product } from "@/types/components/products/product";

const products = ref<Product[]>([]);
const filteredProducts = ref<Product[]>([]);

const sortingOptions = ["price-asc", "price-desc", "name-asc", "name-desc"];

const searchProducts = (search: string) => {
  filteredProducts.value = products.value.filter(({ name }) =>
    name.toLowerCase().trim().includes(search)
  );
};

const sortProducts = (sort: string) => {
  const [attr, dir]: [attr: "price" | "name", dir: "asc" | "desc"] = sort.split(
    "-"
  ) as ["price" | "name", "asc" | "desc"];
  filteredProducts.value = filteredProducts.value.sort((a, b) => {
    if (dir === "asc") {
      if (a[attr] > b[attr]) {
        return 1;
      } else if (a[attr] === b[attr]) {
        return 0;
      } else return -1;
    } else {
      if (a[attr] > b[attr]) {
        return -1;
      } else if (a[attr] === b[attr]) {
        return 0;
      } else return 1;
    }
  });
};
onMounted(() => {
  Service.products()
    .index()
    .onSuccess((response) => {
      products.value = response;
      filteredProducts.value = response;
    })
    .execute();
});
</script>
