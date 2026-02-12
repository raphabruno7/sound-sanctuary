<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RAPHAEL — Design System · Semente V5.3</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
:root {
  --liquid-glass-deep:#1A3A2A;--liquid-glass-forest:#2D5A3E;--liquid-glass-emerald:#3B7A54;
  --liquid-glass-leaf:#5A9E6F;--liquid-glass-light:#8BC4A0;--liquid-glass-ghost:#C8E6D0;
  --gold:#C4A35A;--gold-light:#E0C97F;--gold-glow:rgba(196,163,90,0.15);
  --ocean:#5A8A8A;--sage-sea:#7AAA9A;--cobalt:#2A4A8A;
  --bone:#F2EFE8;--bone-warm:#F8F6F1;--charcoal:#1A1A16;--charcoal-soft:#2A2A24;
  --bg-primary:var(--bone-warm);--bg-secondary:var(--bone);--bg-dark:var(--charcoal);
  --text-primary:var(--charcoal);--text-secondary:rgba(26,26,22,0.55);--text-muted:rgba(26,26,22,0.35);
  --text-on-dark:var(--bone);--text-on-dark-muted:rgba(242,239,232,0.5);
  --accent-primary:var(--gold);--sun:var(--gold);--moon:var(--liquid-glass-ghost);
  --ocean-el:var(--ocean);--forest-el:var(--liquid-glass-deep);
  --glass-bg:rgba(242,239,232,0.45);--glass-bg-hover:rgba(242,239,232,0.65);
  --glass-border:rgba(196,163,90,0.12);--glass-border-hover:rgba(196,163,90,0.28);
  --glass-shadow:0 4px 24px rgba(26,58,42,0.06);--glass-shadow-hover:0 8px 40px rgba(26,58,42,0.1);
  --glass-blur:16px;--glass-glow:0 0 20px rgba(196,163,90,0.08);
  --glass-glow-pulse:0 0 30px rgba(196,163,90,0.15);
  --glass-dark-bg:rgba(26,26,22,0.6);--glass-dark-border:rgba(196,163,90,0.15);
  --font-display:'Cormorant Garamond',Georgia,serif;--font-body:'DM Sans',-apple-system,sans-serif;
  --font-arabic:'Noto Naskh Arabic',serif;--font-mono:'DM Mono',monospace;
  --text-xs:0.75rem;--text-sm:0.875rem;--text-base:1rem;--text-lg:1.125rem;
  --text-xl:1.25rem;--text-2xl:1.5rem;--text-3xl:2rem;--text-4xl:2.5rem;
  --text-5xl:3.25rem;--text-6xl:4rem;--text-7xl:5.5rem;
  --leading-tight:1.15;--leading-normal:1.5;--leading-relaxed:1.7;--leading-breath:1.9;
  --tracking-tight:-0.02em;--tracking-wide:0.06em;--tracking-wider:0.12em;--tracking-widest:0.2em;
  --space-1:0.25rem;--space-2:0.5rem;--space-3:0.75rem;--space-4:1rem;--space-5:1.5rem;
  --space-6:2rem;--space-8:3rem;--space-10:4rem;--space-12:5rem;--space-16:7rem;--space-20:9rem;
  --radius-sm:6px;--radius-md:12px;--radius-lg:20px;--radius-xl:28px;--radius-full:9999px;
  --ease-breath:cubic-bezier(0.37,0,0.63,1);--ease-nerve:cubic-bezier(0.16,1,0.3,1);
  --ease-flow:cubic-bezier(0.33,0,0.67,1);
  --dur-fast:200ms;--dur-normal:350ms;--dur-slow:600ms;--dur-breath:4500ms;--dur-nerve:800ms;--dur-draw:4500ms;
  --z-fluid:-1;--z-base:0;--z-content:10;--z-card:20;--z-nav:100;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{font-size:16px;scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
body{font-family:var(--font-body);font-weight:300;color:var(--text-primary);background:var(--bg-primary);line-height:var(--leading-relaxed)}
.ds-nav{position:fixed;top:0;left:0;right:0;z-index:var(--z-nav);background:rgba(248,246,241,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--glass-border);padding:var(--space-3) var(--space-6);display:flex;align-items:center;gap:var(--space-5);overflow-x:auto;scrollbar-width:none}
.ds-nav::-webkit-scrollbar{display:none}
.ds-nav-brand{font-family:var(--font-display);font-weight:300;font-size:var(--text-lg);letter-spacing:var(--tracking-wider);white-space:nowrap;flex-shrink:0}
.ds-nav-brand span{color:var(--gold);font-weight:400}
.ds-nav a{font-family:var(--font-mono);font-size:var(--text-xs);letter-spacing:var(--tracking-wide);text-transform:uppercase;color:var(--text-muted);text-decoration:none;white-space:nowrap;transition:color var(--dur-fast);padding:var(--space-1) 0}
.ds-nav a:hover{color:var(--gold)}
.ds-main{max-width:1200px;margin:0 auto;padding:calc(var(--space-16) + var(--space-6)) var(--space-6) var(--space-16)}
.ds-section{margin-bottom:var(--space-20);scroll-margin-top:80px}
.ds-label{font-family:var(--font-mono);font-size:var(--text-xs);letter-spacing:var(--tracking-widest);text-transform:uppercase;color:var(--gold);margin-bottom:var(--space-3)}
.ds-title{font-family:var(--font-display);font-weight:300;font-size:var(--text-4xl);line-height:var(--leading-tight);letter-spacing:var(--tracking-tight);margin-bottom:var(--space-4)}
.ds-sub{font-weight:300;font-size:var(--text-lg);color:var(--text-secondary);max-width:640px;margin-bottom:var(--space-8)}
.ds-divider{height:1px;background:linear-gradient(90deg,transparent,var(--glass-border),rgba(196,163,90,0.2),var(--glass-border),transparent);margin:var(--space-10) 0}
.dark-preview{background:var(--bg-dark);border-radius:var(--radius-xl);padding:var(--space-10) var(--space-8);margin-top:var(--space-8)}
/* Hero */
.ds-hero{text-align:center;padding:var(--space-20) 0 var(--space-16)}
.ds-hero h1{font-family:var(--font-display);font-weight:300;font-size:var(--text-7xl);letter-spacing:0.25em}
.ds-hero .arabic{font-family:var(--font-arabic);font-size:var(--text-2xl);color:var(--gold);direction:rtl;margin:var(--space-3) 0 var(--space-6);opacity:0.7}
.ds-hero .verse{font-family:var(--font-display);font-weight:300;font-style:italic;font-size:var(--text-xl);color:var(--text-secondary);line-height:var(--leading-breath);max-width:460px;margin:0 auto var(--space-4)}
.ds-hero .verse em{color:var(--liquid-glass-leaf);font-style:italic}
.ds-hero .meta{font-family:var(--font-mono);font-size:var(--text-xs);letter-spacing:var(--tracking-wider);color:var(--text-muted);text-transform:uppercase}
/* Principle */
.principle{max-width:680px;margin:0 auto;text-align:center;padding:var(--space-10) var(--space-6);border-left:2px solid var(--gold-light);border-right:2px solid var(--gold-light);position:relative}
.principle::before,.principle::after{content:'';position:absolute;left:50%;transform:translateX(-50%);width:6px;height:6px;border-radius:50%;background:var(--gold)}
.principle::before{top:-3px}.principle::after{bottom:-3px}
.principle p{font-family:var(--font-display);font-weight:300;font-size:var(--text-xl);color:var(--text-secondary);line-height:var(--leading-breath);margin-bottom:var(--space-4)}
.principle strong{font-family:var(--font-display);font-weight:500;font-size:var(--text-2xl);display:block;margin-top:var(--space-6);color:var(--text-primary)}
/* Palette */
.pal-group{margin-bottom:var(--space-8)}
.pal-group-title{font-family:var(--font-mono);font-size:var(--text-xs);letter-spacing:var(--tracking-wider);text-transform:uppercase;color:var(--text-muted);margin-bottom:var(--space-4)}
.pal-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:var(--space-3)}
.swatch{border-radius:var(--radius-md);overflow:hidden;background:white;border:1px solid var(--glass-border);transition:transform var(--dur-normal) var(--ease-nerve),box-shadow var(--dur-normal);cursor:pointer;position:relative}
.swatch:hover{transform:translateY(-2px);box-shadow:var(--glass-shadow-hover)}
.swatch-color{height:72px}
.swatch-info{padding:var(--space-3)}
.swatch-name{font-weight:500;font-size:var(--text-sm);margin-bottom:1px}
.swatch-hex{font-family:var(--font-mono);font-size:var(--text-xs);color:var(--text-muted)}
.swatch-var{font-family:var(--font-mono);font-size:10px;color:var(--text-muted);opacity:0.6;margin-top:2px;word-break:break-all}
.swatch .copied{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:var(--font-mono);font-size:var(--text-xs);color:white;background:rgba(0,0,0,0.7);padding:4px 10px;border-radius:var(--radius-full);opacity:0;pointer-events:none;transition:opacity 200ms}
.swatch.show-copied .copied{opacity:1}
/* Typography */
.type-spec{background:var(--bg-secondary);border-radius:var(--radius-lg);border:1px solid var(--glass-border);padding:var(--space-6) var(--space-8);margin-bottom:var(--space-5)}
.type-spec-label{font-family:var(--font-mono);font-size:10px;letter-spacing:var(--tracking-widest);text-transform:uppercase;color:var(--gold);margin-bottom:var(--space-4)}
.type-display{font-family:var(--font-display);font-weight:300;font-size:var(--text-5xl);line-height:var(--leading-tight);letter-spacing:var(--tracking-tight)}
.type-arabic{font-family:var(--font-arabic);font-size:var(--text-4xl);direction:rtl;text-align:right;line-height:1.4}
.type-body{font-weight:300;font-size:var(--text-base);line-height:var(--leading-relaxed);color:var(--text-secondary);max-width:580px}
.type-mono{font-family:var(--font-mono);font-weight:400;font-size:var(--text-sm);color:var(--text-secondary)}
.type-scale{display:flex;flex-direction:column;gap:var(--space-4);margin-top:var(--space-6)}
.type-scale-row{display:flex;align-items:baseline;gap:var(--space-5);padding-bottom:var(--space-3);border-bottom:1px solid rgba(0,0,0,0.04)}
.type-scale-label{font-family:var(--font-mono);font-size:10px;color:var(--text-muted);min-width:80px;flex-shrink:0}
.type-scale-sample{font-family:var(--font-display);font-weight:300;line-height:var(--leading-tight)}
/* Neuron Cards — cell body with dendrite protrusions */
.neuron-web{position:relative;padding:var(--space-8) 0}
.neuron-web-svg{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:visible}
.cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:var(--space-8);position:relative;z-index:1}
.glass-card{background:var(--glass-bg);backdrop-filter:blur(var(--glass-blur));-webkit-backdrop-filter:blur(var(--glass-blur));border:1px solid var(--glass-border);border-radius:38% 62% 55% 45% / 50% 42% 58% 50%;padding:var(--space-6) var(--space-5);box-shadow:var(--glass-shadow);transition:all var(--dur-normal) var(--ease-nerve);position:relative;overflow:visible;animation:cardBreathe var(--dur-breath) var(--ease-breath) infinite;text-align:center}
.glass-card::before{content:'';position:absolute;inset:-2px;border-radius:inherit;background:radial-gradient(ellipse at 40% 35%,rgba(196,163,90,0.06) 0%,transparent 65%);pointer-events:none;animation:nucleusPulse var(--dur-breath) var(--ease-breath) infinite}
.glass-card:hover{background:var(--glass-bg-hover);border-color:var(--glass-border-hover);box-shadow:var(--glass-shadow-hover),var(--glass-glow-pulse);transform:scale(1.03);border-radius:42% 58% 50% 50% / 48% 45% 55% 52%}
.glass-card .icon{font-size:var(--text-2xl);margin-bottom:var(--space-3);display:block}
.glass-card .title{font-family:var(--font-display);font-weight:400;font-size:var(--text-xl);margin-bottom:var(--space-2)}
.glass-card .sub{font-weight:300;font-size:var(--text-sm);color:var(--text-muted);margin-bottom:var(--space-3)}
.glass-card .desc{font-family:var(--font-display);font-weight:300;font-style:italic;color:var(--text-secondary);font-size:var(--text-sm)}
/* Nucleus dot inside */
.glass-card .nucleus{position:absolute;width:8px;height:8px;border-radius:50%;background:var(--gold);opacity:0.25;top:30%;left:35%;animation:nucleusPulse var(--dur-breath) var(--ease-breath) infinite}
@keyframes cardBreathe{0%,100%{box-shadow:var(--glass-shadow),var(--glass-glow)}50%{box-shadow:var(--glass-shadow),var(--glass-glow-pulse)}}
@keyframes nucleusPulse{0%,100%{opacity:0.15}50%{opacity:0.4}}
/* Dendrite SVG decorations around each card */
.card-dendrites{position:absolute;top:-20px;left:-20px;width:calc(100% + 40px);height:calc(100% + 40px);pointer-events:none;overflow:visible}
.card-dendrites path{fill:none;stroke:var(--liquid-glass-light);stroke-width:0.8;stroke-linecap:round;opacity:0.3}
.card-dendrites circle{fill:var(--liquid-glass-leaf);opacity:0.2}
/* Dark variant */
.glass-card-dark{background:var(--glass-dark-bg);border-color:var(--glass-dark-border);color:var(--text-on-dark)}
.glass-card-dark .title{color:var(--text-on-dark)}.glass-card-dark .sub{color:var(--text-on-dark-muted)}.glass-card-dark .desc{color:rgba(242,239,232,0.7)}
.glass-card-dark .card-dendrites path{stroke:rgba(242,239,232,0.15)}.glass-card-dark .card-dendrites circle{fill:var(--gold);opacity:0.15}
/* Elements */
.el-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;border-radius:var(--radius-lg);overflow:hidden}
.el-cell{padding:var(--space-8) var(--space-6);text-align:center;transition:all var(--dur-slow)}
.el-cell.sun{background:linear-gradient(160deg,#FFFCF5,#FFF8E8)}.el-cell.moon{background:linear-gradient(160deg,#F5FAF7,#E8F2EC)}
.el-cell.oce{background:linear-gradient(160deg,#F0F6F6,#E4EEEE)}.el-cell.for{background:linear-gradient(160deg,#F2F5F3,#E6EDE8)}
.el-sym{font-size:var(--text-3xl);margin-bottom:var(--space-3);opacity:0.6}
.el-name{font-family:var(--font-display);font-weight:400;font-size:var(--text-2xl);margin-bottom:var(--space-2)}
.el-action{font-family:var(--font-display);font-weight:300;font-style:italic;color:var(--text-secondary);margin-bottom:var(--space-4)}
.el-desc{font-weight:300;font-size:var(--text-sm);color:var(--text-muted);max-width:280px;margin:0 auto var(--space-3)}
.el-tag{font-family:var(--font-mono);font-size:10px;letter-spacing:var(--tracking-wider);text-transform:uppercase;display:inline-flex;align-items:center;gap:6px}
.el-dot{width:8px;height:8px;border-radius:50%;display:inline-block}
/* Anatomy */
.anatomy{width:100%;border-collapse:collapse;font-size:var(--text-sm)}
.anatomy thead{font-family:var(--font-mono);font-size:10px;letter-spacing:var(--tracking-wider);text-transform:uppercase;color:var(--gold)}
.anatomy th{padding:var(--space-3) var(--space-4);text-align:left;border-bottom:2px solid var(--glass-border);font-weight:400}
.anatomy td{padding:var(--space-4);border-bottom:1px solid rgba(0,0,0,0.04);vertical-align:top}
.anatomy tr:hover td{background:rgba(196,163,90,0.03)}
.a-comp{font-weight:500}.a-nerve{font-family:var(--font-display);font-weight:300;font-style:italic;color:var(--liquid-glass-forest)}
.a-bot{font-family:var(--font-display);font-weight:300;font-style:italic;color:var(--ocean)}.a-beh{font-weight:300;color:var(--text-secondary)}
/* Animations */
.anim-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:var(--space-5)}
.anim-card{background:var(--bg-secondary);border:1px solid var(--glass-border);border-radius:var(--radius-lg);padding:var(--space-5);text-align:center}
.anim-vis{height:80px;display:flex;align-items:center;justify-content:center;margin-bottom:var(--space-4)}
.anim-dot{width:12px;height:12px;border-radius:50%;background:var(--gold)}
.anim-dot.breathe{animation:breathe var(--dur-breath) var(--ease-breath) infinite}
.anim-dot.nerve{animation:nerveFlash 2s var(--ease-nerve) infinite}
.anim-dot.ripple{animation:rippleOut 2.5s var(--ease-flow) infinite;box-shadow:0 0 0 0 rgba(196,163,90,0.4)}
@keyframes breathe{0%,100%{opacity:0.4;transform:scale(0.85)}50%{opacity:1;transform:scale(1.15)}}
@keyframes nerveFlash{0%,100%{opacity:0.15;transform:scale(0.7)}15%{opacity:1;transform:scale(1.3);background:var(--liquid-glass-leaf)}30%{opacity:0.3;transform:scale(0.9)}}
@keyframes rippleOut{0%{box-shadow:0 0 0 0 rgba(196,163,90,0.4)}70%{box-shadow:0 0 0 25px rgba(196,163,90,0)}100%{box-shadow:0 0 0 0 rgba(196,163,90,0)}}
.draw-nerve line{stroke:var(--liquid-glass-leaf);stroke-width:1.5;stroke-dasharray:80;stroke-dashoffset:80;animation:drawOn var(--dur-draw) var(--ease-nerve) infinite;stroke-linecap:round}
.draw-nerve line:nth-child(2){animation-delay:300ms;stroke:var(--gold);opacity:0.6}.draw-nerve line:nth-child(3){animation-delay:600ms;opacity:0.4}.draw-nerve line:nth-child(4){animation-delay:450ms;opacity:0.5}
@keyframes drawOn{0%{stroke-dashoffset:80;opacity:0}10%{opacity:1}50%{stroke-dashoffset:0;opacity:1}80%{stroke-dashoffset:0;opacity:0.3}100%{stroke-dashoffset:80;opacity:0}}
.timer-rings circle{fill:none;stroke:var(--ocean);stroke-width:1;opacity:0;animation:ringPulse 3s var(--ease-flow) infinite}
.timer-rings circle:nth-child(2){animation-delay:.6s;stroke:var(--sage-sea)}.timer-rings circle:nth-child(3){animation-delay:1.2s;stroke:var(--liquid-glass-ghost)}
@keyframes ringPulse{0%{r:4;opacity:.8;stroke-width:2}100%{r:30;opacity:0;stroke-width:.5}}
@keyframes audioBar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(0.3)}}
.anim-label{font-family:var(--font-mono);font-size:10px;letter-spacing:var(--tracking-wider);text-transform:uppercase;color:var(--text-muted);margin-bottom:4px}
.anim-val{font-weight:400;font-size:var(--text-sm)}
/* Buttons */
.btn-row{display:flex;flex-wrap:wrap;gap:var(--space-4);align-items:center;margin-bottom:var(--space-5)}
.btn{font-family:var(--font-body);font-weight:400;font-size:var(--text-sm);letter-spacing:var(--tracking-wide);border:none;cursor:pointer;border-radius:var(--radius-full);padding:var(--space-3) var(--space-6);transition:all var(--dur-normal) var(--ease-nerve);position:relative;overflow:hidden}
.btn-primary{background:var(--gold);color:white}.btn-primary:hover{background:#b8963e;box-shadow:0 0 24px rgba(196,163,90,0.3)}
.btn-secondary{background:transparent;color:var(--text-primary);border:1px solid var(--glass-border-hover)}.btn-secondary:hover{border-color:var(--gold);color:var(--gold);box-shadow:var(--glass-glow)}
.btn-ghost{background:transparent;color:var(--text-secondary)}.btn-ghost:hover{color:var(--gold)}
.btn-dark{background:var(--charcoal);color:var(--bone)}.btn-dark:hover{background:var(--charcoal-soft);box-shadow:0 0 24px rgba(26,26,22,0.2)}
/* Spacing */
.spacing-row{display:flex;align-items:center;gap:var(--space-4);margin-bottom:var(--space-3)}
.spacing-bar{height:24px;background:linear-gradient(90deg,var(--liquid-glass-ghost),var(--liquid-glass-light));border-radius:var(--radius-sm)}
.spacing-label{font-family:var(--font-mono);font-size:11px;color:var(--text-muted);min-width:100px;flex-shrink:0}
/* Logo */
.logo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-5)}
.logo-var{background:var(--bg-secondary);border:1px solid var(--glass-border);border-radius:var(--radius-lg);padding:var(--space-8) var(--space-5);text-align:center;display:flex;flex-direction:column;align-items:center}
.logo-var svg{margin-bottom:var(--space-5)}.logo-var .name{font-family:var(--font-display);font-weight:400;font-size:var(--text-lg);margin-bottom:var(--space-1)}
.logo-var .use{font-weight:300;font-size:var(--text-sm);color:var(--text-muted)}
/* Tokens table */
.tok-table{width:100%;border-collapse:collapse;font-size:var(--text-sm);margin-top:var(--space-5)}
.tok-table th{font-family:var(--font-mono);font-size:10px;letter-spacing:var(--tracking-wider);text-transform:uppercase;color:var(--gold);text-align:left;padding:var(--space-2) var(--space-3);border-bottom:2px solid var(--glass-border);font-weight:400}
.tok-table td{padding:var(--space-2) var(--space-3);border-bottom:1px solid rgba(0,0,0,0.03);vertical-align:top}
.tok-name{font-family:var(--font-mono);font-size:var(--text-xs);color:var(--liquid-glass-forest)}
.tok-val{font-family:var(--font-mono);font-size:var(--text-xs);color:var(--text-secondary)}
.tok-desc{font-size:var(--text-xs);color:var(--text-muted)}
@media(max-width:768px){.ds-hero h1{font-size:var(--text-5xl)}.ds-title{font-size:var(--text-3xl)}.type-display{font-size:var(--text-3xl)}.type-arabic{font-size:var(--text-2xl)}.el-grid,.logo-grid{grid-template-columns:1fr}.ds-main{padding-left:var(--space-4);padding-right:var(--space-4)}}
</style>
</head>
<body>
<nav class="ds-nav">
  <div class="ds-nav-brand">RAPHAEL <span>DS</span></div>
  <a href="#principle">Princípio</a><a href="#palette">Paleta</a><a href="#typography">Tipografia</a>
  <a href="#cards">Cards</a><a href="#elements">Elementos</a><a href="#anatomy">Anatomia</a>
  <a href="#animation">Animação</a><a href="#buttons">Botões</a><a href="#spacing">Espaçamento</a>
  <a href="#logo">Logo</a><a href="#tokens">Tokens</a>
