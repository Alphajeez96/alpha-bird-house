export interface BirdHouse {
  ubidValue: string
  name: string
  longitude: number
  latitude: number
  lastOccupationUpdate: string
  totalEggs?: number
  totalBirds?: number
}

export interface MetaData {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface Occupant {
  id: string
  eggs: number
  birds: number
  created_at: string
}
