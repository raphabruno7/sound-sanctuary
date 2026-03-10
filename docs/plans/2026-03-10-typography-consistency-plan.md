# Typography Consistency Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Eliminate raw Tailwind typography classes in favor of the existing journey-* and ds-* layered system.

**Architecture:** Pure find-and-replace in 4 component files. No new classes, no token changes. Each task is one file.

**Tech Stack:** Next.js, Tailwind CSS v4, custom design-system utilities

---

### Task 1: Fix TestimonialsPreview.tsx

**Files:**
- Modify: `src/components/TestimonialsPreview.tsx`

**Step 1: Apply typography changes**

Replace line 13:
```tsx
// before
<h2 className="text-2xl md:text-3xl tracking-tight">{t("title")}</h2>
// after
<h2 className="journey-title">{t("title")}</h2>
```

Replace line 14:
```tsx
// before
<p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
// after
<p className="journey-sub max-w-2xl">
```

Replace line 22:
```tsx
// before
<figcaption className="mt-4 text-sm text-muted-foreground">
// after
<figcaption className="mt-4 text-sm text-muted">
```

Replace line 28:
```tsx
// before
<p className="text-sm text-muted-foreground">{t("loading")}</p>
// after
<p className="text-sm text-muted">{t("loading")}</p>
```

**Step 2: Verify build**

Run: `cd /Users/raphaelbruno/projects/sound-sanctuary && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/TestimonialsPreview.tsx
git commit -m "refactor(typography): migrate TestimonialsPreview to journey-* classes"
```

---

### Task 2: Fix PortfolioPreview.tsx

**Files:**
- Modify: `src/components/PortfolioPreview.tsx`

**Step 1: Apply typography changes**

Replace line 16:
```tsx
// before
<h2 className="text-2xl md:text-3xl tracking-tight">{t("title")}</h2>
// after
<h2 className="journey-title">{t("title")}</h2>
```

Replace line 17:
```tsx
// before
<p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
// after
<p className="journey-sub max-w-2xl">
```

Replace line 29:
```tsx
// before
<p className="text-xs tracking-wide text-muted-foreground uppercase">{it.type}</p>
// after
<p className="journey-label">{it.type}</p>
```

Replace line 30:
```tsx
// before
<h3 className="mt-2 text-lg tracking-tight">{it.title}</h3>
// after
<h3 className="mt-2 ds-font-display ds-size-lg ds-weight-light">{it.title}</h3>
```

Replace line 32:
```tsx
// before
<p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.excerpt}</p>
// after
<p className="mt-2 text-secondary leading-relaxed">{it.excerpt}</p>
```

Replace line 34:
```tsx
// before
<div className="mt-4 text-xs text-muted-foreground">
// after
<div className="mt-4 text-xs text-muted">
```

Replace line 41:
```tsx
// before
<p className="text-sm text-muted-foreground">{t("loading")}</p>
// after
<p className="text-sm text-muted">{t("loading")}</p>
```

**Step 2: Verify build**

Run: `cd /Users/raphaelbruno/projects/sound-sanctuary && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/PortfolioPreview.tsx
git commit -m "refactor(typography): migrate PortfolioPreview to journey-*/ds-* classes"
```

---

### Task 3: Fix NewsletterForm.tsx

**Files:**
- Modify: `src/components/NewsletterForm.tsx`

**Step 1: Apply typography changes**

Replace line 46:
```tsx
// before
<label className="block text-sm text-muted-foreground" htmlFor="email">
// after
<label className="block text-sm text-muted" htmlFor="email">
```

Replace line 85:
```tsx
// before
className={["mt-3 text-sm", status === "error" ? "text-red-600" : "text-muted-foreground"].join(
// after
className={["mt-3 text-sm", status === "error" ? "text-red-600" : "text-muted"].join(
```

Replace line 92:
```tsx
// before
<p className="mt-3 text-xs text-muted-foreground">{t("noSpam")}</p>
// after
<p className="mt-3 text-xs text-muted">{t("noSpam")}</p>
```

**Step 2: Verify build**

Run: `cd /Users/raphaelbruno/projects/sound-sanctuary && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/NewsletterForm.tsx
git commit -m "refactor(typography): normalize NewsletterForm color tokens"
```

---

### Task 4: Fix SiteFooter.tsx

**Files:**
- Modify: `src/components/SiteFooter.tsx`

**Step 1: Apply typography changes**

Replace line 9:
```tsx
// before
<div className="mx-auto max-w-5xl px-6 py-10 text-muted-foreground sm:px-8 md:px-10">
// after
<div className="mx-auto max-w-5xl px-6 py-10 text-muted sm:px-8 md:px-10">
```

**Step 2: Verify build**

Run: `cd /Users/raphaelbruno/projects/sound-sanctuary && npx next build 2>&1 | tail -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/SiteFooter.tsx
git commit -m "refactor(typography): normalize SiteFooter color tokens"
```

---

### Task 5: Final verification

**Step 1: Grep for remaining violations**

Run: `grep -rn "text-muted-foreground" src/`
Expected: Zero matches (or only in non-page utility code)

Run: `grep -rn "text-2xl\|text-3xl\|md:text-3xl" src/app/ src/components/`
Expected: Zero matches in page section headings

**Step 2: Build full site**

Run: `cd /Users/raphaelbruno/projects/sound-sanctuary && npx next build`
Expected: Build succeeds with no errors
