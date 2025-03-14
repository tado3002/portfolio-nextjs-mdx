import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface BlogPost {
  title: string
  shortDescription: string
  cover: string
  slug: string
  category: string
  publishedDate: string
}

interface BlogCardProps {
  post: BlogPost
}

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  const { title, slug, cover, shortDescription } = post

  return (
    <Link className="group relative block rounded-xl focus:outline-hidden" href={`/blogs/${slug}`}>
      <div className="shrink-0 relative rounded-xl overflow-hidden w-full h-87.5 before:absolute before:inset-x-0 before:z-1 before:size-full before:bg-linear-to-t before:from-gray-900/70">
        <Image
         className="size-full absolute top-0 start-0 object-cover" 
         src={cover}
         sizes='100%'
         fill={true}
         alt="Blog Image" />
      </div>
     <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="flex flex-col h-full p-4 sm:p-6">
          <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80">
            {title}
          </h3>
          <p className="mt-2 text-white/80">
            {shortDescription}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
