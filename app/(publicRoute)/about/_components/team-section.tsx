'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { Badge } from '@/components/ui/badge';

interface TeamMember {
  name: string;
  role: string;
  tag: string;
  bio: string;
  image: string;
  linkedin: string;
  twitter: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Sarah Anderson',
    role: 'Founder & CEO',
    tag: 'Leadership',
    bio: 'Visionary entrepreneur with 10+ years scaling PropTech marketplaces and luxury real estate platforms.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    email: 'mailto:sarah@rentnest.com',
  },
  {
    name: 'Michael Chen',
    role: 'Co-Founder & CTO',
    tag: 'Engineering',
    bio: 'Former Google Cloud architect passionate about high-throughput real-time systems and security.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    email: 'mailto:michael@rentnest.com',
  },
  {
    name: 'Elena Rostova',
    role: 'Head of Product Design',
    tag: 'Design',
    bio: 'Award-winning UI/UX designer pioneering sleek, intuitive rental search experiences.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    email: 'mailto:elena@rentnest.com',
  },
  {
    name: 'David Vance',
    role: 'Head of Operations',
    tag: 'Operations',
    bio: 'Dedicated to tenant protection, landlord verification, and 100% transparent digital leases.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    email: 'mailto:david@rentnest.com',
  },
];

export function TeamSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <Badge variant="glass" className="gap-1.5 px-3.5 py-1 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>World-Class Team</span>
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Meet the Innovators Behind RentNest
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed">
              Our diverse team of real estate experts, engineers, and designers is committed to transforming how people rent homes worldwide.
            </p>
          </motion.div>

          {/* Team Members Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-card border border-border/80 shadow-luxury transition-all duration-300 hover:border-primary/40 hover:shadow-glow"
              >
                {/* Member Image Header */}
                <div className="relative h-72 w-full overflow-hidden bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Top Tag Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="glass" className="text-[11px] font-bold text-white border-white/20">
                      {member.tag}
                    </Badge>
                  </div>

                  {/* Member Name overlay on image */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h3 className="text-xl font-extrabold text-white tracking-tight drop-shadow-md">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-sky-400">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Card Content & Bio */}
                <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Social Icon Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s LinkedIn`}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted/80 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <FaLinkedin className="h-4 w-4" />
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name}'s Twitter`}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted/80 text-muted-foreground hover:text-sky-500 hover:bg-sky-500/10 transition-colors"
                    >
                      <FaXTwitter className="h-4 w-4" />
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={member.email}
                      aria-label={`Email ${member.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted/80 text-muted-foreground hover:text-teal-500 hover:bg-teal-500/10 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
