"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   CONTENT CONSTANTS  (swap freely — single source for copy)
   ============================================================ */
const YOUTUBE_ID = "4QDk3of-SLA";

const PRICE = "\u20A620,000"; // Naira symbol + amount
const TOTAL_VALUE = "\u20A6150,000";
const WHATSAPP_DM = "https://wa.me/2348027842411"; // Coach Jerryminds WhatsApp DM

const PAINS = [
  "I want to make money online, but every 'system' I try just leaves me more confused than when I started.",
  "I have joined opportunities before and made exactly zero — so I am not sure who I can actually trust anymore.",
  "I do not have a product, an audience, or any tech skills, so I have no idea where to even begin.",
  "I am drowning in free YouTube advice that never gives me the actual step-by-step.",
  "I keep telling myself 'next month' — while watching everyone else post their results.",
];

const DAYS = [
  { n: "01", icon: "target", title: "The Foundation", desc: "Lock in the right mindset, pick your model, and set one clear 7-day target so you stop chasing shiny objects.", value: "\u20A612,000" },
  { n: "02", icon: "layers", title: "Pick a Winning Offer", desc: "Choose an affiliate offer people actually buy using a simple 3-point check — no more guessing.", value: "\u20A612,000" },
  { n: "03", icon: "rocket", title: "Build Your Capture Page", desc: "Set up a clean opt-in page with zero coding that turns cold visitors into leads.", value: "\u20A615,000" },
  { n: "04", icon: "mail", title: "Automated Follow-Up", desc: "Write a short email sequence that builds trust and converts while you sleep.", value: "\u20A615,000" },
  { n: "05", icon: "globe", title: "Your First Traffic", desc: "Plug in beginner-friendly traffic so real humans actually see your offer — fast.", value: "\u20A618,000" },
  { n: "06", icon: "chart", title: "Track & Optimize", desc: "See exactly what is working, fix the leaks, and double down on your winners.", value: "\u20A612,000" },
  { n: "07", icon: "bolt", title: "Scale the Winners", desc: "Turn your first results into a repeatable system you can keep growing.", value: "\u20A613,000" },
];

const BONUSES = [
  { icon: "users", title: "Private Community Access", desc: "Ask questions, get feedback, and stay accountable with other beginners on the same path.", value: "\u20A635,000", bonus: true },
  { icon: "gift", title: "Swipe Files & Templates", desc: "Copy-paste email scripts, page templates, and offer checklists that save you hours.", value: "\u20A618,000", bonus: true },
];

const BENEFITS = [
  { icon: "target", title: "A Step-by-Step System", desc: "A clear daily plan. You always know the exact next action — no more guesswork." },
  { icon: "layers", title: "Learn Affiliate Marketing", desc: "Understand offers, funnels, and traffic from absolute scratch — explained simply." },
  { icon: "shield", title: "Avoid Beginner Mistakes", desc: "Skip the expensive traps that cost most beginners months of wasted time." },
  { icon: "bolt", title: "Fast Implementation", desc: "Set everything up in under 30 minutes a day — built around a busy schedule." },
  { icon: "users", title: "Real Community Support", desc: "Never get stuck on your own — get answers and feedback from people who get it." },
];

const TESTIMONIALS = [
  { quote: "I had tried three different systems before this and quit each time. The daily structure finally made it click — I built my first real funnel within the week.", name: "Daniel R.", role: "Beginner - Nigeria", color: "#F97316", review: true },
  { quote: "What sold me was how simple it was. No tech overwhelm. I followed Day 3 and had my page live the same evening.", name: "Aisha M.", role: "Side-hustler - Ghana", color: "#0EA5E9", review: true },
  { quote: "I watch a lot of YouTube gurus. This was the first time someone gave me the actual order of steps instead of random tips.", name: "Marcus T.", role: "Beginner - US", color: "#16A34A", review: true },
];

