/**
 * AI Project Passport — Product-Led Growth Engine Logic v4.0
 * Growth Campaign Prototype for the NxtWave Growth Challenge
 * Dynamic Event Telemetry, Growth Intelligence, Loop Health & Segmentation
 */

// Global State Object
const STATE = {
  activeTab: 'landing',
  referrerCode: null,
  campusCode: null,
  sourceChannel: 'organic', // ambassador, club, organic, referral
  sessionId: 'sess_' + Math.random().toString(36).substr(2, 9),
  shareCount: 0,
  dailyShareCount: 0,
  activeSegmentTab: 'branch', // branch, experience, interest, goal, preference
  passport: {
    step: 1,
    branch: '',
    experience: '',
    interests: [],
    goal: '',
    preference: ''
  },
  currentProject: null,
  currentMatchScore: null,
  currentUser: null,
  students: [],
  events: [],
  demoDataLoaded: false
};

// Deterministic Project Recommendation Matrix
const PROJECT_MATRIX = [
  {
    id: 'proj_cse_genai',
    category: 'Generative AI',
    profile: {
      branches: ['cse', 'it'],
      interests: ['genai', 'nlp', 'web'],
      skillLevel: ['beginner', 'intermediate'],
      goals: ['placement', 'portfolio', 'learning'],
      buildPreference: ['solo', 'squad'],
      difficulty: 'Intermediate'
    },
    matchCondition: (p) => (p.branch === 'cse' || p.interests.includes('genai')),
    name: 'AI-Powered Smart Resume & Portfolio Analyzer',
    tagline: 'Instant ATS scoring, keyword matching & tailored resume enhancement using LLM APIs',
    whyFits: 'This project matches your Generative AI interest, Computer Science background, and placement goal.',
    difficulty: 'Intermediate',
    buildTime: '60 Minutes (Live Build)',
    stack: ['Python 3.11', 'Streamlit', 'LangChain', 'PyPDF2'],
    skills: ['Python', 'AI', 'NLP'],
    suggestedBranch: 'CSE / IT / AI-DS',
    exploringCount: 38,
    features: [
      'PDF Resume Upload & Automated Parsing',
      'Job Description (JD) Semantic Matching Score',
      'Missing Technical Skills & Keyword Gap Analysis',
      'AI-Generated ATS-Optimized Resume Rewrite Bullet Points',
      'Exportable Clean PDF Resume Report'
    ],
    outcomes: [
      'Master Prompt Engineering & Structured Output Extraction',
      'Understand Vector Embeddings & Document Chunking',
      'Deploy a Full-Stack AI App on Streamlit Cloud'
    ],
    careerRelevance: {
      resume: 'High',
      portfolio: 'High',
      interview: 'High',
      complexity: 'Medium'
    }
  },
  {
    id: 'proj_ece_iot',
    category: 'IoT & Sensors',
    profile: {
      branches: ['ece', 'eee', 'chem', 'other'],
      interests: ['vision', 'iot', 'data', 'automation'],
      skillLevel: ['beginner', 'intermediate'],
      goals: ['portfolio', 'learning', 'placement'],
      buildPreference: ['solo', 'squad'],
      difficulty: 'Beginner-Friendly'
    },
    matchCondition: (p) => (p.branch === 'ece' || p.interests.includes('vision')),
    name: 'Smart Edge IoT Sensor Anomaly & Fault Detector',
    tagline: 'Real-time telemetry monitoring with predictive ML fault alert triggers',
    whyFits: 'This project matches your ECE/hardware background and sensor analytics interest.',
    difficulty: 'Beginner-Friendly',
    buildTime: '60 Minutes (Live Build)',
    stack: ['Python', 'MQTT Protocol', 'Scikit-Learn', 'Plotly Dash'],
    skills: ['Python', 'IoT', 'Machine Learning'],
    suggestedBranch: 'ECE / EEE / EIE',
    exploringCount: 24,
    features: [
      'Simulated Live Sensor Stream (Temperature, Vibration, Current)',
      'Isolation Forest Anomaly Detection Algorithm',
      'Instant Threshold & Anomaly Visual Heatmap Dashboard',
      'WhatsApp Emergency Alert Trigger',
      'Historical Telemetry CSV Export'
    ],
    outcomes: [
      'Hands-on Machine Learning classifier deployment',
      'Real-time data streaming & anomaly detection pipelines',
      'Edge-to-cloud IoT data architecture'
    ],
    careerRelevance: {
      resume: 'High',
      portfolio: 'High',
      interview: 'High',
      complexity: 'Medium'
    }
  },
  {
    id: 'proj_mech_maint',
    category: 'Automation',
    profile: {
      branches: ['mech', 'chem', 'other', 'eee'],
      interests: ['automation', 'data', 'iot', 'robotics'],
      skillLevel: ['intermediate', 'advanced'],
      goals: ['placement', 'portfolio', 'learning'],
      buildPreference: ['solo', 'squad'],
      difficulty: 'Intermediate'
    },
    matchCondition: (p) => (p.branch === 'mech' || p.interests.includes('automation')),
    name: 'Predictive Equipment Maintenance Assistant',
    tagline: 'AI thermal & vibration telemetry analyzer predicting machine failure before downtime',
    whyFits: 'This project matches your Mechanical/Civil background and Industry 4.0 automation goal.',
    difficulty: 'Intermediate',
    buildTime: '60 Minutes (Live Build)',
    stack: ['Python', 'FastAPI', 'Pandas', 'Streamlit UI'],
    skills: ['Python', 'FastAPI', 'Telemetry AI'],
    suggestedBranch: 'Mechanical / Civil',
    exploringCount: 13,
    features: [
      'Machine Telemetry Log Ingestion & Cleaning',
      'RUL (Remaining Useful Life) Regression Estimator',
      'Interactive Maintenance Risk Heatmap',
      'Automated Spare Part Order Requisition Generator',
      'Maintenance Log Summary PDF Report'
    ],
    outcomes: [
      'Practical predictive maintenance modeling',
      'Industrial AI telemetry integration',
      'Data preprocessing & feature engineering'
    ],
    careerRelevance: {
      resume: 'High',
      portfolio: 'High',
      interview: 'Medium',
      complexity: 'Medium'
    }
  },
  {
    id: 'proj_cyber_phish',
    category: 'Cybersecurity',
    profile: {
      branches: ['cse', 'it', 'ece'],
      interests: ['cyber', 'automation', 'nlp'],
      skillLevel: ['intermediate', 'advanced'],
      goals: ['placement', 'portfolio'],
      buildPreference: ['solo', 'squad'],
      difficulty: 'Intermediate'
    },
    matchCondition: (p) => (p.interests.includes('cyber') || p.interests.includes('automation')),
    name: 'Real-Time AI Phishing & Malicious Threat Detector',
    tagline: 'NLP-driven email & URL security scanner identifying phishing attempts in milliseconds',
    whyFits: 'This project matches your cybersecurity interest and placement focus.',
    difficulty: 'Intermediate',
    buildTime: '60 Minutes (Live Build)',
    stack: ['Python', 'Transformers', 'FastAPI', 'Chrome Extension'],
    skills: ['Python', 'NLP', 'Cybersecurity'],
    suggestedBranch: 'Any Branch',
    exploringCount: 19,
    features: [
      'Email Header & Link Extract Engine',
      'TF-IDF + Random Forest Phishing Scoring',
      'Suspicious Domain & Homograph Attack Detector',
      'Instant Visual Security Risk Rating (Safe vs Malicious)',
      'Browser Extension Popup Widget'
    ],
    outcomes: [
      'Natural Language Processing for text classification',
      'Building REST APIs for browser extension hooks',
      'Security-first AI design principles'
    ],
    careerRelevance: {
      resume: 'High',
      portfolio: 'High',
      interview: 'High',
      complexity: 'Medium'
    }
  },
  {
    id: 'proj_web_genai',
    category: 'Web Development',
    profile: {
      branches: ['cse', 'it'],
      interests: ['web', 'genai', 'content'],
      skillLevel: ['beginner', 'intermediate'],
      goals: ['startup', 'portfolio', 'learning'],
      buildPreference: ['solo', 'squad'],
      difficulty: 'Beginner-Friendly'
    },
    matchCondition: (p) => (p.interests.includes('web') || p.goal === 'startup'),
    name: 'Instant AI Website Copy & Content Generator',
    tagline: 'Enter a single startup prompt -> Generate SEO headlines, body text & layout assets',
    whyFits: 'This project matches your web development interest and startup goal.',
    difficulty: 'Beginner-Friendly',
    buildTime: '60 Minutes (Live Build)',
    stack: ['JavaScript', 'React', 'Gemini API', 'TailwindCSS'],
    skills: ['React', 'JavaScript', 'GenAI'],
    suggestedBranch: 'CSE / Web Devs',
    exploringCount: 31,
    features: [
      'Brand & Product Idea Brief Generator',
      'Multi-Tone Copywriting Engine (Professional, Viral, Tech)',
      'Live Side-by-Side Landing Page Preview',
      'One-Click HTML/Tailwind Code Export',
      'Social Media Ad Caption Generator'
    ],
    outcomes: [
      'Integrating LLM APIs with frontend frameworks',
      'Prompt chaining & template engineering',
      'Rapid UI prototyping with AI content'
    ],
    careerRelevance: {
      resume: 'High',
      portfolio: 'High',
      interview: 'High',
      complexity: 'Low'
    }
  },
  {
    id: 'proj_data_sql',
    category: 'Data & Analytics',
    profile: {
      branches: ['cse', 'it', 'ece'],
      interests: ['data', 'genai', 'sql'],
      skillLevel: ['beginner', 'intermediate'],
      goals: ['placement', 'portfolio', 'learning'],
      buildPreference: ['solo', 'squad'],
      difficulty: 'Intermediate'
    },
    matchCondition: (p) => (p.interests.includes('data') || p.branch === 'cse'),
    name: 'Natural Language to SQL Query & Insights Assistant',
    tagline: 'Ask business questions in plain English -> Get error-free SQL queries & auto-generated charts',
    whyFits: 'This project matches your data analytics interest and analytical career goals.',
    difficulty: 'Intermediate',
    buildTime: '60 Minutes (Live Build)',
    stack: ['Python', 'SQLite', 'LangChain SQL Agent', 'Plotly'],
    skills: ['Python', 'SQL', 'Data Analytics'],
    suggestedBranch: 'Data / CSE',
    exploringCount: 28,
    features: [
      'Natural Language Question Input Prompt',
      'Schema-Aware SQL Code Synthesizer',
      'Safe SQL Execution & Data Table Rendering',
      'Auto-Selected Bar/Line Chart Visualization',
      'Query Performance & Optimization Tips'
    ],
    outcomes: [
      'Master Database Schema Prompt Injection prevention',
      'Build end-to-end Text-to-SQL workflows',
      'Automate dynamic chart generation'
    ],
    careerRelevance: {
      resume: 'High',
      portfolio: 'High',
      interview: 'High',
      complexity: 'Medium'
    }
  }
];

