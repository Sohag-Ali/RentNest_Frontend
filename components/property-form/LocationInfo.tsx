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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPinIcon } from "lucide-react";

interface LocationInfoProps {
  form: UseFormReturn<any>;
}

export function LocationInfo({ form }: LocationInfoProps) {
  const handleAddressChange = (val: string) => {
    form.setValue("overview.address", val, { shouldValidate: true });
    updateFullLocationString(val, form.getValues("city"), form.getValues("state"));
  };

  const handleCityChange = (val: string) => {
    form.setValue("overview.city", val, { shouldValidate: true });
    updateFullLocationString(form.getValues("overview.address"), val, form.getValues("state"));
  };

  const handleStateChange = (val: string) => {
    form.setValue("overview.state", val, { shouldValidate: true });
    updateFullLocationString(
      form.getValues("overview.address"),
      form.getValues("city"),
      val
    );
  };

  const updateFullLocationString = (addr: string, city: string, state: string) => {
    const parts = [addr, city, state].filter(Boolean);
    if (parts.length > 0) {
      form.setValue("location", parts.join(", "), { shouldValidate: true });
    }
  };

  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <MapPinIcon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Location & Address</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Specify physical address coordinates, city, state, and regional zip code.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-5">
        {/* Full Address */}
        <FormField
          control={form.control as any}
          name="overview.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">
                Street Address <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="overview.address"
                  placeholder="e.g. 184 Malibu Canyon Rd"
                  className="bg-background"
                  onChange={(e) => {
                    field.onChange(e);
                    handleAddressChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Full Location display/override */}
        <FormField
          control={form.control as any}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">
                Formatted Location String <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="location"
                  placeholder="e.g. 184 Malibu Canyon Rd, Malibu, CA"
                  className="bg-background"
                />
              </FormControl>
              <FormDescription className="text-[11px] text-muted-foreground">
                Displayed as main address line on property listings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City, State, Zip Code Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* City */}
          <FormField
            control={form.control as any}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  City <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="city"
                    placeholder="e.g. Malibu"
                    className="bg-background"
                    onChange={(e) => {
                      field.onChange(e);
                      handleCityChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State */}
          <FormField
            control={form.control as any}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  State / Province <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="state"
                    placeholder="e.g. CA"
                    className="bg-background"
                    onChange={(e) => {
                      field.onChange(e);
                      handleStateChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Zip Code */}
          <FormField
            control={form.control as any}
            name="overview.zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Zip / Postal Code <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="overview.zipCode"
                    placeholder="e.g. 90265"
                    className="bg-background"
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
