"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  companyLogo?: string;
  metrics?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">What Our Clients Say</h2>
          <p className="text-lg text-[var(--neutral-text)] max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from the businesses
            we&apos;ve helped transform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.2, 0.9, 0.2, 1],
              }}
              className="relative bg-[var(--off-white)] rounded-lg p-8"
            >
              <Quote
                size={32}
                className="absolute top-6 right-6 text-[var(--vermilion)]/20"
              />

              <blockquote className="text-[var(--anchor-dark)] mb-6 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {testimonial.metrics && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--teal-green)]/10 text-[var(--teal-green)] text-sm font-semibold mb-6">
                  {testimonial.metrics}
                </div>
              )}

              <div className="flex items-center gap-4">
                {testimonial.companyLogo ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white">
                    <Image
                      src={testimonial.companyLogo}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[var(--vermilion)]/10 flex items-center justify-center">
                    <span className="text-[var(--vermilion)] font-bold">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-[var(--anchor-dark)]">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-[var(--neutral-text)]">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