// Fallback Project
const DEFAULT_PROJECT = {
  id: 'proj_default_summarizer',
  category: 'Generative AI',
  profile: {
    branches: ['cse', 'it', 'ece', 'mech', 'chem', 'other'],
    interests: ['genai', 'nlp', 'web', 'data', 'vision', 'automation', 'cyber'],
    skillLevel: ['beginner', 'intermediate', 'advanced'],
    goals: ['placement', 'portfolio', 'learning', 'startup'],
    buildPreference: ['solo', 'squad'],
    difficulty: 'Beginner-Friendly'
  },
  name: 'AI Document Summarizer & Interactive Study Quizzer',
  tagline: 'Turn 50-page textbooks or PDFs into 3-min bullet summaries & auto-generated practice quizzes',
  whyFits: 'Universal high-impact AI project suitable for all engineering disciplines.',
  difficulty: 'Beginner-Friendly',
  buildTime: '60 Minutes (Live Build)',
  stack: ['Python', 'Streamlit', 'HuggingFace', 'PyPDF2'],
  skills: ['Python', 'NLP', 'Streamlit'],
  suggestedBranch: 'All Disciplines',
  exploringCount: 15,
  features: [
    'PDF Textbook & Lecture Note Parser',
    'Executive Summary & Key Takeaway Extractor',
    'Auto-Generated 10-Question MCQ Quiz with Explanations',
    'Flashcard Generator for Revision',
    'Interactive Score Tracker'
  ],
  outcomes: [
    'Document text processing & tokenization',
    'Quiz logic & evaluation engine creation',
    'Deploying user-friendly study apps'
  ],
  careerRelevance: {
    resume: 'High',
    portfolio: 'Medium',
    interview: 'Medium',
    complexity: 'Low'
  }
};

// ==================================================
// EVENT TRACKING TELEMETRY ENGINE (PART 17, 24)
// ==================================================
function trackEvent(eventName, metadata = {}) {
  const eventObj = {
    eventName: eventName,
    timestamp: new Date().toISOString(),
    sessionId: STATE.sessionId,
    userId: STATE.currentUser ? STATE.currentUser.id : null,
    referralCode: STATE.referrerCode || (STATE.currentUser ? STATE.currentUser.referralCode : null),
    campusCode: STATE.campusCode || null,
    sourceChannel: STATE.sourceChannel || 'organic',
    metadata: metadata
  };

  STATE.events.push(eventObj);
  localStorage.setItem('nxt_events_data', JSON.stringify(STATE.events));
  console.log(`[EVENT TELEMETRY] ${eventName}:`, eventObj);
}

// INITIALIZATION & SETUP
document.addEventListener('DOMContentLoaded', () => {
  initUrlParams();
  loadStateFromStorage();
  trackEvent('landing_view', { userAgent: navigator.userAgent, screenWidth: window.innerWidth });
  renderCurrentView();
  setupEventListeners();
});

// Parse ?ref=, ?campus=, ?source= from URL
function initUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref');
  const campus = urlParams.get('campus');
  const source = urlParams.get('source');

  if (ref) {
    STATE.referrerCode = ref.toUpperCase().trim();
    STATE.sourceChannel = 'referral';
    sessionStorage.setItem('nxt_ref_code', STATE.referrerCode);
    trackEvent('referral_link_opened', { referrerCode: STATE.referrerCode });
    showReferralBanner(STATE.referrerCode);
  } else {
    const savedRef = sessionStorage.getItem('nxt_ref_code');
    if (savedRef) {
      STATE.referrerCode = savedRef;
      showReferralBanner(savedRef);
    }
  }

  if (campus) {
    STATE.campusCode = campus.toUpperCase().trim();
    sessionStorage.setItem('nxt_campus_code', STATE.campusCode);
    trackEvent('campus_link_opened', { campusCode: STATE.campusCode });
  }

  if (source) {
    STATE.sourceChannel = source.toLowerCase().trim();
  }
}

function showReferralBanner(code) {
  const banner = document.getElementById('ref-alert-banner');
  if (banner) {
    banner.style.display = 'block';
    banner.innerHTML = `
      <div class="squad-banner" style="margin: 0 0 20px 0;">
        <div class="squad-icon">🎁</div>
        <div>
          <h4 style="color:#34d399; font-weight:700;">Squad Seat Referral Activated! (Code: ${code})</h4>
          <p style="font-size:0.875rem; color:#e2e8f0;">You were invited by a classmate! Register today to lock your joint <strong>Proposed Squad Seat</strong> for both of you.</p>
        </div>
      </div>
    `;
  }
}

// Storage handling
function loadStateFromStorage() {
  const savedEvents = localStorage.getItem('nxt_events_data');
  if (savedEvents) {
    STATE.events = JSON.parse(savedEvents);
  }

  const savedStudents = localStorage.getItem('nxt_students_data');
  if (savedStudents) {
    STATE.students = JSON.parse(savedStudents);
  }

  const savedCurrentUser = localStorage.getItem('nxt_current_user');
  if (savedCurrentUser) {
    STATE.currentUser = JSON.parse(savedCurrentUser);
  }
}

function saveStateToStorage() {
  localStorage.setItem('nxt_students_data', JSON.stringify(STATE.students));
  localStorage.setItem('nxt_events_data', JSON.stringify(STATE.events));
  if (STATE.currentUser) {
    localStorage.setItem('nxt_current_user', JSON.stringify(STATE.currentUser));
  }
}

// Load Realistic Seed Demo Data (Clearly labeled Demo Data)
function loadDefaultDemoData(forceNotify = true) {
  STATE.students = [
    {
      id: 'NXT-2027-1001',
      name: 'Rohan Sharma',
      email: 'rohan.s@srm.edu.in',
      whatsapp: '9876543210',
      college: 'SRM Institute of Science & Tech',
      campusCode: 'SRM-AI27',
      branch: 'CSE / IT / AI-DS',
      experience: 'intermediate',
      preference: 'squad',
      gradYear: '2027',
      project: 'AI-Powered Smart Resume & Portfolio Analyzer',
      referralCode: 'SQUAD-1001',
      referredBy: null,
      sourceChannel: 'ambassador',
      referralsCount: 12,
      sharesCount: 18,
      points: 1200,
      squadUnlocked: true,
      timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
      isDemo: true
    },
    {
      id: 'NXT-2027-1002',
      name: 'Ananya Verma',
      email: 'ananya.v@vit.ac.in',
      whatsapp: '9876543211',
      college: 'VIT Vellore',
      campusCode: 'VIT-AI27',
      branch: 'ECE / EEE / EIE',
      experience: 'beginner',
      preference: 'squad',
      gradYear: '2027',
      project: 'Smart Edge IoT Sensor Anomaly & Fault Detector',
      referralCode: 'SQUAD-1002',
      referredBy: 'SQUAD-1001',
      sourceChannel: 'referral',
      referralsCount: 8,
      sharesCount: 14,
      points: 800,
      squadUnlocked: true,
      timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
      isDemo: true
    },
    {
      id: 'NXT-2027-1003',
      name: 'Aditya Reddy',
      email: 'aditya.r@jntu.ac.in',
      whatsapp: '9876543212',
      college: 'JNTU Hyderabad',
      campusCode: 'JNTU-AI27',
      branch: 'CSE / IT / AI-DS',
      experience: 'advanced',
      preference: 'solo',
      gradYear: '2027',
      project: 'Natural Language to SQL Query & Insights Assistant',
      referralCode: 'SQUAD-1003',
      referredBy: 'SQUAD-1001',
      sourceChannel: 'club',
      referralsCount: 6,
      sharesCount: 8,
      points: 600,
      squadUnlocked: true,
      timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
      isDemo: true
    },
    {
      id: 'NXT-2027-1004',
      name: 'Priya Kulkarni',
      email: 'priya.k@bits-pilani.ac.in',
      whatsapp: '9876543213',
      college: 'BITS Pilani',
      campusCode: 'BITS-AI27',
      branch: 'Mechanical / Civil / Aerospace',
      experience: 'intermediate',
      preference: 'squad',
      gradYear: '2027',
      project: 'Predictive Equipment Maintenance Assistant',
      referralCode: 'SQUAD-1004',
      referredBy: 'SQUAD-1002',
      sourceChannel: 'referral',
      referralsCount: 5,
      sharesCount: 7,
      points: 500,
      squadUnlocked: true,
      timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
      isDemo: true
    },
    {
      id: 'NXT-2027-1005',
      name: 'Karthik Rao',
      email: 'karthik.r@rvce.edu.in',
      whatsapp: '9876543214',
      college: 'RV College of Engineering',
      campusCode: 'RVCE-AI27',
      branch: 'CSE / IT / AI-DS',
      experience: 'intermediate',
      preference: 'guided',
      gradYear: '2027',
      project: 'Real-Time AI Phishing & Malicious Threat Detector',
      referralCode: 'SQUAD-1005',
      referredBy: 'SQUAD-1003',
      sourceChannel: 'organic',
      referralsCount: 4,
      sharesCount: 5,
      points: 400,
      squadUnlocked: true,
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      isDemo: true
    }
  ];

  // Seed sample event telemetry
  STATE.events = [
    { eventName: 'landing_view', timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), sourceChannel: 'ambassador' },
    { eventName: 'landing_view', timestamp: new Date(Date.now() - 3600000 * 11).toISOString(), sourceChannel: 'club' },
    { eventName: 'landing_view', timestamp: new Date(Date.now() - 3600000 * 10).toISOString(), sourceChannel: 'referral' },
    { eventName: 'passport_started', timestamp: new Date(Date.now() - 3600000 * 9).toISOString(), sourceChannel: 'referral' },
    { eventName: 'passport_completed', timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), sourceChannel: 'referral' },
    { eventName: 'project_generated', timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), sourceChannel: 'referral' },
    { eventName: 'project_match_viewed', timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), sourceChannel: 'referral' },
    { eventName: 'registration_start', timestamp: new Date(Date.now() - 3600000 * 7).toISOString(), sourceChannel: 'referral' },
    { eventName: 'registration_completed', timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), sourceChannel: 'referral' },
    { eventName: 'share_whatsapp', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), sourceChannel: 'referral' },
    { eventName: 'project_shared', timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), sourceChannel: 'referral' },
    { eventName: 'referral_link_opened', timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), sourceChannel: 'referral' },
    { eventName: 'referral_registration', timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), sourceChannel: 'referral' },
    { eventName: 'squad_unlocked', timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), sourceChannel: 'referral' }
  ];

  STATE.demoDataLoaded = true;
  saveStateToStorage();
  if (forceNotify) {
    showToast('Loaded Sample Demo Data successfully! (Labeled Demo Data)', 'info');
    renderCurrentView();
  }
}

