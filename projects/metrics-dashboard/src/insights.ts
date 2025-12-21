import { Metrics } from "./api"

export interface Insights {
  mostActiveUser: {
    userId: number
    posts: number
  }
}

export function generateInsights(metrics: Metrics): Insights {
  const [userId, posts] = Object.entries(metrics.postsPerUser)
    .map(([userId, posts]) => [Number(userId), posts])
    .sort((a, b) => b[1] - a[1])[0]

  return {
    mostActiveUser: {
      userId,
      posts
    }
  }
}
