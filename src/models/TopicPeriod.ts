import { MyWord } from './Word'

export interface TopicPeriod {
  id: string
  start?: string
  end?: string
  similarity: number
  threshold: number
  words: MyWord[]
}
