"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getKonfigurasi, Konfigurasi } from "@/lib/api"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-zgaphy-orange">
              <Image 
                src={config?.favico || "/placeholder.svg"} 
                alt={`${config?.nama_web || 'Zgaphy World'} Logo`} 
                fill 
                className="object-cover" 
              />
            </div>
            <span className="font-bold text-xl text-white">
              <span className="text-zgaphy-orange">{config?.nama_web?.split(' ')[0] || 'ZGAPHY'}</span>{' '}
              {config?.nama_web?.split(' ').slice(1).join(' ') || 'WORLD'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white hover:text-zgaphy-orange transition-colors">
              Home
            </Link>
            <Link href="/artworks" className="text-white hover:text-zgaphy-orange transition-colors">
              List Artworks
            </Link>
            <Link href="/collector" className="text-white hover:text-zgaphy-orange transition-colors">
              The Collector
            </Link>
            <Link href="/contact" className="text-white hover:text-zgaphy-orange transition-colors">
              Contact
            </Link>
            <Link href="/faq" className="text-white hover:text-zgaphy-orange transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                href="/"
                className="text-white hover:text-zgaphy-orange py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/artworks"
                className="text-white hover:text-zgaphy-orange py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                List Artworks
              </Link>
              <Link
                href="/collector"
                className="text-white hover:text-zgaphy-orange py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                The Collector
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-zgaphy-orange py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="text-white hover:text-zgaphy-orange py-2 border-b border-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
