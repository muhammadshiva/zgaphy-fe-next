"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode } from "lucide-react"
import BarcodeModal from "@/components/barcode-modal"
import { Collector, getCollectors } from "@/lib/api"
import { formatDate } from "@/lib/utils"

interface GroupedArtworks {
  [key: string]: {
    id: string;
    name: string;
    description: string;
    artworks: {
      id: number;
      title: string;
      image: string;
      collectors: {
        id: number;
        name: string;
        city_id: number;
        city_name: string;
        barcode: string;
        kode_transaksi: string;
        created_at: string;
      }[];
    }[];
  };
}

export default function CollectorPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("")
  const [selectedCollector, setSelectedCollector] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [collectors, setCollectors] = useState<Collector[]>([])
  const [groupedArtworks, setGroupedArtworks] = useState<GroupedArtworks>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCollectors = async () => {
      try {
        const data = await getCollectors()
        setCollectors(data)
        
        // Group artworks by collector category
        const grouped = data.reduce<GroupedArtworks>((acc, collector) => {
          collector.produk.forEach((product) => {
            const categoryKey = collector.name.toLowerCase()
            if (!acc[categoryKey]) {
              acc[categoryKey] = {
                id: categoryKey,
                name: collector.name,
                description: `Collection of artworks owned by ${collector.name}`,
                artworks: []
              }
            }

            // Check if artwork already exists
            const existingArtwork = acc[categoryKey].artworks.find(a => a.id === product.id)
            if (!existingArtwork) {
              acc[categoryKey].artworks.push({
                id: product.id,
                title: product.nama,
                image: product.gambar || "/placeholder.svg",
                collectors: product.transaksi.map(t => ({
                  id: t.id,
                  name: t.nama_cust,
                  city_id: t.city_id,
                  city_name: t.kota.name,
                  barcode: t.barcode,
                  kode_transaksi: t.kode_transaksi,
                  created_at: t.created_at
                }))
              })
            }
          })
          return acc
        }, {})

        setGroupedArtworks(grouped)
        setActiveCategory(Object.keys(grouped)[0] || "")
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching collectors:", error)
        setIsLoading(false)
      }
    }

    fetchCollectors()
  }, [])

  const handleArtworkClick = (artworkId: number) => {
    setSelectedArtwork(artworkId === selectedArtwork ? null : artworkId)
  }

  const handleCollectorClick = (collector: any) => {
    setSelectedCollector(collector)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-zgaphy-orange">Loading...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

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
            <h1 className="text-3xl md:text-4xl font-bold text-zgaphy-orange mb-4">The Collector Community</h1>
            <p className="text-gray-300">
              Explore our community of art enthusiasts who have collected Zgaphy World artworks. Browse by collection
              category and discover who owns these unique pieces.
            </p>
          </motion.div>

          <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 bg-zgaphy-dark-light mb-8">
              {Object.values(groupedArtworks).map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-zgaphy-orange data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.values(groupedArtworks).map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
                  <p className="text-gray-300">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {category.artworks.map((artwork) => (
                    <motion.div
                      key={artwork.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`bg-zgaphy-dark-light rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                        selectedArtwork === artwork.id ? "ring-2 ring-zgaphy-orange" : ""
                      }`}
                      onClick={() => handleArtworkClick(artwork.id)}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={artwork.image}
                          alt={artwork.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-white">{artwork.title}</h3>
                        <p className="text-zgaphy-orange text-sm mt-1">
                          {selectedArtwork === artwork.id ? "Click to close" : "Click to view collectors"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedArtwork && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-12 bg-zgaphy-dark-light rounded-xl p-6"
                  >
                    <h3 className="text-xl font-bold text-zgaphy-orange mb-6">
                      Collectors of {category.artworks.find((a) => a.id === selectedArtwork)?.title}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.artworks
                        .find((a) => a.id === selectedArtwork)
                        ?.collectors.map((collector) => (
                          <div
                            key={collector.id}
                            className="bg-black/30 p-4 rounded-lg flex items-center gap-4 hover:bg-black/50 transition-colors cursor-pointer"
                            onClick={() => handleCollectorClick(collector)}
                          >
                            <div className="w-12 h-12 bg-zgaphy-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                              <QrCode className="text-zgaphy-orange h-6 w-6" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">{collector.name}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-sm">{collector.city_name}</span>
                                <span className="text-xs px-2 py-0.5 bg-zgaphy-orange/20 text-zgaphy-orange rounded-full">
                                  {collector.kode_transaksi}
                                </span>
                              </div>
                              <div className="text-gray-400 text-xs mt-1">
                                {formatDate(collector.created_at)}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <BarcodeModal collector={selectedCollector} isOpen={isModalOpen} onClose={closeModal} />

      <Footer />
    </div>
  )
}
