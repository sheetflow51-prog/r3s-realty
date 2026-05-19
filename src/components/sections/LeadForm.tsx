import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";
import { COMPANY, N8N_WEBHOOK, buildPhoneLink, buildWhatsAppLink } from "../../lib/constants";

const INTERESTS = [
  "Residential Plot",
  "Commercial Shop",
  "Farm Land",
  "Township Plot",
  "Flat / Apartment",
  "Just exploring",
];

const ASSURANCES = [
  "Free pickup from Etmadpur Bus Stand",
  "Walk-through with the developer himself",
  "No obligation — bring chai, not a chequebook",
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
  interest: "Residential Plot",
  date: "",
  message: "",
};

export default function LeadForm() {
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
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setSubmitting(true);
    const payload = {
      ...form,
      phone: `+91${form.phone}`,
      submittedAt: new Date().toISOString(),
      source: "r3s-realty.netlify.app",
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
          localStorage.getItem("r3s_leads_backup") || "[]"
        );
        existing.push(payload);
        localStorage.setItem("r3s_leads_backup", JSON.stringify(existing));
      } catch {
        // ignore
      }
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="section bg-bg">
      <div className="container-page">
        <SectionHeading
          number="05"
          label="Book Visit"
          title="Visit before you decide."
          emWord="decide"
        />

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="body-text text-lg md:text-xl max-w-md">
              Numbers on a brochure tell you nothing. Walk the land. Feel the
              breeze. Meet Raju ji over chai. Then decide.
            </p>

            <div className="mt-12 space-y-5">
              {ASSURANCES.map((a) => (
                <div key={a} className="flex items-start gap-4">
                  <span className="mt-2 h-px w-8 bg-gold/60 shrink-0" />
                  <span className="text-text font-light">{a}</span>
                </div>
              ))}
            </div>

            <div className="mt-14 pt-8 border-t border-border space-y-4">
              <div>
                <div className="eyebrow">Office</div>
                <div className="mt-2 text-text-muted text-sm">
                  {COMPANY.address}
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <a
                  href={buildPhoneLink()}
                  className="text-text hover:text-gold transition-colors text-sm border-b border-border-strong pb-1"
                >
                  {COMPANY.phone}
                </a>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text hover:text-gold transition-colors text-sm border-b border-border-strong pb-1"
                >
                  WhatsApp · {COMPANY.whatsappDisplay}
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-text hover:text-gold transition-colors text-sm border-b border-border-strong pb-1"
                >
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-bg-2 border border-border-strong p-8 md:p-12"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="eyebrow">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="e.g. Manoj Sharma"
                    className="input-line mt-2"
                  />
                </div>

                <div>
                  <label className="eyebrow">Phone</label>
                  <div className="flex items-center gap-3 mt-2 border-b border-text/15">
                    <span className="text-text-muted font-light">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={form.phone}
                      onChange={(e) =>
                        update(
                          "phone",
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      placeholder="10-digit mobile"
                      className="flex-1 bg-transparent text-text placeholder-text-muted/60 py-3 px-0 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="eyebrow">I'm Interested In</label>
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
                    placeholder="Any specific village, budget or timing"
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
                  className="btn-gold btn-3d w-full disabled:opacity-60"
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
                <h3 className="font-display text-3xl md:text-4xl text-text">
                  Raju ji will call you within 30 minutes.
                </h3>
                <p className="body-text mt-4 max-w-md mx-auto">
                  Thank you {form.name.split(" ")[0]}. You'll receive a WhatsApp
                  with shortlisted plots for{" "}
                  <span className="text-text">{form.interest}</span> shortly.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={buildWhatsAppLink(
                      `Hi Raju ji, I just filled the form. My name is ${form.name}, interested in ${form.interest}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    Open WhatsApp <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href={buildPhoneLink()} className="btn-outline">
                    Call {COMPANY.phone}
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
