# Sound Sanctuary — Sessão 2026-07-23/24: ambiente local, bugs, limpeza de git, copy de sessões

## Contexto da sessão

Sessão de trabalho para (1) subir o site localmente e dar feedback de QA, (2)
organizar o repositório (branches/worktrees acumulados de sprints antigos) e
(3) começar o percurso de utilizador para acertar a copy de cada botão/CTA do
site antes do lançamento.

---

## 1. Ambiente local

- `npm run dev` (Next 16.1, porta 3000) e `npx convex dev` (backend Convex
  **local**, `local:local-rapha_bruno-sound_sanctuary`) precisam de correr em
  paralelo — sem o Convex local, portfólio/testemunhos ficam em loading
  infinito (WebSocket em retry constante).
- **Bloqueio para produção identificado, ainda não resolvido:** `.env.local`
  aponta para Convex local. Falta: deployment Convex na cloud + env vars de
  produção (`NEXT_PUBLIC_CONVEX_URL`, `NEXT_PUBLIC_CONVEX_SITE_URL`,
  `NEXT_PUBLIC_SITE_URL`) configuradas onde o site for hospedado.
- **Não tentar de novo:** `turbopack.root` no `next.config.ts` para silenciar
  o aviso de workspace-root — causou uma explosão de ~588 processos
  `postcss.js` neste ambiente. Já documentado em `CLAUDE.md`.

---

## 2. Bugs encontrados e corrigidos (PRs #92–#96, todas mescladas em `main`)

| Bug | Fix | PR |
|---|---|---|
| `<title>` da home duplicado ("Sound Sanctuary \| Sound Sanctuary") | `home.meta.title` passou a ter tagline própria (EN+PT) | #93 |
| Logo sobreposto ao nav entre ~769–1023px | Breakpoint do menu mobile subido de 768px → 1024px (`globals.css` + `SiteHeader.tsx`) | #93 |
| `/sessions` só tinha 2 dos 4 formatos reais de sessão (1:1, Grupo) | Adicionados cards **Ao Vivo** e **Virtual** | #94 |
| "Join Live" (card Grupo) apontava para `/newsletter` | Passou a abrir WhatsApp (`wa.me/message/A4JJZNWV3FSNG1`) | #94 |
| "Cada botão é uma sinapse" — leak de jargão de design ainda vivo em `/sessions` (o mesmo tipo que o `CLAUDE.md` já pedia para evitar) | Removido, subtítulo reescrito | #94 |
| 3 textos diferentes para "1:1" (Book 1:1 / Book a 1:1 / Learn More) | `soundHealingPage.ctaPrimary` alinhado para "Book 1:1" | #94 |
| pt-BR "Saber Mais" (typo) vs "Saiba Mais" | Corrigido | #94 |
| pt-BR footer "Contacto" (grafia PT-PT) | Corrigido para "Contato" (registo pt-BR obrigatório do projeto) | #94 |
| Footer "Free Taster Session" não abria o modal real, só ia para `/contact` | Agora aponta para `/#taster` (âncora na home, com `scroll-margin-top` para não ficar atrás do header fixo) | #94 |
| Footer "Terms" era um 2º link para `/privacy` (não existe página de Termos) | Fundido num único link "Privacy & Terms" | #94 |
| `virtual-session.jpg` usada pela home mas nunca commitada (quebraria em CI/deploy) | Commitada, junto com 3 docs de planeamento/relatório que estavam untracked | #95 |
| `/about` e `/portfolio` sem nenhum CTA de saída | Adicionado bloco "Book 1:1 / See formats" (mesmo padrão do `/sound-healing`) | #96 |
| `/privacy` — decisão deliberada | **Não** recebeu CTA de venda (página legal, não faz sentido empurrar agendamento ali) | #96 |

**Achado, mas não "corrigido" — reclassificado como não-bug:** header fixo a
tapar títulos a meio do scroll é comportamento normal de qualquer header
`position: fixed`, não um defeito de código. Confirmado com medições reais
(bounding rects via JS), não é algo a "arranjar".

---

## 3. Limpeza do Git (feito uma vez, não precisa repetir)

- **69 branches remotos** apagados (todos já com PR merged/closed no GitHub,
  mesmo que `git --merged` não os detectasse por causa de squash-merge).
- **7 worktrees extra** removidos (`.worktrees/audit-sound-sanctuary`,
  `.worktrees/fix-s12-hero-for-whom`, `.worktrees/feat-hero-typewriter`,
  `__wt_architect`, `__wt_qa_release`, `__wt_ui_copy`, `__wt_ui_hero`) — todo
  o conteúdo foi inspecionado antes de apagar; nada tinha valor (ou já estava
  em `main`, ou era código obsoleto/superado por refactors posteriores).
