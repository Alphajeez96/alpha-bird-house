import { ref } from 'vue'
import $axios from '@/axiosConfig'
import type { AxiosResponse } from 'axios'
import type { BirdHouse, MetaData, Occupant } from '@/types/global'

interface HouseItem {
  birdhouse: BirdHouse
  value: string
}

interface BirdHouseResponse {
  items: HouseItem[]
  meta: MetaData
}

interface OccupancyResponse {
  items: Occupant[]
  meta: MetaData
}

interface PaginationParams {
  page: number
  limit: number
}

export const useBirdHouse = () => {
  const loading = ref(false)

  const fetchHouses = async (): Promise<{ items: BirdHouse[]; meta: MetaData } | undefined> => {
    try {
      const {
        data: { items = [], meta }
      }: AxiosResponse<BirdHouseResponse> = await $axios.get('/registration')

      //  retrieve occupants for each house
      const occupancyMap = await Promise.all(
        items.map(async (houseItem) => {
          const response = await retrieveOccupancy(houseItem.value)
          return { [houseItem.value]: response?.items ?? [] }
        })
      )

      //   Sort data && cumulate items
      const housesWithOccupants = items.map((houseItem) => {
        let totalEggs: number = 0
        let totalBirds: number = 0
        const validOccupant = occupancyMap?.find((occupancy) => occupancy[houseItem.value])

        if (validOccupant) {
          totalEggs = validOccupant[houseItem.value]?.reduce((sum: number, occupant: Occupant) => {
            return sum + occupant.eggs
          }, 0)

          totalBirds = validOccupant[houseItem.value]?.reduce((sum: number, occupant: Occupant) => {
            return sum + occupant.birds
          }, 0)
        }

        return {
          ...houseItem.birdhouse,
          totalEggs,
          totalBirds
        }
      })

      return { items: housesWithOccupants, meta }
    } catch (_err) {}
  }

  const retrieveOccupancy = async (
    ubid: string,
    params?: PaginationParams
  ): Promise<OccupancyResponse | undefined> => {
    try {
      loading.value = true
      const url = `/house/${ubid}/occupancy${params ? `?page=${params?.page ?? 1}&limit=${params?.limit ?? 10}` : ''} `

      const {
        data: { items = [], meta }
      }: AxiosResponse<OccupancyResponse> = await $axios.get(url, {
        headers: { 'X-UBID': ubid }
      })

      return { items, meta }
    } catch (_err) {
    } finally {
      loading.value = false
    }
  }

  return { loading, fetchHouses, retrieveOccupancy }
}
