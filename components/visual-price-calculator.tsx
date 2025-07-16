"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  Globe,
  Smartphone,
  Palette,
  Settings,
  MessageCircle,
  Calendar,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  Award,
  Target,
  Clock,
  DollarSign,
} from "lucide-react"

interface ServiceConfig {
  id: string
  name: string
  icon: any
  basePrice: number
  complexityMultiplier: number[]
  features: string[]
  maxFeatures: number
}

const services: ServiceConfig[] = [
  {
    id: "website",
    name: "Website Development",
    icon: Globe,
    basePrice: 2500000,
    complexityMultiplier: [1, 1.5, 2, 2.8, 4],
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Admin Panel",
      "Payment Gateway",
      "Multi-language",
      "Analytics Integration",
      "Live Chat",
      "Blog System",
    ],
    maxFeatures: 8,
  },
  {
    id: "mobile",
    name: "Mobile App",
    icon: Smartphone,
    basePrice: 6000000,
    complexityMultiplier: [1, 1.4, 2.2, 3.5, 5],
    features: [
      "Native Development",
      "Push Notifications",
      "Offline Support",
      "Payment Integration",
      "GPS & Maps",
      "Camera Integration",
      "Social Login",
      "Analytics Dashboard",
    ],
    maxFeatures: 8,
  },
  {
    id: "uiux",
    name: "UI/UX Design",
    icon: Palette,
    basePrice: 2000000,
    complexityMultiplier: [1, 1.3, 1.8, 2.5, 3.5],
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design System",
      "User Testing",
      "Responsive Design",
      "Animation Design",
      "Accessibility Audit",
    ],
    maxFeatures: 8,
  },
  {
    id: "maintenance",
    name: "Maintenance & Support",
    icon: Settings,
    basePrice: 500000,
    complexityMultiplier: [1, 1.2, 1.5, 2, 3],
    features: [
      "24/7 Monitoring",
      "Regular Updates",
      "Bug Fixes",
      "Performance Optimization",
      "Security Patches",
      "Backup Management",
      "Content Updates",
      "Technical Support",
    ],
    maxFeatures: 8,
  },
]

const complexityLevels = [
  { name: "Basic", color: "bg-green-500", description: "Simple & straightforward" },
  { name: "Standard", color: "bg-blue-500", description: "Balanced features" },
  { name: "Advanced", color: "bg-yellow-500", description: "Rich functionality" },
  { name: "Premium", color: "bg-orange-500", description: "Complex & custom" },
  { name: "Enterprise", color: "bg-red-500", description: "Full-scale solution" },
]

const timelineOptions = [
  { weeks: 2, multiplier: 1.8, label: "Rush (2 weeks)", urgent: true },
  { weeks: 4, multiplier: 1.2, label: "Fast (1 month)", urgent: false },
  { weeks: 8, multiplier: 1, label: "Standard (2 months)", urgent: false },
  { weeks: 12, multiplier: 0.9, label: "Relaxed (3 months)", urgent: false },
]

