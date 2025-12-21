import { fetchPosts } from "./api"
import { calculateMetrics } from "./metrics"
import { generateInsights } from "./insights"

async function main() {
  console.log("📊 Metrics Dashboard\n")

  const posts = await fetchPosts()
  const metrics = calculateMetrics(posts)
  const insights = generateInsights(metrics)

  console.table({
    "Total Posts": metrics.totalPosts,
    "Total Users": metrics.users,
    "Avg Posts/User": metrics.avgPostsPerUser.toFixed(2)
  })

  console.log("\n🔥 Insights")
  console.log(
    `Most active user: User ${insights.mostActiveUser.userId} (${insights.mostActiveUser.posts} posts)`
  )
}

main()
