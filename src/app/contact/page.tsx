import { ContactForm } from "./ContactForm";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Ditronics",
  description:
    "Get in touch with our team. We're here to help with your IT needs.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[var(--off-white)] to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Get in Touch</h1>
            <p className="text-xl text-[var(--neutral-text)]">
              Have a question or ready to start a project? We&apos;d love to
              hear from you. Fill out the form below and we&apos;ll get back to
              you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-[var(--anchor-dark)] mb-6">
                Contact Information
              </h2>
              <p className="text-[var(--neutral-text)] mb-8">
                Reach out through any of these channels or fill out the form.
                We&apos;re here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--vermilion)]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-[var(--vermilion)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--anchor-dark)]">
                      Email
                    </h3>
                    <a
                      href="mailto:info@ditronics.co.tz"
                      className="text-[var(--anchor-dark)] hover:underline"
                    >
                      info@ditronics.co.tz
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--vermilion)]/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-[var(--vermilion)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--anchor-dark)]">
                      Phone
                    </h3>
                    <a
                      href="tel:+255717321753"
                      className="text-[var(--anchor-dark)] hover:underline"
                    >
                      +255 717 321 753
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--vermilion)]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[var(--vermilion)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--anchor-dark)]">
                      Office
                    </h3>
                    <p className="text-[var(--neutral-text)]">
                      Shangwe Kibada
                      <br />
                      Dar es Salaam, Tanzania
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--vermilion)]/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-[var(--vermilion)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--anchor-dark)]">
                      Hours
                    </h3>
                    <p className="text-[var(--neutral-text)]">
                      Mon - Fri: 9am - 6pm EAT
                      <br />
                      24/7 Support for clients
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-[var(--off-white)] rounded-lg p-8">
                <h2 className="text-2xl font-bold text-[var(--anchor-dark)] mb-6">
                  Send us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-gray-200 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d495.1382159487743!2d39.34260127383935!3d-6.877935025779765!3m2!1i1024!2i768!4f13.1!2m1!1sSHANGWE%20KIBADA!5e0!3m2!1sen!2stz!4v1764421644928!5m2!1sen!2stz"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ditronics Location"
        />
      </section>
    </>
  );
}
