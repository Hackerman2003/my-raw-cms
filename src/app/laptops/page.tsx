import { getAllLaptops } from "@/lib/db";
import { LaptopsClient } from "./LaptopsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laptops — Ditronics",
  description:
    "Browse our selection of enterprise-ready laptops configured for optimal performance.",
};

export const dynamic = 'force-dynamic';

export default async function LaptopsPage() {
  const dbLaptops = getAllLaptops();
  
  // Transform DB data to match Laptop type
  const laptops = dbLaptops.map((laptop) => ({
    id: laptop.id.toString(),
    name: laptop.name,
    slug: laptop.slug,
    price: laptop.price,
    currency: laptop.currency || "TZS",
    specs: {
      cpu: laptop.cpu || "",
      ram: laptop.ram || "",
      storage: laptop.storage || "",
      gpu: laptop.gpu || "",
      display: laptop.display || "",
      battery: laptop.battery || "",
    },
    images: laptop.image ? [laptop.image] : [],
    stockStatus: (laptop.stock_status as "In Stock" | "Limited" | "Out of Stock") || "In Stock",
    condition: laptop.condition || "Brand New",
    notes: laptop.notes || "",
  }));

  return <LaptopsClient initialLaptops={laptops} />;
}
