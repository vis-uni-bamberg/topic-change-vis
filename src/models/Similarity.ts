export interface SimilarityMatrix {
  [period: string]: {
    [topic: string]: Similarity[]
  }
}

export interface Similarity {
  otherTopicId: string
  similarity: number
}
