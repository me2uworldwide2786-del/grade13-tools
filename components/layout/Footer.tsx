"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ── Inline brand SVGs (lucide-react has no social icons) ─────────── */

function IconYouTube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.72a4.85 4.85 0 0 1-1.01-.03z" />
    </svg>
  );
}

function IconTwitterX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── Animated social button ───────────────────────────────────────── */

interface SocialButtonProps {
  href: string;
  label: string;
  duration: number;
  children: React.ReactNode;
}

function SocialButton({ href, label, duration, children }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        backgroundColor: "#162236",
        border: "1px solid #1E3048",
        borderRadius: "8px",
        color: "#FFFFFF",
        textDecoration: "none",
        flexShrink: 0,
        transition: "background-color 0.2s",
      }}
      className="social-icon-btn"
    >
      {/*
       * Mask wrapper — restricts the traveling comet to the 1px border
       * region only (same XOR mask used on the hero badge).
       *
       * Both layers must be opaque (#000) for exclude/XOR to work:
       *   padding-box opaque  ⊕  border-box opaque  =  border area only
       */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "8px",
          border: "1px solid transparent",
          maskImage: "linear-gradient(#000,#000), linear-gradient(#000,#000)",
          maskClip: "padding-box, border-box",
          maskComposite: "exclude",
          WebkitMaskImage: "linear-gradient(#000,#000), linear-gradient(#000,#000)",
          WebkitMaskClip: "padding-box, border-box",
          WebkitMaskComposite: "xor",
          pointerEvents: "none",
        } as React.CSSProperties}
      >
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "16px",
            height: "16px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.8), white)",
            borderRadius: "9999px",
            offsetPath: "rect(0 auto auto 0 round 8px)",
            offsetRotate: "auto",
          } as React.CSSProperties}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Icon — above the comet layer */}
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </a>
  );
}

/* ── Social button data ────────────────────────────────────────────── */

const SOCIAL_BUTTONS = [
  {
    href:     "https://www.youtube.com/@grade13sa",
    label:    "YouTube",
    duration: 6,
    Icon:     IconYouTube,
  },
  {
    href:     "https://www.instagram.com/grade13sa",
    label:    "Instagram",
    duration: 7,
    Icon:     IconInstagram,
  },
  {
    href:     "https://www.facebook.com/grade13southafrica",
    label:    "Facebook",
    duration: 8,
    Icon:     IconFacebook,
  },
  {
    href:     "https://www.tiktok.com/@grade13sa",
    label:    "TikTok",
    duration: 9,
    Icon:     IconTikTok,
  },
  {
    href:     "https://www.x.com/grade13sa",
    label:    "Twitter / X",
    duration: 10,
    Icon:     IconTwitterX,
  },
] as const;

/* ── Footer component ─────────────────────────────────────────────── */

export default function Footer() {
  const navLinks = [
    { label: "Tools",  href: "/tools"  },
    { label: "Guides", href: "/guides" },
    { label: "Blog",   href: "/blog"   },
    { label: "About",  href: "/about"  },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#111D2C",
        borderTop: "1px solid #1E3048",
        padding: "4rem 1.5rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Top row: logo + tagline + nav */}
        <div className="footer-top-grid">
          {/* Logo + tagline + description */}
          <div style={{ maxWidth: "380px" }}>
            <Link href="/" className="footer-logo-link">
              <span className="footer-logo-grade">Grade </span>
              <span className="footer-logo-13">13</span>
            </Link>

            <p className="footer-desc">
              SA&apos;s dedicated small business education hub. Practical, locally
              relevant tools and guides for young graduates, matrics, side
              hustlers, and aspiring entrepreneurs.
            </p>

            <em className="footer-tagline">
              &ldquo;School ends at Grade 12. Life starts at Grade 13.&rdquo;
            </em>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <p className="footer-nav-heading">Navigate</p>
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-nav-link">
                    <ArrowRight size={12} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom row: legal + social icon buttons */}
        <div className="footer-bottom">
          <p className="footer-legal">
            &copy; 2025 Me2UWorldWide PTY Ltd |{" "}
            <strong>Grade 13</strong> is a registered brand
          </p>

          <div className="footer-social">
            {SOCIAL_BUTTONS.map(({ href, label, duration, Icon }) => (
              <SocialButton key={label} href={href} label={label} duration={duration}>
                <Icon />
              </SocialButton>
            ))}
          </div>
        </div>

        {/* Final tagline */}
        <p className="footer-final-tagline">
          <em>&ldquo;School ends at Grade 12. Life starts at Grade 13.&rdquo;</em>
        </p>
      </div>

      <style>{`
        .footer-top-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          align-items: start;
          margin-bottom: 3rem;
        }
        .footer-logo-link {
          display: inline-block;
          text-decoration: none;
          margin-bottom: 0.75rem;
        }
        .footer-logo-grade {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: 1.75rem;
          color: #FFFFFF;
          letter-spacing: -0.02em;
        }
        .footer-logo-13 {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: 1.75rem;
          color: #F5A623;
          letter-spacing: -0.02em;
        }
        .footer-desc {
          color: #7A9BB5;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.9375rem;
          line-height: 1.6;
          margin: 0 0 1rem;
        }
        .footer-tagline {
          color: #F5A623;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.875rem;
          font-style: italic;
        }
        .footer-nav-heading {
          color: #FFFFFF;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1rem;
        }
        .footer-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .footer-nav-link {
          color: #7A9BB5;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.9375rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          transition: color 0.2s;
        }
        .footer-nav-link:hover {
          color: #F5A623;
        }
        .footer-divider {
          height: 1px;
          background-color: #1E3048;
          margin: 0 0 1.5rem;
        }
        .footer-bottom {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        .footer-legal {
          color: #7A9BB5;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.8125rem;
          margin: 0;
        }
        .footer-legal strong {
          color: #7A9BB5;
        }
        .footer-social {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .social-icon-btn:hover {
          background-color: #1E3048 !important;
        }
        .footer-final-tagline {
          text-align: center;
          color: #F5A623;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-style: italic;
          font-size: 0.875rem;
          margin-top: 2rem;
          margin-bottom: 0;
        }
        @media (max-width: 640px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
