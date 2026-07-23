# Sound Sanctuary — Ciclo de ações para deixar o site pronto

> Análise estética + UI/UX de 2026-07-10. Base: screenshots de todas as páginas (desktop + mobile, tema escuro, locale pt-BR) cruzados com o código. Auth fica para o fim, por pedido.

## O que já está bom (não mexer)

- **Hero cinematográfico** na floresta com o praticante a tocar — abre com o elemento mais característico do mundo do sujeito. Forte.
- **Paleta coesa**: dourado quente + verde-floresta sobre fundo escuro. Identidade própria, não templada.
- **Tipografia serif** de display elegante e consistente (sistema `ds-*`/`journey-*`).
- **Testemunhos como capturas de DM** (Instagram/WhatsApp) — prova social autêntica, escolha de design memorável.
- **Página Sound Healing** ("Som como luz líquida") é a mais forte em narrativa.
- **Responsivo mobile** funciona (hero, cartões empilham, rodapé).

> Nota: o círculo preto com "N" no canto inferior-esquerdo é o indicador de dev-tools do Next.js, **não** é um elemento do site. Ignorar.

---

## Tier 0 — Estratégia de língua (RESOLVIDA 2026-07-11)

**Estratégia:** dois idiomas — **Português** (browsers de Portugal ou Brasil) + **Inglês** (resto do mundo), com deteção automática pelo idioma do browser.

**Estado técnico:** já coberto pelo next-intl. `localeDetection` está ligado por defeito; o matcher encaminha `pt-PT` e `pt-BR` para o locale português e tudo o resto para `en` (defaultLocale). Não é preciso escrever deteção nova.

**Registo decidido: português do Brasil (pt-BR), mantido.** Os portugueses entendem pt-BR sem atrito; o inverso (brasileiro a ler pt-PT) tem mais. Isto torna o código de locale `pt-BR` semanticamente correto — **não renomear**. A deteção de browser já encaminha browsers `pt-PT` para este locale.

**Trabalho que falta (baixo esforço):**
- **T0.1 — Alinhar tudo para pt-BR.** Corrigir o único resquício pt-PT: rodapé "Contacto" → "Contato" (para bater certo com o nav "CONTATO"). Varrer os `messages/*` por outros pt-PT esparsos.
- **T0.2 — Verificar a deteção** com dois testes rápidos: `Accept-Language: pt-PT` → conteúdo pt-BR; `Accept-Language: fr` → conteúdo en.

---

## Tier 1 — Bloqueadores de lançamento

**1. Copy de especificação técnica vazou para produção (Sessões).** Texto interno de design está visível ao visitante:
- `sessionsPage.sub`: _"Disponibilidade e fuso horário aparecem no fluxo de agendamento, não na navegação global."_
- `sessionsPage.decisionSub`: _"Brilho no hover, resposta gentil no clique. Cada botão é uma sinapse."_
→ Reescrever como copy virada ao visitante. Ficheiros: `messages/pt-BR.json`, `messages/en.json`.

**2. Acordeão "O que esperar" (FAQ) com contraste quebrado.** Rende placas **brancas com texto quase invisível** no tema escuro por defeito (o componente `ds-accordion` parece fixar fundo claro). Corrigir para respeitar os tokens do tema. Ficheiros: `design-system/styles/dist/*` (regra `ds-accordion`) + verificar em `src/app/[locale]/sessions/page.tsx`.

**3. Página "Sobre" sem identidade** — o maior buraco para um site *pessoal*. Não tem nome, foto, bio nem formação/credenciais; só texto abstracto. O nome do praticante não aparece em lado nenhum do site. Adicionar: nome, retrato, história curta e formação (Peter Hess, etc.). Ficheiros: `src/app/[locale]/about/page.tsx`, `messages/*`, `public/media/`.

**4. CTA de contacto é um placeholder inconsistente.** "Enviar pedido" abre `mailto:hello@soundsanctuary.com` — domínio falso, enquanto todo o site funila para WhatsApp (`wa.me/message/A4JJZNWV3FSNG1`). Decidir: deep-link WhatsApp (consistente com o resto) **ou** email real. Ficheiro: `src/app/[locale]/contact/page.tsx`.

**5. Verificar o pipeline Convex end-to-end.** Newsletter usa `useMutation(api.subscribers.subscribe)` e portfólio usa `useQuery(api.portfolio.listPublished)` — ambos precisam do Convex ligado. Correr `npx convex dev`, submeter a newsletter e confirmar que grava; confirmar que o deployment está vivo e com dados. (Localmente o portfólio apareceu vazio provavelmente por o Convex não estar a correr.)

**6. Homepage sem `<h1>`.** O hero é a status line animada; o primeiro heading é o `<h2>` "Ofertas Atuais". Falha de SEO/acessibilidade. Adicionar um `<h1>` (pode ser visualmente escondido se o design não quiser título visível no hero). Ficheiro: `src/app/[locale]/page.tsx` / `HeroStatusLine.tsx`.

---

## Tier 2 — Polimento

**7. Portfólio vazio.** A página é um grande vazio. Publicar 3–6 sessões/eventos/retiros reais, **ou** garantir que o empty-state (`ScapesEmpty`) e os skeletons são visíveis no tema escuro. Ficheiros: seed Convex `convex/portfolio.ts`, `src/app/[locale]/portfolio/page.tsx`.

**8. Espaço vertical morto** nas páginas internas (sessões, sound-healing, contacto) — grandes vazios entre secções e o rodapé dão sensação de inacabado. Apertar o ritmo das secções ou adicionar conteúdo de suporte.

**9. Proposta de valor no hero.** "VOCÊ → DEITANDOOO" é um device animado intencional (branch `feat/hero-typewriter`), mas o visitante novo não recebe nome/tagline/o-que-é-isto. Considerar uma linha de apoio discreta (quem + o quê + onde).

**10. Afirmação terapêutica forte.** _"O SOM RECONSTRÓI O SISTEMA NERVOSO"_ (Sound Healing) é uma alegação de saúde — exposição legal/ética em wellness. Suavizar para linguagem experiencial.

**11. Carrossel de testemunhos** — no desktop o 4º cartão fica cortado a meio em repouso. Ajustar scroll-snap/padding.

> **Cobertura ainda não auditada (rever antes de lançar):** locale **EN** e **tema claro** em todas as páginas. Só revi pt-BR + escuro.

---

## Tier 3 — POR ÚLTIMO: Auth / gestão de conteúdo

Não existe camada de auth. Para o praticante gerir portfólio e aprovar testemunhos sem código, é preciso um admin (Convex Auth ou Clerk) + UI mínima de gestão. Alternativa mais leve: manter conteúdo em código/seed por agora e adiar o admin.
_Nota: posso planear/scaffoldar, mas por política não crio contas nem introduzo credenciais — essa parte é feita por ti._

---

## Ordem sugerida de execução

1. **D1** (decisão de língua) → destrava a copy.
2. **Tier 1** items 1, 2, 6 (copy + acordeão + h1 — rápidos e de alto impacto), depois 3 e 4 (identidade + contacto), depois 5 (verificar Convex).
3. **Tier 2** 7–11 (polimento).
4. Rever EN + tema claro.
5. **Tier 3** (auth) por último.
