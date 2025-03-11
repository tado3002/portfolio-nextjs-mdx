import { skillList } from '@/appData'
import BlogCard from '@/components/Blog/MinimalCard'
import Hero from '@/components/Hero/Hero'
import ProjectSection from '@/components/Projects/ProjectSection'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import ServiceSection from '@/components/Services/ServiceSection'
import Skills from '@/components/Skills/Skills'
import { getAllProjects } from '@/services'
import { getBlogs } from '@/services/blogs'

export default async function Home() {
  const projects = await getAllProjects()
  const posts = await getBlogs()

  return (
    <>
      <main className="w-dvw">
        <Hero />
        <div className="mb-[3.75rem]">
          <Skills skills={skillList} />
        </div>
        <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
          <ServiceSection />
          <ProjectSection projects={projects} />
          <section>
            <SectionHeading title='// Blogs'/>
            <div className="mt-16 grid gap-x-14 gap-y-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts?.slice(0,3).map((blog) => (
                <BlogCard key={blog.slug} post={blog} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
