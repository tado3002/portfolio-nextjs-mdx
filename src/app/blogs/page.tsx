
import BlogCard from '@/components/Blog/MinimalCard'
import CategoryList from '@/components/Categories/CategoryList'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import { getBlogs } from '@/services/blogs'

const categories = [
    {
      imageSrc:
        'https://cdn.pixabay.com/photo/2017/09/02/22/10/dolphin-2708695_1280.png',
      altText: 'JavaScript logo',
      categoryName: 'Sea Food',
    },
    {
      imageSrc:
        'https://cdn.pixabay.com/photo/2024/05/16/09/15/tea-8765473_1280.png',
      altText: 'TypeScript logo',
      categoryName: 'Cutlery',
    },
    {
      imageSrc:
        'https://cdn.pixabay.com/photo/2017/05/31/11/28/the-cup-2360104_1280.png',
      altText: 'TypeScript logo',
      categoryName: 'Tea',
    },
    {
      imageSrc:
        'https://cdn.pixabay.com/photo/2017/07/29/18/42/wooden-box-2552370_1280.png',
      altText: 'JavaScript logo',
      categoryName: 'Treasure Box',
    },
    {
      imageSrc:
        'https://cdn.pixabay.com/photo/2017/09/17/02/02/png-2757379_1280.png',
      altText: 'JavaScript logo',
      categoryName: 'Vehicles',
    },
    {
      imageSrc:
        'https://cdn.pixabay.com/photo/2016/02/23/17/44/apple-1218166_1280.png',
      altText: 'TypeScript logo',
      categoryName: 'Fruits',
    },
  ]

export default async function Home() {
  const posts = await getBlogs()

  return (
    <>
      <main className="w-dvw">
        <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
          <SectionHeading title='// Categories'/>
          <CategoryList categories={categories}/>
          <section className="my-16">
            <SectionHeading
              title={'// Popular Articles'}
              subtitle="Diverse Range of articles related to Artificial Intelligence"
            />
            <div className="mt-16 grid gap-x-14 gap-y-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((blog) => (
                <BlogCard key={blog.slug} post={blog} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}