</nav>
<main class="ds-main">

<section class="ds-hero ds-section">
  <h1>R A F A E L</h1>
  <div class="arabic">رفائيل · רְפָאֵל</div>
  <div class="verse">Power sings as it flows,<br>electrifies the organs of sensing,<br>becomes <em>liquid light</em>,<br>nourishes your entire being.</div>
  <div class="meta">Design System · Semente V5.3 · Lisboa 2026</div>
</section>
<div class="ds-divider"></div>

<section id="principle" class="ds-section">
  <div class="ds-label">00 — Princípio Fundador</div>
  <div class="principle">
    <p>O corpo humano é 70% água. O som viaja pela água.</p>
    <p>O sistema nervoso está imerso nessa água.</p>
    <p>Quando a tigela toca, a vibração encontra o líquido, se propaga como onda, e alcança cada nervo por dentro.</p>
    <strong>O som reconstrói o sistema nervoso.</strong>
  </div>
</section>
<div class="ds-divider"></div>

<section id="palette" class="ds-section">
  <div class="ds-label">01 — Paleta</div>
  <div class="ds-title">Liquid Glass + Ouro + Oceano</div>
  <div class="ds-sub">13 cores extraídas da fotografia de folha backlit, tradição islâmica dourada e herança azulejo portuguesa.</div>

  <div class="pal-group">
    <div class="pal-group-title">Liquid Glass — Primária</div>
    <div class="pal-row" id="pal-lg"></div>
  </div>
  <div class="pal-group">
    <div class="pal-group-title">Acentos</div>
    <div class="pal-row" id="pal-acc"></div>
  </div>
  <div class="pal-group">
    <div class="pal-group-title">Neutros</div>
    <div class="pal-row" id="pal-neu"></div>
  </div>
