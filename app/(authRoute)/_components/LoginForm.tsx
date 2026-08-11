"use client"

import { useActionState, startTransition, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Eye,
  EyeOff,
  ArrowRight,
  UserCheck,
  Building2,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validations/login.schema"
import { loginAction } from "../_actions/authActions"
import { toast } from "sonner"

const DEMO_ACCOUNTS = [
  {
    role: "Tenant",
    email: "tenant@gmail.com",
    password: "Tenant@123",
    badgeStyle: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20 dark:text-sky-400 dark:border-blue-500/30 hover:bg-blue-500/20",
    icon: UserCheck,
    subtitle: "Renter Portal",
  },
  {
    role: "Landlord",
    email: "landload1@gmail.com",
    password: "Landlord@123",
    badgeStyle: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 hover:bg-emerald-500/20",
    icon: Building2,
    subtitle: "Property Owner",
  },
  {
    role: "Admin",
    email: "admin@gmail.com",
    password: "Admin@123",
    badgeStyle: "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30 hover:bg-purple-500/20",
    icon: ShieldCheck,
    subtitle: "System Admin",
  },
]

const LoginForm = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const [state, formAction, isPending] = useActionState(loginAction, null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (!state) return
    if (state.success) {
      toast.success("Login Successful 🎉", {
        description: "You have been successfully logged in.",
      })
      router.refresh()
      router.push("/")
    } else if (state.message) {
      toast.error("Login Failed", {
        description: state.message,
      })
    }
  }, [state, router])

  const onSubmit = (values: LoginFormValues) => {
    startTransition(() => {
      formAction(values)
    })
  }

  const handleDemoLogin = (email: string, pass: string, roleName: string) => {
    form.setValue("email", email, { shouldValidate: true })
    form.setValue("password", pass, { shouldValidate: true })
    toast.info(`Signing in as ${roleName}...`, {
      description: email,
    })
    startTransition(() => {
      formAction({ email, password: pass })
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {/* Demo Credentials Quick 1-Click Login Box */}
        <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>1-Click Demo Accounts</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              Instant Portal Access
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {DEMO_ACCOUNTS.map((account) => {
              const IconComponent = account.icon
              return (
                <button
                  key={account.role}
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    handleDemoLogin(account.email, account.password, account.role)
                  }
                  className={`group flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer disabled:opacity-50 ${account.badgeStyle}`}
                  title={`Login as ${account.role} (${account.email})`}
                >
                  <IconComponent className="w-4 h-4 mb-1 transition-transform group-hover:scale-110" />
                  <span className="text-xs font-bold leading-tight">{account.role}</span>
                  <span className="text-[9px] font-medium opacity-80 mt-0.5">
                    {account.subtitle}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Email Input */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Input */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Password
                </FormLabel>
                <Link
                  href="#"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-11 rounded-xl pr-10"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
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

        {/* Remember Me */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="rounded-md"
          />
          <Label
            htmlFor="remember"
            className="cursor-pointer text-sm font-medium text-foreground select-none"
          >
            Remember me
          </Label>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isPending}
          variant="gradient"
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl text-base font-semibold"
        >
          {isPending ? "Signing in..." : "Sign In"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm

