import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import LoginForm from '../../_components/LoginForm';
import GoogleLoginButton from '../../_components/GoogleLoginButton';
import { ThikanaLogo } from '@/components/shared/ThikanaLogo';

export const metadata = {
  title: 'Sign In | Thikana',
  description: 'Sign in to your Thikana account to manage property rentals, applications, and saved homes.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center px-4 pt-24 sm:pt-28 pb-12 sm:px-6 lg:px-8 relative overflow-hidden border-b border-slate-200/80">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-200/30 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left side - Branding & Illustration (Desktop only) */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-center space-y-8 pr-6">
          <div className="space-y-6">
            <ThikanaLogo size="xl" />
            
            <div className="space-y-4">
              <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Welcome back to your{' '}
                <span className="bg-gradient-to-r from-[#0EA5E9] via-sky-600 to-[#2563EB] bg-clip-text text-transparent">
                  Rental Portal
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Access your verified property listings, manage tenant applications, review rental agreements, and make secure payments.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="space-y-1 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle-saas">
                <div className="text-2xl font-extrabold text-[#0EA5E9]">10k+</div>
                <p className="text-xs text-slate-500 font-medium">Verified Homes</p>
              </div>
              <div className="space-y-1 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle-saas">
                <div className="text-2xl font-extrabold text-[#2563EB]">50k+</div>
                <p className="text-xs text-slate-500 font-medium">Happy Renters</p>
              </div>
              <div className="space-y-1 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle-saas">
                <div className="text-2xl font-extrabold text-[#0EA5E9]">100%</div>
                <p className="text-xs text-slate-500 font-medium">Secure Lease</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Card */}
        <div className="w-full lg:col-span-5 max-w-md mx-auto lg:mx-0">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <ThikanaLogo size="lg" />
          </div>

          <Card className="rounded-3xl bg-white border border-slate-200/80 shadow-subtle-saas">
            <CardContent className="space-y-6 pt-8 p-6 sm:p-8">
              <div className="space-y-1.5">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sign In</h2>
                <p className="text-xs text-slate-500">
                  Enter your credentials to access your Thikana account
                </p>
              </div>

              <LoginForm />

              <div className="relative">
                <Separator className="bg-slate-200" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  OR
                </div>
              </div>

              <GoogleLoginButton />

              <p className="text-center text-xs text-slate-500">
                Don&apos;t have an account?{' '}
                <Link 
                  href="/auth/register" 
                  className="text-[#2563EB] hover:underline font-bold"
                >
                  Create Account
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
