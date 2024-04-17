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
import { ref, type Ref, computed, onMounted, watch } from 'vue'
import { format } from 'date-fns'
import type { Occupant } from '../../types/global'
// @ts-ignore
import ApexChart from 'vue3-apexcharts'

interface Series {
  name: string
  data: number[]
}

interface GroupedData {
  [key: string]: number[]
}

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

const series: Ref<Series[]> = ref([
  { name: 'Birds', data: [] },
  { name: 'Eggs', data: [] }
])

watch(
  () => props?.occupants,
  (newValue) => {
    if (newValue) groupByDayOfWeek(newValue)
  },
  { deep: true }
)
onMounted(() => {
  groupByDayOfWeek(props?.occupants)
})

const groupByDayOfWeek = (occupants: Occupant[] | undefined) => {
  if (!occupants) return

  const groupedData: GroupedData = {}
  for (const day of daysOfWeek) {
    groupedData[day] = [0, 0]
  }

  occupants.forEach((occupant) => {
    const dayOfWeek = format(new Date(occupant.created_at), 'EEEE')
    const index = daysOfWeek.indexOf(dayOfWeek)
    if (index > -1) {
      groupedData[dayOfWeek][0] += occupant.birds
      groupedData[dayOfWeek][1] += occupant.eggs
    }
  })

  series.value.forEach((item, index) => {
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
