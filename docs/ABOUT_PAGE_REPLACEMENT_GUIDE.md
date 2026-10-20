# About Us Replacement Guide — Lakrua Demo2 → PureCuts Theme

> **Goal:** Delete the current `/about-us` page and replace it 1:1 with the Lakrua **Demo2 About** page structure, animations & layout, but repaint everything in **PureCuts design-system** (`#222`, `#795BCB`, `#f8f8f8`, white, slate borders) and rewrite copy for a **salon-supplies B2B marketplace**.

Source: <https://jthemes.net/themes/wp/lakrua/demo2/about/>
Repo: `siddhantbisen4-jpg/Purecuts-website` | Route: `src/app/about-us/page.tsx`

---

## 1) What Lakrua About Actually Contains (Reverse-Engineered)

I fetched & dissected both HTML chunks. The page is **not** a WordPress text page — it is a **section-stacked landing** built with WPBakery. Sections in order:

| # | Lakrua Block | Content | Visual |
|---|---|---|---|
| 0 | **Page Header** | Breadcrumb + `About – Lakrua` title | Dark bar, centered |
| 1 | **Intro Split** | Eyebrow `Come, Relax and Enjoy` + H2 `Luxury salon where you will feel unique` + 2 paragraphs + signature image + `Martha Ronkie - Founder & CEO` + large right image `img-04.png` | 2-col 50/50, image with rounded/organic mask |
| 2 | **Services Strip** | Eyebrow `Look Good. Feel Better` + H2 `The exceptional services...` + subtitle + 3 cards (`Facials`, `Nails Care`, `Makeup` with `s_01/02/03.jpg`) + outline CTA `Services & Prices` | 3 equal cards, image hover-zoom, centered |
| 3 | **Video + USP Grid** | Left: YouTube lightbox `youtube.com/watch?v=7e90gBu4pas` with Play button overlay + `Play video`. Right: 4 USP items with icons: `Homelike Atmosphere`, `Team of Professionals`, `Professional Materials`, `Easy Online Booking` | 2-col, video 16:9 with dark overlay |
| 4 | **Stats / Social Proof** | Eyebrow `Time to be beautiful` + H2 `Give the pleasure...` + paragraph + 2 big counters `8960+ Satisfied Clients` `298 Nail Polish Colors` + side decorative image `img-02.png` | Cream background, giant numbers |
| 5 | **Testimonials Marquee** | Eyebrow `They're Talking` + H2 `What our clients say about Lakrua services` + infinite horizontal carousel of **8 review cards** (5-star + text + avatar + name + date) — track is *duplicated* to loop seamlessly + arrows `‹›` | White, cards with shadow & border |
| 6 | **Promo Split** | Left image `img-05-1.jpg`, Right: eyebrow `A whole new you` + H2 `Color your nails with your dreams` + paragraph + 3 bullets + `Lakrua Studio in the press reviews:` + **10 brand logos** `brand-1.png … brand-11.png` in 2 rows | 2-col, logos grayscale → color on hover |
| 7 | **Blog Teaser** | Eyebrow `From the Blog` + H2 `Latest News & Insight` + 3 post cards `img-01/02/03-360x270.jpg` with date badge `Jun20` etc | 3-col grid |
| 8 | **Final CTA Bar** | `It's time for a change!` + H2 `Enhance Your Natural Beauty with Lakrua` + subtitle + `Booking Online` button (×2) | Dark gradient, centered |

