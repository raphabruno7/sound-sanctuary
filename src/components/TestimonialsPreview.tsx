"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, useEffect, useCallback } from "react";

interface TestimonialItem {
  text: string;
  name?: string;
  handle?: string;
  platform: "whatsapp" | "instagram" | "facebook";
  time?: string;
  storyReply?: boolean;
  likes?: number;
}

const AVATAR_COLORS = [
  "#25d366", "#128c7e", "#075e54", "#34b7f1",
  "#00a884", "#5b61b9", "#d4a017", "#e06c75",
  "#c678dd", "#56b6c2", "#be5046",
];

function Avatar({ name, size = 32, index = 0 }: { name: string; size?: number; index?: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const bg = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ color: "#fff", fontSize: size * 0.4, fontWeight: 600, lineHeight: 1 }}>
        {initials}
      </span>
    </div>
  );
}

/* ── WhatsApp card ─────────────────────────────────────────── */
function WhatsAppCard({ item, index }: { item: TestimonialItem; index: number }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", background: "#efeae2" }}>
      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#075e54" }}>
        <Avatar name={item.name || "?"} size={32} index={index} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: "#fff", fontSize: 13, fontWeight: 500, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.name || "Contact"}
          </p>
        </div>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/></svg>
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/></svg>
      </div>

      {/* Chat area */}
      <div style={{ padding: "12px 10px", flex: 1, background: "#efeae2" }}>
        {/* Received bubble */}
        <div style={{ position: "relative", maxWidth: "88%", marginLeft: 6 }}>
          <svg style={{ position: "absolute", left: -6, top: -1 }} width="8" height="13" viewBox="0 0 8 13" aria-hidden="true">
            <path d="M0 0H1C1 0 3.5 0.5 7 5V0H8V13L0 0Z" fill="#ffffff"/>
          </svg>
          <div style={{ background: "#ffffff", borderRadius: "0 7.5px 7.5px 7.5px", padding: "6px 8px 4px", boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)" }}>
            <p style={{ color: "#111b21", fontSize: 14.2, lineHeight: "19px", margin: 0 }}>{item.text}</p>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
              <span style={{ color: "#667781", fontSize: 11 }}>{item.time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Instagram DM card ─────────────────────────────────────── */
function InstagramCard({ item, index }: { item: TestimonialItem; index: number }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", background: "#000000" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderBottom: "1px solid #262626" }}>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #f09433, #dc2743, #bc1888)", padding: 1.5, flexShrink: 0 }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
            <span style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>
              {(item.name || "").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "•"}
            </span>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: "#ffffff", fontSize: 13, fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.name || "User"}
          </p>
          {item.handle && <p style={{ color: "#a8a8a8", fontSize: 11, margin: 0, lineHeight: 1.2 }}>{item.handle}</p>}
        </div>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/></svg>
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/></svg>
      </div>

      {/* Chat area */}
      <div style={{ padding: "12px 12px", flex: 1 }}>
        {item.storyReply && (
          <p style={{ color: "#a8a8a8", fontSize: 12, textAlign: "center", margin: "0 0 10px" }}>Replied to your story</p>
        )}
        {item.time && (
          <p style={{ color: "#a8a8a8", fontSize: 11, textAlign: "center", margin: "0 0 8px" }}>{item.time}</p>
        )}

        {/* Message row */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <Avatar name={item.name || "?"} size={24} index={index} />
          <div style={{ background: "#262626", borderRadius: "18px 18px 18px 4px", padding: "10px 12px", maxWidth: "85%" }}>
            <p style={{ color: "#f5f5f5", fontSize: 14, lineHeight: "19px", margin: 0 }}>{item.text}</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ padding: "4px 12px 10px" }}>
        <p style={{ color: "#a8a8a8", fontSize: 12, textAlign: "center", margin: 0 }}>Tap to send a reaction</p>
      </div>
    </div>
  );
}

/* ── Facebook comment card ─────────────────────────────────── */
function FacebookCard({ item, index }: { item: TestimonialItem; index: number }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", background: "#ffffff" }}>
      {/* Engagement bar */}
      <div style={{ padding: "8px 12px", borderBottom: "1px solid #dddfe2" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span style={{ fontSize: 13 }}>👍❤️</span>
          <span style={{ color: "#65676b", fontSize: 13 }}>{item.likes || 81}</span>
        </div>
        <div style={{ display: "flex", borderTop: "1px solid #dddfe2", borderBottom: "1px solid #dddfe2", padding: "6px 0" }}>
          {["Like", "Comment", "Share"].map((a) => (
            <div key={a} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "#65676b", fontSize: 13, fontWeight: 600 }}>
              {a}
            </div>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div style={{ padding: "10px 12px", display: "flex", gap: 8 }}>
        <Avatar name={item.name || "?"} size={32} index={index} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: "#f0f2f5", borderRadius: 18, padding: "8px 12px" }}>
            <p style={{ color: "#050505", fontSize: 13, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>{item.name || "User"}</p>
            <p style={{ color: "#050505", fontSize: 14, lineHeight: "19px", margin: "3px 0 0" }}>{item.text}</p>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 4, paddingLeft: 4 }}>
            <span style={{ color: "#65676b", fontSize: 12, fontWeight: 600 }}>Like</span>
            <span style={{ color: "#65676b", fontSize: 12, fontWeight: 600 }}>Reply</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main carousel ─────────────────────────────────────────── */
export function TestimonialsPreview() {
  const t = useTranslations("testimonialsPreview");
  const items: TestimonialItem[] = t.raw("items");

  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="journey-title">{t("title")}</h2>
          <p className="journey-sub max-w-2xl">{t("sub")}</p>
        </div>
        <div className="hidden md:flex gap-2 shrink-0 ml-6">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-opacity disabled:opacity-20 hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-opacity disabled:opacity-20 hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {items.map((item, i) => (
            <article key={i} className="snap-start shrink-0 w-[300px] md:w-[320px]">
              {item.platform === "whatsapp" && <WhatsAppCard item={item} index={i} />}
              {item.platform === "instagram" && <InstagramCard item={item} index={i} />}
              {item.platform === "facebook" && <FacebookCard item={item} index={i} />}
            </article>
          ))}
        </div>
      </div>

      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
    </section>
  );
}
