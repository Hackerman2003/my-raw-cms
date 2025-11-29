"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, HardDrive, MemoryStick, Monitor, Eye } from "lucide-react";

export interface Laptop {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    gpu?: string;
    display?: string;
    battery?: string;
  };
  images: any[];
  stockStatus: "In Stock" | "Limited" | "Out of Stock";
  condition?: string;
  notes?: string;
}

const stockStatusVariant: Record<string, "success" | "warning" | "muted"> = {
  "In Stock": "success",
  Limited: "warning",
  "Out of Stock": "muted",
};

interface LaptopCardProps {
  laptop: Laptop;
  index: number;
}

// Helper to get image URL - handles URL strings
function getImageUrl(image: any): string | null {
  if (!image) return null;
  
  // If it's already a URL string
  if (typeof image === 'string') {
    return image;
  }
  
  return null;
}

export function LaptopCard({ laptop, index }: LaptopCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-TZ", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const imageUrl = laptop.images?.[0] ? getImageUrl(laptop.images[0]) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
    >
      <Card className="group h-full overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={laptop.name}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
              <Monitor size={64} className="text-gray-300" />
            </div>
          )}
          <Badge
            variant={stockStatusVariant[laptop.stockStatus]}
            className="absolute top-4 right-4"
          >
            {laptop.stockStatus}
          </Badge>
        </div>

        <CardContent className="p-6">
          {/* Title & Price */}
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-bold text-[var(--anchor-dark)] group-hover:text-[var(--vermilion)] transition-colors">
              {laptop.name}
            </h3>
            <span className="text-xl font-bold text-[var(--vermilion)]">
              {formatPrice(laptop.price, laptop.currency)}
            </span>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-[var(--neutral-text)]">
              <Cpu size={16} className="text-[var(--anchor-dark)]" />
              <span className="truncate">{laptop.specs.cpu}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--neutral-text)]">
              <MemoryStick size={16} className="text-[var(--anchor-dark)]" />
              <span>{laptop.specs.ram}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--neutral-text)]">
              <HardDrive size={16} className="text-[var(--anchor-dark)]" />
              <span>{laptop.specs.storage}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--neutral-text)]">
              <Monitor size={16} className="text-[var(--anchor-dark)]" />
              <span className="truncate">{laptop.specs.gpu}</span>
            </div>
          </div>

          {/* CTA */}
          <Button variant="secondary" className="w-full" asChild>
            <Link href={`/laptops/${laptop.slug}`}>
              <Eye size={16} className="mr-2" />
              View Details
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
