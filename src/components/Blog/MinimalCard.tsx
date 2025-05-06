import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { formatDate } from "../../utils";

interface BlogPost {
  title: string;
  shortDescription: string;
  cover: string;
  slug: string;
  category: string;
  publishedDate: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  const { title, slug, cover, publishedDate, category } = post;

  return (
    <Link href={`/blogs/${slug}`} className="no-underline">
      <div className="flex transform flex-col gap-3 transition-transform hover:scale-105">
        <figure className="relative h-48 w-full overflow-hidden">
          <Image
            src={cover}
            alt={title}
            fill={true}
            sizes="100%"
            className="rounded-xl object-cover"
            placeholder="blur"
            blurDataURL="/placeholder.png"
          />
        </figure>

        <div className="mt-1 flex items-center gap-2">
          <span className="w-fit rounded-xl bg-secondary border border-mint px-3 py-1 text-sm font-bold text-mint">
            {category}
          </span>
          <p className="text-sm font-semibold text-gray-500">
            {formatDate(publishedDate)}
          </p>
        </div>

        <h3 className="mb-2 text-xl font-bold transition-colors duration-200 hover:text-mint">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default BlogCard;