</section>
<div class="ds-divider"></div>

<section id="typography" class="ds-section">
  <div class="ds-label">02 — Tipografia Trilíngue</div>
  <div class="ds-title">Três escritas, uma respiração</div>
  <div class="type-spec">
    <div class="type-spec-label">Display · Cormorant Garamond Light</div>
    <div class="type-display">O prana canta enquanto flui</div>
  </div>
  <div class="type-spec">
    <div class="type-spec-label">Arabic · Noto Naskh Arabic</div>
    <div class="type-arabic">الصوت يعيد بناء الجهاز العصبي</div>
  </div>
  <div class="type-spec">
    <div class="type-spec-label">Body · DM Sans Light 300</div>
    <div class="type-body">O som das tigelas percorre o sistema nervoso como a seiva percorre as nervuras de uma folha — encontrando caminhos, restaurando conexões. Becomes liquid light, nourishes your entire being.</div>
  </div>
  <div class="type-spec">
    <div class="type-spec-label">Mono · DM Mono 400</div>
    <div class="type-mono">--liquid-glass-emerald: #3B7A54;<br>duration-breath: 4500ms;<br>font-display: 'Cormorant Garamond', serif;</div>
  </div>
  <div class="type-scale">
    <div class="type-scale-row"><span class="type-scale-label">7xl · 88px</span><span class="type-scale-sample" style="font-size:3rem">Raphael</span></div>
    <div class="type-scale-row"><span class="type-scale-label">6xl · 64px</span><span class="type-scale-sample" style="font-size:2.5rem">Sound Healing</span></div>
    <div class="type-scale-row"><span class="type-scale-label">5xl · 52px</span><span class="type-scale-sample" style="font-size:2rem">Sistema Nervoso</span></div>
    <div class="type-scale-row"><span class="type-scale-label">4xl · 40px</span><span class="type-scale-sample" style="font-size:1.75rem">Liquid Light</span></div>
    <div class="type-scale-row"><span class="type-scale-label">3xl · 32px</span><span class="type-scale-sample" style="font-size:1.5rem">Quatro Forças</span></div>
    <div class="type-scale-row"><span class="type-scale-label">2xl · 24px</span><span class="type-scale-sample" style="font-size:1.25rem">Princípio Fundador</span></div>
    <div class="type-scale-row"><span class="type-scale-label">xl · 20px</span><span class="type-scale-sample" style="font-size:1.125rem">O som reconstrói</span></div>
    <div class="type-scale-row"><span class="type-scale-label">base · 16px</span><span class="type-scale-sample" style="font-size:.875rem;font-family:var(--font-body);font-weight:300">Body text padrão</span></div>
    <div class="type-scale-row"><span class="type-scale-label">sm · 14px</span><span class="type-scale-sample" style="font-size:.75rem;font-family:var(--font-body);font-weight:300">Subtítulo e meta</span></div>
    <div class="type-scale-row"><span class="type-scale-label">xs · 12px</span><span class="type-scale-sample" style="font-size:.65rem;font-family:var(--font-mono)">LABELS E TOKENS</span></div>
  </div>
