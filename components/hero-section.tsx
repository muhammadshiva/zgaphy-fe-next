"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { getKonfigurasi } from "@/lib/api"

export default function HeroSection() {
  const [heroImage, setHeroImage] = useState<string>("")

  useEffect(() => {
    const fetchKonfigurasi = async () => {
      try {
        const data = await getKonfigurasi()
        setHeroImage(data.gambar_hero)
      } catch (error) {
        console.error("Error fetching konfigurasi:", error)
      }
    }

    fetchKonfigurasi()
  }, [])

  return (
    <section className="pt-24 pb-12 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black to-black z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,126,0,0.15),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold hero-text">Zgaphy World</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Where Collectors Gather!</h2>
            <p className="text-gray-300 text-lg">
              We provide a variety of beautiful artworks that can make your life more colorful. Discover unique digital
              art pieces created by talented artists.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-zgaphy-orange hover:bg-zgaphy-orange/80 text-white px-8 py-6 text-lg">
                <Link href="#products">Explore Artworks</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-zgaphy-orange text-white hover:bg-zgaphy-orange hover:text-white px-8 py-6 text-lg"
              >
                <Link href="/collector">Join Collectors</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] floating">
              <Image 
                src={heroImage || "https://i.pinimg.com/736x/15/83/2e/15832e7fcec1f37bb655c1d1458b2d6e.jpg"} 
                alt="Zgaphy Characters" 
                fill 
                className="object-contain" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}