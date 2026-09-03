interface LogoMarkProps {
  className?: string
  size?: number
}

/**
 * Arakis brand mark, reproduced as SVG from the reference artwork
 * (diagonal yellow-to-green stroke meeting a green disc). Treat this file
 * as the source of truth for the mark — do not restyle, recolor, or
 * distort it elsewhere; adjust only `size`/wrapper layout at call sites.
 */
export function LogoMark({ className, size = 32 }: LogoMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Arakis"
    >
      <defs>
        <linearGradient id="arakisMarkGradient" x1="72" y1="10" x2="38" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EAD24C" />
          <stop offset="55%" stopColor="#8CB744" />
          <stop offset="100%" stopColor="#3E8A3E" />
        </linearGradient>
      </defs>
      <line
        x1="72"
        y1="16"
        x2="40"
        y2="66"
        stroke="url(#arakisMarkGradient)"
        strokeWidth="24"
        strokeLinecap="round"
      />
      <circle cx="26" cy="74" r="14" fill="#3E8A3E" />
    </svg>
  )
}

interface LogoProps {
  className?: string
  markSize?: number
  wordmark?: boolean
  tone?: 'light' | 'dark'
}

export function Logo({ className = '', markSize = 30, wordmark = true, tone = 'light' }: LogoProps) {
  return (
    <div className={`flex items-center gap-[10px] ${className}`}>
      <LogoMark size={markSize} />
      {wordmark && (
        <span
          className={`text-[20px] leading-none tracking-[-0.03em] ${
            tone === 'light' ? 'text-paper' : 'text-ink'
          }`}
        >
          ARAKIS
        </span>
      )}
    </div>
  )
}
