<template>
  <div>{{ formattedPrice }}</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useCurrency } from "@/composables/useCurrency";

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
});

const formattedPrice = computed(() => useCurrency(props.price));
</script>
