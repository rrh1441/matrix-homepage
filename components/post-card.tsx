import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"

interface PostCardProps {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  featuredImage?: string
}

export function PostCard({ slug, title, date, author, excerpt, featuredImage }: PostCardProps) {
  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true })

  return (
    <div className="border border-green-700 bg-black/50 hover:bg-black/80 transition-colors p-4 rounded">
      <div className="flex items-start gap-4">
        {featuredImage && (
          <div className="relative w-24 h-24 flex-shrink-0 border border-green-500 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <Image
              src={featuredImage || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover filter grayscale contrast-125 brightness-75"
              style={{ mixBlendMode: "screen" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/30 z-20"></div>
          </div>
        )}

        <div className="flex-1">
          <div className="text-xs mb-1">
            <span className="text-green-300">file://</span>
            <span className="text-green-500">{slug}.mdx</span>
          </div>

          <Link href={`/posts/${slug}`} className="block">
            <h2 className="text-lg font-bold hover:text-green-400 transition-colors">{title}</h2>
          </Link>

          <div className="mt-2 text-sm text-green-400/80">
            <span className="mr-4">@{author}</span>
            <span className="opacity-70">{formattedDate}</span>
          </div>

          <p className="mt-2 text-sm text-green-300/90 line-clamp-2">{excerpt}</p>

          <div className="mt-3 text-xs">
            <Link
              href={`/posts/${slug}`}
              className="text-green-400 hover:text-green-300 border-b border-green-700 hover:border-green-400 transition-colors"
            >
              cat {slug}.mdx | more
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
