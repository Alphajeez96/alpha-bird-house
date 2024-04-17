import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { type BirdHouse } from '@/types/global'

export const useBirdStore = defineStore(
  'birdHouse',
  () => {
    const activeHouse: Ref<BirdHouse | undefined> = ref()

    return { activeHouse }
  },
  { persist: true }
)
