"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Share2, ArrowLeft, MessageCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { motion } from "framer-motion"
import { getProdukById, getKonfigurasi, Produk, Konfigurasi } from "@/lib/api"

// Function to format price in Indonesian Rupiah
const formatToRupiah = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Produk | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState("")
  const [config, setConfig] = useState<Konfigurasi | null>(null)

  useEffect(() => {
    Promise.all([
      getProdukById(String(params.slug)),
      getKonfigurasi()
    ]).then(([productData, configData]) => {
      setProduct(productData)
      setConfig(configData)
      setSelectedImage(productData.gambar || "/placeholder.svg")
    }).finally(() => setLoading(false))
  }, [params.slug])

  const handleWhatsAppOrder = () => {
    if (!product || !config?.whatsapp) return
    const formattedPrice = formatToRupiah(product.harga)
    const message = config.pesan_order
      ? config.pesan_order
          .replace('${title}', product.nama)
          .replace('${formattedPrice}', formattedPrice)
      : `Hello, I'm interested in purchasing "${product.nama}" for ${formattedPrice}. Can you provide more details?`
    const encodedMessage = encodeURIComponent(message)
    const whatsappNumber = config.whatsapp.replace(/\D/g, '')
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-zgaphy-orange text-xl">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-zgaphy-orange mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-zgaphy-orange hover:bg-zgaphy-orange/80 text-white">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button asChild variant="ghost" className="text-white hover:text-zgaphy-orange">
              <Link href="/artworks">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Products
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-zgaphy-orange/20 shine-effect">
                <Image src={selectedImage || "/placeholder.svg"} alt={product.nama} fill className="object-cover" />
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {/* Thumbnail images - jika ada banyak gambar, bisa di-mapping di sini */}
                {[product.gambar].map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img || "/placeholder.svg")}
                    className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
                      selectedImage === img ? "ring-2 ring-zgaphy-orange" : "opacity-70"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.nama} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{product.nama}</h1>
                <p className="text-zgaphy-orange text-xl font-bold mt-2">{formatToRupiah(product.harga)}</p>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{product.deskripsi}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-800">
                <div>
                  <h3 className="text-sm text-gray-400">Medium</h3>
                  <p className="text-white">{product.medium || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Size</h3>
                  <p className="text-white">{product.ukuran || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Frame</h3>
                  <p className="text-white">{product.frame || '-'}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Artist</h3>
                  <p className="text-white">{product.artist || '-'}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  onClick={handleWhatsAppOrder}
                  className="bg-[#25D366] hover:bg-[#25D366]/80 text-white py-6 text-lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </Button>

                <Button
                  variant="outline"
                  className="border-zgaphy-orange text-white hover:bg-zgaphy-orange hover:text-white"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Related products bisa diimplementasikan jika ingin, misal fetch produk lain dengan kategori sama */}
        </div>
      </main>

      <Footer />
    </div>
  )
}
