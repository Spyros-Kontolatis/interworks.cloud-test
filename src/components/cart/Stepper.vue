<template>
  <div class="flex">
    <Button
      size="sm"
      color="primary"
      outline
      rounded
      :disabled="step === 1 || loading"
      class="rounded-r-none"
      @click="$emit('update:step', step - 1, 'remove')"
      ><div class="font-bold text-lg">-</div></Button
    >
    <div class="border border-primary py-2 px-4">{{ step }}</div>
    <Button
      size="sm"
      color="primary"
      rounded
      :disabled="loading"
      @click="$emit('update:step', step + 1, 'add')"
      class="rounded-l-none"
      ><div class="font-bold text-lg">+</div></Button
    >
  </div>
</template>

<script setup lang="ts">
import { StepperProps } from "@/types/components/cart/stepper";
import Button from "../base/Button.vue";
import { defineProps, defineEmits } from "vue";

defineProps<StepperProps>();
defineEmits(["update:step"]);
</script>
