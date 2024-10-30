<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-600">League of Legends Stats</h1>
        <div>
          <router-link to="/league-of-legends" class="text-blue-600 hover:text-blue-800 transition duration-200">Wróć</router-link>
        </div>
      </div>
    </nav>
    <main class="flex-grow flex items-center justify-center p-6">
      <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Dane przywoływacza</h2>
        <div v-if="summoner && summonerData && summonerData.length" class="space-y-4">
          <p class="text-lg font-semibold">Poziom: <span class="text-gray-600">{{ summoner.summonerLevel }}</span></p>
          <div v-for="(entry, index) in summonerData" :key="index" class="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <p class="font-semibold">Typ kolejki: <span class="text-gray-600">{{ entry.queueType }}</span></p>
            <p>Dywizja: <span class="text-gray-600">{{ entry.tier }} - {{ entry.rank }}</span></p>
            <p>Liczba punktów: <span class="text-gray-600">{{ entry.leaguePoints }}</span></p>
            <p>Wygrane: <span class="text-gray-600">{{ entry.wins }}</span></p>
            <p>Porażki: <span class="text-gray-600">{{ entry.losses }}</span></p>
            <p>Procent wygranych: <span class="text-gray-600">{{ calculateWinPercentage(entry.wins, entry.losses) }}%</span></p>
          </div>
        </div>
        <div v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { usePuuidStore } from '@/stores/puuidStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const puuid = route.params.puuid;
console.log(puuid);

const puuidStore = usePuuidStore();
const summoner = ref(null);
const summonerData = ref(null);
const error = ref(null);

const calculateWinPercentage = (wins, losses) => {
  const totalGames = wins + losses;
  return totalGames > 0 ? ((wins / totalGames) * 100).toFixed(2) : 0; 
};

const getSummonerData = async () => {
  if (!puuid) {
    error.value = 'Brak PUUID w pamięci';
    return;
  }

  try {
    const basicDataUrl = `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=RGAPI-833fab29-9991-4e25-bf64-604e2ae7d5f7`;
    const basicDataResponse = await axios.get(basicDataUrl);
    summoner.value = basicDataResponse.data; 

    const summonerId = summoner.value.id;
    const rangDataUrl = `https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=RGAPI-833fab29-9991-4e25-bf64-604e2ae7d5f7`;
    const rangResponse = await axios.get(rangDataUrl);
    summonerData.value = rangResponse.data;

    error.value = null;
  } catch (err) {
    error.value = 'Błąd podczas pobierania danych przywoływacza';
    console.error("Wystąpił błąd:", err);
  }
};

onMounted(() => {
  puuidStore.loadPuuid();
  getSummonerData();
});

onBeforeUnmount(() => {
  puuidStore.clearPuuid();
});
</script>

<style scoped>
/* Dodatkowe style (opcjonalnie) */
</style>
