export default function PriceTagIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden="true" focusable="false">
      {/* soft brass halo */}
      <circle cx="120" cy="76" r="60" fill="var(--color-brass)" opacity="0.09" />

      {/* house, kept small so the tag leads the composition */}
      <rect x="30" y="74" width="62" height="46" rx="4" fill="var(--color-parchment)" stroke="var(--color-navy)" strokeWidth="3" />
      <path d="M20 78 L61 46 L102 78" fill="none" stroke="var(--color-navy)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="52" y="94" width="18" height="26" rx="2" fill="var(--color-navy)" />
      <rect x="74" y="86" width="12" height="12" rx="2" fill="none" stroke="var(--color-navy)" strokeWidth="2" />

      {/* price tag, same luggage tag language as the hero */}
      <g transform="translate(112 34) rotate(-6)">
        <path d="M18 0 H88 A10 10 0 0 1 98 10 V56 A10 10 0 0 1 88 66 H18 L0 33 Z" fill="var(--color-brass)" stroke="var(--color-brass-dark)" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="20" cy="33" r="5" fill="var(--color-parchment)" stroke="var(--color-brass-dark)" strokeWidth="2" />
        <line x1="36" y1="20" x2="84" y2="20" stroke="var(--color-navy)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="36" y1="33" x2="72" y2="33" stroke="var(--color-navy)" strokeWidth="3" strokeLinecap="round" opacity="0.32" />
        <line x1="36" y1="46" x2="62" y2="46" stroke="var(--color-navy)" strokeWidth="3" strokeLinecap="round" opacity="0.32" />
      </g>

      {/* coin stack */}
      <g stroke="var(--color-teal)" strokeWidth="2.4" fill="var(--color-parchment)">
        <ellipse cx="150" cy="128" rx="19" ry="6" />
        <ellipse cx="150" cy="119" rx="19" ry="6" />
        <ellipse cx="150" cy="110" rx="19" ry="6" />
      </g>
    </svg>
  );
}