</section>
<div class="ds-divider"></div>

<section id="cards" class="ds-section">
  <div class="ds-label">03 — Neuron Cards · Células Nervosas</div>
  <div class="ds-title">Cards como neurônios — cell body, dendritos, sinapses</div>
  <div class="ds-sub">Cada card é um neurônio multipolar. A forma orgânica é o corpo celular (soma). Os dendritos ramificam nas bordas. As teias entre cards são axônios e sinapses — caminhos por onde o som viaja.</div>

  <div class="neuron-web">
    <svg class="neuron-web-svg" id="synapse-web"></svg>
    <div class="cards-grid" id="neuron-grid">
      <div class="glass-card">
        <div class="nucleus"></div>
        <svg class="card-dendrites" viewBox="0 0 280 240"><path d="M 20,30 C 30,15 15,5 5,2"/><path d="M 35,15 C 25,5 30,0 22,0"/><path d="M 250,20 C 260,8 270,5 278,2"/><path d="M 15,200 C 5,210 3,220 0,235"/><path d="M 260,210 C 270,220 275,230 280,238"/><circle cx="5" cy="2" r="2"/><circle cx="278" cy="2" r="2"/><circle cx="0" cy="235" r="1.5"/><circle cx="280" cy="238" r="1.5"/></svg>
        <span class="icon">🔔</span><div class="title">Sound Bath</div><div class="sub">Sessão individual · 60min</div><div class="desc">Peter Hess bowls sobre o corpo. O som encontra a água.</div>
      </div>
      <div class="glass-card">
        <div class="nucleus"></div>
        <svg class="card-dendrites" viewBox="0 0 280 240"><path d="M 30,10 C 20,3 10,0 2,5"/><path d="M 245,15 C 260,5 268,0 275,3"/><path d="M 10,190 C 3,205 0,215 5,230"/><path d="M 265,200 C 275,215 278,225 275,238"/><path d="M 140,2 C 142,0 138,0 135,2"/><circle cx="2" cy="5" r="1.5"/><circle cx="275" cy="3" r="2"/><circle cx="5" cy="230" r="1.5"/></svg>
        <span class="icon">☉</span><div class="title">Solar</div><div class="sub" style="color:var(--gold)">heals, charges, warms</div><div class="desc">Frequência do fogo. Calor que dissolve.</div>
      </div>
      <div class="glass-card">
        <div class="nucleus"></div>
        <svg class="card-dendrites" viewBox="0 0 280 240"><path d="M 25,20 C 12,10 5,3 0,8"/><path d="M 255,10 C 265,3 275,0 280,5"/><path d="M 8,210 C 0,220 2,232 8,238"/><path d="M 270,215 C 278,225 280,232 276,240"/><circle cx="0" cy="8" r="2"/><circle cx="280" cy="5" r="1.5"/><circle cx="8" cy="238" r="2"/></svg>
        <span class="icon">〰</span><div class="title">Ocean</div><div class="sub" style="color:var(--ocean)">cleanses, refreshes, opens</div><div class="desc">Ondulação que limpa. Maré que abre centros.</div>
      </div>
      <div class="glass-card">
        <div class="nucleus"></div>
        <svg class="card-dendrites" viewBox="0 0 280 240"><path d="M 18,25 C 8,12 2,5 0,0"/><path d="M 260,18 C 270,8 278,2 280,0"/><path d="M 5,205 C 0,218 3,228 8,235"/><path d="M 272,208 C 280,218 278,230 274,240"/><path d="M 140,0 C 145,0 150,2 148,5"/><circle cx="0" cy="0" r="2"/><circle cx="280" cy="0" r="2"/><circle cx="8" cy="235" r="1.5"/></svg>
        <span class="icon">☽</span><div class="title">Moon</div><div class="sub" style="color:var(--liquid-glass-light)">connects, manifests, unlocks</div><div class="desc">Frequência da água interna. Subconsciente.</div>
      </div>
      <div class="glass-card">
        <div class="nucleus"></div>
        <svg class="card-dendrites" viewBox="0 0 280 240"><path d="M 22,18 C 10,8 3,2 0,5"/><path d="M 258,22 C 268,10 276,3 280,8"/><path d="M 12,215 C 5,225 0,232 3,240"/><path d="M 268,218 C 276,228 280,235 278,240"/><circle cx="0" cy="5" r="1.5"/><circle cx="280" cy="8" r="2"/><circle cx="3" cy="240" r="2"/></svg>
        <span class="icon">⌇</span><div class="title">Forest</div><div class="sub" style="color:var(--liquid-glass-forest)">grounds, balances, stabilizes</div><div class="desc">Raiz. Aterramento. Som grave que ancora.</div>
      </div>
      <div class="glass-card" style="font-family:var(--font-arabic);direction:rtl;text-align:right">
        <div class="nucleus" style="left:auto;right:35%"></div>
        <svg class="card-dendrites" viewBox="0 0 280 240"><path d="M 28,15 C 15,5 5,0 0,3"/><path d="M 250,20 C 265,8 275,2 280,5"/><path d="M 10,208 C 2,220 0,230 5,238"/><path d="M 270,212 C 278,222 280,232 276,240"/><circle cx="0" cy="3" r="2"/><circle cx="280" cy="5" r="1.5"/></svg>
        <span class="icon" style="text-align:right">رفائيل</span><div class="title" style="font-family:var(--font-arabic)">الصوت</div><div class="sub">Sound · Prana · Cura</div><div class="desc" style="font-family:var(--font-arabic);font-style:normal">الصوت يعيد بناء الجهاز العصبي</div>
      </div>
    </div>
  </div>

  <div class="dark-preview">
    <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:var(--space-6)">Dark Context · Rede Sináptica</div>
    <div class="neuron-web">
      <svg class="neuron-web-svg" id="synapse-web-dark"></svg>
      <div class="cards-grid" id="neuron-grid-dark">
        <div class="glass-card glass-card-dark">
          <div class="nucleus"></div>
          <svg class="card-dendrites" viewBox="0 0 280 240"><path d="M 20,25 C 8,12 2,5 0,2"/><path d="M 255,18 C 268,6 276,0 280,3"/><path d="M 8,210 C 0,222 3,232 8,240"/><path d="M 270,215 C 280,225 278,235 274,240"/><circle cx="0" cy="2" r="2"/><circle cx="280" cy="3" r="1.5"/></svg>
          <span class="icon">🔔</span><div class="title">Sound Bath</div><div class="sub">Sessão individual · 60min</div><div class="desc">Vidro líquido sobre fundo escuro.</div>
        </div>
        <div class="glass-card glass-card-dark">
          <div class="nucleus"></div>
          <svg class="card-dendrites" viewBox="0 0 280 240"><path d="M 25,20 C 12,8 4,2 0,5"/><path d="M 252,15 C 265,5 275,0 280,4"/><path d="M 5,215 C 0,228 3,235 8,240"/><circle cx="0" cy="5" r="1.5"/><circle cx="280" cy="4" r="2"/></svg>
          <span class="icon">☉</span><div class="title">Solar</div><div class="sub" style="color:var(--gold-light)">heals, charges, warms</div><div class="desc">Gold glow sobre charcoal.</div>
        </div>
      </div>
    </div>
  </div>
