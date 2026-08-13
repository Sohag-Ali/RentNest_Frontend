"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Category } from "@/types/category"
import {
  getAdminCategories,
  createAdminCategory,
} from "../../_actions/admin-category.actions"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  PlusIcon,
  SearchIcon,
  FolderTreeIcon,
  Building2Icon,
  Loader2Icon,
  AlertCircleIcon,
  LayersIcon,
  InfoIcon,
  RefreshCwIcon,
  CheckCircle2Icon,
} from "lucide-react"
import { toast } from "sonner"

interface CategoryManagementClientProps {
  initialCategories: Category[]
  initialError?: string | null
}

export function CategoryManagementClient({
  initialCategories,
  initialError = null,
}: CategoryManagementClientProps) {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(initialError)

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [categoryName, setCategoryName] = useState<string>("")
  const [validationError, setValidationError] = useState<string | null>(null)
  const [backendError, setBackendError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Search Filter State
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Fetch Categories from Backend via Server Action
  const handleRefresh = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await getAdminCategories()
      if (res.success) {
        setCategories(res.data || [])
      } else {
        setError(res.message || "Failed to load categories.")
      }
    } catch (err: any) {
      console.error("Error refreshing categories:", err)
      setError("Failed to load categories.")
    } finally {
      setIsLoading(false)
    }
  }

  // Open Modal
  const handleOpenModal = () => {
    setCategoryName("")
    setValidationError(null)
    setBackendError(null)
    setIsModalOpen(true)
  }

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    const trimmed = categoryName.trim()

    if (!trimmed) {
      setValidationError("Category name is required")
      return
    }

    if (trimmed.length > 100) {
      setValidationError("Category name cannot exceed 100 characters")
      return
    }

    setValidationError(null)
    setBackendError(null)
    setIsSubmitting(true)

    try {
      const res = await createAdminCategory(trimmed)

      if (res.success) {
        toast.success(res.message || "Category created successfully")
        // Clear form & close modal
        setCategoryName("")
        setIsModalOpen(false)
        // Refresh router & categories
        router.refresh()
        await handleRefresh()
      } else {
        setBackendError(res.message || "Failed to create category.")
        toast.error(res.message || "Failed to create category.")
      }
    } catch (err: any) {
      console.error("Error creating category:", err)
      const msg = err?.message || "An unexpected error occurred."
      setBackendError(msg)
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter Categories by Search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalProperties = categories.reduce(
    (acc, cat) => acc + (cat.propertiesCount || 0),
    0
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-heading flex items-center gap-2.5">
            <FolderTreeIcon className="h-7 w-7 text-primary" />
            Category Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage property categories for Thikana.
          </p>
        </div>

        <Button
          onClick={handleOpenModal}
          className="rounded-2xl h-11 px-5 font-bold gap-2 bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all"
        >
          <PlusIcon className="h-5 w-5" />
          <span>+ Add Category</span>
        </Button>
      </div>

      {/* Quick Statistics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 rounded-3xl border border-border/60 bg-card shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Categories
            </span>
            <div className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <FolderTreeIcon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold font-heading text-foreground">
            {categories.length}
          </p>
        </Card>

        <Card className="p-5 rounded-3xl border border-border/60 bg-card shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Properties Linked
            </span>
            <div className="h-9 w-9 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Building2Icon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold font-heading text-foreground">
            {totalProperties}
          </p>
        </Card>

        <Card className="p-5 rounded-3xl border border-border/60 bg-card shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              System Status
            </span>
            <div className="h-9 w-9 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2Icon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 pt-1">
            <Badge variant="success" className="px-2 py-0.5 text-xs">
              ACTIVE API
            </Badge>
          </p>
        </Card>
      </div>

      {/* Main Content Area */}
      <Card className="rounded-3xl border border-border/60 bg-card shadow-sm p-6 space-y-6">
        {/* Search & Refresh Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search category name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 rounded-2xl border-border/60 bg-background text-xs font-medium focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="rounded-2xl h-10 text-xs font-semibold gap-2 self-end sm:self-auto"
          >
            <RefreshCwIcon
              className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh List
          </Button>
        </div>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-2xl border border-border/40"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-2xl" />
                  <Skeleton className="h-4 w-40 rounded-md" />
                </div>
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          /* ERROR STATE */
          <div className="py-12 text-center space-y-4">
            <div className="h-14 w-14 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
              <AlertCircleIcon className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-heading text-foreground">
                Failed to load categories.
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                {error}
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              className="rounded-2xl h-10 px-5 text-xs font-bold gap-2 bg-primary text-primary-foreground shadow"
            >
              <RefreshCwIcon className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        ) : filteredCategories.length === 0 ? (
          /* EMPTY STATE */
          <div className="py-16 text-center space-y-4">
            <div className="h-16 w-16 rounded-3xl bg-muted/60 text-muted-foreground flex items-center justify-center mx-auto">
              <LayersIcon className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-heading text-foreground">
                No Categories Found
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                {searchQuery
                  ? `No category matching "${searchQuery}".`
                  : "Create your first property category to get started."}
              </p>
            </div>
            {!searchQuery && (
              <Button
                onClick={handleOpenModal}
                className="rounded-2xl h-10 px-5 text-xs font-bold gap-2 bg-primary text-primary-foreground shadow"
              >
                <PlusIcon className="h-4 w-4" />
                Create Category
              </Button>
            )}
          </div>
        ) : (
          /* CATEGORY LIST TABLE */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/60 text-muted-foreground font-semibold">
                  <th className="pb-3 px-4 font-bold">Category</th>
                  <th className="pb-3 px-4 font-bold">Properties</th>
                  <th className="pb-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="hover:bg-muted/40 transition-colors group"
                  >
                    {/* 1. Category Name */}
                    <td className="py-4 px-4 font-medium text-foreground">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                          {category.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-foreground text-sm">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    {/* 2. Properties Count */}
                    <td className="py-4 px-4 font-medium">
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-muted text-foreground border border-border/60"
                      >
                        <Building2Icon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        {category.propertiesCount || 0}{" "}
                        {category.propertiesCount === 1
                          ? "Property"
                          : "Properties"}
                      </Badge>
                    </td>

                    {/* 3. Actions */}
                    <td className="py-4 px-4 text-right">
                      <Badge
                        variant="outline"
                        className="text-[11px] font-medium text-muted-foreground border-border/60 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1"
                      >
                        <InfoIcon className="h-3 w-3" />
                        Active
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* CREATE CATEGORY MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl p-6 bg-card border-border/80 shadow-2xl">
          <DialogHeader className="space-y-1.5">
            <DialogTitle className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
              <FolderTreeIcon className="h-5 w-5 text-primary" />
              Create New Category
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Add a new property category to Thikana.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {/* Backend Error Alert */}
            {backendError && (
              <div className="p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold flex items-center gap-2.5">
                <AlertCircleIcon className="h-4 w-4 shrink-0" />
                <span>{backendError}</span>
              </div>
            )}

            {/* Form Input */}
            <div className="space-y-2">
              <Label
                htmlFor="categoryName"
                className="text-xs font-bold text-foreground"
              >
                Category Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="categoryName"
                type="text"
                placeholder="e.g. Apartment"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value)
                  if (validationError) setValidationError(null)
                  if (backendError) setBackendError(null)
                }}
                disabled={isSubmitting}
                className={`h-11 rounded-2xl text-xs font-medium border ${
                  validationError
                    ? "border-destructive focus-visible:ring-destructive"
                    : "border-border/60 focus-visible:ring-primary"
                }`}
                autoFocus
              />
              {validationError && (
                <p className="text-[11px] font-semibold text-destructive flex items-center gap-1">
                  <AlertCircleIcon className="h-3 w-3" />
                  {validationError}
                </p>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="rounded-2xl h-10 text-xs font-bold"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-2xl h-10 text-xs font-bold gap-2 bg-primary text-primary-foreground shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create Category</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
