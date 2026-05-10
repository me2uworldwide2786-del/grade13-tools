import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import HeroBackground from "@/components/ui/HeroBackground";
import EmailCapture from "@/components/layout/EmailCapture";

export const metadata: Metadata = {
  title: "Blog — Grade 13",
  description:
    "Real talk on SA business, side hustles, tax, and getting started. No corporate fluff.",
};

/* ── Article card data ────────────────────────────────────────────── */

const ARTICLES = [
  {
    category: "Business Registration",
    title: "How to Register a PTY Ltd in South Africa in 2026 — Step by Step",
    excerpt:
      "Everyone says you should register a company, but nobody walks you through the actual CIPC eServices screens. This article does — name reservation, MOI, Beneficial Ownership, and the post-registration steps most people miss.",
    readTime: "8 min read",
    pairedGuide: "CIPC Business Registration Guide",
  },
  {
    category: "Tax & SARS",
    title: "Do I Have to Pay Tax on My Side Hustle? The Honest Answer",
    excerpt:
      "Short answer: yes, probably. Long answer: it depends on how much, what kind, and how SARS finds out. We break down the rules, the thresholds, and what happens if you ignore it.",
    readTime: "6 min read",
    pairedGuide: "SARS Tax Guide",
  },
  {
    category: "CVs & Careers",
    title: "How to Write a CV With No Experience in South Africa",
    excerpt:
      "If you've never had a formal job, your CV doesn't need to be empty. We'll show you how to turn matric, side hustles, volunteer work, and self-taught skills into a CV that gets responses — built for the SA job market and ATS-safe.",
    readTime: "7 min read",
    pairedGuide: "CV & Interview Pack",
  },
  {
    category: "Side Hustles",
    title: "15 Ways to Make Money Online in South Africa With No Capital",
    excerpt:
      "Forget the foreign YouTube gurus telling you to dropship from Shopify. Here are 15 income streams that actually work for South Africans — verified platforms, ZAR earnings, and what to expect in your first month.",
    readTime: "10 min read",
    pairedGuide: "Side Hustle Starter Pack",
  },
];

const CATEGORIES = [
  "Business Registration",
  "Tax & SARS",
  "CVs & Careers",
  "Side Hustles",
];

/* ── Page ─────────────────────────────────────────────────────────── */

