<template>
  <section class="inner-container !overflow-hidden transparent-scrollbar">
    <template v-if="loading">
      <div class="top-bar">
        <div class="animate-pulse flex items-center">
          <div class="h-5 bg-slate-700 rounded w-40"></div>

          <div class="ml-auto flex items-center gap-2">
            <div class="rounded-full bg-slate-700 h-4 w-4"></div>
            <div class="h-4 bg-slate-700 rounded w-40"></div>
          </div>
        </div>

        <div class="mt-10 flex gap-8">
          <div class="h-3 bg-slate-700 rounded w-20"></div>
          <div class="h-3 bg-slate-700 rounded w-20"></div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="top-bar">
        <div class="flex items-center">
          <p class="name">{{ activeHouse?.name }}</p>

          <div class="ml-auto flex items-center gap-2">
            <img src="/images/location.svg" alt="location" />
            <p class="font-medium">{{ `(${activeHouse?.latitude}, ${activeHouse?.longitude})` }}</p>
          </div>
        </div>

        <!-- Tab  Region -->
        <div class="mt-6 flex gap-8">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="tab"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>
      </div>
    </template>

    <div class="mt-6">
      <template v-if="isOverview">
        <List :loading="loading" :occupants="occupants" />
      </template>

      <template v-else>
        <Graph :loading="loading" :occupants="occupants" />
      </template>
    </div>
  </section>

  <div v-if="isOverview" class="pagination-holder">
    <Pagination
      :meta="metaData"
      :disabled="loading"
      @update:current-page="(page: number) => fetchOccupants(page)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, toRef, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBirdStore } from '@/stores/birdStore'
import { useBirdHouse } from '@/composables/useBirdHouse'
import type { Occupant, MetaData } from '@/types/global'

const route = useRoute()
const activeHouse = toRef(useBirdStore(), 'activeHouse')
const { loading, retrieveOccupancy } = useBirdHouse()

const activeTab = ref('overview')
const tabs: string[] = ['overview', 'graph']
const metaData: Ref<MetaData | undefined> = ref()
const occupants: Ref<Occupant[] | undefined> = ref()

const isOverview = computed<boolean>(() => activeTab.value === 'overview')

onMounted(async () => {
  fetchOccupants()
})

const fetchOccupants = async (page: number = 1) => {
  const response = await retrieveOccupancy(route.params.id as string, { page, limit: 6 })
  occupants.value = response?.items
  metaData.value = response?.meta
}
</script>

<style lang="scss" scoped>
.top-bar {
  @apply h-[116px] bg-gray rounded-xl p-6 text-white;

  .name {
    @apply text-xl font-semibold;
  }

  .tab {
    @apply text-base text-[#56575b] pb-3.5 capitalize transition-all duration-200;

    &.active {
      @apply border-b-2 border-purple text-purple;
    }
  }
}
</style>
