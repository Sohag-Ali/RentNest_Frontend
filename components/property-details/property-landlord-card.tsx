"use client"

import React, { useState } from "react"
import { Landlord } from "@/types/property"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2Icon, StarIcon, MessageSquareIcon, PhoneIcon, ShieldCheckIcon, SendIcon } from "lucide-react"

interface PropertyLandlordCardProps {
  landlord: Landlord
}

export function PropertyLandlordCard({ landlord }: PropertyLandlordCardProps) {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isMessageSent, setIsMessageSent] = useState(false)
  const [messageText, setMessageText] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    setIsMessageSent(true)
    setTimeout(() => {
      setIsMessageSent(false)
      setIsContactOpen(false)
      setMessageText("")
    }, 2000)
  }

  return (
    <>
      <Card className="rounded-3xl border-border/80 bg-card p-6 shadow-lg shadow-black/5 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-md">
                <AvatarImage src={landlord.avatar} alt={landlord.name || "Landlord"} />
                <AvatarFallback>{landlord.name ? landlord.name[0] : "L"}</AvatarFallback>
              </Avatar>
              {landlord.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1 rounded-full shadow-xs">
                  <CheckCircle2Icon className="h-4 w-4" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-foreground font-heading">{landlord.name}</h3>
                {landlord.isVerified && (
                  <Badge variant="success" className="text-[10px] px-2 py-0">
                    Verified Host
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Member since {landlord.joinedDate}
              </p>

              {landlord.isSuperhost && (
                <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">
                  <ShieldCheckIcon className="h-3.5 w-3.5" />
                  <span>Superhost</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              onClick={() => setIsContactOpen(true)}
              className="flex-1 sm:flex-initial rounded-xl h-10 px-4 gap-2 bg-primary text-primary-foreground font-semibold text-xs shadow-md"
            >
              <MessageSquareIcon className="h-4 w-4" />
              Send Message
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsContactOpen(true)}
              className="rounded-xl h-10 px-3.5 gap-2 border-input text-xs font-semibold"
            >
              <PhoneIcon className="h-4 w-4 text-muted-foreground" />
              Contact
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50 text-center">
          <div className="p-3 rounded-2xl bg-muted/40 border border-border/30">
            <div className="flex items-center justify-center gap-1 text-sm font-bold text-foreground font-mono">
              <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span>{landlord.rating}</span>
            </div>
            <span className="text-[11px] text-muted-foreground">Rating</span>
          </div>

          <div className="p-3 rounded-2xl bg-muted/40 border border-border/30">
            <div className="text-sm font-bold text-foreground font-mono">{landlord.responseRate}</div>
            <span className="text-[11px] text-muted-foreground">Response Rate</span>
          </div>

          <div className="p-3 rounded-2xl bg-muted/40 border border-border/30">
            <div className="text-sm font-bold text-foreground font-mono truncate">{landlord.responseTime}</div>
            <span className="text-[11px] text-muted-foreground">Response Time</span>
          </div>
        </div>
      </Card>

      {/* Contact Landlord Dialog Modal */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle>Contact {landlord.name}</DialogTitle>
            <DialogDescription>
              Direct inquiry to property landlord. Expect a quick response within 1 hour.
            </DialogDescription>
          </DialogHeader>

          {isMessageSent ? (
            <div className="py-8 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2Icon className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-bold text-foreground">Message Sent Successfully!</h4>
              <p className="text-xs text-muted-foreground">
                {landlord.name} will review your inquiry and get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Direct Email</label>
                <Input value={landlord.email} readOnly className="rounded-xl bg-muted/50 text-xs font-mono" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Phone Number</label>
                <Input value={landlord.phone} readOnly className="rounded-xl bg-muted/50 text-xs font-mono" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Your Message</label>
                <textarea
                  required
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={`Hi ${landlord.name}, I am interested in scheduling a viewing...`}
                  className="w-full rounded-2xl border border-input bg-background p-3 text-xs focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <Button type="submit" className="w-full rounded-xl h-11 font-semibold gap-2">
                <SendIcon className="h-4 w-4" />
                Submit Inquiry
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
