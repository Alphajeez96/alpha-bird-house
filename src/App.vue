<template>
  <main>
    <Header />
    <component :is="$route.meta.layout || 'div'">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </component>
  </main>
</template>
