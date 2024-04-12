<template>
  <main>
    <Header />
    <component :is="$route.meta.layout || 'div'">
      <router-view v-slot="{ Component }">
        <transition name="fade-up">
          <component :is="Component" />
        </transition>
      </router-view>
    </component>
  </main>
</template>