const FOR_YOU = [
  "You are starting from zero — no product, no list, and no tech skills.",
  "You want a clear, proven order of steps instead of random tips.",
  "You can set aside about 30 minutes a day for one week.",
  "You are willing to actually follow through and take action.",
  "You want to finally understand how affiliate funnels really work.",
];

const NOT_FOR_YOU = [
  "You are looking for a get-rich-quick button with zero effort.",
  "You will not watch the daily training or take any action.",
  "You want someone to do everything for you.",
];

const VALUE_STACK = [
  { name: "7-Day Step-by-Step Bootcamp", value: "\u20A697,000" },
  { name: "Private Community Access", value: "\u20A635,000" },
  { name: "Swipe Files & Templates", value: "\u20A618,000" },
];

const CREATOR = {
  name: "Coach Jerryminds",
  image: "/images/jerrymind.jpg",
  stats: [
    { num: "5,000+", label: "Students guided" }, // [REVIEW] confirm number
    { num: "6+ yrs", label: "In affiliate marketing" }, // [REVIEW] confirm
    { num: "7 Days", label: "To your first funnel" },
  ],
};

const FAQS = [
  { q: "What exactly do I get?", a: "The full 7 Days Results Bootcamp: 7 daily step-by-step lessons, each ending with a tangible piece of your funnel in place, plus private community access and ready-to-use swipe files and templates." },
  { q: "How much does it cost?", a: "A one-time payment of " + PRICE + " (normally valued at " + TOTAL_VALUE + "). There are no hidden fees and no monthly subscription." },
  { q: "Why is the price so low?", a: "This is a special launch price to help beginners get started without a huge upfront cost. The goal is to get you real results fast — the price may increase as the bootcamp grows." },
  { q: "Is there a guarantee?", a: "Yes. Try the full bootcamp for 7 days. If you do not feel it is worth many times what you paid, just send an email and you get a full refund — no questions asked." },
  { q: "Do I need any experience or tech skills?", a: "No. This is built for complete beginners. If you can follow a recipe, you can follow the daily steps. Everything is shown click-by-click." },
  { q: "How much time does it take each day?", a: "Roughly 20 to 30 minutes a day for 7 days. You keep access to every lesson, so you can move at your own pace with no pressure." },
  { q: "Do I need my own product or an audience?", a: "No — that is the whole point. You will learn to promote other people's proven offers without needing a following first." },
  { q: "When do I get access?", a: "Immediately after checkout. The moment your payment is confirmed, you are in and can start Day 1 right away." },
];
const PROOF_COUNT = 10;

function ProofCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? PROOF_COUNT - 1 : c - 1));
  const next = () => setCurrent((c) => (c === PROOF_COUNT - 1 ? 0 : c + 1));

  return (
    <div className="proof-carousel fade-in">
      <div className="proof-track">
        <Image
          src={`/images/proof-${current + 1}.jpg`}
          alt={`Proof of results ${current + 1}`}
          width={480}
          height={600}
          priority={current === 0}
        />
      </div>

      <button className="proof-btn proof-btn--prev" onClick={prev} aria-label="Previous proof image">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button className="proof-btn proof-btn--next" onClick={next} aria-label="Next proof image">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="proof-dots">
        {Array.from({ length: PROOF_COUNT }).map((_, i) => (
          <button
            key={i}
            className={`proof-dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to proof ${i + 1}`}
          />
        ))}
      </div>

      <p className="proof-counter">{current + 1} / {PROOF_COUNT}</p>
    </div>
  );
}

/* ============================================================
   ICONS  (inline SVG only — no icon libraries)
   ============================================================ */
