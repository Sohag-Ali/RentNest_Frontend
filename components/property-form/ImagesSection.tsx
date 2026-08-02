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
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, PlusIcon, Trash2Icon, StarIcon } from "lucide-react";

interface ImagesSectionProps {
  form: UseFormReturn<any>;
}

export function ImagesSection({ form }: ImagesSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const mainImageUrl = form.watch("mainImage");

  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="border-b border-border/40 bg-muted/20 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <ImageIcon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Property Media & Gallery</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Add cover photo URL and high-resolution photo URLs for the gallery.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Main Cover Image URL */}
        <div className="space-y-3">
          <FormField
            control={form.control as any}
            name="mainImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>Main Banner Image URL <span className="text-destructive">*</span></span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="mainImage"
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    className="bg-background"
                  />
                </FormControl>
                <FormDescription className="text-[11px] text-muted-foreground">
                  Primary cover image displayed on luxury card listings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Main Image Preview */}
          {mainImageUrl && (
            <div className="relative w-full max-w-sm h-48 rounded-xl overflow-hidden border border-border shadow-inner bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mainImageUrl}
                alt="Main Property Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded-md text-[10px] text-white font-medium flex items-center gap-1">
                <StarIcon className="h-3 w-3 text-amber-400 fill-amber-400" />
                Cover Photo
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border/40 pt-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Gallery Images Array <span className="text-destructive">*</span>
              </h4>
              <p className="text-xs text-muted-foreground">
                Add multiple high-res URLs for bedroom, kitchen, and exterior views.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ url: "" })}
              className="gap-1.5 border-dashed border-primary/50 text-primary hover:bg-primary/5"
            >
              <PlusIcon className="h-4 w-4" />
              Add More Images
            </Button>
          </div>

          {/* Dynamic Image Fields */}
          <div className="space-y-3">
            {fields.map((fieldItem, index) => {
              const currentUrl = form.watch(`images.${index}.url`);

              return (
                <div
                  key={fieldItem.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-lg border border-border/60 bg-muted/10 hover:bg-muted/20 transition-colors"
                >
                  {/* Thumbnail snippet if available */}
                  <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center shrink-0 overflow-hidden border border-border">
                    {currentUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={currentUrl}
                        alt={`Gallery preview ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-muted-foreground/50" />
                    )}
                  </div>

                  <div className="flex-1 w-full">
                    <FormField
                      control={form.control as any}
                      name={`images.${index}.url`}
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormControl>
                            <Input
                              {...field}
                              id={`images.${index}.url`}
                              type="url"
                              placeholder="https://images.unsplash.com/photo-..."
                              className="bg-background h-9 text-xs"
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={fields.length <= 1}
                    onClick={() => remove(index)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 h-9 w-9"
                    title="Remove Image"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
          {(form.formState.errors.images?.root as any)?.message && (
            <p className="text-xs font-medium text-destructive mt-1">
              {(form.formState.errors.images?.root as any)?.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
