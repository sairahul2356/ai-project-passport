# 🚀 AI Project Passport & Product-Led Growth Engine Prototype

> **NxtWave Growth Intern Challenge Submission**  
> **Campaign Positioning:** AI Project Passport — A Product-Led Growth Engine Prototype  
> **Campaign Target:** 500 TOTAL Final-Year Engineering Student Registrations in 7 Days  
> **Budget:** ₹2,000 Campaign Budget (100% Peer Incentives, ₹0 Paid Ads)  
> **Core Thesis:** *"Don't sell the webinar. Sell the outcome."* and *"Don't just acquire students. Create a system that learns which students, messages, projects and channels produce growth."*

---

## 🏆 Executive Summary

This repository contains the complete growth strategy, interactive web prototype, real event telemetry engine, Growth Intelligence system, and technical documentation built for the NxtWave Growth Intern Challenge.

```
[Landing Page] ──> [AI Passport (5 Qs)] ──> [Project Match Score (87%)] ──> [Build With Me] ──> [Squad Seat Loop] ──> [Growth Control Room]
```

---

## 📊 500 Total Registration Model & Attribution Split

> 📌 **Important Model Note:** Referral registrations are included in the 500 total registration target; they are attribution categories within the 500 total, not additional registrations beyond 500.

| Category | Target Registrations | % of Target Model | Strategy & Execution |
| :--- | :---: | :---: | :--- |
| **Campus Ambassadors** | 200 | 40% | 25 student leads driving ~8 signups each via college WhatsApp networks. |
| **Student Referral Loop** | 150 | 30% | Peer-to-peer sharing driven by Squad Seat co-build unlocks. |
| **College Clubs & Communities** | 100 | 20% | Tech fest partnerships, CSI/IEEE student chapters, and Telegram tech groups. |
| **Organic Social & Direct** | 50 | 10% | Student LinkedIn project pass shares, GitHub badges, and word of mouth. |
| **Total Campaign Target** | **500** | **100%** | **Modeled CAC at 500 registrations: ₹4.00 per target signup** |

---

## 💡 ₹2,000 Budget Allocation & Modeled CAC

**Paid Digital Ads were REJECTED 100%.** Meta/Google ad CAC is modeled at a planning assumption of ₹100 per lead (no campaign data available). Reallocating 100% of the ₹2,000 budget to student peer incentives yields:

- 🥇 **Top 3 Student Referrers Pool:** ₹1,000 (1st: ₹500, 2nd: ₹300, 3rd: ₹200 Vouchers/Swag)
- 🏛️ **Top Campus Ambassador Voucher:** ₹500
- 🎖️ **Squad Perks & Certificates:** ₹500
- 💰 **Modeled Acquisition Cost:** $\frac{₹2,000}{500 \text{ target registrations}} = \mathbf{₹4.00 \text{ per target registration}}$ *(Planning model — not observed performance)*

---

## 📂 Submission Deliverables Map (`submission/`)

| Document File | Purpose & Summary |
| :--- | :--- |
| **[`submission/01_GROWTH_PLAN.md`](submission/01_GROWTH_PLAN.md)** | **Growth Masterplan:** 500 total target model, modeled CAC, 3-level distribution engine, viral coefficient ($K = 0.50$), Growth Loop Health, Segment Insights, Experiment Cards, and 7-day schedule. |
| **[`submission/02_AI_LEARNING_NOTES.md`](submission/02_AI_LEARNING_NOTES.md)** | **AI Decision Log:** 5 detailed examples of AI prompts, initial AI advice, and rejection rationales (Paid ads, generic webinar page, fake social proof, API key exposure, gamification spam). |
| **[`submission/03_VIDEO_SCRIPT.md`](submission/03_VIDEO_SCRIPT.md)** | **3-Minute Pitch Script:** High-energy pitch script matching the exact time-structured breakdown (0:00 Problem, 0:20 Insight, 0:45 Passport, 1:15 Match Score/Build With Me, 1:40 Campus Battle, 2:00 Growth Control Room, 2:25 Target Model, 2:45 AI Rejections). |
| **[`submission/04_DEMO_INSTRUCTIONS.md`](submission/04_DEMO_INSTRUCTIONS.md)** | **Evaluator Walkthrough Guide:** Exact 20-step evaluator testing sequence. |
| **[`submission/05_TECHNICAL_ARCHITECTURE.md`](submission/05_TECHNICAL_ARCHITECTURE.md)** | **System Spec:** Core data schemas, event tracking telemetry (`trackEvent`), Project Match Score algorithm, and Squad state machine. |

---

## 🛠️ How to Run & Demo

The application is a standalone client-side SPA requiring **zero node dependencies, servers, or API keys**.

1. Open your web browser (Chrome, Edge, Firefox, or Safari).
2. Open `index.html` located in the project root:
   ```text
   file:///C:/Users/psair/Downloads/next-wave/index.html
   ```
3. **20-Step Evaluator Highlights:**
   - **AI Passport & Match Score:** Complete 5 quick questions to view your computed **Project Match Score (87%)** and transparent breakdown.
   - **"Not Your Project?" Options:** Test interactive regeneration (*🔄 Give Me Another Idea*, *🎯 Make It Easier*, *💼 Make It Placement-Focused*).
   - **"Build With Me" & Registration:** Click *"INVITE A FRIEND"*, register a test student, and receive Student ID (`NXT-2027-XXXX`) and Referral Link (`?ref=SQUAD-XXXX`).
   - **Test Squad Seat Unlock:** Open referral link in a new tab, register User 2, and observe BOTH unlock **"SQUAD SEAT UNLOCKED 🎉: You & User 2 are now a project squad!"**.
   - **Explore Projects & Campus Growth Battle:** View inter-college rankings (SRM, VIT, JNTU) with progress bars (Goal: 60) and campus codes. Check *"Explore Popular Student Projects"* social discovery tab.
   - **Admin Growth Control Room:** View Growth Control Room dashboard featuring real event-tracked funnels, Growth Intelligence signals, Growth Loop Health visualization, Segment Insights, Value Before Ask Rate (74%), Share Quality Rate (24%), and Experiment Cards.
   - **Demo Mode Controls:** Use **"⚡ Load Demo Data"** to populate realistic sample rows (all clearly labeled **"Demo Data"**) or **"🗑️ Reset Data"** to restore clean state.

---

## 🔒 Absolute Honesty & Transparency

- **No Fake Social Proof:** Zero fake registration popups or fabricated testimonials.
- **Explicit Labeling:** All sample student data, leaderboards, and simulated stats carry visual **"Demo Data"**, **"Campaign Target"**, **"Planning Model"**, or **"Prototype Insight"** badges.
- **No Key Exposure:** Zero API key dependencies in client-side code.
