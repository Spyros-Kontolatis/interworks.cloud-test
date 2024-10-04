<template>
  <button class="border border-primary relative" :class="[...buttonClasses]">
    <Loader v-if="loading" class="w-8 h-8 top-3 left-2" />

    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import {
  sizes,
  textColors,
  bgColors,
  rounded,
  outline,
} from "@/config/components/base/button";
import type { ButtonProps } from "@/types/components/base/button";
import Loader from "./Loader.vue";

const props = defineProps<ButtonProps>();

const buttonClasses = computed(() => {
  return [
    bgColors[props.color],
    textColors[props.color],
    sizes[props.size],
    props.rounded && rounded[props.size],
    props.outline && outline[props.color],
    (props.disabled || props.loading) &&
      "opacity-50 cursor-not-allowed pointer-events-none",
  ];
});
</script>
