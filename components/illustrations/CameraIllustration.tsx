export default function CameraIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden="true" focusable="false">
      {/* soft brass halo */}
      <circle cx="120" cy="76" r="60" fill="var(--color-brass)" opacity="0.09" />

      {/* camera body */}
      <rect x="94" y="24" width="46" height="14" rx="4" fill="var(--color-navy)" />
      <rect x="50" y="36" width="140" height="86" rx="12" fill="var(--color-parchment)" stroke="var(--color-navy)" strokeWidth="3" />
      <rect x="62" y="48" width="18" height="10" rx="3" fill="var(--color-navy)" opacity="0.22" />
      <circle cx="171" cy="52" r="5" fill="var(--color-brass)" />

      {/* lens, with the house motif framed inside it */}
      <circle cx="120" cy="80" r="30" fill="none" stroke="var(--color-navy)" strokeWidth="3" />
      <circle cx="120" cy="80" r="20" fill="var(--color-parchment)" stroke="var(--color-teal)" strokeWidth="2.5" />
      <path d="M108 82 L120 71 L132 82" fill="none" stroke="var(--color-brass-dark)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="112" y="82" width="16" height="12" fill="none" stroke="var(--color-brass-dark)" strokeWidth="2.4" />

      {/* strap running down to a luggage tag */}
      <path d="M52 44 C 30 60, 26 84, 32 104" fill="none" stroke="var(--color-navy)" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" />
      <g transform="translate(10 104) rotate(-8)">
        <rect x="0" y="0" width="42" height="26" rx="6" fill="var(--color-brass)" stroke="var(--color-brass-dark)" strokeWidth="2" />
        <circle cx="11" cy="13" r="3" fill="var(--color-parchment)" stroke="var(--color-brass-dark)" strokeWidth="1.4" />
        <line x1="20" y1="9" x2="35" y2="9" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
        <line x1="20" y1="17" x2="31" y2="17" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      </g>

      {/* key accent */}
      <g transform="translate(198 118) rotate(18)">
        <circle cx="0" cy="0" r="6" fill="none" stroke="var(--color-teal)" strokeWidth="2.6" />
        <line x1="5" y1="0" x2="20" y2="0" stroke="var(--color-teal)" strokeWidth="2.6" strokeLinecap="round" />
        <line x1="16" y1="0" x2="16" y2="6" stroke="var(--color-teal)" strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}
