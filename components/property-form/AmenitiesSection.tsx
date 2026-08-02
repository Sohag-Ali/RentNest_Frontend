"use client";

import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
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
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon, PlusIcon, Trash2Icon, CheckIcon } from "lucide-react";

interface AmenitiesSectionProps {
  form: UseFormReturn<any>;
}

const PRESET_AMENITIES = [
  "Private Beach Access",
  "Infinity Pool",
  "Sauna & Spa",
  "High-Speed Wi-Fi",
  "Fireplace",
  "Garden / Courtyard",
  "Security System",
  "Air Conditioning",
  "Garage Parking",
  "Gym / Fitness Center",
  "Balcony",
  "Pet Friendly",
  "Solar Power",
  "Smart Home System",
];

export function AmenitiesSection({ form }: AmenitiesSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "amenities",
  });

  const currentAmenities = form.watch("amenities") || [];
  const currentNames = currentAmenities.map((a: any) => a.name);

  const togglePresetAmenity = (name: string) => {
    const existingIndex = currentNames.indexOf(name);
    if (existingIndex >= 0) {
      remove(existingIndex);
    } else {
      append({ name });
    }
  };

  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <SparklesIcon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Property Amenities</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Highlight key feature offerings, luxury additions, and resident conveniences.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Preset Quick-Add Badges */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2.5">
            Quick Add Popular Amenities
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_AMENITIES.map((preset) => {
              const isSelected = currentNames.includes(preset);
              return (
                <Badge
                  key={preset}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => togglePresetAmenity(preset)}
                  className={`cursor-pointer transition-all px-3 py-1.5 text-xs flex items-center gap-1.5 select-none ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isSelected ? (
                    <CheckIcon className="h-3 w-3" />
                  ) : (
                    <PlusIcon className="h-3 w-3 opacity-60" />
                  )}
                  {preset}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Custom Dynamic Amenities List */}
        <div className="border-t border-border/40 pt-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">
              Selected Amenities List ({fields.length}) <span className="text-destructive">*</span>
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "" })}
              className="gap-1.5 border-dashed border-primary/50 text-primary hover:bg-primary/5"
            >
              <PlusIcon className="h-4 w-4" />
              Add Custom Amenity
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fields.map((fieldItem, index) => (
              <div
                key={fieldItem.id}
                className="flex items-center gap-2 p-2 rounded-lg border border-border/60 bg-muted/10"
              >
                <FormField
                  control={form.control as any}
                  name={`amenities.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex-1 space-y-0">
                      <FormControl>
                        <Input
                          {...field}
                          id={`amenities.${index}.name`}
                          placeholder="e.g. Private Beach Access"
                          className="bg-background h-9 text-xs"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={fields.length <= 1}
                  onClick={() => remove(index)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 h-8 w-8"
                  title="Remove Amenity"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          {(form.formState.errors.amenities?.root as any)?.message && (
            <p className="text-xs font-medium text-destructive mt-1">
              {(form.formState.errors.amenities?.root as any)?.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
