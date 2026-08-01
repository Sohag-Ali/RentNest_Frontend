"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminUser, updateUserStatus } from "../_actions/admin-user.actions"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  Loader2Icon,
  UserCheckIcon,
} from "lucide-react"
import { toast } from "sonner"

interface UpdateStatusDialogProps {
  user: AdminUser | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

/**
 * UpdateStatusDialog Component (Client Component)
 * 
 * Why this file exists:
 * Shadcn Confirmation Dialog modal allowing Admins to select and confirm status updates (ACTIVE, INACTIVE, BANNED).
 * Executes PATCH /api/admin/users/:id, triggers toast, closes modal, and refreshes route without full browser reload.
 */
export function UpdateStatusDialog({
  user,
  open,
  onOpenChange,
  onSuccess,
}: UpdateStatusDialogProps) {
  const router = useRouter()
  const [selectedStatus, setSelectedStatus] = useState<string>("ACTIVE")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Keep selected status aligned with user's current status when modal opens
  useEffect(() => {
    if (user) {
      setSelectedStatus(user.status || "ACTIVE")
    }
  }, [user])

  if (!user) return null

  const handleConfirm = async () => {
    if (selectedStatus === user.status) {
      toast.info(`User status is already ${selectedStatus}`)
      onOpenChange(false)
      return
    }

    try {
      setIsSubmitting(true)
      const res = await updateUserStatus(user.id, selectedStatus)

      if (res.success) {
        toast.success(`User status updated to ${selectedStatus}`)
        // Refresh client router payload without triggering full browser reload
        router.refresh()
        if (onSuccess) onSuccess()
        onOpenChange(false)
      } else {
        toast.error(res.message || "Failed to update user status.")
      }
    } catch (err: any) {
      console.error("Error updating user status:", err)
      toast.error(err?.message || "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl p-6 bg-card border-border/80 shadow-2xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
            <UserCheckIcon className="h-5 w-5 text-primary" />
            Update User Status
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Confirm account status change for <span className="font-bold text-foreground">{user.name}</span> ({user.email}).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3 text-xs">
          {/* Current Status Display */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/40">
            <span className="text-muted-foreground font-semibold">Current Status:</span>
            {user.status === "ACTIVE" ? (
              <Badge variant="success" className="gap-1 text-xs px-2.5 py-0.5">
                <CheckCircle2Icon className="h-3.5 w-3.5 text-emerald-500" />
                ACTIVE
              </Badge>
            ) : user.status === "BANNED" ? (
              <Badge variant="destructive" className="gap-1 text-xs px-2.5 py-0.5">
                <XCircleIcon className="h-3.5 w-3.5" />
                BANNED
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="gap-1 text-xs px-2.5 py-0.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
              >
                <ClockIcon className="h-3.5 w-3.5" />
                INACTIVE
              </Badge>
            )}
          </div>

          {/* New Status Select Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">New Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-11 text-xs font-semibold rounded-2xl border border-border/60 bg-background px-3.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="ACTIVE">ACTIVE (Green)</option>
              <option value="INACTIVE">INACTIVE (Yellow)</option>
              <option value="BANNED">BANNED (Red)</option>
            </select>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="rounded-2xl h-10 text-xs font-bold"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="rounded-2xl h-10 text-xs font-bold gap-2 bg-primary text-primary-foreground shadow-md"
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="h-4 w-4 animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <span>Confirm</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
