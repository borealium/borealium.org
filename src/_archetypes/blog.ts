export default function createBlogPost(title: string, author: string) {
  const slug = title.replace(/\s+/g, "-").toLowerCase()
  const now = new Date()
  const dateString = now.toISOString().split("T")[0]

  return {
    path: `/blog/${dateString}_${slug}/index.mdx`,
    content: {
      title,
      author,
      date: dateString,
      content: `{/* Fill out your content here */}`,
    },
  }
}
