// src/components/course/Icon.jsx
// Lightweight inline SVG icon component

const paths = {
  search: (
    <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>
  ),
  grid: (
    <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>
  ),
  list: (
    <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6" strokeWidth="3" strokeLinecap="round"/>
    <line x1="3" y1="12" x2="3.01" y2="12" strokeWidth="3" strokeLinecap="round"/>
    <line x1="3" y1="18" x2="3.01" y2="18" strokeWidth="3" strokeLinecap="round"/></>
  ),
  chevron: <polyline points="6 9 12 15 18 9"/>,
  back: <polyline points="15 18 9 12 15 6"/>,
  video: (
    <><polygon points="23 7 16 12 23 17 23 7" fill="currentColor"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></>
  ),
  pdf: (
    <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/></>
  ),
  assignment: (
    <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>
  ),
  quiz: (
    <><circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" strokeLinecap="round"/></>
  ),
  lab: (
    <><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11l-4 7h14l-4-7V3"/></>
  ),
  check: <polyline points="20 6 9 17 4 12" strokeWidth="2.5"/>,
  lock: (
    <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/></>
  ),
  play: <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>,
  clock: (
    <><circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/></>
  ),
  book: (
    <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>
  ),
  award: (
    <><circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></>
  ),
  users: (
    <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/></>
  ),
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none"/>,
  "bar-chart": (
    <><line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/></>
  ),
  eye: (
    <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/></>
  ),
};

export default function Icon({ name, size = 16, color = "currentColor", className = "" }) {
  const content = paths[name];
  if (!content) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0 }}
    >
      {content}
    </svg>
  );
}