export default function BlogPage() {
  return (
    <>
      {/* Fixed animated background — same as homepage and Guides */}
      <HeroBackground />

      {/* All content above the background */}
      <div className="relative z-10">

        {/* ── Page header ──────────────────────────────────────────── */}
        <section
          className="relative border-b border-[#1E3048] overflow-hidden"
          style={{ backgroundColor: "rgba(13,27,42,0.82)", padding: "2.5rem 1.5rem 2rem" }}
        >
          <div className="dot-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <p className="text-[#7A9BB5] text-xs mb-4" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
              <Link href="/" className="text-[#7A9BB5] no-underline hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-1.5">›</span>
              <strong className="text-white">Blog</strong>
            </p>

            <h1
              className="font-heading text-white font-black leading-tight mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              Blog
            </h1>

            <p
              className="text-[#7A9BB5] mb-2"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1.0625rem" }}
            >
              Real talk on SA business, side hustles, tax, and getting started. No corporate fluff.
            </p>

            <em
              className="text-[#F5A623] not-italic"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontStyle: "italic", fontSize: "0.9375rem" }}
            >
              &ldquo;School ends at Grade 12. Life starts at Grade 13.&rdquo;
            </em>
          </div>
        </section>

        {/* ── Coming Soon banner ───────────────────────────────────── */}
        <section style={{ padding: "3rem 1.5rem", backgroundColor: "rgba(13,27,42,0.65)" }}>
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#111D2C] border border-[#F5A623]/30 rounded-2xl text-center"
              style={{ padding: "2.5rem 2rem" }}>
              <div className="text-5xl mb-4">✍️</div>

              <h2
                className="font-heading text-white font-bold mb-4"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.2 }}
              >
                First Articles Drop Soon
              </h2>

              <p
                className="text-[#7A9BB5] leading-relaxed mb-8 mx-auto"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.9375rem",
                  maxWidth: "520px",
                }}
              >
                We&apos;re writing the kind of articles we wish existed when we were figuring this
                stuff out — practical, SA-specific, no jargon. Drop your email below and
                we&apos;ll send you the first article the moment it goes live.
              </p>

              <EmailCapture
                tipSheet="Get the First Grade 13 Article Free — Direct to Your Inbox"
                pairedProduct="Side Hustle Starter Pack — R297"
                payhipLink="https://payhip.com/b/TZebD"
              />
            </div>
          </div>
        </section>

        {/* ── Article cards ─────────────────────────────────────────── */}
        <section style={{ padding: "3rem 1.5rem 2rem", backgroundColor: "rgba(13,27,42,0.65)" }}>
          <div className="max-w-5xl mx-auto">

            <h2
              className="font-heading text-white font-bold mb-6"
              style={{ fontSize: "1.375rem" }}
            >
              Upcoming Articles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ARTICLES.map((article) => (
                <article
                  key={article.title}
                  className="relative flex flex-col rounded-2xl border border-[#F5A623]/20 transition-all duration-300"
                  style={{ backgroundColor: "rgba(17,29,44,0.85)", padding: "1.5rem" }}
                >
                  {/* Coming Soon badge — top-right, full opacity */}
                  <div
                    className="absolute top-4 right-4 bg-[#F5A623] text-[#0D1B2A] font-bold rounded-full"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "0.625rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.2rem 0.625rem",
                    }}
                  >
                    Coming Soon
                  </div>

                  {/* Card content — slightly dimmed */}
                  <div className="opacity-75 flex flex-col flex-1">
                    {/* Category badge */}
                    <div
                      className="inline-flex items-center self-start bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30 rounded-full mb-4"
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        padding: "0.2rem 0.625rem",
                      }}
                    >
                      {article.category}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-heading text-white font-bold mb-3 flex-1"
                      style={{ fontSize: "1rem", lineHeight: 1.35, paddingRight: "2rem" }}
                    >
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className="text-[#7A9BB5] mb-4"
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "0.8125rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {article.excerpt}
                    </p>

                    {/* Footer meta */}
                    <div
                      className="flex items-center gap-1 text-[#7A9BB5] mb-4 flex-wrap"
                      style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem" }}
                    >
                      <Clock size={11} strokeWidth={2} className="text-[#7A9BB5]" />
                      <span>{article.readTime}</span>
                      <span className="mx-1">·</span>
                      <span>
                        Pairs with:{" "}
                        <Link href="/guides" className="text-[#F5A623] hover:underline">
                          {article.pairedGuide}
                        </Link>
                      </span>
                    </div>
                  </div>

                  {/* Disabled button — full opacity */}
                  <button
                    disabled
                    className="w-full rounded-full font-semibold cursor-not-allowed"
                    style={{
                      backgroundColor: "#1E3048",
                      color: "#7A9BB5",
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "0.875rem",
                      padding: "0.625rem",
                      border: "none",
                    }}
                  >
                    Coming Soon
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Browse by category ────────────────────────────────────── */}
        <section style={{ padding: "2rem 1.5rem 3rem", backgroundColor: "rgba(13,27,42,0.65)" }}>
          <div className="max-w-5xl mx-auto">
            <h2
              className="font-heading text-white font-bold mb-5"
              style={{ fontSize: "1.25rem" }}
            >
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <a
                  key={cat}
                  href="#"
                  className="bg-[#162236] border border-[#1E3048] text-white rounded-full transition-colors duration-200 hover:border-[#F5A623] hover:text-[#F5A623]"
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    padding: "0.5rem 1.125rem",
                    textDecoration: "none",
                  }}
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ────────────────────────────────────────────── */}
        <section
          className="border-t border-[#1E3048]"
          style={{ padding: "3.5rem 1.5rem 4rem", backgroundColor: "rgba(17,29,44,0.90)" }}
        >
          <div className="max-w-xl mx-auto text-center">
            <h2
              className="font-heading text-white font-bold mb-4"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.2 }}
            >
              Don&apos;t want to wait?
            </h2>

            <p
              className="text-[#7A9BB5] leading-relaxed mb-8"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9375rem" }}
            >
              Our guides cover everything the blog will — and more. Step-by-step, SA-specific,
              ready to use right now.
            </p>

            <Link
              href="/guides"
              className="btn-gold inline-flex items-center gap-2 rounded-full font-bold"
              style={{
                backgroundColor: "#F5A623",
                color: "#0D1B2A",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "1rem",
                padding: "0.875rem 2rem",
                textDecoration: "none",
              }}
            >
              <strong>Browse All Guides</strong>
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
