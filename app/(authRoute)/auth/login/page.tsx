import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import LoginForm from '../../_components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-24 sm:pt-28 pb-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left side - Branding & Illustration (Desktop only) */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-center space-y-8 pr-6">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-foreground tracking-tight">RentNest</span>
            </Link>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-black text-foreground tracking-tight leading-[1.12]">
                Welcome back to your{' '}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 bg-clip-text text-transparent">
                  Rental Portal
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Access your verified property listings, manage tenant applications, review rental agreements, and make secure payments.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="space-y-1 p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="text-2xl font-extrabold text-primary">10k+</div>
                <p className="text-xs text-muted-foreground font-medium">Verified Homes</p>
              </div>
              <div className="space-y-1 p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="text-2xl font-extrabold text-sky-500">50k+</div>
                <p className="text-xs text-muted-foreground font-medium">Happy Renters</p>
              </div>
              <div className="space-y-1 p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
                <div className="text-2xl font-extrabold text-teal-500">100%</div>
                <p className="text-xs text-muted-foreground font-medium">Secure Lease</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Card */}
        <div className="w-full lg:col-span-5 max-w-md mx-auto lg:mx-0">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-sky-500 to-teal-500 flex items-center justify-center text-white shadow-md">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-foreground">RentNest</span>
          </div>

          <Card variant="glass" className="rounded-3xl shadow-luxury">
            <CardContent className="space-y-6 pt-8">
              <div className="space-y-1.5">
                <h2 className="text-2xl font-bold text-foreground tracking-tight">Sign In</h2>
                <p className="text-xs text-muted-foreground">
                  Enter your credentials to access your RentNest account
                </p>
              </div>

              <LoginForm />

              <div className="relative">
                <Separator className="bg-border/60" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  OR
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full h-11 border-border bg-background hover:bg-muted text-foreground font-semibold rounded-xl transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link 
                  href="/auth/register" 
                  className="text-primary hover:underline font-bold"
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
