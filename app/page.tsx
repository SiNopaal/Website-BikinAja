"use client"

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Star,
  CheckCircle,
  Smartphone,
  Globe,
  Palette,
  Settings,
  MessageCircle,
  ArrowRight,
  Play,
  Moon,
  Sun,
  Menu,
  X,
  TrendingUp,
  Award,
  Zap,
  Shield,
  HeadphonesIcon,
  Crown,
  ExternalLink,
  Heart,
  MapPin,
  Clock,
  Mail,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { VisualPriceCalculator } from "@/components/visual-price-calculator"
import { ProgressIndicator } from "@/components/progress-indicator"
import { SwipeCarousel } from "@/components/swipe-carousel"
import { MobileOptimizations } from "@/components/mobile-optimizations"

export default function BikinAjaWebsite() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("website")
  const [estimatedPrice, setEstimatedPrice] = useState(2500000)
  const [liveVisitors, setLiveVisitors] = useState(23)
  const [recentActivity, setRecentActivity] = useState([
    "Budi dari Jakarta baru saja memesan website toko online",
    "Sari dari Bandung mengunduh template gratis",
  ])
  const [selectedLanguage, setSelectedLanguage] = useState("id")
  const [isOnline, setIsOnline] = useState(true)
  const [showNotification, setShowNotification] = useState(true)
  const [websiteUrl, setWebsiteUrl] = useState("")
  type SpeedTestResult =
    | { loading: true }
    | { score: number; loadTime: string; recommendations: string[]; url: string }
    | { error: true; message: string }
    | null

  const [speedTestResult, setSpeedTestResult] = useState<SpeedTestResult>(null)
  const [roiInputs, setRoiInputs] = useState({ currentRevenue: 0, expectedIncrease: 0 })
  const [selectedFAQ, setSelectedFAQ] = useState(null)
  const [bookingStep, setBookingStep] = useState(1)
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [portofolioFilter, setPortofolioFilter] = useState("All")
  const [showLiveChat, setShowLiveChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", message: "Halo! Ada yang bisa kami bantu? 😊", time: new Date() },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [bookingData, setBookingData] = useState({
    type: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    project: "",
  })
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Website Development",
    budget: "< Rp 5.000.000",
    message: "",
    newsletter: false,
  })
  const [showInstallPrompt, setShowInstallPrompt] = useState(true)
  const [templateLikes, setTemplateLikes] = useState({})

  // Detect mobile device
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors((prev) => prev + Math.floor(Math.random() * 3) - 1)

      // Simulate recent activity
      const activities = [
        "Budi dari Jakarta baru saja memesan website toko online",
        "Sari dari Bandung mengunduh template gratis",
        "Ahmad dari Surabaya booking konsultasi",
        "Dewi dari Medan menyelesaikan project tracking",
        "Rudi dari Yogya mendaftar newsletter",
      ]

      if (Math.random() > 0.7) {
        setRecentActivity((prev) => [activities[Math.floor(Math.random() * activities.length)], ...prev.slice(0, 4)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Reset features when switching service types
  useEffect(() => {
    setSelectedFeatures([])
    setEstimatedPrice(
      selectedService === "website"
        ? 2500000
        : selectedService === "android"
          ? 6000000
          : selectedService === "uiux"
            ? 2000000
            : 8000000,
    )
  }, [selectedService])

  // Language content
  const content = {
    id: {
      hero: {
        title: "Bikin Website & Aplikasi?",
        highlight: "BikinAja!",
        subtitle:
          "Solusi digital terpercaya untuk bisnis Anda. Website profesional dan aplikasi Android berkualitas tinggi dengan harga terjangkau.",
        cta1: "Konsultasi Gratis",
        cta2: "Lihat Portofolio",
      },
      nav: {
        home: "Home",
        services: "Layanan",
        portofolio: "Portofolio",
        testimonials: "Testimoni",
        contact: "Kontak",
        tools: "Tools",
        resources: "Resources",
      },
    },
    en: {
      hero: {
        title: "Need Website & App?",
        highlight: "Just Build It!",
        subtitle:
          "Trusted digital solutions for your business. Professional websites and high-quality Android applications at affordable prices.",
        cta1: "Free Consultation",
        cta2: "View Portofolio",
      },
      nav: {
        home: "Home",
        services: "Services",
        portofolio: "Portofolio",
        testimonials: "Testimonials",
        contact: "Contact",
        tools: "Tools",
        resources: "Resources",
      },
    },
  }

  const currentContent = content[selectedLanguage as keyof typeof content]

  const services = [
    {
      id: "website",
      icon: Globe,
      title: "Website Development",
      description: "Website profesional, responsif, dan SEO-friendly untuk bisnis Anda",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Admin Panel"],
      price: "Mulai dari Rp 2.500.000",
      popular: false,
    },
    {
      id: "android",
      icon: Smartphone,
      title: "Android App Development",
      description: "Aplikasi Android native dengan performa optimal dan UI yang menarik",
      features: ["Native Android", "Material Design", "Push Notification", "Offline Support"],
      price: "Mulai dari Rp 5.000.000",
      popular: true,
    },
    {
      id: "uiux",
      icon: Palette,
      title: "UI/UX Design",
      description: "Desain antarmuka yang user-friendly dan pengalaman pengguna yang optimal",
      features: ["User Research", "Wireframing", "Prototyping", "Design System"],
      price: "Mulai dari Rp 1.500.000",
      popular: false,
    },
    {
      id: "maintenance",
      icon: Settings,
      title: "Maintenance & Support",
      description: "Layanan pemeliharaan dan dukungan teknis berkelanjutan",
      features: ["24/7 Support", "Regular Updates", "Bug Fixes", "Performance Monitoring"],
      price: "Mulai dari Rp 500.000/bulan",
      popular: false,
    },
  ]

  const portofolio = [
    {
      id: 1,
      title: "Titik Visual Creative Studio",
      category: "Website",
      image:
        "https://sjc.microlink.io/hIe4rNsgQZqIP-dsQtWQcrOReaebCizX9yIDlvP_K7WhJx22CObOQoAALcD70V8XdP1aNE_F5BFuuw2ArNGA5A.jpeg",
      description:
        "Website digital creative studio dengan gradient design yang menarik, portofolio showcase, dan layanan kreatif lengkap",
      status: "Completed",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      roi: "+250% Brand Awareness",
      client: "Titik Visual Studio",
      url: "https://titikvisual.vercel.app",
    },
    {
      id: 2,
      title: "Laundry Kilat Premium Service",
      category: "Website",
      image:
        "https://sjc.microlink.io/kJP4gXj8tx4EEAA1O8Lwrk6r9PWbZ_S0Ju_MdQ4e1XhRt9fuNEAyPqZjtx-LNNJ0WhTY6nloz1PlTV61TtKDvg.jpeg",
      description:
        "Website layanan laundry premium dengan sistem booking online, tracking order, dan pembayaran digital terintegrasi",
      status: "Completed",
      tech: ["React", "Node.js", "Payment Gateway"],
      roi: "+300% Customer Acquisition",
      client: "Laundry Kilat Jakarta",
      url: "https://laundrykilat.vercel.app",
    },
    {
      id: 3,
      title: "Warung Bu Sari",
      category: "Website",
      image:
        "https://sjc.microlink.io/KUANJF0MfKMC7fjTusIbqJzbRM1dXzgkqLtAG7X5BU9QmAYOYmvXTlXjCAowAu3JSJPXSXj1heT1Jf9tufXD5A.jpeg",
      description:
        "Website warung makan tradisional dengan design warm dan inviting, dilengkapi menu online, sistem pemesanan, dan informasi lokasi",
      status: "Completed",
      tech: ["React", "Tailwind CSS", "Google Maps"],
      roi: "+400% Online Orders",
      client: "Warung Bu Sari Jakarta",
      url: "https://umkmwebsite.vercel.app",
    },
  ]

  const testimonials = [
    {
      name: "Budi Santoso",
      company: "PT. Maju Bersama",
      rating: 5,
      comment: "Pelayanan sangat memuaskan! Website kami jadi lebih profesional dan penjualan meningkat 200%.",
      avatar: "/budi1.jpeg?height=60&width=60",
      videoUrl: "/placeholder-video.mp4",
      hasVideo: true,
    },
    {
      name: "Sari Dewi",
      company: "Toko Online Sari",
      rating: 5,
      comment: "Tim BikinAja.id sangat responsif dan hasil kerjanya melebihi ekspektasi. Highly recommended!",
      avatar: "/sari.jpeg?height=60&width=60",
      hasVideo: false,
    },
    {
      name: "Ahmad Dhani",
      company: "Startup TechCorp",
      rating: 5,
      comment: "Aplikasi Android yang dibuat sangat smooth dan user-friendly. Support after-sales juga excellent!",
      avatar: "/ahmad.webp?height=60&width=60",
      videoUrl: "/placeholder-video.mp4",
      hasVideo: true,
    },
  ]

  const stats = [
    { label: "Proyek Selesai", value: "150+", icon: CheckCircle },
    { label: "Klien Puas", value: "98%", icon: Heart },
    { label: "Rating Rata-rata", value: "4.9/5", icon: Star },
    { label: "3 Developers", value: "3+", icon: Award },
  ]

  const faqData = [
    {
      question: "Berapa lama waktu pengerjaan website?",
      answer:
        "Waktu pengerjaan bervariasi tergantung kompleksitas. Website sederhana 5-7 hari, website kompleks 2-4 minggu. Kami akan memberikan timeline yang jelas setelah konsultasi.",
    },
    {
      question: "Apakah ada garansi untuk website yang dibuat?",
      answer:
        "Ya, kami memberikan garansi 6 bulan untuk bug fixing dan 1 tahun untuk maintenance. Support teknis tersedia 24/7 melalui WhatsApp dan email.",
    },
    {
      question: "Bisakah website diupdate sendiri tanpa coding?",
      answer:
        "Tentu! Kami menyediakan admin panel yang user-friendly sehingga Anda bisa update konten, gambar, dan produk tanpa perlu coding.",
    },
    {
      question: "Apakah website akan SEO-friendly?",
      answer:
        "Semua website yang kami buat sudah dioptimasi untuk SEO dengan struktur yang baik, loading speed cepat, dan mobile-responsive.",
    },
    {
      question: "Bagaimana sistem pembayaran?",
      answer:
        "Pembayaran bisa dilakukan bertahap: 50% di awal, 50% setelah selesai. Kami menerima transfer bank, e-wallet, dan cryptocurrency.",
    },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips Meningkatkan Kecepatan Website",
      excerpt: "Pelajari cara mengoptimalkan performa website Anda untuk pengalaman pengguna yang lebih baik",
      image: "/banner1.webp?height=25&width=50",
      category: "Web Development",
      readTime: "5 min",
      author: "IDwebhost",
      date: "2024-01-15",
      url: "https://idwebhost.com/blog/cara-mempercepat-website/",
    },
    {
      id: 2,
      title: "Tren UI/UX Design 2024",
      excerpt: "Eksplorasi tren desain terbaru yang akan mendominasi tahun 2024",
      image: "/banner2.webp?height=50&width=100",
      category: "Design",
      readTime: "7 min",
      author: "Growia Education",
      date: "2024-01-10",
      url: "https://www.growia.education/id/blog-posts/10-tren-ui-ux-teratas-di-tahun-2024",
    },
    {
      id: 3,
      title: "Mengapa Bisnis Perlu Aplikasi Mobile?",
      excerpt: "Manfaat aplikasi mobile untuk meningkatkan engagement dan penjualan bisnis",
      image: "/banner3.webp?height=200&width=300",
      category: "Mobile App",
      readTime: "6 min",
      author: "Redcomm Indonesia",
      date: "2024-01-05",
      url: "https://redcomm.co.id/knowledges/keuntungann-aplikasi-mobile",
    },
  ]

  // Speed Test Function
  const runSpeedTest = async () => {
    if (!websiteUrl) {
      alert("Masukkan URL website terlebih dahulu")
      return
    }

    // Basic URL validation
    try {
      new URL(websiteUrl)
    } catch {
      alert("URL tidak valid. Pastikan menggunakan format: https://example.com")
      return
    }

    setSpeedTestResult({ loading: true })

    // Simulate realistic speed test
    const startTime = Date.now()

    try {
      // Simulate network request
      await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(websiteUrl)}`)
      const loadTime = ((Date.now() - startTime) / 1000).toFixed(2)
      const loadTimeNum = parseFloat(loadTime)

      // Generate realistic score based on load time
      const score = Math.max(20, Math.min(100, 100 - loadTimeNum * 10))

      setSpeedTestResult({
        score: Math.floor(score),
        loadTime,
        recommendations: [
          parseFloat(loadTime) > 3 ? "Optimasi gambar untuk web" : "Pertahankan ukuran gambar yang optimal",
          score < 80 ? "Minifikasi CSS dan JavaScript" : "Kompresi file sudah baik",
          score < 60 ? "Gunakan CDN untuk loading lebih cepat" : "Pertimbangkan upgrade hosting",
          "Enable browser caching untuk performa lebih baik",
        ],
        url: websiteUrl,
      })
    } catch (error) {
      setSpeedTestResult({
        error: true,
        message: "Tidak dapat mengakses website. Pastikan URL benar dan website dapat diakses.",
      })
    }
  }

  // ROI Calculator
  const calculateROI = () => {
    if (!roiInputs.currentRevenue || !roiInputs.expectedIncrease) {
      return { monthlyIncrease: 0, yearlyIncrease: 0, roi: 0, breakEven: 0 }
    }

    const websiteCost = 3000000 // Average website cost
    const monthlyIncrease = (roiInputs.currentRevenue * roiInputs.expectedIncrease) / 100
    const yearlyIncrease = monthlyIncrease * 12
    const roi = ((yearlyIncrease - websiteCost) / websiteCost) * 100
    const breakEven = Math.ceil(websiteCost / monthlyIncrease)

    return {
      monthlyIncrease,
      yearlyIncrease,
      roi: roi.toFixed(1),
      breakEven: breakEven > 0 ? breakEven : 0,
    }
  }

  const websiteFeatures = [
    { name: "Landing Page", price: 500000, description: "Halaman utama dengan design menarik" },
    { name: "E-Commerce", price: 2000000, description: "Toko online lengkap dengan payment gateway" },
    { name: "Blog/CMS", price: 800000, description: "Sistem manajemen konten untuk artikel" },
    { name: "Admin Panel", price: 1000000, description: "Dashboard admin untuk mengelola website" },
    { name: "Payment Gateway", price: 1500000, description: "Integrasi pembayaran online" },
    { name: "Multi-language", price: 700000, description: "Dukungan multiple bahasa" },
  ]

  // Contact Form Submit
  const handleContactSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      alert("Lengkapi semua field yang diperlukan")
      return
    }

    // Generate WhatsApp message
    const message = `Halo BikinAja.id, saya tertarik dengan layanan Anda:

Nama: ${contactForm.name}
Email: ${contactForm.email}
Phone: ${contactForm.phone}
Layanan: ${contactForm.service}
Budget: ${contactForm.budget}
Pesan: ${contactForm.message}

Mohon informasi lebih lanjut. Terima kasih!`

    const whatsappUrl = `https://wa.me/6281227529614?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    alert("Pesan berhasil dikirim! Anda akan dialihkan ke WhatsApp.")
    setContactForm({
      name: "",
      email: "",
      phone: "",
      service: "Website Development",
      budget: "< Rp 5.000.000",
      message: "",
      newsletter: false,
    })
  }

  return (
    <MobileOptimizations>
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <div className="bg-background text-foreground">
          {/* Progress Indicator */}
          <ProgressIndicator />

          {/* PWA Install Notification */}
          {showNotification && (
            <div className="bg-primary text-primary-foreground p-2 text-center text-sm">
              <div className="flex items-center justify-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span>Install BikinAja.id sebagai app di device Anda!</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setShowInstallPrompt(false)}
                >
                  Install
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotification(false)}
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Header */}
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">BA</span>
                  </div>
                  <span className="text-xl font-bold">BikinAja.id</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                  <Link href="#home" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link href="#services" className="hover:text-primary transition-colors">
                    Layanan
                  </Link>
                  <Link href="#portofolio" className="hover:text-primary transition-colors">
                    Portofolio
                  </Link>
                  <Link href="#contact" className="hover:text-primary transition-colors">
                    Kontak
                  </Link>
                  <Link href="#team" className="hover:text-primary transition-colors">
                    Tim
                  </Link>
                </nav>

                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="hidden md:flex">
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                  <Button
                    className="hidden md:flex"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Konsultasi Gratis
                  </Button>

                  {/* Mobile Menu Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Mobile Navigation */}
              {mobileMenuOpen && (
                <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
                  <div className="flex flex-col space-y-4">
                    <Link
                      href="#home"
                      className="hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="#services"
                      className="hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Layanan
                    </Link>
                    <Link
                      href="#portofolio"
                      className="hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Portofolio
                    </Link>
                    <Link
                      href="#contact"
                      className="hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Kontak
                    </Link>
                    <Link
                      href="#team"
                      className="hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Tim
                    </Link>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </Button>
                      <Button
                        onClick={() => {
                          setMobileMenuOpen(false)
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Konsultasi Gratis
                      </Button>
                    </div>
                  </div>
                </nav>
              )}
            </div>
          </header>

          {/* Hero Section */}
          <section
            id="home"
            className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden"
          >
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float-delayed"></div>

            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <Badge variant="secondary" className="w-fit animate-bounce">
                      🚀 Slot Terbatas - Diskon 30% untuk 10 klien pertama!
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      Bikin Website & Aplikasi?{" "}
                      <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        BikinAja!
                      </span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      Solusi digital terpercaya untuk bisnis Anda. Website profesional dan aplikasi Android berkualitas
                      tinggi dengan harga terjangkau.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="text-lg px-8 group"
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <MessageCircle className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                      Konsultasi Gratis
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 bg-transparent group"
                      onClick={() => document.getElementById("portofolio")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <Play className="w-5 h-5 mr-2 group-hover:animate-spin" />
                      Lihat Portofolio
                    </Button>
                  </div>

                  {/* Enhanced Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                    {stats.map((stat, index) => {
                      const IconComponent = stat.icon
                      return (
                        <div key={index} className="text-center group hover:scale-105 transition-transform">
                          <div className="flex items-center justify-center mb-2">
                            <IconComponent className="w-6 h-6 text-primary group-hover:animate-pulse" />
                          </div>
                          <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center space-x-6 pt-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      <span className="text-sm">SSL Secured</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm">Certified Partner</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HeadphonesIcon className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">24/7 Support</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative z-10">
                    <Image
                      src="/placeholder.svg?height=500&width=600"
                      alt="BikinAja.id Hero"
                      width={600}
                      height={500}
                      className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                    {/* Floating UI Elements */}
                    <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg animate-float">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Project Online</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg animate-float-delayed">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">+200% ROI</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Layanan Kami</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Solusi digital lengkap untuk mengembangkan bisnis Anda dengan teknologi terdepan
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service) => {
                  const IconComponent = service.icon
                  return (
                    <Card
                      key={service.id}
                      className={`relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                        service.popular ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      {service.popular && (
                        <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
                          <Crown className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription className="text-center">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4 border-t">
                          <div className="text-lg font-semibold text-primary mb-3">{service.price}</div>
                          <Button className="w-full">
                            Pelajari Lebih Lanjut
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Price Calculator Section */}
          <section id="calculator" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Kalkulator Harga Interaktif</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Dapatkan estimasi harga yang akurat untuk proyek Anda dengan kalkulator visual kami
                </p>
              </div>

              <Card className="max-w-6xl mx-auto">
                <CardContent className="p-0">
                  <VisualPriceCalculator />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Portofolio Section with Swipe Carousel */}
          <section id="portofolio" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Portofolio Terbaru</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Lihat hasil karya terbaik kami yang telah membantu klien mencapai kesuksesan
                </p>
              </div>

              <SwipeCarousel
                items={portofolio}
                autoPlay={true}
                autoPlayInterval={6000}
                renderItem={(project, index) => (
                  <Card className="overflow-hidden group">
                    <div className="relative">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Badge variant="secondary" className="mb-2">
                          {project.category}
                        </Badge>
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                          <p className="text-muted-foreground text-sm">{project.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, techIndex: Key | null | undefined) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm">
                            <span className="text-muted-foreground">ROI: </span>
                            <span className="font-semibold text-green-600">{project.roi}</span>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={project.url} target="_blank">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Lihat Live
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                className="max-w-4xl mx-auto"
              />
            </div>
          </section>

          {/* Testimonials Section with Swipe Carousel */}
          <section id="testimonials" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Testimoni Klien</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Dengarkan langsung dari klien yang telah merasakan manfaat layanan kami
                </p>
              </div>

              <SwipeCarousel
                items={testimonials}
                autoPlay={true}
                autoPlayInterval={8000}
                renderItem={(testimonial, index) => (
                  <Card className="max-w-2xl mx-auto">
                    <CardContent className="p-8 text-center">
                      <div className="space-y-6">
                        <div className="flex justify-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                          ))}
                        </div>

                        <blockquote className="text-lg italic text-muted-foreground">
                          "{testimonial.comment}"
                        </blockquote>

                        <div className="flex items-center justify-center space-x-4">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                          <div className="text-left">
                            <div className="font-semibold">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                          </div>
                        </div>

                        {testimonial.hasVideo && (
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Tonton Video Testimoni
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
                className="max-w-4xl mx-auto"
              />
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <Badge variant="secondary" className="mb-4">
                  <Award className="w-4 h-4 mr-2" />
                  Tim Kami
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Bertemu dengan Tim BikinAja.id</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Tim profesional yang berpengalaman dan berdedikasi untuk memberikan solusi digital terbaik
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {/* Team Members */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {/* Naufal */}
                  <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 group">
                    <div className="relative mb-6">
                      <Image
                        src="/images/naufal-profile.jpg"
                        alt="Naufal Maulana Izzuddin"
                        width={120}
                        height={120}
                        className="w-[120px] h-[120px] aspect-square rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <br />
                      <Badge variant="outline" className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <Crown className="w-3 h-3 mr-1" />
                        Founder
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">Naufal Maulana Izzuddin</h3>
                        <p className="text-sm text-muted-foreground mb-3">Telkom University Purwokerto</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Palette className="w-4 h-4 text-primary" />
                          <span>UI/UX Design</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Smartphone className="w-4 h-4 text-primary" />
                          <span>Android Development</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Globe className="w-4 h-4 text-primary" />
                          <span>Frontend Development</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Abdul Roni */}
                  <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 group">
                    <div className="relative mb-6">
                      <Image
                        src="/images/abdul-roni-profile.jpg"
                        alt="Abdul Roni"
                        width={120}
                        height={120}
                        className="w-[120px] h-[120px] aspect-square rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <br />
                      <Badge variant="outline" className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <Settings className="w-3 h-3 mr-1" />
                        Support Lead
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">Abdul Roni</h3>
                        <p className="text-sm text-muted-foreground mb-3">Telkom University Purwokerto</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Settings className="w-4 h-4 text-primary" />
                          <span>Maintenance & Support</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Globe className="w-4 h-4 text-primary" />
                          <span>Web Development</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Globe className="w-4 h-4 text-primary" />
                          <span>Frontend Development</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Muhammad Fariz */}
                  <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 group">
                    <div className="relative mb-6">
                      <Image
                        src="/images/fariz-profile.jpg"
                        alt="Muhammad Fariz Nur Hidayat"
                        width={120}
                        height={120}
                        className="w-[120px] h-[120px] aspect-square rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <br />
                      <Badge variant="outline" className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <Zap className="w-3 h-3 mr-1" />
                        Fullstack Dev
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">Muhammad Fariz Nur Hidayat</h3>
                        <p className="text-sm text-muted-foreground mb-3">Telkom University Purwokerto</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Globe className="w-4 h-4 text-primary" />
                          <span>Web Development</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Smartphone className="w-4 h-4 text-primary" />
                          <span>Android Development</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Zap className="w-4 h-4 text-primary" />
                          <span>Fullstack Development</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="text-center p-4 hover:shadow-lg transition-shadow">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-xl font-bold text-primary mb-1">50+</div>
                    <div className="text-xs text-muted-foreground">Proyek Selesai</div>
                  </Card>

                  <Card className="text-center p-4 hover:shadow-lg transition-shadow">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-xl font-bold text-primary mb-1">4.9/5</div>
                    <div className="text-xs text-muted-foreground">Rating Klien</div>
                  </Card>

                  <Card className="text-center p-4 hover:shadow-lg transition-shadow">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-xl font-bold text-primary mb-1">3+</div>
                    <div className="text-xs text-muted-foreground">Tahun Pengalaman</div>
                  </Card>

                  <Card className="text-center p-4 hover:shadow-lg transition-shadow">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <HeadphonesIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-xl font-bold text-primary mb-1">24/7</div>
                    <div className="text-xs text-muted-foreground">Support</div>
                  </Card>
                </div>

                {/* Vision & Mission */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">Visi Kami</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Menjadi partner digital terpercaya yang membantu bisnis berkembang melalui solusi teknologi
                      inovatif dan berkualitas tinggi.
                    </p>
                  </Card>

                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                        <Heart className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">Misi Kami</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Memberikan layanan pengembangan digital yang profesional, terjangkau, dan sesuai kebutuhan klien
                      dengan dukungan penuh dari konsultasi hingga maintenance.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Hubungi Kami</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Siap memulai proyek Anda? Mari diskusikan kebutuhan digital bisnis Anda
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Konsultasi Gratis</CardTitle>
                    <CardDescription>Isi form di bawah ini dan kami akan menghubungi Anda dalam 24 jam</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Nama Lengkap *</label>
                          <Input
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Masukkan nama lengkap"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Email *</label>
                          <Input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="nama@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">No. WhatsApp *</label>
                          <Input
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            placeholder="08123456789"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Layanan</label>
                          <select
                            className="w-full p-2 border rounded-md"
                            value={contactForm.service}
                            onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                          >
                            <option>Website Development</option>
                            <option>Mobile App Development</option>
                            <option>UI/UX Design</option>
                            <option>Maintenance & Support</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Budget</label>
                        <select
                          className="w-full p-2 border rounded-md"
                          value={contactForm.budget}
                          onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                        >
                          <option>{"< Rp 5.000.000"}</option>
                          <option>Rp 5.000.000 - Rp 10.000.000</option>
                          <option>Rp 10.000.000 - Rp 25.000.000</option>
                          <option>{"> Rp 25.000.000"}</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Deskripsi Proyek</label>
                        <textarea
                          className="w-full p-2 border rounded-md h-24 resize-none"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Ceritakan tentang proyek yang ingin Anda buat..."
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Kirim via WhatsApp
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <div className="space-y-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-6">Informasi Kontak</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <MessageCircle className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium">WhatsApp</div>
                            <div className="text-sm text-muted-foreground">+62 812-2752-9614</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div className="text-sm text-muted-foreground">hello@bikinaja.id</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium">Lokasi</div>
                            <div className="text-sm text-muted-foreground">Jakarta, Indonesia</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium">Jam Operasional</div>
                            <div className="text-sm text-muted-foreground">Senin - Jumat: 09:00 - 18:00</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Mengapa Memilih Kami?</h3>
                      <div className="space-y-3">
                        {[
                          { icon: Zap, text: "Respon cepat dalam 24 jam" },
                          { icon: Shield, text: "Garansi 6 bulan untuk semua proyek" },
                          { icon: Award, text: "Tim berpengalaman 3+ tahun" },
                          { icon: HeadphonesIcon, text: "Support 24/7 via WhatsApp" },
                        ].map((item, index) => {
                          const IconComponent = item.icon
                          return (
                            <div key={index} className="flex items-center space-x-3">
                              <IconComponent className="w-5 h-5 text-primary" />
                              <span className="text-sm">{item.text}</span>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-muted/50 py-12 border-t">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">BA</span>
                    </div>
                    <span className="text-xl font-bold">BikinAja.id</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Solusi digital terpercaya untuk mengembangkan bisnis Anda dengan teknologi terdepan.
                  </p>
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Layanan</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>Website Development</div>
                    <div>Mobile App Development</div>
                    <div>UI/UX Design</div>
                    <div>Maintenance & Support</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Perusahaan</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>Tentang Kami</div>
                    <div>Portofolio</div>
                    <div>Tim</div>
                    <div>Karir</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Kontak</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>+62 812-2752-9614</div>
                    <div>hello@bikinaja.id</div>
                    <div>Jakarta, Indonesia</div>
                  </div>
                </div>
              </div>

              <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; 2024 BikinAja.id. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </MobileOptimizations>
  )
}