const STROKE: Record<string, string> = {
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
  rocket: '<path d="M12 2c3 1.5 6 4.5 6 9 0 2-1 4-1 4l-2 2H9l-2-2s-1-2-1-4c0-4.5 3-7.5 6-9z"/><circle cx="12" cy="10" r="1.6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18"/>',
  chart: '<path d="M5 20V11M12 20V4M19 20v-7"/>',
  bolt: '<path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5"/><path d="M16 8.5a3 3 0 100-5M21 20c0-2.4-1.7-4.1-3.8-4.6"/>',
  gift: '<rect x="4" y="11" width="16" height="9" rx="1"/><path d="M4 7.5h16V11H4z"/><path d="M12 7.5V20M12 7.5C9 7.5 8 4 12 4s3 3.5 0 3.5z"/>',
  check: '<path d="M5 13l4 4L19 7"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  lock: '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 018 0v2.5"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  whatsapp: '<path d="M20 11.5a8 8 0 01-11.8 7L4 19.5l1.1-4A8 8 0 1120 11.5z"/><path d="M9 9.2c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.6 1.4c.1.2 0 .4-.1.6l-.4.5c-.1.1-.2.3-.1.5.2.5.6 1 1 1.4.5.4 1 .7 1.5.9.2.1.4 0 .5-.1l.5-.5c.2-.2.4-.2.6-.1l1.3.6c.4.2.5.4.5.6v.5c0 .3-.1.6-.6.9-.4.3-1 .5-1.6.4a7 7 0 01-3.6-1.9 7 7 0 01-1.9-3.6c-.1-.6.1-1.2.4-1.5z"/>',
};

function Icon({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const isFill = ["bolt", "play"].includes(name);
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill={isFill ? "currentColor" : "none"}
      stroke={isFill ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: STROKE[name] }}
    />
  );
}

function StarRow() {
  return (
    <span className="stars" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17.3 5.8 20.6l1.6-6.7L2.2 8.9l6.9-.6L12 2z" />
        </svg>
      ))}
    </span>
  );
}

/* ============================================================
   VSL — click-to-load facade (huge performance win)
   ============================================================ */