// Reset Data cleanly to Empty State (Part 16)
function resetDemoData() {
  localStorage.removeItem('nxt_students_data');
  localStorage.removeItem('nxt_current_user');
  localStorage.removeItem('nxt_events_data');
  sessionStorage.clear();
  STATE.students = [];
  STATE.currentUser = null;
  STATE.events = [];
  STATE.referrerCode = null;
  STATE.campusCode = null;
  STATE.shareCount = 0;
  STATE.dailyShareCount = 0;
  STATE.demoDataLoaded = false;
  showToast('Reset data & events to clean state. Ready for fresh testing!', 'warning');
  renderCurrentView();
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
  document.querySelectorAll('[data-target-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('data-target-tab');
      switchTab(target);
    });
  });

  document.getElementById('btn-load-demo')?.addEventListener('click', () => loadDefaultDemoData(true));
  document.getElementById('btn-reset-demo')?.addEventListener('click', resetDemoData);

  setupPassportListeners();

  document.getElementById('reg-form')?.addEventListener('submit', handleRegistrationSubmit);
  document.getElementById('modal-reg-close')?.addEventListener('click', closeRegistrationModal);
}

function switchTab(tabId) {
  STATE.activeTab = tabId;

  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('data-target-tab') === tabId) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  document.querySelectorAll('.tab-view').forEach(view => {
    view.style.display = view.id === `view-${tabId}` ? 'block' : 'none';
  });

  if (tabId === 'dashboard') renderStudentDashboard();
  if (tabId === 'leaderboard') renderLeaderboards();
  if (tabId === 'admin') renderAdminDashboard();
}

function renderCurrentView() {
  switchTab(STATE.activeTab);
}

// PASSPORT WIZARD LOGIC
function setupPassportListeners() {
  const wizardContainer = document.getElementById('passport-wizard');
  if (!wizardContainer) return;

  document.querySelectorAll('.passport-q').forEach(qEl => {
    const qIndex = parseInt(qEl.getAttribute('data-question'));
    qEl.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        const isMulti = btn.parentElement.hasAttribute('data-multi');

        if (isMulti) {
          btn.classList.toggle('selected');
          const selectedVals = Array.from(btn.parentElement.querySelectorAll('.option-btn.selected'))
            .map(b => b.getAttribute('data-val'));
          STATE.passport.interests = selectedVals;
        } else {
          btn.parentElement.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          
          if (qIndex === 1) STATE.passport.branch = val;
          if (qIndex === 2) STATE.passport.experience = val;
          if (qIndex === 4) STATE.passport.goal = val;
          if (qIndex === 5) STATE.passport.preference = val;
        }

        trackEvent('passport_question_completed', { questionNumber: qIndex, selectedValue: val });
      });
    });
  });

  document.getElementById('btn-passport-next')?.addEventListener('click', () => {
    if (STATE.passport.step === 1) {
      trackEvent('passport_started');
    }

    if (STATE.passport.step < 5) {
      if (!validatePassportStep(STATE.passport.step)) {
        showToast('Please select an option to continue.', 'error');
        return;
      }
      STATE.passport.step++;
      updatePassportStepUI();
    } else {
      if (!validatePassportStep(5)) {
        showToast('Please select your preferred build style.', 'error');
        return;
      }
      trackEvent('passport_completed', { passportData: STATE.passport });
      generateProjectRecommendation();
    }
  });

  document.getElementById('btn-passport-back')?.addEventListener('click', () => {
    if (STATE.passport.step > 1) {
      STATE.passport.step--;
      updatePassportStepUI();
    }
  });
}

function validatePassportStep(step) {
  if (step === 1) return !!STATE.passport.branch;
  if (step === 2) return !!STATE.passport.experience;
  if (step === 3) return STATE.passport.interests.length > 0;
  if (step === 4) return !!STATE.passport.goal;
  if (step === 5) return !!STATE.passport.preference;
  return true;
}

function updatePassportStepUI() {
  const step = STATE.passport.step;
  
  const fill = document.getElementById('passport-progress-fill');
  if (fill) fill.style.width = `${step * 20}%`;

  const label = document.getElementById('passport-step-label');
  if (label) label.textContent = `Question ${step} of 5`;

  document.querySelectorAll('.passport-q').forEach(q => {
    const qNum = parseInt(q.getAttribute('data-question'));
    q.style.display = qNum === step ? 'block' : 'none';
  });

  const backBtn = document.getElementById('btn-passport-back');
  if (backBtn) backBtn.style.display = step > 1 ? 'inline-flex' : 'none';

  const nextBtn = document.getElementById('btn-passport-next');
  if (nextBtn) {
    nextBtn.innerHTML = step === 5 
      ? 'Generate AI Project ✨' 
      : 'Next Question →';
  }
}

// DYNAMIC PROJECT MATCH SCORE COMPUTATION (PROMPT SECTION 4)
function calculateProjectMatchScore(project, passport) {
  const pProfile = project.profile || {
    branches: ['cse', 'it'],
    interests: ['genai'],
    skillLevel: ['beginner', 'intermediate'],
    goals: ['placement', 'portfolio'],
    buildPreference: ['solo', 'squad'],
    difficulty: project.difficulty || 'Intermediate'
  };

  // 1. Branch Compatibility (Weight: 25%)
  let branchFactor = 0.25;
  let branchLabel = '⚠ Partial match';
  if (pProfile.branches.includes(passport.branch)) {
    branchFactor = 1.0;
    branchLabel = '✓ Strong match';
  } else if (
    (passport.branch === 'it' && pProfile.branches.includes('cse')) ||
    (passport.branch === 'eee' && pProfile.branches.includes('ece')) ||
    (passport.branch === 'chem' && pProfile.branches.includes('mech'))
  ) {
    branchFactor = 0.7;
    branchLabel = '✓ Good match';
  }

  // 2. Interest Compatibility (Weight: 25%)
  let interestFactor = 0.2;
  let interestLabel = '⚠ Low match';
  if (passport.interests && passport.interests.length > 0) {
    const matches = passport.interests.filter(i => pProfile.interests.includes(i));
    if (matches.length > 1 || (matches.length === 1 && matches.includes(passport.interests[0]))) {
      interestFactor = 1.0;
      interestLabel = '✓ Strong match';
    } else if (matches.length === 1) {
      interestFactor = 0.75;
      interestLabel = '✓ Good match';
    } else {
      interestFactor = 0.35;
      interestLabel = '⚠ Partial match';
    }
  }

  // 3. Goal Compatibility (Weight: 15%)
  let goalFactor = 0.4;
  let goalLabel = '⚠ Partial match';
  if (pProfile.goals.includes(passport.goal)) {
    goalFactor = 1.0;
    goalLabel = '✓ Strong match';
  } else {
    goalFactor = 0.5;
    goalLabel = '✓ Good match';
  }

  // 4. Programming Skill Compatibility (Weight: 15%)
  let skillFactor = 0.4;
  let skillLabel = '⚠ Partial match';
  if (pProfile.skillLevel.includes(passport.experience)) {
    skillFactor = 1.0;
    skillLabel = '✓ Good match';
  } else if (passport.experience === 'beginner' && pProfile.skillLevel.includes('intermediate')) {
    skillFactor = 0.7;
    skillLabel = '⚠ Slightly challenging';
  } else if (passport.experience === 'intermediate' && pProfile.skillLevel.includes('advanced')) {
    skillFactor = 0.8;
    skillLabel = '⚠ Growth opportunity';
  } else {
    skillFactor = 0.5;
    skillLabel = '⚡ Stretch goal';
  }

  // 5. Build Preference Compatibility (Weight: 10%)
  let prefFactor = 0.5;
  let prefLabel = '⚠ Partial match';
  if (pProfile.buildPreference.includes(passport.preference)) {
    prefFactor = 1.0;
    prefLabel = '✓ Good match';
  }

  // 6. Difficulty Compatibility (Weight: 10%)
  let diffFactor = 0.5;
  let diffLabel = '⚡ Easy start';
  const diffStr = (pProfile.difficulty || project.difficulty || '').toLowerCase();
  const expStr = (passport.experience || '').toLowerCase();

  if (
    (expStr === 'beginner' && diffStr.includes('beginner')) ||
    (expStr === 'intermediate' && diffStr.includes('intermediate')) ||
    (expStr === 'advanced' && diffStr.includes('advanced'))
  ) {
    diffFactor = 1.0;
    diffLabel = '✓ Optimal fit';
  } else if (expStr === 'beginner' && diffStr.includes('intermediate')) {
    diffFactor = 0.7;
    diffLabel = '⚠ Slightly challenging';
  } else if (expStr === 'intermediate' && diffStr.includes('beginner')) {
    diffFactor = 0.8;
    diffLabel = '⚡ Fast build';
  } else if (expStr === 'advanced' && (diffStr.includes('intermediate') || diffStr.includes('beginner'))) {
    diffFactor = 0.75;
    diffLabel = '⚡ Quick implementation';
  }

  const weightedScore = Math.round(
    branchFactor * 25 +
    interestFactor * 25 +
    goalFactor * 15 +
    skillFactor * 15 +
    prefFactor * 10 +
    diffFactor * 10
  );

  const total = Math.min(98, Math.max(38, weightedScore));

  return {
    total: total,
    breakdown: {
      branchMatch: Math.round(branchFactor * 100),
      interestMatch: Math.round(interestFactor * 100),
      goalMatch: Math.round(goalFactor * 100),
      skillMatch: Math.round(skillFactor * 100),
      prefMatch: Math.round(prefFactor * 100),
      diffMatch: Math.round(diffFactor * 100)
    },
    breakdownLabels: {
      branch: branchLabel,
      interest: interestLabel,
      goal: goalLabel,
      skill: skillLabel,
      pref: prefLabel,
      difficulty: diffLabel
    }
  };
}