</section>
<div class="ds-divider"></div>

<section id="elements" class="ds-section">
  <div class="ds-label">04 — Framework Elemental</div>
  <div class="ds-title">Quatro forças do som</div>
  <div class="el-grid">
    <div class="el-cell sun"><div class="el-sym">☉</div><div class="el-name">The Sun</div><div class="el-action">heals, charges, warms</div><div class="el-desc">Frequência do fogo. Calor que dissolve. Carrega o sistema nervoso.</div><div class="el-tag" style="color:var(--gold)"><span class="el-dot" style="background:var(--gold)"></span>gold · #C4A35A</div></div>
    <div class="el-cell moon"><div class="el-sym">☽</div><div class="el-name">The Moon</div><div class="el-action">connects, manifests, unlocks</div><div class="el-desc">Frequência da água interna. Subconsciente. Ritmo do corpo sutil.</div><div class="el-tag" style="color:var(--liquid-glass-forest)"><span class="el-dot" style="background:var(--liquid-glass-ghost)"></span>ghost · #C8E6D0</div></div>
    <div class="el-cell oce"><div class="el-sym">〰</div><div class="el-name">The Ocean</div><div class="el-action">cleanses, refreshes, opens</div><div class="el-desc">Ondulação que limpa. Maré que abre centros de energia.</div><div class="el-tag" style="color:var(--ocean)"><span class="el-dot" style="background:var(--ocean)"></span>ocean · #5A8A8A</div></div>
    <div class="el-cell for"><div class="el-sym">⌇</div><div class="el-name">The Forest</div><div class="el-action">grounds, balances, stabilizes</div><div class="el-desc">Raiz. Aterramento. Som grave que ancora na terra.</div><div class="el-tag" style="color:var(--liquid-glass-deep)"><span class="el-dot" style="background:var(--liquid-glass-deep)"></span>deep · #1A3A2A</div></div>
  </div>
</section>
<div class="ds-divider"></div>

