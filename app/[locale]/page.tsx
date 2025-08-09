import { Navbar } from "@/app/[locale]/components/navbar";
import { HeroSection } from "@/app/[locale]/components/hero-section";
import { ServicesSection } from "@/app/[locale]/components/services-section";
import { CoursesSection } from "@/app/[locale]/components/courses-section";
import { InstructorsSection } from "@/app/[locale]/components/instructors-section";
import { TestimonialsSection } from "@/app/[locale]/components/testimonials-section";
import { SuccessSection } from "@/app/[locale]/components/success-section";
import Footer from "@/app/[locale]/components/footer";

export default function Home() {
  return (
    <div className='min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 font-montserrat'>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <CoursesSection />
      <InstructorsSection />
      <TestimonialsSection />
      <SuccessSection />
      <Footer />
    </div>
  );
}
