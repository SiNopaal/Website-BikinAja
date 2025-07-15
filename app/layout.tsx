import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL("https://bikinaja.my.id"),
  title: {
    default: "BikinAja: Jasa Pembuatan Website Jawa Tengah | Murah & Profesional",
    template: "%s | BikinAja Indonesia",
  },
  description:
    "BikinAja menyediakan jasa pembuatan website profesional di seluruh kabupaten Jawa Tengah. Cocok untuk UMKM, bisnis lokal, toko online, dan instansi. Website cepat, modern, dan SEO-friendly.",
  keywords: [
    "jasa pembuatan website jawa tengah",
    "jasa bikin website murah",
    "jasa pembuatan website profesional",
    "jasa pembuatan website UMKM",
    "website bisnis jawa tengah",
    "web developer jawa tengah",
    "jasa pembuatan website cepat",
    "jasa website toko online",
    "jasa website instansi",
    "jasa pembuatan website responsive",
    "bikin website semarang",
    "bikin website purwokerto",
    "bikin website solo",
    "bikin website magelang",
    "bikin website cilacap",
    "bikin website kebumen",
    "bikin website pati",
    "bikin website kudus",
    "bikin website pekalongan",
    "bikin website banyumas",
  ],
  authors: [{ name: "BikinAja Indonesia" }],
  creator: "BikinAja Indonesia",
  publisher: "BikinAja Indonesia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bikinaja.my.id",
    siteName: "BikinAja Indonesia",
    title: "Jasa Pembuatan Website Jawa Tengah - BikinAja",
    description:
      "Layanan pembuatan website terbaik untuk seluruh kabupaten di Jawa Tengah. Website cepat, modern, dan sesuai kebutuhan bisnis Anda.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Pembuatan Website Jawa Tengah - BikinAja",
    description:
      "Jasa bikin website profesional dan terpercaya di Jawa Tengah. Layanan untuk UMKM, toko online, dan instansi pemerintah.",
    creator: "@bikinajaweb",
  },
  verification: {
    google: "Ip4mnbon0ThRtjGszyakG5rwsvj-y7WITGQc3Suth8w",
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
