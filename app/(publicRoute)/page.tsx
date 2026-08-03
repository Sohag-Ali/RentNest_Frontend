import { Hero } from '@/components/hero/Hero';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { BrowseByCity } from '@/components/home/BrowseByCity';

export const metadata = {
  title: 'RentNest | Find Your Perfect Home Without the Stress',
  description:
    'Discover luxury apartments, villas, and studios verified by top landlords across Bangladesh and beyond with instant direct booking and lease protection.',
};

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <CategoriesSection />
      <FeaturedProperties />
      <BrowseByCity />
    </main>
  );
}

