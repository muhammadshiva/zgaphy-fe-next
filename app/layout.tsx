import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { getKonfigurasi } from "@/lib/api"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  try {
    const config = await getKonfigurasi()
    return {
      title: config.nama_web + " | " + config.slogan,
      description: config.deskripsi_web,
      keywords: config.keyword,
      icons: {
        icon: config.favico,
      },
      generator: 'v0.dev'
    }
  } catch (error) {
    return {
      title: "Zgaphy World | Unique Artwork Collection",
      description: "Discover and collect unique digital artwork from Zgaphy World",
      generator: 'v0.dev'
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
