import { HeroSection } from "@/components/landing/hero-section"
import { FeatureCards } from "@/components/landing/feature-cards"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center px-4 py-20 lg:px-8">
      <HeroSection />
      <FeatureCards />
    </div>
  )
}
