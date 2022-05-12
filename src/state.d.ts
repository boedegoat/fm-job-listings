import 'little-state-machine'

declare module 'little-state-machine' {
  interface GlobalState {
    // filter: {
    //   isFiltering: boolean
    //   role: string
    //   level: string
    //   languages: string[]
    // }
    filter: {
      type: FilterType
      value: string
    }[]
  }
}
