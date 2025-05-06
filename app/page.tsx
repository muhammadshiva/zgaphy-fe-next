"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import ProductGrid from "@/components/product-grid"
import FeaturedArtwork from "@/components/featured-artwork"
import WhatsAppCTA from "@/components/whatsapp-cta"
import { getProduk, Produk } from "@/lib/api"

export default function Home() {
  const [products, setProducts] = useState<Produk[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProduk().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <div id="products">
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <ProductGrid
            products={products.map((p) => ({
              id: p.id.toString(),
              title: p.nama,
              image: p.gambar || "/placeholder.svg",
              price: p.harga,
              slug: p.slug,
              description: p.deskripsi,
              category: p.kategori || "uncategorized",
            }))}
            title="Explore Our Collection"
          />
        )}
      </div>
      <FeaturedArtwork />
      <WhatsAppCTA />
      <Footer />
    </main>
  )
}
