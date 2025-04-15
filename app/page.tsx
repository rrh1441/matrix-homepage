import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Terminal } from "@/components/ui/terminal"
import { TerminalHeader } from "@/components/terminal-header"
import { PostCard } from "@/components/post-card"
import { DigitalRain } from "@/components/digital-rain"

// Function to get all posts
async function getPosts() {
  // This is a server-side function
  const postsDirectory = path.join(process.cwd(), "content/posts")

  // Handle case where directory doesn't exist yet
  if (!fs.existsSync(postsDirectory)) {
    return [
      {
        slug: "example-post-1",
        frontmatter: {
          title: "Example Post 1",
          date: new Date().toISOString(),
          author: "Neo",
          excerpt: "This is an example post. Replace with your actual MDX content.",
        },
      },
      {
        slug: "example-post-2",
        frontmatter: {
          title: "Example Post 2",
          date: new Date(Date.now() - 86400000).toISOString(),
          author: "Morpheus",
          excerpt: "Another example post. Replace with your actual MDX content.",
        },
      },
      {
        slug: "example-post-3",
        frontmatter: {
          title: "Example Post 3",
          date: new Date(Date.now() - 172800000).toISOString(),
          author: "Trinity",
          excerpt: "Yet another example post. Replace with your actual MDX content.",
        },
      },
    ]
  }

  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug: filename.replace(".mdx", ""),
      frontmatter: data,
    }
  })

  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date)
    const dateB = new Date(b.frontmatter.date)
    return dateB.getTime() - dateA.getTime()
  })
}

export default async function Home() {
  // Server component can use async/await
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono relative overflow-hidden">
      <DigitalRain />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <TerminalHeader />

        <Terminal className="mt-8">
          <div className="p-4">
            <div className="flex items-center mb-6">
              <div className="mr-2 text-green-400">root@matrix:~$</div>
              <div className="typing-animation">ls -la /posts</div>
            </div>

            <div className="grid gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.frontmatter.title}
                  date={post.frontmatter.date}
                  author={post.frontmatter.author}
                  excerpt={post.frontmatter.excerpt}
                  featuredImage={post.frontmatter.featuredImage}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center">
              <div className="mr-2 text-green-400">root@matrix:~$</div>
              <div className="typing-animation">_</div>
            </div>
          </div>
        </Terminal>
      </div>
    </main>
  )
}
