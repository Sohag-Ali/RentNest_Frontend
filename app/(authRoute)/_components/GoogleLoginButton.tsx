"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Script from "next/script"
import { googleLoginAction } from "../_actions/authActions"

export interface GISInitConfig {
  client_id: string
  callback: (response: { credential?: string }) => void
  auto_select?: boolean
  cancel_on_tap_outside?: boolean
}

export interface GISNotification {
  isNotDisplayed: () => boolean
  isSkippedMoment: () => boolean
  isDismissedMoment: () => boolean
  getDismissedReason?: () => string
  getNotDisplayedReason?: () => string
}

export interface GISRenderOptions {
  theme?: string
  size?: string
  text?: string
  width?: string
  shape?: string
  logo_alignment?: string
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GISInitConfig) => void
          renderButton: (element: HTMLElement | null, options: GISRenderOptions) => void
          prompt: (momentListener?: (notification: GISNotification) => void) => void
          cancel: () => void
        }
      }
    }
  }
}

export default function GoogleLoginButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const gisButtonRef = useRef<HTMLDivElement>(null)

  const clientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "495377808950-kodll7u5cku8u2fr2d0cmk2r6pccd598.apps.googleusercontent.com"

  const handleCredentialResponse = useCallback(
    async (response: { credential?: string }) => {
      if (!response || !response.credential) {
        toast.error("Google Login Failed", {
          description: "Google did not return a valid authentication credential.",
        })
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      try {
        const result = await googleLoginAction(response.credential)

        if (result?.success) {
          toast.success("Login Successful 🎉", {
            description: "You have been logged in with Google.",
          })
          router.refresh()

          const userRole = (result.data?.user?.role || "").toUpperCase()

          if (userRole === "TENANT") {
            router.push("/dashboard/tenant")
          } else if (userRole === "LANDLORD") {
            router.push("/dashboard/landlord")
          } else if (userRole === "ADMIN") {
            router.push("/dashboard/admin")
          } else {
            router.push("/dashboard/tenant")
          }
        } else {
          setIsLoading(false)
          const status = result?.statusCode
          if (status === 400) {
            toast.error("Google Login Failed", {
              description: result?.message || "Invalid Google credential provided.",
            })
          } else if (status === 401) {
            toast.error("Authentication Failed", {
              description: result?.message || "Google authentication failed.",
            })
          } else if (status === 403) {
            toast.error("Access Denied", {
              description: result?.message || "Your account is not authorized to sign in.",
            })
          } else if (status === 500) {
            toast.error("Server Error", {
              description: "A server error occurred during Google sign-in. Please try again later.",
            })
          } else {
            toast.error("Google Sign-In Failed", {
              description: result?.message || "Could not complete sign in with Google.",
            })
          }
        }
      } catch (err: unknown) {
        setIsLoading(false)
        const errorMessage =
          err instanceof Error ? err.message : "Failed to communicate with authentication server."
        toast.error("Network Error", {
          description: errorMessage,
        })
      }
    },
    [router]
  )

  const initGoogleGIS = useCallback(() => {
    if (!window.google?.accounts?.id || !clientId) return

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      })

      if (gisButtonRef.current) {
        gisButtonRef.current.innerHTML = ""
        window.google.accounts.id.renderButton(gisButtonRef.current, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          width: "100%",
          shape: "rectangular",
          logo_alignment: "center",
        })
      }
    } catch (e) {
      console.error("Failed to initialize Google GIS:", e)
    }
  }, [clientId, handleCredentialResponse])

  useEffect(() => {
    if (window.google?.accounts?.id) {
      initGoogleGIS()
    }
  }, [initGoogleGIS])

  const handleCustomButtonClick = () => {
    if (isLoading) return
    setIsLoading(true)

    if (window.google?.accounts?.id) {
      initGoogleGIS()

      window.google.accounts.id.prompt((notification: GISNotification) => {
        if (
          notification.isNotDisplayed() ||
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          const dismissedReason = notification.getDismissedReason?.()

          if (dismissedReason === "cancel" || dismissedReason === "flow_restarted") {
            setIsLoading(false)
          } else if (gisButtonRef.current) {
            const innerBtn = gisButtonRef.current.querySelector(
              "div[role=button], iframe, button"
            ) as HTMLElement | null
            if (innerBtn) {
              innerBtn.click()
            } else {
              setIsLoading(false)
            }
          } else {
            setIsLoading(false)
          }
        }
      })

      setTimeout(() => {
        setIsLoading(false)
      }, 10000)
    } else {
      setIsLoading(false)
      toast.error("Google SDK Not Ready", {
        description: "Google Sign-In service is loading. Please try again in a moment.",
      })
    }
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          initGoogleGIS()
        }}
      />

      {/* Hidden GIS container where Google renders its official button iframe */}
      <div ref={gisButtonRef} className="hidden" aria-hidden="true" />

      <Button
        type="button"
        variant="outline"
        disabled={isLoading}
        onClick={handleCustomButtonClick}
        className="w-full h-11 border-border bg-background hover:bg-muted text-foreground font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span>Signing in with Google...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-1 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </>
        )}
      </Button>
    </>
  )
}
