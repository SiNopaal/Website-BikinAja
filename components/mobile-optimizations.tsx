"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, Wifi, WifiOff } from "lucide-react"

interface MobileOptimizationsProps {
  children: ReactNode
}

export function MobileOptimizations({ children }: MobileOptimizationsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    // Online/offline detection
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Prevent zoom on input focus (mobile)
    const preventZoom = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        target.style.fontSize = "16px"
      }
    }

    // Add event listeners
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    document.addEventListener("focusin", preventZoom)

    // Initial check
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      document.removeEventListener("focusin", preventZoom)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="relative">
      {children}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button size="icon" className="fixed bottom-20 right-4 z-40 rounded-full shadow-lg" onClick={scrollToTop}>
          <ArrowUp className="w-4 h-4" />
        </Button>
      )}

      {/* Online/Offline Indicator */}
      <div
        className={`fixed top-20 right-4 z-40 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
          isOnline ? "bg-green-500 text-white" : "bg-red-500 text-white animate-pulse"
        }`}
      >
        <div className="flex items-center space-x-1">
          {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          <span>{isOnline ? "Online" : "Offline"}</span>
        </div>
      </div>

      {/* Mobile-specific styles */}
      <style jsx global>{`
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        /* Touch-friendly tap targets */
        button, a, input, textarea, select {
          min-height: 44px;
          min-width: 44px;
        }

        /* Prevent horizontal scroll */
        body {
          overflow-x: hidden;
        }

        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: hsl(var(--primary));
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.8);
        }

        /* Floating animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: -2s;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          /* Larger touch targets on mobile */
          button, a {
            min-height: 48px;
            padding: 12px 16px;
          }

          /* Better spacing for mobile */
          .container {
            padding-left: 16px;
            padding-right: 16px;
          }

          /* Prevent text selection on touch */
          .no-select {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .bg-muted {
            background-color: hsl(var(--background));
            border: 1px solid hsl(var(--border));
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
