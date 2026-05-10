"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Tools", href: "/tools" },
    { label: "Guides", href: "/guides" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: scrolled
            ? "rgba(13, 27, 42, 0.9)"
            : "#0D1B2A",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid #1E3048"
            : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <nav
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 900,
                fontSize: "1.5rem",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              Grade{" "}
            </span>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 900,
                fontSize: "1.5rem",
                color: "#F5A623",
                letterSpacing: "-0.02em",
              }}
            >
              13
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    color: "#7A9BB5",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "0.9375rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "#7A9BB5")
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + mobile hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* CTA button — hidden on small screens */}
            <Link
              href="/guides"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                backgroundColor: "#F5A623",
                color: "#0D1B2A",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                padding: "0.5rem 1.125rem",
                borderRadius: "9999px",
                textDecoration: "none",
                transition: "background-color 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#FFD080";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#F5A623";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
              className="hidden-mobile"
            >
              <strong>Browse Guides</strong>
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>

            {/* Hamburger button — shown on mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                color: "#FFFFFF",
                cursor: "pointer",
                padding: "0.5rem",
              }}
              aria-label="Toggle menu"
              className="show-mobile"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            backgroundColor: "#0D1B2A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.5rem",
              background: "none",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              padding: "0.5rem",
            }}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          {/* Logo in overlay */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "2rem",
              textDecoration: "none",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>Grade </span>
            <span style={{ color: "#F5A623" }}>13</span>
          </Link>

          {/* Mobile nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#FFFFFF",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "1.875rem",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#F5A623")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#FFFFFF")
              }
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            href="/guides"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#F5A623",
              color: "#0D1B2A",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "0.875rem 2rem",
              borderRadius: "9999px",
              textDecoration: "none",
              marginTop: "1rem",
            }}
          >
            <strong>Browse Guides</strong>
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      )}

      {/* Responsive helpers — injected inline to avoid CSS file overhead */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
