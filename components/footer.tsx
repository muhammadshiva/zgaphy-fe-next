"use client"

import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"
import { useEffect, useState } from "react"
import { getKonfigurasi, Konfigurasi } from "@/lib/api"

export default function Footer() {
  const [config, setConfig] = useState<Konfigurasi | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getKonfigurasi().then((data) => {
      setConfig(data)
      setLoading(false)
    })
  }, [])
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-zgaphy-orange">{config?.nama_web || 'Zgaphy World'}</h3>
            <p className="text-gray-400">
              {config?.deskripsi_web || 'Where collectors gather to discover unique digital artwork that brings color to your life.'}
            </p>
            <div className="flex space-x-4">
              {config?.facebook && (
                <Link href={config.facebook} target="_blank" className="text-gray-400 hover:text-zgaphy-orange transition-colors">
                  <Facebook size={20} />
                </Link>
              )}
              {config?.instagram && (
                <Link href={config.instagram} target="_blank" className="text-gray-400 hover:text-zgaphy-orange transition-colors">
                  <Instagram size={20} />
                </Link>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-zgaphy-orange">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-zgaphy-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/artworks" className="text-gray-400 hover:text-zgaphy-orange transition-colors">
                  List Artworks
                </Link>
              </li>
              <li>
                <Link href="/collector" className="text-gray-400 hover:text-zgaphy-orange transition-colors">
                  The Collector
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-zgaphy-orange transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* <div>
            <h4 className="text-lg font-semibold mb-4 text-zgaphy-orange">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-zgaphy-orange transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-zgaphy-orange transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-zgaphy-orange transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-zgaphy-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div> */}

          {/* <div>
            <h4 className="text-lg font-semibold mb-4 text-zgaphy-orange">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get updates on new artworks and exclusive offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-900 text-white px-4 py-2 rounded-l-md focus:outline-none w-full"
              />
              <button className="bg-zgaphy-orange hover:bg-zgaphy-orange/80 text-white px-4 py-2 rounded-r-md transition-colors">
                Join
              </button>
            </div>
          </div> */}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Zgaphy World. All rights reserved.</p>
          <p className="text-xs mt-2">Powered by ZgaphyWorld</p>
        </div>
      </div>
    </footer>
  )
}
