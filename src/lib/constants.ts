export const COMPANY = {
  name: "R³S Realty & Developers",
  shortName: "R³S Realty",
  phone: "+91-7983071302",
  phoneDisplay: "+91 79830 71302",
  phoneTel: "+917983071302",
  whatsapp: "918273636529",
  whatsappDisplay: "+91 82736 36529",
  email: "RcubeS06@gmail.com",
  address: "S.R. Super Market, Barhan Chauraha, Etmadpur, Agra 283202",
  shortAddress: "S.R. Super Market, Near Barhan Chauraha, Etmadpur, Agra",
  website: "https://r3s-realty.netlify.app",
  rera: "Applied",
  tagline: "Roots meet rising horizons",
  mapEmbed:
    "https://maps.google.com/maps?q=Etmadpur,+Agra,+Uttar+Pradesh,+India&hl=en&z=11&output=embed",
} as const;

export const WHATSAPP_DEFAULT_MESSAGE = encodeURIComponent(
  "Hi Raju ji, I saw your website and want to know about your projects."
);

export const buildWhatsAppLink = (message?: string) => {
  const text = message ? encodeURIComponent(message) : WHATSAPP_DEFAULT_MESSAGE;
  return `https://wa.me/${COMPANY.whatsapp}?text=${text}`;
};

export const buildPhoneLink = () => `tel:${COMPANY.phoneTel}`;
export const buildMailLink = () => `mailto:${COMPANY.email}`;

export const N8N_WEBHOOK =
  "https://n8n.r3srealty.in/webhook/r3s-lead-capture";

export const SOCIAL = {
  facebook: "https://facebook.com/r3srealty",
  instagram: "https://instagram.com/r3srealty",
  youtube: "",
  whatsapp: `https://wa.me/${COMPANY.whatsapp}`,
} as const;

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Land Bank", href: "#land-bank" },
  { label: "Contact", href: "#booking" },
];

export const TRUST_BADGES: string[] = [
  "RERA Applied",
  "10+ Years Experience",
  "500+ Happy Families",
  "Free Site Visit",
];
