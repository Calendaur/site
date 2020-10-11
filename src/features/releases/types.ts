export enum Platforms {
  PC = 'pc',
  PS4 = 'ps_4',
  PS5 = 'ps_5',
  XboxOne = 'xbox_one',
  XboxSeries = 'xbox_series',
  NintendoSwitch = 'nintendo_switch',
}

export type Release = {
  released: string
  release_id: number
  id: number
}

export enum ReleaseType {
  Films = 'films',
  Games = 'games',
  Series = 'series',
}
