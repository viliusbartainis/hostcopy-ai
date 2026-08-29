export default function NotFoundIllustration() {
  return (
    <svg
      viewBox="0 0 220 160"
      className="w-full max-w-[220px] mx-auto h-auto mb-2"
      role="img"
      aria-label="Illustration of a luggage tag with a question mark on a path that trails off"
    >
      <circle cx="110" cy="80" r="72" fill="var(--color-brass)" opacity="0.08" />

      {/* dashed path trailing off, suggesting a lost route */}
      <path
        d="M20 120 C 60 130, 90 100, 110 90"
        fill="none"
        stroke="var(--color-navy)"
        strokeWidth="2"
        strokeDasharray="1 7"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="20" cy="120" r="3" fill="var(--color-teal)" />

      {/* luggage tag, tilted */}
      <g transform="translate(75 45) rotate(-6)">
        <rect x="0" y="0" width="80" height="52" rx="8" fill="var(--color-parchment)" stroke="var(--color-navy)" strokeWidth="3" />
        <circle cx="16" cy="26" r="5" fill="var(--color-background)" stroke="var(--color-navy)" strokeWidth="2.5" />
        <text
          x="52"
          y="36"
          textAnchor="middle"
          fontFamily="Lora, serif"
          fontSize="30"
          fontWeight="600"
          fill="var(--color-brass-dark)"
        >
          ?
        </text>
      </g>

      {/* string from tag to nowhere */}
      <path d="M91 45 C 130 30, 160 45, 175 70" fill="none" stroke="var(--color-navy)" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round" opacity="0.6" />
      <circle cx="175" cy="70" r="3" fill="var(--color-brass)" />
    </svg>
  );
}
