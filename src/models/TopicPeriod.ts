import { LooWord, MyWord } from './Word'

export interface TopicPeriod {
  id: string
  topic: string
  period: number
  start?: string
  end?: string
  similarity: number
  threshold: number
  isChangePoint: boolean
  referencePeriodSize: number
  words: MyWord[]
  loo: LooWord[]
}
