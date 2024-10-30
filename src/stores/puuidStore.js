import { defineStore } from 'pinia';

export const usePuuidStore = defineStore('puuidStore', {
  state: () => ({
    puuid: null,
  }),
  actions: {
    setPuuid(puuid) {
      this.puuid = puuid;
      sessionStorage.setItem('puuid', puuid);
    },
    loadPuuid() {
      const savedPuuid = sessionStorage.getItem('puuid');
      if (savedPuuid) {
        this.puuid = savedPuuid;
      }
    },
    clearPuuid() {
      this.puuid = null;
      sessionStorage.removeItem('puuid');
    },
  },
});