<section id="anatomy" class="ds-section">
  <div class="ds-label">05 — UI = Anatomia</div>
  <div class="ds-title">Cada componente é um órgão nervoso</div>
  <div style="overflow-x:auto">
  <table class="anatomy">
    <thead><tr><th>Componente</th><th>Equiv. Nervoso</th><th>Equiv. Botânico</th><th>Comportamento</th></tr></thead>
    <tbody>
      <tr><td class="a-comp">Background</td><td class="a-nerve">Fluido cefalorraquidiano</td><td class="a-bot">Membrana da folha</td><td class="a-beh">Superfície líquida WebGL, reativa ao scroll e toque</td></tr>
      <tr><td class="a-comp">Layout vertical</td><td class="a-nerve">Coluna vertebral / Medula</td><td class="a-bot">Nervura central pinnata</td><td class="a-beh">Eixo principal do scroll, tudo se ramifica dele</td></tr>
      <tr><td class="a-comp">Menu / Nav</td><td class="a-nerve">Plexo cervical</td><td class="a-bot">Ramificações superiores</td><td class="a-beh">Nervos que saem do topo da coluna para os lados</td></tr>
      <tr><td class="a-comp">Cards / Containers</td><td class="a-nerve">Neurônios multipolares</td><td class="a-bot">Bulbos de raiz</td><td class="a-beh">Soma orgânico com dendritos, pulsam, contêm informação</td></tr>
      <tr><td class="a-comp">Conexões entre cards</td><td class="a-nerve">Axônios + Sinapses</td><td class="a-bot">Rede micelial</td><td class="a-beh">Teias SVG com nós dourados, caminhos do som</td></tr>
      <tr><td class="a-comp">Separadores</td><td class="a-nerve">Nervos intercostais</td><td class="a-bot">Nervuras secundárias</td><td class="a-beh">Linhas orgânicas que ramificam do eixo central</td></tr>
      <tr><td class="a-comp">Botões / CTAs</td><td class="a-nerve">Sinapses</td><td class="a-bot">Nós de ramificação</td><td class="a-beh">Pontos de decisão, glow ao hover, ripple ao click</td></tr>
      <tr><td class="a-comp">Loading</td><td class="a-nerve">Impulso percorrendo nervo</td><td class="a-bot">Seiva percorrendo nervura</td><td class="a-beh">Draw-on animation do centro para extremidades</td></tr>
      <tr><td class="a-comp">Timer de sessão</td><td class="a-nerve">Ondas no fluido corporal</td><td class="a-bot">Anéis concêntricos</td><td class="a-beh">Círculos expandindo do centro, pulsando</td></tr>
      <tr><td class="a-comp">Scroll reveal</td><td class="a-nerve">Propagação nervosa</td><td class="a-bot">Folha se abrindo</td><td class="a-beh">Acende do centro → extremidades</td></tr>
      <tr><td class="a-comp">Footer</td><td class="a-nerve">Raízes / sistema radicular</td><td class="a-bot">Raízes Allium</td><td class="a-beh">Ramificações densas para baixo, ancoragem</td></tr>
    </tbody>
  </table>
  </div>
</section>
<div class="ds-divider"></div>
<section id="animation" class="ds-section">
  <div class="ds-label">06 — Animação · Impulsos</div>
  <div class="ds-title">Nada é inerte</div>
  <div class="ds-sub">Textos respiram. Cards pulsam como nós nervosos. Elementos "acendem" como impulso nervoso.</div>
  <div class="anim-grid">
    <div class="anim-card"><div class="anim-vis"><div class="anim-dot breathe"></div></div><div class="anim-label">Respiração</div><div class="anim-val">4.5s · ease-breath</div><div style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);margin-top:4px">Opacidade 0.4→1→0.4</div></div>
    <div class="anim-card"><div class="anim-vis"><div class="anim-dot nerve"></div></div><div class="anim-label">Impulso Nervoso</div><div class="anim-val">800ms · ease-nerve</div><div style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);margin-top:4px">Flash rápido + decay</div></div>
    <div class="anim-card"><div class="anim-vis"><div class="anim-dot ripple"></div></div><div class="anim-label">Ripple / Toque</div><div class="anim-val">Ondas concêntricas</div><div style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);margin-top:4px">Som na água do corpo</div></div>
    <div class="anim-card"><div class="anim-vis"><svg class="draw-nerve" width="120" height="70" viewBox="0 0 120 70"><line x1="60" y1="5" x2="60" y2="65"/><line x1="60" y1="25" x2="20" y2="10"/><line x1="60" y1="35" x2="100" y2="20"/><line x1="60" y1="50" x2="30" y2="60"/></svg></div><div class="anim-label">Draw-on Nervura</div><div class="anim-val">4.5s · propagação</div><div style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);margin-top:4px">Centro → extremidades</div></div>
    <div class="anim-card"><div class="anim-vis"><svg class="timer-rings" viewBox="0 0 70 70" width="70" height="70"><circle cx="35" cy="35"/><circle cx="35" cy="35"/><circle cx="35" cy="35"/></svg></div><div class="anim-label">Timer Concêntrico</div><div class="anim-val">Ondas expandindo</div><div style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);margin-top:4px">Sessão de som</div></div>
    <div class="anim-card"><div class="anim-vis"><div style="display:flex;gap:8px;align-items:flex-end"><div style="width:4px;height:20px;background:var(--liquid-glass-leaf);border-radius:2px;animation:audioBar .8s ease infinite"></div><div style="width:4px;height:35px;background:var(--liquid-glass-emerald);border-radius:2px;animation:audioBar .6s ease infinite .1s"></div><div style="width:4px;height:15px;background:var(--liquid-glass-light);border-radius:2px;animation:audioBar .7s ease infinite .2s"></div><div style="width:4px;height:28px;background:var(--gold);border-radius:2px;animation:audioBar .9s ease infinite .15s"></div><div style="width:4px;height:12px;background:var(--ocean);border-radius:2px;animation:audioBar .65s ease infinite .25s"></div></div></div><div class="anim-label">Audio-reactive</div><div class="anim-val">FFT → shader</div><div style="font-family:var(--font-mono);font-size:10px;color:var(--text-muted);margin-top:4px">Mic input → visual</div></div>
  </div>
</section>
<div class="ds-divider"></div>

<section id="buttons" class="ds-section">
  <div class="ds-label">07 — Botões · Sinapses</div>
  <div class="ds-title">Pontos de decisão</div>
  <div class="ds-sub">Glow ao hover, ripple ao click. Cada botão é uma sinapse.</div>
  <div class="btn-row"><button class="btn btn-primary">Iniciar Sessão</button><button class="btn btn-secondary">Explorar Sons</button><button class="btn btn-ghost">Saber mais →</button><button class="btn btn-dark">Sound Bath</button></div>
  <div class="dark-preview">
    <div class="btn-row"><button class="btn btn-primary">Iniciar Sessão</button><button class="btn btn-secondary" style="color:var(--bone);border-color:rgba(196,163,90,0.3)">Explorar Sons</button><button class="btn btn-ghost" style="color:var(--text-on-dark-muted)">Saber mais →</button></div>
  </div>
</section>
<div class="ds-divider"></div>

<section id="spacing" class="ds-section">
  <div class="ds-label">08 — Espaçamento</div>
  <div class="ds-title">Grid de 8px · Respiração entre elementos</div>
  <div id="spacing-demo"></div>
</section>
<div class="ds-divider"></div>

