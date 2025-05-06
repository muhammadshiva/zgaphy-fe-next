"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { ArrowUpDown, Filter } from "lucide-react"
import { getProduk, Produk } from "@/lib/api"

export default function ArtworksPage() {
  const [products, setProducts] = useState<Produk[]>([])
  const [visibleProducts, setVisibleProducts] = useState(8)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOrder, setSortOrder] = useState("default")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProduk().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(products.map((product) => product.kategori || "uncategorized")))
  ]

  // Filter products by category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => (product.kategori || "uncategorized") === selectedCategory)

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "price-low-high":
        return a.harga - b.harga
      case "price-high-low":
        return b.harga - a.harga
      default:
        return 0
    }
  })

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 4)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-zgaphy-orange mb-2">All Artworks</h1>
            <p className="text-gray-300 mb-8 max-w-3xl">
              Browse our complete collection of unique digital artworks. Each piece is carefully crafted to bring color
              and emotion to your space.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-zgaphy-orange" />
              <span className="text-white font-medium">Filter by Category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-zgaphy-orange hover:bg-zgaphy-orange/80 text-white"
                        : "border-zgaphy-orange text-white hover:bg-zgaphy-orange hover:text-white"
                    }
                    size="sm"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5 text-zgaphy-orange" />
              <span className="text-white font-medium">Sort by:</span>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px] bg-zgaphy-dark-light border-zgaphy-orange/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.slice(0, visibleProducts).map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.nama}
                  image={product.gambar || "/placeholder.svg"}
                  price={product.harga}
                  slug={product.slug}
                  description={product.deskripsi}
                  // Untuk detail, bisa tambahkan onClick={() => router.push(`/artworks/${product.id}`)}
                />
              ))}
            </div>
          )}

          {visibleProducts < sortedProducts.length && !loading && (
            <div className="mt-10 text-center">
              <Button onClick={loadMore} className="bg-zgaphy-orange hover:bg-zgaphy-orange/80 text-white px-8">
                Load More
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