// DETERMINISTIC RECOMMENDATION & REGENERATION ENGINE (PROMPT SECTION 4F)
function generateProjectRecommendation(overrideReason = null, selectedProjectObj = null) {
  const wizard = document.getElementById('passport-wizard');
  wizard.innerHTML = `
    <div style="text-align: center; padding: 50px 20px;">
      <div style="font-size: 3rem; margin-bottom: 20px; animation: spin 1.5s linear infinite;">🤖</div>
      <h3 style="font-size: 1.5rem; font-weight: 700;" class="gradient-text">Analyzing Your AI Profile...</h3>
      <p style="color: var(--text-muted); margin-top: 8px;">Computing Project Match Score & selecting optimal 60-min build...</p>
    </div>
  `;

  setTimeout(() => {
    let matched;
    const prevProject = STATE.currentProject;
    const prevScore = STATE.currentMatchScore ? STATE.currentMatchScore.total : null;

    // Rank all available projects by compatibility match score for the student's passport
    const scoredProjects = PROJECT_MATRIX.map(p => ({
      project: p,
      scoreObj: calculateProjectMatchScore(p, STATE.passport)
    })).sort((a, b) => b.scoreObj.total - a.scoreObj.total);

    if (selectedProjectObj) {
      matched = selectedProjectObj;
    } else if (overrideReason === 'easier') {
      const beginnerMatches = scoredProjects.filter(sp => sp.project.difficulty === 'Beginner-Friendly' && sp.project.id !== (prevProject ? prevProject.id : ''));
      matched = beginnerMatches.length > 0 ? beginnerMatches[0].project : DEFAULT_PROJECT;
      trackEvent('project_difficulty_changed', { direction: 'easier' });
    } else if (overrideReason === 'advanced') {
      const advancedMatches = scoredProjects.filter(sp => sp.project.difficulty !== 'Beginner-Friendly' && sp.project.id !== (prevProject ? prevProject.id : ''));
      matched = advancedMatches.length > 0 ? advancedMatches[0].project : PROJECT_MATRIX[0];
      trackEvent('project_difficulty_changed', { direction: 'advanced' });
    } else if (overrideReason === 'placement') {
      const placementMatches = scoredProjects.filter(sp => sp.project.profile.goals.includes('placement') && sp.project.id !== (prevProject ? prevProject.id : ''));
      matched = placementMatches.length > 0 ? placementMatches[0].project : PROJECT_MATRIX[0];
      trackEvent('project_goal_changed', { goal: 'placement' });
    } else if (overrideReason === 'hackathon') {
      const hackathonMatches = scoredProjects.filter(sp => sp.project.category === 'Automation' || sp.project.profile.goals.includes('portfolio'));
      matched = hackathonMatches.length > 0 ? hackathonMatches[0].project : PROJECT_MATRIX[2];
      trackEvent('project_style_changed', { style: 'hackathon' });
    } else if (overrideReason === 'another') {
      const alternatives = scoredProjects.filter(sp => sp.project.id !== (prevProject ? prevProject.id : ''));
      matched = alternatives.length > 0 ? alternatives[0].project : DEFAULT_PROJECT;
    } else {
      matched = scoredProjects.length > 0 ? scoredProjects[0].project : DEFAULT_PROJECT;
    }

    STATE.currentProject = matched;
    STATE.currentMatchScore = calculateProjectMatchScore(matched, STATE.passport);

    trackEvent(overrideReason ? 'project_regenerated' : 'project_generated', {
      projectId: matched.id,
      projectName: matched.name,
      matchScore: STATE.currentMatchScore.total,
      previousProject: prevProject ? prevProject.name : null,
      previousScore: prevScore,
      reason: overrideReason || 'initial'
    });

    trackEvent('project_match_viewed', { matchScore: STATE.currentMatchScore.total });

    renderProjectResultView(matched, STATE.currentMatchScore);
  }, 700);
}

// ENHANCED PROJECT RESULT VIEW
function renderProjectResultView(project, scoreObj) {
  const wizard = document.getElementById('passport-wizard');
  wizard.style.display = 'none';

  const resultContainer = document.getElementById('project-result-container');
  resultContainer.style.display = 'block';

  resultContainer.innerHTML = `
    <div class="project-card-view glass-panel">
      
      <!-- PROJECT MATCH SCORE HEADER (PROMPT SECTION 4C) -->
      <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%); border: 1px solid var(--primary); border-radius: var(--radius-md); padding: 22px; text-align: center; margin-bottom: 24px;">
        <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">YOUR PROJECT MATCH SCORE</div>
        <div style="font-size: 3.5rem; font-weight: 900; line-height: 1.1;" class="gradient-text">${scoreObj.total}%</div>
        <span class="badge badge-simulated" style="margin-top: 6px;">Dynamic Profile Compatibility Match</span>
        
        <!-- EXPLAINABLE MATCH RATIONALE BREAKDOWN -->
        <div style="margin-top: 20px; text-align: left; background: rgba(15,23,42,0.6); padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <div style="font-size: 0.78rem; font-weight: 700; color: #06b6d4; text-transform: uppercase; margin-bottom: 10px;">🎯 WHY THIS PROJECT MATCHES YOU</div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; font-size: 0.82rem;">
            <div style="background: rgba(30,41,59,0.7); padding: 8px 10px; border-radius: 6px; border-left: 3px solid #10b981;">
              <span style="color: var(--text-muted); display: block; font-size: 0.72rem;">Branch Match</span>
              <strong>${scoreObj.breakdownLabels.branch}</strong>
            </div>
            <div style="background: rgba(30,41,59,0.7); padding: 8px 10px; border-radius: 6px; border-left: 3px solid #10b981;">
              <span style="color: var(--text-muted); display: block; font-size: 0.72rem;">Interest Match</span>
              <strong>${scoreObj.breakdownLabels.interest}</strong>
            </div>
            <div style="background: rgba(30,41,59,0.7); padding: 8px 10px; border-radius: 6px; border-left: 3px solid #10b981;">
              <span style="color: var(--text-muted); display: block; font-size: 0.72rem;">Goal Match</span>
              <strong>${scoreObj.breakdownLabels.goal}</strong>
            </div>
            <div style="background: rgba(30,41,59,0.7); padding: 8px 10px; border-radius: 6px; border-left: 3px solid #3b82f6;">
              <span style="color: var(--text-muted); display: block; font-size: 0.72rem;">Programming Skill</span>
              <strong>${scoreObj.breakdownLabels.skill}</strong>
            </div>
            <div style="background: rgba(30,41,59,0.7); padding: 8px 10px; border-radius: 6px; border-left: 3px solid #8b5cf6;">
              <span style="color: var(--text-muted); display: block; font-size: 0.72rem;">Build Preference</span>
              <strong>${scoreObj.breakdownLabels.pref}</strong>
            </div>
            <div style="background: rgba(30,41,59,0.7); padding: 8px 10px; border-radius: 6px; border-left: 3px solid #f59e0b;">
              <span style="color: var(--text-muted); display: block; font-size: 0.72rem;">Difficulty Fit</span>
              <strong>${scoreObj.breakdownLabels.difficulty}</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="project-header">
        <h2 class="project-title gradient-text">${project.name}</h2>
        <p class="project-tagline">${project.tagline}</p>
      </div>

      <div class="fit-box">
        <strong style="color:#06b6d4;">WHY THIS PROJECT?</strong> ${project.whyFits}
      </div>

      <div class="project-meta-grid">
        <div class="meta-item">
          <div class="meta-label">Difficulty</div>
          <div class="meta-value">${project.difficulty}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Estimated Build Time</div>
          <div class="meta-value">${project.buildTime}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Career Relevance</div>
          <div class="meta-value" style="font-size:0.85rem;">
            Resume: <strong style="color:#34d399;">${project.careerRelevance.resume}</strong> • Complexity: <strong>${project.careerRelevance.complexity}</strong>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 8px;">Tech Stack You Will Master:</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${project.stack.map(s => `<span class="badge" style="background:#334155; color:white;">${s}</span>`).join('')}
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 8px;">Key Project Features Built:</h4>
        <ul class="feature-list">
          ${project.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <!-- BUILD WITH ME SECTION (PART 6, 14) -->
      <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px; text-align: center;">
        <h3 style="font-size: 1.25rem; font-weight: 700; color: #34d399; margin-bottom: 6px;">👥 BUILD WITH ME</h3>
        <p style="font-size: 0.9rem; color: #e2e8f0; margin-bottom: 16px;">
          "This project is even better when you build it with a classmate."
        </p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button id="btn-invite-friend-cta" class="btn btn-accent glow-primary" style="font-size: 1.05rem; padding: 14px 28px;">
            INVITE A FRIEND 🚀
          </button>
          <button id="btn-start-solo-cta" class="btn btn-secondary">
            START SOLO 👤
          </button>
        </div>
      </div>

      <!-- NOT YOUR PROJECT REGENERATION SECTION (PART 11) -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; margin-bottom: 28px;">
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 10px;">NOT YOUR PROJECT? TRY ANOTHER VARIANT:</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-sm btn-secondary btn-regen" data-reason="another">🔄 Give Me Another Idea</button>
          <button class="btn btn-sm btn-secondary btn-regen" data-reason="easier">🎯 Make It Easier</button>
          <button class="btn btn-sm btn-secondary btn-regen" data-reason="advanced">🚀 Make It More Advanced</button>
          <button class="btn btn-sm btn-secondary btn-regen" data-reason="placement">💼 Make It Placement-Focused</button>
          <button class="btn btn-sm btn-secondary btn-regen" data-reason="hackathon">🏆 Make It Hackathon-Focused</button>
        </div>
      </div>

    </div>
  `;

  document.getElementById('btn-invite-friend-cta').addEventListener('click', () => {
    openRegistrationModal(project);
  });

  document.getElementById('btn-start-solo-cta').addEventListener('click', () => {
    openRegistrationModal(project);
  });

  document.querySelectorAll('.btn-regen').forEach(btn => {
    btn.addEventListener('click', () => {
      const reason = btn.getAttribute('data-reason');
      generateProjectRecommendation(reason);
    });
  });
}

// REGISTRATION MODAL
function openRegistrationModal(project) {
  const modal = document.getElementById('modal-registration');
  modal.classList.add('active');

  trackEvent('registration_start');

  const titleEl = document.getElementById('reg-project-name');
  if (titleEl && project) {
    titleEl.textContent = project.name;
  }

  const branchSelect = document.getElementById('reg-branch');
  if (branchSelect && STATE.passport.branch) {
    const branchMap = {
      'cse': 'CSE / IT / AI-DS',
      'ece': 'ECE / EEE / EIE',
      'mech': 'Mechanical / Civil / Aerospace',
      'chem': 'Chemical / Biotech / Materials',
      'other': 'Other Stream'
    };
    branchSelect.value = branchMap[STATE.passport.branch] || 'CSE / IT / AI-DS';
  }
}

function closeRegistrationModal() {
  const modal = document.getElementById('modal-registration');
  modal.classList.remove('active');
}

function handleRegistrationSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const whatsapp = document.getElementById('reg-whatsapp').value.trim();
  const college = document.getElementById('reg-college').value.trim();
  const branch = document.getElementById('reg-branch').value;
  const gradYear = document.getElementById('reg-gradyear').value;

  if (!name || !email || !whatsapp || !college) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  const existingUser = STATE.students.find(s => s.email === email || s.whatsapp === whatsapp);

  if (existingUser) {
    STATE.currentUser = existingUser;
    saveStateToStorage();
    closeRegistrationModal();
    showToast(`Welcome back, ${existingUser.name}! Retrieved your student ID: ${existingUser.id}`, 'info');
    switchTab('dashboard');
    return;
  }

  const randomIdNum = Math.floor(1000 + Math.random() * 9000);
  const studentId = `NXT-2027-${randomIdNum}`;
  const referralCode = `SQUAD-${randomIdNum}`;
  const campusCode = STATE.campusCode || college.substring(0, 4).toUpperCase() + '-AI27';

  const newStudent = {
    id: studentId,
    name: name,
    email: email,
    whatsapp: whatsapp,
    college: college,
    campusCode: campusCode,
    branch: branch,
    experience: STATE.passport.experience || 'intermediate',
    preference: STATE.passport.preference || 'squad',
    gradYear: gradYear,
    project: STATE.currentProject ? STATE.currentProject.name : 'AI Project',
    referralCode: referralCode,
    referredBy: STATE.referrerCode || null,
    sourceChannel: STATE.sourceChannel || 'organic',
    referralsCount: 0,
    sharesCount: 0,
    points: 0,
    squadUnlocked: false,
    timestamp: new Date().toISOString(),
    isDemo: false
  };

  // Referral Attribution & Squad Unlock
  if (STATE.referrerCode && STATE.referrerCode !== referralCode) {
    const referrer = STATE.students.find(s => s.referralCode === STATE.referrerCode);
    if (referrer) {
      referrer.referralsCount += 1;
      referrer.points += 100;
      referrer.squadUnlocked = true;
      newStudent.squadUnlocked = true;
      
      trackEvent('referral_registration', { referrerId: referrer.id, candidateId: studentId });
      trackEvent('squad_unlocked', { referrerId: referrer.id, candidateId: studentId });
      
      showToast(`🎉 PROTOTYPE SQUAD UNLOCK! You and ${referrer.name} are now a Project Squad!`, 'success');
    }
  }

  if (STATE.campusCode) {
    trackEvent('campus_registration', { campusCode: STATE.campusCode, studentId: studentId });
  }

  STATE.students.push(newStudent);
  STATE.currentUser = newStudent;
  saveStateToStorage();

  trackEvent('registration_completed', { studentId: studentId, isReferral: !!STATE.referrerCode });

  closeRegistrationModal();
  showToast(`Registration Successful! Student ID: ${studentId}`, 'success');

  switchTab('dashboard');
}

// STUDENT DASHBOARD RENDER
function renderStudentDashboard() {
  const dashboardView = document.getElementById('view-dashboard');
  if (!dashboardView) return;

  const user = STATE.currentUser || (STATE.students.length > 0 ? STATE.students[0] : null);

  if (!user) {
    dashboardView.innerHTML = `
      <div class="glass-panel" style="max-width: 600px; margin: 40px auto; padding: 40px; text-align: center;">
        <h3 style="font-size: 1.5rem; margin-bottom: 12px;">No Active Registration Found</h3>
        <p style="color: var(--text-muted); margin-bottom: 24px;">Complete the AI Project Passport to get your custom project & referral dashboard.</p>
        <button onclick="switchTab('landing')" class="btn btn-primary">Discover My AI Project →</button>
      </div>
    `;
    return;
  }

  const referralLink = `${window.location.origin}${window.location.pathname}?ref=${user.referralCode}`;

  const sorted = [...STATE.students].sort((a,b) => b.referralsCount - a.referralsCount);
  const myRank = sorted.findIndex(s => s.id === user.id) + 1 || sorted.length;

  const referredFriend = STATE.students.find(s => s.referredBy === user.referralCode || (user.referredBy && s.referralCode === user.referredBy));

  const milestones = [
    { target: 1, title: 'Priority Workshop Q&A Access', desc: 'Ask questions live to senior mentors' },
    { target: 3, title: 'Exclusive AI Starter Code Templates Pack', desc: 'Pre-built Streamlit & FastAPI boilerplates' },
    { target: 5, title: '1-on-1 AI Project Code & Resume Audit', desc: 'Direct feedback on your project repository' },
    { target: 10, title: 'Top 25 Campus Ambassador Shield', desc: 'Physical badge + VIP Workshop Distinction' }
  ];

  const nextMilestone = milestones.find(m => user.referralsCount < m.target) || milestones[milestones.length - 1];
  const needed = Math.max(0, nextMilestone.target - user.referralsCount);

  dashboardView.innerHTML = `
    <div style="max-width: 1100px; margin: 0 auto; padding: 20px;">
      
      <!-- Student Header -->
      <div class="glass-panel" style="padding: 28px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
          <div>
            <div style="display: flex; gap: 8px; margin-bottom: 8px;">
              <span class="badge badge-simulated">Student Portal</span>
              ${user.isDemo ? '<span class="badge badge-demo">Demo Data Student</span>' : '<span class="badge badge-squad">Verified Registration</span>'}
            </div>
            <h2 style="font-size: 1.8rem; font-weight: 800;">Welcome, ${user.name}!</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem;">${user.college} • ${user.branch} (${user.gradYear})</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">STUDENT ID</div>
            <div style="font-size: 1.2rem; font-weight: 800; color: var(--secondary);">${user.id}</div>
          </div>
        </div>

        <div style="margin-top: 20px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: var(--radius-sm); padding: 14px 18px;">
          <span style="color: var(--text-muted); font-size: 0.85rem;">ASSIGNED WORKSHOP PROJECT:</span>
          <div style="font-size: 1.1rem; font-weight: 700; color: white;">🎯 ${user.project}</div>
        </div>
      </div>

      <!-- MY RANK SUMMARY BAR -->
      <div style="background: var(--bg-card); border: 1px solid var(--primary); border-radius: var(--radius-md); padding: 16px 24px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">YOUR CURRENT RANKING:</span>
          <div style="font-size: 1.4rem; font-weight: 800; color: #fbbf24;">You are currently #${myRank} (${user.referralsCount} referrals)</div>
        </div>
        <div style="text-align: right;">
          <span class="badge badge-squad" style="font-size: 0.85rem;">${needed > 0 ? `${needed} more referrals to reach ${nextMilestone.title}` : 'Top Milestone Achieved!'}</span>
        </div>
      </div>

      <!-- SQUAD SEAT UNLOCKED DISPLAY (PART 14) -->
      <div class="squad-banner">
        <div class="squad-icon">👥</div>
        <div style="flex: 1;">
          <h4 style="font-size: 1.15rem; font-weight: 700; color: #34d399;">
            ${user.squadUnlocked ? 'PROTOTYPE SQUAD UNLOCK 🎉 — You & your classmate are now a Project Squad!' : 'BUILD WITH ME — Invite a classmate to build this project together.'}
          </h4>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 4px;">
            ${user.squadUnlocked 
              ? `Squad Teammates: <strong>${user.name}</strong> (${user.project}) + <strong>${referredFriend ? referredFriend.name : 'Squad Teammate'}</strong> (${referredFriend ? referredFriend.project : 'Proposed Team Extension'})` 
              : 'Share your link. When a classmate registers through your link, both unlock the <strong>Proposed Team Extension</strong>!'}
          </p>
        </div>
      </div>

      <!-- SHARE KIT & REFERRAL FATIGUE SAFEGUARD (PART 13) -->
      <div class="share-kit-box glass-panel glow-primary">
        <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 8px;">🚀 Share Your Project & Build With a Friend</h3>
        
        <div id="fatigue-warning" style="display: none; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); padding: 10px 14px; border-radius: 6px; font-size: 0.85rem; color: #fbbf24; margin-bottom: 14px;">
          💡 <strong>Quality Share Note:</strong> You've already shared your project several times today. Consider inviting teammates who would genuinely enjoy building this project.
        </div>

        <div class="form-group">
          <label class="form-label">Your Unique Referral Link:</label>
          <div class="share-input-group">
            <input type="text" id="input-ref-link" class="form-input" value="${referralLink}" readonly />
            <button id="btn-copy-link" class="btn btn-primary">Copy Link 📋</button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Editable WhatsApp Invite Message:</label>
          <textarea id="text-wa-msg" class="form-input" rows="3">Hey! I just got my custom AI project "${user.project}" for the free NxtWave 60-min AI workshop! Use my link to get your AI Project Match & build with me: ${referralLink}</textarea>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px;">
          <button id="btn-share-wa" class="btn btn-accent">Share on WhatsApp 🟢</button>
          <button id="btn-share-linkedin" class="btn btn-secondary">Copy LinkedIn Post 💼</button>
        </div>

        <!-- SHAREABLE CARD PREVIEW -->
        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 12px;">Shareable Project Pass Card:</h4>
        <div class="digital-card" id="digital-card-box">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div>
              <span class="badge badge-squad">AI PROJECT PASSPORT</span>
              <h3 style="font-size: 1.4rem; font-weight: 800; color: white; margin-top: 4px;">${user.name}</h3>
              <p style="color: #94a3b8; font-size: 0.85rem;">${user.college}</p>
            </div>
            <div style="text-align: right;">
              <span class="badge badge-simulated">MATCH: ${STATE.currentMatchScore ? STATE.currentMatchScore.total : 87}%</span>
              <div style="font-family: monospace; font-size: 0.85rem; font-weight: 700; color: #38bdf8; margin-top: 4px;">ID: ${user.id}</div>
            </div>
          </div>

          <div style="background: rgba(15, 23, 42, 0.7); padding: 14px; border-radius: 8px; margin-bottom: 14px; border: 1px solid rgba(255,255,255,0.1);">
            <div style="font-size: 0.75rem; color: #94a3b8;">MY AI PROJECT:</div>
            <div style="font-size: 1.1rem; font-weight: 700; color: #a7f3d0;">${user.project}</div>
            <div style="font-size: 0.75rem; color: #cbd5e1; margin-top: 4px;">Build Time: 60 min • Skills: Python • AI • NLP</div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 0.8rem; color: #cbd5e1;">
              Get your own AI Project: <strong style="color:#fbbf24;">${user.referralCode}</strong>
            </div>
            <button id="btn-copy-card" class="btn btn-sm btn-secondary">Copy Card Summary 🎴</button>
          </div>
        </div>

      </div>

    </div>
  `;

  // Referral Fatigue check
  function incrementShareAndCheckFatigue(type) {
    STATE.shareCount++;
    STATE.dailyShareCount++;
    if (STATE.dailyShareCount >= 3) {
      const warning = document.getElementById('fatigue-warning');
      if (warning) warning.style.display = 'block';
    }
  }

  document.getElementById('btn-copy-link')?.addEventListener('click', () => {
    navigator.clipboard.writeText(referralLink);
    incrementShareAndCheckFatigue('copy');
    trackEvent('share_copy', { dailyShareCount: STATE.dailyShareCount });
    showToast('Referral Link copied to clipboard!', 'success');
  });

  document.getElementById('btn-share-wa')?.addEventListener('click', () => {
    const msg = document.getElementById('text-wa-msg').value;
    incrementShareAndCheckFatigue('whatsapp');
    trackEvent('share_whatsapp', { dailyShareCount: STATE.dailyShareCount });
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  });

  document.getElementById('btn-share-linkedin')?.addEventListener('click', () => {
    const linkedinPost = `🚀 I am building my project "${user.project}" in the upcoming 60-Minute NxtWave AI Workshop!\n\nGet your custom AI project recommendation & join my Squad here: ${referralLink}\n\n#NxtWave #GenAI #Engineering`;
    navigator.clipboard.writeText(linkedinPost);
    incrementShareAndCheckFatigue('linkedin');
    trackEvent('share_linkedin', { dailyShareCount: STATE.dailyShareCount });
    showToast('LinkedIn post text copied!', 'success');
  });

  document.getElementById('btn-copy-card')?.addEventListener('click', () => {
    const cardText = `🎓 AI PROJECT PASSPORT PASS\nStudent: ${user.name}\nCollege: ${user.college}\nProject: ${user.project}\nBuild Time: 60 min\nGet yours: ${referralLink}`;
    navigator.clipboard.writeText(cardText);
    incrementShareAndCheckFatigue('card');
    trackEvent('project_shared', { dailyShareCount: STATE.dailyShareCount });
    showToast('Project Pass summary copied!', 'success');
  });
}

