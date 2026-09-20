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
import { useRouter } from "next/navigation"
import { registerSchema } from "@/lib/validations/registration.schema"
import { RegisterFormData } from "@/lib/validations/registration.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { registerAction } from "../_actions/authActions"
import { toast } from "sonner"

const RegistrationForm = () => {
  const router = useRouter()
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
        description: "Your account has been created successfully.",
      })
      form.reset();
      router.refresh();
      router.push("/");
    } else if (state.message) {
      toast.error("Registration Failed", {
        description: state.message,
      })
    }
  }, [state, form, router]);

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
        className="space-y-5"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Full Name</FormLabel>

              <FormControl>
                <Input placeholder="John Doe" className="h-11 rounded-xl bg-white dark:bg-[#070b14]/70 border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-[#0EA5E9]" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Email Address</FormLabel>

              <FormControl>
                <Input type="email" placeholder="you@example.com" className="h-11 rounded-xl bg-white dark:bg-[#070b14]/70 border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-[#0EA5E9]" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Phone Number</FormLabel>

              <FormControl>
                <Input placeholder="017XXXXXXXX" className="h-11 rounded-xl bg-white dark:bg-[#070b14]/70 border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-[#0EA5E9]" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Account Type
              </FormLabel>

              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 gap-3">
                  <div className="flex cursor-pointer items-center space-x-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#070b14]/60 p-3.5 transition-all hover:border-[#0EA5E9]">
                    <RadioGroupItem value="TENANT" id="tenant" />
                    <Label
                      htmlFor="tenant"
                      className="flex-1 cursor-pointer space-y-0.5 select-none"
                    >
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        I&apos;m a Tenant
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Looking for rentals
                      </p>
                    </Label>
                  </div>
                  <div className="flex cursor-pointer items-center space-x-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#070b14]/60 p-3.5 transition-all hover:border-[#0EA5E9]">
                    <RadioGroupItem value="LANDLORD" id="landlord" />
                    <Label
                      htmlFor="landlord"
                      className="flex-1 cursor-pointer space-y-0.5 select-none"
                    >
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        I&apos;m a Landlord
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Managing properties
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
            <FormItem className="space-y-1.5">
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Password
              </FormLabel>

              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 rounded-xl bg-white dark:bg-[#070b14]/70 border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-[#0EA5E9] pr-10"
                    {...field}
                  />
                </FormControl>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
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
            <FormItem className="space-y-1.5">
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Confirm Password
              </FormLabel>

              <div className="relative">
                <FormControl>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 rounded-xl bg-white dark:bg-[#070b14]/70 border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-[#0EA5E9] pr-10"
                    {...field}
                  />
                </FormControl>

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
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

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-1">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-[#0EA5E9] dark:text-sky-400 font-semibold hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-[#0EA5E9] dark:text-sky-400 font-semibold hover:underline">
            Privacy Policy
          </Link>
        </p>

        <Button
          type="submit"
          disabled={isPending}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] hover:from-[#0EA5E9]/90 hover:to-[#2563EB]/90 text-white font-bold text-base shadow-md shadow-sky-500/20 cursor-pointer"
        >
          {isPending ? "Creating Account..." : "Create Account"}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
    </Form>
  )
}

export default RegistrationForm
