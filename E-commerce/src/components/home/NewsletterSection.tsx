import { useState } from "react";
import { Icon } from "@/components/common/Icon";

type FormStatus = "idle" | "error" | "success";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <section id="newsletter" className="bg-sand">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-forest px-6 py-10 text-cream sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-14 lg:py-14">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lime">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              The KAIRO Journal
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              Slow living, <em className="text-lime">monthly</em>.
            </h2>
            <p className="mt-4 text-cream/80">
              Join 40,000+ readers for new collections, studio notes and exclusive subscriber offers.
              No spam, ever.
            </p>
          </div>

          <div className="lg:justify-self-end lg:pl-8">
            {status === "success" ? (
              <div className="flex items-center gap-4 rounded-2xl border border-cream/15 bg-cream/5 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <Icon name="check" className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-semibold">You&apos;re on the list.</p>
                  <p className="text-sm text-cream/80">Check your inbox for a little welcome gift.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
                <label htmlFor="newsletter-email" className="text-sm font-semibold text-cream">
                  Your email address
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="you@example.com"
                    aria-invalid={status === "error"}
                    className={`w-full rounded-full border bg-cream px-5 py-3 text-sm text-ink placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-lime ${
                      status === "error" ? "border-sale" : "border-transparent"
                    }`}
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-lime px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-lime-dark"
                  >
                    Subscribe
                  </button>
                </div>
                {status === "error" && (
                  <p role="alert" className="mt-2 text-sm text-lime">
                    Please enter a valid email address.
                  </p>
                )}
                <p className="mt-3 text-xs text-cream/60">
                  By subscribing you agree to our privacy policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
