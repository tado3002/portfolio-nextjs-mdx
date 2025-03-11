import React from 'react'
import Category from './CategoryCard'

interface CategoryListProps {
  categories: { imageSrc: string; altText: string; categoryName: string }[]
}


const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
    
  return (
    <section className="py-8">
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {categories.map((category, index) => (
          <Category
            key={index}
            imageSrc={category.imageSrc}
            altText={category.altText}
            categoryName={category.categoryName}
          />
        ))}
      </div>
    </section>
  )
}

export default CategoryList