"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm, type ContactFormState } from "./actions";
import { CheckCircle, Loader2 } from "lucide-react";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

function ContactFormContent() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.success) {
    return (
      <div className="bg-[var(--teal-green)]/10 border border-[var(--teal-green)] rounded-lg p-8 text-center">
        <CheckCircle
          size={48}
          className="text-[var(--teal-green)] mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-[var(--anchor-dark)] mb-2">
          Message Sent!
        </h3>
        <p className="text-[var(--neutral-text)]">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.message && !state.success && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
          {state.message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[var(--anchor-dark)] mb-2"
          >
            Name *
          </label>
          <Input
            id="name"
            name="name"
            required
            placeholder="John Doe"
            aria-describedby={state.errors?.name ? "name-error" : undefined}
          />
          {state.errors?.name && (
            <p id="name-error" className="text-red-500 text-sm mt-1">
              {state.errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--anchor-dark)] mb-2"
          >
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@company.com"
            aria-describedby={state.errors?.email ? "email-error" : undefined}
          />
          {state.errors?.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1">
              {state.errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-[var(--anchor-dark)] mb-2"
        >
          Company
        </label>
        <Input id="company" name="company" placeholder="Company Inc." />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[var(--anchor-dark)] mb-2"
        >
          Message *
        </label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell us about your project and how we can help..."
          rows={5}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
        />
        {state.errors?.message && (
          <p id="message-error" className="text-red-500 text-sm mt-1">
            {state.errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      <p className="text-sm text-[var(--neutral-text)] text-center">
        By submitting this form, you agree to our{" "}
        <a href="#" className="text-[var(--anchor-dark)] hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

export function ContactForm() {
  return <ContactFormContent />;
}
