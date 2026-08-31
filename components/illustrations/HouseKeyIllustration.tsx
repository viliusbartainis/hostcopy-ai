export default function HouseKeyIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden="true" focusable="false">
      {/* soft brass halo */}
      <circle cx="120" cy="76" r="60" fill="var(--color-brass)" opacity="0.09" />

      {/* house */}
      <rect x="82" y="66" width="84" height="60" rx="4" fill="var(--color-parchment)" stroke="var(--color-navy)" strokeWidth="3" />
      <path d="M68 70 L124 26 L180 70" fill="none" stroke="var(--color-navy)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="156" y="36" width="10" height="20" fill="var(--color-navy)" />
      <rect x="112" y="92" width="22" height="34" rx="2" fill="var(--color-navy)" />
      <circle cx="129" cy="110" r="1.6" fill="var(--color-parchment)" />
      <rect x="142" y="80" width="16" height="16" rx="2" fill="none" stroke="var(--color-navy)" strokeWidth="2.5" />
      <line x1="150" y1="80" x2="150" y2="96" stroke="var(--color-navy)" strokeWidth="2" />
      <line x1="142" y1="88" x2="158" y2="88" stroke="var(--color-navy)" strokeWidth="2" />

      {/* dashed string from the roof peak to the luggage tag */}
      <path d="M124 26 C 84 38, 56 62, 58 92" fill="none" stroke="var(--color-navy)" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" />

      {/* luggage tag */}
      <g transform="translate(24 90) rotate(-8)">
        <rect x="0" y="0" width="50" height="30" rx="6" fill="var(--color-brass)" stroke="var(--color-brass-dark)" strokeWidth="2" />
        <circle cx="12" cy="15" r="3.5" fill="var(--color-parchment)" stroke="var(--color-brass-dark)" strokeWidth="1.5" />
        <line x1="23" y1="10" x2="42" y2="10" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="23" y1="16" x2="38" y2="16" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" opacity="0.32" />
        <line x1="23" y1="22" x2="34" y2="22" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" opacity="0.32" />
      </g>

      {/* key accent */}
      <g transform="translate(186 112) rotate(18)">
        <circle cx="0" cy="0" r="7" fill="none" stroke="var(--color-teal)" strokeWidth="3" />
        <line x1="6" y1="0" x2="24" y2="0" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
        <line x1="19" y1="0" x2="19" y2="7" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
        <line x1="24" y1="0" x2="24" y2="5" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
