"use client"

import { useState } from "react"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Product {
  id: string
  title: string
  image: string
  price: number
  description: string
  category: string
  slug: string
}

interface ProductGridProps {
  products: Product[]
  title?: string
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  const [visibleProducts, setVisibleProducts] = useState(8)
  const [filter, setFilter] = useState("all")

  const categories = ["all", ...new Set(products.map((product) => product.category))]

  const filteredProducts = filter === "all" ? products : products.filter((product) => product.category === filter)

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 4)
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold mb-8 text-zgaphy-orange"
          >
            {title}
          </motion.h2>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={
                filter === category
                  ? "bg-zgaphy-orange hover:bg-zgaphy-orange/80 text-white"
                  : "border-zgaphy-orange text-white hover:bg-zgaphy-orange hover:text-white"
              }
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, visibleProducts).map((product) => (
            <ProductCard
              key={product.id}
              id={parseInt(product.id)}
              title={product.title}
              image={product.image}
              price={product.price}
              description={product.description}
              slug={product.slug}
            />
          ))}
        </div>

        {visibleProducts < filteredProducts.length && (
          <div className="mt-10 text-center">
            <Button onClick={loadMore} className="bg-zgaphy-orange hover:bg-zgaphy-orange/80 text-white px-8">
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
