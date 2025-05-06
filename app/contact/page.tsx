"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { Mail, MessageCircle, MapPin, Phone, Clock, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getKonfigurasi, Konfigurasi } from "@/lib/api"

export default function ContactPage() {
  const [config, setConfig] = useState<Konfigurasi | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getKonfigurasi().then((data) => {
      setConfig(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-zgaphy-orange mb-4">Contact Us</h1>
            <p className="text-gray-300">
              Have questions about our artworks or need assistance with your order? We're here to help! Reach out to us
              through any of the channels below.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-zgaphy-dark-light to-black rounded-2xl p-8 shadow-lg shadow-zgaphy-orange/5"
              >
                <h2 className="text-2xl font-bold text-zgaphy-orange mb-6 flex items-center gap-2">
                  <MessageCircle className="h-6 w-6" />
                  Message Us
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-zgaphy-orange/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-zgaphy-orange/30 transition-colors">
                      <MessageCircle className="text-zgaphy-orange h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">WhatsApp</h3>
                      <p className="text-gray-400">{config?.whatsapp || '-'}</p>
                      <Button
                        variant="link"
                        className="text-zgaphy-orange p-0 h-auto mt-1"
                        onClick={() => {
                          if (config?.whatsapp) {
                            window.open(`https://wa.me/${config.whatsapp.replace(/[^\d]/g, "")}`, "_blank")
                          }
                        }}
                      >
                        Chat with us
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-zgaphy-orange/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-zgaphy-orange/30 transition-colors">
                      <Mail className="text-zgaphy-orange h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">Email</h3>
                      <p className="text-gray-400">{config?.email || '-'}</p>
                      <Button
                        variant="link"
                        className="text-zgaphy-orange p-0 h-auto mt-1"
                        onClick={() => {
                          if (config?.email) {
                            window.location.href = `mailto:${config.email}`
                          }
                        }}
                      >
                        Send an email
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-zgaphy-orange/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-zgaphy-orange/30 transition-colors">
                      <Phone className="text-zgaphy-orange h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">Phone</h3>
                      <p className="text-gray-400">{config?.whatsapp || '-'}</p>
                      <Button
                        variant="link"
                        className="text-zgaphy-orange p-0 h-auto mt-1"
                        onClick={() => {
                          if (config?.whatsapp) {
                            window.location.href = `tel:${config.whatsapp}`
                          }
                        }}
                      >
                        Call us
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-zgaphy-dark-light to-black rounded-2xl p-8 shadow-lg shadow-zgaphy-orange/5"
              >
                <h2 className="text-2xl font-bold text-zgaphy-orange mb-6 flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  Find Us
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-zgaphy-orange/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-zgaphy-orange/30 transition-colors mt-1">
                      <MapPin className="text-zgaphy-orange h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">Location</h3>
                      <p className="text-gray-400">{config?.alamat || '-'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-zgaphy-orange/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-zgaphy-orange/30 transition-colors mt-1">
                      <Clock className="text-zgaphy-orange h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">Business Hours</h3>
                      <div className="text-gray-400">
                        {config?.jam_buka || '-'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-zgaphy-orange/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-zgaphy-orange/30 transition-colors mt-1">
                      <Instagram className="text-zgaphy-orange h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">Social Media</h3>
                      <div className="flex gap-4 mt-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-zgaphy-orange/10 hover:bg-zgaphy-orange/20"
                          onClick={() => {
                            if (config?.instagram) {
                              window.open(config.instagram, "_blank")
                            }
                          }}
                          disabled={!config?.instagram}
                        >
                          <Instagram className="h-5 w-5 text-zgaphy-orange" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-zgaphy-orange/10 hover:bg-zgaphy-orange/20"
                          onClick={() => {
                            if (config?.facebook) {
                              window.open(config.facebook, "_blank")
                            }
                          }}
                          disabled={!config?.facebook}
                        >
                          <Facebook className="h-5 w-5 text-zgaphy-orange" />
                        </Button>
                        {/* <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full bg-zgaphy-orange/10 hover:bg-zgaphy-orange/20"
                        >
                          <Tiktok className="h-5 w-5 text-zgaphy-orange" />
                        </Button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Need Immediate Assistance?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                For the fastest response, reach out to us directly via WhatsApp. Our team is ready to assist you with
                any questions about our artworks.
              </p>
              <Button
                className="bg-[#25D366] hover:bg-[#25D366]/80 text-white px-8 py-6 text-lg"
                onClick={() => {
                  const message = config?.pesan_wa || "Hello, I'm interested in ordering artwork from Zgaphy World. Can you help me?"
                  const encodedMessage = encodeURIComponent(message)
                  window.open(`https://wa.me/${config?.whatsapp ? config.whatsapp.replace(/[^\d]/g, "") : ''}?text=${encodedMessage}`, "_blank")
                }}
                disabled={!config?.whatsapp}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with Us on WhatsApp
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
