# 📊 AI Project Passport — Presentation Deck (5 Slides)

> **Campaign:** Product-Led Growth Engine Prototype for the NxtWave Growth Challenge  
> **Target:** 500 Total Final-Year Engineering Student Registrations in 7 Days  
> **Budget Model:** ₹2,000 Total Budget (100% Peer Incentives, ₹0 Paid Ads, Modeled CAC: ₹4.00)

---

## 🖼️ SLIDE 1: Title & Strategic Core Thesis

### **AI Project Passport — Product-Led Growth Engine**
*Transforming Workshop Acquisition from Generic Ad Marketing to Personalized Outcome-Led Viral Loops*

#### **1. The Growth Challenge**
* **Objective:** Acquire **500 final-year engineering student registrations** in 7 days.
* **Constraint:** **₹2,000 total budget** (Paid digital ads like Meta/Google carry an illustrative CAC of ₹80–₹150, yielding barely 13–25 signups).
* **The Bottleneck:** **Distribution, not conversion.** Generic webinar promotion ("Attend a 60-Min AI Workshop") suffers from steep webinar fatigue.

#### **2. Winning Thesis: Value Before Ask**
> *"Don't sell the webinar. Sell a personalized outcome students actively want to build and flex with a classmate."*

#### **3. The 5-Step Product-Led Loop**
$$\text{AI Passport (5 Qs)} \longrightarrow \text{Match Score (0–100\%)} \longrightarrow \text{Build With Me Hook} \longrightarrow \text{Squad Seat Referral} \longrightarrow \text{Growth Control Room}$$

---

## 🖼️ SLIDE 2: Product-Led Personalization & Match Score Algorithm

### **Personalized Discovery & Squad Co-Build Hook**

#### **1. 5-Question AI Project Passport**
Captures student **Branch** (CSE/IT/ECE/Mech), **Coding Experience**, **Technical Interests** (GenAI/NLP/Web/IoT/Security), **Career Goals** (Placement/Startup), and **Build Style** (Solo/Squad).

#### **2. Multi-Dimensional Match Score Algorithm (0–100%)**
Compares student profile against structured project profiles using a 6-factor weighted algorithm:

$$\text{Score} = \text{Branch (25\%)} + \text{Interest (25\%)} + \text{Goal (15\%)} + \text{Skill (15\%)} + \text{Preference (10\%)} + \text{Difficulty (10\%)}$$

* **Explainable Rationale ("WHY THIS MATCHES YOU"):** Itemizes compatibility tags across Branch, Interest, Goal, Skill, Preference, and Difficulty Fit.
* **Dynamic Variation:** The same student receives different scores for different projects (e.g., Profile A scores 97% on AI Resume Analyzer vs 53% on Predictive Maintenance).

#### **3. Viral "Build With Me" Squad Hook**
* **The Hook:** *"This project is even better when built with a classmate."*
* **Squad Seat Referral:** When a peer registers via a student's referral code (`?ref=...`), **BOTH** unlock a *Proposed Team Extension Pack*.
* **Referral Fatigue Safeguard:** Detects repetitive daily sharing and gently prompts students to invite genuine project teammates.

---

## 🖼️ SLIDE 3: System Architecture & Event Telemetry Engine

### **Technical Architecture & Data Pipeline**

#### **1. Tech Stack & Execution Model**
* **Frontend:** Modern HTML5, Modular Vanilla CSS3 (Glassmorphism, Dark Theme), Vanilla JavaScript ES6+.
* **Execution:** 100% Standalone client-side SPA — zero external API keys or node servers required.
* **State & Storage:** Client-side reactive `STATE` store backed by `localStorage` (`nxt_events_data`, `nxt_students_data`).

#### **2. Real-Time Event Telemetry Engine (`trackEvent`)**
Standardized event logging pipeline capturing full funnel analytics:
```
landing_view ──> passport_started ──> passport_completed ──> project_generated ──> registration_completed ──> share_action ──> referral_visit ──> squad_unlocked
```

