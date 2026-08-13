'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  ShieldCheck,
  Bell,
  Palette,
  Lock,
  CreditCard,
  Key,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Laptop,
  Download,
  Trash2,
  UserX,
  Save,
  Globe,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { User } from '@/lib/types/user.type';
import { getCurrentUser } from '@/service/getCurrentUser';
import { changePasswordAction } from '@/service/changePassword';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface SettingsViewProps {
  role?: 'TENANT' | 'LANDLORD' | 'ADMIN' | 'tenant' | 'landlord' | 'admin';
}

export function SettingsView({ role: initialRole }: SettingsViewProps) {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'security' | 'notifications' | 'appearance' | 'privacy' | 'billing'>('security');
  const [mounted, setMounted] = useState(false);

  // Security Form State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    emailRentalAlerts: true,
    emailPaymentReceipts: true,
    emailMarketing: false,
    smsAlerts: true,
    pushNotifications: true,
  });

  // Privacy State
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showEmail: false,
    showPhone: true,
    searchIndexing: true,
  });

  // 2FA State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Danger Zone Dialog State
  const [isDangerDialogOpen, setIsDangerDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setMounted(true);
    getCurrentUser().then((res) => {
      if (res?.success && res?.data) {
        setUser(res.data);
      }
    });
  }, []);

  const effectiveRole = String(user?.role || initialRole || 'tenant').toUpperCase();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword) {
      toast.error('Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }

    setIsChangingPass(true);
    try {
      const res = await changePasswordAction({ oldPassword, newPassword });
      if (res?.success) {
        toast.success('Password updated successfully! 🔒');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(res?.message || 'Failed to update password. Please check your current password.');
      }
    } catch (err: any) {
      toast.error(err?.message || 'An error occurred while changing password.');
    } finally {
      setIsChangingPass(false);
    }
  };

  const handleSaveNotificationSettings = () => {
    toast.success('Notification preferences saved successfully! 🔔');
  };

  const handleSavePrivacySettings = () => {
    toast.success('Privacy settings saved! 🛡️');
  };

  const handleAccountDeactivation = () => {
    if (deleteConfirmation.toLowerCase() !== 'delete') {
      toast.error('Please type "DELETE" to confirm account deletion.');
      return;
    }
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setIsDangerDialogOpen(false);
      toast.info('Account deletion request submitted to support.');
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16 pt-20">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-card border border-border/70 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
              Account & System Settings
            </h1>
            <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold px-2.5 py-0.5 rounded-full text-xs">
              {effectiveRole} PORTAL
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your password, security preferences, notification alerts, and theme customization.
          </p>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 z-10">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold">
            <CheckCircle2 className="h-4 w-4" /> System Health: Optimal
          </Badge>
        </div>

        {/* Ambient Gradient */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/10 via-purple-500/5 to-transparent pointer-events-none" />
      </div>

      {/* Main Settings Layout (Sidebar Tabs + Content Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Tabs (Left Sidebar) */}
        <Card className="lg:col-span-4 rounded-3xl border-border/70 bg-card p-3 shadow-sm space-y-1 sticky top-20">
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'security'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="flex-1 text-left">Security & Password</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'notifications'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Bell className="h-4 w-4" />
            <span className="flex-1 text-left">Notifications</span>
          </button>

          <button
            onClick={() => setActiveTab('appearance')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'appearance'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Palette className="h-4 w-4" />
            <span className="flex-1 text-left">Appearance & Theme</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'privacy'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Lock className="h-4 w-4" />
            <span className="flex-1 text-left">Privacy & Account</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'billing'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span className="flex-1 text-left">Payouts & Billing</span>
          </button>
        </Card>

        {/* Content Area (Right Panel) */}
        <div className="lg:col-span-8 space-y-6">
          {/* TAB 1: SECURITY & PASSWORD */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Change Password Card */}
              <Card className="rounded-3xl border-border/70 bg-card p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Key className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground font-heading">Change Password</h2>
                    <p className="text-xs text-muted-foreground">
                      Update your account password regularly to keep your profile secure.
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="oldPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="oldPassword"
                        type={showOldPass ? 'text' : 'password'}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="••••••••"
                        className="rounded-xl pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPass(!showOldPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showOldPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPass ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="rounded-xl pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showNewPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button type="submit" disabled={isChangingPass} className="rounded-xl px-6 gap-2">
                      <Save className="h-4 w-4" />
                      {isChangingPass ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Two-Factor Authentication (2FA) */}
              <Card className="rounded-3xl border-border/70 bg-card p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                        Two-Factor Authentication (2FA)
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 text-[10px]">
                          Recommended
                        </Badge>
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Add an extra layer of protection using authenticator apps.
                      </p>
                    </div>
                  </div>

                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={(checked) => {
                      setTwoFactorEnabled(checked);
                      toast.info(checked ? '2FA enabled on your account.' : '2FA disabled.');
                    }}
                  />
                </div>
              </Card>

              {/* Active Login Sessions */}
              <Card className="rounded-3xl border-border/70 bg-card p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-foreground">Active Devices & Sessions</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                    <div className="flex items-center gap-3">
                      <Laptop className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Current Web Browser</p>
                        <p className="text-xs text-muted-foreground">Windows • Chrome • Active Now</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px]">
                      This Device
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 2: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <Card className="rounded-3xl border-border/70 bg-card p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground font-heading">Notification Preferences</h2>
                  <p className="text-xs text-muted-foreground">
                    Choose what notifications you want to receive and how they arrive.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4 py-2 border-b border-border/40">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Rental Application & Request Alerts</p>
                    <p className="text-xs text-muted-foreground">Receive instant emails when a rental request status changes.</p>
                  </div>
                  <Switch
                    checked={notifications.emailRentalAlerts}
                    onCheckedChange={(c) => setNotifications((p) => ({ ...p, emailRentalAlerts: c }))}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 py-2 border-b border-border/40">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Payment Invoices & Receipts</p>
                    <p className="text-xs text-muted-foreground">Get payment confirmations sent straight to your email.</p>
                  </div>
                  <Switch
                    checked={notifications.emailPaymentReceipts}
                    onCheckedChange={(c) => setNotifications((p) => ({ ...p, emailPaymentReceipts: c }))}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 py-2 border-b border-border/40">
                  <div>
                    <p className="text-sm font-semibold text-foreground">SMS Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive SMS text alerts for urgent updates.</p>
                  </div>
                  <Switch
                    checked={notifications.smsAlerts}
                    onCheckedChange={(c) => setNotifications((p) => ({ ...p, smsAlerts: c }))}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 py-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Marketing & Product Updates</p>
                    <p className="text-xs text-muted-foreground">Receive news about new features, properties, and discounts.</p>
                  </div>
                  <Switch
                    checked={notifications.emailMarketing}
                    onCheckedChange={(c) => setNotifications((p) => ({ ...p, emailMarketing: c }))}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <Button onClick={handleSaveNotificationSettings} className="rounded-xl px-6 gap-2">
                  <Save className="h-4 w-4" /> Save Preferences
                </Button>
              </div>
            </Card>
          )}

          {/* TAB 3: APPEARANCE & THEME */}
          {activeTab === 'appearance' && (
            <Card className="rounded-3xl border-border/70 bg-card p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Palette className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground font-heading">Appearance & Theme</h2>
                  <p className="text-xs text-muted-foreground">
                    Customize how Thikana looks on your browser.
                  </p>
                </div>
              </div>

              {/* Theme Selector */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Interface Theme</Label>
                {mounted && (
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-2xl border flex flex-col items-center gap-2.5 text-xs font-semibold transition-all ${
                        theme === 'light'
                          ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/30'
                          : 'border-border bg-card text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <Sun className="h-6 w-6 text-amber-500" /> Light Mode
                    </button>

                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-2xl border flex flex-col items-center gap-2.5 text-xs font-semibold transition-all ${
                        theme === 'dark'
                          ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/30'
                          : 'border-border bg-card text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <Moon className="h-6 w-6 text-blue-400" /> Dark Mode
                    </button>

                    <button
                      onClick={() => setTheme('system')}
                      className={`p-4 rounded-2xl border flex flex-col items-center gap-2.5 text-xs font-semibold transition-all ${
                        theme === 'system'
                          ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/30'
                          : 'border-border bg-card text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <Laptop className="h-6 w-6 text-purple-500" /> System Default
                    </button>
                  </div>
                )}
              </div>

              {/* Language & Regional Settings */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-primary" /> Language & Regional Settings
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Display Language</Label>
                    <select
                      id="language"
                      defaultValue="en"
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="en">English (United States)</option>
                      <option value="bn">Bengali (বাংলা)</option>
                      <option value="es">Spanish (Español)</option>
                      <option value="fr">French (Français)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Preferred Currency</Label>
                    <select
                      id="currency"
                      defaultValue="bdt"
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="bdt">BDT (৳ - Taka)</option>
                      <option value="usd">USD ($ - US Dollar)</option>
                      <option value="eur">EUR (€ - Euro)</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* TAB 4: PRIVACY & ACCOUNT */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <Card className="rounded-3xl border-border/70 bg-card p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground font-heading">Privacy & Data Control</h2>
                    <p className="text-xs text-muted-foreground">
                      Control visibility of your contact info and export your account data.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4 py-2 border-b border-border/40">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Public Host/Tenant Profile</p>
                      <p className="text-xs text-muted-foreground">Allow other registered users to see your basic profile.</p>
                    </div>
                    <Switch
                      checked={privacy.publicProfile}
                      onCheckedChange={(c) => setPrivacy((p) => ({ ...p, publicProfile: c }))}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2 border-b border-border/40">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Show Phone Number on Listings</p>
                      <p className="text-xs text-muted-foreground">Display phone number to interested tenants or landlords.</p>
                    </div>
                    <Switch
                      checked={privacy.showPhone}
                      onCheckedChange={(c) => setPrivacy((p) => ({ ...p, showPhone: c }))}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Search Engine Indexing</p>
                      <p className="text-xs text-muted-foreground">Allow public search engines (Google) to index your public listing pages.</p>
                    </div>
                    <Switch
                      checked={privacy.searchIndexing}
                      onCheckedChange={(c) => setPrivacy((p) => ({ ...p, searchIndexing: c }))}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <Button variant="outline" className="rounded-xl gap-2 text-xs">
                    <Download className="h-4 w-4" /> Download Personal Data
                  </Button>
                  <Button onClick={handleSavePrivacySettings} className="rounded-xl px-6 gap-2">
                    <Save className="h-4 w-4" /> Save Settings
                  </Button>
                </div>
              </Card>

              {/* Danger Zone */}
              <Card className="rounded-3xl border-destructive/30 bg-destructive/5 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-destructive">Danger Zone</h3>
                    <p className="text-xs text-muted-foreground">
                      Irreversible account actions. Please proceed with caution.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Delete Account</p>
                    <p className="text-xs text-muted-foreground">Permanently delete your profile and all associated data.</p>
                  </div>

                  <Dialog open={isDangerDialogOpen} onOpenChange={setIsDangerDialogOpen}>
                    <DialogTrigger
                      render={
                        <Button variant="destructive" className="rounded-xl gap-2 text-xs">
                          <Trash2 className="h-4 w-4" /> Delete Account
                        </Button>
                      }
                    />
                    <DialogContent className="sm:max-w-md rounded-3xl p-6">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-destructive flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" /> Confirm Account Deletion
                        </DialogTitle>
                        <DialogDescription>
                          This action is irreversible. All your property listings, booking history, and profile data will be permanently removed.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 pt-3">
                        <p className="text-xs text-muted-foreground">
                          Please type <strong className="text-foreground">DELETE</strong> below to confirm.
                        </p>
                        <Input
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          placeholder="Type DELETE"
                          className="rounded-xl"
                        />

                        <div className="flex justify-end gap-2 pt-2">
                          <Button variant="ghost" onClick={() => setIsDangerDialogOpen(false)} className="rounded-xl">
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={handleAccountDeactivation}
                            disabled={isDeleting}
                            className="rounded-xl"
                          >
                            {isDeleting ? 'Deleting...' : 'Confirm Deletion'}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 5: PAYOUTS & BILLING */}
          {activeTab === 'billing' && (
            <Card className="rounded-3xl border-border/70 bg-card p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground font-heading">Payouts & Billing Preferences</h2>
                  <p className="text-xs text-muted-foreground">
                    Manage payment methods for rent payments and host payouts.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payoutMethod">Preferred Payout Channel</Label>
                  <select
                    id="payoutMethod"
                    defaultValue="bkash"
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="bkash">bKash Merchant Account</option>
                    <option value="nagad">Nagad Direct Payout</option>
                    <option value="bank">Local Bank Transfer</option>
                    <option value="stripe">Stripe International Card</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNo">Payout Mobile/Account Number</Label>
                  <Input id="accountNo" placeholder="017xxxxxxxx" defaultValue={user?.phone || ''} className="rounded-xl" />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <Button onClick={() => toast.success('Payout information updated!')} className="rounded-xl px-6 gap-2">
                  <Save className="h-4 w-4" /> Save Payout Method
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
