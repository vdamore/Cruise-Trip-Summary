// Tabler-style inline SVG icons
const ico = (path, viewBox = "0 0 24 24") => ({ size = 20, color = "currentColor", stroke = 1.5, className = "", style = {} } = {}) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">{path}</svg>
);

const Icons = {
  User: ico(<><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M6 21v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1"/></>),
  Users: ico(<><path d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M3 21v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1"/><path d="M16 4a4 4 0 0 1 0 8"/><path d="M21 21v-1a4 4 0 0 0-3-3.87"/></>),
  Calendar: ico(<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/><circle cx="8" cy="15" r="1" fill="currentColor"/></>),
  Ship: ico(<><path d="M2 20a3 3 0 0 0 2 1c1.5 0 2-1 3.5-1s2 1 3.5 1 2-1 3.5-1 2 1 3.5 1a3 3 0 0 0 2-1"/><path d="M4 18 3 13h18l-1 5"/><path d="M12 4v9M6 10l6-2 6 2"/></>),
  ExternalLink: ico(<><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/></>),
  Edit: ico(<><path d="M4 20h4l10-10-4-4L4 16v4Z"/><path d="m14 6 4 4"/></>),
  Image: ico(<><rect x="3" y="5" width="16" height="14" rx="2"/><path d="M7 15l3-3 3 3 2-2 4 4"/><circle cx="9" cy="10" r="1.5"/></>),
  Pin: ico(<><path d="M12 21s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></>),
  Tag: ico(<><path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/></>),
  Bookmark: ico(<><path d="M6 3h12v18l-6-4-6 4V3Z"/></>),
  ArrowRight: ico(<path d="M5 12h14M13 5l7 7-7 7"/>),
  Check: ico(<path d="M5 12l4 4L19 7"/>),
  CheckBold: ico(<path d="M5 12l4 4L19 7"/>),
  X: ico(<path d="M6 6l12 12M18 6L6 18"/>),
  Info: ico(<><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M11 12h1v4h1"/></>),
  AlertCircle: ico(<><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16v.01"/></>),
  Shield: ico(<path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3Z"/>),
  Plus: ico(<path d="M12 5v14M5 12h14"/>),
  Minus: ico(<path d="M5 12h14"/>),
  Sparkles: ico(<><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></>),
  Clock: ico(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>),
  Utensils: ico(<><path d="M6 3v8a2 2 0 0 0 4 0V3M8 11v10"/><path d="M15 3c-2 0-2 3-2 5s2 3 2 3v10"/></>),
  Bed: ico(<><path d="M3 18V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10"/><path d="M3 14h18M3 21v-3M21 21v-3"/><circle cx="8" cy="11" r="1.5"/></>),
  Leaf: ico(<><path d="M5 21c0-9 5-15 16-15-1 11-7 16-16 15Z"/><path d="M5 21 14 12"/></>),
  Accessibility: ico(<><circle cx="12" cy="5" r="1.5"/><path d="M5 9h14M12 9v5l-3 7M12 14l3 7M9 13h6"/></>),
  Gift: ico(<><rect x="3" y="8" width="18" height="12" rx="1"/><path d="M12 8v12M3 12h18"/><path d="M7 8a3 3 0 0 1 5-3 3 3 0 0 1 5 3"/></>),
  Wifi: ico(<><path d="M5 12a11 11 0 0 1 14 0"/><path d="M8.5 15a6 6 0 0 1 7 0"/><circle cx="12" cy="18" r="1" fill="currentColor"/></>),
  Camera: ico(<><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/></>),
  Wine: ico(<><path d="M8 3h8l-1 8a3 3 0 0 1-6 0L8 3Z"/><path d="M12 14v5M9 19h6"/></>),
  Anchor: ico(<><circle cx="12" cy="6" r="2.5"/><path d="M12 9v12M5 14l-2 2a10 10 0 0 0 9 5 10 10 0 0 0 9-5l-2-2"/><path d="M8 13h8"/></>),
  Loader: ico(<><path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></>),
  Plane: ico(<path d="M3 12 21 4l-3 9 3 9-9-3-7 4 4-7-6-4Z" transform="rotate(-30 12 12)"/>),
  Hotel: ico(<><path d="M3 21V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v13"/><path d="M3 21h18M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-4h4v4"/></>),
  Car: ico(<><path d="M5 16h14l-1.5-5a2 2 0 0 0-2-1.5h-7a2 2 0 0 0-2 1.5L5 16Z"/><circle cx="8" cy="17.5" r="1.5"/><circle cx="16" cy="17.5" r="1.5"/><path d="M5 16v3M19 16v3"/></>),
  Star: ico(<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.2L12 17l-5.5 3 1-6.2L3 9.5l6.1-.9L12 3Z" fill="currentColor" stroke="none"/>),
  ArrowDown: ico(<path d="M12 5v14M5 12l7 7 7-7"/>),
};

window.Icons = Icons;
