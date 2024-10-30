<template>
    <div>
      <h1>Dane przywoływacza</h1>
      <div v-if="summoner && summonerData && summonerData.length">
        <p>Poziom: {{ summoner.summonerLevel }}</p>
        <div v-for="(entry, index) in summonerData" :key="index">
          <p>Typ kolejki: {{ entry.queueType }}</p>
          <p>Dywizja: {{ entry.tier }} - {{ entry.rank }}</p>
          <p>Liczba punktów: {{ entry.leaguePoints }}</p>
          <p>Wygrane: {{ entry.wins }}</p>
          <p>Porażki: {{ entry.losses }}</p>
        </div>
      </div>
      <div v-if="error">{{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
  import axios from 'axios';
  import { usePuuidStore } from '@/stores/puuidStore';
  
  const puuidStore = usePuuidStore();
  const summoner = ref(null);
  const summonerData = ref(null);
  const error = ref(null);
  
  const getSummonerData = async () => {
    const puuid = puuidStore.puuid;
  
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
  
  watch(() => puuidStore.puuid, getSummonerData);
  
  onMounted(() => {
    puuidStore.loadPuuid();
    getSummonerData();
  });
  
  onBeforeUnmount(() => {
    puuidStore.clearPuuid();
  });
  </script>
  