<template>
  <section class="transparent-scrollbar holder">
    <template v-if="loading">
      <div class="bar" v-for="i in 6" :key="i">
        <div class="animate-pulse flex gap-9">
          <div class="h-4 bg-slate-700 rounded w-20"></div>

          <div class="flex gap-2.5">
            <div class="h-4 bg-slate-700 rounded w-10"></div>
            <div class="h-4 bg-slate-700 rounded w-10"></div>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="occupants?.length">
      <div class="bar" v-for="occupant in occupants" :key="occupant?.id">
        <p>{{ formatDate(occupant?.created_at) }}</p>

        <div class="flex gap-2.5">
          <p class="item">
            <img src="/images/paw.svg" alt="paw" />
            <span> {{ occupant?.birds }} </span>
          </p>

          <p class="item">
            <img src="/images/egg.svg" alt="egg" />
            <span> {{ occupant?.eggs }} </span>
          </p>
        </div>
      </div>
    </template>

    <p v-else class="m-auto text-2xl text-white py-12">No Record Found</p>
  </section>
</template>

<script lang="ts" setup>
import { format } from 'date-fns'
import type { Occupant } from '@/types/global'

defineProps<{
  occupants: Occupant[] | undefined
  loading: boolean
}>()

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return format(date, 'dd/MM/yyyy')
}
</script>

<style lang="scss" scoped>
.holder {
  @apply overflow-auto;
  height: calc(100vh - 20rem);

  .bar {
    @apply h-[72px] text-white bg-gray rounded-xl p-6 mb-4  flex items-center gap-9 duration-300;

    .item {
      @apply flex items-center gap-2 text-base;
    }
  }
}
</style>
