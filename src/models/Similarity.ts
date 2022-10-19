export interface SimilarityMatrix {
  [period: string]: {
    [topic: string]: Similarity[]
  }
}

export interface Similarity {
  otherTopicId: string
  similarity: number
}

export interface SimilarityMatrixWithinTopic {
  [topic: string]: {
    [period: string]: {
      [otherPeriod: string]: number
    }
  }
}
