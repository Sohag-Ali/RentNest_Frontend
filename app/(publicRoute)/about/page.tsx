import { AboutCTA } from "./_components/about-cta";
import { AboutHero } from "./_components/about-hero";
import { AboutStory } from "./_components/about-story";
import { CoreValues } from "./_components/core-values";
import { StatisticsSection } from "./_components/statistics-section";
import { TeamSection } from "./_components/team-section";
import { Testimonials } from "./_components/testimonials";
import { WhyChooseUs } from "./_components/why-choose-us";
import { WorkingProcess } from "./_components/working-process";


export const metadata = {
  title: 'About Us | Thikana',
  description: 'Learn about Thikana - Your trusted partner in finding the perfect rental home in Bangladesh. Discover our story, mission, and values.',
};

export default function AboutPage() {
  return (
    <main className="bg-background">
      <AboutHero />
      <AboutStory />
      <WhyChooseUs />
      <StatisticsSection />
      <WorkingProcess />
      <CoreValues />
      <TeamSection />
      {/* <Testimonials /> */}
      <AboutCTA />
    </main>
  );
}
