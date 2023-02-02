export interface TableHeader {
  title: string
  key: string
  sortable: boolean
}

export interface TableFilters {
  [key: string]: string
}

export interface TableOrder {
  key: string
  order: string
}
