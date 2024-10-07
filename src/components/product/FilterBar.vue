<template>
  <div class="flex flex-col md:flex-row w-full justify-between items-center">
    <div
      v-if="sortingOptions?.length"
      class="flex gap-4 items-center w-full md:w-auto"
    >
      <h5 class="font-extrabold text-start">Sort:</h5>
      <select
        class="mt-2 p-4 bg-website-background border border-primary rounded-md cursor-pointer grow"
        @change="performSort(($event.target as HTMLInputElement).value)"
      >
        <option v-for="opt in sortingOptions" :key="opt">{{ opt }}</option>
      </select>
    </div>
    <div class="flex items-center mt-4 md:mt-0 w-full md:w-auto">
      <input
        v-model="search"
        @input="performSearch(($event.target as HTMLInputElement).value)"
        placeholder="Search"
        class="rounded-md p-4 bg-website-background w-full border border-primary focus:border-primary"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";

interface FilterBarProps {
  sortingOptions?: Array<string>;
}

defineProps<FilterBarProps>();
const emit = defineEmits(["search", "sort"]);

const search = ref("");

const performSearch = (val: string) => {
  emit("search", val.toLowerCase().trim());
};

const performSort = (selected: string) => {
  emit("sort", selected);
};
</script>
