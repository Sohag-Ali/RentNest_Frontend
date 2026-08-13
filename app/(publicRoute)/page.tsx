import { Hero } from '@/components/hero/Hero';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { BrowseByCity } from '@/components/home/BrowseByCity';
import { WhyChooseRentNest } from '@/components/home/WhyChooseRentNest';
import { HowItWorks } from '@/components/home/HowItWorks';
import { PopularAmenities } from '@/components/home/PopularAmenities';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { BecomeLandlordCTA } from '@/components/home/BecomeLandlordCTA';

export const metadata = {
  title: 'Thikana | Find Your Perfect Home Without the Stress',
  description:
    'Discover luxury apartments, villas, and studios verified by top landlords across Bangladesh with instant direct booking and lease protection.',
};

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <CategoriesSection />
      <FeaturedProperties />
      <PopularAmenities />
      <BrowseByCity />
      <WhyChooseRentNest />
      <HowItWorks />
      <TestimonialsSection />
      <BecomeLandlordCTA />
    </main>
  );
}


