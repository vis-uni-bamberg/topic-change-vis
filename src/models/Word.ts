import { Word } from 'd3-cloud'

export interface MyWord extends Word {
  word: string
  count: number
}

export interface LooWord {
  word: string
  impact: number
}
