"use client";

import { useState, useMemo } from "react";
import { LaptopCard, type Laptop } from "@/components/LaptopCard";
import { sampleLaptops } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, SlidersHorizontal } from "lucide-react";

type FilterState = {
  stockStatus: string[];
  priceRange: string;
  searchQuery: string;
};

const priceRanges = [
  { label: "All Prices", value: "" },
  { label: "Under $1,500", value: "0-1500" },
  { label: "$1,500 - $2,000", value: "1500-2000" },
  { label: "Over $2,000", value: "2000-10000" },
];

const stockOptions = ["In Stock", "Limited", "Out of Stock"];

export default function LaptopsPage() {
  const [filters, setFilters] = useState<FilterState>({
    stockStatus: [],
    priceRange: "",
    searchQuery: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredLaptops = useMemo(() => {
    return sampleLaptops.filter((laptop: Laptop) => {
      // Stock status filter
      if (
        filters.stockStatus.length > 0 &&
        !filters.stockStatus.includes(laptop.stockStatus)
      ) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-").map(Number);
        if (laptop.price < min || laptop.price > max) {
          return false;
        }
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          laptop.name.toLowerCase().includes(query) ||
          laptop.specs.cpu.toLowerCase().includes(query) ||
          laptop.specs.gpu.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [filters]);

  const toggleStockFilter = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      stockStatus: prev.stockStatus.includes(status)
        ? prev.stockStatus.filter((s) => s !== status)
        : [...prev.stockStatus, status],
    }));
  };

  const clearFilters = () => {
    setFilters({
      stockStatus: [],
      priceRange: "",
      searchQuery: "",
    });
  };

  const hasActiveFilters =
    filters.stockStatus.length > 0 ||
    filters.priceRange !== "" ||
    filters.searchQuery !== "";

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[var(--off-white)] to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Laptop Catalog</h1>
            <p className="text-xl text-[var(--neutral-text)]">
              Enterprise-ready laptops configured for optimal performance.
              Browse our selection and find the perfect machine for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12 bg-white">
        <div className="container">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <SlidersHorizontal size={16} className="mr-2" />
                Filters
              </Button>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search laptops..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchQuery: e.target.value,
                    }))
                  }
                  className="h-10 w-64 rounded-lg border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--vermilion)]"
                />
              </div>
            </div>

            <p className="text-sm text-[var(--neutral-text)]">
              {filteredLaptops.length} laptop
              {filteredLaptops.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`md:w-64 flex-shrink-0 ${
                showFilters ? "block" : "hidden md:block"
              }`}
            >
              <div className="bg-[var(--off-white)] rounded-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[var(--anchor-dark)]">
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-sm"
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-[var(--anchor-dark)] mb-3">
                    Availability
                  </h4>
                  <div className="space-y-2">
                    {stockOptions.map((status) => (
                      <label
                        key={status}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.stockStatus.includes(status)}
                          onChange={() => toggleStockFilter(status)}
                          className="w-4 h-4 rounded border-gray-300 text-[var(--vermilion)] focus:ring-[var(--vermilion)]"
                        />
                        <span className="text-sm text-[var(--neutral-text)]">
                          {status}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-[var(--anchor-dark)] mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label
                        key={range.value}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange === range.value}
                          onChange={() =>
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: range.value,
                            }))
                          }
                          className="w-4 h-4 border-gray-300 text-[var(--vermilion)] focus:ring-[var(--vermilion)]"
                        />
                        <span className="text-sm text-[var(--neutral-text)]">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Laptops Grid */}
            <div className="flex-1">
              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {filters.stockStatus.map((status) => (
                    <Badge
                      key={status}
                      variant="secondary"
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => toggleStockFilter(status)}
                    >
                      {status}
                      <X size={14} />
                    </Badge>
                  ))}
                  {filters.priceRange && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, priceRange: "" }))
                      }
                    >
                      {priceRanges.find((r) => r.value === filters.priceRange)
                        ?.label}
                      <X size={14} />
                    </Badge>
                  )}
                </div>
              )}

              {filteredLaptops.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLaptops.map((laptop, index) => (
                    <LaptopCard key={laptop.id} laptop={laptop} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-[var(--neutral-text)] mb-4">
                    No laptops match your filters.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-[var(--off-white)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Need Help Choosing?</h2>
            <p className="text-[var(--neutral-text)] mb-6">
              Our team can help you find the perfect laptop for your specific
              needs. We offer custom configurations and enterprise volume
              pricing.
            </p>
            <Button variant="primary" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
