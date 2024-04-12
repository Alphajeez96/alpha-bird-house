<template>
  <section class="inner-container transparent-scrollbar">
    <div class="flex gap-6 flex-wrap">
      <div class="bird-card relative" v-for="i in 2" :key="i">
        <p class="name">Cool birdhouse</p>
        <p class="item relative pb-2.5">
          <img src="/images/location.svg" alt="location" />
          <span class="font-medium"> (7.160850, 16.072736)</span>
          <span class="shadow"></span>
        </p>

        <!-- House Details here -->
        <div class="flex items-center gap-2.5">
          <p class="item">
            <img src="/images/paw.svg" alt="paw" />
            <span>3</span>
          </p>

          <p class="item">
            <img src="/images/egg.svg" alt="egg" />
            <span>3</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.bird-card {
  @apply min-h-[156px] w-64 bg-gray text-white rounded-xl p-6  cursor-pointer hover:scale-105 transition-transform duration-500;

  .name {
    @apply text-2xl font-semibold pb-5;
  }

  .item {
    @apply flex items-center gap-2 text-base;
  }
}
</style>
