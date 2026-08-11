import React from "react"
import { getAdminCategories } from "../_actions/admin-category.actions"
import { CategoryManagementClient } from "./_components/category-management-client"
import { Category } from "@/types/category"

/**
 * AdminCategoriesPage Component (Server Component)
 * 
 * Why this file exists:
 * Top-level server component for Admin Category Management route (/dashboard/admin/categories).
 * 
 * Why Server Component:
 * Fetches property categories directly on the server via Server Action (GET /api/categories).
 */
export default async function AdminCategoriesPage() {
  // Fetch category list using Server Action
  const response = await getAdminCategories()
  const categories: Category[] = response.data || []
  const initialError = !response.success ? response.message : null

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <CategoryManagementClient
        initialCategories={categories}
        initialError={initialError}
      />
    </div>
  )
}
