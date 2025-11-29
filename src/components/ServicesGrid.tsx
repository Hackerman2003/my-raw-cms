"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Code,
  Server,
  Laptop,
  Zap,
  Lightbulb,
  Compass,
  ArrowRight,
  Settings,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  priceTier: "Starter" | "Pro" | "Enterprise";
  features: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  code: <Code size={24} />,
  server: <Server size={24} />,
  laptop: <Laptop size={24} />,
  zap: <Zap size={24} />,
  lightbulb: <Lightbulb size={24} />,
  compass: <Compass size={24} />,
};

const tierColors: Record<string, "secondary" | "warning" | "success"> = {
  Starter: "secondary",
  Pro: "warning",
  Enterprise: "success",
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
    >
      <Card className="h-full group hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--vermilion)]/10 flex items-center justify-center text-[var(--vermilion)] group-hover:bg-[var(--vermilion)] group-hover:text-white transition-colors duration-300">
              {iconMap[service.icon] || <Settings size={24} />}
            </div>
            <Badge variant={tierColors[service.priceTier]}>
              {service.priceTier}
            </Badge>
          </div>
          <CardTitle className="group-hover:text-[var(--vermilion)] transition-colors">
            {service.title}
          </CardTitle>
          <CardDescription className="mt-2">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 mb-6">
            {service.features.slice(0, 4).map((feature) => (
              <li
                key={feature}
                className="text-sm text-[var(--neutral-text)] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal-green)]" />
                {feature}
              </li>
            ))}
          </ul>
          <Button variant="ghost" className="w-full group/btn" asChild>
            <Link href={`/services#${service.id}`}>
              Learn More
              <ArrowRight
                size={16}
                className="ml-2 group-hover/btn:translate-x-1 transition-transform"
              />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ServicesGridProps {
  services: Service[];
  showAll?: boolean;
}

export function ServicesGrid({ services, showAll = false }: ServicesGridProps) {
  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <section className="py-20 bg-[var(--off-white)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Our Services</h2>
          <p className="text-lg text-[var(--neutral-text)] max-w-2xl mx-auto">
            From software integration to custom business solutions and R&D, we provide
            comprehensive technology services tailored to your business needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {!showAll && services.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">
                View All Services
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
