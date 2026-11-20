"use client";

const PARTNERS = [
  {
    name: "SOLEN ARCHITEKTUR",
    mark: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.4" />
        <line x1="10" y1="2.75" x2="10" y2="17.25" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    name: "NORDVAAL",
    mark: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <polygon points="10,2.5 17.5,16.5 2.5,16.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    name: "ATELIER VELD",
    mark: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="14" height="14" stroke="currentColor" strokeWidth="1.4" />
        <rect x="7" y="7" width="6" height="6" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    name: "KADENS LAB",
    mark: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <line x1="4" y1="15" x2="4" y2="5" stroke="currentColor" strokeWidth="1.4" />
        <line x1="10" y1="17" x2="10" y2="3" stroke="currentColor" strokeWidth="1.4" />
        <line x1="16" y1="13" x2="16" y2="7" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    name: "VERKSTATT 09",
    mark: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 10H17M10 3V17" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    name: "HELVETIA SOUND",
    mark: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2.5" y="5.5" width="15" height="9" rx="4.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="10" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

export function PartnerMarquee() {
  const repeated = [...PARTNERS, ...PARTNERS];

  return (
    <section
      aria-label="Студии и архитектурные бюро"
      className="relative w-full border-y border-white/[0.06] py-9 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#07080A] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#07080A] to-transparent"
      />

      <div className="animate-marquee items-center gap-16 pr-16">
        {repeated.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            aria-hidden={index >= PARTNERS.length}
            className="flex items-center gap-3 text-[#8E95A2] opacity-75 transition-opacity duration-500 hover:opacity-100 hover:text-[#F4F5F7]"
          >
            {partner.mark}
            <span className="font-mono text-[12px] tracking-[0.22em] whitespace-nowrap">
              {partner.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