<section id="logo" class="ds-section">
  <div class="ds-label">09 — Logo · O Corpo Luminoso</div>
  <div class="ds-title">Sistema nervoso como identidade</div>
  <div class="ds-sub">Três referências sobrepostas: anatomia do sistema nervoso (Dr. Weaver, 1888), sistema radicular do Allium montanum, e nervura pinnata com campo de prana.</div>
  <div class="logo-grid">
    <div class="logo-var">
      <svg width="80" height="180" viewBox="0 0 80 180"><line x1="40" y1="12" x2="40" y2="168" stroke="#C4A35A" stroke-width="1" opacity=".5"/><circle cx="40" cy="20" r="3" fill="#C4A35A" opacity=".8"/><circle cx="40" cy="45" r="2.5" fill="#C4A35A" opacity=".6"/><circle cx="40" cy="70" r="3.5" fill="#C4A35A" opacity=".9"/><circle cx="40" cy="95" r="2.5" fill="#C4A35A" opacity=".6"/><circle cx="40" cy="120" r="2" fill="#C4A35A" opacity=".5"/><circle cx="40" cy="145" r="1.5" fill="#C4A35A" opacity=".4"/><circle cx="40" cy="165" r="1" fill="#C4A35A" opacity=".3"/><line x1="40" y1="45" x2="12" y2="30" stroke="#5A9E6F" stroke-width=".8" opacity=".4"/><line x1="40" y1="45" x2="68" y2="30" stroke="#5A9E6F" stroke-width=".8" opacity=".4"/><line x1="40" y1="70" x2="8" y2="58" stroke="#5A9E6F" stroke-width=".8" opacity=".5"/><line x1="40" y1="70" x2="72" y2="58" stroke="#5A9E6F" stroke-width=".8" opacity=".5"/><line x1="40" y1="95" x2="15" y2="88" stroke="#5A9E6F" stroke-width=".6" opacity=".3"/><line x1="40" y1="95" x2="65" y2="88" stroke="#5A9E6F" stroke-width=".6" opacity=".3"/><circle cx="40" cy="70" r="12" fill="none" stroke="#C4A35A" stroke-width=".5" opacity=".2"/><circle cx="40" cy="70" r="20" fill="none" stroke="#C4A35A" stroke-width=".3" opacity=".1"/></svg>
      <div class="name">Full Body</div><div class="use">Hero, poster, apresentações</div>
    </div>
    <div class="logo-var">
      <svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="4" fill="#C4A35A" opacity=".9"/><circle cx="60" cy="60" r="16" fill="none" stroke="#5A9E6F" stroke-width=".8" opacity=".3"/><circle cx="60" cy="60" r="30" fill="none" stroke="#5A9E6F" stroke-width=".5" opacity=".2"/><circle cx="60" cy="60" r="45" fill="none" stroke="#C4A35A" stroke-width=".3" opacity=".1"/><line x1="60" y1="60" x2="60" y2="10" stroke="#5A9E6F" stroke-width=".8" opacity=".5"/><line x1="60" y1="60" x2="60" y2="110" stroke="#5A9E6F" stroke-width=".8" opacity=".5"/><line x1="60" y1="60" x2="10" y2="60" stroke="#5A9E6F" stroke-width=".6" opacity=".3"/><line x1="60" y1="60" x2="110" y2="60" stroke="#5A9E6F" stroke-width=".6" opacity=".3"/><line x1="60" y1="60" x2="25" y2="25" stroke="#C4A35A" stroke-width=".5" opacity=".2"/><line x1="60" y1="60" x2="95" y2="25" stroke="#C4A35A" stroke-width=".5" opacity=".2"/><line x1="60" y1="60" x2="25" y2="95" stroke="#C4A35A" stroke-width=".5" opacity=".2"/><line x1="60" y1="60" x2="95" y2="95" stroke="#C4A35A" stroke-width=".5" opacity=".2"/></svg>
      <div class="name">Radial</div><div class="use">Timer, loading, pulso</div>
    </div>
    <div class="logo-var">
      <svg width="100" height="140" viewBox="0 0 100 140"><line x1="50" y1="10" x2="50" y2="60" stroke="#5A9E6F" stroke-width="1" opacity=".6"/><line x1="50" y1="30" x2="35" y2="15" stroke="#5A9E6F" stroke-width=".7" opacity=".3"/><line x1="50" y1="30" x2="65" y2="15" stroke="#5A9E6F" stroke-width=".7" opacity=".3"/><circle cx="50" cy="60" r="3" fill="#C4A35A" opacity=".8"/><line x1="50" y1="60" x2="20" y2="55" stroke="#C4A35A" stroke-width=".5" opacity=".3"/><line x1="50" y1="60" x2="80" y2="55" stroke="#C4A35A" stroke-width=".5" opacity=".3"/><line x1="50" y1="60" x2="50" y2="130" stroke="#5A9E6F" stroke-width="1" opacity=".5"/><line x1="50" y1="75" x2="25" y2="100" stroke="#5A9E6F" stroke-width=".8" opacity=".4"/><line x1="50" y1="75" x2="75" y2="100" stroke="#5A9E6F" stroke-width=".8" opacity=".4"/><line x1="50" y1="90" x2="15" y2="120" stroke="#5A9E6F" stroke-width=".6" opacity=".3"/><line x1="50" y1="90" x2="85" y2="120" stroke="#5A9E6F" stroke-width=".6" opacity=".3"/><line x1="50" y1="105" x2="30" y2="130" stroke="#5A9E6F" stroke-width=".5" opacity=".25"/><line x1="50" y1="105" x2="70" y2="130" stroke="#5A9E6F" stroke-width=".5" opacity=".25"/></svg>
      <div class="name">Raiz</div><div class="use">Allium montanum · O invisível sustenta o visível</div>
    </div>
  </div>
  <div style="text-align:center;margin-top:var(--space-6);font-family:var(--font-mono);font-size:10px;color:var(--text-muted);letter-spacing:.15em;text-transform:uppercase">Compacto = Torso → Favicon, ícone de app, selo</div>
</section>
<div class="ds-divider"></div>

<section id="tokens" class="ds-section">
  <div class="ds-label">10 — Token Export</div>
  <div class="ds-title">CSS Custom Properties</div>
  <div class="ds-sub">Copie o bloco :root do &lt;style&gt; deste documento para seu app e website — single source of truth.</div>
  <table class="tok-table">
    <thead><tr><th>Token</th><th>Valor</th><th>Uso</th></tr></thead>
    <tbody>
      <tr><td class="tok-name">--liquid-glass-deep</td><td class="tok-val">#1A3A2A</td><td class="tok-desc">Forest element, deep backgrounds</td></tr>
      <tr><td class="tok-name">--liquid-glass-emerald</td><td class="tok-val">#3B7A54</td><td class="tok-desc">Primary green, leaf venation</td></tr>
      <tr><td class="tok-name">--liquid-glass-ghost</td><td class="tok-val">#C8E6D0</td><td class="tok-desc">Moon element, overlay ghost</td></tr>
      <tr><td class="tok-name">--gold</td><td class="tok-val">#C4A35A</td><td class="tok-desc">Sun element, CTAs, labels, glow</td></tr>
      <tr><td class="tok-name">--ocean</td><td class="tok-val">#5A8A8A</td><td class="tok-desc">Ocean element, secondary accent</td></tr>
      <tr><td class="tok-name">--bone</td><td class="tok-val">#F2EFE8</td><td class="tok-desc">Light bg, bone surface</td></tr>
      <tr><td class="tok-name">--charcoal</td><td class="tok-val">#1A1A16</td><td class="tok-desc">Dark mode, text, deep bg</td></tr>
      <tr><td class="tok-name">--font-display</td><td class="tok-val">Cormorant Garamond</td><td class="tok-desc">Headlines, títulos, poesia</td></tr>
      <tr><td class="tok-name">--font-body</td><td class="tok-val">DM Sans</td><td class="tok-desc">Body text, descrições</td></tr>
      <tr><td class="tok-name">--font-arabic</td><td class="tok-val">Noto Naskh Arabic</td><td class="tok-desc">Script árabe, trilíngue</td></tr>
      <tr><td class="tok-name">--font-mono</td><td class="tok-val">DM Mono</td><td class="tok-desc">Labels, tokens, código</td></tr>
      <tr><td class="tok-name">--glass-bg</td><td class="tok-val">rgba(242,239,232,0.45)</td><td class="tok-desc">Glass card background</td></tr>
      <tr><td class="tok-name">--glass-blur</td><td class="tok-val">16px</td><td class="tok-desc">Backdrop blur for glass</td></tr>
      <tr><td class="tok-name">--ease-breath</td><td class="tok-val">cubic-bezier(0.37,0,0.63,1)</td><td class="tok-desc">Respiratory cycle animation</td></tr>
      <tr><td class="tok-name">--ease-nerve</td><td class="tok-val">cubic-bezier(0.16,1,0.3,1)</td><td class="tok-desc">Nerve impulse, fast in slow out</td></tr>
      <tr><td class="tok-name">--dur-breath</td><td class="tok-val">4500ms</td><td class="tok-desc">Respiratory opacity cycle</td></tr>
      <tr><td class="tok-name">--dur-draw</td><td class="tok-val">4500ms</td><td class="tok-desc">Logo draw-on full body</td></tr>
      <tr><td class="tok-name">--radius-lg</td><td class="tok-val">20px</td><td class="tok-desc">Cards, containers, panels</td></tr>
      <tr><td class="tok-name">--radius-full</td><td class="tok-val">9999px</td><td class="tok-desc">Buttons, pills, tags</td></tr>
    </tbody>
  </table>
