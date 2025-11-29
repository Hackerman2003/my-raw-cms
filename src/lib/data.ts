import type { Service } from "@/components/ServicesGrid";
import type { Project } from "@/components/ProjectCard";
import type { Laptop } from "@/components/LaptopCard";
import type { Testimonial } from "@/components/Testimonials";

// Sample Services Data
export const sampleServices: Service[] = [
  {
    id: "software-integration",
    title: "Software & Integration Services",
    description:
      "Seamlessly connect your business systems with custom software integrations. APIs, data pipelines, and enterprise software deployment.",
    icon: "code",
    priceTier: "Enterprise",
    features: [
      "API development & integration",
      "Enterprise software deployment",
      "Data pipeline automation",
      "Third-party system connectivity",
      "Legacy system modernization",
    ],
  },
  {
    id: "it-infrastructure",
    title: "IT Infrastructure & Support",
    description:
      "Comprehensive IT infrastructure management and support services. From network setup to 24/7 monitoring and maintenance.",
    icon: "server",
    priceTier: "Pro",
    features: [
      "Network design & implementation",
      "Server management & virtualization",
      "Cloud infrastructure setup",
      "24/7 monitoring & support",
      "Disaster recovery planning",
    ],
  },
  {
    id: "custom-software",
    title: "Custom Business Software",
    description:
      "Bespoke software solutions tailored to your business processes. Web applications, automation tools, and enterprise systems.",
    icon: "laptop",
    priceTier: "Enterprise",
    features: [
      "Custom web applications",
      "Business process automation",
      "Database design & optimization",
      "Enterprise resource planning",
      "Inventory & workflow systems",
    ],
  },
  {
    id: "electrical-electronics",
    title: "Electrical & Electronics Engineering",
    description:
      "Professional electrical and electronics engineering services. Circuit design, PCB development, embedded systems, and power solutions.",
    icon: "zap",
    priceTier: "Enterprise",
    features: [
      "Circuit design & analysis",
      "PCB design & prototyping",
      "Embedded systems development",
      "Power electronics & systems",
      "Hardware testing & validation",
    ],
  },
  {
    id: "research-development",
    title: "Research & Development",
    description:
      "Cutting-edge R&D services to bring innovative ideas to life. Prototyping, proof-of-concept, and technology exploration.",
    icon: "lightbulb",
    priceTier: "Enterprise",
    features: [
      "Technology research & analysis",
      "Prototype development",
      "Proof-of-concept builds",
      "Innovation consulting",
      "Technical feasibility studies",
    ],
  },
  {
    id: "tech-consulting",
    title: "Technology Consulting",
    description:
      "Strategic technology consulting to align your IT investments with business objectives and drive digital transformation.",
    icon: "compass",
    priceTier: "Pro",
    features: [
      "Technology roadmapping",
      "Digital transformation strategy",
      "Vendor evaluation & selection",
      "Architecture review",
      "Process optimization",
    ],
  },
];

// Sample Projects Data (Studio/Creative)
export const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Corporate Brand Video",
    slug: "corporate-brand-video",
    client: "TechStart Inc",
    date: "2024",
    coverImage: "",
    stack: ["4K Video", "Motion Graphics", "Color Grading", "Sound Design"],
    outcome: "2M+ views",
    excerpt:
      "A compelling brand story video that showcases the company's mission and values, driving engagement across all social platforms.",
  },
  {
    id: "2",
    title: "Complete Brand Identity",
    slug: "brand-identity-design",
    client: "GreenLeaf Co",
    date: "2024",
    coverImage: "",
    stack: ["Logo Design", "Brand Guidelines", "Print Materials", "Digital Assets"],
    outcome: "Full rebrand launched",
    excerpt:
      "Comprehensive brand identity design including logo, color palette, typography, and complete brand guidelines for consistent messaging.",
  },
  {
    id: "3",
    title: "Product Launch Live Stream",
    slug: "product-launch-stream",
    client: "InnovateTech",
    date: "2024",
    coverImage: "",
    stack: ["Multi-camera", "Live Graphics", "Real-time Switching", "YouTube/LinkedIn"],
    outcome: "50K live viewers",
    excerpt:
      "Professional multi-platform live stream for a major product launch, featuring real-time graphics and seamless broadcast quality.",
  },
  {
    id: "4",
    title: "Animated Explainer Series",
    slug: "animated-explainer-series",
    client: "EduPlatform",
    date: "2023",
    coverImage: "",
    stack: ["2D Animation", "Motion Graphics", "Voice Over", "Script Writing"],
    outcome: "10 episodes delivered",
    excerpt:
      "A series of engaging animated explainer videos that simplify complex concepts for the client's educational platform.",
  },
];