- **PR #91** (`feat/hero-typewriter`, parada há 5 meses) — fechada
  explicitamente (não mesclada), por decisão do utilizador.
- Repo agora só tem `main` local e remoto, sem worktrees extra.
- Projeto segue o modelo `agents/ASYNC_CONTRACT.md`: agente implementa → abre
  PR → humano decide o merge. Seguido em todas as PRs desta sessão.

---

## 4. Levantamento de copy/CTA (o trabalho principal, em curso)

Mapeámos **todos** os botões/CTAs do site (header, home, `/sessions`,
`/sound-healing`, `/contact`, `/newsletter`, footer, `/about`, `/portfolio`,
`/privacy`) — inventário completo ainda disponível no ficheiro de plano
`~/.claude/plans/imperative-crafting-pudding.md` desta máquina, caso precises
de o consultar novamente.

### Taxonomia de sessão adotada (4 formatos reais, cada um com card próprio em `/sessions`)

| Formato | Duração | Fonte da copy |
|---|---|---|
| **Sound Bath (1:1)** | 60 min | Texto original, não alterado |
| **Jornada Sonora em Grupo** | 90 min | Reescrito com texto real das Notas do Mac (pasta "Banho de Som") |
| **Sound Healing Ao Vivo** | **90 min** (confirmado) | Criado + reescrito com base nas Notas ("Banho de Som Online") |
| **Sessão Virtual** | **75 min** (confirmado) | Criado, inspirado no tema "insónia" das Notas (nenhum texto pronto encontrado — protocolos de clientes e técnicas de Kundalini não eram reaproveitáveis) |

### Processo usado para a copy (repetir para o resto do site)
1. Procurei nas Notas do Mac (`osascript`/AppleScript, pasta "Banho de Som",
   "Kundalini Yoga", "Protocolo Insônia") por texto real do Raphael.
2. Descartei tudo o que era **divulgação de evento** (preço, data, lua cheia,
   "VAGAS LIMITADAS", funil de DM do Instagram) ou que usava linguagem que o
   `CLAUDE.md` já proíbe ("cura", "terapêutico", "solução para ansiedade e
   insônia", "sistema nervoso parassimpático").
3. Selecionei só o que descrevia genuinamente **o que é** a experiência.
4. Onde não havia nada aproveitável (Sessão Virtual), escrevi copy original
   inspirada no tema recorrente encontrado, sem citar técnicas de outra
   modalidade (yoga/mantras) nem alegações de saúde.

### Ainda por fazer (lista dada ao utilizador, respostas parciais recebidas)

**Confirmado nesta sessão:**
- Ao Vivo = 90 min ✅
- Sessão Virtual = 75 min ✅
- Email de contacto: manter placeholder `hello@soundsanctuary.com` por agora ✅ (decisão explícita)
- Itens de domínio final, número de WhatsApp e redes sociais: **ficam para depois**, o utilizador está a preencher as páginas do site aos poucos.

**Ainda por responder/fazer quando o utilizador voltar a esse assunto:**
1. `home.whatItIs.p1` ("O Que é Banho de Som?" da home) — **ainda tem o texto antigo** com "vibração sonora terapêutica" e "seu corpo começa a se reparar" (a mesma linguagem proibida). Ofereci reescrever com a mesma lógica das outras secções, mas o utilizador redirecionou esse texto para o card de Grupo em vez de aplicar aqui — **este ainda está por resolver**.
2. Confirmar "60 min / tigelas Peter Hess" do Sound Bath (1:1) — ainda é o texto original, nunca confirmado como atual.
3. Confirmar "90 min / evento ritual" do Grupo.
4. Domínio final do site (para `NEXT_PUBLIC_SITE_URL`).
5. Portfólio — está vazio (0 itens no Convex); precisa de sessões/eventos reais (título, tipo, local, data, foto) para popular.
6. Bio/Sobre — confirmar se o texto atual ("My work brings together sound healing...") é definitivo.
7. Preços — não há nenhum preço em lado nenhum do site; decidir se mostra ou não.
8. WhatsApp `wa.me/message/A4JJZNWV3FSNG1` — confirmar que é o canal certo.
9. Instagram `@raphael.soundjourney` / YouTube `@raphaelbruno2761` — confirmar.

---

## 5. Estado final do repositório

- Branch: `main`, atualizado, sem PRs abertas.
- Últimos commits (mais recente primeiro): #98 → #97 → #96 → #95 → #94 → #93 → #92.
- `npm run lint` limpo em toda a sessão; todos os `messages/*.json` validados como JSON válido a cada alteração.
- Nenhum ficheiro untracked por resolver (os 5 que existiam no início da sessão foram todos tratados: `.claude/` agora está no `.gitignore`; os docs e a imagem foram commitados).
