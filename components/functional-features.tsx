"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calculator,
  Gauge,
  MessageCircle,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  ThumbsUp,
  Zap,
  TrendingUp,
  DollarSign,
  Eye,
  Globe,
  Search,
  Copy,
  RefreshCw,
  Shield,
  Smartphone,
  Activity,
  BarChart3,
  AlertTriangle,
  Target,
  ChevronDown,
  ChevronUp,
  Filter,
  SortAsc,
} from "lucide-react"

// Speed Test Component
export function SpeedTestTool() {
  const [url, setUrl] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const runTest = async () => {
    if (!url) {
      alert("Masukkan URL website terlebih dahulu")
      return
    }

    try {
      new URL(url)
    } catch {
      alert("URL tidak valid. Gunakan format: https://example.com")
      return
    }

    setLoading(true)
    setResult(null)

    // Simulate speed test
    setTimeout(() => {
      const loadTime = (Math.random() * 3 + 0.5).toFixed(2)
      const score = Math.max(20, Math.min(100, 100 - loadTime * 15))

      setResult({
        score: Math.floor(score),
        loadTime,
        recommendations: [
          loadTime > 2 ? "Optimasi gambar untuk web" : "Ukuran gambar sudah optimal",
          score < 80 ? "Minifikasi CSS dan JavaScript" : "Kompresi file sudah baik",
          score < 60 ? "Gunakan CDN untuk loading lebih cepat" : "Pertimbangkan upgrade hosting",
          "Enable browser caching untuk performa lebih baik",
        ],
        url,
      })
      setLoading(false)
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Gauge className="w-5 h-5 mr-2" />
          Website Speed Test
        </CardTitle>
        <CardDescription>Cek kecepatan loading website Anda dan dapatkan rekomendasi optimasi</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Masukkan URL website (contoh: https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={runTest} disabled={loading || !url}>
            {loading ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Zap className="w-4 h-4 mr-2" />
            )}
            {loading ? "Testing..." : "Test Speed"}
          </Button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p>Menganalisis website Anda...</p>
            <Progress value={33} className="w-full mt-2" />
          </div>
        )}

        {result && !loading && (
          <div className="space-y-4">
            {result.error ? (
              <div className="text-center py-4">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <p className="text-red-500">{result.message}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div
                      className={`text-4xl font-bold mb-2 ${
                        result.score >= 80 ? "text-green-500" : result.score >= 60 ? "text-yellow-500" : "text-red-500"
                      }`}
                    >
                      {result.score}/100
                    </div>
                    <div className="text-sm text-muted-foreground">Performance Score</div>
                    <Badge
                      variant={result.score >= 80 ? "default" : result.score >= 60 ? "secondary" : "destructive"}
                      className="mt-2"
                    >
                      {result.score >= 80 ? "Excellent" : result.score >= 60 ? "Good" : "Needs Improvement"}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold mb-2">{result.loadTime}s</div>
                    <div className="text-sm text-muted-foreground">Load Time</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Rekomendasi Optimasi:</h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Report
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ROI Calculator Component
export function ROICalculator() {
  const [inputs, setInputs] = useState({
    currentRevenue: "",
    expectedIncrease: "",
    websiteCost: "3000000",
    timeframe: "12",
  })
  const [result, setResult] = useState(null)

  const calculate = () => {
    const revenue = Number.parseFloat(inputs.currentRevenue)
    const increase = Number.parseFloat(inputs.expectedIncrease)
    const websiteCost = Number.parseFloat(inputs.websiteCost)
    const timeframe = Number.parseFloat(inputs.timeframe)

    if (!revenue || !increase || !websiteCost || !timeframe) {
      alert("Lengkapi semua field untuk kalkulasi")
      return
    }

    const monthlyIncrease = (revenue * increase) / 100
    const totalIncrease = monthlyIncrease * timeframe
    const roi = ((totalIncrease - websiteCost) / websiteCost) * 100
    const breakEven = Math.ceil(websiteCost / monthlyIncrease)
    const paybackPeriod = breakEven <= timeframe ? breakEven : "Lebih dari " + timeframe

    setResult({
      monthlyIncrease,
      totalIncrease,
      roi: roi.toFixed(1),
      breakEven: breakEven > 0 ? breakEven : 0,
      paybackPeriod,
      websiteCost,
      timeframe,
      profitAfterCost: totalIncrease - websiteCost,
    })
  }

  const resetCalculator = () => {
    setInputs({
      currentRevenue: "",
      expectedIncrease: "",
      websiteCost: "3000000",
      timeframe: "12",
    })
    setResult(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          ROI Calculator
        </CardTitle>
        <CardDescription>Hitung potensi return on investment dari website atau aplikasi baru</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Revenue Bulanan Saat Ini (Rp)</label>
            <Input
              type="number"
              placeholder="10000000"
              value={inputs.currentRevenue}
              onChange={(e) => setInputs({ ...inputs, currentRevenue: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Expected Increase (%)</label>
            <Input
              type="number"
              placeholder="30"
              value={inputs.expectedIncrease}
              onChange={(e) => setInputs({ ...inputs, expectedIncrease: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Biaya Investasi Website (Rp)</label>
            <Input
              type="number"
              placeholder="3000000"
              value={inputs.websiteCost}
              onChange={(e) => setInputs({ ...inputs, websiteCost: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Periode Analisis (Bulan)</label>
            <Select value={inputs.timeframe} onValueChange={(value) => setInputs({ ...inputs, timeframe: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 Bulan</SelectItem>
                <SelectItem value="12">12 Bulan</SelectItem>
                <SelectItem value="24">24 Bulan</SelectItem>
                <SelectItem value="36">36 Bulan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={calculate} className="flex-1" disabled={!inputs.currentRevenue || !inputs.expectedIncrease}>
            <TrendingUp className="w-4 h-4 mr-2" />
            Hitung ROI
          </Button>
          <Button onClick={resetCalculator} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {result && (
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Proyeksi ROI ({result.timeframe} bulan):
            </h4>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-background rounded border">
                <div className="text-xl font-bold text-primary">
                  +Rp {result.monthlyIncrease.toLocaleString("id-ID")}
                </div>
                <div className="text-sm text-muted-foreground">Peningkatan per bulan</div>
              </div>
              <div className="text-center p-4 bg-background rounded border">
                <div className="text-xl font-bold text-green-500">{result.roi}%</div>
                <div className="text-sm text-muted-foreground">ROI Total</div>
              </div>
              <div className="text-center p-4 bg-background rounded border">
                <div className="text-xl font-bold text-blue-500">{result.paybackPeriod}</div>
                <div className="text-sm text-muted-foreground">Payback Period (bulan)</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Investasi website:</span>
                <span className="font-medium">Rp {result.websiteCost.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span>Total peningkatan revenue:</span>
                <span className="font-medium">Rp {result.totalIncrease.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span>Profit setelah biaya:</span>
                <span className={`font-medium ${result.profitAfterCost > 0 ? "text-green-600" : "text-red-600"}`}>
                  Rp {result.profitAfterCost.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
            <Button className="w-full mt-4 bg-transparent" variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Diskusi dengan Konsultan
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Domain Generator Component
export function DomainGenerator() {
  const [keyword, setKeyword] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)

  const domainExtensions = [".com", ".id", ".co.id", ".net", ".org", ".biz", ".info"]
  const businessSuffixes = {
    ecommerce: ["shop", "store", "mart", "plaza", "market"],
    tech: ["tech", "digital", "soft", "app", "web"],
    food: ["food", "resto", "cafe", "kitchen", "taste"],
    health: ["health", "care", "medic", "clinic", "wellness"],
    education: ["edu", "learn", "academy", "school", "course"],
    finance: ["finance", "pay", "money", "bank", "invest"],
    travel: ["travel", "trip", "tour", "journey", "explore"],
    fashion: ["fashion", "style", "trend", "boutique", "wear"],
  }

  const generateDomains = () => {
    if (!keyword.trim()) {
      alert("Masukkan kata kunci terlebih dahulu")
      return
    }

    setLoading(true)

    setTimeout(() => {
      const suggestions = []
      const cleanKeyword = keyword.toLowerCase().replace(/[^a-z0-9]/g, "")

      // Basic keyword domains
      domainExtensions.forEach((ext) => {
        suggestions.push({
          domain: cleanKeyword + ext,
          type: "exact",
          available: Math.random() > 0.3,
          price: ext === ".com" ? "Rp 150.000/tahun" : ext === ".id" ? "Rp 200.000/tahun" : "Rp 120.000/tahun",
        })
      })

      // Business type combinations
      if (businessType && businessSuffixes[businessType]) {
        businessSuffixes[businessType].forEach((suffix) => {
          domainExtensions.slice(0, 3).forEach((ext) => {
            suggestions.push({
              domain: cleanKeyword + suffix + ext,
              type: "combination",
              available: Math.random() > 0.2,
              price: ext === ".com" ? "Rp 150.000/tahun" : ext === ".id" ? "Rp 200.000/tahun" : "Rp 120.000/tahun",
            })
          })
        })
      }

      // Creative variations
      const prefixes = ["my", "get", "the", "best", "top"]
      const suffixes = ["hub", "zone", "pro", "plus", "max"]

      prefixes.slice(0, 2).forEach((prefix) => {
        suggestions.push({
          domain: prefix + cleanKeyword + ".com",
          type: "creative",
          available: Math.random() > 0.4,
          price: "Rp 150.000/tahun",
        })
      })

      suffixes.slice(0, 2).forEach((suffix) => {
        suggestions.push({
          domain: cleanKeyword + suffix + ".com",
          type: "creative",
          available: Math.random() > 0.4,
          price: "Rp 150.000/tahun",
        })
      })

      setSuggestions(suggestions.slice(0, 12))
      setLoading(false)
    }, 2000)
  }

  const copyDomain = (domain) => {
    navigator.clipboard.writeText(domain)
    alert(`Domain ${domain} berhasil disalin!`)
  }

  const checkDomain = (domain) => {
    alert(`Mengecek ketersediaan ${domain}... Fitur ini akan segera tersedia!`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Domain Name Generator
        </CardTitle>
        <CardDescription>Generate nama domain yang unik dan menarik untuk bisnis Anda</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Kata Kunci Bisnis</label>
            <Input
              placeholder="contoh: tokobaju, kedaicoffee, webdesign"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Jenis Bisnis</label>
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis bisnis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ecommerce">E-Commerce</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="food">Food & Beverage</SelectItem>
                <SelectItem value="health">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={generateDomains} className="w-full" disabled={loading || !keyword.trim()}>
          {loading ? (
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Search className="w-4 h-4 mr-2" />
          )}
          {loading ? "Generating..." : "Generate Domain"}
        </Button>

        {loading && (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p>Mencari domain yang tersedia...</p>
          </div>
        )}

        {suggestions.length > 0 && !loading && (
          <div className="space-y-4">
            <h4 className="font-semibold">Saran Domain:</h4>
            <div className="grid gap-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${suggestion.available ? "bg-green-500" : "bg-red-500"}`} />
                    <div>
                      <div className="font-medium">{suggestion.domain}</div>
                      <div className="text-sm text-muted-foreground">
                        {suggestion.available ? `Tersedia - ${suggestion.price}` : "Tidak tersedia"}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.type}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => copyDomain(suggestion.domain)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    {suggestion.available && (
                      <Button size="sm" onClick={() => checkDomain(suggestion.domain)}>
                        Pesan
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" onClick={generateDomains}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Lagi
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Enhanced Website Audit Tool Component
export function WebsiteAuditTool() {
  const [url, setUrl] = useState("")
  const [auditResult, setAuditResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedSections, setExpandedSections] = useState({})
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [sortBy, setSortBy] = useState("severity")

  const runAudit = async () => {
    if (!url) {
      alert("Masukkan URL website terlebih dahulu")
      return
    }

    try {
      new URL(url)
    } catch {
      alert("URL tidak valid. Gunakan format: https://example.com")
      return
    }

    setLoading(true)
    setAuditResult(null)

    // Simulate comprehensive audit with detailed analysis
    setTimeout(() => {
      // Generate realistic scores
      const seoScore = Math.floor(Math.random() * 40) + 60
      const performanceScore = Math.floor(Math.random() * 40) + 50
      const securityScore = Math.floor(Math.random() * 30) + 70
      const mobileScore = Math.floor(Math.random() * 35) + 65
      const accessibilityScore = Math.floor(Math.random() * 30) + 70
      const usabilityScore = Math.floor(Math.random() * 25) + 75
      const overallScore = Math.floor(
        (seoScore + performanceScore + securityScore + mobileScore + accessibilityScore + usabilityScore) / 6,
      )

      // Generate detailed issues
      const issues = []
      const recommendations = []
      // use `let` so we can re-assign later without throwing
      let technicalDetails: any = {}

      // SEO Issues
      if (seoScore < 80) {
        issues.push({
          category: "SEO",
          type: "Meta Tags",
          severity: "high",
          message: "Meta description tidak ditemukan pada 3 halaman",
          impact: "Mengurangi CTR dari search results hingga 30%",
          solution: "Tambahkan meta description unik 150-160 karakter untuk setiap halaman",
          priority: 1,
          estimatedTime: "2-4 jam",
          affectedPages: ["/", "/about", "/contact"],
        })
        issues.push({
          category: "SEO",
          type: "Heading Structure",
          severity: "medium",
          message: "Struktur heading tidak optimal (H1 ganda ditemukan)",
          impact: "Mengurangi pemahaman search engine terhadap konten",
          solution: "Gunakan hanya satu H1 per halaman dan struktur heading yang hierarkis",
          priority: 2,
          estimatedTime: "1-2 jam",
          affectedPages: ["/services"],
        })
        recommendations.push("Optimasi meta tags untuk semua halaman")
        recommendations.push("Perbaiki struktur heading HTML")
      }

      // Performance Issues
      if (performanceScore < 70) {
        issues.push({
          category: "Performance",
          type: "Image Optimization",
          severity: "high",
          message: "12 gambar tidak dioptimasi (total 2.3MB)",
          impact: "Memperlambat loading time hingga 3.2 detik",
          solution: "Kompres gambar dan gunakan format WebP/AVIF",
          priority: 1,
          estimatedTime: "3-5 jam",
          affectedPages: ["/", "/gallery", "/products"],
        })
        issues.push({
          category: "Performance",
          type: "JavaScript",
          severity: "medium",
          message: "Render-blocking JavaScript ditemukan",
          impact: "Menunda First Contentful Paint sebesar 1.8 detik",
          solution: "Defer atau async loading untuk JavaScript non-critical",
          priority: 2,
          estimatedTime: "2-3 jam",
          affectedPages: ["Global"],
        })
        recommendations.push("Optimasi dan kompres semua gambar")
        recommendations.push("Minifikasi CSS dan JavaScript")
      }

      // Security Issues
      if (securityScore < 90) {
        issues.push({
          category: "Security",
          type: "SSL Certificate",
          severity: "medium",
          message: "SSL certificate akan expire dalam 25 hari",
          impact: "Website akan menampilkan warning 'Not Secure'",
          solution: "Perbarui SSL certificate sebelum expired",
          priority: 1,
          estimatedTime: "30 menit",
          affectedPages: ["Global"],
        })
        issues.push({
          category: "Security",
          type: "HTTP Headers",
          severity: "low",
          message: "Security headers tidak lengkap",
          impact: "Rentan terhadap XSS dan clickjacking attacks",
          solution: "Tambahkan Content-Security-Policy dan X-Frame-Options headers",
          priority: 3,
          estimatedTime: "1 jam",
          affectedPages: ["Global"],
        })
        recommendations.push("Perbarui SSL certificate")
        recommendations.push("Implementasi security headers")
      }

      // Mobile Issues
      if (mobileScore < 80) {
        issues.push({
          category: "Mobile",
          type: "Responsive Design",
          severity: "high",
          message: "5 elemen tidak responsive di mobile",
          impact: "Poor user experience di mobile devices",
          solution: "Perbaiki CSS untuk mobile responsiveness",
          priority: 1,
          estimatedTime: "4-6 jam",
          affectedPages: ["/contact", "/services"],
        })
        issues.push({
          category: "Mobile",
          type: "Touch Targets",
          severity: "medium",
          message: "Touch targets terlalu kecil (< 44px)",
          impact: "Sulit digunakan di touchscreen devices",
          solution: "Perbesar ukuran button dan link minimal 44x44px",
          priority: 2,
          estimatedTime: "2-3 jam",
          affectedPages: ["/navigation", "/footer"],
        })
        recommendations.push("Perbaiki responsive design")
        recommendations.push("Optimasi touch targets untuk mobile")
      }

      // Accessibility Issues
      if (accessibilityScore < 80) {
        issues.push({
          category: "Accessibility",
          type: "Alt Text",
          severity: "medium",
          message: "8 gambar tidak memiliki alt text",
          impact: "Tidak accessible untuk screen readers",
          solution: "Tambahkan alt text deskriptif untuk semua gambar",
          priority: 2,
          estimatedTime: "1-2 jam",
          affectedPages: ["/gallery", "/about"],
        })
        issues.push({
          category: "Accessibility",
          type: "Color Contrast",
          severity: "low",
          message: "Kontras warna tidak memenuhi WCAG standards",
          impact: "Sulit dibaca oleh pengguna dengan gangguan penglihatan",
          solution: "Tingkatkan kontras warna minimal 4.5:1 untuk teks normal",
          priority: 3,
          estimatedTime: "2-3 jam",
          affectedPages: ["/", "/contact"],
        })
        recommendations.push("Tambahkan alt text untuk semua gambar")
        recommendations.push("Perbaiki kontras warna")
      }

      // Technical Details
      technicalDetails = {
        pageSpeed: {
          firstContentfulPaint: "2.1s",
          largestContentfulPaint: "3.4s",
          cumulativeLayoutShift: "0.12",
          firstInputDelay: "89ms",
          totalBlockingTime: "245ms",
        },
        seoMetrics: {
          titleTags: { found: 8, missing: 2, duplicate: 1 },
          metaDescriptions: { found: 6, missing: 4, duplicate: 0 },
          headings: { h1: 12, h2: 24, h3: 18, issues: 3 },
          internalLinks: 45,
          externalLinks: 12,
          images: { total: 23, withAlt: 15, withoutAlt: 8 },
        },
        security: {
          httpsEnabled: true,
          sslGrade: "A-",
          securityHeaders: 3,
          vulnerabilities: 0,
          lastScan: new Date().toISOString(),
        },
        mobile: {
          viewportConfigured: true,
          touchTargets: { total: 34, tooSmall: 7 },
          textReadability: "Good",
          tapTargetSpacing: "Needs Improvement",
        },
      }

      // Positive findings
      const positives = [
        "Website menggunakan HTTPS dengan SSL certificate valid",
        "Struktur URL sudah SEO-friendly dan clean",
        "Google Analytics dan Search Console sudah terpasang",
        "Website memiliki sitemap.xml yang valid",
        "Favicon sudah dikonfigurasi dengan benar",
        "Meta viewport tag sudah dikonfigurasi untuk mobile",
        "Tidak ditemukan broken links internal",
        "Website loading dalam waktu yang reasonable",
      ]

      // Competitive Analysis (simulated)
      const competitorComparison = {
        averageScore: 72,
        yourScore: overallScore,
        betterThan: Math.floor(Math.random() * 40) + 30,
        categories: {
          seo: { you: seoScore, average: 68 },
          performance: { you: performanceScore, average: 65 },
          security: { you: securityScore, average: 78 },
          mobile: { you: mobileScore, average: 71 },
        },
      }

      setAuditResult({
        url,
        overallScore,
        scores: {
          seo: seoScore,
          performance: performanceScore,
          security: securityScore,
          mobile: mobileScore,
          accessibility: accessibilityScore,
          usability: usabilityScore,
        },
        issues: issues.sort((a, b) => a.priority - b.priority),
        recommendations,
        positives: positives.slice(0, Math.floor(Math.random() * 3) + 4),
        technicalDetails,
        competitorComparison,
        auditDate: new Date().toLocaleDateString("id-ID"),
        auditTime: new Date().toLocaleTimeString("id-ID"),
        totalIssues: issues.length,
        criticalIssues: issues.filter((i) => i.severity === "high").length,
        estimatedFixTime: issues.reduce((total, issue) => {
          const hours = Number.parseInt(issue.estimatedTime.split("-")[0]) || 1
          return total + hours
        }, 0),
      })
      setLoading(false)
    }, 5000)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreGrade = (score) => {
    if (score >= 90) return "A+"
    if (score >= 80) return "A"
    if (score >= 70) return "B"
    if (score >= 60) return "C"
    return "D"
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const filteredIssues =
    auditResult?.issues?.filter((issue) => {
      if (filterSeverity === "all") return true
      return issue.severity === filterSeverity
    }) || []

  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (sortBy === "severity") {
      const severityOrder = { high: 3, medium: 2, low: 1 }
      return severityOrder[b.severity] - severityOrder[a.severity]
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category)
    }
    if (sortBy === "priority") {
      return a.priority - b.priority
    }
    return 0
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="w-5 h-5 mr-2" />
          Website Audit Tool - Comprehensive Analysis
        </CardTitle>
        <CardDescription>
          Audit mendalam untuk SEO, Performance, Security, Mobile, Accessibility, dan Usability
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Masukkan URL website (contoh: https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={runAudit} disabled={loading || !url}>
            {loading ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            {loading ? "Auditing..." : "Audit Website"}
          </Button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h3 className="text-lg font-semibold mb-4">Menganalisis Website Anda...</h3>
            <div className="max-w-md mx-auto space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span>🔍 Scanning SEO elements...</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span>⚡ Analyzing performance...</span>
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span>🔒 Checking security...</span>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span>📱 Testing mobile experience...</span>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span>♿ Evaluating accessibility...</span>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span>🎯 Assessing usability...</span>
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <Progress value={60} className="w-full mt-6" />
            <p className="text-sm text-muted-foreground mt-2">
              Proses audit membutuhkan waktu 30-60 detik untuk analisis yang komprehensif
            </p>
          </div>
        )}

        {auditResult && !loading && (
          <div className="space-y-6">
            {/* Overall Score Dashboard */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                  <div className={`text-5xl font-bold mb-2 ${getScoreColor(auditResult.overallScore)}`}>
                    {auditResult.overallScore}
                  </div>
                  <div className="text-lg font-semibold mb-1">Overall Score</div>
                  <Badge
                    variant={
                      auditResult.overallScore >= 80
                        ? "default"
                        : auditResult.overallScore >= 60
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-sm"
                  >
                    Grade {getScoreGrade(auditResult.overallScore)}
                  </Badge>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Better than {auditResult.competitorComparison.betterThan}% of websites
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(auditResult.scores).map(([category, score]) => {
                    const icons = {
                      seo: Search,
                      performance: Zap,
                      security: Shield,
                      mobile: Smartphone,
                      accessibility: Eye,
                      usability: Target,
                    }
                    const IconComponent = icons[category] || Activity

                    return (
                      <div
                        key={category}
                        className="text-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <IconComponent className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</div>
                        <div className="text-sm text-muted-foreground capitalize">{category}</div>
                        <div className="text-xs text-muted-foreground mt-1">Grade {getScoreGrade(score)}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="text-2xl font-bold text-red-600">{auditResult.criticalIssues}</div>
                <div className="text-sm text-red-600">Critical Issues</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="text-2xl font-bold text-yellow-600">{auditResult.totalIssues}</div>
                <div className="text-sm text-yellow-600">Total Issues</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-2xl font-bold text-blue-600">{auditResult.estimatedFixTime}h</div>
                <div className="text-sm text-blue-600">Est. Fix Time</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-2xl font-bold text-green-600">{auditResult.positives.length}</div>
                <div className="text-sm text-green-600">Things Done Right</div>
              </div>
            </div>

            {/* Detailed Analysis Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="issues">Issues</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="competitor">Compare</TabsTrigger>
                <TabsTrigger value="recommendations">Action Plan</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Issues Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                      Issues Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">By Severity</h4>
                        <div className="space-y-2">
                          {["high", "medium", "low"].map((severity) => {
                            const count = auditResult.issues.filter((i) => i.severity === severity).length
                            const percentage = ((count / auditResult.issues.length) * 100).toFixed(0)
                            return (
                              <div key={severity} className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div
                                    className={`w-3 h-3 rounded-full ${
                                      severity === "high"
                                        ? "bg-red-500"
                                        : severity === "medium"
                                          ? "bg-yellow-500"
                                          : "bg-blue-500"
                                    }`}
                                  />
                                  <span className="capitalize">{severity}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-muted-foreground">{count} issues</span>
                                  <span className="text-xs text-muted-foreground">({percentage}%)</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">By Category</h4>
                        <div className="space-y-2">
                          {["SEO", "Performance", "Security", "Mobile", "Accessibility"].map((category) => {
                            const count = auditResult.issues.filter((i) => i.category === category).length
                            return (
                              <div key={category} className="flex items-center justify-between">
                                <span>{category}</span>
                                <span className="text-sm text-muted-foreground">{count} issues</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* What's Working Well */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ThumbsUp className="w-5 h-5 mr-2 text-green-500" />
                      What's Working Well
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {auditResult.positives.map((positive, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{positive}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="issues" className="space-y-6">
                {/* Filters and Sorting */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Issues</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SortAsc className="w-4 h-4" />
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="severity">Severity</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Badge variant="outline">{sortedIssues.length} issues found</Badge>
                </div>

                {/* Issues List */}
                <div className="space-y-4">
                  {sortedIssues.map((issue, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => toggleSection(`issue-${index}`)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge variant={getSeverityBadge(issue.severity)} className="text-xs">
                              {issue.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {issue.category}
                            </Badge>
                            <div>
                              <CardTitle className="text-base">{issue.type}</CardTitle>
                              <CardDescription className="text-sm">{issue.message}</CardDescription>
                            </div>
                          </div>
                          {expandedSections[`issue-${index}`] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </CardHeader>
                      {expandedSections[`issue-${index}`] && (
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-semibold text-sm mb-2">Impact</h5>
                              <p className="text-sm text-muted-foreground">{issue.impact}</p>
                            </div>
                            <div>
                              <h5 className="font-semibold text-sm mb-2">Solution</h5>
                              <p className="text-sm text-muted-foreground">{issue.solution}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <span>
                                Priority:{" "}
                                <Badge variant="outline" className="text-xs">
                                  #{issue.priority}
                                </Badge>
                              </span>
                              <span>
                                Est. Time:{" "}
                                <Badge variant="secondary" className="text-xs">
                                  {issue.estimatedTime}
                                </Badge>
                              </span>
                            </div>
                            <div className="text-muted-foreground">Affected: {issue.affectedPages.join(", ")}</div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-6">
                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.entries(auditResult.technicalDetails.pageSpeed).map(([metric, value]) => (
                        <div key={metric} className="flex items-center justify-between p-3 border rounded">
                          <span className="text-sm font-medium capitalize">
                            {metric.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <Badge variant="outline">{value}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* SEO Technical Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      SEO Technical Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3">Meta Tags</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Title Tags Found:</span>
                            <span>{auditResult.technicalDetails.seoMetrics.titleTags.found}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Missing:</span>
                            <span className="text-red-500">
                              {auditResult.technicalDetails.seoMetrics.titleTags.missing}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duplicate:</span>
                            <span className="text-yellow-500">
                              {auditResult.technicalDetails.seoMetrics.titleTags.duplicate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Headings</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>H1 Tags:</span>
                            <span>{auditResult.technicalDetails.seoMetrics.headings.h1}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>H2 Tags:</span>
                            <span>{auditResult.technicalDetails.seoMetrics.headings.h2}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>H3 Tags:</span>
                            <span>{auditResult.technicalDetails.seoMetrics.headings.h3}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Issues:</span>
                            <span className="text-red-500">
                              {auditResult.technicalDetails.seoMetrics.headings.issues}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Links & Images</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Internal Links:</span>
                            <span>{auditResult.technicalDetails.seoMetrics.internalLinks}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>External Links:</span>
                            <span>{auditResult.technicalDetails.seoMetrics.externalLinks}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Images with Alt:</span>
                            <span className="text-green-500">
                              {auditResult.technicalDetails.seoMetrics.images.withAlt}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Missing Alt:</span>
                            <span className="text-red-500">
                              {auditResult.technicalDetails.seoMetrics.images.withoutAlt}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Security Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>HTTPS Enabled:</span>
                          <Badge
                            variant={auditResult.technicalDetails.security.httpsEnabled ? "default" : "destructive"}
                          >
                            {auditResult.technicalDetails.security.httpsEnabled ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>SSL Grade:</span>
                          <Badge variant="secondary">{auditResult.technicalDetails.security.sslGrade}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Security Headers:</span>
                          <Badge variant="outline">{auditResult.technicalDetails.security.securityHeaders}/8</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Vulnerabilities:</span>
                          <Badge
                            variant={
                              auditResult.technicalDetails.security.vulnerabilities === 0 ? "default" : "destructive"
                            }
                          >
                            {auditResult.technicalDetails.security.vulnerabilities}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3">Last Security Scan</h5>
                        <p className="text-sm text-muted-foreground">
                          {new Date(auditResult.technicalDetails.security.lastScan).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="competitor" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Competitive Analysis
                    </CardTitle>
                    <CardDescription>
                      Bagaimana performa website Anda dibandingkan dengan rata-rata industri
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {auditResult.competitorComparison.betterThan}%
                        </div>
                        <p className="text-muted-foreground">
                          Your website performs better than {auditResult.competitorComparison.betterThan}% of similar
                          websites
                        </p>
                      </div>

                      <div className="space-y-4">
                        {Object.entries(auditResult.competitorComparison.categories).map(([category, scores]) => (
                          <div key={category} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium capitalize">{category}</span>
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-muted-foreground">
                                  You: <span className={getScoreColor(scores.you)}>{scores.you}</span>
                                </span>
                                <span className="text-sm text-muted-foreground">Average: {scores.average}</span>
                              </div>
                            </div>
                            <div className="relative">
                              <Progress value={(scores.you / 100) * 100} className="h-2" />
                              <div
                                className="absolute top-0 h-2 w-1 bg-gray-400 rounded"
                                style={{ left: `${scores.average}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Priority Action Plan
                    </CardTitle>
                    <CardDescription>
                      Rekomendasi berdasarkan prioritas dan dampak terhadap performa website
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {auditResult.issues
                        .sort((a, b) => a.priority - b.priority)
                        .slice(0, 5)
                        .map((issue, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  Priority #{issue.priority}
                                </Badge>
                                <Badge variant={getSeverityBadge(issue.severity)} className="text-xs">
                                  {issue.severity}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{issue.message}</p>
                            <div className="mt-2 text-sm">
                              <h6 className="font-semibold">Rekomendasi:</h6>
                              <p className="text-muted-foreground">{issue.solution}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="export" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Download className="w-5 h-5 mr-2" />
                      Export Report
                    </CardTitle>
                    <CardDescription>Download hasil audit dalam format PDF atau CSV</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Pilih format yang Anda inginkan untuk mendownload laporan audit website.
                    </p>
                    <div className="flex space-x-4">
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download CSV
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
