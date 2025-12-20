import { Post } from "./api.js"

export function calculateMetrics(posts: Post[]) {
  const totalPosts = posts.length

  const postsPerUser: Record<number, number> = {}

  for (const post of posts) {
    postsPerUser[post.userId] = (postsPerUser[post.userId] || 0) + 1
  }

  const avgPostsPerUser =
    totalPosts / Object.keys(postsPerUser).length

  return {
    totalPosts,
    users: Object.keys(postsPerUser).length,
    avgPostsPerUser,
    postsPerUser
  }
}
