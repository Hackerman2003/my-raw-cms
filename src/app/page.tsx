import { Hero } from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  sampleServices,
  sampleTestimonials,
} from "@/lib/data";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <ServicesGrid services={sampleServices} />

      {/* Testimonials Section */}
      <Testimonials testimonials={sampleTestimonials} />

      {/* CTA Section */}
      <section className="py-20 bg-[var(--anchor-dark)]">
        <div className="container text-center">
          <h2 className="text-white mb-4">Ready to Build Something Great?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Partner with Ditronics for custom software, IT infrastructure, and innovative R&D solutions. Get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">
                Get Started
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[var(--anchor-dark)]"
              asChild
            >
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
