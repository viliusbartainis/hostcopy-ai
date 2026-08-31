export default function StarsIllustration({ className }: { className?: string }) {
  const star = "0,-11 2.7,-3.7 10.5,-3.4 4.2,1.4 6.5,8.9 0,4.4 -6.5,8.9 -4.2,1.4 -10.5,-3.4 -2.7,-3.7";

  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden="true" focusable="false">
      {/* soft brass halo */}
      <circle cx="120" cy="76" r="60" fill="var(--color-brass)" opacity="0.09" />

      {/* five stars, the last one still outlined */}
      <g fill="var(--color-brass)" stroke="var(--color-brass-dark)" strokeWidth="1.5">
        <polygon points={star} transform="translate(80 28)" />
        <polygon points={star} transform="translate(104 28)" />
        <polygon points={star} transform="translate(128 28)" />
        <polygon points={star} transform="translate(152 28)" />
        <polygon points={star} transform="translate(176 28)" fill="none" />
      </g>

      {/* house */}
      <rect x="84" y="82" width="72" height="46" rx="4" fill="var(--color-parchment)" stroke="var(--color-navy)" strokeWidth="3" />
      <path d="M72 86 L120 54 L168 86" fill="none" stroke="var(--color-navy)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="108" y="102" width="20" height="26" rx="2" fill="var(--color-navy)" />
      <rect x="136" y="94" width="14" height="14" rx="2" fill="none" stroke="var(--color-navy)" strokeWidth="2.2" />

      {/* guest review bubble */}
      <path d="M14 62 H62 A8 8 0 0 1 70 70 V96 A8 8 0 0 1 62 104 H36 L24 116 V104 H14 A8 8 0 0 1 6 96 V70 A8 8 0 0 1 14 62 Z" fill="var(--color-parchment)" stroke="var(--color-navy)" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M16 84 l6 6 12 -14" fill="none" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="42" y1="76" x2="60" y2="76" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <line x1="42" y1="92" x2="58" y2="92" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

      {/* key accent */}
      <g transform="translate(192 118) rotate(18)">
        <circle cx="0" cy="0" r="6" fill="none" stroke="var(--color-teal)" strokeWidth="2.6" />
        <line x1="5" y1="0" x2="20" y2="0" stroke="var(--color-teal)" strokeWidth="2.6" strokeLinecap="round" />
        <line x1="16" y1="0" x2="16" y2="6" stroke="var(--color-teal)" strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}