function VSL() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="vsl" id="vsl">
      {!loaded ? (
        <>
          <img
            className="vsl__img"
            src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`}
            alt="Watch the free 7-day bootcamp training"
            loading="eager"
            width="480"
            height="270"
          />
          <span className="vsl__tag">Free Training</span>
          <button
            className="vsl__play"
            aria-label="Play the free training video"
            onClick={() => setLoaded(true)}
          >
            <Icon name="play" />
          </button>
        </>
      ) : (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
          title="7 Days Results Bootcamp - Free Training"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}

/* ============================================================
   LEAD FORM — captures name + email, fires Google Sheet + WhatsApp, redirects
   ============================================================ */
function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "success" || !redirectUrl) return;
    if (redirectUrl.startsWith("[REVIEW]")) return; // not configured yet
    const t = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1800);
    return () => clearTimeout(t);
  }, [status, redirectUrl]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: { name?: string; email?: string } = {};
    if (!name.trim()) nextErrors.name = "Please enter your first name.";
    if (!email.trim()) nextErrors.email = "Please enter your email.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setRedirectUrl(data.redirectUrl || null);
        setStatus("success");
      } else {
        setErrors(data.errors || { email: "Something went wrong. Please try again." });
        setStatus("error");
      }
    } catch {
      setErrors({ email: "Network error. Please check your connection and try again." });
      setStatus("error");
    }
  }

  if (status === "success") {
    const needsConfig = !redirectUrl || redirectUrl.startsWith("[REVIEW]");
    return (
      <div className="form-success">
        <div className="form-success__icon">
          <Icon name="check" />
        </div>
        <h3 className="h3 mt-4">You are in, {name.split(" ")[0] || "friend"}!</h3>
        <p className="muted mt-2">
          {needsConfig
            ? "Your spot is reserved and your details were captured successfully."
            : "Taking you to secure checkout now..."}
        </p>
        {!needsConfig && (
          <a className="btn btn--primary btn--lg mt-6" href={redirectUrl as string}>
            Continue to Checkout <Icon name="arrow" />
          </a>
        )}
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="lead-name">First Name</label>
        <input
          id="lead-name"
          className="input"
          type="text"
          autoComplete="given-name"
          placeholder="Your first name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
        />
        <span className="field-error">{errors.name}</span>
      </div>
      <div className="field">
        <label htmlFor="lead-email">Email Address</label>
        <input
          id="lead-email"
          className="input"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
        />
        <span className="field-error">{errors.email}</span>
      </div>
      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === "loading"}>
        {status === "loading" ? "Securing your spot..." : "Get Instant Access"}
        {status !== "loading" && <Icon name="arrow" />}
      </button>
      <p className="form-note">
        <Icon name="lock" style={{ width: 14, height: 14, verticalAlign: "-2px" }} />{" "}
        Secure checkout on the next step · Your details stay private
      </p>
    </form>
  );
}

/* ============================================================
   FAQ ITEM — accordion, one open at a time
   ============================================================ */
function FaqItem({ faq, open, onToggle }: { faq: { q: string; a: string }; open: boolean; onToggle: () => void }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [maxH, setMaxH] = useState("0px");

  useEffect(() => {
    if (open && innerRef.current) setMaxH(`${innerRef.current.scrollHeight}px`);
    else setMaxH("0px");
  }, [open]);

  return (
    <div className={`faq__item${open ? " is-open" : ""}`}>
      <button className="faq__q" onClick={onToggle} aria-expanded={open}>
        <span>{faq.q}</span>
        <svg className="faq__icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div className="faq__a" style={{ maxHeight: maxH }}>
        <div className="faq__a-inner" ref={innerRef}>{faq.a}</div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Page() {
  const [navCtaHidden, setNavCtaHidden] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const heroCtaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-animate]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = heroCtaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setNavCtaHidden(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const year = new Date().getFullYear();
  const navLinks = (
    <>
      <a href="#inside" onClick={() => setMobileOpen(false)}>What's Inside</a>
      <a href="#results" onClick={() => setMobileOpen(false)}>Results</a>
      <a href="#creator" onClick={() => setMobileOpen(false)}>Coach</a>
      <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
    </>
  );

  return (
    <>
      {/* ===== SECTION 1 — ANNOUNCEMENT BAR ===== */}
      <div className="annbar">
        <div className="container annbar__inner">
          <span>Launch special: Full bootcamp just {PRICE} (normally {TOTAL_VALUE}).</span>
          <a className="annbar__link" href="#offer">See the deal</a>
        </div>
      </div>

      {/* ===== STICKY NAV ===== */}
      <header className="nav">
        <div className="container nav__inner">
          <a className="nav__brand" href="#top">
            <span className="nav__brand-mark">CJ</span>
            Coach Jerryminds
          </a>
          <nav className="nav__links">{navLinks}</nav>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className={`nav__cta${navCtaHidden ? " is-hidden" : ""}`}>
              <a className="btn btn--primary" href="#offer">Get Instant Access</a>
            </div>
            <button
              className="nav__menu-btn"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="nav__mobile">
            <div className="container" style={{ display: "grid", gap: 12, paddingBlock: 16 }}>
              {navLinks}
              <a className="btn btn--primary" href="#offer" onClick={() => setMobileOpen(false)}>Get Instant Access</a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* ===== SECTION 2 — HERO ===== */}
        <section className="hero">
          <div className="container">
            <span className="hero__pre" data-animate>
              <Icon name="check" /> For beginners who want a proven path to their first online commissions
            </span>
            <h1 className="hero__title" data-animate>
              How to Launch Your First <span className="hl">Affiliate Funnel</span> in 7 Days —
              Even If You've Never Made a Dollar Online
            </h1>
            <p className="hero__sub" data-animate>
              A 7-day bootcamp that hands you the exact daily system to build a working
              affiliate funnel, pick winning offers, and start driving traffic — no tech skills,
              no audience, no guesswork.
            </p>

            <div className="hero__media" data-animate>
              <VSL />
            </div>

            <div className="hero__badges" data-animate>
              <span className="badge"><Icon name="check" /> Beginner Friendly</span>
              <span className="badge"><Icon name="check" /> Under 30 min / day</span>
              <span className="badge"><Icon name="check" /> Instant Access</span>
            </div>

            <div className="hero__cta-wrap" data-animate>
              <a ref={heroCtaRef} className="btn btn--primary btn--lg" href="#offer">
                Get Instant Access — {PRICE}
              </a>
              <div className="mt-4">
                <a className="btn btn--whatsapp" href={WHATSAPP_DM} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" /> Chat with Coach on WhatsApp
                </a>
              </div>
              <div className="hero__trust">
                <span><Icon name="lock" /> Secure checkout</span>
                <span>•</span>
                <span>Instant access</span>
                <span>•</span>
                <span>7-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3 — THE PROBLEM ===== */}
        <section className="section section--surface" id="problem">
          <div className="container">
            <div className="section-head" data-animate>
              <h2 className="h2">Sound Familiar?</h2>
              <p className="lead muted mt-4">
                If you have been trying to figure out how to make money online, you probably
                recognize a few of these.
              </p>
            </div>
            <ul className="pain-list" data-animate>
              {PAINS.map((p, i) => (
                <li className="pain-item" key={i}>
                  <Icon name="x" style={{ width: 22, height: 22 }} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="center mt-8" style={{ fontWeight: 600, color: "var(--color-primary)" }} data-animate>
              If any of this sounds like you — keep reading. This is exactly what you need.
            </p>
          </div>
        </section>

        {/* ===== SECTION 4 — AGITATION ===== */}
        <section className="section">
          <div className="container">
            <div className="section-head" data-animate>
              <h2 className="h2">Every Day You Wait Costs You.</h2>
              <p className="lead muted mt-4">
                Another week of bouncing between YouTube videos. Another shiny opportunity that
                goes nowhere. Another month where nothing actually gets built — and your confidence
                quietly shrinks.
              </p>
              <p className="mt-6" style={{ fontWeight: 600, color: "var(--color-accent-dark)" }}>
                But there is a better way.
              </p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 5 — INTRODUCTION ===== */}
        <section className="section" id="about">
          <div className="container">
            <div className="section-head" data-animate>
              <span className="eyebrow"><Icon name="rocket" /> Introducing</span>
              <h2 className="h2 mt-4">The 7 Days Results Bootcamp</h2>
              <p className="lead muted mt-4">
                A guided, day-by-day system that takes you from zero to a live affiliate funnel in
                one week — by focusing only on the steps that actually move the needle.
              </p>
            </div>

            <div className="split mt-8">
              <div className="about-visual" data-animate>
                <h3 style={{ color: "#fff" }}>Your 7-Day Roadmap</h3>
                <div className="roadmap mt-6">
                  {DAYS.map((d) => (
                    <div className="roadmap__row" key={d.n}>
                      <span className="roadmap__day">{d.n}</span>
                      <span className="roadmap__label">{d.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div data-animate>
                <div className="grid grid--2">
                  <div className="card">
                    <div className="card__icon"><Icon name="layers" /></div>
                    <h3 className="card__title">What it is</h3>
                    <p className="card__desc">A focused bootcamp that walks you through building a real affiliate funnel, one day at a time.</p>
                  </div>
                  <div className="card">
                    <div className="card__icon"><Icon name="rocket" /></div>
                    <h3 className="card__title">How it works</h3>
                    <p className="card__desc">Each day is one clear action with a short training and a simple task you complete before moving on.</p>
                  </div>
                </div>
                <div className="card mt-6">
                  <div className="card__icon"><Icon name="shield" /></div>
                  <h3 className="card__title">Why it works</h3>
                  <p className="card__desc">Most beginners fail because they lack a sequence, not a strategy. This gives you the sequence — and removes the overwhelm that makes people quit.</p>
                </div>
                <a className="btn btn--primary btn--lg btn--block mt-6" href="#offer">Get Instant Access — {PRICE} <Icon name="arrow" /></a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 6 — WHAT'S INSIDE ===== */}
        <section className="section section--surface" id="inside">
          <div className="container">
            <div className="section-head" data-animate>
              <h2 className="h2">Here's Exactly What You Get</h2>
              <p className="lead muted mt-4">
                Seven focused days, each ending with a tangible piece of your funnel in place.
              </p>
            </div>
            <div className="grid grid--2 mt-8">
              {DAYS.map((d) => (
                <article className="card day-card" key={d.n} data-animate>
                  <div className="card__icon"><Icon name={d.icon} /></div>
                  <span className="card__num">Day {d.n}</span>
                  <h3 className="card__title">{d.title}</h3>
                  <p className="card__desc">{d.desc}</p>
                  <span className="value-tag"><Icon name="check" style={{ width: 14, height: 14 }} /> Value {d.value}</span>
                </article>
              ))}
              {BONUSES.map((b) => (
                <article className="card" key={b.title} data-animate style={{ borderTop: "4px solid var(--color-accent)" }}>
                  <div className="card__icon"><Icon name={b.icon} /></div>
                  <span className="card__num">Bonus</span>
                  <h3 className="card__title">{b.title}</h3>
                  <p className="card__desc">{b.desc}</p>
                  <span className="value-tag"><Icon name="check" style={{ width: 14, height: 14 }} /> Value {b.value}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 7 — BENEFITS ===== */}
        <section className="section">
          <div className="container">
            <div className="section-head" data-animate>
              <span className="eyebrow"><Icon name="bolt" /> Why beginners stick with it</span>
              <h2 className="h2 mt-4">Built for People Who've Never Done This Before</h2>
            </div>
            <div className="grid grid--3 mt-8">
              {BENEFITS.map((b) => (
                <article className="card" key={b.title} data-animate>
                  <div className="card__icon"><Icon name={b.icon} /></div>
                  <h3 className="card__title">{b.title}</h3>
                  <p className="card__desc">{b.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 8 — TESTIMONIALS ===== */}
        <section className="section section--surface" id="results">
          <div className="container">
            <div className="section-head" data-animate>
              <h2 className="h2">Real Results From Real Beginners</h2>
              <p className="lead muted mt-4">
                These are the kind of breakthroughs the daily structure is designed for.
              </p>
            </div>
            <div className="grid grid--3 mt-8">
              {TESTIMONIALS.map((t) => (
                <article className="testi" key={t.name} data-animate>
                  <StarRow />
                  <p className="testi__quote">"{t.quote}"</p>
                  <div className="testi__person">
                    <span className="avatar" style={{ background: t.color }}>{t.name.charAt(0)}</span>
                    <span>
                      <span className="testi__name">{t.name}</span>
                      <br />
                      <span className="testi__role">{t.role}</span>
                    </span>
                  </div>
                  {/*t.review && <span className="review-flag">[REVIEW] Replace with real student proof</span>*/}
                </article>
              ))}
            </div>
          </div>
        </section>
        {/* SECTION — PROOF IMAGES */}
<section className="section">
  <div className="container">
    <div className="section-head fade-in">
      <span className="section-label">Proof it works</span>
      <h2>Real Results From Real Students</h2>
      <p>Screenshots of actual earnings and feedback from people who followed this exact system.</p>
    </div>

    <ProofCarousel />
  </div>
</section>

        {/* ===== SECTION 8b — ABOUT THE CREATOR ===== */}
        <section className="section" id="creator">
          <div className="container">
            <div className="section-head" data-animate>
              <span className="eyebrow"><Icon name="users" /> Your coach</span>
              <h2 className="h2 mt-4">Hi, I'm {CREATOR.name}</h2>
            </div>
            <div className="split mt-8">
              <div className="creator-photo" data-animate>
                <img
                  src={CREATOR.image}
                  alt={`${CREATOR.name}, affiliate marketing coach`}
                  loading="lazy"
                  width="640"
                  height="800"
                />
                <span className="creator-photo__tag"></span>
              </div>
              <div data-animate>
                <p className="lead">
                  I'm {CREATOR.name}, and I help everyday beginners build real income online —
                  without the hype, the overwhelm, or the empty promises.
                </p>
                <p className="muted mt-4">
                  I have spent years inside affiliate marketing, making the same painful mistakes
                  most beginners make so you do not have to. I built the 7 Days Results Bootcamp to
                  give you the one thing I never had when I started: a clear, proven order of steps
                  you can actually follow.
                </p>
                <p className="muted mt-4">
                  My promise is simple — no fluff, no get-rich-quick lies. Just a practical system,
                  honest guidance, and a community that has your back. If you are willing to show
                  up for 7 days, I will show you exactly what to do.
                </p>
                <div className="stat-row">
                  {CREATOR.stats.map((s) => (
                    <div className="stat" key={s.label}>
                      <div className="stat__num">{s.num}</div>
                      <div className="stat__label">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="creator-cta mt-8">
                  <a className="btn btn--primary btn--lg" href="#offer">
                    Learn With Me — {PRICE} <Icon name="arrow" />
                  </a>
                  <a className="btn btn--whatsapp btn--lg" href={WHATSAPP_DM} target="_blank" rel="noopener noreferrer">
                    <Icon name="whatsapp" /> Message Me Directly
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 9 — OFFER / VALUE STACK ===== */}
        <section className="section section--surface" id="offer">
          <div className="container">
            <div className="section-head" data-animate>
              <h2 className="h2">Everything You Get When You Join Today</h2>
              <p className="lead muted mt-4">
                A complete system worth {TOTAL_VALUE} — yours today for one low launch price.
              </p>
            </div>
            <div className="receipt mt-8" data-animate>
              {VALUE_STACK.map((v) => (
                <div className="receipt__row" key={v.name}>
                  <span className="receipt__name">{v.name}</span>
                  <span className="receipt__val">{v.value}</span>
                </div>
              ))}
              <div className="receipt__total">
                <span className="receipt__total-label">Total value</span>
                <span className="receipt__total-val">{TOTAL_VALUE}</span>
              </div>
              <div className="receipt__price">
                <span className="receipt__price-label">Today, your price:</span>
                <span className="receipt__price-val">{PRICE}</span>
              </div>
              <a className="btn btn--primary btn--lg btn--block mt-6" href="#final">Get Instant Access — {PRICE} <Icon name="arrow" /></a>
              <p className="form-note mt-4">
                <Icon name="lock" style={{ width: 14, height: 14, verticalAlign: "-2px" }} /> Secure checkout · Instant access · 7-day money-back guarantee
              </p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 10 — GUARANTEE ===== */}
        <section className="section">
          <div className="container">
            <div className="guarantee" data-animate>
              <div className="guarantee__badge">
                <Icon name="shield" />
              </div>
              <span className="guarantee__seal mt-6">7-DAY</span><br />
              <span className="guarantee__seal">MONEY-BACK GUARANTEE</span>
              <h2 className="h2 mt-6">Try It Risk-Free for 7 Days</h2>
              <p className="lead muted mt-4">
                Go through the full bootcamp. If you do not feel it is worth many times what you
                paid, send one email within 7 days and you get a full refund — every single Naira.
                No questions, no hassle, no awkward forms.
              </p>
              <p className="mt-6" style={{ fontWeight: 700, color: "var(--color-primary)" }}>
                The risk is on me, not you.
              </p>
              <p className="mt-4 review-flag" style={{ display: "inline-block" }}></p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 11 — WHO IT'S FOR / NOT FOR ===== */}
        <section className="section section--surface">
          <div className="container">
            <div className="section-head" data-animate>
              <h2 className="h2">Is This Right for You?</h2>
            </div>
            <div className="fornot mt-8">
              <div className="fornot__col fornot__col--yes" data-animate>
                <h3 className="fornot__h">This Is For You If...</h3>
                <ul className="fornot__list">
                  {FOR_YOU.map((t) => (
                    <li className="fornot__item" key={t}><Icon name="check" style={{ width: 20, height: 20 }} /><span>{t}</span></li>
                  ))}
                </ul>
              </div>
              <div className="fornot__col fornot__col--no" data-animate>
                <h3 className="fornot__h">This Is NOT For You If...</h3>
                <ul className="fornot__list">
                  {NOT_FOR_YOU.map((t) => (
                    <li className="fornot__item" key={t}><Icon name="x" style={{ width: 20, height: 20 }} /><span>{t}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 12 — FAQ ===== */}
        <section className="section section--surface" id="faq">
          <div className="container">
            <div className="section-head" data-animate>
              <h2 className="h2">Frequently Asked Questions</h2>
            </div>
            <div className="faq mt-8" data-animate>
              {FAQS.map((f, i) => (
                <FaqItem
                  key={f.q}
                  faq={f}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 13 — URGENCY BAND ===== */}
        <section className="section section--primary cta-band">
          <div className="container cta-band__inner section-head" data-animate>
            <span className="eyebrow" style={{ background: "rgba(255,255,255,0.1)", color: "#FDBA74" }}>
              <Icon name="bolt" /> Don't wait for "next month"
            </span>
            <h2 className="h2 mt-4">The Best Time to Start Was Yesterday. The Next Best Is Now.</h2>
            <p className="lead mt-4">
              The launch price of {PRICE} will not last forever. Lock it in today and have your
              first funnel live by this time next week.
            </p>
            <div className="mt-8">
              <a className="btn btn--primary btn--lg" href="#final">Get Instant Access — {PRICE} <Icon name="arrow" /></a>
            </div>
          </div>
        </section>

        {/* ===== SECTION 14 — FINAL CLOSE ===== */}
        <section className="section" id="final">
          <div className="container finalclose">
            <div className="section-head" data-animate>
              <h2 className="h2">This Is Your Decision Point.</h2>
              <p className="lead muted mt-4">
                You can close this page and stay exactly where you are. Or you can take the next
                step, get the full system, and finally have a clear path to follow — backed by a
                7-day money-back guarantee, so there is nothing to lose.
              </p>
            </div>
            <div className="receipt mt-8" data-animate style={{ maxWidth: 460 }}>
              <div className="receipt__price" style={{ marginTop: 0 }}>
                <span className="receipt__price-label">One-time launch price:</span>
                <span className="receipt__price-val">{PRICE}</span>
              </div>
              <div className="mt-6"><LeadForm /></div>
            </div>
            <p className="muted mt-6" style={{ fontSize: "0.85rem" }}>
              <Icon name="lock" style={{ width: 14, height: 14, verticalAlign: "-2px" }} /> Secure checkout · Instant access · 7-day money-back guarantee
            </p>
          </div>
        </section>
      </main>

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <a
        className="wa-float"
        href={WHATSAPP_DM}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Coach Jerryminds on WhatsApp"
      >
        <Icon name="whatsapp" />
        <span className="wa-float__label">Chat with me</span>
      </a>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container footer__inner">
          <span className="footer__brand">Coach Jerryminds</span>
          <div className="footer__links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Disclaimer</a>
            <a href={WHATSAPP_DM} target="_blank" rel="noopener noreferrer">Contact on WhatsApp</a>
          </div>
          <p className="disclaimer">
            <strong>Earnings disclaimer:</strong> This training is provided for educational purposes.
            Results are not typical and depend on your effort, market, and many other factors. We make
            no guarantee of income. Some links in the bootcamp may be affiliate links, meaning we may
            earn a commission at no extra cost to you.
          </p>
          <span style={{ fontSize: "0.85rem" }}>© {year} Coach Jerryminds. All rights reserved.</span>
        </div>
      </footer>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "7 Days Results Bootcamp",
            description:
              "A 7-day bootcamp that helps beginners launch their first affiliate funnel.",
            provider: { "@type": "Organization", name: "7 Days Results" },
          }),
        }}
      />
    </>
  );
}
