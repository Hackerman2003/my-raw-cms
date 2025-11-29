import { ServicesGrid } from "@/components/ServicesGrid";
import { sampleServices } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Ditronics",
  description:
    "Software integration, IT infrastructure, custom business software, DSP solutions, and R&D services for modern enterprises.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[var(--off-white)] to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Our Services</h1>
            <p className="text-xl text-[var(--neutral-text)] mb-8">
              From software integration to custom business solutions and R&D, we provide
              comprehensive technology services tailored to your business needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">
                  Get a Quote
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid services={sampleServices} showAll />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Why Choose Ditronics?</h2>
              <p className="text-lg text-[var(--neutral-text)] mb-8">
                We bring dedication, technical expertise, and a client-first approach
                to every project. Our team understands the unique challenges businesses
                face with technology.
              </p>
              <ul className="space-y-4">
                {[
                  "Reliable service with consistent quality delivery",
                  "Dedicated support from skilled technicians",
                  "Transparent communication and fair pricing",
                  "Tailored solutions for your specific needs",
                  "Focus on long-term partnerships and growth",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      size={24}
                      className="text-[var(--teal-green)] flex-shrink-0 mt-0.5"
                    />
                    <span className="text-[var(--neutral-text)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--off-white)] rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "50+", label: "Projects Completed" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "24/7", label: "Support Available" },
                  { value: "5+", label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-bold text-[var(--vermilion)]">
                      {stat.value}
                    </p>
                    <p className="text-sm text-[var(--neutral-text)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--anchor-dark)]">
        <div className="container text-center">
          <h2 className="text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Contact us today for a free consultation and discover how we can
            optimize your technology infrastructure.
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/contact">
              Schedule Consultation
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
