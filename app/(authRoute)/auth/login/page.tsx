import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import LoginForm from '../../_components/LoginForm';
import GoogleLoginButton from '../../_components/GoogleLoginButton';

export const metadata = {
  title: 'Sign In | Thikana',
  description: 'Sign in to your Thikana account to manage property rentals, applications, and saved homes.',
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-[450px] mx-auto my-auto">
      <Card className="rounded-3xl bg-white dark:bg-[#0d1422] border border-slate-200/80 dark:border-slate-800/90 shadow-subtle-saas dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        <CardContent className="space-y-6 p-6 sm:p-8">
          {/* Header & Subtitle */}
          <div className="space-y-1.5 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome Back 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Login to continue to your account
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Divider */}
          <div className="relative my-4">
            <Separator className="bg-slate-200 dark:bg-slate-800" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#0d1422] px-3 text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest select-none">
              OR
            </div>
          </div>

          {/* Google Login Button */}
          <GoogleLoginButton />

          {/* Account Creation Switch */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-1">
            Don&apos;t have an account?{' '}
            <Link 
              href="/auth/register" 
              className="text-[#0EA5E9] dark:text-sky-400 hover:underline font-bold"
            >
              Create Account
            </Link>
          </p>

          {/* Back to Home Link */}
          <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800/60">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
