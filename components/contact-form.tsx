"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Website Development",
    budget: "< Rp 5.000.000",
    message: "",
    newsletter: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  type SubmitStatus = {
    type: "success" | "error"
    message: string
    whatsappUrl?: string
  } | null

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone) {
      setSubmitStatus({ type: "error", message: "Lengkapi semua field yang diperlukan" })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: "error", message: "Format email tidak valid" })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate WhatsApp message
      const message = `Halo BikinAja.id, saya tertarik dengan layanan Anda:

Nama: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Layanan: ${formData.service}
Budget: ${formData.budget}
Pesan: ${formData.message}

${formData.newsletter ? "✓ Subscribe newsletter" : ""}

Mohon informasi lebih lanjut. Terima kasih!`

      const whatsappUrl = `https://wa.me/6281227529614?text=${encodeURIComponent(message)}`

      setSubmitStatus({
        type: "success",
        message: "Pesan berhasil dikirim! Anda akan dialihkan ke WhatsApp.",
        whatsappUrl,
      })

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "Website Development",
          budget: "< Rp 5.000.000",
          message: "",
          newsletter: false,
        })
        setSubmitStatus(null)
      }, 3000)
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear status when user starts typing
    if (submitStatus) setSubmitStatus(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kirim Pesan</CardTitle>
        <CardDescription>
          Isi form di bawah ini dan kami akan segera menghubungi Anda dalam waktu kurang dari 1 jam
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Masukkan nama Anda"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Nomor WhatsApp <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="+62 812-3456-7890"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Jenis Layanan</label>
              <select
                className="w-full p-3 border rounded-md bg-background"
                value={formData.service}
                onChange={(e) => handleInputChange("service", e.target.value)}
              >
                <option value="Website Development">Website Development</option>
                <option value="Android App Development">Android App Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Maintenance & Support">Maintenance & Support</option>
                <option value="Konsultasi">Konsultasi</option>
                <option value="Bundle Package">Bundle Package</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Budget Range</label>
              <select
                className="w-full p-3 border rounded-md bg-background"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
              >
                <option value="< Rp 5.000.000">&lt; Rp 5.000.000</option>
                <option value="Rp 5.000.000 - Rp 10.000.000">Rp 5.000.000 - Rp 10.000.000</option>
                <option value="Rp 10.000.000 - Rp 20.000.000">Rp 10.000.000 - Rp 20.000.000</option>
                <option value="> Rp 20.000.000">&gt; Rp 20.000.000</option>
                <option value="Belum ada budget spesifik">Belum ada budget spesifik</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Pesan <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Ceritakan tentang proyek yang ingin Anda buat... (min. 20 karakter)"
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
              minLength={20}
            />
            <div className="text-xs text-muted-foreground mt-1">{formData.message.length}/20 karakter minimum</div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="newsletter"
              checked={formData.newsletter}
              onChange={(e) => handleInputChange("newsletter", e.target.checked)}
              className="rounded"
            />
            <label htmlFor="newsletter" className="text-sm">
              Subscribe newsletter untuk tips & update terbaru (opsional)
            </label>
          </div>

          {/* Submit Status */}
          {submitStatus && (
            <div
              className={`p-4 rounded-lg flex items-center space-x-2 ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {submitStatus.type === "success" ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-medium">{submitStatus.message}</p>
                {submitStatus.whatsappUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                    onClick={() => window.open(submitStatus.whatsappUrl, "_blank")}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Buka WhatsApp
                  </Button>
                )}
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={
              isSubmitting || !formData.name || !formData.email || !formData.phone || formData.message.length < 20
            }
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Mengirim Pesan...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Kirim Pesan
              </>
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>Atau hubungi langsung:</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = "mailto:hello@bikinaja.id")}
              >
                Email
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
