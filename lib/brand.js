const BRANDS = {
  cynosure: {
    theme: "cynosure",
    portalTitle: "Cynosure Customer Portal",
    rootTitle: "Cynosure — Customer Portal",
    description: "Follow your Cynosure Recycling orders.",
    companyName: "Cynosure Recycling Private Limited",
    companyShort: "Cynosure Recycling",
    brandAriaLabel: "Cynosure — my orders",
    logoSrc: "/cynosure-logo.png",
    logoWidth: 207,
    logoHeight: 40,
    headerLogoWidth: 140,
    headerLogoHeight: 27,
    iconSrc: "/cynosure-icon.png",
    appleIconSrc: "/cynosure-apple-icon.png",
    ogImageSrc: "/cynosure-og.png",
  },
  lterp: {
    theme: "lterp",
    portalTitle: "Customer Portal",
    rootTitle: "Customer Portal — Lifecycle & Traceability ERP",
    description: "Follow your Reviens Tech orders.",
    companyName: "Reviens Tech",
    companyShort: "Reviens Tech",
    brandAriaLabel: "Lifecycle & Traceability ERP — my orders",
    logoSrc: "/brand-logo.png",
    logoWidth: 207,
    logoHeight: 56,
    headerLogoWidth: 140,
    headerLogoHeight: 38,
    iconSrc: "/brand-mark.png",
    appleIconSrc: "/brand-mark.png",
    ogImageSrc: "/lterp-og.png",
  },
};

export function getBrand() {
  const raw = (process.env.NEXT_PUBLIC_THEME ?? process.env.THEME ?? "cynosure").trim().toLowerCase();
  return raw === "lterp" ? BRANDS.lterp : BRANDS.cynosure;
}

export const brand = getBrand();
