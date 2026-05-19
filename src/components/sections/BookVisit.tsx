import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";
import {
  N8N_WEBHOOK,
  buildPhoneLink,
  buildWhatsAppLink,
} from "../../lib/constants";

const INTERESTS = [
  "Saroj Residency — Plot · ₹8.99L",
  "S.R. Super Market — Highway Shops",
  "Land near ADA Atalpuram (Kakua–Baad belt)",
  "Land on Etmadpur–Khandauli Road",
  "Land on Etmadpur–Barhan Road",
  "Land on Tundla–Etmadpur–Agra Belt",
  "Just exploring options",
];

const ASSURANCES = [
  "Free pickup from Etmadpur Bus Stand",
  "Walk-through with the developer himself",
  "All legal documents available on-site",
];

interface FormState {
  name: string;
  phone: string;
  interest: string;
  date: string;
  message: string;
}

const INITIAL: FormState = {
  name: "",
  phone: "",
  interest: INTERESTS[0],
  date: "",
  message: "",
};

export default function BookVisit() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.name.trim().length < 2) {
      setError("Please share your full name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ""))) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setSubmitting(true);
    const payload = {
      ...form,
      phone: `+91${form.phone.replace(/\D/g, "")}`,
      source: "website",
      timestamp: new Date().toISOString(),
    };
    try {
      const res = await fetch(N8N_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("webhook " + res.status);
    } catch {
      try {
        const existing = JSON.parse(
          localStorage.getItem("r3s_lead_backup") || "[]"
        );
        existing.push(payload);
        localStorage.setItem("r3s_lead_backup", JSON.stringify(existing));
      } catch {
        // ignore
      }
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="booking" className="section bg-bg">
      <div className="container-page">
        <SectionHeading
          number="06"
          label="Book Visit"
          title="Book a Free Site Visit — Saroj Residency Etmadpur"
          emWord="Free Site Visit"
          subtitle="Visit before you decide. Walk the land, meet Raju ji, and see the documentation in person."
        />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="body-text text-lg md:text-xl max-w-md">
              Numbers on a brochure tell you nothing. Walk the land. Feel the
              breeze. Meet Raju ji over chai. Then decide.
            </p>

            <div className="mt-12 space-y-4">
              {ASSURANCES.map((a) => (
                <div
                  key={a}
                  className="flex items-baseline gap-3 text-text font-light"
                >
                  <span className="text-gold">&mdash;</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>

            <p className="mt-10 text-[12px] uppercase tracking-[0.22em] text-text-muted">
              No obligation. No pressure. Honest answers.
            </p>

            <div className="mt-14 pt-8 border-t border-border flex flex-wrap gap-6">
              <a
                href={buildPhoneLink()}
                className="text-text hover:text-gold transition-colors text-sm border-b border-border-strong pb-1"
              >
                Call Raju ji
              </a>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text hover:text-gold transition-colors text-sm border-b border-border-strong pb-1"
              >
                WhatsApp now
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-bg-2 border border-border-strong p-8 md:p-12"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <div className="font-display text-3xl text-text">
                    Book Your Site Visit
                  </div>
                  <div className="mt-2 text-text-muted text-sm">
                    We&apos;ll confirm via WhatsApp within 30 minutes.
                  </div>
                </div>

                <div>
                  <label className="eyebrow">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your full name"
                    className="input-line mt-2"
                  />
                </div>

                <div>
                  <label className="eyebrow">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      update(
                        "phone",
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="input-line mt-2"
                  />
                </div>

                <div>
                  <label className="eyebrow">I&apos;m Interested In</label>
                  <select
                    value={form.interest}
                    onChange={(e) => update("interest", e.target.value)}
                    className="input-line mt-2 appearance-none cursor-pointer"
                  >
                    {INTERESTS.map((opt) => (
                      <option key={opt} value={opt} className="bg-bg-2">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="eyebrow">Preferred Visit Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="input-line mt-2"
                  />
                </div>

                <div>
                  <label className="eyebrow">Message · optional</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Optional message..."
                    rows={3}
                    className="input-line mt-2 resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 font-light">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-green btn-3d w-full disabled:opacity-60"
                  style={{ padding: "14px 24px" }}
                >
                  {submitting ? "Sending..." : "Confirm Site Visit"}
                  {!submitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 border border-gold rounded-full mb-6">
                  <Check className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-text">
                  Confirmed! Raju ji will WhatsApp you within 30 minutes.
                </h3>
                <p className="body-text mt-4 max-w-md mx-auto text-sm">
                  Thank you {form.name.split(" ")[0]}. You&apos;ll receive a
                  message about{" "}
                  <span className="text-text">{form.interest}</span> shortly.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={buildWhatsAppLink(
                      `Hi Raju ji, I just filled the form. My name is ${form.name}, interested in ${form.interest}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-green"
                  >
                    &#128172; WhatsApp directly{" "}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
