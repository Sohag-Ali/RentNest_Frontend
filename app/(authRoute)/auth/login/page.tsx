
import {  Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import LoginForm from '../../_components/LoginForm';

export default function LoginPage() {

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Left side - Branding & Illustration (Desktop only) */}
        <div className="hidden lg:flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 w-fit">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">RentNest</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-foreground leading-tight text-balance">
                Welcome to your rental home
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Find the perfect property, connect with landlords, and manage your rental experience all in one place.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">10k+</div>
                <p className="text-sm text-muted-foreground">Properties Listed</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">50k+</div>
                <p className="text-sm text-muted-foreground">Active Renters</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">100+</div>
                <p className="text-sm text-muted-foreground">Cities Covered</p>
              </div>
            </div>
          </div>

          {/* Illustration placeholder */}
          <div className="relative h-96 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5 bg-grid" />
            <div className="relative text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20" />
              <p className="text-muted-foreground text-sm">Beautiful rental homes await</p>
            </div>
          </div>
        </div>

        {/* Right side - Login Card */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Mobile logo - visible on mobile only */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">RentNest</span>
          </div>

          <Card className="border-0 shadow-lg backdrop-blur-sm bg-card/95">
            <CardContent className="space-y-6 pt-8">
              
              {/* Header */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
                <p className="text-sm text-muted-foreground">
                  Sign in to access your rental dashboard
                </p>
              </div>

             <LoginForm />

              {/* Divider */}
              <div className="relative">
                <Separator className="bg-border" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  OR
                </div>
              </div>

              {/* Google Login */}
              <Button 
                variant="outline" 
                className="w-full h-11 border-input hover:bg-accent/50 text-foreground font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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

              {/* Sign Up Link */}
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link 
                  href="#" 
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </p>

            </CardContent>
          </Card>

          {/* Privacy & Terms */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing in, you agree to our{' '}
            <Link href="#" className="text-primary/70 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="#" className="text-primary/70 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
