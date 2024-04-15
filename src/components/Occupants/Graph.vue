<template>
  <section>
    <template v-if="loading">
      <div class="loader">
        <img src="/images/loader.svg" alt="loader" />
      </div>
    </template>

    <template v-else>
      <ApexChart
        type="area"
        :height="graphHeight"
        :options="chartOptions"
        :series="series"
      ></ApexChart>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { format } from 'date-fns'
import type { Occupant } from '@/types/global'
import ApexChart from 'vue3-apexcharts'

const daysOfWeek: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const props = defineProps<{
  occupants: Occupant[] | undefined
  loading: boolean
}>()

const graphHeight = computed<number>(() => window.innerHeight - 320)
const chartOptions = {
  legend: { show: false },
  stroke: { curve: 'smooth' },
  dataLabels: { enabled: false },
  markers: { size: 5, hover: { size: 6, sizeOffset: 3 } },
  yaxis: { labels: { style: { fontSize: '12px', colors: '#7e7e80' } } },
  xaxis: {
    type: 'category',
    categories: [...daysOfWeek],
    labels: { style: { fontSize: '12px', colors: '#7e7e80' } }
  },

  grid: {
    borderColor: '#363839',
    strokeDashArray: 2,
    xaxis: { lines: { show: true } }
  },
  colors: ['#379cff', '#744f9a']
}

const series: { name: string; data: number[] }[] = [
  { name: 'Birds', data: [] },
  { name: 'Eggs', data: [] }
]

onMounted(() => {
  groupByDayOfWeek(props.occupants)
})

const groupByDayOfWeek = (occupants: Occupant[] | undefined) => {
  if (!occupants) return

  //   const groupedData: Record<string, number[]> = {
  //     Monday: [0, 0],
  //     Tuesday: [0, 0],
  //     Wednesday: [0, 0],
  //     Thursday: [0, 0],
  //     Friday: [0, 0],
  //     Saturday: [0, 0],
  //     Sunday: [0, 0]
  //   }

  const groupedData: Record<string, number[]> = daysOfWeek.reduce((acc, day) => {
    acc[day] = [0, 0]
    return acc
  }, {})

  occupants.forEach((occupant) => {
    const dayOfWeek = format(new Date(occupant.created_at), 'EEEE')
    const index = daysOfWeek.indexOf(dayOfWeek)
    if (index > -1) {
      groupedData[dayOfWeek][0] += occupant.birds
      groupedData[dayOfWeek][1] += occupant.eggs
    }
  })

  // Update series data
  series.forEach((item, index) => {
    item.data = daysOfWeek.map((day) => groupedData[day][index])
  })
}
</script>

<style scoped lang="scss">
.loader {
  @apply flex flex-col items-center justify-center;
  height: calc(100vh - 20rem);

  img {
    @apply h-12;
  }
}
</style>