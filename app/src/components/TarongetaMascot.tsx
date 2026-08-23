/**
 * Hand-drawn little orange ("tarongeta"), inspired by the sketch on the
 * original cardboard coming-soon sign.
 */
export default function TarongetaMascot({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="La Tarongeta: una naranjita sonriente"
      className={className}
    >
      {/* body, slightly wobbly like a hand-cut shape */}
      <path
        d="M100 32 C 141 29 171 63 169 103 C 167 145 138 174 99 173 C 60 172 29 142 31 100 C 33 61 62 35 100 32 Z"
        fill="#f7941d"
        stroke="#7c3f00"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* light catch */}
      <path
        d="M56 66 C 64 51 81 42 96 41"
        stroke="#ffc46b"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      {/* peel dimples */}
      <g fill="#c96a08" opacity="0.45">
        <circle cx="58" cy="92" r="2" />
        <circle cx="70" cy="140" r="2" />
        <circle cx="140" cy="76" r="2" />
        <circle cx="147" cy="128" r="2" />
        <circle cx="104" cy="158" r="2" />
      </g>
      {/* stem */}
      <path
        d="M100 31 C 99 23 97 17 92 11"
        stroke="#5a8f3c"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* leaf */}
      <path
        d="M104 23 C 117 6 142 5 151 14 C 144 30 119 35 104 23 Z"
        fill="#6da644"
        stroke="#3f6b24"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M110 21 C 122 15 134 13 145 15"
        stroke="#3f6b24"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* face */}
      <circle cx="79" cy="96" r="6" fill="#3b3229" />
      <circle cx="125" cy="96" r="6" fill="#3b3229" />
      <path
        d="M80 121 C 91 132 113 132 124 121"
        stroke="#3b3229"
        strokeWidth="5.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="63" cy="113" r="7.5" fill="#f26d5b" opacity="0.5" />
      <circle cx="141" cy="113" r="7.5" fill="#f26d5b" opacity="0.5" />
    </svg>
  );
}
