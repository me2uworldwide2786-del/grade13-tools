# VISUAL_CHECK.md — Grade 13 Visual Feedback System
> Claude Code must follow these instructions after building ANY component, page, or feature.

---

## 🎯 THE RULE
You do not mark any task as complete until you have visually verified it matches the Grade 13 design spec. No exceptions.

---

## 📸 VISUAL CHECK PROCESS — Run After Every Build

### Step 1 — Start the dev server
```bash
npm run dev
```
Wait for the message: `✓ Ready on http://localhost:3000`

### Step 2 — Take a screenshot
Take a screenshot of `http://localhost:3000` (and any specific route you just built, e.g. `/tools/cv-builder`).

### Step 3 — Run the visual checklist below

### Step 4 — Fix ALL failures automatically before reporting back

### Step 5 — Take a final confirmation screenshot showing fixes applied

---

## ✅ VISUAL CHECKLIST — Check Every Item

### 🎨 Colours
- [ ] Page background is Deep Midnight Blue `#0D1B2A` — NOT black, NOT grey
- [ ] Primary CTAs and buttons are Vibrant Gold `#F5A623`
- [ ] Card/section backgrounds are `#111D2C` (slightly lighter than page bg)
- [ ] Muted text is `#7A9BB5` — NOT pure white, NOT grey
- [ ] Success indicators are green `#22C55E`
- [ ] Warning/tax alerts are red `#EF4444`
- [ ] No off-brand colours anywhere (no blue links, no default purple visited links)

### 🔤 Typography
- [ ] ALL headings (h1, h2, h3) use Playfair Display font
- [ ] ALL body text uses DM Sans font
- [ ] h1 is large and impactful — minimum 36px on desktop
- [ ] Body text is readable — minimum 16px
- [ ] No system fonts showing (Arial, Times New Roman = fonts failed to load)

### ✍️ Brand Rules
- [ ] Tagline *"School ends at Grade 12. Life starts at Grade 13."* is italicised wherever it appears
- [ ] Tagline is gold (`#F5A623`) — never white, never muted
- [ ] 🇿🇦 SA badge appears on homepage hero
- [ ] "Grade 13" wordmark has "13" in gold, "Grade" in white
- [ ] No Lorem Ipsum placeholder text anywhere
- [ ] All prices shown in ZAR with R prefix (e.g. R197, not $197)

### 🧭 Navigation
- [ ] Navbar is visible at the top
- [ ] Logo appears on the left
- [ ] Nav links: Tools | Guides | Blog
- [ ] "Browse Guides →" CTA button on the right (gold)
- [ ] Navbar becomes sticky + blurred on scroll
- [ ] Mobile hamburger menu works and opens correctly

### 🦸 Hero Section (Homepage only)
- [ ] Dot grid background pattern is visible (subtle gold dots)
- [ ] H1: "The tools nobody gave you in school." is present
- [ ] Subheading is present and readable
- [ ] Two CTA buttons visible: "Explore Free Tools →" and "Browse Guides"
- [ ] Stats row shows: 5 Free Tools | 10 SA Guides | 100% SA Specific
- [ ] Radial gold glow effect visible at top of hero

### 🃏 Cards
- [ ] Cards have dark surface background `#111D2C`
- [ ] Cards have subtle border `#1E3048`
- [ ] Cards show gold hover effect when cursor moves over them
- [ ] No white/light background cards on dark pages

### 📱 Mobile Responsiveness (Check at 375px width)
- [ ] No horizontal scroll on mobile
- [ ] Text is readable without zooming
- [ ] Buttons are tappable size (minimum 44px height)
- [ ] Grid switches from 3 columns to 1 column on mobile
- [ ] Navbar collapses to hamburger on mobile

### 🔗 CTAs
- [ ] Every tool page has a CTA linking to the correct Payhip product
- [ ] Email capture component appears below every tool result
- [ ] All arrow (→) labels are bold
- [ ] All tick (✔) labels are bold

### 🦶 Footer
- [ ] Footer has dark background `#111D2C`
- [ ] Logo appears in footer
- [ ] Navigation links present
- [ ] Legal text: "© [Year] Me2UWorldWide PTY Ltd | Grade 13 is a registered brand"
- [ ] Tagline appears at bottom of footer in gold, italicised

---

## 🚨 COMMON MISTAKES TO WATCH FOR

| Problem | What it looks like | Fix |
|---|---|---|
| Fonts not loading | Headings in Arial or serif | Check Google Fonts import in globals.css |
| Wrong background | Page looks black or white | Check body background-color in globals.css |
| Gold buttons look yellow | Buttons too bright/neon | Verify exact hex #F5A623 |
| Cards invisible | Cards blend into background | Add border: 1px solid #1E3048 |
| Mobile layout broken | Content overflows screen | Add overflow-x: hidden to body |
| Tagline not italic | Tagline appears in normal weight | Add font-style: italic |
| Links default blue | Nav links are blue/purple | Override with color: #7A9BB5 |

---

## 📋 TOOL-SPECIFIC CHECKS

### CV Builder (/tools/cv-builder)
- [ ] 3 template cards visible with visual preview
- [ ] Selected template has gold border highlight
- [ ] Form fields styled with dark background inputs
- [ ] Live CV preview updates as user types
- [ ] Download PDF button is gold and prominent
- [ ] Email capture appears below the download button

### Business Structure Quiz (/tools/business-quiz)
- [ ] Progress bar shows current question number in gold
- [ ] Question card is centered and readable
- [ ] Answer options are dark cards with hover effects
- [ ] Selected answer shows gold border + gold check
- [ ] Result card shows structure name, explanation, and CTA
- [ ] "Retake quiz" option visible on results page

### Income Calculator (/tools/income-calculator)
- [ ] 12 hustle type cards in a grid with icons
- [ ] Selected hustle type highlighted in gold
- [ ] Input fields styled correctly (dark bg, gold focus ring)
- [ ] Results show animated number count-up
- [ ] Profit leak section shows red totals
- [ ] Goal reversal section shows R5k / R10k / R20k targets
- [ ] SARS disclaimer text visible below results

---

## 🔄 FEEDBACK LOOP INSTRUCTIONS

When you find a visual failure:
1. State exactly what failed: *"The navbar background is showing as black (#000000) instead of midnight blue (#0D1B2A)"*
2. State the fix you're applying: *"Updating bg-black to bg-[#0D1B2A] in Navbar.tsx"*
3. Apply the fix
4. Re-screenshot to confirm
5. Continue to next checklist item

Do NOT ask permission to fix visual issues — fix them automatically and report what you changed.

---

## 🎓 FINAL SIGN-OFF

Only report a build as complete when you can confirm:
> *"Visual check passed. All checklist items verified. Screenshot confirms the build matches the Grade 13 design spec in CLAUDE.md."*

---

*Grade 13 — School ends at Grade 12. Life starts at Grade 13.*
*© Me2UWorldWide PTY Ltd*