// Sample Laptops Data
export const sampleLaptops: Laptop[] = [
  {
    id: "1",
    name: "Dell XPS 15 (Custom)",
    slug: "dell-xps-15-custom",
    price: 1699,
    currency: "USD",
    specs: {
      cpu: "Intel i7-13700H",
      ram: "32GB DDR5",
      storage: "1TB NVMe",
      gpu: "RTX 4060",
      os: "Windows 11 Pro / Custom Linux",
    },
    images: [],
    stockStatus: "In Stock",
    notes: "Optimized for development and creative work",
  },
  {
    id: "2",
    name: "ThinkPad X1 Carbon Gen 11",
    slug: "thinkpad-x1-carbon-gen11",
    price: 1549,
    currency: "USD",
    specs: {
      cpu: "Intel i7-1365U",
      ram: "16GB DDR5",
      storage: "512GB NVMe",
      gpu: "Intel Iris Xe",
      os: "Windows 11 Pro",
    },
    images: [],
    stockStatus: "In Stock",
    notes: "Enterprise-ready with enhanced security features",
  },
  {
    id: "3",
    name: "MacBook Pro 14\" M3 Pro",
    slug: "macbook-pro-14-m3-pro",
    price: 2499,
    currency: "USD",
    specs: {
      cpu: "Apple M3 Pro",
      ram: "18GB Unified",
      storage: "512GB SSD",
      gpu: "14-core GPU",
      os: "macOS Sonoma",
    },
    images: [],
    stockStatus: "Limited",
    notes: "Best-in-class performance for creative professionals",
  },
  {
    id: "4",
    name: "HP ZBook Studio G10",
    slug: "hp-zbook-studio-g10",
    price: 2199,
    currency: "USD",
    specs: {
      cpu: "Intel i9-13900H",
      ram: "64GB DDR5",
      storage: "2TB NVMe",
      gpu: "RTX 4070",
      os: "Windows 11 Pro for Workstations",
    },
    images: [],
    stockStatus: "In Stock",
    notes: "Professional mobile workstation for demanding tasks",
  },
  {
    id: "5",
    name: "Framework Laptop 16",
    slug: "framework-laptop-16",
    price: 1399,
    currency: "USD",
    specs: {
      cpu: "AMD Ryzen 7 7840HS",
      ram: "32GB DDR5",
      storage: "1TB NVMe",
      gpu: "AMD Radeon 780M",
      os: "Windows 11 / Linux",
    },
    images: [],
    stockStatus: "Limited",
    notes: "Fully upgradeable and repairable",
  },
  {
    id: "6",
    name: "ASUS ROG Zephyrus G14",
    slug: "asus-rog-zephyrus-g14",
    price: 1799,
    currency: "USD",
    specs: {
      cpu: "AMD Ryzen 9 7940HS",
      ram: "16GB DDR5",
      storage: "1TB NVMe",
      gpu: "RTX 4060",
      os: "Windows 11 Home",
    },
    images: [],
    stockStatus: "Out of Stock",
    notes: "Gaming laptop with premium build quality",
  },
];

// Sample Testimonials Data
export const sampleTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Ditronics transformed our IT infrastructure. Their software integration was seamless, and our business systems work better than ever.",
    author: "Sarah Chen",
    title: "CTO, FinCo",
    metrics: "42% fewer incidents",
  },
  {
    id: "2",
    quote:
      "Their custom software solutions have revolutionized our workflow. What used to take hours now takes minutes.",
    author: "Michael Rodriguez",
    title: "Operations Director, TechFlow",
    metrics: "3x faster processing",
  },
  {
    id: "3",
    quote:
      "The R&D team helped us bring our innovative product to market. Their technical expertise and research capabilities are outstanding.",
    author: "Dr. Emily Watson",
    title: "CEO, InnovateLab",
    metrics: "Product launched in 6 months",
  },
];
