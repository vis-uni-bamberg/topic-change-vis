import { TopicPeriod } from './TopicPeriod'

export interface Topic {
  id: string
  periods: TopicPeriod[]
  events: Event[]
}
