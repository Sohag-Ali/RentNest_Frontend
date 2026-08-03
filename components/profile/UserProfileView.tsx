'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Globe,
  ShieldCheck,
  Award,
  Star,
  Calendar,
  Edit3,
  Sparkles,
  UserCheck,
  Share2,
  Copy,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { User } from '@/lib/types/user.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { updateUserProfile } from '@/service/updateProfile';
import { profileUpdateSchema, ProfileUpdateFormValues } from '@/lib/validations/profile.schema';
import { toast } from 'sonner';

// Custom SVG Icons for GitHub, LinkedIn, Facebook
function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

interface UserProfileViewProps {
  user: User;
  isOwnProfile?: boolean;
}

export function UserProfileView({ user: initialUser, isOwnProfile = true }: UserProfileViewProps) {
  const router = useRouter();
  const [user, setUser] = useState<User>(initialUser);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Synchronize state with prop updates
  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser]);

  // React Hook Form initialization with Zod resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileUpdateFormValues>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      avatar: user?.avatar || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      gender: user?.gender?.toUpperCase() === 'MALE' || user?.gender?.toUpperCase() === 'FEMALE'
        ? (user.gender.toUpperCase() as 'MALE' | 'FEMALE')
        : undefined,
      dateOfBirth: user?.dateOfBirth || '',
      occupation: user?.occupation || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      country: user?.country || '',
      zipCode: user?.zipCode || '',
      website: user?.website || '',
      github: user?.github || '',
      linkedin: user?.linkedin || '',
      facebook: user?.facebook || '',
    },
  });

  // Re-sync form default values when user object changes or dialog opens
  useEffect(() => {
    if (user && isEditDialogOpen) {
      reset({
        avatar: user.avatar || '',
        phone: user.phone || '',
        bio: user.bio || '',
        gender: user.gender?.toUpperCase() === 'MALE' || user.gender?.toUpperCase() === 'FEMALE'
          ? (user.gender.toUpperCase() as 'MALE' | 'FEMALE')
          : undefined,
        dateOfBirth: user.dateOfBirth || '',
        occupation: user.occupation || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        zipCode: user.zipCode || '',
        website: user.website || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        facebook: user.facebook || '',
      });
    }
  }, [user, isEditDialogOpen, reset]);

  const onFormSubmit = async (data: ProfileUpdateFormValues) => {
    try {
      const payload: Record<string, any> = {};

      const formatUrl = (urlStr?: string) => {
        if (!urlStr || urlStr.trim() === '') return undefined;
        const trimmed = urlStr.trim();
        return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
      };

      if (data.avatar) payload.avatar = formatUrl(data.avatar);
      if (data.phone) payload.phone = data.phone.trim();
      if (data.bio) payload.bio = data.bio.trim();
      if (data.gender && (data.gender === 'MALE' || data.gender === 'FEMALE')) payload.gender = data.gender;
      if (data.dateOfBirth) payload.dateOfBirth = data.dateOfBirth.trim();
      if (data.occupation) payload.occupation = data.occupation.trim();
      if (data.address) payload.address = data.address.trim();
      if (data.city) payload.city = data.city.trim();
      if (data.state) payload.state = data.state.trim();
      if (data.country) payload.country = data.country.trim();
      if (data.zipCode) payload.zipCode = data.zipCode.trim();
      if (data.website) payload.website = formatUrl(data.website);
      if (data.github) payload.github = formatUrl(data.github);
      if (data.linkedin) payload.linkedin = formatUrl(data.linkedin);
      if (data.facebook) payload.facebook = formatUrl(data.facebook);

      const res = await updateUserProfile(payload);
      if (res?.success) {
        toast.success('Profile updated successfully! ✨');
        const updatedUser = res.data ? { ...user, ...res.data } : { ...user, ...payload };
        setUser(updatedUser);
        setIsEditDialogOpen(false);
        router.refresh();
      } else {
        const errorDetails = Array.isArray(res?.errorSources) && res.errorSources.length > 0
          ? res.errorSources.map((err: any) => `${err.path}: ${err.message}`).join(' | ')
          : Array.isArray(res?.errors) && res.errors.length > 0
          ? res.errors.map((err: any) => err.message).join(' | ')
          : res?.message || 'Failed to update profile';

        toast.error(`Validation Error: ${errorDetails}`);
      }
    } catch (err: any) {
      toast.error(err?.message || 'Failed to save profile changes');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const formattedJoinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'Member';

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const roleFormatted = user?.role ? String(user.role).toUpperCase() : 'TENANT';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 max-w-7xl mx-auto pb-12"
    >
      {/* Top Banner & Profile Header */}
      <Card variant="glass" className="relative overflow-hidden rounded-3xl border border-border/80 shadow-luxury">
        {/* Cover Pattern Header */}
        <div className="h-48 sm:h-64 w-full bg-gradient-to-r from-blue-600/30 via-sky-500/20 to-teal-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-80" />
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 top-1/4 h-32 w-32 rounded-full bg-teal-500/20 blur-2xl pointer-events-none" />
        </div>

        {/* Profile Info Overlay Row */}
        <div className="px-6 sm:px-10 pb-8 relative -mt-20 sm:-mt-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            {/* Avatar & Main Identifiers */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative group">
                <Avatar className="h-32 w-32 sm:h-36 sm:w-36 ring-4 ring-background shadow-2xl rounded-3xl overflow-hidden bg-muted border-2 border-primary/20">
                  <AvatarImage src={user.avatar || user.image || undefined} alt={user.name || 'User'} className="object-cover" />
                  <AvatarFallback className="text-3xl font-extrabold bg-gradient-to-br from-blue-600 via-sky-500 to-teal-500 text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                {user.status === 'ACTIVE' && (
                  <span className="absolute bottom-2 right-2 flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 ring-2 ring-background" />
                  </span>
                )}
              </div>

              <div className="space-y-1.5 pt-2 sm:pt-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    {user.name || 'User Profile'}
                  </h1>
                  {user.isVerified && (
                    <Badge variant="success" className="gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5" /> Verified
                    </Badge>
                  )}
                  {user.isSuperhost && (
                    <Badge variant="warning" className="gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      <Award className="h-3.5 w-3.5" /> Superhost
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>{user.email}</span>
                  {user.phone && (
                    <>
                      <span>•</span>
                      <span>{user.phone}</span>
                    </>
                  )}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <Badge variant="glass" className="font-bold tracking-wider text-primary border-primary/20">
                    {roleFormatted}
                  </Badge>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> Joined {formattedJoinedDate}
                  </span>
                  {(user.city || user.country) && (
                    <span className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {[user.city, user.country].filter(Boolean).join(', ')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isOwnProfile && (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger
                    render={
                      <Button variant="gradient" className="rounded-2xl gap-2 font-semibold shadow-md shadow-blue-500/20 flex-1 sm:flex-none h-11 px-5">
                        <Edit3 className="h-4 w-4" /> Edit Profile
                      </Button>
                    }
                  />
                  <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 bg-card border border-border">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-extrabold flex items-center gap-2 text-foreground">
                        <UserIcon className="h-5 w-5 text-primary" /> Edit Profile Details
                      </DialogTitle>
                      <DialogDescription className="text-xs text-muted-foreground">
                        Update your personal details, contact info, location, and social links.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5 pt-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Full Name (Read-Only)
                          </Label>
                          <Input
                            id="name"
                            value={user.name || ''}
                            disabled
                            className="h-11 rounded-xl bg-muted/60 text-muted-foreground cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            {...register('phone')}
                            placeholder="017xxxxxxxx"
                            className="h-11 rounded-xl"
                          />
                          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="occupation" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Occupation
                          </Label>
                          <Input
                            id="occupation"
                            {...register('occupation')}
                            placeholder="e.g. Software Engineer"
                            className="h-11 rounded-xl"
                          />
                          {errors.occupation && <p className="text-xs text-destructive">{errors.occupation.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="gender" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Gender
                          </Label>
                          <select
                            id="gender"
                            {...register('gender')}
                            className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                          >
                            <option value="">Select Gender</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                          </select>
                          {errors.gender && <p className="text-xs text-destructive">{errors.gender.message}</p>}
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                          <Label htmlFor="dateOfBirth" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Date of Birth
                          </Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            {...register('dateOfBirth')}
                            className="h-11 rounded-xl"
                          />
                          {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth.message}</p>}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="avatar" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Avatar Image URL
                        </Label>
                        <Input
                          id="avatar"
                          {...register('avatar')}
                          placeholder="https://example.com/avatar.jpg"
                          className="h-11 rounded-xl"
                        />
                        {errors.avatar && <p className="text-xs text-destructive">{errors.avatar.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Bio / About Yourself
                        </Label>
                        <Textarea
                          id="bio"
                          {...register('bio')}
                          placeholder="Tell us about yourself..."
                          rows={3}
                          className="rounded-xl resize-none p-3 text-xs"
                        />
                        {errors.bio && <p className="text-xs text-destructive">{errors.bio.message}</p>}
                      </div>

                      {/* Location section */}
                      <div className="space-y-3 pt-3 border-t border-border/80">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-primary" /> Location Details
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5 sm:col-span-2">
                            <Label htmlFor="address" className="text-xs font-semibold">Address</Label>
                            <Input
                              id="address"
                              {...register('address')}
                              placeholder="Street Address"
                              className="h-11 rounded-xl"
                            />
                            {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="city" className="text-xs font-semibold">City</Label>
                            <Input
                              id="city"
                              {...register('city')}
                              placeholder="City"
                              className="h-11 rounded-xl"
                            />
                            {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="state" className="text-xs font-semibold">State</Label>
                            <Input
                              id="state"
                              {...register('state')}
                              placeholder="State / Region"
                              className="h-11 rounded-xl"
                            />
                            {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="country" className="text-xs font-semibold">Country</Label>
                            <Input
                              id="country"
                              {...register('country')}
                              placeholder="Country"
                              className="h-11 rounded-xl"
                            />
                            {errors.country && <p className="text-xs text-destructive">{errors.country.message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="zipCode" className="text-xs font-semibold">Zip Code</Label>
                            <Input
                              id="zipCode"
                              {...register('zipCode')}
                              placeholder="Zip / Postal Code"
                              className="h-11 rounded-xl"
                            />
                            {errors.zipCode && <p className="text-xs text-destructive">{errors.zipCode.message}</p>}
                          </div>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="space-y-3 pt-3 border-t border-border/80">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Globe className="h-4 w-4 text-primary" /> Social & Web Links
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="website" className="text-xs font-semibold">Website</Label>
                            <Input
                              id="website"
                              {...register('website')}
                              placeholder="https://yourwebsite.com"
                              className="h-11 rounded-xl"
                            />
                            {errors.website && <p className="text-xs text-destructive">{errors.website.message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="github" className="text-xs font-semibold">GitHub</Label>
                            <Input
                              id="github"
                              {...register('github')}
                              placeholder="https://github.com/username"
                              className="h-11 rounded-xl"
                            />
                            {errors.github && <p className="text-xs text-destructive">{errors.github.message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="linkedin" className="text-xs font-semibold">LinkedIn</Label>
                            <Input
                              id="linkedin"
                              {...register('linkedin')}
                              placeholder="https://linkedin.com/in/username"
                              className="h-11 rounded-xl"
                            />
                            {errors.linkedin && <p className="text-xs text-destructive">{errors.linkedin.message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="facebook" className="text-xs font-semibold">Facebook</Label>
                            <Input
                              id="facebook"
                              {...register('facebook')}
                              placeholder="https://facebook.com/username"
                              className="h-11 rounded-xl"
                            />
                            {errors.facebook && <p className="text-xs text-destructive">{errors.facebook.message}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/80">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setIsEditDialogOpen(false)}
                          className="rounded-xl h-11"
                        >
                          Cancel
                        </Button>
                        <Button type="submit" variant="gradient" disabled={isSubmitting} className="rounded-xl h-11 px-6 font-bold shadow-md shadow-blue-500/20">
                          {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(window.location.href, 'Profile Link')}
                  className="rounded-2xl shrink-0 h-11 w-11"
                  title="Share Profile"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card variant="glass" className="rounded-3xl p-4 border border-border/80 shadow-luxury flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="h-5 w-5 fill-amber-500/30" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Rating Score</p>
            <p className="text-base sm:text-lg font-extrabold text-foreground">{user.rating ? `${user.rating}.0` : 'New Member'}</p>
          </div>
        </Card>

        <Card variant="glass" className="rounded-3xl p-4 border border-border/80 shadow-luxury flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Identity</p>
            <p className="text-base sm:text-lg font-extrabold text-foreground">{user.isVerified ? 'Verified' : 'Unverified'}</p>
          </div>
        </Card>

        <Card variant="glass" className="rounded-3xl p-4 border border-border/80 shadow-luxury flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Account Status</p>
            <p className="text-base sm:text-lg font-extrabold text-foreground capitalize">{user.status || 'Active'}</p>
          </div>
        </Card>

        <Card variant="glass" className="rounded-3xl p-4 border border-border/80 shadow-luxury flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-500 flex items-center justify-center shrink-0">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Response Rate</p>
            <p className="text-base sm:text-lg font-extrabold text-foreground">{user.responseRate ? `${user.responseRate}%` : 'N/A'}</p>
          </div>
        </Card>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Personal Bio & Contact Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Bio & Overview Card */}
          <Card variant="glass" className="rounded-3xl border border-border/80 p-6 sm:p-8 shadow-luxury">
            <div className="flex items-center gap-2.5 pb-4 border-b border-border/80">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-extrabold text-foreground">About Me</h2>
            </div>
            <div className="pt-4">
              {user.bio ? (
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base italic border-l-4 border-primary/40 pl-4 py-1">
                  "{user.bio}"
                </p>
              ) : (
                <p className="text-muted-foreground text-xs sm:text-sm italic">
                  No bio provided yet. Click edit profile to introduce yourself!
                </p>
              )}
            </div>
          </Card>

          {/* Detailed Info Card */}
          <Card variant="glass" className="rounded-3xl border border-border/80 p-6 sm:p-8 shadow-luxury space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-border/80">
              <UserIcon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-extrabold text-foreground">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <UserIcon className="h-3.5 w-3.5 text-primary" /> Full Name
                </p>
                <p className="text-base font-semibold text-foreground">{user.name || 'N/A'}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-sky-500" /> Email Address
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-foreground truncate">{user.email || 'N/A'}</p>
                  {user.email && (
                    <button
                      onClick={() => copyToClipboard(user.email!, 'Email')}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-teal-500" /> Phone Number
                </p>
                <p className="text-base font-semibold text-foreground">{user.phone || 'Not provided'}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-indigo-500" /> Occupation
                </p>
                <p className="text-base font-semibold text-foreground">{user.occupation || 'Not specified'}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <UserCheck className="h-3.5 w-3.5 text-emerald-500" /> Gender
                </p>
                <p className="text-base font-semibold text-foreground capitalize">{user.gender || 'Not specified'}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-amber-500" /> Date of Birth
                </p>
                <p className="text-base font-semibold text-foreground">{user.dateOfBirth || 'Not specified'}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Location & Social Links */}
        <div className="space-y-6">
          {/* Location Details Card */}
          <Card variant="glass" className="rounded-3xl border border-border/80 p-6 shadow-luxury space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border/80">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-extrabold text-foreground">Location</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Address</p>
                <p className="font-semibold text-foreground truncate mt-0.5">{user.address || 'N/A'}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City</p>
                  <p className="font-semibold text-foreground mt-0.5">{user.city || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">State</p>
                  <p className="font-semibold text-foreground mt-0.5">{user.state || 'N/A'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Country</p>
                  <p className="font-semibold text-foreground mt-0.5">{user.country || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Zip Code</p>
                  <p className="font-semibold text-foreground mt-0.5">{user.zipCode || 'N/A'}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Social Profiles Card */}
          <Card variant="glass" className="rounded-3xl border border-border/80 p-6 shadow-luxury space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border/80">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-extrabold text-foreground">Social Profiles</h3>
            </div>

            <div className="space-y-2.5">
              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-muted/60 hover:bg-muted border border-border/60 transition-colors text-xs font-semibold text-foreground group"
                >
                  <span className="flex items-center gap-2.5">
                    <Globe className="h-4 w-4 text-blue-500" /> Website
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              )}

              {user.github && (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-muted/60 hover:bg-muted border border-border/60 transition-colors text-xs font-semibold text-foreground group"
                >
                  <span className="flex items-center gap-2.5">
                    <GitHubIcon className="h-4 w-4 text-foreground" /> GitHub
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              )}

              {user.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-muted/60 hover:bg-muted border border-border/60 transition-colors text-xs font-semibold text-foreground group"
                >
                  <span className="flex items-center gap-2.5">
                    <LinkedInIcon className="h-4 w-4 text-blue-600" /> LinkedIn
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              )}

              {user.facebook && (
                <a
                  href={user.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-muted/60 hover:bg-muted border border-border/60 transition-colors text-xs font-semibold text-foreground group"
                >
                  <span className="flex items-center gap-2.5">
                    <FacebookIcon className="h-4 w-4 text-blue-700" /> Facebook
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
              )}

              {!user.website && !user.github && !user.linkedin && !user.facebook && (
                <p className="text-xs text-muted-foreground italic py-2">
                  No social profiles linked yet.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
