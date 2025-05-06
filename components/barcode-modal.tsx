"use client"

import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { formatDate } from "@/lib/utils"

interface CollectorType {
  id: string
  name: string
  city: string
  city_name: string
  barcode: string
  kode_transaksi: string
  created_at: string
}

interface BarcodeModalProps {
  collector: CollectorType | null
  isOpen: boolean
  onClose: () => void
}

export default function BarcodeModal({ collector, isOpen, onClose }: BarcodeModalProps) {
  if (!collector) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative bg-zgaphy-dark-light rounded-xl overflow-hidden max-w-md w-full"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white hover:text-zgaphy-orange z-10"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="p-6">
              <h3 className="text-xl font-bold text-zgaphy-orange mb-4">Collector Barcode Details</h3>

              <div className="flex flex-col items-center mb-6">
                <div className="w-full h-48 relative mb-4 bg-white p-4 rounded-lg">
                  {/* This would be a real barcode image in production */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={collector.barcode}
                      alt="Barcode"
                      width={200}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                </div>
                <p className="text-lg font-mono text-white">{collector.kode_transaksi}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-400">Name:</div>
                  <div className="text-white font-medium">{collector.name}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-400">City:</div>
                  <div className="text-white font-medium">{collector.city_name}</div>
                </div>

                {/* <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-400">Collector ID:</div>
                  <div className="text-white font-medium">{collector.id}</div>
                </div> */}

                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-400">Registration Date:</div>
                  <div className="text-white font-medium">{formatDate(collector.created_at)}</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  This barcode serves as proof of ownership for Zgaphy World artworks. Each collector has a unique
                  barcode that can be verified for authenticity.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
