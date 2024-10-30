<template>
  <div>
    <h1>Pobierz dane gracza League of Legends</h1>
    <input v-model="gameName" placeholder="Wprowadź nazwę z gry" />
    <input v-model="tagLine" placeholder="Wprowadź tag" />
    <p v-if="error">{{ error }}</p>
    <div v-if="puuidStore.puuid">
      <p>PUUID gracza: {{ puuidStore.puuid }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { usePuuidStore } from '@/stores/puuidStore';

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
  } catch (err) {
    error.value = 'Błąd podczas pobierania PUUID';
    console.error("Wystąpił błąd:", err);
  }
};

watch([gameName, tagLine], () => {
  if (gameName.value && tagLine.value) {
    getSummonerPuuid();
  }
});

onMounted(() => {
  puuidStore.loadPuuid();
});

onBeforeUnmount(() => {
  puuidStore.clearPuuid();
});
</script>
