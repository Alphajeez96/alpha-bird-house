<template>
  <aside>
    <div class="pt-3 flex flex-col gap-6">
      <button
        class="route"
        v-for="{ route, icon } in routes"
        :key="route"
        :class="{ active: getActive(route) }"
        @click="handleRouting(route)"
      >
        <component :is="icon" :stroke="getActive(route) ? '#ffffff' : '#4b4c51'" />
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import House from '../icons/House.vue'
import Dashboard from '../icons/Dashboard.vue'

const route = useRoute()
const router = useRouter()

interface Route {
  route: string
  icon: Component
}

const routes: Route[] = [
  { route: '/', icon: House },
  { route: '/bird-houses', icon: Dashboard }
]

const getActive = (name: string) => {
  return route.path === name
}

const handleRouting = (route: string) => {
  if (route === '/') {
    // reset Store here, This is presumed to simulate a logout action
  }
  router.push(route)
}
</script>

<style scoped lang="scss">
aside {
  @apply w-20 py-5 flex justify-center;

  .route {
    @apply h-12 w-12 flex justify-center items-center duration-300;

    &.active {
      @apply bg-purple rounded-lg;
    }

    &:hover {
      @apply opacity-75;
    }
  }
}
</style>
