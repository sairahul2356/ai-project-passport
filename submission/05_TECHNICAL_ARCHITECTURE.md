# 📐 Technical Architecture Specification (v3.0)

**System Name:** AI Project Passport — Product-Led Growth Engine Prototype  
**Architecture Type:** Client-Side Single Page Web Application (SPA)  
**Storage Engine:** Browser `localStorage` & `sessionStorage` Reactive State Store  
**Event Telemetry Engine:** Client-Side Event Analytics Engine (`trackEvent`)  
**Visualization Engine:** Chart.js 4.x (via CDN)  
**Styling Framework:** Modular Vanilla CSS3 (Custom Design System, Glassmorphism, CSS Grid & Flexbox)

---

## 1. System Architecture Diagram

```mermaid
graph TD
    User([Engineering Student]) -->|Enters URL / ?ref=CODE / ?campus=CODE| Router[URL & Query Parser]
    Router -->|Store Codes| SessionState[SessionStorage]
    
    User --> Landing[Landing Page & Explainer]
    Landing -->|trackEvent: landing_view| Passport[AI Project Passport Wizard (Q1-Q5)]
    
    Passport -->|trackEvent: passport_complete| MatchEngine[Deterministic Match Engine]
    MatchEngine -->|Calculate 0-100%| ScoreEngine[Project Match Score Calculator]
    
    ScoreEngine --> ProjectView[Project Result View & Build With Me Section]
    ProjectView -->|Regen Clicked| Regen[trackEvent: project_regenerated]
    Regen --> MatchEngine
    
    ProjectView --> RegModal[Registration Modal]
    RegModal -->|Validate| DupCheck{Duplicate Check}
    
    DupCheck -->|New User| CreateUser[Generate Student ID & Referral Code]
    CreateUser --> Attribution[Referral Attribution Engine]
    
    Attribution -->|If valid ref| UnlockSquad[Unlock Squad Seat & Award +100 Pts]
    UnlockSquad -->|trackEvent: squad_unlocked| LocalDB[(Browser LocalStorage DB)]
    
    LocalDB --> Dash[Student Dashboard & Share Kit]
    LocalDB --> Leaderboard[Student Leaderboard & Campus Growth Battle]
    LocalDB --> ControlRoom[Admin Growth Control Room]
    
    ControlRoom --> Intelligence[Growth Intelligence Engine]
    ControlRoom --> LoopHealth[Growth Loop Health Monitor]
    ControlRoom --> Segments[Growth Segments Analyzer]
    ControlRoom --> Experiments[Experiment Cards Backlog]
```

---

## 2. Core Data Schemas

### A. Tracked Event Schema (`nxt_events_data`)
```typescript
interface TrackedEvent {
  eventName: string;       // e.g., "passport_start", "project_match_viewed", "squad_unlocked"
  timestamp: string;       // ISO 8601 creation timestamp
  sessionId: string;       // Unique browser session ID
  userId: string | null;   // Student ID if logged in
  referralCode: string | null; // Active referral code
  campusCode: string | null;   // Active campus code
  metadata: Record<string, any>; // Context payload (reason, score, style)
}
```

### B. Student Profile Schema (`nxt_students_data`)
```typescript
interface StudentProfile {
  id: string;              // e.g., "NXT-2027-8942"
  name: string;            // Full Name
  email: string;           // Lowercase unique email
  whatsapp: string;        // 10-digit mobile number
  college: string;         // College / University Name
  campusCode: string;      // Campus code, e.g., "SRM-AI27"
  branch: string;          // Engineering Discipline
  experience: string;      // "beginner" | "intermediate" | "advanced"
  preference: string;      // "solo" | "guided" | "squad"
  gradYear: string;        // Default "2027"
  project: string;         // Matched AI Project Name
  referralCode: string;    // Unique code, e.g., "SQUAD-8942"
  referredBy: string | null; // Referrer's referral code or null
  referralsCount: number;  // Verified student referrals count
  sharesCount: number;     // Vanity shares count
  points: number;          // Growth points (referralsCount * 100)
  squadUnlocked: boolean;  // True if squad co-build is unlocked
  timestamp: string;      // ISO 8601 creation timestamp
  isDemo: boolean;         // True if sample demo data row
}
```

---

## 3. Project Match Score Computation Algorithm

The **Project Match Score** computes a transparent 0–100% score based on 5 weighted profile dimensions:

```javascript
function calculateProjectMatchScore(project, passport) {
  let branchScore = (passport.branch === 'cse' || passport.branch === 'ece') ? 20 : 16;
  let interestScore = passport.interests.length > 0 ? 23 : 18;
  let skillScore = passport.experience === 'beginner' ? 18 : 20;
  let goalScore = passport.goal === 'placement' ? 20 : 18;
  let prefScore = passport.preference === 'squad' ? 15 : 12;

  const total = branchScore + interestScore + skillScore + goalScore + prefScore;

  return {
    total: Math.min(98, total),
    breakdown: {
      branchMatch: Math.round((branchScore / 20) * 100),
      interestMatch: Math.round((interestScore / 25) * 100),
      skillMatch: Math.round((skillScore / 20) * 100),
      goalMatch: Math.round((goalScore / 20) * 100),
      prefMatch: Math.round((prefScore / 15) * 100)
    }
  };
}
```

---

## 4. Growth Intelligence & Loop Health Telemetry

1. **Growth Loop Health Monitoring:** Evaluates 6 loop stages (Acquisition, Activation, Value Delivered, Sharing, Referral Registration, Squad Unlock) against decision thresholds ($\ge 80\%$ Healthy, $50-80\%$ Needs Optimization, $<50\%$ Critical Drop-off).
2. **Value Before Ask Rate:** Computes $\frac{\text{Completed Registrations}}{\text{Projects Generated}} \times 100$. Demonstrates that value precedes registration.
3. **Share Quality Rate:** Computes $\frac{\text{Successful Referral Registrations}}{\text{Vanity Shares Clicked}} \times 100$, distinguishing vanity clicks from true referral conversions.

---

## 5. Data Management, Demo Reset & Integrity

1. **Client-Side Storage Isolation:** All user profiles and event logs remain strictly in `localStorage` (`nxt_students_data`, `nxt_events_data`).
2. **Transparent Labeling:** Every sample row, metric, and admin graph explicitly displays **"Demo Data"**, **"Campaign Target"**, or **"Planning Model"** badges.
3. **Demo Reset Function:** The **"Reset Data"** button clears all `localStorage` keys, session storage, and event logs, restoring a clean state for fresh testing.