export function VisualPriceCalculator() {
  const [selectedService, setSelectedService] = useState("website")
  const [complexity, setComplexity] = useState([2]) // Index 2 = Advanced
  const [featuresCount, setFeaturesCount] = useState([4])
  const [timeline, setTimeline] = useState([2]) // Index 2 = Standard
  const [supportMonths, setSupportMonths] = useState([6])
  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const [confidence, setConfidence] = useState(85)
  const [isCalculating, setIsCalculating] = useState(false)

  const currentService = services.find((s) => s.id === selectedService) || services[0]
  const currentComplexity = complexityLevels[complexity[0]]
  const currentTimeline = timelineOptions[timeline[0]]

  // Calculate price with smooth animation
  useEffect(() => {
    setIsCalculating(true)
    const timer = setTimeout(() => {
      const basePrice = currentService.basePrice
      const complexityMultiplier = currentService.complexityMultiplier[complexity[0]]
      const featuresCost = (featuresCount[0] / currentService.maxFeatures) * basePrice * 0.5
      const timelineMultiplier = currentTimeline.multiplier
      const supportCost = supportMonths[0] * 200000

      const totalPrice = (basePrice * complexityMultiplier + featuresCost) * timelineMultiplier + supportCost

      setCalculatedPrice(totalPrice)
      setConfidence(Math.max(75, Math.min(95, 90 - complexity[0] * 3 - (timeline[0] === 0 ? 10 : 0))))
      setIsCalculating(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [selectedService, complexity, featuresCount, timeline, supportMonths, currentService, currentTimeline])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getROIProjection = () => {
    const monthlyROI = calculatedPrice * 0.15 // 15% monthly ROI assumption
    const yearlyROI = monthlyROI * 12
    const breakEvenMonths = Math.ceil(calculatedPrice / monthlyROI)
    return { monthlyROI, yearlyROI, breakEvenMonths }
  }

  const roi = getROIProjection()

  const handleOrderNow = () => {
    const orderDetails = `
🚀 *Pesanan Baru dari Price Calculator*

*Service:* ${currentService.name}
*Complexity:* ${currentComplexity.name} (${currentComplexity.description})
*Features:* ${featuresCount[0]} dari ${currentService.maxFeatures} fitur
*Timeline:* ${currentTimeline.label}
*Support:* ${supportMonths[0]} bulan
*Total Harga:* ${formatPrice(calculatedPrice)}
*Confidence:* ${confidence}%

Saya tertarik untuk melanjutkan project ini. Mohon informasi lebih lanjut!
    `.trim()

    const whatsappUrl = `https://wa.me/6281227529614?text=${encodeURIComponent(orderDetails)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="p-6 space-y-8">
      {/* Service Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary" />
          Pilih Layanan
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedService === service.id ? "ring-2 ring-primary bg-primary/5 scale-105" : "hover:scale-102"
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center transition-colors ${
                      selectedService === service.id ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="font-medium text-sm">{service.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">Mulai {formatPrice(service.basePrice)}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Controls */}
        <div className="space-y-6">
          {/* Complexity Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold flex items-center">
                <Zap className="w-4 h-4 mr-2 text-primary" />
                Tingkat Kompleksitas
              </h4>
              <Badge variant="outline" className={`${currentComplexity.color} text-white border-none`}>
                {currentComplexity.name}
              </Badge>
            </div>
            <Slider value={complexity} onValueChange={setComplexity} max={4} step={1} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              {complexityLevels.map((level, index) => (
                <span key={index} className={complexity[0] === index ? "text-primary font-medium" : ""}>
                  {level.name}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{currentComplexity.description}</p>
          </div>

          {/* Features Count */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-primary" />
                Jumlah Fitur
              </h4>
              <Badge variant="secondary">
                {featuresCount[0]} / {currentService.maxFeatures}
              </Badge>
            </div>
            <Slider
              value={featuresCount}
              onValueChange={setFeaturesCount}
              max={currentService.maxFeatures}
              min={1}
              step={1}
              className="w-full"
            />
            <Progress value={(featuresCount[0] / currentService.maxFeatures) * 100} className="h-2" />
            <div className="grid grid-cols-2 gap-2 text-xs">
              {currentService.features.slice(0, featuresCount[0]).map((feature, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                Timeline Pengerjaan
              </h4>
              {currentTimeline.urgent && (
                <Badge variant="destructive" className="animate-pulse">
                  Rush Order
                </Badge>
              )}
            </div>
            <Slider value={timeline} onValueChange={setTimeline} max={3} step={1} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              {timelineOptions.map((option, index) => (
                <span key={index} className={timeline[0] === index ? "text-primary font-medium" : ""}>
                  {option.weeks}w
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{currentTimeline.label}</p>
          </div>

          {/* Support Duration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold flex items-center">
                <Settings className="w-4 h-4 mr-2 text-primary" />
                Dukungan Maintenance
              </h4>
              <Badge variant="outline">{supportMonths[0]} bulan</Badge>
            </div>
            <Slider
              value={supportMonths}
              onValueChange={setSupportMonths}
              max={24}
              min={3}
              step={3}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>3 bulan</span>
              <span>12 bulan</span>
              <span>24 bulan</span>
            </div>
          </div>
        </div>

        {/* Right Column - Price Display */}
        <div className="space-y-6">
          {/* Price Display */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Estimasi Harga
                </span>
                <Badge variant="secondary" className="animate-pulse">
                  {confidence}% akurat
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div
                  className={`text-4xl font-bold text-primary transition-all duration-500 ${
                    isCalculating ? "scale-110 opacity-50" : "scale-100 opacity-100"
                  }`}
                >
                  {formatPrice(calculatedPrice)}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  *Harga final dapat berubah setelah konsultasi detail
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Price ({currentComplexity.name})</span>
                  <span>
                    {formatPrice(currentService.basePrice * currentService.complexityMultiplier[complexity[0]])}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Features ({featuresCount[0]} items)</span>
                  <span>
                    +{formatPrice((featuresCount[0] / currentService.maxFeatures) * currentService.basePrice * 0.5)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline Adjustment</span>
                  <span
                    className={
                      currentTimeline.multiplier > 1
                        ? "text-red-500"
                        : currentTimeline.multiplier < 1
                          ? "text-green-500"
                          : ""
                    }
                  >
                    {currentTimeline.multiplier > 1 ? "+" : currentTimeline.multiplier < 1 ? "-" : ""}
                    {Math.abs((currentTimeline.multiplier - 1) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Support ({supportMonths[0]} bulan)</span>
                  <span>+{formatPrice(supportMonths[0] * 200000)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(calculatedPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ROI Projection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Proyeksi ROI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-500">{formatPrice(roi.monthlyROI)}</div>
                  <div className="text-xs text-muted-foreground">Per Bulan</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">{roi.breakEvenMonths} bulan</div>
                  <div className="text-xs text-muted-foreground">Break Even</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">{formatPrice(roi.yearlyROI)}</div>
                <div className="text-xs text-muted-foreground">Proyeksi Keuntungan Tahunan</div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleOrderNow} className="w-full text-lg py-6 group" size="lg">
              <MessageCircle className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Pesan Sekarang via WhatsApp
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button variant="outline" className="w-full bg-transparent" size="lg">
              <Calendar className="w-4 h-4 mr-2" />
              Konsultasi Gratis Dulu
            </Button>

            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>Garansi 6 bulan</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span>Rating 4.9/5</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-3 h-3 text-blue-500" />
                <span>150+ proyek</span>
              </div>
            </div>
          </div>

          {/* Special Offer */}
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold text-yellow-700 dark:text-yellow-400">Early Bird Discount!</span>
              </div>
              <p className="text-sm text-yellow-600 dark:text-yellow-300">
                Hemat 20% untuk 10 klien pertama bulan ini. Slot tersisa: 3
              </p>
              <div className="mt-2">
                <Progress value={70} className="h-2" />
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">7 dari 10 slot sudah terisi</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
