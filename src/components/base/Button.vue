<template>
  <button class="border" :class="[...buttonClasses]">
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
} from "@/config/baseComponents/button";
interface Props {
  color: "primary" | "secondary";
  outline?: boolean;
  rounded?: boolean;
  size: "xs" | "sm" | "md" | "lg" | "xl";
}
const props = defineProps<Props>();

const buttonClasses = computed(() => {
  return [
    bgColors[props.color],
    textColors[props.color],
    sizes[props.size],
    props.rounded && rounded[props.size],
    props.outline &&
      (props.color === "primary"
        ? "bg-white !text-primary border-primary"
        : "bg-white !text-secondary border-secondary"),
  ];
});
</script>
