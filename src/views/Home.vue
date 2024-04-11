<template>
  <main>
    <h2 class="caption">Home page</h2>
    <button class="route-btn" aria-label="Navigate to admin panel" @click="handleRouting">
      <template v-if="loading">
        <img src="/images/loader.svg" alt="loader" />
      </template>

      <template v-else>
        <span class="font-medium"> To BirdHouses Overview</span>
        <img src="/images/arrow.svg" alt="arrow" />
      </template>
    </button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const handleRouting = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    router.push('/bird-houses')
  }, 600)
}
</script>

<style scoped lang="scss">
main {
  @apply bg-black h-screen flex flex-col items-center justify-center;

  .caption {
    @apply text-white font-semibold text-2xl pb-7;
  }

  .route-btn {
    @apply text-white font-medium text-base h-12 w-[260px] bg-purple flex items-center justify-center gap-2 rounded-lg px-4 outline-none focus:outline-none duration-300;

    &:hover {
      @apply opacity-75;
    }

    &:active {
      @apply opacity-60 outline-none;
    }

    &:disabled {
      @apply cursor-not-allowed opacity-50;
    }
  }
}
</style>
