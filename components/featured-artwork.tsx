"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { getPopularProduk, PopularProduk } from "@/lib/api"

export default function FeaturedArtwork() {
  const [artworks, setArtworks] = useState<PopularProduk[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPopularProduk().then((data) => {
      setArtworks(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!loading && artworks.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % artworks.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [artworks, loading])

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  if (artworks.length === 0) {
    return <div className="text-center py-10">No featured artwork found.</div>
  }

  const currentArtwork = artworks[current].produk

  return (
    <section className="py-16 bg-zgaphy-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,126,0,0.1),transparent_70%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zgaphy-orange mb-4">Featured Artwork</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover our most popular and stunning pieces that have captured the hearts of collectors worldwide.
          </p>
        </motion.div>

        <div className="relative h-[500px] md:h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="grid md:grid-cols-2 gap-8 h-full items-center">
                <div className="order-2 md:order-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{currentArtwork.nama}</h3>
                    <p className="text-gray-300">
                      By <span className="text-zgaphy-orange">{artworks[current].artist || 'Unknown Artist'}</span>
                    </p>
                    <p className="text-gray-400">{currentArtwork.deskripsi}</p>
                    <div className="pt-4">
                      <Button
                        className="bg-zgaphy-orange hover:bg-zgaphy-orange/80 text-white"
                        onClick={() => {
                          const message = `Hello, I'm interested in the featured artwork \"${currentArtwork.nama}\". Can you provide more details?`
                          const encodedMessage = encodeURIComponent(message)
                          window.open(`https://wa.me/+1234567890?text=${encodedMessage}`, "_blank")
                        }}
                      >
                        Inquire via WhatsApp
                      </Button>
                    </div>
                  </motion.div>
                </div>

                <div className="order-1 md:order-2 relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative h-[300px] md:h-[400px] shine-effect"
                  >
                    <Image
                      src={currentArtwork.gambar || "/placeholder.svg"}
                      alt={currentArtwork.nama}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {artworks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                current === index ? "bg-zgaphy-orange" : "bg-gray-600"
              }`}
              aria-label={`View artwork ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
