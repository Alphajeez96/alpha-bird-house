<template>
  <section class="inner-container transparent-scrollbar">
    <div class="flex gap-6 flex-wrap">
      <template v-if="loading">
        <div class="bird-card" v-for="i in 15" :key="i">
          <div class="animate-pulse">
            <div class="h-4 bg-slate-700 rounded mb-7"></div>

            <div class="item h-4">
              <div class="rounded-full bg-slate-700 h-4 w-4"></div>
              <div class="h-3 bg-slate-700 rounded col-span-2 w-full"></div>
            </div>

            <div class="item mt-3 h-6">
              <div class="h-3 bg-slate-700 rounded col-span-2 w-full"></div>
              <div class="h-3 bg-slate-700 rounded col-span-2 w-full"></div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="birdHouses?.length">
        <div
          class="bird-card relative"
          v-for="house in birdHouses"
          :key="house.ubidValue"
          @click="handleClick(house)"
        >
          <p class="name" :title="house?.name">{{ house?.name }}</p>
          <p class="item relative pb-2.5">
            <img src="/images/location.svg" alt="location" />
            <span class="font-medium text-sm">
              {{ `(${house?.latitude}, ${house?.longitude})` }}
            </span>
            <span class="shadow"></span>
          </p>

          <!-- House Details here -->
          <div class="flex items-center gap-2.5">
            <p class="item">
              <img src="/images/paw.svg" alt="paw" />
              <span>{{ house?.totalBirds }}</span>
            </p>

            <p class="item">
              <img src="/images/egg.svg" alt="egg" />
              <span>{{ house?.totalEggs }}</span>
            </p>
          </div>
        </div>
      </template>

      <p v-else class="m-auto text-2xl text-white py-12">No Record Found</p>
    </div>
  </section>

  <div class="pagination-holder">
    <Pagination :meta="metaData" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBirdStore } from '@/stores/birdStore'
import type { BirdHouse, MetaData } from '@/types/global'
import { useBirdHouse } from '@/composables/useBirdHouse'

const router = useRouter()
const { fetchHouses } = useBirdHouse()

const loading = ref(true)
const metaData: Ref<MetaData | undefined> = ref()
const birdHouses: Ref<BirdHouse[] | undefined> = ref()

onMounted(async () => {
  fetchAllHouses()
})

const fetchAllHouses = async () => {
  const response = await fetchHouses()
  birdHouses.value = response?.items
  metaData.value = response?.meta
  loading.value = false
}

const handleClick = (house: BirdHouse) => {
  useBirdStore().activeHouse = house
  router.push(`/bird-houses/${house?.ubidValue}`)
}
</script>

<style scoped lang="scss">
.bird-card {
  @apply h-[156px] w-[246px] bg-gray text-white rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform duration-500;

  .name {
    @apply text-2xl font-semibold pb-5 text-ellipsis overflow-hidden whitespace-nowrap max-w-fit;
  }

  .item {
    @apply flex items-center gap-2 text-base;
  }
}
</style>
