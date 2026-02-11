<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rafael — Brand Identity v5.0</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Noto+Naskh+Arabic:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#040c04;--g1:#d4eeba;--g2:#b5d98c;--g3:#7ab648;--g4:#3d7a2e;--g5:#1e4d1a;--gold:#c4a35a;--gl:#e0c97f;--gp:#f0e4c4;--bone:#f2efe8;--parch:#ddd8ce;--warm:#9a9284;--ocean:#5a8a8a}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--bone);overflow-x:hidden;font-weight:300;line-height:1.85;font-size:15px}
::selection{background:rgba(196,163,90,.2)}
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:relative;overflow:hidden;padding:2rem}
.hero-fluid{position:absolute;inset:0;background:radial-gradient(ellipse 50% 45% at 50% 48%,rgba(90,138,138,.06),transparent 60%),radial-gradient(ellipse 35% 30% at 35% 55%,rgba(122,182,72,.05),transparent 50%),radial-gradient(ellipse 25% 25% at 65% 40%,rgba(196,163,90,.03),transparent 45%);animation:fluid 15s ease-in-out infinite alternate}
@keyframes fluid{0%{opacity:.5;transform:scale(1)}100%{opacity:1;transform:scale(1.03)}}
.hero-ns{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:min(420px,70vw);opacity:.03;pointer-events:none}
.hero-c{position:relative;z-index:2;max-width:750px}
.hero h1{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(3rem,7.5vw,6rem);letter-spacing:.22em;background:linear-gradient(135deg,var(--gl) 20%,var(--g2) 50%,var(--g3) 80%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:rise 2.2s ease-out}
.hero .ar{font-family:'Noto Naskh Arabic',serif;font-size:clamp(.9rem,2vw,1.15rem);color:var(--gold);opacity:.35;direction:rtl;margin:.2rem 0 2rem;animation:rise 2.2s ease-out .15s both}
.hero .verse{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(.95rem,1.8vw,1.2rem);color:var(--g1);opacity:.55;max-width:480px;margin:0 auto;line-height:2;font-style:italic;animation:rise 2.2s ease-out .4s both}
@keyframes rise{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:translateY(0)}}
.cue{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);width:1px;height:45px;background:linear-gradient(var(--gold),transparent);opacity:.15;animation:cueP 3s ease-in-out infinite}
@keyframes cueP{0%,100%{opacity:.1}50%{opacity:.4}}
section{padding:clamp(4rem,8vw,7rem) 2rem;max-width:1140px;margin:0 auto}
.lab{font-size:.58rem;letter-spacing:.55em;text-transform:uppercase;color:var(--gold);opacity:.45;margin-bottom:.8rem}
h2{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(1.7rem,3.8vw,2.8rem);color:var(--g2);line-height:1.25;margin-bottom:1.2rem}
h3{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:1.15rem;color:var(--gl);margin-bottom:.5rem}
p{color:var(--parch);opacity:.75;max-width:680px;margin-bottom:.9rem;font-size:.88rem}
.dv{width:35px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:0 auto;opacity:.2}
.principle{text-align:center;padding:5rem 2rem}
.principle blockquote{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(1.05rem,2.2vw,1.45rem);line-height:2.1;color:var(--g1);max-width:600px;margin:0 auto;opacity:.65}
.principle blockquote em{font-style:normal;color:var(--gl)}
.principle .attr{font-size:.6rem;letter-spacing:.35em;color:var(--warm);margin-top:1.2rem;text-transform:uppercase;opacity:.35}
.logo-sec{text-align:center;position:relative;padding-bottom:3rem}
.logo-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:300px;height:420px;background:radial-gradient(ellipse,rgba(196,163,90,.06),rgba(122,182,72,.03) 45%,transparent 70%);filter:blur(45px);pointer-events:none}
.logo-sec>svg{max-width:340px;margin:2rem auto;display:block;position:relative;z-index:2}
.d{stroke-dasharray:2000;stroke-dashoffset:2000;animation:dr 4.5s ease-out forwards}
.d1{animation-delay:.2s}.d2{animation-delay:.4s}.d3{animation-delay:.6s}.d4{animation-delay:.8s}.d5{animation-delay:1s}.d6{animation-delay:1.3s}.d7{animation-delay:1.6s}
@keyframes dr{to{stroke-dashoffset:0}}
.gp{animation:gPulse 5s ease-in-out infinite}
@keyframes gPulse{0%,100%{opacity:.15}50%{opacity:.45}}
.logo-vars{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin:3rem 0}
.lv{background:rgba(122,182,72,.025);border:1px solid rgba(122,182,72,.06);border-radius:14px;padding:2rem;text-align:center;transition:all .4s}
.lv:hover{border-color:rgba(196,163,90,.2);transform:translateY(-3px)}
.lv svg{width:100%;max-width:180px;height:200px;margin:0 auto 1rem;display:block}
.lv h4{font-family:'Cormorant Garamond',serif;font-size:.95rem;color:var(--g2);margin-bottom:.2rem}
.lv p{font-size:.7rem;color:var(--warm);margin:0 auto;max-width:200px;text-align:center}
.env-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin:3rem 0}
.env-block{background:rgba(122,182,72,.02);border:1px solid rgba(122,182,72,.06);border-radius:14px;padding:1.8rem}
.env-block h3{margin-bottom:.6rem}
.env-block p{font-size:.8rem}
.spec{font-size:.68rem;color:var(--ocean);background:rgba(90,138,138,.08);padding:.25rem .5rem;border-radius:4px;display:inline-block;margin:.12rem .08rem}
.el-row{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin:3rem 0;border:1px solid rgba(196,163,90,.06);border-radius:14px;overflow:hidden}
.el{padding:2rem 1.2rem;border-right:1px solid rgba(196,163,90,.04);text-align:center;transition:background .5s}
.el:last-child{border-right:none}
.el:hover{background:rgba(122,182,72,.03)}
.el .sym{font-size:1.5rem;margin-bottom:.7rem;opacity:.35}
.el h4{font-family:'Cormorant Garamond',serif;font-size:1rem;color:var(--bone);margin-bottom:.15rem}
.el .act{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:.85rem;color:var(--g2);opacity:.55;margin-bottom:.4rem}
.el p{font-size:.65rem;color:var(--warm);max-width:165px;margin:0 auto;text-align:center}
.mtable{width:100%;border-collapse:collapse;margin:2rem 0;font-size:.76rem}
.mtable thead th{font-weight:500;font-size:.52rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);padding:.6rem .4rem;text-align:left;border-bottom:1px solid rgba(196,163,90,.12);opacity:.7}
.mtable td{padding:.5rem .4rem;border-bottom:1px solid rgba(122,182,72,.04);color:var(--parch);opacity:.8;vertical-align:top}
.mtable tr:hover{background:rgba(122,182,72,.02)}
.tag{display:inline-block;font-size:.52rem;padding:.1rem .3rem;border-radius:3px;margin:.08rem}
.tg{background:rgba(122,182,72,.1);color:var(--g2)}.tl{background:rgba(90,138,138,.1);color:var(--ocean)}.tn{background:rgba(196,163,90,.1);color:var(--gl)}
.strip{display:flex;gap:0;border-radius:10px;overflow:hidden;height:90px;margin:1rem 0}
.sw{flex:1;display:flex;flex-direction:column;justify-content:flex-end;padding:.4rem;transition:flex .5s;cursor:pointer}
.sw:hover{flex:1.5}
.sw .n{font-family:'Cormorant Garamond',serif;font-size:.65rem;color:var(--bone);opacity:0;transition:opacity .4s;text-shadow:0 1px 4px rgba(0,0,0,.5)}
.sw .h{font-size:.42rem;color:rgba(255,255,255,.4);opacity:0;transition:opacity .4s}
.sw:hover .n,.sw:hover .h{opacity:1}
.chips{display:grid;grid-template-columns:repeat(auto-fit,minmax(85px,1fr));gap:.4rem;margin:.8rem 0}
.chip{height:44px;border-radius:6px;display:flex;flex-direction:column;justify-content:flex-end;padding:.35rem .45rem;border:1px solid rgba(255,255,255,.03)}
.chip span:first-child{font-family:'Cormorant Garamond',serif;font-size:.6rem;color:var(--bone);text-shadow:0 1px 3px rgba(0,0,0,.4)}
.chip span:last-child{font-size:.42rem;color:rgba(255,255,255,.3)}
.typo{margin:3rem 0;padding:1.8rem;background:rgba(122,182,72,.02);border-radius:14px;border:1px solid rgba(122,182,72,.05)}
.td{font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(1.6rem,3.5vw,2.8rem);color:var(--g2);line-height:1.2;margin-bottom:1rem}
.ta{font-family:'Noto Naskh Arabic',serif;font-size:clamp(1.2rem,2.3vw,1.7rem);color:var(--gold);direction:rtl;opacity:.45;margin-bottom:1rem;line-height:1.5}
.tb{font-family:'DM Sans',sans-serif;font-weight:300;font-size:.82rem;color:var(--parch);max-width:500px;opacity:.6;line-height:1.9}
.glass-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.7rem;margin:3rem 0}
.gc{height:200px;border-radius:14px;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;padding:1rem;transition:transform .5s,box-shadow .5s}
.gc:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.3)}
.gc::before{content:'';position:absolute;top:-30%;left:-30%;width:160%;height:160%;background:radial-gradient(circle at 30% 30%,rgba(212,238,186,.04),transparent 50%);pointer-events:none}
.gc .gt{font-family:'Cormorant Garamond',serif;font-size:.9rem;color:var(--bone);position:relative;z-index:2}
.gc .gd{font-size:.58rem;color:rgba(255,255,255,.3);position:relative;z-index:2;margin-top:.1rem}
.br{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:0;margin:3rem 0;border:1px solid rgba(196,163,90,.06);border-radius:14px;overflow:hidden}
.bc{padding:1.6rem 1.2rem;border-right:1px solid rgba(196,163,90,.03);border-bottom:1px solid rgba(196,163,90,.03);transition:background .4s}
.bc:hover{background:rgba(122,182,72,.025)}
.bc h4{font-family:'Cormorant Garamond',serif;font-size:.9rem;color:var(--g2);margin-bottom:.2rem}
.bc p{font-size:.68rem;color:var(--warm);margin:0}
.footer{text-align:center;padding:5rem 2rem 6rem;opacity:.25}
.footer .f1{font-family:'Noto Naskh Arabic',serif;font-size:1.1rem;color:var(--gold);direction:rtl}
.footer .f2{font-family:'Cormorant Garamond',serif;font-size:.9rem;color:var(--g2);font-style:italic;margin-top:.3rem}
.footer .f3{font-size:.42rem;letter-spacing:.5em;text-transform:uppercase;color:var(--warm);margin-top:.7rem}
@media(max-width:900px){.env-grid,.logo-vars{grid-template-columns:1fr}.el-row{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.el-row{grid-template-columns:1fr}.strip{flex-direction:column;height:auto}.sw{height:38px}.sw .n,.sw .h{opacity:1}}
body::after{content:'';position:fixed;inset:0;opacity:.01;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");pointer-events:none;z-index:9999}
</style>
</head>
<body>

<!-- HERO -->
<section class="hero">
<div class="hero-fluid"></div>
<svg class="hero-ns" viewBox="0 0 300 550" fill="none"><g stroke="var(--g2)" stroke-linecap="round" opacity=".7"><path d="M150,35 L150,480" stroke-width="2"/><path d="M150,35 Q125,18 88,8" stroke-width="1"/><path d="M150,35 Q175,18 212,8" stroke-width="1"/><path d="M150,35 Q138,12 118,2" stroke-width=".7"/><path d="M150,35 Q162,12 182,2" stroke-width=".7"/><path d="M150,70 Q108,60 50,58" stroke-width="1"/><path d="M150,70 Q192,60 250,58" stroke-width="1"/><path d="M150,100 Q92,88 25,108 Q10,135 8,178 Q10,218 22,255 Q32,280 38,300" stroke-width="1.2"/><path d="M150,100 Q208,88 275,108 Q290,135 292,178 Q290,218 278,255 Q268,280 262,300" stroke-width="1.2"/><path d="M150,125 Q115,120 78,125" stroke-width=".5"/><path d="M150,125 Q185,120 222,125" stroke-width=".5"/><path d="M150,150 Q118,145 85,150" stroke-width=".5"/><path d="M150,150 Q182,145 215,150" stroke-width=".5"/><path d="M150,175 Q120,170 90,175" stroke-width=".5"/><path d="M150,175 Q180,170 210,175" stroke-width=".5"/><path d="M150,200 Q122,195 95,200" stroke-width=".5"/><path d="M150,200 Q178,195 205,200" stroke-width=".5"/><path d="M150,290 Q115,282 68,295" stroke-width=".7"/><path d="M150,290 Q185,282 232,295" stroke-width=".7"/><path d="M150,350 Q112,365 80,410 Q60,455 48,505" stroke-width="1.1"/><path d="M150,350 Q188,365 220,410 Q240,455 252,505" stroke-width="1.1"/></g></svg>
<div class="hero-c">
<h1>RAFAEL</h1>
<div class="ar">رفائيل · רְפָאֵל</div>
<div class="verse">Power sings as it flows,<br>electrifies the organs of sensing,<br>becomes <em style="color:var(--ocean)">liquid light</em>,<br>nourishes your entire being.</div>
</div>
<div class="cue"></div>
</section>

<!-- PRINCIPLE -->
<section class="principle">
<div class="lab">Princípio Fundador</div>
<blockquote>O corpo humano é 70% água. O som viaja pela água.<br>O sistema nervoso está <em>imerso</em> nessa água.<br>Quando a tigela toca, a vibração encontra o líquido,<br>se propaga como onda, e alcança cada nervo <em>por dentro</em>.<br><br>O som reconstrói o sistema nervoso.</blockquote>
<div class="attr">Princípio Rafael · Sound Healing</div>
</section>
<div class="dv"></div>

<!-- LOGO -->
<section class="logo-sec">
<div class="lab">01 — Logo: O Corpo Luminoso</div>
<h2>Sistema nervoso como identidade</h2>
<p style="max-width:560px;margin:0 auto 1rem">Três referências sobrepostas: a anatomia do sistema nervoso (Dr. Weaver, 1888), o sistema radicular do Allium montanum, e a arte dourada de nervura pinnata com campo de prana. Uma única forma que é simultaneamente nervo, raiz e folha.</p>
<div class="logo-glow"></div>
<svg viewBox="0 0 280 420" fill="none">
<path d="M140,400 Q140,280 140,170 Q140,95 140,25" stroke="var(--gl)" stroke-width="2" stroke-linecap="round" class="d" opacity=".65"/>
<path d="M140,25 Q118,10 85,4" stroke="var(--g2)" stroke-width="1" stroke-linecap="round" class="d d1" opacity=".45"/>
<path d="M140,25 Q162,10 195,4" stroke="var(--g2)" stroke-width="1" stroke-linecap="round" class="d d1" opacity=".45"/>
<path d="M140,25 Q128,6 108,0" stroke="var(--g2)" stroke-width=".7" stroke-linecap="round" class="d d1" opacity=".3"/>
<path d="M140,25 Q152,6 172,0" stroke="var(--g2)" stroke-width=".7" stroke-linecap="round" class="d d1" opacity=".3"/>
<path d="M140,25 Q140,8 140,0" stroke="var(--g2)" stroke-width=".6" stroke-linecap="round" class="d d1" opacity=".25"/>
<path d="M140,55 Q100,46 42,48" stroke="var(--g2)" stroke-width=".9" stroke-linecap="round" class="d d2" opacity=".38"/>
<path d="M140,55 Q180,46 238,48" stroke="var(--g2)" stroke-width=".9" stroke-linecap="round" class="d d2" opacity=".38"/>
<path d="M140,82 Q85,70 22,92 Q8,118 6,160 Q8,198 18,232 Q28,258 35,275" stroke="var(--g2)" stroke-width="1.1" stroke-linecap="round" class="d d2" opacity=".32"/>
<path d="M140,82 Q195,70 258,92 Q272,118 274,160 Q272,198 262,232 Q252,258 245,275" stroke="var(--g2)" stroke-width="1.1" stroke-linecap="round" class="d d2" opacity=".32"/>
<path d="M22,115 Q15,140 12,168" stroke="var(--g2)" stroke-width=".35" stroke-linecap="round" class="d d3" opacity=".15"/>
<path d="M258,115 Q265,140 268,168" stroke="var(--g2)" stroke-width=".35" stroke-linecap="round" class="d d3" opacity=".15"/>
<path d="M140,108 Q112,104 75,108" stroke="var(--g2)" stroke-width=".45" stroke-linecap="round" class="d d3" opacity=".18"/>
<path d="M140,108 Q168,104 205,108" stroke="var(--g2)" stroke-width=".45" stroke-linecap="round" class="d d3" opacity=".18"/>
<path d="M140,132 Q115,128 82,132" stroke="var(--g2)" stroke-width=".45" stroke-linecap="round" class="d d3" opacity=".16"/>
<path d="M140,132 Q165,128 198,132" stroke="var(--g2)" stroke-width=".45" stroke-linecap="round" class="d d3" opacity=".16"/>
<path d="M140,156 Q118,152 88,156" stroke="var(--g2)" stroke-width=".45" stroke-linecap="round" class="d d4" opacity=".14"/>
<path d="M140,156 Q162,152 192,156" stroke="var(--g2)" stroke-width=".45" stroke-linecap="round" class="d d4" opacity=".14"/>
<path d="M140,180 Q120,176 92,180" stroke="var(--g2)" stroke-width=".4" stroke-linecap="round" class="d d4" opacity=".12"/>
<path d="M140,180 Q160,176 188,180" stroke="var(--g2)" stroke-width=".4" stroke-linecap="round" class="d d4" opacity=".12"/>
<path d="M140,204 Q122,200 96,204" stroke="var(--g2)" stroke-width=".4" stroke-linecap="round" class="d d5" opacity=".12"/>
<path d="M140,204 Q158,200 184,204" stroke="var(--g2)" stroke-width=".4" stroke-linecap="round" class="d d5" opacity=".12"/>
<path d="M140,265 Q110,258 62,270" stroke="var(--g2)" stroke-width=".6" stroke-linecap="round" class="d d6" opacity=".2"/>
<path d="M140,265 Q170,258 218,270" stroke="var(--g2)" stroke-width=".6" stroke-linecap="round" class="d d6" opacity=".2"/>
<path d="M140,320 Q108,335 78,378 Q58,418 45,460" stroke="var(--g2)" stroke-width="1" stroke-linecap="round" class="d d7" opacity=".28"/>
<path d="M140,320 Q172,335 202,378 Q222,418 235,460" stroke="var(--g2)" stroke-width="1" stroke-linecap="round" class="d d7" opacity=".28"/>
<path d="M78,378 Q65,400 55,425" stroke="var(--g2)" stroke-width=".35" stroke-linecap="round" class="d d7" opacity=".12"/>
<path d="M202,378 Q215,400 225,425" stroke="var(--g2)" stroke-width=".35" stroke-linecap="round" class="d d7" opacity=".12"/>
<circle cx="140" cy="25" r="3.5" fill="var(--gold)" class="gp" opacity=".3"/>
<circle cx="140" cy="55" r="2.5" fill="var(--gold)" class="gp" opacity=".2" style="animation-delay:.7s"/>
<circle cx="140" cy="82" r="2.5" fill="var(--gold)" class="gp" opacity=".18" style="animation-delay:1.4s"/>
<circle cx="140" cy="145" r="2.5" fill="var(--gold)" class="gp" opacity=".18" style="animation-delay:2.1s"/>
<circle cx="140" cy="200" r="2.5" fill="var(--gold)" class="gp" opacity=".2" style="animation-delay:2.8s"/>
<circle cx="140" cy="265" r="2.5" fill="var(--gold)" class="gp" opacity=".18" style="animation-delay:3.5s"/>
<circle cx="140" cy="370" r="2.5" fill="var(--gold)" class="gp" opacity=".2" style="animation-delay:4.2s"/>
<circle cx="140" cy="145" r="25" stroke="var(--ocean)" stroke-width=".3" opacity=".06"/>
<circle cx="140" cy="145" r="50" stroke="var(--ocean)" stroke-width=".2" opacity=".04"/>
<circle cx="140" cy="145" r="80" stroke="var(--ocean)" stroke-width=".15" opacity=".025"/>
<circle cx="30" cy="105" r=".7" fill="var(--gp)" opacity=".1"/><circle cx="18" cy="148" r=".5" fill="var(--gp)" opacity=".08"/><circle cx="250" cy="105" r=".7" fill="var(--gp)" opacity=".1"/><circle cx="262" cy="148" r=".5" fill="var(--gp)" opacity=".08"/>
</svg>

<h3 style="text-align:center;margin-top:3rem">Variações</h3>
<div class="logo-vars">
<div class="lv">
<svg viewBox="0 0 180 200" fill="none">
<path d="M90,190 L90,20" stroke="var(--gl)" stroke-width="1.8" stroke-linecap="round" opacity=".6"/>
<path d="M90,20 Q70,8 45,3" stroke="var(--g2)" stroke-width=".8" stroke-linecap="round" opacity=".4"/>
<path d="M90,20 Q110,8 135,3" stroke="var(--g2)" stroke-width=".8" stroke-linecap="round" opacity=".4"/>
<path d="M90,45 Q55,38 15,42" stroke="var(--g2)" stroke-width=".7" stroke-linecap="round" opacity=".3"/>
<path d="M90,45 Q125,38 165,42" stroke="var(--g2)" stroke-width=".7" stroke-linecap="round" opacity=".3"/>
<path d="M90,70 Q50,60 8,78 Q2,100 3,130 Q8,155 15,170" stroke="var(--g2)" stroke-width=".9" stroke-linecap="round" opacity=".28"/>
<path d="M90,70 Q130,60 172,78 Q178,100 177,130 Q172,155 165,170" stroke="var(--g2)" stroke-width=".9" stroke-linecap="round" opacity=".28"/>
<path d="M90,90 Q68,86 48,90" stroke="var(--g2)" stroke-width=".35" stroke-linecap="round" opacity=".15"/>
<path d="M90,90 Q112,86 132,90" stroke="var(--g2)" stroke-width=".35" stroke-linecap="round" opacity=".15"/>
<circle cx="90" cy="20" r="2.5" fill="var(--gold)" opacity=".25"/>
<circle cx="90" cy="70" r="2" fill="var(--gold)" opacity=".18"/>
</svg>
<h4>Compacto</h4>
<p>Torso. Favicon, ícone de app, selo.</p>
</div>
<div class="lv">
<svg viewBox="0 0 180 200" fill="none">
<circle cx="90" cy="100" r="3" fill="var(--gold)" opacity=".3"/>
<path d="M90,100 L90,10" stroke="var(--g2)" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>
<path d="M90,100 L90,190" stroke="var(--g2)" stroke-width="1.2" stroke-linecap="round" opacity=".5"/>
<path d="M90,100 Q60,70 30,30" stroke="var(--g2)" stroke-width=".8" stroke-linecap="round" opacity=".35"/>
<path d="M90,100 Q120,70 150,30" stroke="var(--g2)" stroke-width=".8" stroke-linecap="round" opacity=".35"/>
<path d="M90,100 Q55,85 10,80" stroke="var(--g2)" stroke-width=".7" stroke-linecap="round" opacity=".3"/>
<path d="M90,100 Q125,85 170,80" stroke="var(--g2)" stroke-width=".7" stroke-linecap="round" opacity=".3"/>
<path d="M90,100 Q55,115 10,120" stroke="var(--g2)" stroke-width=".7" stroke-linecap="round" opacity=".3"/>
<path d="M90,100 Q125,115 170,120" stroke="var(--g2)" stroke-width=".7" stroke-linecap="round" opacity=".3"/>
<path d="M90,100 Q60,130 30,170" stroke="var(--g2)" stroke-width=".8" stroke-linecap="round" opacity=".35"/>
<path d="M90,100 Q120,130 150,170" stroke="var(--g2)" stroke-width=".8" stroke-linecap="round" opacity=".35"/>
<circle cx="90" cy="100" r="20" stroke="var(--ocean)" stroke-width=".3" opacity=".08"/>
<circle cx="90" cy="100" r="45" stroke="var(--ocean)" stroke-width=".2" opacity=".05"/>
</svg>
<h4>Radial</h4>
<p>Ondas de som expandindo. Timer, loading, pulso.</p>
</div>
<div class="lv">
<svg viewBox="0 0 180 200" fill="none">
<path d="M90,95 L90,15" stroke="var(--g2)" stroke-width="1" stroke-linecap="round" opacity=".4"/>
<path d="M90,15 Q85,5 80,0" stroke="var(--g2)" stroke-width=".5" stroke-linecap="round" opacity=".25"/>
<path d="M90,15 Q95,5 100,0" stroke="var(--g2)" stroke-width=".5" stroke-linecap="round" opacity=".25"/>
<line x1="20" y1="95" x2="160" y2="95" stroke="var(--warm)" stroke-width=".3" opacity=".15"/>
<path d="M90,95 Q75,115 55,135 Q40,150 25,175 Q18,190 20,198" stroke="var(--g2)" stroke-width=".8" stroke-linecap="round" opacity=".3"/>
<path d="M90,95 Q105,115 125,135 Q140,150 155,175 Q162,190 160,198" stroke="var(--g2)" stroke-width=".8" stroke-linecap="round" opacity=".3"/>
<path d="M90,95 Q80,120 65,150 Q55,170 50,190" stroke="var(--g2)" stroke-width=".6" stroke-linecap="round" opacity=".25"/>
<path d="M90,95 Q100,120 115,150 Q125,170 130,190" stroke="var(--g2)" stroke-width=".6" stroke-linecap="round" opacity=".25"/>
<path d="M90,95 L90,198" stroke="var(--g2)" stroke-width=".7" stroke-linecap="round" opacity=".25"/>
<path d="M55,135 Q42,140 30,148" stroke="var(--g2)" stroke-width=".3" stroke-linecap="round" opacity=".12"/>
<path d="M125,135 Q138,140 150,148" stroke="var(--g2)" stroke-width=".3" stroke-linecap="round" opacity=".12"/>
<ellipse cx="90" cy="95" rx="8" ry="5" stroke="var(--gold)" stroke-width=".5" opacity=".15"/>
</svg>
<h4>Raiz</h4>
<p>Allium montanum. O invisível sustenta o visível.</p>
</div>
</div>
</section>
<div class="dv"></div>

<!-- AMBIENTE NERVOSO -->
<section>
<div class="lab">02 — Ambiente Nervoso: Specs de Design</div>
<h2>Você está dentro do sistema nervoso</h2>
<p>O ambiente digital não representa o sistema nervoso — ele <strong style="color:var(--g2)">é</strong> o sistema nervoso. Cada superfície é membrana. O fundo é fluido cefalorraquidiano. O scroll é impulso. O toque é sinal.</p>
<div class="env-grid">
<div class="env-block">
<h3>Camada 1: O Meio Líquido</h3>
<p>O background nunca é cor sólida. É uma superfície aquosa viva — simulando o fluido que banha o sistema nervoso. Quando o usuário scrolla, o fluido reage. Quando toca, ondulações concêntricas se propagam como som na água do corpo.</p>
<p style="margin-top:.5rem;font-size:.7rem;color:var(--ocean)"><strong>Specs técnicas:</strong></p>
<p style="font-size:.7rem">Shader de Perlin noise animado em tons Liquid Glass. Distorção sutil no scroll (parallax fluido). Ondulações radiais no clique/toque (ripple shader). Gradiente de cor que muda com scroll — mais verde em cima, mais oceano no meio, mais escuro embaixo.</p>
<div style="margin-top:.5rem"><span class="spec">Three.js</span><span class="spec">GLSL shaders</span><span class="spec">curtains.js</span><span class="spec">Perlin noise</span><span class="spec">ripple on touch</span><span class="spec">60fps</span></div>
</div>
<div class="env-block">
<h3>Camada 2: Estrutura Nervosa</h3>
<p>Os grids, layouts, linhas de navegação e separadores seguem a lógica da venação. A nervura central pinnata é o eixo vertical do layout. As secundárias são caminhos laterais. As areolas são containers de conteúdo.</p>
<p style="margin-top:.5rem;font-size:.7rem;color:var(--ocean)"><strong>Specs técnicas:</strong></p>
<p style="font-size:.7rem">SVG nervuras como linhas de grid (não retangulares). Interseções de nervuras como ancoragem de elementos. Menu que segue o eixo central com ramos laterais. Transições de página = impulso nervoso propagando do centro para extremidades.</p>
<div style="margin-top:.5rem"><span class="spec">CSS Grid orgânico</span><span class="spec">SVG inline animado</span><span class="spec">Intersection Observer</span><span class="spec">draw-on scroll</span></div>
</div>
<div class="env-block">
<h3>Camada 3: Conteúdo Pulsa</h3>
<p>Nada é inerte. Textos têm micro-animações de opacidade que simulam respiração. Cards glass pulsam como nós nervosos. Quando um elemento entra no viewport, ele "acende" como impulso nervoso — não faz fade genérico.</p>
<p style="margin-top:.5rem;font-size:.7rem;color:var(--ocean)"><strong>Specs técnicas:</strong></p>
<p style="font-size:.7rem">Sequência de carregamento: começa num ponto central, se espalha para extremidades. Glow pulsante nos nós (chakra points). Opacidade que respira (4-6s ciclo). Scroll reveal = propagação nervosa.</p>
<div style="margin-top:.5rem"><span class="spec">GSAP ScrollTrigger</span><span class="spec">Lottie</span><span class="spec">CSS animation</span><span class="spec">requestAnimationFrame</span></div>
</div>
<div class="env-block">
<h3>Camada 4: Som como Input</h3>
<p>No app: o microfone capta o ambiente (ou a tigela) e o background reage em tempo real — as ondulações respondem à frequência. A interface responde ao som como o corpo responde ao som.</p>
<p style="margin-top:.5rem;font-size:.7rem;color:var(--ocean)"><strong>Specs técnicas:</strong></p>
<p style="font-size:.7rem">Web Audio API → analyser node → FFT data → shader uniforms. Graves = ondulações largas e lentas. Agudos = micro-tremores na superfície. Silêncio = superfície calma. O visual é literalmente água do corpo respondendo ao som.</p>
<div style="margin-top:.5rem"><span class="spec">Web Audio API</span><span class="spec">FFT analysis</span><span class="spec">Audio-reactive shaders</span><span class="spec">mic input</span></div>
</div>
</div>
</section>
<div class="dv"></div>

<!-- UI = ANATOMIA -->
<section>
<div class="lab">03 — UI = Anatomia</div>
<h2>Cada componente é um órgão nervoso</h2>
<table class="mtable">
<thead><tr><th>Componente UI</th><th>Equivalente Nervoso</th><th>Equivalente Botânico</th><th>Comportamento</th></tr></thead>
<tbody>
<tr><td>Background</td><td><span class="tag tl">Fluido cefalorraquidiano</span></td><td><span class="tag tg">Membrana da folha</span></td><td>Superfície líquida WebGL, reativa ao scroll e toque</td></tr>
<tr><td>Layout vertical</td><td><span class="tag tn">Coluna vertebral / Medula</span></td><td><span class="tag tg">Nervura central pinnata</span></td><td>Eixo principal do scroll, tudo se ramifica dele</td></tr>
<tr><td>Menu / Nav</td><td><span class="tag tn">Plexo cervical</span></td><td><span class="tag tg">Ramificações superiores</span></td><td>Nervos que saem do topo da coluna para os lados</td></tr>
<tr><td>Cards / Containers</td><td><span class="tag tn">Gânglios nervosos</span></td><td><span class="tag tg">Areolas foliares</span></td><td>Nós que pulsam, vidro líquido, contêm informação</td></tr>
<tr><td>Separadores</td><td><span class="tag tn">Nervos intercostais</span></td><td><span class="tag tg">Nervuras secundárias</span></td><td>Linhas orgânicas que ramificam do eixo central</td></tr>
<tr><td>Botões / CTAs</td><td><span class="tag tn">Sinapses</span></td><td><span class="tag tg">Nós de ramificação</span></td><td>Pontos de decisão, glow ao hover, ripple ao click</td></tr>
<tr><td>Loading</td><td><span class="tag tn">Impulso percorrendo nervo</span></td><td><span class="tag tg">Seiva percorrendo nervura</span></td><td>Draw-on animation do centro para extremidades</td></tr>
<tr><td>Timer de sessão</td><td><span class="tag tl">Ondas no fluido corporal</span></td><td><span class="tag tg">Anéis concêntricos</span></td><td>Círculos expandindo do centro, pulsando</td></tr>
<tr><td>Scroll reveal</td><td><span class="tag tn">Propagação nervosa</span></td><td><span class="tag tg">Folha se abrindo</span></td><td>Acende do centro → extremidades, não fade genérico</td></tr>
<tr><td>Footer</td><td><span class="tag tn">Raízes / sistema radicular</span></td><td><span class="tag tg">Raízes Allium</span></td><td>Ramificações densas para baixo, ancoragem</td></tr>
</tbody>
</table>
</section>
<div class="dv"></div>

<!-- 4 ELEMENTS -->
<section>
<div class="lab">04 — Framework Elemental</div>
<h2>Quatro forças do som</h2>
<div class="el-row">
<div class="el"><div class="sym">☉</div><h4>The Sun</h4><div class="act">heals, charges, warms</div><p>Frequência do fogo. Calor que dissolve. Carrega o sistema nervoso. Cor: gold.</p></div>
<div class="el"><div class="sym">☽</div><h4>The Moon</h4><div class="act">connects, manifests, unlocks</div><p>Frequência da água interna. Subconsciente. Ritmo do corpo sutil. Cor: ghost.</p></div>
<div class="el"><div class="sym">〰</div><h4>The Ocean</h4><div class="act">cleanses, refreshes, opens</div><p>Ondulação que limpa. Maré que abre centros de energia. Cor: ocean.</p></div>
<div class="el"><div class="sym">⌇</div><h4>The Forest</h4><div class="act">grounds, balances, stabilizes</div><p>Raiz. Aterramento. Som grave que ancora na terra. Cor: deep.</p></div>
</div>
</section>
<div class="dv"></div>

<!-- PALETTE -->
<section>
<div class="lab">05 — Paleta</div>
<h2>Liquid Glass + Ouro + Oceano</h2>
<h3>Primária — Liquid Glass</h3>
<div class="strip">
<div class="sw" style="background:#d4eeba"><span class="n">Ghost</span><span class="h">#D4EEBA</span></div>
<div class="sw" style="background:#b5d98c"><span class="n">Light</span><span class="h">#B5D98C</span></div>
<div class="sw" style="background:#7ab648"><span class="n">Core</span><span class="h">#7AB648</span></div>
<div class="sw" style="background:#3d7a2e"><span class="n">Deep</span><span class="h">#3D7A2E</span></div>
<div class="sw" style="background:#1e4d1a"><span class="n">Shadow</span><span class="h">#1E4D1A</span></div>
<div class="sw" style="background:#0b1f0a"><span class="n">Night</span><span class="h">#0B1F0A</span></div>
</div>
<h3 style="margin-top:1rem">Acentos</h3>
<div class="chips">
<div class="chip" style="background:#c4a35a"><span>Gold</span><span>#C4A35A</span></div>
<div class="chip" style="background:#e0c97f"><span>Gold Light</span><span>#E0C97F</span></div>
<div class="chip" style="background:#5a8a8a"><span>Ocean</span><span>#5A8A8A</span></div>
<div class="chip" style="background:#7aaa9a"><span>Sage Sea</span><span>#7AAA9A</span></div>
<div class="chip" style="background:#2a4a8a"><span>Cobalt</span><span>#2A4A8A</span></div>
<div class="chip" style="background:#f2efe8"><span style="color:#1a1a16">Bone</span><span style="color:rgba(0,0,0,.3)">#F2EFE8</span></div>
<div class="chip" style="background:#1a1a16;border-color:rgba(255,255,255,.06)"><span>Charcoal</span><span>#1A1A16</span></div>
</div>
</section>
<div class="dv"></div>

<!-- TYPE -->
<section>
<div class="lab">06 — Tipografia Trilíngue</div>
<h2>Três escritas, uma respiração</h2>
<div class="typo">
<div style="font-size:.48rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);opacity:.4;margin-bottom:.2rem">Display · Cormorant Garamond Light</div>
<div class="td">O prana canta enquanto flui</div>
<div style="font-size:.48rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);opacity:.4;margin-bottom:.2rem;margin-top:.8rem">Arabic · Noto Naskh Arabic</div>
<div class="ta">الصوت يعيد بناء الجهاز العصبي</div>
<div style="font-size:.48rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);opacity:.4;margin-bottom:.2rem;margin-top:.8rem">Body · DM Sans Light 300</div>
<div class="tb">O som das tigelas percorre o sistema nervoso como a seiva percorre as nervuras de uma folha — encontrando caminhos, restaurando conexões. Becomes liquid light, nourishes your entire being.</div>
</div>
</section>
<div class="dv"></div>

<!-- GLASS CARDS -->
<section>
<div class="lab">07 — Glass Cards: Nós Nervosos</div>
<h2>Cards são gânglios — pulsam, contêm, transmitem</h2>
<p>Cada card é um nó no sistema nervoso da interface. Membrana de vidro líquido. Glow que pulsa. Conteúdo como informação dentro de uma célula nervosa.</p>
<div class="glass-grid">
<div class="gc" style="background:linear-gradient(145deg,rgba(180,217,140,.07),rgba(122,182,72,.03));border:1px solid rgba(180,217,140,.08)"><div class="gt">Sound Bath</div><div class="gd">Sessão individual · 60min</div></div>
<div class="gc" style="background:linear-gradient(150deg,rgba(196,163,90,.05),rgba(61,122,46,.04));border:1px solid rgba(196,163,90,.08)"><div class="gt">☉ Solar</div><div class="gd">Heals, charges, warms</div></div>
<div class="gc" style="background:linear-gradient(155deg,rgba(90,138,138,.06),rgba(61,122,46,.03));border:1px solid rgba(90,138,138,.08)"><div class="gt">〰 Ocean</div><div class="gd">Cleanses, opens centers</div></div>
<div class="gc" style="background:linear-gradient(145deg,rgba(122,182,72,.04),rgba(30,77,26,.06));border:1px solid rgba(122,182,72,.06)"><div class="gt">⌇ Forest</div><div class="gd">Grounds, stabilizes</div></div>
<div class="gc" style="background:linear-gradient(160deg,#040c04,rgba(196,163,90,.03));border:1px solid rgba(196,163,90,.06)"><div class="gt" style="font-family:'Noto Naskh Arabic',serif;direction:rtl;font-size:1.1rem">رفائيل</div><div class="gd">Sound · Prana · Cura</div></div>
</div>
</section>
<div class="dv"></div>

<!-- BRANCHES -->
<section>
<div class="lab">08 — Branches</div>
<h2>Próximos desdobramentos</h2>
<div class="br">
<div class="bc"><h4>📱 App</h4><p>Loading = sistema nervoso draw-on. Timer = ondas concêntricas. Background = fluid shader reativo ao som do microfone. Cards glass como gânglios. 4 categorias = 4 elementos.</p></div>
<div class="bc"><h4>🌐 Website</h4><p>Hero: fluid WebGL + nervous system SVG. Scroll: nervuras crescem conforme desces. Cada seção "acende" como impulso. Footer: sistema radicular denso. Liquid glass em tudo.</p></div>
<div class="bc"><h4>📸 Instagram</h4><p>Templates com nervuras como frame. Stories: overlay areola ghost. Reels: draw-on do sistema nervoso. Texto elemental como copy bank. Bio: رفائيل · Sound Healer.</p></div>
<div class="bc"><h4>✦ Logo Animado</h4><p>Lottie/SVG. Draw-on 4.5s do centro para extremidades. Depois: pontos dourados pulsam nos nós. Versão estática para favicon. 3 variações: full body, compacto, radial.</p></div>
<div class="bc"><h4>🎵 Marca Sonora</h4><p>Tigela Peter Hess como assinatura. Cada elemento com frequência própria. O visual e o sonoro como espelhos — mesma matemática em dois meios.</p></div>
<div class="bc"><h4>◇ Merch / Print</h4><p>Poster A2: sistema nervoso dourado sobre preto. Azulejo Rafael: areola-zillij pattern. Variação "Raiz" para contexto editorial e embalagens.</p></div>
</div>
</section>

<div class="footer">
<p class="f1">الصوت يعيد بناء الجهاز العصبي</p>
<p class="f2">O som reconstrói o sistema nervoso</p>
<p class="f3">Rafael · Semente v5.0 · Lisboa · 2026</p>
</div>

</body>
</html>
