"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import { getKonfigurasi, Konfigurasi } from "@/lib/api"

interface ProductCardProps {
  id: number
  title: string
  description: string
  price: number
  image: string
  slug: string
}

export default function ProductCard({ id, title, description, price, image, slug }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [config, setConfig] = useState<Konfigurasi | null>(null)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await getKonfigurasi()
        setConfig(data)
      } catch (error) {
        console.error("Error fetching configuration:", error)
      }
    }

    fetchConfig()
  }, [])

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)

  const handleWhatsAppOrder = () => {
    if (!config?.whatsapp) return

    // const message = config?.pesan_order
    //   ? config.pesan_order
    //       .replace('{title}', title)
    //       .replace('{price}', formattedPrice)
    //   : `Hello, I'm interested in purchasing "${title}" for ${formattedPrice}. Can you provide more details?`

    const message = config.pesan_order
      ? config.pesan_order
          .replace('${title}', title)
          .replace('${formattedPrice}', formattedPrice)
      : `Hello, I'm interested in purchasing "${title}" for ${formattedPrice}. Can you provide more details?`

    const encodedMessage = encodeURIComponent(message)
    const whatsappNumber = config.whatsapp.replace(/\D/g, '') // Remove non-digits
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="product-card bg-zgaphy-dark-light rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/product/${slug}`}>
          <div className="relative w-full h-full shine-effect">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-in-out"
              style={{
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            />
            {isHovered && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-medium px-4 py-2 rounded-full bg-zgaphy-orange/80 backdrop-blur-sm">
                  View Details
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>

      <div className="p-4">
        <Link href={`/product/${id}`}>
          <h3 className="font-bold text-lg text-white hover:text-zgaphy-orange transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="bg-black/30 px-3 py-1.5 rounded-full">
            <span className="text-zgaphy-orange font-bold text-sm md:text-base">{formattedPrice}</span>
          </div>

          <Button onClick={handleWhatsAppOrder} className="bg-zgaphy-orange hover:bg-zgaphy-orange/80 text-white">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Order
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