### Animations Lakrua Uses (you asked for *same-to-same*)
1. **Reveal-on-scroll**: every eyebrow/H2/paragraph/card fades + slides up `24–40px`, `duration 650–800ms`, `ease [0.22,1,0.36,1]`, **stagger 90–120ms** between siblings.
2. **Image parallax/zoom**: right images (#1, #6) have subtle `scale(1.04→1)` on reveal + slow `transform: translateY` on scroll (parallax `0.08`).
3. **Service card hover**: `image scale 1.06` + overlay gradient fade-in + title underline `width 0→100%` in `300ms`.
4. **Video play pulse**: circular button with `pulse-ring` `animation: ping 1.8s infinite`.
5. **Counter count-up**: numbers animate `0 → target` with `requestAnimationFrame` + `easeOutCubic` once when `50%` in view (`8960` in ~1.8s, `298` in ~1.2s).
6. **Testimonials marquee**: CSS `@keyframes marquee 45s linear infinite` on duplicated track; hover `animation-play-state: paused`, drag/swipe support, arrows scroll by 1 card.
7. **Brand logos**: `filter: grayscale(1) opacity .6` → `grayscale(0) opacity 1` on hover, `150ms`.
8. **Button hovers**: primary CTA `translateY(-1px) + shadow-lg`, outline `background-fill` from `left`.

All responsive: `2-col` → `1-col` at `1024px`, `3-col` → `2-col` at `1024px` → `1-col` at `640px`.

---

## 2) PureCuts Mapping — Content Swap (Keep Layout, Swap Story)

Do **not** copy Lakrua salon copy verbatim. Replace 1:1:

| Lakrua | PureCuts Equivalent |
|---|---|
| `Come, Relax and Enjoy / Luxury salon where you will feel unique` | `India's Salon Supply Partner Since 2018 / Professional Supplies Where Salons Trust PureCuts` + paragraph about Wagholi Hub, 100% authentic B2B mission |
| `Facials / Nails Care / Makeup` 3 cards | `Haircare Essentials / Skincare & Bodycare / Machineries & Tools` (reuse `NAV_CATEGORIES`, link to `/category/[slug]`) |
| `Play video` (youtube 7e90...) | Replace with PureCuts intro / keep same YouTube ID for demo, but overlay + USP 4 items → `100% Genuine Stock`, `Fast Pune Wagholi Dispatch`, `Salon B2B Wholesale`, `COD & Secure Payments` |
| `8960+ Satisfied Clients / 298 Nail Polish Colors` | `8,960+ Salons Supplied / 298+ Verified Brands` + decorative image |
| 8 testimonials (Carmen, Josie…) | 8 **Indian salon owners** (Mumbai, Pune, Delhi…) with 5-star + Indian names, keep same card layout |
| `Color your nails with your dreams` + 3 bullets `Luxury, Quality & Comfort` | `Stock Your Salon With Confidence` + bullets `Medical-Grade Hygiene & Sterilization`, `High-Quality Professional Products`, `B2B Bulk & Academy Pricing` + press logos → authorized brands (L'Oréal, Schwarzkopf, Matrix, Wahl, Ikonic…) |
| Blog 3 cards (June 20/08…) | Pull from `getBlogPosts()` or static 3 PureCuts blog teasers (reuse `/blog`) |
| Final `Booking Online` | `Request B2B Quote / Start Wholesale Order` → opens `B2BModal` + link to `/category/all` |

**Theme repaint rules:**
- Lakrua pink `#F9D7D0 / #E8A0A0` → **PureCuts purple `#795BCB`** (primary CTA, eyebrow pills, icon circles).
- Lakrua dark `#1A1A1A` → PureCuts black `#222222`.
- Lakrua cream `#FFF6F3` → `#f8f8f8` + `radial-gradient(ellipse_at_top_left, rgba(121,91,203,0.06))`.
- Keep `Inter` font (already in `layout.tsx`), no need for Lakrua serif; mimic weight with `font-black tracking-tight`.
- Borders: `border-slate-200`, radius `rounded-[28px]` for hero, `rounded-3xl` for sections (PureCuts already uses this).

---

## 3) Architecture — File Changes in Your Repo

```
src/app/about-us/page.tsx        ← REPLACE (main deliverable)
src/app/globals.css              ← append ~80 lines of @keyframes + utilities
next.config.ts                   ← add jthemes.net to remotePatterns if you hotlink demo images (optional; better to use Unsplash/placehold)
public/images/about/*            ← (optional) local copies of Lakrua demo images for offline build
```

**Keep untouched:** `src/components/Header.tsx`, `Footer.tsx`, `layout.tsx`, `StoreContext.tsx`, `navCategories.ts` — new page consumes them.

### Dependencies
**No new npm packages required.** Use:
- `next/image` or `<img>` + Tailwind
- `lucide-react` (already installed) for all icons
- Native `IntersectionObserver`, `requestAnimationFrame`, `CSS @keyframes`

> Optional upgrade: `framer-motion` / `swiper` — but deliberately avoided to keep bundle light & match Lakrua's vanilla implementation. Add later if you want `AnimatePresence`.

---

## 4) Step-by-Step Implementation (Do In Order)

### STEP 0 — Backup & Branch
```bash
git switch arena/fc084cb4-purecuts-website
git pull
cp src/app/about-us/page.tsx src/app/about-us/page.tsx.bak
```

### STEP 1 — Analyse Breakpoints & Tokens
- Open `src/app/globals.css` and note `--purecuts-primary: #222222`, `--header-height`, `--purecuts-border`.
- Decide mapping: all Lakrua `peach pill` → `bg-[#795BCB]/10 border-[#795BCB]/15 text-[#795BCB]`.
- Primary buttons: `bg-[#795BCB] hover:bg-[#6246B0]` (already used in Header).
- Stats: keep big numbers `text-4xl sm:text-5xl font-black`.

### STEP 2 — Scaffold New `page.tsx` as Client Component
```tsx
"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Scissors, ShieldCheck, ... } from "lucide-react";
// hooks: useInView, useCountUp
// data: SERVICES[], USPS[], TESTIMONIALS[], BRANDS[], POSTS[]
export default function AboutUsPage() { ... }
```

### STEP 3 — Add Shared Animation Helpers (top of file or `src/hooks/useReveal.ts`)
```ts
function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, { threshold:0.18, ...opts });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function useCountUp(target:number, active:boolean, duration=1800) {
  const [val,setVal]=useState(0);
  useEffect(()=>{
    if(!active) return;
    let raf:number, start:number| null=null;
    const step=(ts:number)=>{
      if(start===null) start=ts;
      const p=Math.min((ts-start)/duration,1);
      const eased=1-Math.pow(1-p,3); // easeOutCubic
      setVal(Math.round(eased*target));
      if(p<1) raf=requestAnimationFrame(step);
    };
    raf=requestAnimationFrame(step);
    return ()=>cancelAnimationFrame(raf);
  },[target,active,duration]);
  return val;
}
```

### STEP 4 — Build the 9 Sections (copy structure exactly from Lakrua, repaint)

#### 4A) Breadcrumb + Dark Hero
Same as current file: `bg-slate-900 rounded-3xl p-8 sm:p-12` with pill + H1. Add reveal `translate-y-6 opacity-0 → translate-y-0 opacity-100`.

#### 4B) Intro Split (`.grid lg:grid-cols-2 gap-10 p-8 sm:p-10`)
- Left: eyebrow `Come, Relax and Enjoy` → `Trusted by Salons Across India` (pill `#795BCB`), H2 `Professional Supplies Where Salons Trust PureCuts`, 2 paragraphs, signature block, founder line.
- Right: `<div className="relative overflow-hidden rounded-[28px]">` with `<img src="https://images.unsplash.com/...salon...">` + `scale-105` reveal.
- Animate left items staggered: H2 `delay 0`, p1 `delay 100ms`, p2 `delay 200ms`, signature `delay 350ms`.

#### 4C) Services Strip (cream `bg-[#f8f8f8]`)
- Eyebrow `Look Good. Feel Better` → same or `Curated for Professionals`
- H2 `The Exceptional Supplies for Salon Success`
- Grid `grid-cols-1 sm:grid-cols-3 gap-6` — each card: `bg-white rounded-3xl border overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition`
- Image wrapper `aspect-[4/3] overflow-hidden` → `<img className="group-hover:scale-105 transition duration-500">`
- CTA outline: `border-slate-900 hover:bg-slate-900 hover:text-white` (replicate `Services & Prices`).

#### 4D) Video + USP Grid
- Left: `aspect-video rounded-3xl overflow-hidden bg-slate-900 relative group cursor-pointer` + thumbnail + dark overlay `bg-black/35 group-hover:bg-black/25` + centered play button `w-16 h-16 rounded-full bg-white shadow-xl group-hover:scale-110 transition` + pulsing ring `absolute inset-0 rounded-full border border-white/60 animate-ping`
- Right: `grid grid-cols-1 sm:grid-cols-2 gap-4` → 4 USP cards: icon circle `bg-[#795BCB]/10 text-[#795BCB]`, title `text-sm font-bold`, desc `text-xs text-slate-500`
- Lightbox: `useState(showVideo)` → fixed overlay + `<iframe src="https://www.youtube.com/embed/7e90gBu4pas?autoplay=1">` + close `X`.

#### 4E) Stats Bar
- Wrapper `bg-gradient-to-br from-amber-50/60 via-white to-purple-50/40 border-y`
- 2 counters: `8,960+` `298+` — big `text-4xl font-black` — use `useCountUp` hooked to `useInView` wrapper (once).
- Side decorative image `img-02.png` → Unsplash salon tools, `rounded-3xl`.

#### 4F) Testimonials Marquee
- Header eyebrow `They're Talking` + H2 `What Salon Owners Say About PureCuts`
- Track: `overflow-hidden` → `flex gap-5 animate-marquee` where `animate-marquee { animation: marquee 45s linear infinite }`
- Duplicate array: `[...TESTIMONIALS, ...TESTIMONIALS]`
- Each card: `min-w-[300px] max-w-[360px] bg-white rounded-2xl border p-6 shadow-sm` — stars (5× `★`), text `text-sm leading-relaxed`, avatar `w-9 h-9 rounded-full`, name + `· 28 days ago`
- Controls: `onMouseEnter` → `pause`, `onMouseLeave` → `resume`, arrows `scrollBy({left: ±360, behavior:"smooth"})`.

#### 4G) Promo Split with Brand Logos
- Left image + Right text (`A whole new you` → `Stock Your Salon With Confidence`)
- 3 bullets with `CheckCircle2` green
- Brand wall: `grid grid-cols-3 sm:grid-cols-5 gap-6 items-center` — each logo `<img className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition">` — use purecuts brand images or `placehold.co` for demo.

#### 4H) Blog Teaser
- Eyebrow `From the Blog` + H2 `Latest News & Insight`
- `grid grid-cols-1 md:grid-cols-3 gap-6` — each post card: image + date badge `absolute top-3 left-3 bg-white rounded-lg px-2 py-1 text-[10px] font-bold`, title `line-clamp-2`, excerpt, `Read more →`.

#### 4I) Final CTA
- `bg-[#1A1A1A] rounded-3xl text-center py-12 px-6` — eyebrow `It's time for a change!` (amber), H2 `Enhance Your Salon Business with PureCuts`, CTA `Book Wholesale Order` duplicated (one outline + one solid) linking to `/#` and opening `B2BModal` via `useStore().openB2BModal`.

### STEP 5 — Add CSS Animations to `globals.css`
```css
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
.animate-marquee { animation: marquee 45s linear infinite; }
.animate-marquee:hover { animation-play-state: paused; }
@keyframes revealIn { from { opacity:0; transform: translateY(24px) } to { opacity:1; transform: translateY(0) } }
.reveal { opacity:0; transform: translateY(24px); transition: opacity 650ms cubic-bezier(.22,1,.36,1), transform 650ms cubic-bezier(.22,1,.36,1); }
.reveal.in { opacity:1; transform: translateY(0); }
@keyframes pulseRing { 0%{ transform:scale(.9); opacity:1 } 100%{ transform:scale(1.45); opacity:0 } }
.pulse-ring::before { content:""; position:absolute; inset:0; border-radius:9999px; border:1px solid rgba(255,255,255,.7); animation:pulseRing 1.8s cubic-bezier(.4,0,.6,1) infinite; }
```

### STEP 6 — Adapt for PureCuts Theme & Responsiveness
- Audit every color: no leftover Lakrua `#D9AFAF` — replace with `#795BCB` or `slate-900`.
- Test at `360px` (mobile), `768px` (tablet), `1024px` (desktop), `1440px` (xl). Ensure video 16:9 never overflows.
- Check `Header` sticky offset: keep `paddingTop: var(--header-height)` from `layout.tsx` — new page must not add extra top padding.
- Images: use `loading="lazy"` + `decoding="async"` for below-fold.

### STEP 7 — Content & SEO
- Update `export const metadata` in page (if server component) or `<title>` fallback — but page is `"use client"`, so add `<h1>` with `Professional Salon Supplies` keywords.
- Replace all lorem with PureCuts real copy (address, phone, email from `Footer.tsx`).
- Link services to real categories (`/category/haircare` etc.) so analytics tracks.

### STEP 8 — QA Checklist (must pass before PR)
- [ ] All 8 Lakrua sections present in order, same proportions
- [ ] Reveal-on-scroll fires once per section, respects `prefers-reduced-motion`
- [ ] Counters animate only when `50%` visible, format `toLocaleString("en-IN")`
- [ ] Video lightbox traps focus, closes on `Esc` + backdrop click, `autoplay=1`
- [ ] Marquee is infinite, no jump, pausable on hover/drag, keyboard arrows work
- [ ] `npm run build` passes, no `next/image` domain errors
- [ ] Lighthouse: Performance >85, no CLS from image shifts (add `aspect-*`)
- [ ] Links do not 404 (use existing routes)

### STEP 9 — Ship
```bash
npm run lint
npm run build
git add src/app/about-us/page.tsx src/app/globals.css docs/ABOUT_PAGE_REPLACEMENT_GUIDE.md
git commit -m "feat(about): replicate Lakrua demo2 about with PureCuts theme + animations"
git push origin arena/fc084cb4-purecuts-website
gh pr create --title "About Us — Lakrua 1:1 replica in PureCuts theme" --body "Closes #... See docs/ABOUT_PAGE_REPLACEMENT_GUIDE.md"
```

---

## 5) What I Will Deliver Next (Code)

The replacement `page.tsx` implements **all 9 blocks** above:
- `useInView` + `useCountUp` helpers (no external deps)
- Sections A–I with PureCuts-purple pills, Tailwind marquee, video modal, counter, logo wall
- All images via `images.unsplash.com` & `purecuts.in` (already allowed in `next.config.ts`) — no new domain config needed
- Fully responsive & accessible (`aria-label`, `prefers-reduced-motion`)

Next step: run the page rewrite — see `src/app/about-us/page.tsx` after this guide is committed.

---

## 6) Tips to Keep “Same-to-Same” but On-Brand

1. **Don’t keep Lakrua’s serif** — Inter with `font-black` + `tracking-tight` looks premium enough and you already load it.
2. **Don’t hotlink all Lakrua demo images** (`jthemes.net/wp-content/...`) in prod — copy 3–4 hero images to `public/` or switch to Unsplash to avoid CORS & slow TTFB.
3. **Keep the marquee length** — always duplicate `TESTIMONIALS` to exactly `2×` so the CSS translate `-50%` loops seamlessly.
4. **Stats values are branded** — if Pune hub data differs, tweak `8960 → 12,400+` etc. but keep `+` suffix Lakrua uses.
5. **Press logos row** — PureCuts has 8+ authorized brands; Lakrua uses 10 — keep 10 to maintain grid balance, add `VLCC`, `Lotus`, `Gillette` placeholders.

---

*Generated for arena/fc084cb4-purecuts-website on 2026-10-20.*
