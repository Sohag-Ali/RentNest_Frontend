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
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  ShieldCheckIcon,
  DollarSignIcon,
  KeyIcon,
  DogIcon,
  CarIcon,
  CalendarCheckIcon,
  StarIcon,
  CheckCircle2Icon,
} from "lucide-react";

interface OverviewSectionProps {
  form: UseFormReturn<any>;
}

export function OverviewSection({ form }: OverviewSectionProps) {
  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <ShieldCheckIcon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Lease Terms & Overview</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Set security deposit, lease duration, pet permissions, parking, and listing status options.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Deposit Amount */}
          <FormField
            control={form.control as any}
            name="overview.depositAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                  <DollarSignIcon className="h-4 w-4 text-emerald-600" />
                  <span>Deposit Amount (৳) <span className="text-destructive">*</span></span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground font-semibold text-sm">
                      ৳
                    </span>
                    <Input
                      {...field}
                      id="overview.depositAmount"
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

          {/* Available From */}
          <FormField
            control={form.control as any}
            name="overview.availableFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                  <CalendarCheckIcon className="h-4 w-4 text-blue-500" />
                  <span>Available From <span className="text-destructive">*</span></span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="overview.availableFrom"
                    placeholder="e.g. Available Sep 1"
                    className="bg-background"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Lease Term */}
          <FormField
            control={form.control as any}
            name="overview.leaseTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                  <KeyIcon className="h-4 w-4 text-indigo-500" />
                  <span>Lease Duration <span className="text-destructive">*</span></span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="overview.leaseTerm"
                    placeholder="e.g. 12 - 24 Months"
                    className="bg-background"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pet Policy */}
          <FormField
            control={form.control as any}
            name="overview.petPolicy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                  <DogIcon className="h-4 w-4 text-amber-600" />
                  <span>Pet Policy <span className="text-destructive">*</span></span>
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    id="overview.petPolicy"
                    className="bg-background"
                  >
                    <option value="">Select pet policy</option>
                    <option value="Cats Allowed">Cats Allowed</option>
                    <option value="Dogs Allowed">Dogs Allowed</option>
                    <option value="Cats & Dogs Allowed">Cats & Dogs Allowed</option>
                    <option value="Pets Allowed (Subject to Deposit)">
                      Pets Allowed (Subject to Deposit)
                    </option>
                    <option value="No Pets Allowed">No Pets Allowed</option>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Parking Type */}
          <FormField
            control={form.control as any}
            name="overview.parkingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                  <CarIcon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  <span>Parking Type <span className="text-destructive">*</span></span>
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    id="overview.parkingType"
                    className="bg-background"
                  >
                    <option value="">Select parking type</option>
                    <option value="3 Car Attached Garage">3 Car Attached Garage</option>
                    <option value="2 Car Garage">2 Car Garage</option>
                    <option value="Underground Secured Parking">
                      Underground Secured Parking
                    </option>
                    <option value="Private Driveway">Private Driveway</option>
                    <option value="Street Parking">Street Parking</option>
                    <option value="No Parking">No Parking</option>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control as any}
            name="overview.status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                  <CheckCircle2Icon className="h-4 w-4 text-emerald-500" />
                  <span>Listing Status <span className="text-destructive">*</span></span>
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    id="overview.status"
                    className="bg-background"
                  >
                    <option value="">Select listing status</option>
                    <option value="Available">Available</option>
                    <option value="Pending">Pending Approval</option>
                    <option value="Rented">Rented</option>
                    <option value="Maintenance">Under Maintenance</option>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Visibility & Options Section */}
        <div className="border-t border-border/40 pt-5">
          <h4 className="text-sm font-semibold text-foreground mb-4">
            Listing Options & Flags
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Featured Checkbox/Switch */}
            <FormField
              control={form.control as any}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-muted/10 hover:bg-muted/20 transition-colors">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-semibold cursor-pointer flex items-center gap-1.5">
                      <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span>Featured Property</span>
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Promote on homepage banners & featured spotlight sections.
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      id="isFeatured"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Available Checkbox/Switch */}
            <FormField
              control={form.control as any}
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-muted/10 hover:bg-muted/20 transition-colors">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-semibold cursor-pointer flex items-center gap-1.5">
                      <CheckCircle2Icon className="h-4 w-4 text-emerald-500" />
                      <span>Available for Applications</span>
                    </FormLabel>
                    <p className="text-xs text-muted-foreground">
                      Enable direct tenant inquiry & application requests.
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      id="isAvailable"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
