<template>
    <router-link :to="link">
      <div class="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 bg-white text-center">
        <img :src="image" :alt="title" class="w-full h-48 object-cover" />
        <h3 class="p-4 text-lg font-semibold text-gray-800">{{ title }}</h3>
      </div>
    </router-link>
  </template>
  
  <script setup>
  const props = defineProps({
    title: String,
    image: String,
    link: String,
  });
  </script>
  