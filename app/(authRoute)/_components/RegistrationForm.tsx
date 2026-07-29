"use client"

import { useActionState, startTransition, useEffect, useState } from "react"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { registerAction } from "../_actions/authActions"
import { toast } from "sonner"

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [state, formAction, isPending] = useActionState(registerAction, null);

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

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success("Registration Successful 🎉", {
        description: "Your account has been created successfully. You can now sign in to RentNest.",
      })
      form.reset();
    } else if (state.message) {
      toast.error("Registration Failed", {
        description: state.message,
      })
    }
  }, [state, form]);

  const onSubmit = (values: RegisterFormData) => {
    const { confirmPassword, ...payload } = values
    startTransition(() => {
      formAction(payload)
    })
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
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  <div className="flex cursor-pointer items-center space-x-3 rounded-lg border border-white/10 bg-background/50 p-3 transition-colors hover:bg-background/75">
                    <RadioGroupItem value="TENANT" id="tenant" />
                    <Label
                      htmlFor="tenant"
                      className="flex-1 cursor-pointer space-y-1"
                    >
                      <div className="text-sm font-medium text-foreground">
                        I&apos;m a Tenant
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Looking for rental properties
                      </p>
                    </Label>
                  </div>
                  <div className="flex cursor-pointer items-center space-x-3 rounded-lg border border-white/10 bg-background/50 p-3 transition-colors hover:bg-background/75">
                    <RadioGroupItem value="LANDLORD" id="landlord" />
                    <Label
                      htmlFor="landlord"
                      className="flex-1 cursor-pointer space-y-1"
                    >
                      <div className="text-sm font-medium text-foreground">
                        I&apos;m a Landlord
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Managing rental properties
                      </p>
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
                    className="h-11 border-white/10 bg-background/50 pr-10 placeholder:text-muted-foreground/50 focus:border-primary/50"
                    {...field}
                  />
                </FormControl>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
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

        <p className="text-center text-xs text-muted-foreground">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>

        <Button
          type="submit"
          disabled={isPending}
          className="group h-11 w-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold text-white transition-all duration-200 hover:from-blue-600 hover:to-cyan-600"
        >
          {isPending ? "Creating Account..." : "Create Account"}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
    </Form>
  )
}

export default RegistrationForm
