export default function MagnifierIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden="true" focusable="false">
      {/* soft brass halo */}
      <circle cx="120" cy="76" r="60" fill="var(--color-brass)" opacity="0.09" />

      {/* search result rows, top one highlighted */}
      <rect x="18" y="38" width="92" height="12" rx="6" fill="var(--color-brass)" opacity="0.5" />
      <rect x="18" y="60" width="76" height="12" rx="6" fill="var(--color-navy)" opacity="0.16" />
      <rect x="18" y="82" width="84" height="12" rx="6" fill="var(--color-navy)" opacity="0.12" />
      <rect x="18" y="104" width="62" height="12" rx="6" fill="var(--color-navy)" opacity="0.1" />

      {/* house sitting under the lens */}
      <rect x="140" y="72" width="52" height="38" rx="3" fill="var(--color-parchment)" stroke="var(--color-navy)" strokeWidth="2.6" />
      <path d="M132 76 L166 50 L200 76" fill="none" stroke="var(--color-navy)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="158" y="88" width="16" height="22" rx="2" fill="var(--color-navy)" />

      {/* magnifier */}
      <circle cx="166" cy="74" r="42" fill="var(--color-parchment)" opacity="0.35" />
      <circle cx="166" cy="74" r="42" fill="none" stroke="var(--color-navy)" strokeWidth="4" />
      <line x1="196" y1="104" x2="221" y2="129" stroke="var(--color-navy)" strokeWidth="7" strokeLinecap="round" />
      <line x1="196" y1="104" x2="221" y2="129" stroke="var(--color-brass)" strokeWidth="3" strokeLinecap="round" />

      {/* rank arrow */}
      <path d="M18 130 L46 130 M40 124 L46 130 L40 136" fill="none" stroke="var(--color-teal)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
