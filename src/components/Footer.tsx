import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { getAllSettings } from "@/lib/db";

const footerLinks = {
  company: [
    { href: "/services", label: "Services" },
    { href: "/studio", label: "Studio" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services#software-integration", label: "Software & Integration" },
    { href: "/services#it-infrastructure", label: "IT Infrastructure" },
    { href: "/services#custom-software", label: "Custom Software" },
    { href: "/services#electrical-electronics", label: "Electrical & Electronics" },
  ],
  resources: [
    { href: "/laptops", label: "Laptop Catalog" },
    { href: "/studio", label: "Case Studies" },
    { href: "/docs", label: "Documentation" },
    { href: "/faq", label: "FAQ" },
  ],
};

export function Footer() {
  const settings = getAllSettings();
  const phoneNumber = settings.phone_number || '255717321753';
  const email = settings.email || 'info@ditronics.co.tz';
  const address = settings.address || 'Shangwe Kibada, Tanzania';
  const companyName = settings.company_name || 'Ditronics';
  
  // Format phone for display (add + and spaces)
  const formatPhoneDisplay = (phone: string) => {
    if (phone.startsWith('255')) {
      return `+${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
    }
    return `+${phone}`;
  };

  return (
    <footer className="bg-[var(--anchor-dark)] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white hover:opacity-80 transition-opacity"
            >
              <Image
                src="/DITRONICS-COMPANY-LOGO.png"
                alt={`${companyName} Logo`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-white">{companyName}</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for software integration, IT infrastructure,
              custom business solutions, and innovative R&D services.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={16} className="text-gray-300" />
                <span className="text-gray-300">{email}</span>
              </a>
              <a
                href={`tel:+${phoneNumber}`}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Phone size={16} className="text-gray-300" />
                <span className="text-gray-300">{formatPhoneDisplay(phoneNumber)}</span>
              </a>
              <span className="flex items-center gap-2 text-gray-300">
                <MapPin size={16} className="text-gray-300" />
                <span className="text-gray-300">{address}</span>
              </span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2025 DITRONICS. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
