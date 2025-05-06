"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { getKonfigurasi, Konfigurasi } from "@/lib/api"

export default function WhatsAppCTA() {
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

  const handleWhatsAppClick = () => {
    if (!config?.whatsapp) return

    const message = config.pesan_wa || "Hello, I'm interested in ordering artwork from Zgaphy World. Can you help me?"
    const encodedMessage = encodeURIComponent(message)
    const whatsappNumber = config.whatsapp.replace(/\D/g, '') // Remove non-digits
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <section className="py-16 bg-zgaphy-dark-light relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,126,0,0.1),transparent_70%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zgaphy-orange mb-4">Order Directly via WhatsApp</h2>
          <p className="text-gray-300 mb-8">
            Found an artwork you love? Get in touch with us directly through WhatsApp for a personalized ordering
            experience. We'll guide you through the process and answer any questions you might have.
          </p>
          <Button
            className="bg-[#25D366] hover:bg-[#25D366]/80 text-white px-8 py-6 text-lg"
            onClick={handleWhatsAppClick}
            disabled={!config?.whatsapp}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chat with Us on WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
