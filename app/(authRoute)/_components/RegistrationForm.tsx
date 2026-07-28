"use client"

import { useState } from "react"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { registerSchema } from "@/lib/validations/registration.schema"
import { RegisterFormData } from "@/lib/validations/registration.schema"
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "TENANT",
    },
  })

  const onSubmit = (values: RegisterFormData) => {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>

              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>

              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>

              <FormControl>
                <Input placeholder="017XXXXXXXX" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium text-foreground">
                Account Type
              </FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-background/50 hover:bg-background/75 transition-colors cursor-pointer">
                    <RadioGroupItem value="TENANT" id="tenant" />
                    <Label htmlFor="tenant" className="flex-1 cursor-pointer space-y-1">
                      <div className="font-medium text-sm text-foreground">I&apos;m a Tenant</div>
                      <p className="text-xs text-muted-foreground">Looking for rental properties</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-background/50 hover:bg-background/75 transition-colors cursor-pointer">
                    <RadioGroupItem value="LANDLORD" id="landlord" />
                    <Label htmlFor="landlord" className="flex-1 cursor-pointer space-y-1">
                      <div className="font-medium text-sm text-foreground">I&apos;m a Landlord</div>
                      <p className="text-xs text-muted-foreground">Managing rental properties</p>
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-foreground">
                Password
              </FormLabel>

              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 bg-background/50 border-white/10 placeholder:text-muted-foreground/50 focus:border-primary/50 pr-10"
                    {...field}
                  />
                </FormControl>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-foreground">
                Confirm Password
              </FormLabel>

              <div className="relative">
                <FormControl>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 border-white/10 bg-background/50 pr-10 placeholder:text-muted-foreground/50 focus:border-primary/50"
                    {...field}
                  />
                </FormControl>

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-xs text-muted-foreground text-center">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>

        <Button
          type="submit"
          className="w-full h-11 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 group"
        >
          Create Account
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>
    </Form>
  )
}

export default RegistrationForm
