"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues, generateSlug } from "@/schemas/property.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Wand2Icon, FileTextIcon } from "lucide-react";

interface BasicInfoProps {
  form: UseFormReturn<any>;
}

const CATEGORIES = [
  { id: "Villa", name: "Villa" },
  { id: "Apartment", name: "Apartment" },
  { id: "House", name: "Single Family House" },
  { id: "Penthouse", name: "Penthouse" },
  { id: "Condo", name: "Condominium" },
  { id: "Studio", name: "Studio Apartment" },
  { id: "Townhouse", name: "Townhouse" },
  { id: "Luxury Estate", name: "Luxury Estate" },
];

export function BasicInfo({ form }: BasicInfoProps) {
  const handleAutoGenerateSlug = () => {
    const title = form.getValues("title");
    if (title) {
      const slug = generateSlug(title);
      form.setValue("slug", slug, { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <FileTextIcon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Basic Information</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Enter primary details, property title, category, and descriptive summaries.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-5">
        {/* Title */}
        <FormField
          control={form.control as any}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold flex items-center justify-between">
                <span>Property Title <span className="text-destructive">*</span></span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="title"
                  placeholder="e.g. Serene Coastal Villa with Private Beach"
                  className="bg-background focus-visible:ring-primary"
                  onChange={(e) => {
                    field.onChange(e);
                    const autoSlug = generateSlug(e.target.value);
                    if (!form.getFieldState("slug").isDirty) {
                      form.setValue("slug", autoSlug, { shouldValidate: true });
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug & Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Slug */}
          <FormField
            control={form.control as any}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-sm font-semibold">
                    URL Slug <span className="text-destructive">*</span>
                  </FormLabel>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleAutoGenerateSlug}
                    className="h-6 text-xs text-primary hover:text-primary/80 gap-1 px-1.5"
                  >
                    <Wand2Icon className="h-3 w-3" />
                    Auto-generate
                  </Button>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    id="slug"
                    placeholder="e.g. serene-coastal-villa-private-beach"
                    className="font-mono text-xs bg-background"
                  />
                </FormControl>
                <FormDescription className="text-[11px] text-muted-foreground">
                  URL path slug used for SEO routing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control as any}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Property Category <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    id="categoryId"
                    className="bg-background"
                  >
                    <option value="">Select property category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Short Description */}
        <FormField
          control={form.control as any}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">
                Short Description <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  id="description"
                  rows={2}
                  placeholder="Provide a concise 1-2 sentence overview of the property..."
                  className="bg-background resize-none"
                />
              </FormControl>
              <FormDescription className="text-[11px] text-muted-foreground">
                Appears in search preview cards and quick summaries.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Detailed Description */}
        <FormField
          control={form.control as any}
          name="detailedDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">
                Detailed Description <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  id="detailedDescription"
                  rows={4}
                  placeholder="Elaborate on luxury features, interior finishings, neighborhood vibe, architectural highlights..."
                  className="bg-background"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
