export const defineSVGDefs = () => (
  <svg style={{ height: 0, width: 0 }}>
    <defs>
      <linearGradient id="fade-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="indigo" />
        <stop offset="100%" stopColor="pink" />
      </linearGradient>
      <linearGradient id="fade-2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="pink" />
        <stop offset="100%" stopColor="indigo" />
      </linearGradient>
    </defs>
  </svg>
)

export const generateCircle = () => (
  <svg viewBox="0 0 100 100">
    <circle
      cx="50"
      cy="50"
      fill="none"
      r="25"
      stroke="url(#fade-2)"
      strokeDasharray="160"
      strokeDashoffset="160"
      strokeLinecap="round"
      strokeWidth="10"
    >
      <animate
        attributeName="stroke-dashoffset"
        begin="0s"
        dur="0.5s"
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill#animate
        fill="freeze"
        from="160"
        to="320"
      />
    </circle>
  </svg>
)

export const generateCross = () => (
  <svg viewBox="0 0 100 100">
    <line
      stroke="url(#fade-1)"
      strokeDasharray="80"
      strokeDashoffset="80"
      strokeLinecap="round"
      strokeWidth="10"
      x1="25"
      x2="75"
      y1="25"
      y2="75"
    >
      <animate
        attributeName="stroke-dashoffset"
        begin="0.25s"
        dur="0.25s"
        fill="freeze"
        from="80"
        to="0"
      />
    </line>
    <line
      stroke="url(#fade-1)"
      strokeDasharray="80"
      strokeDashoffset="80"
      strokeLinecap="round"
      strokeWidth="10"
      x1="75"
      x2="25"
      y1="25"
      y2="75"
    >
      <animate
        attributeName="stroke-dashoffset"
        begin="0s"
        dur="0.25s"
        fill="freeze"
        from="80"
        to="0"
      />
    </line>
  </svg>
)
