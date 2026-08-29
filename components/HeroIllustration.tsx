export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 240 220"
      className="w-full h-auto max-w-xs mx-auto md:max-w-none"
      role="img"
      aria-label="Illustration of a house with a luggage tag key ring"
    >
      {/* soft brass halo behind the house */}
      <circle cx="120" cy="110" r="92" fill="var(--color-brass)" opacity="0.08" />

      {/* house body */}
      <rect x="55" y="100" width="110" height="80" rx="4" fill="var(--color-parchment)" stroke="var(--color-navy)" strokeWidth="3" />
      {/* roof */}
      <path d="M40 104 L110 48 L180 104" fill="none" stroke="var(--color-navy)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* chimney */}
      <rect x="148" y="60" width="12" height="26" fill="var(--color-navy)" />
      {/* door */}
      <rect x="98" y="138" width="26" height="42" rx="2" fill="var(--color-navy)" />
      <circle cx="115" cy="160" r="1.6" fill="var(--color-parchment)" />
      {/* window */}
      <rect x="136" y="122" width="20" height="20" rx="2" fill="none" stroke="var(--color-navy)" strokeWidth="2.5" />
      <line x1="146" y1="122" x2="146" y2="142" stroke="var(--color-navy)" strokeWidth="2" />
      <line x1="136" y1="132" x2="156" y2="132" stroke="var(--color-navy)" strokeWidth="2" />

      {/* string from roof peak to luggage tag */}
      <path d="M110 48 C 60 60, 30 90, 34 128" fill="none" stroke="var(--color-navy)" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" />

      {/* luggage tag */}
      <g transform="translate(6 128) rotate(-8)">
        <rect x="0" y="0" width="52" height="32" rx="6" fill="var(--color-brass)" stroke="var(--color-brass-dark)" strokeWidth="2" />
        <circle cx="12" cy="16" r="3.5" fill="var(--color-parchment)" stroke="var(--color-brass-dark)" strokeWidth="1.5" />
        <line x1="24" y1="10" x2="44" y2="10" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        <line x1="24" y1="18" x2="40" y2="18" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
        <line x1="24" y1="24" x2="36" y2="24" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      </g>

      {/* small key accent, bottom right */}
      <g transform="translate(178 168) rotate(18)">
        <circle cx="0" cy="0" r="7" fill="none" stroke="var(--color-teal)" strokeWidth="3" />
        <line x1="6" y1="0" x2="24" y2="0" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="0" x2="20" y2="7" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
        <line x1="24" y1="0" x2="24" y2="5" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
