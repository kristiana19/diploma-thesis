# INTELIGENTNI SISTEM ZA IZVAJANJE TEHNIČNIH INTERVJUJEV Z AVTOMATIZIRANO ANALIZO KANDIDATOV

> **Diplomsko delo** – Višja strokovna šola Academia  
> **Študijski program:** Računalništvo in informatika

Spletna platforma za izvajanje in avtomatizirano analizo tehničnih intervjujev, ki združuje video komunikacijo, programsko okolje za reševanje nalog ter analizo z velikimi jezikovnimi modeli (LLM).

---

## 📋 O projektu

**Naslov**

Inteligentni sistem za izvajanje tehničnih intervjujev z avtomatizirano analizo kandidatov

**Avtorica**

Kristijana Marušić

**Mentor**

mag. Matjaž Prtenjak

**Leto**

2026

Projekt predstavlja raziskovalni prototip inteligentnega sistema za izvajanje tehničnih intervjujev. Kandidatom omogoča sodelovanje v video intervjuju, reševanje programerskih nalog ter samodejno analizo odgovorov z uporabo velikih jezikovnih modelov (LLM). Cilj sistema je zmanjšati subjektivnost pri ocenjevanju kandidatov ter zagotoviti strukturirano in kakovostno povratno informacijo.

---

## ✨ Funkcionalnosti

- 🔐 Avtentikacija uporabnikov
- 👥 Video tehnični intervjuji
- 💻 Monaco Editor za reševanje programerskih nalog
- ⚡ Izvajanje kode 
- 🤖 Analiza odgovorov z Google Gemini API
- 📊 Samodejno AI poročilo
- 💬 Komentarji in povratne informacije
- 📅 Upravljanje intervjujev

---

## 🛠️ Tehnološki sklad

| Komponenta | Tehnologija |
|------------|-------------|
| Frontend | Next.js, React, TypeScript |
| Oblikovanje uporabniškega vmesnika | Tailwind CSS 4, shadcn/ui |
| Avtentikacija | Clerk |
| Backend | Convex |
| Video komunikacija | Stream Video SDK |
| Urejevalnik kode | Monaco Editor |
| Izvajanje kode | Piston API |
| AI analiza | Google Gemini API |

---

## 🏗️ Arhitektura sistema

```
                    +----------------------+
                    |       Next.js        |
                    |      Frontend        |
                    +----------+-----------+
                               |
                               |
                    Clerk Authentication
                               |
                               |
                    +----------v-----------+
                    |       Convex         |
                    | Database & Backend   |
                    +----------+-----------+
                               |
       +-----------------------+----------------------+
       |                       |                      |
       |                       |                      |
+------v------+       +--------v--------+     +-------v-------+
| Stream SDK  |       | Gemini API      |     |  Piston API   |
| Video Calls |       | AI Evaluation   |     | Code Runner   |
+-------------+       +-----------------+     +---------------+
```

---

## 🚧 Status razvoja

- [x] Avtentikacija uporabnikov
- [x] Clerk integracija
- [x] Convex backend
- [x] Podatkovni model
- [ ] Video intervjuji
- [ ] Monaco Editor
- [ ] Piston API
- [ ] Gemini analiza
- [ ] AI poročila
- [ ] Produkcijska namestitev

---

## 📂 Struktura projekta

```
diploma-thesis
│
├── convex/                # Backend in podatkovni model
├── public/                # Statične datoteke
├── src/
│   ├── app/               # App Router
│   ├── components/        # React komponente         
│   └── lib/               # Pomožne funkcije
│
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Zagon projekta

### Kloniranje repozitorija

```bash
git clone https://github.com/kristiana19/diploma-thesis.git
cd diploma-thesis
```

### Namestitev odvisnosti

```bash
npm install
```

### Nastavitev okolja

Ustvari datoteko **`.env.local`**:

```env
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

Na platformi Convex nastavi še:

```text
CLERK_WEBHOOK_SECRET=
```

### Zagon

```bash
npm run dev
```

V drugem terminalu:

```bash
npx convex dev
```

Aplikacija bo dostopna na:

```
http://localhost:3000
```

---


## 📄 Licenca

Projekt je nastal kot del diplomskega dela na Višji strokovni šoli Academia. Namenjen je izključno za izobraževalne in raziskovalne namene.

<div align="center">
  <sub>
    © 2026 Kristijana Marušić<br>
    All rights reserved.
  </sub>
</div>