export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface Metrics {
  totalPosts: number
  users: number
  avgPostsPerUser: number
  postsPerUser: Record<number, number>
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  return response.json()
}
