
import { Metrics, Post } from "./api"

export function calculateMetrics(posts: Post[]): Metrics {
  const postsPerUser: Record<number, number> = {}

  for (const post of posts) {
    postsPerUser[post.userId] =
      (postsPerUser[post.userId] || 0) + 1
  }

  return {
    totalPosts: posts.length,
    users: Object.keys(postsPerUser).length,
    avgPostsPerUser:
      posts.length / Object.keys(postsPerUser).length,
    postsPerUser
  }
}
