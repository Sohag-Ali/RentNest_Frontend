'use client';

import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Mail } from 'lucide-react';
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";

const team = [
  {
    name: 'Sarah Anderson',
    position: 'Founder & CEO',
    bio: 'Visionary leader with 10+ years in real estate tech.'
  },
  {
    name: 'Michael Chen',
    position: 'Co-Founder & CTO',
    bio: 'Tech innovator passionate about platform scalability.'
  },
  {
    name: 'Emma Rodriguez',
    position: 'Head of Community',
    bio: 'Dedicated to building trust between renters and landlords.'
  },
  {
    name: 'James Wilson',
    position: 'Head of Product',
    bio: 'User-centric product strategist focused on excellence.'
  }
];

export function TeamSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Header */}
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Meet Our Team
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Talented individuals committed to revolutionizing the rental market
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border-b border-primary/10">
                  <Avatar className="w-16 h-16 bg-primary/20" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary">{member.position}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>

                  {/* Social Icons */}
                  <div className="flex gap-3 pt-2">
                    <button className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <FaLinkedin className="w-4 h-4 text-primary" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <FaXTwitter className="w-4 h-4 text-primary" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Mail className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