</section>

<div style="text-align:center;padding:var(--space-16) 0 var(--space-10)">
  <div style="font-family:var(--font-arabic);font-size:var(--text-2xl);color:var(--gold);direction:rtl;margin-bottom:var(--space-4)">الصوت يعيد بناء الجهاز العصبي</div>
  <div style="font-family:var(--font-display);font-weight:300;font-style:italic;font-size:var(--text-xl);color:var(--text-secondary);margin-bottom:var(--space-6)">O som reconstrói o sistema nervoso</div>
  <div style="font-family:var(--font-mono);font-size:var(--text-xs);letter-spacing:var(--tracking-wider);color:var(--text-muted);text-transform:uppercase">Raphael · Semente V5.3 · Lisboa · 2026</div>
</div>

</main>

<script>
// Palette generator
const palettes = {
  'pal-lg': [
    {name:'Deep',hex:'#1A3A2A',v:'--liquid-glass-deep'},
    {name:'Forest',hex:'#2D5A3E',v:'--liquid-glass-forest'},
    {name:'Emerald',hex:'#3B7A54',v:'--liquid-glass-emerald'},
    {name:'Leaf',hex:'#5A9E6F',v:'--liquid-glass-leaf'},
    {name:'Light',hex:'#8BC4A0',v:'--liquid-glass-light'},
    {name:'Ghost',hex:'#C8E6D0',v:'--liquid-glass-ghost'}
  ],
  'pal-acc': [
    {name:'Gold',hex:'#C4A35A',v:'--gold'},
    {name:'Gold Light',hex:'#E0C97F',v:'--gold-light'},
    {name:'Ocean',hex:'#5A8A8A',v:'--ocean'},
    {name:'Sage Sea',hex:'#7AAA9A',v:'--sage-sea'},
    {name:'Cobalt',hex:'#2A4A8A',v:'--cobalt'}
  ],
  'pal-neu': [
    {name:'Bone',hex:'#F2EFE8',v:'--bone',light:true},
    {name:'Bone Warm',hex:'#F8F6F1',v:'--bone-warm',light:true},
    {name:'Charcoal',hex:'#1A1A16',v:'--charcoal'},
    {name:'Charcoal Soft',hex:'#2A2A24',v:'--charcoal-soft'}
  ]
};

Object.entries(palettes).forEach(([id, colors]) => {
  const el = document.getElementById(id);
  colors.forEach(c => {
    const border = c.light ? ';border-bottom:1px solid rgba(0,0,0,0.06)' : '';
    el.innerHTML += `<div class="swatch" onclick="copySwatch(this,'${c.v}','${c.hex}')">
      <div class="swatch-color" style="background:${c.hex}${border}"></div>
      <div class="swatch-info"><div class="swatch-name">${c.name}</div><div class="swatch-hex">${c.hex}</div><div class="swatch-var">${c.v}</div></div>
      <div class="copied">Copiado!</div>
    </div>`;
  });
});

// Spacing demo
const spacings = [
  ['space-1','4px',16],['space-2','8px',32],['space-3','12px',48],['space-4','16px',64],
  ['space-5','24px',96],['space-6','32px',128],['space-8','48px',192],
  ['space-10','64px',256],['space-12','80px',320],['space-16','112px',440]
];
const spEl = document.getElementById('spacing-demo');
spacings.forEach(([name,val,w]) => {
  spEl.innerHTML += `<div class="spacing-row"><span class="spacing-label">${name} · ${val}</span><div class="spacing-bar" style="width:${w}px"></div></div>`;
});

// Copy swatch
function copySwatch(el, varName, hex) {
  navigator.clipboard.writeText(hex).catch(()=>{});
  el.classList.add('show-copied');
  setTimeout(() => el.classList.remove('show-copied'), 1200);
}

// Draw synaptic webs between neuron cards
function drawSynapseWeb(gridId, svgId, isDark) {
  const grid = document.getElementById(gridId);
  const svg = document.getElementById(svgId);
  if (!grid || !svg) return;
  const cards = grid.querySelectorAll('.glass-card');
  if (cards.length < 2) return;
  const parent = svg.parentElement;
  const pr = parent.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${pr.width} ${pr.height}`);
  svg.style.width = pr.width + 'px';
  svg.style.height = pr.height + 'px';
  let html = '';
  const axC = isDark ? 'rgba(196,163,90,0.18)' : 'rgba(90,158,111,0.2)';
  const dnC = isDark ? 'rgba(242,239,232,0.08)' : 'rgba(90,158,111,0.1)';
  const ndC = isDark ? 'rgba(196,163,90,0.45)' : 'rgba(196,163,90,0.4)';
  const centers = Array.from(cards).map(c => {
    const r = c.getBoundingClientRect();
    return { x: r.left-pr.left+r.width/2, y: r.top-pr.top+r.height/2, w: r.width/2, h: r.height/2 };
  });
  const done = new Set();
  centers.forEach((a,i) => {
    const sorted = centers.map((b,j)=>({j,d:Math.hypot(b.x-a.x,b.y-a.y)})).filter(x=>x.j!==i).sort((x,y)=>x.d-y.d);
    for(let k=0;k<Math.min(2,sorted.length);k++){
      const key=[Math.min(i,sorted[k].j),Math.max(i,sorted[k].j)].join('-');
      if(done.has(key))continue;done.add(key);
      const b=centers[sorted[k].j];
      const angle=Math.atan2(b.y-a.y,b.x-a.x);
      const x1=a.x+Math.cos(angle)*a.w*0.85,y1=a.y+Math.sin(angle)*a.h*0.85;
      const x2=b.x-Math.cos(angle)*b.w*0.85,y2=b.y-Math.sin(angle)*b.h*0.85;
      const mx=(x1+x2)/2,my=(y1+y2)/2,off=(Math.random()-0.5)*30;
      html+=`<path d="M ${x1},${y1} Q ${mx+off},${my+off} ${x2},${y2}" fill="none" stroke="${axC}" stroke-width="1" stroke-dasharray="5 4"/>`;
      for(let d=-1;d<=1;d+=2){const da=angle+d*0.5,dl=10+Math.random()*8;
        html+=`<line x1="${x1}" y1="${y1}" x2="${x1-Math.cos(da)*dl}" y2="${y1-Math.sin(da)*dl}" stroke="${dnC}" stroke-width="0.6"/>`;
      }
      for(let d=-1;d<=1;d+=2){const da=angle+d*0.4,dl=8+Math.random()*6;
        html+=`<line x1="${x2}" y1="${y2}" x2="${x2+Math.cos(da)*dl}" y2="${y2+Math.sin(da)*dl}" stroke="${dnC}" stroke-width="0.5"/>`;
        html+=`<circle cx="${x2+Math.cos(da)*dl}" cy="${y2+Math.sin(da)*dl}" r="1.5" fill="${ndC}"/>`;
      }
      html+=`<circle cx="${mx+off*0.5}" cy="${my+off*0.5}" r="2.5" fill="${ndC}"/>`;
    }
  });
  svg.innerHTML=html;
}
function initWebs(){drawSynapseWeb('neuron-grid','synapse-web',false);drawSynapseWeb('neuron-grid-dark','synapse-web-dark',true)}
window.addEventListener('load',()=>setTimeout(initWebs,400));
window.addEventListener('resize',initWebs);
</script>
</body>
</html>
