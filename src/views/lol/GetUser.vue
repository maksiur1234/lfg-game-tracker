<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Pobierz dane gracza League of Legends</h1>
      <div class="mb-4">
        <input
          v-model="gameName"
          type="text"
          placeholder="Wprowadź nazwę z gry"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div class="mb-4">
        <input
          v-model="tagLine"
          type="text"
          placeholder="Wprowadź tag"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        @click="getSummonerPuuid"
        class="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Pobierz PUUID
      </button>
      <p v-if="error" class="mt-4 text-red-500 text-center">{{ error }}</p>
      <div v-if="puuidStore.puuid" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <p class="text-lg font-semibold">PUUID gracza:</p>
        <p class="text-gray-700 break-all">{{ puuidStore.puuid }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { usePuuidStore } from '@/stores/puuidStore';
import router from '@/router';

const gameName = ref('');
const tagLine = ref('');
const error = ref(null);
const puuidStore = usePuuidStore();

const getSummonerPuuid = async () => {
  if (!gameName.value || !tagLine.value) {
    error.value = 'Proszę wprowadzić zarówno nazwę z gry, jak i tag';
    return;
  }

  const apiUrl = `/api/riot/account/v1/accounts/by-riot-id/${gameName.value}/${tagLine.value}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Riot-Token': 'RGAPI-833fab29-9991-4e25-bf64-604e2ae7d5f7',
      },
    });
    puuidStore.setPuuid(response.data.puuid);
    error.value = null;

    router.push(`/league-of-legends/stats/${response.data.puuid}`); 
  } catch (err) {
    error.value = 'Błąd podczas pobierania PUUID';
    console.error("Wystąpił błąd:", err);
  }
};

onMounted(() => {
  puuidStore.loadPuuid();
});

onBeforeUnmount(() => {
  puuidStore.clearPuuid();
});
</script>

