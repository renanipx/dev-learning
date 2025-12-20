export function generateInsights(metrics: any) {
  const mostActiveUser = Object.entries(metrics.postsPerUser)
    .sort((a, b) => b[1] - a[1])[0]

  return {
    mostActiveUser: {
      userId: mostActiveUser[0],
      posts: mostActiveUser[1]
    }
  }
}
