"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Custom software & integration solutions",
  "IT infrastructure & support",
  "DSP, R&D, and innovation consulting",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--off-white)] to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM1RjZDNzIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="container relative py-20 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(255,74,0,0.1)] text-[var(--vermilion)] text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--vermilion)] animate-pulse" />
              Trusted by clients
            </motion.div>

            {/* Heading */}
            <h1 className="text-[var(--anchor-dark)] mb-6">
              Optimize Your Tech with{" "}
              <span className="text-[var(--vermilion)]">Ditronics</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-[var(--neutral-text)] mb-8 max-w-xl mx-auto lg:mx-0">
              Software integration, custom business solutions, and cutting-edge R&D
              with enterprise-grade support. We make complex tech simple.
            </p>

            {/* Benefits */}
            <ul className="flex flex-col gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 text-[var(--neutral-text)] justify-center lg:justify-start"
                >
                  <CheckCircle
                    size={20}
                    className="text-[var(--teal-green)] flex-shrink-0"
                  />
                  {benefit}
                </motion.li>
              ))}
            </ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="primary" size="lg" asChild>
                <Link href="/services" className="gap-2">
                  Explore Services
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/laptops">View Laptops</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-[var(--vermilion)]/5 animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full bg-[var(--teal-green)]/5" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-[var(--teal-green)]/10" />
              </div>
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src="/DITRONICS-COMPANY-LOGO.png"
                    alt="Ditronics Logo"
                    width={80}
                    height={80}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