#### **3. Core Application Modules**
* **Project Library / Marketplace:** 6 domain-specific AI blueprints (Generative AI, Data & SQL, IoT Sensors, Predictive Maintenance, Cybersecurity, Web Generator).
* **Intelligent Project Regeneration:** Clicking *"Not Your Project?"* ranks alternative project blueprints using the match score algorithm and logs `project_regenerated` telemetry.
* **Simulated Campus Growth Battle:** Inter-college activity leaderboard across engineering institutions (SRM, VIT, JNTU) with campus-specific attribution codes.

---

## 🖼️ SLIDE 4: Admin Growth Control Room & Growth Intelligence

### **Real-Time Growth Analytics & Experimentation**

#### **1. Admin Control Room Dashboard**
* **Target Progress Tracker:** Real-time completion against 500 registration target.
* **Top Channel Attribution:** Tracks acquisition across Ambassadors, Clubs, Organic Social, and Student Referrals.
* **Funnel Drop-Off Detection:** Automatically identifies the stage with the highest percentage drop.

#### **2. Automated Growth Intelligence Engine**
Calculates real-time strategic signals directly from stored event telemetry:
* **Current Signal:** Measures Referral Registration Contribution ($\frac{\text{Referral Regs}}{\text{Total Regs}} \times 100\%$).
* **Observable Pattern:** Identifies highest-performing viral cohorts (e.g., Squad-oriented users share 2.4x more frequently).
* **Recommended Experiment:** Dynamically triggers A/B test recommendations based on drop-off bottlenecks.
* **Campaign Decision:** Generates action decisions (*Scale*, *Test*, *Investigate*, *Maintain*, or *"Awaiting sufficient data"*).

#### **3. Growth Segments & Experiment Cards**
* **"Why Did Students Share?":** Dynamic segmentation breakdown by Branch, Experience Level, and Preference tagging `BEST SHARING SEGMENT` and `BEST CONVERTING SEGMENT`.
* **A/B Experiment Cards:** Functional experiment cards tracking Hypothesis, Control vs Variant, Primary Metric, and Status.

---

## 🖼️ SLIDE 5: Unit Economics, 500 Planning Model & AI Rejection Notes

### **Economics, Attribution & Strategic Judgment**

#### **1. 500 Registration Planning Target Model**
> *Note: Referral signups (150) are an attribution category inside the 500 total target model, not added on top.*

| Acquisition Channel | Target Registrations | % Share | Strategy & Channel Role |
| :--- | :---: | :---: | :--- |
| **Campus Ambassadors** | **200** | **40%** | Peer outreach across top engineering colleges |
| **Student Referral Loop** | **150** | **30%** | Viral "Build With Me" squad invites ($K = 0.50$) |
| **College Clubs & Communities** | **100** | **20%** | Coding club, Discord & WhatsApp community partnerships |
| **Organic Social & Direct** | **50** | **10%** | GitHub, LinkedIn project cards & direct visits |
| **TOTAL CAMPAIGN TARGET** | **500** | **100%** | **Modeled CAC: ₹4.00 per target signup** |

#### **2. ₹2,000 Budget Allocation (Planning Budget Hypothesis)**
* **₹1,000 (50%):** Peer Referral Recognition Pool (Top student referrers).
* **₹500 (25%):** Top Campus Ambassador Recognition Pool.
* **₹500 (25%):** Campus Club & Creator Perk Pool.
* **Modeled CAC:** $\frac{₹2,000}{500 \text{ target registrations}} = \mathbf{₹4.00 \text{ per target signup}}$ (100% peer incentives, ₹0 paid ads).

#### **3. Key AI Suggestions Rejected (Human Judgment)**
1. **Rejected Paid Meta Ads:** Unrealistic unit economics (₹80–₹150 CAC would consume budget in 20 signups).
2. **Rejected Fake Countdown / Social Popups:** Deceptive urgency damages student trust; replaced with real event telemetry.
3. **Rejected Generic Webinar Landing Page:** High bounce rate (~85–90%); replaced with personalized AI Project Passport value delivery.
