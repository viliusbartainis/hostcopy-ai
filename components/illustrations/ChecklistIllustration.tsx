export default function ChecklistIllustration({ className }: { className?: string }) {
  const rows = [
    { y: 44, done: true, width: 54 },
    { y: 66, done: true, width: 44 },
    { y: 88, done: true, width: 50 },
    { y: 110, done: false, width: 38 },
  ];

  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden="true" focusable="false">
      {/* soft brass halo */}
      <circle cx="120" cy="76" r="60" fill="var(--color-brass)" opacity="0.09" />

      {/* house */}
      <rect x="16" y="86" width="54" height="40" rx="3" fill="var(--color-parchment)" stroke="var(--color-navy)" strokeWidth="2.6" />
      <path d="M8 90 L43 62 L78 90" fill="none" stroke="var(--color-navy)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="34" y="104" width="16" height="22" rx="2" fill="var(--color-navy)" />

      {/* clipboard */}
      <g transform="rotate(2 148 78)">
        <rect x="100" y="22" width="96" height="112" rx="10" fill="var(--color-parchment)" stroke="var(--color-navy)" strokeWidth="3" />
        <rect x="130" y="14" width="36" height="16" rx="5" fill="var(--color-brass)" stroke="var(--color-brass-dark)" strokeWidth="2" />
        {rows.map((row) => (
          <g key={row.y}>
            <rect x="112" y={row.y} width="14" height="14" rx="3" fill="none" stroke="var(--color-navy)" strokeWidth="2.2" />
            {row.done && (
              <path
                d={`M115 ${row.y + 7} l3.4 3.6 6 -7.4`}
                fill="none"
                stroke="var(--color-teal)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <line
              x1="134"
              y1={row.y + 7}
              x2={134 + row.width}
              y2={row.y + 7}
              stroke="var(--color-navy)"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity={row.done ? 0.45 : 0.22}
            />
          </g>
        ))}
      </g>

      {/* key accent */}
      <g transform="translate(206 126) rotate(18)">
        <circle cx="0" cy="0" r="6" fill="none" stroke="var(--color-teal)" strokeWidth="2.6" />
        <line x1="5" y1="0" x2="18" y2="0" stroke="var(--color-teal)" strokeWidth="2.6" strokeLinecap="round" />
        <line x1="15" y1="0" x2="15" y2="6" stroke="var(--color-teal)" strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}