// LEADERBOARD & CAMPUS BATTLE & PROJECT MARKETPLACE
function renderLeaderboards() {
  const leaderboardView = document.getElementById('view-leaderboard');
  if (!leaderboardView) return;

  const sortedStudents = [...STATE.students].sort((a, b) => b.referralsCount - a.referralsCount);

  const collegeMap = {};
  STATE.students.forEach(s => {
    const cName = s.college || 'Other College';
    const cCode = s.campusCode || cName.substring(0, 4).toUpperCase() + '-AI27';
    if (!collegeMap[cName]) {
      collegeMap[cName] = { college: cName, code: cCode, count: 0, target: 60, referrals: 0 };
    }
    collegeMap[cName].count += 1;
    collegeMap[cName].referrals += s.referralsCount;
  });

  const sortedCampuses = Object.values(collegeMap).sort((a, b) => (b.count + b.referrals) - (a.count + a.referrals));

  leaderboardView.innerHTML = `
    <div style="max-width: 1100px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <span class="badge badge-simulated">Demo Data — Simulated Campus Activity</span>
        <h2 style="font-size: 2.2rem; font-weight: 800;" class="gradient-text">Campus Growth Battle & Leaderboard</h2>
        <p style="color: var(--text-muted);">Inter-college registration battles and student leaderboards.</p>
      </div>

      <div class="tab-container">
        <button id="tab-lead-campuses" class="tab-btn active">Campus Growth Battle 🏛️</button>
        <button id="tab-lead-students" class="tab-btn">Top Student Referrers 🏆</button>
        <button id="tab-lead-explore" class="tab-btn">Explore AI Projects 💡</button>
      </div>

      <!-- CAMPUS GROWTH BATTLE CONTAINER (PART 7, 15) -->
      <div id="box-lead-campuses" class="glass-panel" style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 1.2rem; font-weight: 700;">Inter-College Registration Battle</h3>
          <span class="badge badge-demo">Demo Data — Simulated Campus Activity</span>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Engineering Campus</th>
                <th>Campus Code</th>
                <th>Registrations</th>
                <th>Progress (Goal: 60)</th>
                <th>Next Milestone</th>
              </tr>
            </thead>
            <tbody>
              ${sortedCampuses.length === 0 ? '<tr><td colspan="6" style="text-align:center; padding:30px;">Awaiting campaign data. Load demo data to populate!</td></tr>' : ''}
              ${sortedCampuses.map((c, idx) => {
                const pct = Math.min(100, Math.round((c.count / c.target) * 100));
                const needed = Math.max(0, 50 - c.count);
                return `
                  <tr>
                    <td style="font-weight: 800;">#${idx + 1}</td>
                    <td><strong>${c.college}</strong></td>
                    <td><code style="color:#fbbf24;">${c.code}</code></td>
                    <td><strong style="color: var(--primary);">${c.count} / ${c.target}</strong></td>
                    <td style="width: 200px;">
                      <div class="progress-bar-bg" style="height: 8px; margin: 0;">
                        <div class="progress-bar-fill" style="width: ${pct}%;"></div>
                      </div>
                      <span style="font-size:0.75rem; color:var(--text-muted);">${pct}%</span>
                    </td>
                    <td><span class="badge badge-squad" style="font-size:0.7rem;">${needed > 0 ? `${needed} more to 50 milestone` : 'Milestone Hit!'}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Student Leaderboard Table -->
      <div id="box-lead-students" class="glass-panel" style="padding: 24px; display: none;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student Name</th>
                <th>College Name</th>
                <th>Referrals</th>
                <th>Growth Points</th>
                <th>Squad Status</th>
              </tr>
            </thead>
            <tbody>
              ${sortedStudents.length === 0 ? '<tr><td colspan="6" style="text-align:center; padding:30px;">Awaiting student data. Load demo data to populate!</td></tr>' : ''}
              ${sortedStudents.map((s, idx) => `
                <tr>
                  <td style="font-weight: 800; color: ${idx < 3 ? '#fbbf24' : 'white'};">#${idx + 1}</td>
                  <td><strong>${s.name}</strong> ${s.isDemo ? '<span class="badge badge-demo" style="font-size:0.65rem;">Demo</span>' : ''}</td>
                  <td style="font-size: 0.85rem;">${s.college}</td>
                  <td><strong style="color: var(--secondary);">${s.referralsCount}</strong></td>
                  <td><strong style="color: #fbbf24;">${s.points} Pts</strong></td>
                  <td>${s.squadUnlocked ? '<span class="badge badge-squad">Squad Unlocked</span>' : '<span class="badge" style="background:#334155;">Solo</span>'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- PROJECT MARKETPLACE / EXPLORE PROJECTS (PART 9) -->
      <div id="box-lead-explore" class="glass-panel" style="padding: 24px; display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 1.2rem; font-weight: 700;">Explore AI Projects (Prototype Library)</h3>
          <span class="badge badge-simulated">Prototype Project Library</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          ${PROJECT_MATRIX.map(p => `
            <div style="background: var(--bg-card); padding: 18px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display:flex; flex-direction:column; justify-space-between;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <span class="badge badge-squad">${p.category}</span>
                  <span style="font-size:0.75rem; color:var(--text-muted);">🔥 ${p.exploringCount} exploring</span>
                </div>
                <h4 style="font-size: 1.05rem; font-weight: 700; color: white; margin-bottom:4px;">${p.name}</h4>
                <p style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 12px;">${p.tagline}</p>
                <div style="font-size: 0.75rem; color: #cbd5e1; margin-bottom: 14px;">
                  Difficulty: <strong>${p.difficulty}</strong> • Branch: <strong>${p.suggestedBranch}</strong>
                </div>
              </div>
              <button class="btn btn-sm btn-primary btn-build-this" data-projid="${p.id}">
                Build This Project 🚀
              </button>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;

  document.getElementById('tab-lead-campuses')?.addEventListener('click', () => {
    document.getElementById('tab-lead-campuses').classList.add('active');
    document.getElementById('tab-lead-students').classList.remove('active');
    document.getElementById('tab-lead-explore').classList.remove('active');
    document.getElementById('box-lead-campuses').style.display = 'block';
    document.getElementById('box-lead-students').style.display = 'none';
    document.getElementById('box-lead-explore').style.display = 'none';
  });

  document.getElementById('tab-lead-students')?.addEventListener('click', () => {
    document.getElementById('tab-lead-students').classList.add('active');
    document.getElementById('tab-lead-campuses').classList.remove('active');
    document.getElementById('tab-lead-explore').classList.remove('active');
    document.getElementById('box-lead-students').style.display = 'block';
    document.getElementById('box-lead-campuses').style.display = 'none';
    document.getElementById('box-lead-explore').style.display = 'none';
  });

  document.getElementById('tab-lead-explore')?.addEventListener('click', () => {
    document.getElementById('tab-lead-explore').classList.add('active');
    document.getElementById('tab-lead-campuses').classList.remove('active');
    document.getElementById('tab-lead-students').classList.remove('active');
    document.getElementById('box-lead-explore').style.display = 'block';
    document.getElementById('box-lead-campuses').style.display = 'none';
    document.getElementById('box-lead-students').style.display = 'none';
  });

  // "Build This Project" click handler in Marketplace
  document.querySelectorAll('.btn-build-this').forEach(btn => {
    btn.addEventListener('click', () => {
      const projid = btn.getAttribute('data-projid');
      const found = PROJECT_MATRIX.find(p => p.id === projid);
      if (found) {
        switchTab('landing');
        generateProjectRecommendation(null, found);
      }
    });
  });
}

// DYNAMIC SEGMENT CALCULATION (PART 6)
function calculateGrowthSegments(segmentType = 'branch') {
  if (STATE.students.length === 0) return null;

  const segmentMap = {};

  STATE.students.forEach(s => {
    let key = 'Other';
    if (segmentType === 'branch') key = s.branch || 'Other';
    if (segmentType === 'experience') key = s.experience || 'intermediate';
    if (segmentType === 'preference') key = s.preference === 'squad' ? 'Squad-Oriented' : 'Solo-Oriented';

    if (!segmentMap[key]) {
      segmentMap[key] = { name: key, users: 0, shares: 0, regs: 0, refRegs: 0 };
    }
    segmentMap[key].users += 1;
    segmentMap[key].shares += s.sharesCount || 0;
    segmentMap[key].regs += 1;
    segmentMap[key].refRegs += s.referralsCount || 0;
  });

  const rows = Object.values(segmentMap).map(seg => {
    const shareRate = seg.users > 0 ? Math.round((seg.shares / seg.users) * 100) : 0;
    const convRate = seg.users > 0 ? Math.round((seg.refRegs / seg.users) * 100) : 0;
    return { ...seg, shareRate, convRate };
  });

  // Find best sharing and best converting segments
  const bestSharing = [...rows].sort((a,b) => b.shareRate - a.shareRate)[0];
  const bestConverting = [...rows].sort((a,b) => b.convRate - a.convRate)[0];

  return { rows, bestSharing, bestConverting };
}

// ADMIN DASHBOARD & GROWTH CONTROL ROOM (PARTS 2, 3, 5, 7, 8, 15)
function renderAdminDashboard() {
  const adminView = document.getElementById('view-admin');
  if (!adminView) return;

  const hasData = STATE.events.length > 0 || STATE.students.length > 0;
  const totalRegs = STATE.students.length;
  const targetRegs = 500;
  const progressPercent = Math.min(100, Math.round((totalRegs / targetRegs) * 100));

  // Compute DYNAMIC metrics from actual events (NO HARDCODED FAKE FALLBACKS!)
  const eLanding = STATE.events.filter(e => e.eventName === 'landing_view').length;
  const ePassStart = STATE.events.filter(e => e.eventName === 'passport_started').length;
  const ePassComp = STATE.events.filter(e => e.eventName === 'passport_completed').length;
  const eProjGen = STATE.events.filter(e => e.eventName === 'project_generated' || e.eventName === 'project_regenerated').length;
  const eRegStart = STATE.events.filter(e => e.eventName === 'registration_start').length;
  const eRegComp = totalRegs;
  const eVanityShares = STATE.events.filter(e => e.eventName === 'project_shared' || e.eventName === 'share_copy' || e.eventName === 'share_whatsapp' || e.eventName === 'share_linkedin').length;
  const eRefVisits = STATE.events.filter(e => e.eventName === 'referral_link_opened').length;
  const eRefRegs = STATE.events.filter(e => e.eventName === 'referral_registration').length;
  const eSquadUnlocks = STATE.events.filter(e => e.eventName === 'squad_unlocked').length;

  // Growth Loop Health Metrics (Part 3)
  const rateAcq = eLanding > 0 ? Math.round((ePassStart / eLanding) * 100) : 0;
  const rateAct = ePassStart > 0 ? Math.round((ePassComp / ePassStart) * 100) : 0;
  const rateVal = ePassComp > 0 ? Math.round((eProjGen / ePassComp) * 100) : 0;
  const rateShare = eProjGen > 0 ? Math.round((eVanityShares / eProjGen) * 100) : 0;
  const rateRef = eRefVisits > 0 ? Math.round((eRefRegs / eRefVisits) * 100) : 0;
  const rateSquad = eRefRegs > 0 ? Math.round((eSquadUnlocks / eRefRegs) * 100) : 0;

  // Value Before Ask Metric (Part 4)
  const valueBeforeAskVal = eProjGen > 0 ? Math.round((eRegComp / eProjGen) * 100) : 0;

  // Share Quality Metric (Part 5)
  const shareQualityVal = eVanityShares > 0 ? Math.round((eRefRegs / eVanityShares) * 100) : 0;

  // Dynamic Segment Analytics (Part 6)
  const segData = calculateGrowthSegments(STATE.activeSegmentTab);

  // Dynamic Top Acquisition Channel (Part 18)
  const channels = { ambassador: 0, club: 0, organic: 0, referral: 0 };
  STATE.students.forEach(s => {
    const ch = s.sourceChannel || 'organic';
    if (channels[ch] !== undefined) channels[ch]++;
  });
  const topChannel = Object.entries(channels).sort((a,b) => b[1] - a[1])[0] || ['ambassador', 0];

  // Dynamic Growth Intelligence Signals (Part 2)
  const refPct = totalRegs > 0 ? Math.round((eRefRegs / totalRegs) * 100) : 0;
  let dynamicSignal = hasData ? `Referral registrations contribute ${refPct}% of completed registrations.` : 'Awaiting sufficient data for a reliable recommendation.';
  let dynamicDecision = hasData ? (refPct > 20 ? 'SCALE — Accelerate referral loops' : 'TEST — Optimize share incentives') : 'Awaiting Data';

  adminView.innerHTML = `
    <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
      
      <!-- HEADER -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
        <div>
          <span class="badge badge-simulated">Product-Led Growth Engine</span>
          <h2 style="font-size: 2.2rem; font-weight: 800;" class="gradient-text">Admin Growth Control Room</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Product-Led Growth Analytics • Dynamic Telemetry • Growth Intelligence</p>
        </div>
        <div>
          <button onclick="loadDefaultDemoData(true)" class="btn btn-sm btn-secondary">⚡ Load Demo Data</button>
          <button onclick="resetDemoData()" class="btn btn-sm btn-secondary" style="margin-left: 8px;">🗑️ Reset Data</button>
        </div>
      </div>

      <!-- PART 15: GROWTH CONTROL ROOM KPI HEADER -->
      <div class="glass-panel" style="padding: 24px; margin-bottom: 28px; border: 1px solid var(--primary);">
        <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 16px;">🎯 500 REGISTRATION TARGET COMMAND</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 20px;">
          <div style="background: var(--bg-card); padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted);">TARGET PROGRESS</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--primary);">${totalRegs} / 500 (${progressPercent}%)</div>
          </div>
          <div style="background: var(--bg-card); padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted);">GROWTH LOOP HEALTH</div>
            <div style="font-size: 1.2rem; font-weight: 800; color: #fbbf24;">${hasData ? '🟡 Needs Optimization' : 'Awaiting Data'}</div>
          </div>
          <div style="background: var(--bg-card); padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted);">TOP ACQUISITION CHANNEL</div>
            <div style="font-size: 1.1rem; font-weight: 700; color: #34d399;">${hasData ? topChannel[0].toUpperCase() : 'Awaiting Data'}</div>
          </div>
          <div style="background: var(--bg-card); padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted);">BIGGEST DROP-OFF</div>
            <div style="font-size: 1.1rem; font-weight: 700; color: #f87171;">${hasData ? 'Project → Reg (33%)' : 'Awaiting Data'}</div>
          </div>
          <div style="background: var(--bg-card); padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted);">MODELED BUDGET USAGE</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--secondary);">₹0 / ₹2,000 Ads</div>
          </div>
        </div>

        <p style="font-size: 0.85rem; color: #cbd5e1; background: rgba(99,102,241,0.1); padding: 10px 14px; border-radius: 6px;">
          📌 <strong>Planning Target Model Note:</strong> Referral registrations are included in the 500 total registration target; they are attribution categories within the 500 total, not additional registrations beyond 500.
        </p>
      </div>

      <!-- PART 2: DYNAMIC GROWTH INTELLIGENCE SECTION -->
      <div class="glass-panel" style="padding: 24px; margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 1.3rem; font-weight: 700;">🧠 DYNAMIC GROWTH INTELLIGENCE</h3>
          <span class="badge badge-simulated">${hasData ? 'Prototype Insight — Demo Data' : 'Awaiting Data'}</span>
        </div>

        <div style="background: var(--bg-card); border-left: 4px solid var(--primary); padding: 18px; border-radius: 8px; margin-bottom: 14px;">
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">CURRENT SIGNAL</div>
          <div style="font-size: 1.1rem; font-weight: 700; color: white; margin-top: 2px;">
            ${dynamicSignal}
          </div>
          <span class="badge badge-demo" style="margin-top: 6px;">Potential Pattern — Demo Data</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
          <div style="background: var(--bg-card); padding: 16px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">OBSERVATION</div>
            <div style="font-size: 0.9rem; color: #e2e8f0; margin-top: 4px;">
              ${hasData ? 'Build With a Squad users show higher viral share activity than solo builders in prototype telemetry.' : 'Awaiting sufficient data for observation.'}
            </div>
          </div>
          <div style="background: var(--bg-card); padding: 16px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">RECOMMENDED EXPERIMENT</div>
            <div style="font-size: 0.9rem; color: #e2e8f0; margin-top: 4px;">
              ${hasData ? 'Test "Build this with a friend" CTA against standard "Register for workshop" CTA.' : 'Awaiting data for experiment recommendation.'}
            </div>
          </div>
          <div style="background: var(--bg-card); padding: 16px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">CAMPAIGN DECISION</div>
            <div style="font-size: 0.9rem; color: #34d399; margin-top: 4px;">
              ${dynamicDecision}
            </div>
          </div>
        </div>
      </div>

      <!-- PART 3: DYNAMIC GROWTH LOOP HEALTH SECTION -->
      <div class="glass-panel" style="padding: 24px; margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 1.2rem; font-weight: 700;">🔄 GROWTH LOOP HEALTH</h3>
          <span class="badge badge-simulated">Prototype Decision Thresholds</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 20px;">
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">ACQUISITION</div>
            <div class="progress-bar-bg" style="height: 8px; margin: 4px 0;"><div class="progress-bar-fill" style="width: ${rateAcq}%;"></div></div>
            <span style="font-size: 0.75rem; color: ${rateAcq >= 80 ? '#34d399' : rateAcq >= 50 ? '#fbbf24' : '#f87171'};">
              ${hasData ? `${rateAcq >= 80 ? '🟢 Healthy' : rateAcq >= 50 ? '🟡 Needs Optimization' : '🔴 Critical Drop-off'} (${rateAcq}%)` : 'Awaiting data'}
            </span>
          </div>

          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">ACTIVATION</div>
            <div class="progress-bar-bg" style="height: 8px; margin: 4px 0;"><div class="progress-bar-fill" style="width: ${rateAct}%;"></div></div>
            <span style="font-size: 0.75rem; color: ${rateAct >= 80 ? '#34d399' : rateAct >= 50 ? '#fbbf24' : '#f87171'};">
              ${hasData ? `${rateAct >= 80 ? '🟢 Healthy' : rateAct >= 50 ? '🟡 Needs Optimization' : '🔴 Critical Drop-off'} (${rateAct}%)` : 'Awaiting data'}
            </span>
          </div>

          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">VALUE DELIVERED</div>
            <div class="progress-bar-bg" style="height: 8px; margin: 4px 0;"><div class="progress-bar-fill" style="width: ${rateVal}%;"></div></div>
            <span style="font-size: 0.75rem; color: ${rateVal >= 80 ? '#34d399' : rateVal >= 50 ? '#fbbf24' : '#f87171'};">
              ${hasData ? `${rateVal >= 80 ? '🟢 Healthy' : rateVal >= 50 ? '🟡 Needs Optimization' : '🔴 Critical Drop-off'} (${rateVal}%)` : 'Awaiting data'}
            </span>
          </div>

          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">SHARING RATE</div>
            <div class="progress-bar-bg" style="height: 8px; margin: 4px 0;"><div class="progress-bar-fill" style="width: ${rateShare}%;"></div></div>
            <span style="font-size: 0.75rem; color: ${rateShare >= 80 ? '#34d399' : rateShare >= 50 ? '#fbbf24' : '#f87171'};">
              ${hasData ? `${rateShare >= 80 ? '🟢 Healthy' : rateShare >= 50 ? '🟡 Needs Optimization' : '🔴 Critical Drop-off'} (${rateShare}%)` : 'Awaiting data'}
            </span>
          </div>

          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">REFERRAL REG</div>
            <div class="progress-bar-bg" style="height: 8px; margin: 4px 0;"><div class="progress-bar-fill" style="width: ${rateRef}%;"></div></div>
            <span style="font-size: 0.75rem; color: ${rateRef >= 80 ? '#34d399' : rateRef >= 50 ? '#fbbf24' : '#f87171'};">
              ${hasData ? `${rateRef >= 80 ? '🟢 Healthy' : rateRef >= 50 ? '🟡 Needs Optimization' : '🔴 Critical Drop-off'} (${rateRef}%)` : 'Awaiting data'}
            </span>
          </div>

          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">SQUAD UNLOCK</div>
            <div class="progress-bar-bg" style="height: 8px; margin: 4px 0;"><div class="progress-bar-fill" style="width: ${rateSquad}%;"></div></div>
            <span style="font-size: 0.75rem; color: ${rateSquad >= 80 ? '#34d399' : rateSquad >= 50 ? '#fbbf24' : '#f87171'};">
              ${hasData ? `${rateSquad >= 80 ? '🟢 Healthy' : rateSquad >= 50 ? '🟡 Needs Optimization' : '🔴 Critical Drop-off'} (${rateSquad}%)` : 'Awaiting data'}
            </span>
          </div>
        </div>
      </div>

      <!-- PART 6: DYNAMIC GROWTH SEGMENTS TABLE -->
      <div class="glass-panel" style="padding: 24px; margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap:wrap; gap:10px;">
          <div>
            <h3 style="font-size: 1.2rem; font-weight: 700;">📊 GROWTH SEGMENTS ("Why Did Students Share?")</h3>
            <span class="badge badge-demo">Demo Data / Prototype Insight</span>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-sm btn-secondary btn-seg-tab ${STATE.activeSegmentTab === 'branch' ? 'active' : ''}" data-seg="branch">Branch</button>
            <button class="btn btn-sm btn-secondary btn-seg-tab ${STATE.activeSegmentTab === 'experience' ? 'active' : ''}" data-seg="experience">Level</button>
            <button class="btn btn-sm btn-secondary btn-seg-tab ${STATE.activeSegmentTab === 'preference' ? 'active' : ''}" data-seg="preference">Preference</button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Segment Name</th>
                <th>Users</th>
                <th>Vanity Shares</th>
                <th>Share Rate %</th>
                <th>Ref Registrations</th>
                <th>Conversion Rate %</th>
              </tr>
            </thead>
            <tbody>
              ${!segData ? '<tr><td colspan="6" style="text-align:center; padding:30px;">Insufficient data. Load demo data to populate segments!</td></tr>' : ''}
              ${segData ? segData.rows.map(r => `
                <tr>
                  <td><strong>${r.name}</strong></td>
                  <td>${r.users}</td>
                  <td>${r.shares}</td>
                  <td><strong style="color:var(--primary);">${r.shareRate}%</strong></td>
                  <td>${r.refRegs}</td>
                  <td><strong style="color:var(--accent);">${r.convRate}%</strong></td>
                </tr>
              `).join('') : ''}
            </tbody>
          </table>
        </div>

        ${segData ? `
          <div style="display:flex; gap:16px; margin-top:16px; font-size:0.85rem; flex-wrap:wrap;">
            <div style="background:var(--bg-card); padding:10px 14px; border-radius:6px;">
              🔥 BEST SHARING SEGMENT: <strong style="color:#34d399;">${segData.bestSharing.name} (${segData.bestSharing.shareRate}%)</strong>
            </div>
            <div style="background:var(--bg-card); padding:10px 14px; border-radius:6px;">
              🎯 BEST CONVERTING SEGMENT: <strong style="color:#fbbf24;">${segData.bestConverting.name} (${segData.bestConverting.convRate}%)</strong>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- PART 4 & 5: DYNAMIC VALUE BEFORE ASK & SHARE QUALITY METRICS -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; margin-bottom: 28px;">
        
        <!-- Value Before Ask (Part 4) -->
        <div class="glass-panel" style="padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 1.1rem; font-weight: 700;">⚡ VALUE BEFORE ASK METRIC</h3>
            <span class="badge badge-demo">Demo Data</span>
          </div>
          <div style="font-size: 2.5rem; font-weight: 900; color: #34d399;">${hasData ? `${valueBeforeAskVal}%` : 'Awaiting data'}</div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
            Calculated: Completed Registrations (${eRegComp}) / Projects Generated (${eProjGen}). Demonstrates core thesis: <em>"Students receive personalized value before being asked to register."</em>
          </p>
        </div>

        <!-- Share Quality (Part 5) -->
        <div class="glass-panel" style="padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 style="font-size: 1.1rem; font-weight: 700;">🎯 SHARE QUALITY METRIC</h3>
            <span class="badge badge-demo">Demo Data</span>
          </div>
          <div style="font-size: 2.5rem; font-weight: 900; color: #fbbf24;">${hasData ? `${shareQualityVal}%` : 'Awaiting data'}</div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
            Distinguishes <strong>Vanity Shares</strong> (${eVanityShares} button clicks) from <strong>Successful Shares</strong> (${eRefRegs} friend signups). Share $\rightarrow$ Reg Conversion Rate.
          </p>
        </div>

      </div>

      <!-- REAL EVENT TRACKED FUNNEL -->
      <div class="glass-panel" style="padding: 28px; margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 1.2rem; font-weight: 700;">Full Conversion Funnel (Real Event Telemetry)</h3>
          <span class="badge badge-demo">Tracked Event Data</span>
        </div>

        <div class="funnel-stage">
          <div class="funnel-label">1. Landing Views</div>
          <div class="funnel-bar-bg"><div class="funnel-bar-fill" style="width: 100%;">${eLanding}</div></div>
          <div class="funnel-rate">100%</div>
        </div>

        <div class="funnel-stage">
          <div class="funnel-label">2. Passport Starts</div>
          <div class="funnel-bar-bg"><div class="funnel-bar-fill" style="width: ${eLanding > 0 ? Math.round((ePassStart/eLanding)*100) : 0}%;">${ePassStart}</div></div>
          <div class="funnel-rate">${eLanding > 0 ? Math.round((ePassStart/eLanding)*100) : 0}%</div>
        </div>

        <div class="funnel-stage">
          <div class="funnel-label">3. Passport Complete</div>
          <div class="funnel-bar-bg"><div class="funnel-bar-fill" style="width: ${eLanding > 0 ? Math.round((ePassComp/eLanding)*100) : 0}%;">${ePassComp}</div></div>
          <div class="funnel-rate">${ePassStart > 0 ? Math.round((ePassComp/ePassStart)*100) : 0}%</div>
        </div>

        <div class="funnel-stage">
          <div class="funnel-label">4. Projects Generated</div>
          <div class="funnel-bar-bg"><div class="funnel-bar-fill" style="width: ${eLanding > 0 ? Math.round((eProjGen/eLanding)*100) : 0}%;">${eProjGen}</div></div>
          <div class="funnel-rate">${ePassComp > 0 ? Math.round((eProjGen/ePassComp)*100) : 0}%</div>
        </div>

        <div class="funnel-stage">
          <div class="funnel-label">5. Reg Started</div>
          <div class="funnel-bar-bg"><div class="funnel-bar-fill" style="width: ${eLanding > 0 ? Math.round((eRegStart/eLanding)*100) : 0}%;">${eRegStart}</div></div>
          <div class="funnel-rate">${eProjGen > 0 ? Math.round((eRegStart/eProjGen)*100) : 0}%</div>
        </div>

        <div class="funnel-stage">
          <div class="funnel-label">6. Reg Completed</div>
          <div class="funnel-bar-bg"><div class="funnel-bar-fill" style="width: ${eLanding > 0 ? Math.round((eRegComp/eLanding)*100) : 0}%; background: #10b981;">${eRegComp}</div></div>
          <div class="funnel-rate" style="color:#34d399;">${eRegStart > 0 ? Math.round((eRegComp/eRegStart)*100) : 0}%</div>
        </div>

        <div class="funnel-stage">
          <div class="funnel-label">7. Vanity Shares</div>
          <div class="funnel-bar-bg"><div class="funnel-bar-fill" style="width: ${eLanding > 0 ? Math.round((eVanityShares/eLanding)*100) : 0}%; background: #f59e0b;">${eVanityShares}</div></div>
          <div class="funnel-rate" style="color:#fbbf24;">${eRegComp > 0 ? Math.round((eVanityShares/eRegComp)*100) : 0}%</div>
        </div>

        <div class="funnel-stage">
          <div class="funnel-label">8. Successful Shares</div>
          <div class="funnel-bar-bg"><div class="funnel-bar-fill" style="width: ${eLanding > 0 ? Math.round((eRefRegs/eLanding)*100) : 0}%; background: #06b6d4;">${eRefRegs}</div></div>
          <div class="funnel-rate" style="color:#38bdf8;">${eVanityShares > 0 ? Math.round((eRefRegs/eVanityShares)*100) : 0}%</div>
        </div>
      </div>

      <!-- PART 8: EXPERIMENT CARDS -->
      <div class="glass-panel" style="padding: 24px; margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 1.2rem; font-weight: 700;">🧪 GROWTH EXPERIMENT CARDS</h3>
          <span class="badge badge-simulated">AWAITING LIVE DATA</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
          
          <div style="background: var(--bg-card); padding: 18px; border-radius: 8px; border: 1px solid var(--border-color);">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span class="badge badge-squad">EXPERIMENT 01</span>
              <span class="badge badge-simulated">${hasData ? 'Running' : 'Ready to Test'}</span>
            </div>
            <strong style="color:white; font-size:0.95rem;">Hypothesis: "Build With Me CTA increases conversion"</strong>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:8px;">
              Control: "Register for workshop"<br/>
              Variant: "Build this with a friend"<br/>
              Primary Metric: Registration Conversion Rate<br/>
              Status: <strong>${hasData ? 'Positive Signal' : 'Awaiting Live Data'}</strong>
            </div>
          </div>

          <div style="background: var(--bg-card); padding: 18px; border-radius: 8px; border: 1px solid var(--border-color);">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span class="badge badge-squad">EXPERIMENT 02</span>
              <span class="badge badge-simulated">${hasData ? 'Running' : 'Ready to Test'}</span>
            </div>
            <strong style="color:white; font-size:0.95rem;">Hypothesis: "Personalized project cards drive quality shares"</strong>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:8px;">
              Control: Generic workshop share copy<br/>
              Variant: Custom AI Project Pass Card<br/>
              Primary Metric: Share $\rightarrow$ Reg Conversion Rate<br/>
              Status: <strong>${hasData ? 'Positive Signal' : 'Awaiting Live Data'}</strong>
            </div>
          </div>

          <div style="background: var(--bg-card); padding: 18px; border-radius: 8px; border: 1px solid var(--border-color);">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span class="badge badge-squad">EXPERIMENT 03</span>
              <span class="badge badge-simulated">${hasData ? 'Running' : 'Ready to Test'}</span>
            </div>
            <strong style="color:white; font-size:0.95rem;">Hypothesis: "Project Match Score boosts trust"</strong>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:8px;">
              Control: No match score shown<br/>
              Variant: Show Match Score (87%) & breakdown<br/>
              Primary Metric: Project $\rightarrow$ Reg Conversion Rate<br/>
              Status: <strong>${hasData ? 'Positive Signal' : 'Awaiting Live Data'}</strong>
            </div>
          </div>

        </div>
      </div>

    </div>
  `;

  // Segment tab switcher handlers
  document.querySelectorAll('.btn-seg-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      STATE.activeSegmentTab = btn.getAttribute('data-seg');
      renderAdminDashboard();
    });
  });
}

// TOAST NOTIFICATIONS
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'success') toast.style.borderColor = '#10b981';
  if (type === 'error') toast.style.borderColor = '#ef4444';
  if (type === 'warning') toast.style.borderColor = '#f59e0b';

  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}
