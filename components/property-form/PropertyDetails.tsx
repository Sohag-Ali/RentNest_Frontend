"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormValues } from "@/schemas/property.schema";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSignIcon, HomeIcon, BedIcon, BathIcon, Maximize2Icon, CalendarIcon } from "lucide-react";

interface PropertyDetailsProps {
  form: UseFormReturn<any>;
}

export function PropertyDetails({ form }: PropertyDetailsProps) {
  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <HomeIcon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Property Details</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Specify pricing, space metrics, room counts, and construction year.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Rent Price */}
          <FormField
            control={form.control as any}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                  <DollarSignIcon className="h-4 w-4 text-emerald-600" />
                  <span>Monthly Price ($) <span className="text-destructive">*</span></span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground font-semibold text-sm">
                      $
                    </span>
                    <Input
                      {...field}
                      id="price"
                      type="number"
                      placeholder="8200"
                      className="pl-7 bg-background"
                      onChange={(e) => field.onChange(e.target.valueAsNumber || e.target.value)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bedrooms */}
          <FormField
            control={form.control as any}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                  <BedIcon className="h-4 w-4 text-blue-500" />
                  <span>Bedrooms <span className="text-destructive">*</span></span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="bedrooms"
                    type="number"
                    min={0}
                    placeholder="5"
                    className="bg-background"
                    onChange={(e) => field.onChange(e.target.valueAsNumber || e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bathrooms */}
          <FormField
            control={form.control as any}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                  <BathIcon className="h-4 w-4 text-cyan-500" />
                  <span>Bathrooms <span className="text-destructive">*</span></span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="bathrooms"
                    type="number"
                    step="0.5"
                    min={0}
                    placeholder="5"
                    className="bg-background"
                    onChange={(e) => field.onChange(e.target.valueAsNumber || e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Area (SqFt) */}
          <FormField
            control={form.control as any}
            name="areaSqFt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                  <Maximize2Icon className="h-4 w-4 text-amber-500" />
                  <span>Area (SqFt) <span className="text-destructive">*</span></span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="areaSqFt"
                    type="number"
                    placeholder="4500"
                    className="bg-background"
                    onChange={(e) => field.onChange(e.target.valueAsNumber || e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Year Built */}
          <FormField
            control={form.control as any}
            name="overview.yearBuilt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4 text-purple-500" />
                  <span>Year Built <span className="text-destructive">*</span></span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="overview.yearBuilt"
                    type="number"
                    placeholder="2022"
                    className="bg-background"
                    onChange={(e) => field.onChange(e.target.valueAsNumber || e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
