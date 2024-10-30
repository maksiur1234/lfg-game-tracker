<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-center mb-6">Sprawdź statystyki z gier</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <GameCard
        v-for="game in games"
        :key="game.id"
        :title="game.title"
        :image="game.image"
        :link="game.link"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import GameCard from './GameCard.vue';

const games = ref([]);

onMounted(() => {
  games.value = [
    { id: 1, title: 'League Of Legends', link: '/league-of-legends', image: 'https://img.redbull.com/images/c_limit,w_1500,h_1000/f_auto,q_auto/redbullcom/2022/8/1/ksfga6rlx2ugfhjd9vnk/league-of-legends' },
    { id: 2, title: 'Counter-Strike 2', link: '/cs2', image: 'https://cs2mod.pl/uploads/monthly_2024_08/rssImage-513d980940b3ca7f2121b516a7b8d44d.png.c55a8b200c17f3125a4c1bfa2f6cb5f2.png' },
    { id: 3, title: 'Valorant', link: '/valorant', image: 'https://static.android.com.pl/uploads/2020/06/valorant.jpg' },
  ];
});
</script>
