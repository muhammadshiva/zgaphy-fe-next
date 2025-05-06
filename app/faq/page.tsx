"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getFAQ, FAQ } from "@/lib/api"

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    getFAQ()
      .then((data) => {
        setFaqs(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load FAQ data.")
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
            <h1 className="text-3xl md:text-4xl font-bold text-zgaphy-orange mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-300">
              Find answers to common questions about our artworks, ordering process, shipping, and more. If you can't
              find what you're looking for, feel free to contact us.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            {loading ? (
              <div className="text-center py-10">Loading...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-800">
                    <AccordionTrigger className="text-white hover:text-zgaphy-orange transition-colors text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              If you couldn't find the answer to your question, please don't hesitate to reach out to us directly. We're
              here to help!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-zgaphy-orange hover:bg-zgaphy-orange/80 text-white">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                variant="outline"
                className="border-zgaphy-orange text-white hover:bg-zgaphy-orange hover:text-white"
                onClick={() => {
                  const message = "Hello, I have a question about Zgaphy World artworks."
                  const encodedMessage = encodeURIComponent(message)
                  window.open(`https://wa.me/+1234567890?text=${encodedMessage}`, "_blank")
                }}
              >
                WhatsApp Support
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
