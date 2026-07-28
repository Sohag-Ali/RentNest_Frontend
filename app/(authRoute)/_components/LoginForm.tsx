'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { loginSchema, type LoginFormValues } from '@/lib/validations/login.schema';

const LoginForm = () => {

      const [showPassword, setShowPassword] = useState(false);
      const [rememberMe, setRememberMe] = useState(false);
    
      const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: '',
          password: '',
        },
      });
    
      const onSubmit = (values: LoginFormValues) => {
        console.log(values);
      };
    
    return (
         <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  {/* Email Input */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-foreground">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            className="h-11 bg-background border-input placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
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
                          <FormLabel className="text-sm font-medium text-foreground">
                            Password
                          </FormLabel>
                          <Link
                            href="#"
                            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter your password"
                              className="h-11 bg-background border-input placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 pr-10"
                              {...field}
                            />
                          </FormControl>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
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

                  {/* Remember Me */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="border-input"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-medium text-foreground cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </Form>
    );
};

export default LoginForm;