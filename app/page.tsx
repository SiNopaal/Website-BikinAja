"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Calculator,
  Gauge,
  Bell,
  Sparkles,
  Crown,
  ExternalLink,
  Heart,
  Wifi,
  WifiOff,
  Calendar,
  MapPin,
  Clock,
  Mail,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DomainGenerator, WebsiteAuditTool } from "@/components/functional-features"


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
  const [speedTestResult, setSpeedTestResult] = useState(null)
  const [roiInputs, setRoiInputs] = useState({ currentRevenue: 0, expectedIncrease: 0 })
  const [selectedFAQ, setSelectedFAQ] = useState(null)
  const [bookingStep, setBookingStep] = useState(1)
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [portfolioFilter, setPortfolioFilter] = useState("All")
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
        cta2: "Lihat Portfolio",
      },
      nav: {
        home: "Home",
        services: "Layanan",
        portfolio: "Portfolio",
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
        cta2: "View Portfolio",
      },
      nav: {
        home: "Home",
        services: "Services",
        portfolio: "Portfolio",
        testimonials: "Testimonials",
        contact: "Contact",
        tools: "Tools",
        resources: "Resources",
      },
    },
  }

  const currentContent = content[selectedLanguage]

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

  const portfolio = [
    {
      id: 1,
      title: "Titik Visual Creative Studio",
      category: "Website",
      image:
        "https://sjc.microlink.io/hIe4rNsgQZqIP-dsQtWQcrOReaebCizX9yIDlvP_K7WhJx22CObOQoAALcD70V8XdP1aNE_F5BFuuw2ArNGA5A.jpeg",
      description:
        "Website digital creative studio dengan gradient design yang menarik, portfolio showcase, dan layanan kreatif lengkap",
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
      url:"https://idwebhost.com/blog/cara-mempercepat-website/"
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
      url:"https://www.growia.education/id/blog-posts/10-tren-ui-ux-teratas-di-tahun-2024"
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
      url:"https://redcomm.co.id/knowledges/keuntungann-aplikasi-mobile"
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

      // Generate realistic score based on load time
      const score = Math.max(20, Math.min(100, 100 - loadTime * 10))

      setSpeedTestResult({
        score: Math.floor(score),
        loadTime,
        recommendations: [
          loadTime > 3 ? "Optimasi gambar untuk web" : "Pertahankan ukuran gambar yang optimal",
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

  // Feature Selection with Price Calculation
  const toggleFeature = (item) => {
    const itemName = item.name
    const newFeatures = selectedFeatures.includes(itemName)
      ? selectedFeatures.filter((f) => f !== itemName)
      : [...selectedFeatures, itemName]

    setSelectedFeatures(newFeatures)

    // Calculate new price based on selected service type
    let totalPrice = 0

    if (selectedService === "website") {
      // Add additional website features cost
      const websiteAdditionalFeatures = [
        { name: "SSL Certificate", price: 200000 },
        { name: "Domain .com (1 tahun)", price: 150000 },
        { name: "Hosting Premium", price: 500000 },
        { name: "SEO Optimization", price: 800000 },
        { name: "Google Analytics", price: 300000 },
        { name: "Live Chat Widget", price: 400000 },
      ]

      const additionalCost = newFeatures.reduce((total, featureName) => {
        const featureData = websiteAdditionalFeatures.find((f) => f.name === featureName)
        return total + (featureData ? featureData.price : 0)
      }, 0)

      totalPrice += additionalCost
    } else if (selectedService === "android") {
      // Android app calculation
      const androidAppTypes = [
        { name: "E-Commerce App", price: 8000000 },
        { name: "Food Delivery App", price: 12000000 },
        { name: "Social Media App", price: 15000000 },
        { name: "Business App", price: 6000000 },
        { name: "Educational App", price: 7000000 },
        { name: "Healthcare App", price: 10000000 },
      ]

      const androidAdditionalFeatures = [
        { name: "Push Notifications", price: 1000000 },
        { name: "Offline Support", price: 1500000 },
        { name: "Payment Gateway", price: 2000000 },
        { name: "GPS & Maps", price: 1200000 },
        { name: "Camera Integration", price: 800000 },
        { name: "Social Login", price: 600000 },
        { name: "Analytics Dashboard", price: 1500000 },
        { name: "Multi-language", price: 1000000 },
      ]

      // Find selected app type
      const selectedAppType = androidAppTypes.find((app) => newFeatures.includes(app.name))
      if (selectedAppType) {
        totalPrice = selectedAppType.price
      }

      // Add additional android features cost
      const additionalCost = newFeatures.reduce((total, featureName) => {
        const featureData = androidAdditionalFeatures.find((f) => f.name === featureName)
        return total + (featureData ? featureData.price : 0)
      }, 0)

      totalPrice += additionalCost
    } else if (selectedService === "uiux") {
      // UI/UX Design calculation
      const uiuxPackages = [
        { name: "UI Design Only", price: 2000000 },
        { name: "UX Research + UI", price: 3500000 },
        { name: "Complete UX/UI", price: 5000000 },
        { name: "Design System", price: 4000000 },
        { name: "Mobile App Design", price: 3000000 },
        { name: "Web App Design", price: 3500000 },
      ]

      const uiuxAddons = [
        { name: "User Testing", price: 1500000 },
        { name: "A/B Testing Design", price: 1000000 },
        { name: "Animation & Micro-interactions", price: 2000000 },
        { name: "Responsive Design", price: 800000 },
        { name: "Dark Mode Design", price: 600000 },
        { name: "Accessibility Audit", price: 1200000 },
      ]

      // Find selected design package
      const selectedPackage = uiuxPackages.find((pkg) => newFeatures.includes(pkg.name))
      if (selectedPackage) {
        totalPrice = selectedPackage.price
      }

      // Add additional UI/UX addons cost
      const additionalCost = newFeatures.reduce((total, featureName) => {
        const addonData = uiuxAddons.find((addon) => addon.name === featureName)
        return total + (addonData ? addonData.price : 0)
      }, 0)

      totalPrice += additionalCost
    } else if (selectedService === "bundle") {
      // Bundle packages calculation
      const bundlePackages = [
        { name: "Startup Package", price: 8000000 },
        { name: "Business Package", price: 15000000 },
        { name: "Enterprise Package", price: 25000000 },
        { name: "Creative Package", price: 6000000 },
        { name: "E-Learning Package", price: 18000000 },
        { name: "Restaurant Package", price: 12000000 },
      ]

      const bundleAddons = [
        { name: "SEO Optimization", price: 2000000 },
        { name: "Social Media Management", price: 3000000 },
        { name: "Google Ads Setup", price: 1500000 },
        { name: "Content Writing", price: 2500000 },
        { name: "Photography Service", price: 3500000 },
        { name: "Video Production", price: 5000000 },
      ]

      // Find selected bundle package
      const selectedBundle = bundlePackages.find((bundle) => newFeatures.includes(bundle.name))
      if (selectedBundle) {
        totalPrice = selectedBundle.price
      }

      // Add additional bundle addons cost
      const additionalCost = newFeatures.reduce((total, featureName) => {
        const addonData = bundleAddons.find((addon) => addon.name === featureName)
        return total + (addonData ? addonData.price : 0)
      }, 0)

      totalPrice += additionalCost
    }

    // Set the calculated price, with minimum default
    setEstimatedPrice(totalPrice > 0 ? totalPrice : 2500000)
  }

  // Portfolio Filter Function
  const filterPortfolio = (filter) => {
    setPortfolioFilter(filter)
  }

  // Live Chat Functions
  const sendChatMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      type: "user",
      message: newMessage,
      time: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Terima kasih atas pertanyaannya! Tim kami akan segera membantu Anda.",
        "Untuk informasi lebih detail, silakan hubungi WhatsApp kami di +62 812-3456-7890",
        "Apakah Anda tertarik dengan paket website atau aplikasi mobile?",
        "Kami siap membantu mewujudkan proyek digital Anda!",
      ]

      const botMessage = {
        type: "bot",
        message: botResponses[Math.floor(Math.random() * botResponses.length)],
        time: new Date(),
      }

      setChatMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const timeSlots = [
    { time: "09:00", available: true },
    { time: "10:00", available: true },
    { time: "11:00", available: false },
    { time: "13:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: false },
  ]

  // Booking Functions
  const handleBookingNext = () => {
    if (bookingStep === 1 && !bookingData.type) {
      alert("Pilih jenis konsultasi terlebih dahulu")
      return
    }
    if (bookingStep === 2 && !bookingData.time) {
      alert("Pilih waktu konsultasi terlebih dahulu")
      return
    }

    setBookingStep((prev) => prev + 1)
  }

  const handleBookingSubmit = () => {
    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      alert("Lengkapi semua informasi yang diperlukan")
      return
    }

    // Generate WhatsApp message
    const message = `Halo, saya ingin booking konsultasi:
Nama: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
Jenis: ${bookingData.type}
Waktu: ${bookingData.time}
Proyek: ${bookingData.project}`

    const whatsappUrl = `https://wa.me/6281227529614?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    alert("Booking berhasil! Anda akan dialihkan ke WhatsApp.")
    setBookingStep(1)
    setBookingData({ type: "", time: "", name: "", email: "", phone: "", project: "" })
  }

  // Contact Form Submit
  const handleContactSubmit = (e) => {
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

  // Template Functions
  const toggleTemplateLike = (templateId) => {
    setTemplateLikes((prev) => ({
      ...prev,
      [templateId]: !prev[templateId],
    }))
  }

  const shareTemplate = (template) => {
    if (navigator.share) {
      navigator.share({
        title: template.name,
        text: `Check out this amazing template: ${template.name}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link berhasil disalin!")
    }
  }

  // PWA Install
  const handleInstallPWA = () => {
    setShowInstallPrompt(false)
    alert("Fitur install PWA akan tersedia setelah deployment. Terima kasih!")
  }

  // Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground">
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
                onClick={handleInstallPWA}
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

        {/* Online/Offline Status */}
        <div
          className={`fixed top-20 right-4 z-50 p-2 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"} text-white text-xs flex items-center gap-1`}
        >
          {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          {isOnline ? "Online" : "Offline"}
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
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
                <Link href="#portfolio" className="hover:text-primary transition-colors">
                  Portfolio
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
                  <Link href="#home" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link href="#services" className="hover:text-primary transition-colors">
                    Layanan
                  </Link>
                  <Link href="#portfolio" className="hover:text-primary transition-colors">
                    Portfolio
                  </Link>
                  <Link href="#contact" className="hover:text-primary transition-colors">
                    Kontak
                  </Link>
                  <Link href="#team" className="hover:text-primary transition-colors">
                    Tim
                  </Link>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
                      {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                    <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Konsultasi Gratis
                    </Button>
                  </div>
                </div>
              </nav>
            )}
          </div>
        </header>

        {/* Live Activity Bar */}
        <div className="bg-muted/50 py-2 overflow-hidden">
          <div className="flex animate-scroll">
            <div className="flex items-center space-x-8 whitespace-nowrap">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">{liveVisitors} orang sedang online</span>
              </div>
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-primary" />
                  <span className="text-sm">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

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
                    onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <Play className="w-5 h-5 mr-2 group-hover:animate-spin" />
                    Lihat Portfolio
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

        {/* Interactive Tools Section */}
        <section id="tools" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Tools Gratis
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tools Interaktif untuk Bisnis Anda</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Gunakan tools gratis kami untuk menganalisis dan merencanakan kebutuhan digital Anda
              </p>
            </div>

            <Tabs defaultValue="speed-test" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="speed-test">Speed Test</TabsTrigger>
                <TabsTrigger value="roi-calculator">ROI Calculator</TabsTrigger>
                <TabsTrigger value="domain-generator">Domain Generator</TabsTrigger>
                <TabsTrigger value="audit-tool">Website Audit</TabsTrigger>
              </TabsList>

              <TabsContent value="speed-test" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Gauge className="w-5 h-5 mr-2" />
                      Website Speed Test
                    </CardTitle>
                    <CardDescription>
                      Cek kecepatan loading website Anda dan dapatkan rekomendasi optimasi
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Masukkan URL website (contoh: https://example.com)"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={runSpeedTest} disabled={!websiteUrl}>
                        <Zap className="w-4 h-4 mr-2" />
                        Test Speed
                      </Button>
                    </div>

                    {speedTestResult && (
                      <div className="space-y-4">
                        {speedTestResult.loading ? (
                          <div className="text-center py-8">
                            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p>Menganalisis website Anda...</p>
                          </div>
                        ) : (
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">{speedTestResult.score}/100</div>
                                <div className="text-sm text-muted-foreground">Performance Score</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-semibold mb-2">{speedTestResult.loadTime}s</div>
                                <div className="text-sm text-muted-foreground">Load Time</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Rekomendasi Optimasi:</h4>
                              <ul className="space-y-2">
                                {speedTestResult.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="roi-calculator" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      ROI Calculator
                    </CardTitle>
                    <CardDescription>
                      Hitung potensi return on investment dari website atau aplikasi baru
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Revenue Bulanan Saat Ini (Rp)</label>
                        <Input
                          type="number"
                          placeholder="10000000"
                          value={roiInputs.currentRevenue}
                          onChange={(e) => setRoiInputs({ ...roiInputs, currentRevenue: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Expected Increase (%)</label>
                        <Input
                          type="number"
                          placeholder="30"
                          value={roiInputs.expectedIncrease}
                          onChange={(e) => setRoiInputs({ ...roiInputs, expectedIncrease: Number(e.target.value) })}
                        />
                      </div>
                    </div>

                    {roiInputs.currentRevenue > 0 && roiInputs.expectedIncrease > 0 && (
                      <div className="bg-muted/50 p-6 rounded-lg">
                        <h4 className="font-semibold mb-4">Proyeksi ROI:</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              +Rp {calculateROI().monthlyIncrease.toLocaleString("id-ID")}
                            </div>
                            <div className="text-sm text-muted-foreground">Peningkatan per bulan</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-500">{calculateROI().roi}%</div>
                            <div className="text-sm text-muted-foreground">ROI per tahun</div>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-background rounded border">
                          <p className="text-sm">
                            <strong>Break-even:</strong> {calculateROI().breakEven} bulan
                            <br />
                            <strong>Proyeksi keuntungan tahunan:</strong> +Rp{" "}
                            {calculateROI().yearlyIncrease.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="domain-generator" className="space-y-6">
                <DomainGenerator />
              </TabsContent>

              <TabsContent value="audit-tool" className="space-y-6">
                <WebsiteAuditTool />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Layanan Kami
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Solusi Digital Lengkap untuk Bisnis Anda</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Dari website hingga aplikasi mobile, kami menyediakan layanan pengembangan digital yang komprehensif
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const IconComponent = service.icon
                return (
                  <Card
                    key={service.id}
                    className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative ${service.popular ? "ring-2 ring-primary" : ""
                      }`}
                  >
                    {service.popular && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="text-lg font-semibold text-primary mb-4">{service.price}</div>
                      <Button
                        className="w-full group-hover:bg-primary/90"
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        Konsultasi Sekarang
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
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
                    <br/>
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
                    <br/>
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
                    <br/>
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
                    Menjadi partner digital terpercaya yang membantu bisnis berkembang melalui solusi teknologi inovatif
                    dan berkualitas tinggi.
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

        {/* Interactive Project Builder */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Build Your Project
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Estimasi Proyek Anda</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Gunakan wizard interaktif kami untuk mendapatkan estimasi harga proyek Anda
              </p>
            </div>

            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Project Builder</CardTitle>
                <CardDescription>Pilih jenis proyek dan fitur yang Anda butuhkan</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedService} onValueChange={setSelectedService}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="website">Website</TabsTrigger>
                    <TabsTrigger value="android">Android</TabsTrigger>
                    <TabsTrigger value="uiux">UI/UX</TabsTrigger>
                    <TabsTrigger value="bundle">Bundle</TabsTrigger>
                  </TabsList>

                  <TabsContent value="website" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Fitur Website:</h3>
                        <div className="space-y-2">
                          {[
                            { name: "SSL Certificate", price: 200000 },
                            { name: "Domain .com (1 tahun)", price: 150000 },
                            { name: "Hosting Premium", price: 500000 },
                            { name: "SEO Optimization", price: 800000 },
                            { name: "Google Analytics", price: 300000 },
                            { name: "Live Chat Widget", price: 400000 },
                          ].map((feature) => (
                            <label
                              key={feature.name}
                              className="flex items-center justify-between p-3 border rounded hover:bg-muted/50 cursor-pointer"
                            >
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  className="rounded"
                                  checked={selectedFeatures.includes(feature.name)}
                                  onChange={() => toggleFeature(feature)}
                                />
                                <span className="text-sm">{feature.name}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                +Rp {feature.price.toLocaleString("id-ID")}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="bg-muted/50 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">Estimasi Harga:</h3>
                        <div className="text-3xl font-bold text-primary mb-2">
                          Rp {estimatedPrice.toLocaleString("id-ID")}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          *Harga dapat berubah sesuai kompleksitas proyek
                        </p>

                        {selectedFeatures.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Yang Dipilih:</h4>
                            <div className="space-y-1">
                              {selectedFeatures.map((feature, index) => (
                                <div key={index} className="text-sm text-muted-foreground">
                                  • {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-3">
                          <Button
                            className="w-full"
                            onClick={() => {
                              const selectedItems = selectedFeatures.join(", ")
                              const message = `Halo BikinAja.id, saya tertarik untuk memesan website dengan detail:

Fitur yang dipilih: ${selectedItems}
Estimasi harga: Rp ${estimatedPrice.toLocaleString("id-ID")}

Mohon informasi lebih lanjut. Terima kasih!`

                              const whatsappUrl = `https://wa.me/6281227529614?text=${encodeURIComponent(message)}`
                              window.open(whatsappUrl, "_blank")
                            }}
                            disabled={selectedFeatures.length === 0}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Pesan via WhatsApp
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Konsultasi
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="android" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Jenis Aplikasi:</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            {
                              name: "E-Commerce App",
                              price: 8000000,
                              description: "Aplikasi toko online dengan payment gateway",
                            },
                            {
                              name: "Food Delivery App",
                              price: 12000000,
                              description: "Aplikasi delivery dengan real-time tracking",
                            },
                            {
                              name: "Social Media App",
                              price: 15000000,
                              description: "Platform media sosial dengan chat dan feed",
                            },
                            {
                              name: "Business App",
                              price: 6000000,
                              description: "Aplikasi bisnis untuk manajemen dan produktivitas",
                            },
                            {
                              name: "Educational App",
                              price: 7000000,
                              description: "Platform pembelajaran dengan video dan quiz",
                            },
                            {
                              name: "Healthcare App",
                              price: 10000000,
                              description: "Aplikasi kesehatan dengan booking dan konsultasi",
                            },
                          ].map((appType) => (
                            <div
                              key={appType.name}
                              className={`p-4 border rounded cursor-pointer hover:bg-muted/50 transition-colors ${selectedFeatures.includes(appType.name) ? "ring-2 ring-primary bg-primary/5" : ""
                                }`}
                              onClick={() => toggleFeature(appType)}
                            >
                              <div className="font-medium">{appType.name}</div>
                              <div className="text-sm text-muted-foreground">{appType.description}</div>
                              <div className="text-sm text-primary font-medium">
                                Rp {appType.price.toLocaleString("id-ID")}
                              </div>
                            </div>
                          ))}
                        </div>

                        <h3 className="font-semibold mt-6">Fitur Tambahan:</h3>
                        <div className="space-y-2">
                          {[
                            {
                              name: "Push Notifications",
                              price: 1000000,
                              description: "Notifikasi real-time ke pengguna",
                            },
                            {
                              name: "Offline Support",
                              price: 1500000,
                              description: "Aplikasi dapat digunakan tanpa internet",
                            },
                            { name: "Payment Gateway", price: 2000000, description: "Integrasi pembayaran online" },
                            { name: "GPS & Maps", price: 1200000, description: "Fitur lokasi dan peta" },
                            { name: "Camera Integration", price: 800000, description: "Fitur kamera dan galeri" },
                            {
                              name: "Social Login",
                              price: 600000,
                              description: "Login dengan Google/Facebook",
                            },
                            { name: "Analytics Dashboard", price: 1500000, description: "Dashboard analitik pengguna" },
                            { name: "Multi-language", price: 1000000, description: "Dukungan multiple bahasa" },
                          ].map((feature) => (
                            <label
                              key={feature.name}
                              className="flex items-center justify-between p-3 border rounded hover:bg-muted/50 cursor-pointer"
                            >
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  className="rounded"
                                  checked={selectedFeatures.includes(feature.name)}
                                  onChange={() => toggleFeature(feature)}
                                />
                                <div>
                                  <div className="text-sm font-medium">{feature.name}</div>
                                  <div className="text-xs text-muted-foreground">{feature.description}</div>
                                </div>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                +Rp {feature.price.toLocaleString("id-ID")}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="bg-muted/50 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">Estimasi Harga Aplikasi Android:</h3>
                        <div className="text-3xl font-bold text-primary mb-2">
                          Rp {estimatedPrice.toLocaleString("id-ID")}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          *Termasuk development, testing, dan deployment ke Play Store
                        </p>

                        {selectedFeatures.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Yang Dipilih:</h4>
                            <div className="space-y-1">
                              {selectedFeatures.map((feature, index) => (
                                <div key={index} className="text-sm text-muted-foreground">
                                  • {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-3">
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Timeline:</span>
                              <span className="font-medium">8-16 minggu</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Revisi:</span>
                              <span className="font-medium">3x gratis</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Maintenance:</span>
                              <span className="font-medium">6 bulan gratis</span>
                            </div>
                          </div>

                          <Button
                            className="w-full"
                            onClick={() => {
                              const selectedItems = selectedFeatures.join(", ")
                              const message = `Halo BikinAja.id, saya tertarik untuk memesan aplikasi Android dengan detail:

Jenis/Fitur yang dipilih: ${selectedItems}
Estimasi harga: Rp ${estimatedPrice.toLocaleString("id-ID")}

Mohon informasi lebih lanjut. Terima kasih!`

                              const whatsappUrl = `https://wa.me/6281227529614?text=${encodeURIComponent(message)}`
                              window.open(whatsappUrl, "_blank")
                            }}
                            disabled={selectedFeatures.length === 0}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Pesan via WhatsApp
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Konsultasi
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="uiux" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Paket Design:</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            {
                              name: "UI Design Only",
                              price: 2000000,
                              description: "Design interface untuk website/app existing",
                            },
                            {
                              name: "UX Research + UI",
                              price: 3500000,
                              description: "Research pengguna + design interface",
                            },
                            {
                              name: "Complete UX/UI",
                              price: 5000000,
                              description: "Full UX research, wireframe, prototype, UI design",
                            },
                            {
                              name: "Design System",
                              price: 4000000,
                              description: "Component library dan style guide lengkap",
                            },
                            {
                              name: "Mobile App Design",
                              price: 3000000,
                              description: "Design khusus untuk aplikasi mobile",
                            },
                            {
                              name: "Web App Design",
                              price: 3500000,
                              description: "Design untuk aplikasi web kompleks",
                            },
                          ].map((designType) => (
                            <div
                              key={designType.name}
                              className={`p-4 border rounded cursor-pointer hover:bg-muted/50 transition-colors ${selectedFeatures.includes(designType.name) ? "ring-2 ring-primary bg-primary/5" : ""
                                }`}
                              onClick={() => toggleFeature(designType)}
                            >
                              <div className="font-medium">{designType.name}</div>
                              <div className="text-sm text-muted-foreground">{designType.description}</div>
                              <div className="text-sm text-primary font-medium">
                                Rp {designType.price.toLocaleString("id-ID")}
                              </div>
                            </div>
                          ))}
                        </div>

                        <h3 className="font-semibold mt-6">Add-on Services:</h3>
                        <div className="space-y-2">
                          {[
                            { name: "User Testing", price: 1500000, description: "Testing dengan 5-10 pengguna real" },
                            { name: "A/B Testing Design", price: 1000000, description: "Testing 2 varian design" },
                            {
                              name: "Animation & Micro-interactions",
                              price: 2000000,
                              description: "Animasi dan interaksi halus",
                            },
                            {
                              name: "Responsive Design",
                              price: 800000,
                              description: "Design untuk semua ukuran layar",
                            },
                            { name: "Dark Mode Design", price: 600000, description: "Varian design mode gelap" },
                            {
                              name: "Accessibility Audit",
                              price: 1200000,
                              description: "Audit dan perbaikan aksesibilitas",
                            },
                          ].map((addon) => (
                            <label
                              key={addon.name}
                              className="flex items-center justify-between p-3 border rounded hover:bg-muted/50 cursor-pointer"
                            >
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  className="rounded"
                                  checked={selectedFeatures.includes(addon.name)}
                                  onChange={() => toggleFeature(addon)}
                                />
                                <div>
                                  <div className="text-sm font-medium">{addon.name}</div>
                                  <div className="text-xs text-muted-foreground">{addon.description}</div>
                                </div>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                +Rp {addon.price.toLocaleString("id-ID")}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="bg-muted/50 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">Estimasi Harga UI/UX Design:</h3>
                        <div className="text-3xl font-bold text-primary mb-2">
                          Rp {estimatedPrice.toLocaleString("id-ID")}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">*Termasuk revisi unlimited dan file source</p>

                        {selectedFeatures.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Yang Dipilih:</h4>
                            <div className="space-y-1">
                              {selectedFeatures.map((feature, index) => (
                                <div key={index} className="text-sm text-muted-foreground">
                                  • {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-3">
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Timeline:</span>
                              <span className="font-medium">2-6 minggu</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Revisi:</span>
                              <span className="font-medium">Unlimited</span>
                            </div>
                            <div className="flex justify-between">
                              <span>File Format:</span>
                              <span className="font-medium">Figma, Adobe XD, PNG</span>
                            </div>
                          </div>

                          <Button
                            className="w-full"
                            onClick={() => {
                              const selectedItems = selectedFeatures.join(", ")
                              const message = `Halo BikinAja.id, saya tertarik untuk memesan layanan UI/UX Design dengan detail:

Paket/Add-on yang dipilih: ${selectedItems}
Estimasi harga: Rp ${estimatedPrice.toLocaleString("id-ID")}

Mohon informasi lebih lanjut. Terima kasih!`

                              const whatsappUrl = `https://wa.me/6281227529614?text=${encodeURIComponent(message)}`
                              window.open(whatsappUrl, "_blank")
                            }}
                            disabled={selectedFeatures.length === 0}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Pesan via WhatsApp
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Konsultasi
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="bundle" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Paket Bundle:</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            {
                              name: "Startup Package",
                              price: 8000000,
                              originalPrice: 10000000,
                              description: "Website + UI/UX Design + 6 bulan maintenance",
                              includes: [
                                "Landing Page Website",
                                "UI/UX Design",
                                "6 Bulan Maintenance",
                                "SSL Certificate",
                                "Domain .com",
                              ],
                            },
                            {
                              name: "Business Package",
                              price: 15000000,
                              originalPrice: 20000000,
                              description: "Website E-commerce + Android App + Marketing",
                              includes: [
                                "E-commerce Website",
                                "Android App",
                                "Payment Gateway",
                                "Admin Panel",
                                "Digital Marketing Setup",
                              ],
                            },
                            {
                              name: "Enterprise Package",
                              price: 25000000,
                              originalPrice: 35000000,
                              description: "Full digital solution untuk perusahaan besar",
                              includes: [
                                "Corporate Website",
                                "Android + iOS App",
                                "Admin Dashboard",
                                "API Integration",
                                "1 Tahun Support",
                              ],
                            },
                            {
                              name: "Creative Package",
                              price: 6000000,
                              originalPrice: 8000000,
                              description: "Portfolio website + branding design",
                              includes: [
                                "Portfolio Website",
                                "Logo Design",
                                "Brand Guidelines",
                                "Social Media Kit",
                                "Business Card Design",
                              ],
                            },
                            {
                              name: "E-Learning Package",
                              price: 18000000,
                              originalPrice: 25000000,
                              description: "Platform pembelajaran online lengkap",
                              includes: [
                                "LMS Website",
                                "Mobile App",
                                "Video Streaming",
                                "Quiz System",
                                "Certificate Generator",
                              ],
                            },
                            {
                              name: "Restaurant Package",
                              price: 12000000,
                              originalPrice: 16000000,
                              description: "Solusi digital untuk restoran dan cafe",
                              includes: [
                                "Restaurant Website",
                                "Online Ordering App",
                                "POS Integration",
                                "QR Menu",
                                "Delivery Tracking",
                              ],
                            },
                          ].map((bundle) => (
                            <div
                              key={bundle.name}
                              className={`p-4 border rounded cursor-pointer hover:bg-muted/50 transition-colors ${selectedFeatures.includes(bundle.name) ? "ring-2 ring-primary bg-primary/5" : ""
                                }`}
                              onClick={() => toggleFeature(bundle)}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-medium">{bundle.name}</div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-muted-foreground line-through">
                                    Rp {bundle.originalPrice.toLocaleString("id-ID")}
                                  </span>
                                  <Badge variant="destructive" className="text-xs">
                                    Save{" "}
                                    {Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100)}%
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground mb-3">{bundle.description}</div>
                              <div className="text-sm text-primary font-medium mb-2">
                                Rp {bundle.price.toLocaleString("id-ID")}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <div className="font-medium mb-1">Termasuk:</div>
                                <ul className="space-y-1">
                                  {bundle.includes.map((item, index) => (
                                    <li key={index} className="flex items-center space-x-1">
                                      <CheckCircle className="w-3 h-3 text-green-500" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>

                        <h3 className="font-semibold mt-6">Add-on Bundle:</h3>
                        <div className="space-y-2">
                          {[
                            { name: "SEO Optimization", price: 2000000, description: "Optimasi SEO untuk 6 bulan" },
                            { name: "Social Media Management", price: 3000000, description: "Kelola sosmed 3 bulan" },
                            { name: "Google Ads Setup", price: 1500000, description: "Setup dan optimasi Google Ads" },
                            { name: "Content Writing", price: 2500000, description: "Penulisan konten untuk website" },
                            {
                              name: "Photography Service",
                              price: 3500000,
                              description: "Foto produk/profil profesional",
                            },
                            { name: "Video Production", price: 5000000, description: "Video promosi dan tutorial" },
                          ].map((addon) => (
                            <label
                              key={addon.name}
                              className="flex items-center justify-between p-3 border rounded hover:bg-muted/50 cursor-pointer"
                            >
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  className="rounded"
                                  checked={selectedFeatures.includes(addon.name)}
                                  onChange={() => toggleFeature(addon)}
                                />
                                <div>
                                  <div className="text-sm font-medium">{addon.name}</div>
                                  <div className="text-xs text-muted-foreground">{addon.description}</div>
                                </div>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                +Rp {addon.price.toLocaleString("id-ID")}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="bg-muted/50 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">Total Harga Bundle:</h3>
                        <div className="text-3xl font-bold text-primary mb-2">
                          Rp {estimatedPrice.toLocaleString("id-ID")}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">*Hemat hingga 40% dibanding beli terpisah</p>

                        {selectedFeatures.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Paket yang Dipilih:</h4>
                            <div className="space-y-1">
                              {selectedFeatures.map((feature, index) => (
                                <div key={index} className="text-sm text-muted-foreground">
                                  • {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-3">
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Timeline:</span>
                              <span className="font-medium">6-20 minggu</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Payment:</span>
                              <span className="font-medium">Bisa dicicil 3x</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Garansi:</span>
                              <span className="font-medium">1 tahun</span>
                            </div>
                          </div>

                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                            <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
                              <Crown className="w-4 h-4" />
                              <span className="text-sm font-medium">Bundle Benefit:</span>
                            </div>
                            <ul className="text-xs text-green-600 dark:text-green-400 mt-1 space-y-1">
                              <li>• Priority support 24/7</li>
                              <li>• Free consultation selamanya</li>
                              <li>• Dedicated project manager</li>
                            </ul>
                          </div>

                          <Button
                            className="w-full"
                            onClick={() => {
                              const selectedItems = selectedFeatures.join(", ")
                              const message = `Halo BikinAja.id, saya tertarik untuk memesan Bundle Package dengan detail:

Paket yang dipilih: ${selectedItems}
Total harga: Rp ${estimatedPrice.toLocaleString("id-ID")}

Mohon informasi lebih lanjut tentang bundle package ini. Terima kasih!`

                              const whatsappUrl = `https://wa.me/6285878067644?text=${encodeURIComponent(message)}`
                              window.open(whatsappUrl, "_blank")
                            }}
                            disabled={selectedFeatures.length === 0}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Pesan Bundle via WhatsApp
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            <Calendar className="w-4 h-4 mr-2" />
                            Konsultasi Bundle
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Portfolio
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Proyek yang Telah Kami Kerjakan</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Lihat berbagai proyek website dan aplikasi yang telah berhasil kami selesaikan
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {portfolio.map((project) => (
                <Card
                  key={project.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      variant={project.status === "Completed" ? "default" : "secondary"}
                      className="absolute top-4 right-4"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{project.category}</Badge>
                      <div className="text-sm text-primary font-medium">{project.roi}</div>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                    <div className="text-sm text-muted-foreground">Client: {project.client}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Lihat Detail
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => window.open(project.url, "_blank")}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Testimoni
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Klien Kami?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Kepuasan klien adalah prioritas utama kami. Lihat apa yang mereka katakan tentang layanan kami.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.company}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

     {/* Resources Section */}
<section id="resources" className="py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <Badge variant="secondary" className="mb-4">
        Resources
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog & Edukasi</h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Pelajari tips dan trik terbaru seputar web development, mobile app, dan digital marketing
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="relative overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Badge variant="secondary" className="absolute top-4 left-4">
              {post.category}
            </Badge>
          </div>

          <CardHeader>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {post.title}
            </CardTitle>
            <CardDescription>{post.excerpt}</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span>{post.author}</span>
              <span>{post.readTime}</span>
            </div>

            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:underline inline-block"
            >
              Baca Selengkapnya
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pertanyaan yang Sering Diajukan</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Temukan jawaban untuk pertanyaan umum tentang layanan kami
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqData.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedFAQ(selectedFAQ === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </div>
                  </CardHeader>
                  {selectedFAQ === index && (
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Hubungi Kami
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Memulai Proyek Anda?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Konsultasi gratis untuk mendiskusikan kebutuhan digital Anda. Tim kami siap membantu mewujudkan ide
                Anda.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Informasi Kontak</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MessageCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">WhatsApp</div>
                        <div className="text-muted-foreground">+62 812-2752-9614</div>
                        <div className="text-sm text-green-600">Online 24/7</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-muted-foreground">bikinaja.id@gmail.com</div>
                        <div className="text-sm text-blue-600">Response dalam 1 jam</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Alamat</div>
                        <div className="text-muted-foreground">Jl. Sudirman No. 123</div>
                        <div className="text-muted-foreground">Jakarta Pusat, 10220</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">Jam Operasional</div>
                        <div className="text-muted-foreground">Senin - Jumat: 09:00 - 18:00</div>
                        <div className="text-muted-foreground">Sabtu: 09:00 - 15:00</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-primary">Respon Cepat Dijamin!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tim kami berkomitmen merespon setiap pertanyaan dalam waktu kurang dari 1 jam pada jam kerja.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-6">Kirim Pesan</h3>
                <Input placeholder="Nama Lengkap" />
                <Input type="email" placeholder="Email" />
                <Input placeholder="Nomor WhatsApp" />
                <Button className="w-full" size="lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Kirim Pesan
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-muted/50 py-12 border-t">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">BA</span>
                </div>
                <span className="text-xl font-bold">BikinAja.id</span>
              </div>
              <p className="text-muted-foreground text-sm">
                &copy; 2025 BikinAja.id. All rights reserved. | Bikin Website & Aplikasi? BikinAja!
              </p>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-shadow animate-bounce">
            <MessageCircle className="w-6 h-6 mr-2" />
            Chat WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}
