<template>
  <div class="border border-gray-400 relative p-4 rounded-md mr-4">
    <div
      v-if="loading"
      class="w-full h-40 absolute top-0 left-0 bg-gray-200 opacity-40"
    >
      <Loader class="w-10 h-10 top-1/3" />
    </div>
    <div class="flex gap-4">
      <div>
        <img :src="item.product.image" width="200" />
      </div>
      <div class="flex grow justify-between text-start">
        <div class="flex flex-col gap-2">
          <div class="font-extrabold">{{ item.product.name }}</div>
          <div>{{ item.product.description }}</div>
          <Stepper
            :loading="loading"
            v-model:step="step"
            @update:step="(_newVal, mode) => updateQuantity(mode)"
          />
        </div>
        <div class="mr-8 flex flex-col">
          <PriceItem :price="item.product.price * item.quantity" />
          <img
            width="20"
            src="../../assets/icons/trash.svg"
            class="cursor-pointer"
            @click="removeItemFromCart(item)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { CartItemProps } from "@/types/components/cart/cart";
import { useCartStore } from "@/stores/cart";
import PriceItem from "../product/PriceItem.vue";
import Loader from "../base/Loader.vue";
import Stepper from "./Stepper.vue";

const props = defineProps<CartItemProps>();
const { updateItemQuantity, removeItemFromCart } = useCartStore();
const step = ref(props.item.quantity);
const loading = ref(false);

const updateQuantity = (mode: "remove" | "add") => {
  loading.value = true;
  updateItemQuantity(props.item.product.id, mode);
  loading.value = false;
};
</script>
