"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Sparkles,
  Search,
  Clock,
  User as UserIcon,
  Tag,
  ArrowRight,
  Share2,
  Bookmark,
  CheckCircle2,
  X,
  MessageSquare,
  ThumbsUp,
  ShieldCheck,
  Building2,
  Home,
  FileText,
  Lock,
} from "lucide-react";
import { getCurrentUser } from "@/service/getCurrentUser";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  isFeatured?: boolean;
  content: string[];
  takeaways: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "ultimate-guide-renting-first-apartment-dhaka",
    title: "The Ultimate Guide to Renting Your First Apartment in Dhaka",
    excerpt:
      "Navigating apartment hunting in Dhaka can be overwhelming. From verifying house owners to understanding utility bill split systems, here is everything you need to know before signing.",
    category: "Tenant Guide",
    readTime: "6 min read",
    publishedAt: "Aug 10, 2026",
    isFeatured: true,
    author: {
      name: "Farhan Tanvir",
      role: "Senior Property Advisor",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    takeaways: [
      "Always inspect water pressure and gas connection line stability during peak hours.",
      "Get all service charge inclusions (security, generator, lift maintenance) documented in writing.",
      "Verify landlord ownership or authority before transferring initial advance deposits.",
    ],
    content: [
      "Renting your first home in a fast-paced metropolis like Dhaka is an exciting milestone, but it comes with unique nuances. Whether you are looking at family flats in Mirpur, bachelor setups in Farmgate, or luxury duplexes in Gulshan, understanding local tenancy norms ensures a smooth experience.",
      "1. Location & Daily Commute Analysis: Before finalizing any neighborhood, measure peak-hour traffic to your workplace or educational institution. Areas like Dhanmondi and Uttara offer excellent school zones and amenities, while Mohakhali and Banani provide proximity to corporate hubs.",
      "2. Demystifying Utility Bills & Maintenance Charges: Rent in Bangladesh often excludes monthly service charges. Ensure your agreement clarifies generator fuel costs, security guard salaries, elevator maintenance, and waste collection fees.",
      "3. Digital Verification on RentNest: Gone are the days of manual newspaper listings. RentNest verifies property ownership and landlord credentials, letting you book instant viewings and sign legally protective digital lease contracts without hassle.",
    ],
  },
  {
    id: "blog-2",
    slug: "10-red-flags-before-signing-rental-agreement",
    title: "10 Critical Red Flags to Avoid Before Signing a Rental Agreement",
    excerpt:
      "Protect yourself from hidden maintenance fees, illegal lease termination clauses, and unreturned security deposits by checking these 10 red flags in contract documents.",
    category: "Lease & Legal",
    readTime: "8 min read",
    publishedAt: "Aug 08, 2026",
    author: {
      name: "Nusrat Jahan",
      role: "Real Estate Legal Consultant",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    takeaways: [
      "Avoid verbal agreements regarding deposit refund timelines; insist on a written 30-day notice clause.",
      "Cross-check who covers structural repairs versus minor fixture maintenance.",
      "Ensure rent increase frequencies are capped per the Premises Rent Control laws.",
    ],
    content: [
      "A lease agreement is a legally binding contract that safeguards both tenant and landlord rights. However, vague clauses or missing stipulations can lead to unnecessary disputes down the road.",
      "Unspecified Maintenance Duties: A common trap is failing to define major vs minor repairs. Structural issues, damp walls, and main plumbing pipes should always remain the landlord's responsibility.",
      "Excessive Advance Deposit Demands: Standard practice requires 1 to 2 months' rent as security deposit. Be cautious if requested to pay 6+ months upfront without formal legal escrow protection.",
      "Arbitrary Eviction Clauses: Legally, landlords must provide a written notice (typically 1 to 2 months) before asking tenants to vacate. Any clause permitting immediate eviction without valid cause should be immediately renegotiated.",
    ],
  },
  {
    id: "blog-3",
    slug: "landlords-guide-maximizing-property-yield",
    title: "How Landlords Can Maximize Property Value & Attract Premium Tenants",
    excerpt:
      "Discover smart upgrades that increase rental yield by up to 25%, attract verified long-term tenants, and streamline property management using RentNest.",
    category: "Landlord Advice",
    readTime: "5 min read",
    publishedAt: "Aug 05, 2026",
    author: {
      name: "Sabbir Hossain",
      role: "Property Management Lead",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    takeaways: [
      "Modern kitchen fixtures and fresh neutral wall coats boost property perceived value instantly.",
      "High-speed fiber optic compatibility and smart door locks appeal heavily to corporate renters.",
      "Listing properties with verified badges on RentNest reduces vacancy turnaround by 60%.",
    ],
    content: [
      "Maximizing rental income requires more than just listing a property. Premium corporate tenants and expat families prioritize security, modern amenities, and prompt communication.",
      "Aesthetic Upgrades with High ROI: Re-painting walls with warm neutral tones, installing LED ambient lighting, and updating cabinet handles transform old apartments into modern sanctuaries at low cost.",
      "Digital Tenant Screening: RentNest's built-in background checks allow landlords to review rental history, income verification, and employment status seamlessly before approving booking requests.",
    ],
  },
  {
    id: "blog-4",
    slug: "dhaka-neighborhood-breakdown-dhanmondi-gulshan-uttara",
    title: "Dhaka Neighborhood Breakdown: Dhanmondi vs Gulshan vs Uttara",
    excerpt:
      "Comparing commute times, school access, monthly rent ranges, safety index, and lifestyle perks across Dhaka's top residential hubs.",
    category: "Neighborhoods",
    readTime: "7 min read",
    publishedAt: "Aug 02, 2026",
    author: {
      name: "Anika Rahman",
      role: "Urban Living Analyst",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    takeaways: [
      "Dhanmondi offers vibrant food scenes, lake parks, and top-tier educational institutions.",
      "Gulshan and Banani excel in diplomatic security, high-end fine dining, and corporate proximity.",
      "Uttara provides spacious planned sectors, proximity to Hazrat Shahjalal International Airport, and Metro Rail connectivity.",
    ],
    content: [
      "Choosing the right neighborhood in Dhaka shapes your daily quality of life. Each district boasts distinct personalities, pricing dynamics, and civic infrastructure.",
      "Dhanmondi: Famous for its iconic lake, bustling cafes, and renowned schools. Ideal for families and university students seeking a lively residential atmosphere.",
      "Gulshan & Banani: The business and diplomatic core. Rent rates are higher, but tenants enjoy world-class security, embassy proximity, and luxury high-rise apartments.",
      "Uttara: A meticulously planned residential sector with wide avenues, peaceful parks, and direct MRT Metro Rail connectivity to Motijheel and Agargaon.",
    ],
  },
  {
    id: "blog-5",
    slug: "maximizing-small-spaces-studio-apartment-decor",
    title: "Maximizing Small Spaces: Studio Apartment Decor & Storage Hacks",
    excerpt:
      "Creative layout ideas, multi-functional furniture picks, and zero-renovation decor hacks that make compact apartments feel spacious and high-end.",
    category: "Smart Living",
    readTime: "4 min read",
    publishedAt: "Jul 28, 2026",
    author: {
      name: "Tariq Islam",
      role: "Interior Designer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    takeaways: [
      "Use vertical wall shelves and under-bed storage bins to eliminate floor clutter.",
      "Hang floor-to-ceiling sheer curtains and large mirrors to create the illusion of double space.",
      "Choose foldable or modular furniture that serves dual purposes.",
    ],
    content: [
      "Living in a studio or 1-bedroom apartment doesn't mean sacrificing luxury or comfort. With intentional interior choices, compact homes can feel airy and stylish.",
      "Zoning with Rugs & Lighting: Define separate sleeping, working, and dining areas using distinct area rugs and floor lamps without building permanent walls.",
      "The Power of Mirrors: Placing a large arched floor mirror opposite a window bounces natural light across the room, visually doubling your living area.",
    ],
  },
  {
    id: "blog-6",
    slug: "security-deposits-refund-rights-maintenance",
    title: "Understanding Security Deposits, Refund Rights & Maintenance",
    excerpt:
      "Who pays for plumbing repairs? How long can a landlord hold your deposit after move-out? Clear up common legal ambiguities in tenant-landlord relations.",
    category: "Lease & Legal",
    readTime: "6 min read",
    publishedAt: "Jul 25, 2026",
    author: {
      name: "Nusrat Jahan",
      role: "Real Estate Legal Consultant",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    },
    coverImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    takeaways: [
      "Conduct a joint move-in walkthrough checklist to document existing wall conditions or scratches.",
      "Landlords must provide an itemized receipt for any security deposit deductions.",
      "RentNest automated digital lease agreements include built-in deposit escrow rules.",
    ],
    content: [
      "Security deposit disputes remain one of the most common friction points between renters and owners. Establishing clear expectations during lease inception eliminates post-lease disagreements.",
      "Move-in Inspection Report: Take photos and videos of the apartment prior to moving in. Share these with your landlord so pre-existing wear and tear is not charged to your deposit upon departure.",
      "Fair Wear and Tear vs Damage: Natural paint fading or slight carpet wear is considered normal wear and tear. Broken tiles or altered fixtures caused by tenant modifications fall under repair deductions.",
    ],
  },
];

const CATEGORIES = [
  "All",
  "Tenant Guide",
  "Lease & Legal",
  "Landlord Advice",
  "Neighborhoods",
  "Smart Living",
];

export default function BlogsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Auth protection check
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res?.success && res?.data) {
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          setIsAuthenticated(false);
          setLoading(false);
          toast.error("Access Restricted 🔒", {
            description: "Please sign in to access RentNest Blogs & Market Insights.",
          });
          router.push("/auth/login");
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
        router.push("/auth/login");
      });
  }, [router]);

  // Filtered blog articles
  const filteredBlogs = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS.find((p) => p.isFeatured) || BLOG_POSTS[0];

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((i) => i !== id));
      toast.info("Removed from saved bookmarks");
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
      toast.success("Saved to your bookmarks 🎉");
    }
  };

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (likedIds.includes(id)) {
      setLikedIds((prev) => prev.filter((i) => i !== id));
    } else {
      setLikedIds((prev) => [...prev, id]);
      toast.success("Thanks for your feedback! 👍");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-24 pb-12 px-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 animate-spin flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <p className="text-sm font-semibold text-muted-foreground animate-pulse">
          Verifying Member Access...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-24 pb-12 px-4">
        <Card variant="glass" className="max-w-md w-full p-8 text-center space-y-4 rounded-3xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">Sign In Required</h2>
          <p className="text-sm text-muted-foreground">
            RentNest Blogs are exclusive for registered members. Please sign in to read market insights.
          </p>
          <Link href="/auth/login" className="block w-full">
            <Button variant="gradient" className="w-full h-11 rounded-xl">
              Go to Login
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-2/3 right-10 w-[450px] h-[450px] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <Badge
          variant="outline"
          className="gap-2 px-4 py-1.5 bg-blue-50/80 dark:bg-blue-950/60 border-blue-200/80 dark:border-blue-800/60 text-[#2563EB] dark:text-sky-400 font-semibold text-xs sm:text-sm rounded-full shadow-xs backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-sky-400" />
          <span>RENTNEST INSIGHTS & GUIDES</span>
        </Badge>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground font-heading leading-tight">
          Explore Our{" "}
          <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 bg-clip-text text-transparent">
            Rental Knowledge Hub
          </span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
          Expert tenant advice, landlord strategies, neighborhood guides, and rental legal tips curated specifically for modern living in Bangladesh.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto pt-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles by topic, keyword, or guide..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 pr-4 rounded-2xl bg-card/80 border-border shadow-md focus-visible:ring-2 focus-visible:ring-primary text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Featured Hero Article */}
      {!searchQuery && selectedCategory === "All" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <Card
            onClick={() => setActiveBlog(featuredPost)}
            className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] overflow-hidden">
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <Badge className="absolute top-4 left-4 bg-amber-500 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-current" /> Featured Guide
              </Badge>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 sm:py-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                  <Badge variant="secondary" className="rounded-full px-3 py-0.5 text-primary bg-primary/10">
                    {featuredPost.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                  <div>
                    <p className="text-xs font-bold text-foreground">
                      {featuredPost.author.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {featuredPost.publishedAt}
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-2 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/25"
                : "bg-card/80 text-muted-foreground hover:text-foreground border border-border/60 hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredBlogs.length === 0 ? (
        <Card className="rounded-3xl p-12 text-center space-y-4 border-dashed">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground">No Articles Found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            We couldn&apos;t find any blog posts matching your current search or category filter.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="rounded-xl text-xs font-semibold"
          >
            Reset Filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBlogs.map((post) => {
            const isBookmarked = bookmarkedIds.includes(post.id);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card
                  onClick={() => setActiveBlog(post)}
                  className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-300 cursor-pointer flex flex-col h-full"
                >
                  {/* Article Cover Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-bold bg-background/90 backdrop-blur-md text-foreground shadow-xs">
                        {post.category}
                      </Badge>
                    </div>

                    <button
                      onClick={(e) => toggleBookmark(post.id, e)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isBookmarked
                          ? "bg-amber-500 text-white"
                          : "bg-black/40 text-white hover:bg-black/60"
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Save Article"}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Article Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                        <span>•</span>
                        <span>{post.publishedAt}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Author & Footer */}
                    <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full object-cover border border-border"
                        />
                        <div>
                          <p className="text-xs font-bold text-foreground leading-none">
                            {post.author.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {post.author.role}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {activeBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-10 my-auto text-foreground space-y-6"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setActiveBlog(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-4 pr-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-bold bg-primary/10 text-primary">
                    {activeBlog.category}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {activeBlog.readTime}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">• {activeBlog.publishedAt}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight">
                  {activeBlog.title}
                </h1>

                {/* Author Details */}
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={activeBlog.author.avatar}
                    alt={activeBlog.author.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div>
                    <p className="text-sm font-bold text-foreground">{activeBlog.author.name}</p>
                    <p className="text-xs text-muted-foreground">{activeBlog.author.role}</p>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden">
                <Image
                  src={activeBlog.coverImage}
                  alt={activeBlog.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Key Takeaways Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 space-y-3">
                <h3 className="text-sm font-extrabold text-blue-700 dark:text-sky-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                  Key Takeaways
                </h3>
                <ul className="space-y-2">
                  {activeBlog.takeaways.map((takeaway, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Content Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-foreground/90 leading-relaxed font-normal">
                {activeBlog.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Action Toolbar */}
              <div className="pt-6 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant={likedIds.includes(activeBlog.id) ? "default" : "outline"}
                    onClick={(e) => toggleLike(activeBlog.id, e)}
                    className="rounded-xl gap-2 text-xs cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{likedIds.includes(activeBlog.id) ? "Liked" : "Like Guide"}</span>
                  </Button>

                  <Button
                    size="sm"
                    variant={bookmarkedIds.includes(activeBlog.id) ? "default" : "outline"}
                    onClick={(e) => toggleBookmark(activeBlog.id, e)}
                    className="rounded-xl gap-2 text-xs cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{bookmarkedIds.includes(activeBlog.id) ? "Saved" : "Save"}</span>
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Article link copied to clipboard 📋");
                  }}
                  className="rounded-xl gap-2 text-xs cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
