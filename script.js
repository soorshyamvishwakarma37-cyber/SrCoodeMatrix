/* ============================================================
   SR CODEMATRIX — SINGLE DATA FILE
   ------------------------------------------------------------
   ⚠️  SITE KA SAARA DATA YAHAN HAI. Demo / fake data delete kar
       diya gaya hai — jo bhi khaali ("") dikhe wo bhar do.

   KAise bharein:
     • ""            → khali chhod diya, aap bharo
     • []            → list khali hai, aap add karo
     • null          → number/price khali hai, aap bharo

   Jab sab bhar lo to neeche  setupComplete: true  kar dena —
   upar wali "Setup Pending" patti apne aap hat jayegi.
   ============================================================ */

const DATA = {

  /* ---------- sab kuch bhar diya? to true kar do ---------- */
  setupComplete: false,

  /* ============================================================
     1. BRAND / COMPANY INFO
     ============================================================ */
  brand: {
    name       : "SR Codematrix",     // pura naam
    short      : "SR",                 // logo me 2-3 akshar
    tagline    : "Website Sell · Website Build",
    description: "Website templates kharido ya apni custom website banvayein — design, hosting, domain, maintenance sab ek hi jagah.",
    email      : "",        // ← e.g. "hello@srcodematrix.com"
    phone      : "",        // ← e.g. "+91 90000 00000"
    whatsapp   : "",        // ← e.g. "919000000000" (country code, bina +)
    address    : "",        // ← e.g. "Ahilyanagar, Maharashtra, India"
    hours      : "",        // ← e.g. "Mon–Sat · 10 AM – 7 PM"
    gstin      : "",        // ← GST number (invoice ke liye)
    established: "",        // ← saal, e.g. "2024"
  },

  /* ---------- social links (khali chhod do to button chhup jayega) ---------- */
  social: {
    whatsapp : "",   instagram: "",  facebook : "",
    youtube  : "",   linkedin : "",  twitter  : "",
  },

  /* ============================================================
     2. HERO SECTION
     ============================================================ */
  hero: {
    eyebrow   : "Website Sell · Website Build",
    line1     : "Website",
    highlight1: "kharido",
    line2     : "ya",
    highlight2: "banvayein",
    sub       : "Ready-made template chuno ya apni requirement batao — design, hosting, domain, payment gateway aur maintenance sab ek hi jagah.",
    badges    : [],      // ← ["✔ 4.9/5 Rating", "✔ UPI / Card", "✔ 7-Day Delivery"]
    ctaPrimary  : { label:"Website Store Dekho", href:"store.html" },
    ctaSecondary: { label:"Custom Banvayein",   href:"order.html" },
  },

  /* ---------- stats (khali = placeholder dikhega) ---------- */
  /* format: { value:1200, suffix:"+", label:"Websites Delivered", color:"indigo" } */
  /* color: indigo | pink | green | amber                                        */
  stats: [
    /* ← apne aankde yahan daalo, jaise:
    { value:1250, suffix:"+", label:"Websites Delivered", color:"indigo" },
    { value:480,  suffix:"+", label:"Happy Clients",      color:"pink"   },
    */
  ],

  /* ============================================================
     3. DO RAASTE (Sell vs Build)
     ============================================================ */
  paths: [
    {
      n:"1", color:"indigo", icon:"bag",
      title:"Website Kharido (Ready-Made)",
      desc :"Professionally designed templates — bas apna brand name, photos aur content dalna hai.",
      points:[],   // ← ["₹999 se shuru", "24 ghante me delivery", ...]
      cta:{ label:"Store Explore Karo", href:"store.html" },
    },
    {
      n:"2", color:"violet", icon:"code",
      title:"Website Banvayein (Custom)",
      desc :"Aap batao kya chahiye — hum design, develop aur launch kar denge.",
      points:[],   // ← apne points daalo
      cta:{ label:"Quote Calculator Kholo", href:"order.html" },
    },
  ],

  /* ============================================================
     4. CORE FEATURES (home page par 6)
     ============================================================ */
  /* icon: phone | shield | chart | mail | chat | grid | bolt | star */
  coreFeatures: [
    { icon:"phone",  color:"indigo", title:"Mobile-First Responsive", desc:"Mobile, tablet, laptop — har screen pe perfect." },
    { icon:"shield", color:"green",  title:"Free SSL + Security",     desc:"HTTPS lock, firewall aur daily backup." },
    { icon:"chart",  color:"amber",  title:"SEO Ready",               desc:"Search Console, sitemap, meta tags — sab set." },
    { icon:"mail",   color:"violet", title:"Business Email",          desc:"you@yourcompany.in jaisi professional email." },
    { icon:"chat",   color:"cyan",   title:"WhatsApp Chat",           desc:"Visitor seedha WhatsApp pe message kare." },
    { icon:"grid",   color:"pink",   title:"Admin Dashboard",         desc:"Khud content badlo — coding ki zarurat nahi." },
  ],

  /* ============================================================
     5. FULL FEATURE LIST  (110 features)
     kind: "inc" = Included | "pro" = Pro | "add" = Add-on
     ============================================================ */
  featureGroups: [
    { n:"01", title:"Design & Website Builder", color:"indigo", icon:"grid", items:[
      ["Drag & drop page builder","inc"],["60+ pre-built sections","inc"],["Mobile-first responsive layout","inc"],
      ["Custom colour / font / branding","inc"],["Dark + light mode","inc"],["Scroll & hover animations","inc"],
      ["Unlimited image & video gallery","inc"],["Custom domain connect","inc"],["Favicon + meta tags","inc"],
      ["Sticky header & mega menu","inc"],["Multi-step forms","inc"],["Testimonial + FAQ blocks","inc"],
      ["Custom CSS / JS injection","pro"],["White-label (apna brand)","pro"],
    ]},
    { n:"02", title:"Templates & Store", color:"cyan", icon:"bag", items:[
      ["120+ ready templates","inc"],["Category-wise filter","inc"],["Live demo preview","inc"],
      ["Lifetime license","inc"],["Free future updates","inc"],["Source code (zip)","inc"],
      ["Instant download after payment","inc"],["Secure payment gateway","inc"],
      ["Custom template on request","pro"],["Resell rights","pro"],["PSD / Figma source files","add"],
    ]},
    { n:"03", title:"E-Commerce", color:"pink", icon:"cart", items:[
      ["Product catalogue","inc"],["Add to cart + checkout","inc"],["Coupon & discount engine","inc"],
      ["Inventory management","inc"],["Order tracking","inc"],["Razorpay / Stripe / UPI","inc"],
      ["Product variants (size/colour)","inc"],["Wishlist","inc"],["Customer accounts","inc"],
      ["COD + shipping rules","pro"],["Multi-vendor marketplace","pro"],["Abandoned cart recovery","pro"],
      ["GST invoice generation","add"],
    ]},
    { n:"04", title:"Auth, Users & Security", color:"violet", icon:"shield", items:[
      ["Google Login (OAuth 2.0)","inc"],["Email + password login","inc"],["OTP mobile login","inc"],
      ["Role-based access control","inc"],["Session management","inc"],["Free SSL certificate","inc"],
      ["Password reset flow","inc"],["reCAPTCHA on forms","inc"],["Activity log","inc"],
      ["Two-factor authentication (2FA)","pro"],["Social login (FB, Apple)","pro"],["SSO / SAML enterprise","add"],
    ]},
    { n:"05", title:"Hosting, Domain & Backup", color:"green", icon:"cloud", items:[
      ["Domain connect + DNS setup","inc"],["NVMe SSD hosting","inc"],["Cloudflare CDN","inc"],
      ["Daily auto backup","inc"],["Uptime monitoring","inc"],["Business email setup","inc"],
      ["cPanel / control panel access","inc"],["One-click restore","inc"],
      ["Staging environment","pro"],["Dedicated IP","add"],
    ]},
    { n:"06", title:"SEO & Marketing", color:"amber", icon:"chart", items:[
      ["On-page SEO setup","inc"],["sitemap.xml + robots.txt","inc"],["Google Search Console","inc"],
      ["Google Analytics 4","inc"],["Open Graph / social preview","inc"],["Image compression + lazy load","inc"],
      ["Core Web Vitals optimisation","inc"],["Local SEO / Google Business","inc"],
      ["Schema.org markup","pro"],["Keyword research + backlinks","pro"],["Google Ads setup","add"],
      ["Email marketing automation","add"],
    ]},
    { n:"07", title:"Monetization & Multi Income", color:"rose", icon:"coin", items:[
      ["Template selling system","inc"],["Referral program","inc"],["Reseller dashboard","inc"],
      ["Wallet + payout tracking","inc"],["Coupon / seasonal pricing","inc"],["Multi-currency ready","inc"],
      ["Ad slot management","pro"],["Subscription / AMC billing","pro"],["Affiliate link tracking","pro"],
      ["White-label reseller panel","add"],
    ]},
    { n:"08", title:"Dashboard & Analytics", color:"blue", icon:"gauge", items:[
      ["Order management","inc"],["Earnings breakdown chart","inc"],["Visitor statistics","inc"],
      ["Lead / enquiry management","inc"],["Payout history","inc"],["Profile & settings","inc"],
      ["CSV / PDF report export","pro"],["CRM integration","pro"],["Custom date-range reports","pro"],
      ["Advanced funnel analytics","add"],
    ]},
    { n:"09", title:"Integrations", color:"teal", icon:"plug", items:[
      ["WhatsApp chat + API","inc"],["Google Maps embed","inc"],["Social media feed","inc"],
      ["Contact form + email notify","inc"],["Payment gateway","inc"],["Google Calendar booking","inc"],
      ["SMS gateway","pro"],["CRM / ERP webhook","pro"],["Shipping aggregator","pro"],
      ["Custom third-party API","add"],
    ]},
    { n:"10", title:"Support & Training", color:"lime", icon:"support", items:[
      ["Video training (Hindi)","inc"],["PDF documentation","inc"],["Email support","inc"],
      ["WhatsApp support","inc"],["Free bug-fix warranty","inc"],["Annual health checkup","inc"],
      ["Priority call support","pro"],["Dedicated account manager","pro"],
      ["On-site training","add"],["24×7 emergency support","add"],
    ]},
  ],

  /* ============================================================
     6. MULTI INCOME SOURCES  (8 streams)
     potential: "" chhod do to "—" dikhega, apna number daal do
     ============================================================ */
  incomeSources: [
    { n:"01", title:"Ready Template Sales", type:"One-time", effort:"Low", color:"indigo",
      desc:"Ek baar design karo, baar baar becho. Har sale par poori amount aapki.",
      how:["Niche choose karo (gym, clinic, school…)", "Professional design banao",
           "Store par list karo", "Har sale = passive income"],
      potential:"" },
    { n:"02", title:"Custom Website Projects", type:"Project", effort:"High", color:"violet",
      desc:"Client ki requirement ke hisaab se site banakar dena. Sabse zyada margin isi me hai.",
      how:["Client se requirement lo","Quote bhejo (50% advance)",
           "Design → Development → Testing","Handover + final payment"],
      potential:"" },
    { n:"03", title:"Hosting + Domain Reselling", type:"Recurring", effort:"Low", color:"green",
      desc:"Har website ko hosting chahiye — aur wo har saal renew hoti hai. Sabse stable income.",
      how:["Wholesale hosting kharido","Apne margin ke saath becho",
           "Renewal reminder automation","Har saal repeat income"],
      potential:"" },
    { n:"04", title:"AMC / Maintenance Plans", type:"Recurring", effort:"Low", color:"amber",
      desc:"Monthly care plan — backup, updates, security, chhote changes.",
      how:["Har client ko AMC offer karo","Monthly backup + update schedule",
           "Priority support queue","Auto-debit subscription"],
      potential:"" },
    { n:"05", title:"Referral / Affiliate", type:"Passive", effort:"Very Low", color:"pink",
      desc:"Apna referral link share karo, kisi ne kharida to commission. Koi product banane ki zarurat nahi.",
      how:["Dashboard se apna link lo","WhatsApp / Instagram par share karo",
           "Har sale par commission","Weekly auto payout"],
      potential:"" },
    { n:"06", title:"Ad Revenue Sharing", type:"Passive", effort:"Very Low", color:"cyan",
      desc:"Jin clients ki site aap host karte ho, un par ads chalakar revenue share.",
      how:["Client site par ad slots lagao","AdSense approval","Revenue split decide karo","Monthly report + payout"],
      potential:"" },
    { n:"07", title:"SEO + Digital Marketing", type:"Service", effort:"Medium", color:"rose",
      desc:"Website ke baad client ko traffic bhi chahiye — monthly retainer ka best source.",
      how:["Free audit report do","Monthly retainer package becho","Ranking report bhejo","3 mahine me renewal"],
      potential:"" },
    { n:"08", title:"Courses + Training", type:"Passive", effort:"Medium", color:"lime",
      desc:"Website banana sikhane wala course — ek baar record karo, lifetime bikta rahega.",
      how:["Course content record karo","Apni pricing rakho","Reseller ke through becho","Live workshop extra income"],
      potential:"" },
  ],

  revenueMix: [],   /* ← [{ name:"Custom Projects", pct:35, color:"#7c3aed" }, ...]  khali = placeholder */

  /* ============================================================
     7. RESELLER / COMMISSION
     ============================================================ */
  commission: {
    referralPercent : null,   // ← e.g. 20
    resellerMargin  : null,   // ← e.g. 35
    minPayout       : null,   // ← e.g. 500
    payoutDay       : "",     // ← e.g. "Friday"
  },
  resellerPlans: [
    { name:"Starter",       commission:"", target:"",  payout:"",        fee:"Free", plan:"Basic" },
    { name:"Silver",        commission:"", target:"",  payout:"",        fee:"Free", plan:"Advanced" },
    { name:"Gold",          commission:"", target:"",  payout:"",        fee:"Free", plan:"Full + CRM" },
    { name:"Elite Partner", commission:"", target:"",  payout:"",        fee:"Free", plan:"White-label" },
  ],

  /* ============================================================
     8. TEMPLATE STORE
     ============================================================ */
  /* ← yahan apne templates add karo:
     { n:"Business Pro", c:"Business", p:2999, o:5999, badge:"HOT",
       d:"Corporate site — services, team, gallery.", tags:["10 Pages","Blog"] }
       badge: "" | "HOT" | "NEW"      p = price, o = original (strike) — null rakho to nahi dikhega
  */
  templates: [],
  templateCategories: ["Business","E-Commerce","Portfolio","Local","Institutional"],

  /* ============================================================
     9. CUSTOM ORDER — LIVE QUOTE CALCULATOR
     price: null rakha to "₹ —" dikhega (abhi sab null hai)
     ============================================================ */
  calculator: {
    pageRate: null,      // ← per extra page charge, e.g. 600
    freePages: 5,
    types: [
      { id:"landing",  t:"Landing Page",     d:"1–3 page, ek product/service ke liye",   p:null, days:4  },
      { id:"business", t:"Business Website", d:"Company profile, services, gallery",     p:null, days:7  },
      { id:"ecom",     t:"E-Commerce Store", d:"Online shop — cart, payment, inventory", p:null, days:12 },
      { id:"portal",   t:"Web App / Portal", d:"Login system, dashboard, custom features",p:null, days:20 },
    ],
    addons: [
      { id:"pay",   t:"Payment Gateway",       d:"Razorpay / Stripe / UPI",   p:null },
      { id:"admin", t:"Admin Panel",           d:"Khud content manage karo",  p:null },
      { id:"blog",  t:"Blog / News Section",   d:"SEO ke liye best",          p:null },
      { id:"book",  t:"Appointment Booking",   d:"Slot booking + calendar",   p:null },
      { id:"multi", t:"Multi-Language",        d:"Hindi + English + Marathi", p:null },
      { id:"seo",   t:"Advanced SEO Pack",     d:"Keyword research + backlinks",p:null },
      { id:"logo",  t:"Logo + Branding",       d:"Professional logo + brand kit",p:null },
      { id:"cont",  t:"Content Writing",       d:"Har page ka content",       p:null },
      { id:"chat",  t:"Live Chat / Chatbot",   d:"Auto-reply bot, 24×7",      p:null },
      { id:"crm",   t:"CRM + Lead Management", d:"Enquiry tracking dashboard",p:null },
    ],
    speeds: [
      { id:"normal", t:"Normal",  d:"Standard timeline",   pct:0,   days:0  },
      { id:"fast",   t:"Express", d:"30% faster delivery", pct:25,  days:-3 },
      { id:"turbo",  t:"Turbo",   d:"Priority team, 2x fast", pct:50, days:-6 },
    ],
    included: [],   /* ← ["Free .in domain (1 year)", "Free SSL", ...] */
  },

  /* ============================================================
     10. PRICING PLANS
     ============================================================ */
  /* ← price: null ki jagah apni price daalo, features: [] me list daalo */
  plans: [
    { name:"Starter", price:null, original:null, color:"indigo", popular:false,
      for:"Chhote business / personal ke liye", features:[] },
    { name:"Business", price:null, original:null, color:"violet", popular:true,
      for:"Growing business ke liye best", features:[] },
    { name:"Enterprise", price:null, original:null, color:"pink", popular:false,
      for:"E-commerce / portal / SaaS ke liye", features:[] },
  ],

  /* ============================================================
     11. PROCESS STEPS
     ============================================================ */
  process: [
    { n:"1", icon:"search", color:"indigo", title:"Browse / Batao", desc:"Store se template chuno ya apna requirement bhejo." },
    { n:"2", icon:"card",   color:"cyan",   title:"Payment",       desc:"UPI, card, netbanking — 100% secure gateway." },
    { n:"3", icon:"code",   color:"violet", title:"Build & Setup",  desc:"Design, hosting, domain, SSL sab set karte hain." },
    { n:"4", icon:"check",  color:"green",  title:"Go Live",        desc:"Training + handover — ab aap khud manage karo." },
  ],

  /* ============================================================
     12. WHY CHOOSE US
     ============================================================ */
  whyChoose: [
    { icon:"bolt",   color:"amber",  title:"Fast Delivery",   desc:"Jo vaada kiya, waqt par milta hai." },
    { icon:"coin",   color:"green",  title:"Transparent Rate",desc:"Koi hidden charge nahi — jo likha wahi." },
    { icon:"support",color:"indigo", title:"24×7 Support",    desc:"WhatsApp, call ya email — hum hamesha yahan." },
    { icon:"star",   color:"pink",   title:"Quality First",   desc:"Har site speed, SEO aur security tested." },
  ],

  /* ============================================================
     13. TECH STACK
     ============================================================ */
  techStack: [
    { title:"Frontend",  desc:"HTML5 · CSS3 · JavaScript · Tailwind · React" },
    { title:"Backend",   desc:"Node.js · PHP · Python · Firebase" },
    { title:"Database",  desc:"MySQL · PostgreSQL · MongoDB · Firestore" },
    { title:"Auth",      desc:"Google OAuth 2.0 · Firebase Auth · JWT" },
    { title:"Payments",  desc:"Razorpay · Stripe · PayPal · UPI" },
    { title:"Hosting",   desc:"NVMe SSD · Cloudflare CDN · cPanel" },
    { title:"Security",  desc:"SSL · WAF · Daily Backup · 2FA" },
    { title:"Analytics", desc:"GA4 · Search Console · Hotjar" },
  ],

  /* ============================================================
     14. PLAN COMPARISON TABLE
     ============================================================ */
  comparison: {
    columns: ["Starter","Business","Enterprise","Reseller"],
    rows: [
      ["Ready Template",      "✔","✔ Premium","✔ Custom","✔ Sab"],
      ["Pages",               "","","",""],
      ["Free Domain",         "","","",""],
      ["Hosting",             "","","",""],
      ["Payment Gateway",     "","","",""],
      ["Admin Panel",         "","","",""],
      ["Source Code",         "✔","✔","✔","✔"],
      ["Google Login",        "","","",""],
      ["WhatsApp Chat",       "","","",""],
      ["SEO Setup",           "","","",""],
      ["Maintenance",         "","","",""],
      ["Reseller Earnings",   "","","",""],
      ["White-label Rights",  "","","",""],
      ["Support",             "","","",""],
    ],
  },

  /* ============================================================
     15. TESTIMONIALS  (khali — jab real client feedback aaye tab add karo)
     ============================================================ */
  /* format: { name:"", role:"", city:"", text:"", rating:5 } */
  testimonials: [],

  /* ============================================================
     16. FAQ
     ============================================================ */
  faqs: [
    ["Google login karna zaroori hai?","Nahi. Website browse karne ke liye login ki zarurat nahi. Order track karne, template download karne aur earnings dekhne ke liye login karna hota hai."],
    ["Template kharidne ke baad kya milta hai?","Source code, documentation aur installation support. Refund policy ke liye Terms & Conditions dekhein."],
    ["Custom website me kitna time lagta hai?","Project ke size par depend karta hai — order page par live calculator se estimated delivery dekh sakte ho."],
    ["Reseller program kaise join karein?","Login karke dashboard me Refer & Earn tab kholo — wahan se apna referral link milega."],
    ["Payout kab aur kaise milta hai?","Dashboard ke Earnings tab me payout history aur next payout date dikhai deti hai."],
    ["Kya main apni website khud edit kar sakta hoon?","Haan. Har site ke saath admin panel aur training milti hai — coding ki zarurat nahi."],
  ],

  /* ============================================================
     17. DASHBOARD (sirf labels — data real orders se aata hai)
     ============================================================ */
  dashboard: {
    welcome: "Namaste",
    notes  : "",      // ← dashboard par koi special message dikhana ho to
  },

  /* ============================================================
     18. SEO META (har page ke title/description)
     ============================================================ */
  seo: {
    index    : { title:"", description:"" },
    store    : { title:"", description:"" },
    order    : { title:"", description:"" },
    earnings : { title:"", description:"" },
    features : { title:"", description:"" },
    login    : { title:"", description:"" },
    dashboard: { title:"", description:"" },
  },
};

/* ---------- helpers ---------- */
const has   = v => Array.isArray(v) ? v.length > 0 : (v !== null && v !== undefined && v !== "");
const orDash = v => has(v) ? v : "—";
const money  = v => (v === null || v === undefined || v === "") ? "—" : "₹" + Number(v).toLocaleString("en-IN");

/* ---------- ADMIN PANEL OVERRIDE ----------
   admin.html se save kiye gaye badlav yahan localStorage se
   apply ho jate hain. Data.js file ko chhede bina hi site
   apne aap update ho jati hai. (Reset = admin panel me button)
   ---------------------------------------------------------- */
function SRApplyOverride(){
  try{
    const saved = localStorage.getItem('srcm_data_override');
    if(saved){
      const over = JSON.parse(saved);
      if(over && typeof over === 'object'){
        Object.keys(over).forEach(k => { if(k !== 'setupComplete') DATA[k] = over[k]; });
        if(over.setupComplete !== undefined) DATA.setupComplete = over.setupComplete;
      }
    }
  }catch(e){ /* kharab JSON = ignore */ }
}
window.SRApplyOverride = SRApplyOverride;
SRApplyOverride();

window.DATA = DATA; window.has = has; window.orDash = orDash; window.money = money;




/* ============================================================
   SR CODEMATRIX — CONFIG (sirf settings, content nahi)
   ------------------------------------------------------------
   Site ka saara TEXT / DATA  →  assets/js/data.js
   ============================================================ */

const SR_CONFIG = {

  /* ---------- GOOGLE SIGN-IN (asli OAuth 2.0) ----------
     Ye woh Client ID hai jo Firebase Auth me "Google" provider
     enable karne par milta hai:
       Firebase Console → Authentication → Sign-in method
       → Google → Web SDK configuration → Web client ID
     (Firebase se aa raha OAuth client generally kaam karta hai.)
  */
  GOOGLE_CLIENT_ID : "211091351218-6n0jrrqjpvnpuhkgcua1q0p1m5m8k3q0.apps.googleusercontent.com",

  /* ============================================================
     FIREBASE  (sewaastra)
     ============================================================ */
  FIREBASE: {
    apiKey        : "AIzaSyAL9dsBvNrp-ijxAk7ZYZcbN0BPaZ5gYtw",
    authDomain    : "sewaastra.firebaseapp.com",
    projectId     : "sewaastra",
    storageBucket : "sewaastra.firebasestorage.app",
    messagingSenderId: "211091351218",
    appId         : "1:211091351218:web:bba1de2cbfa6e26f464bab",
    measurementId : "G-817LNYXHRB",
    /* Firestore ka region — Cloud Function jahan deploy hoga */
    region        : "asia-south1",
  },

  /* ============================================================
     RAZORPAY
     ============================================================ */
  RAZORPAY: {
    /* KEY ID — ye client me reh sakta hai (public) */
    key_id : "rzp_test_TfTNHTZ21d4UtB",

    /* ⚠️ KEY SECRET KABHI IS FILE ME MAT DAALO.
       Secret server par (Cloud Functions) rakha jata hai:
         firebase functions:config:set razorpay.secret="rzp_test_XXXXXXXX"
       Ya .env / Secret Manager use karo. */
    key_secret: "",

    /* Currency + company details (receipt me dikhta hai) */
    currency  : "INR",
    company   : "SR Codematrix",
    themeColor: "#4f46e5",
  },

  /* ---------- behaviour ---------- */
  SHOW_INTRO        : true,   // home page par intro splash
  SHOW_SETUP_BANNER : true,   // data.js bharne ki reminder upar
  ALLOW_GUEST       : true,   // bina login dashboard preview (sirf testing)
  ENABLE_ORDERS     : true,   // store / order form chalayein ya nahi

  /* ---------- ADMIN PANEL (admin.html) ----------
     Khaali chhodo to panel bina password khulega (local testing).
     Live karne se pehle apna PIN zaroor set karein.
  */
  ADMIN_PIN         : "",     // ← e.g. "7391"
};

/* window par bhi rakho (admin.js / header.js isi se padhte hain) */
window.SR_CONFIG = SR_CONFIG;




/* ============================================================
   SR CODEMATRIX — FIREBASE LAYER
   ------------------------------------------------------------
   • Config khaali / SDK load na ho → site local (offline) mode
     me chalti rehti hai. Kuch tootta nahi.
   • Config bhara + SDK load → asli Auth + Firestore + Functions.

   Ye file sirf ek wrapper hai — baaki sab code (auth.js,
   dashboard.js, razorpay.js) isi se baat karte hain.
   ============================================================ */

const SRFB = {

  state : 'idle',        // idle → loading → ready | off
  app   : null,
  auth  : null,
  db    : null,
  fns   : null,
  _waiters: [],

  /* ---------- config hai bhi ya nahi ---------- */
  configured(){
    const f = (window.SR_CONFIG || {}).FIREBASE;
    return !!(f && f.apiKey && f.projectId && f.appId);
  },

  ready(){ return this.state === 'ready'; },
  off()  { return this.state === 'off';   },

  /* ---------- SDK load (compat build = simple classic scripts) ---------- */
  init(){
    if(!this.configured()){ this.state = 'off'; this._flush(); return; }
    if(this.state === 'loading' || this.state === 'ready') return;

    this.state = 'loading';
    const V = '10.14.1';
    const files = [
      `https://www.gstatic.com/firebasejs/${V}/firebase-app-compat.js`,
      `https://www.gstatic.com/firebasejs/${V}/firebase-auth-compat.js`,
      `https://www.gstatic.com/firebasejs/${V}/firebase-firestore-compat.js`,
      `https://www.gstatic.com/firebasejs/${V}/firebase-functions-compat.js`,
    ];

    let left = files.length;
    const done = ()=>{
      if(--left > 0) return;
      try{
        const cfg = SR_CONFIG.FIREBASE;
        if(!firebase.apps.length) firebase.initializeApp(cfg);
        this.app  = firebase.app();
        this.auth = firebase.auth();
        this.db   = firebase.firestore();
        this.fns  = firebase.app().functions(SR_CONFIG.FIREBASE.region || 'asia-south1');
        this.state = 'ready';
        this._flush();
      }catch(e){
        console.warn('Firebase init fail:', e);
        this.state = 'off'; this._flush();
      }
    };

    files.forEach(src=>{
      const s = document.createElement('script');
      s.src = src; s.async = false;          // order matters
      s.onload  = done;
      s.onerror = ()=>{ this.state = 'off'; this._flush(); };
      document.head.appendChild(s);
    });
  },

  /* jab ready/off ho jaye to pending callbacks chalao */
  _flush(){ (this._waiters.splice(0)).forEach(f=> f()); },
  whenReady(fn){
    if(this.state === 'ready' || this.state === 'off') fn();
    else this._waiters.push(fn);
  },

  /* ============================================================
     AUTH
     ============================================================ */
  currentUser(){ return this.ready() ? this.auth.currentUser : null; },

  onAuth(fn){
    if(!this.ready()) return;
    this.auth.onAuthStateChanged(fn);
  },

  /* Google popup login */
  async signInGoogle(){
    if(!this.ready()) throw new Error('Firebase ready nahi hai');
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const r = await this.auth.signInWithPopup(provider);
    return r.user;
  },

  async signOut(){
    if(this.ready()) { try{ await this.auth.signOut(); }catch(e){} }
  },

  /* ============================================================
     FIRESTORE — paths
     ============================================================ */
  col(name){ return this.db.collection(name); },

  /* user ka document (role, referral code, wallet yahan) */
  userDoc(uid){ return this.db.collection('users').doc(uid); },

  async ensureUser(u){
    if(!this.ready() || !u) return null;
    const ref = this.userDoc(u.uid);
    const snap = await ref.get();
    if(!snap.exists){
      await ref.set({
        uid      : u.uid,
        name     : u.displayName || 'User',
        email    : u.email || '',
        photo    : u.photoURL || null,
        provider : (u.providerData[0] || {}).providerId || 'google',
        role     : 'client',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      return await ref.get();
    }
    return snap;
  },

  /* ---------- orders ---------- */
  async myOrders(uid){
    if(!this.ready()) return [];
    const s = await this.db.collection('orders')
      .where('uid','==',uid).orderBy('createdAt','desc').limit(100).get();
    return s.docs.map(d=>({ id:d.id, ...d.data() }));
  },

  /* ---------- earnings (server se likhi jati hai, client padh sakta hai) ---------- */
  async myEarnings(uid){
    if(!this.ready()) return null;
    const s = await this.db.collection('earnings').doc(uid).get();
    return s.exists ? s.data() : null;
  },

  /* ============================================================
     CLOUD FUNCTIONS
     ============================================================ */
  callable(name){
    if(!this.ready()) throw new Error('Firebase ready nahi hai');
    return this.fns.httpsCallable(name);
  },
};

window.SRFB = SRFB;

/* auto-init (config ho to) */
if(document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', ()=> SRFB.init());
else SRFB.init();




/* ============================================================
   SR CODEMATRIX — RAZORPAY CHECKOUT
   ------------------------------------------------------------
   FLOW (secure):
     1) client  →  Cloud Function "createRazorpayOrder"  (amount server
                  par verify hota hai, phir Razorpay order banta hai)
     2) client  →  Razorpay checkout popup (key_id public hai)
     3) client  →  Cloud Function "verifyRazorpayPayment"
                  (signature key_secret se verify hoti hai — secret
                   kabhi client me nahi jata)
     4) function →  Firestore me order + earnings likhta hai
                  (client inhe directly likh hi nahi sakta)

   Razorpay load na ho / config khaali → site local mode me chalti hai.
   ============================================================ */

const SRPay = {

  _loading: null,

  configured(){
    const r = (window.SR_CONFIG || {}).RAZORPAY;
    return !!(r && r.key_id && r.key_id.trim() !== '');
  },

  /* ---------- Razorpay checkout.js load karo ---------- */
  load(){
    if(window.Razorpay) return Promise.resolve(true);
    if(this._loading) return this._loading;
    this._loading = new Promise(res=>{
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      s.onload  = ()=> res(true);
      s.onerror = ()=> res(false);
      document.head.appendChild(s);
    });
    return this._loading;
  },

  /* ============================================================
     PAY  — { amount, item, kind, notes, onSuccess, onDismiss }
     ============================================================ */
  async pay(o){
    const R = SR_CONFIG.RAZORPAY || {};

    if(!this.configured()){
      SRToast('Payment abhi setup nahi hai — config.js me Razorpay key daalo.', 'err', 'Setup Required');
      return false;
    }
    if(!SR_CONFIG.ENABLE_ORDERS){
      SRToast('Orders abhi band hain.', 'err'); return false;
    }

    const ok = await this.load();
    if(!ok){ SRToast('Razorpay load nahi hua — internet check karo.', 'err'); return false; }

    const u  = SRAuth.getUser();
    if(!u){ SRToast('Pehle login karo.', 'err', 'Login Required'); return false; }

    const amount = Math.round(Number(o.amount) || 0);
    if(amount <= 0){ SRToast('Amount sahi nahi hai.', 'err'); return false; }

    /* ---------- 1. server par order banao ---------- */
    let order;
    try{
      const fn = SRFB.callable('createRazorpayOrder');
      const r  = await fn({
        amount,
        item : o.item,
        kind : o.kind || 'template',
        notes: o.notes || {},
      });
      order = r.data;
      if(!order || !order.orderId) throw new Error('orderId nahi mila');
    }catch(e){
      console.warn('createRazorpayOrder:', e);
      SRToast('Order create nahi ho paya: ' + (e.message || 'server error'), 'err');
      return false;
    }

    /* ---------- 2. Razorpay checkout ---------- */
    return new Promise(resolve=>{
      const rzp = new Razorpay({
        key         : R.key_id,
        amount      : order.amount,          // paise me (server se aaya)
        currency    : order.currency || R.currency || 'INR',
        name        : R.company || 'SR Codematrix',
        description : o.item,
        order_id    : order.orderId,
        prefill     : {
          name  : u.name  || '',
          email : u.email || '',
          contact: (o.notes && o.notes.phone) || '',
        },
        notes       : Object.assign({ item:o.item }, o.notes || {}),
        theme       : { color: R.themeColor || '#4f46e5' },

        handler: async (resp)=>{
          /* ---------- 3. server par verify karo ---------- */
          try{
            const fn = SRFB.callable('verifyRazorpayPayment');
            const r  = await fn({
              razorpay_order_id  : resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature : resp.razorpay_signature,
            });
            SRToast('Payment successful! Order confirm ho gaya.', 'ok', 'Paid ✅');
            o.onSuccess && o.onSuccess(r.data);
            resolve(true);
          }catch(e){
            console.warn('verifyRazorpayPayment:', e);
            SRToast('Payment ho gaya par verify nahi hua — hum check karenge. ' +
                    'Payment ID: ' + resp.razorpay_payment_id, 'err', 'Verify Failed');
            resolve(false);
          }
        },

        modal: {
          ondismiss: ()=>{ SRToast('Payment cancel kar di.'); o.onDismiss && o.onDismiss(); resolve(false); }
        }
      });

      rzp.on('payment.failed', (resp)=>{
        SRToast('Payment fail: ' + ((resp.error && resp.error.description) || 'unknown'), 'err');
        resolve(false);
      });

      rzp.open();
    });
  },

  /* ---------- local mode me "enquiry" banao (payment ke bina) ---------- */
  fallbackEnquiry(item, amount){
    const u = SRAuth.getUser();
    SRStore.add({
      item, amount, email: u ? u.email : '',
      status: 'Enquiry', payMode: 'whatsapp'
    });
    SRToast('Enquiry save ho gayi — WhatsApp par payment details bhej denge.', 'ok', 'Enquiry');
    return true;
  },
};

window.SRPay = SRPay;




/* ============================================================
   SR CODEMATRIX — MAIN (icons · intro · nav · toasts · store)
   ============================================================ */

/* ---------------- TOASTS ---------------- */
function SRToast(msg, type="ok", title=""){
  let box = document.getElementById('toasts');
  if(!box){ box = document.createElement('div'); box.id='toasts'; document.body.appendChild(box); }
  const t = document.createElement('div');
  t.className = "toast" + (type === "err" ? " err" : "");
  t.innerHTML = `<span class="tk">${type === "err" ? "✕" : "✓"}</span>
                 <span><b>${title || (type === "err" ? "Oops!" : "Done!")}</b>${msg}</span>`;
  box.appendChild(t);
  setTimeout(()=>{ t.classList.add('out'); setTimeout(()=> t.remove(), 320); }, 3600);
}

const inr = n => "₹" + Number(n).toLocaleString("en-IN");
window.inr = inr;
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
window.esc = esc;
const isEmpty = v => !Array.isArray(v) ? (v === "" || v === null || v === undefined) : v.length === 0;
window.isEmpty = isEmpty;

function todayISO(){ return new Date().toISOString().slice(0,10); }

/* ============================================================
   SVG ICON LIBRARY (graphics — koi image file nahi)
   ============================================================ */
const ICONS = {
  phone  :'<path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M11 18h2"/>',
  shield :'<path d="M12 2l9 4v6c0 5-3.8 8.6-9 10-5.2-1.4-9-5-9-10V6z"/><path d="M9 12l2 2 4-4"/>',
  chart  :'<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/>',
  mail   :'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  chat   :'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  grid   :'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  bolt   :'<path d="M13 2 3 14h8l-1 8 10-12h-8z"/>',
  star   :'<path d="m12 2 3 6.5 7 .8-5 4.7 1.3 7L12 17.8 5.7 21l1.3-7-5-4.7 7-.8z"/>',
  coin   :'<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  support:'<path d="M12 2a10 10 0 1 0 10 10h-4a6 6 0 1 1-6-6z"/><circle cx="12" cy="12" r="2"/>',
  bag    :'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
  code   :'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  cart   :'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L22 7H6"/>',
  cloud  :'<path d="M18 17a4 4 0 0 0-.9-7.9A6 6 0 0 0 6 10.5A3.5 3.5 0 0 0 6.5 17z"/>',
  gauge  :'<path d="M12 14 8 9"/><path d="M20.5 18a9 9 0 1 0-17 0"/><circle cx="12" cy="14" r="1.6"/>',
  plug   :'<path d="M9 2v6M15 2v6"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v5"/>',
  search :'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  card   :'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  check  :'<path d="M20 6 9 17l-5-5"/>',
  users  :'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  eye    :'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  lock   :'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  rocket :'<path d="M5 15c-1.5 1.5-2 6-2 6s4.5-.5 6-2c.8-.8.8-2.2 0-3s-2.2-.8-3 0z"/><path d="M14.5 12.5 19 8l1.5 1.5-1 4-4 1-3-3z"/><path d="M9 15l-3 3"/><path d="M14 8l2 2"/>',
  target :'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  download:'<path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M4 21h16"/>',
  refresh:'<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>',
  trend  :'<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  layers :'<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
  brush  :'<path d="M14.7 6.3a4 4 0 1 0 5 5L21 7l-4-4z"/><path d="m3 21 4-4"/>',
  globe  :'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
  zap    :'<path d="M13 2 3 14h8l-1 8 10-12h-8z"/>',
  book   :'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20"/>',
  heart  :'<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21l8.8-8.3a5 5 0 0 0 0-7.1z"/>',
  award  :'<circle cx="12" cy="9" r="6"/><path d="m9 14-2 7 5-3 5 3-2-7"/>',
  clock  :'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  file   :'<path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"/><path d="M14 2v5h5"/>',
  wallet :'<path d="M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 10h18M16 14h2"/>',
  bell   :'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  link   :'<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
  share  :'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 14a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 13.6H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.7 7L4.6 7a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  logout :'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  plus   :'<path d="M12 5v14M5 12h14"/>',
  arrow  :'<path d="M5 12h14M13 6l6 6-6 6"/>',
};
function icon(name){ return ICONS[name] || ICONS.grid; }
window.icon = icon;
function iconEl(name, colorClass="i-indigo", extra=""){
  return `<span class="ic ${colorClass}" ${extra}><svg viewBox="0 0 24 24">${icon(name)}</svg></span>`;
}
window.iconEl = iconEl;

/* ---------------- EMPTY STATES (koi fake data nahi) ---------------- */
function emptyBox(title, msg, codeRef, cls=""){
  return `<div class="empty ${cls}">
    ${iconEl('plus','', '')}
    <h4>${title}</h4>
    <p>${msg} <code>${codeRef}</code></p>
  </div>`;
}
window.emptyBox = emptyBox;
function skeleton(label){
  return `<div class="skeleton-card"><span class="tag">PLACEHOLDER</span><div class="muted small">${label}</div></div>`;
}
window.skeleton = skeleton;

/* ---------------- SVG WAVE DIVIDER ---------------- */
function waveDivider(color = "#ffffff", flip = false){
  const p = `<svg viewBox="0 0 1200 70" preserveAspectRatio="none" style="transform:${flip?'rotate(180deg)':''}">
    <path fill="${color}" d="M0,32 C180,70 340,0 600,26 C860,52 1040,10 1200,38 L1200,70 L0,70 Z"/>
  </svg>`;
  return `<div class="wave">${p}</div>`;
}
window.waveDivider = waveDivider;

/* ============================================================
   INTRO / SPLASH
   ============================================================ */
function runIntro(){
  const intro = document.getElementById('intro');
  if(!intro) return;
  if(window.SR_CONFIG && SR_CONFIG.SHOW_INTRO === false){ intro.remove(); return; }

  const el = intro.querySelector('.mtx');
  const chars = "01<>{}[]/\\$#@&*+=";
  let i = 0;
  const tick = setInterval(()=>{
    if(!el) return clearInterval(tick);
    let s = ""; for(let k=0;k<26;k++) s += chars[(Math.random()*chars.length)|0];
    el.textContent = s;
    if(++i > 34) clearInterval(tick);
  }, 55);

  const finish = ()=>{
    intro.classList.add('hide');
    document.body.style.overflow = '';
    setTimeout(()=> intro.remove(), 600);
  };
  if(sessionStorage.getItem('srcm_intro_done')){ finish(); return; }

  document.body.style.overflow = 'hidden';
  setTimeout(()=>{ sessionStorage.setItem('srcm_intro_done','1'); finish(); }, 2200);
  intro.querySelector('.intro-skip')?.addEventListener('click', ()=>{
    sessionStorage.setItem('srcm_intro_done','1'); finish();
  });
}

/* ============================================================
   NAV / REVEAL / COUNTERS
   ============================================================ */
function initNav(){
  const burger = document.querySelector('#burger');
  const drawer = document.querySelector('#mDrawer');
  burger?.addEventListener('click', ()=>{
    const open = drawer.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? "true" : "false");
  });
  // bahar click / link tap par band
  document.addEventListener('click', e=>{
    if(!drawer || !drawer.classList.contains('open')) return;
    if(drawer.contains(e.target) || burger.contains(e.target)) return;
    drawer.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
  });
  drawer?.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{
    drawer.classList.remove('open');
    burger?.setAttribute('aria-expanded','false');
  }));
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 768){
      drawer?.classList.remove('open');
      burger?.setAttribute('aria-expanded','false');
    }
  }, {passive:true});

  const here = window.SR_PAGE || "index.html";
  document.querySelectorAll('.nav-links a, .drawer a').forEach(a=>{
    if(a.getAttribute('href') === here) a.classList.add('active');
  });
}

function initReveal(){
  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('[data-reveal]').forEach(el=> el.classList.add('in')); return;
  }
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){
        const d = +(e.target.dataset.delay || 0);
        setTimeout(()=> e.target.classList.add('in'), d);
        io.unobserve(e.target);
      }
    });
  }, {threshold:.1});
  document.querySelectorAll('[data-reveal]').forEach(el=> io.observe(el));
}

function countUp(el, to, suffix="", prefix="", dur=1400){
  const start = performance.now();
  (function frame(now){
    const p = Math.min((now-start)/dur, 1);
    const e = 1 - Math.pow(1-p, 3);
    el.textContent = prefix + Math.round(to*e).toLocaleString("en-IN") + suffix;
    if(p < 1) requestAnimationFrame(frame);
  })(start);
}
function initCounters(){
  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('[data-count]').forEach(el=>{
      el.textContent = (el.dataset.prefix||"") + (+el.dataset.count).toLocaleString("en-IN") + (el.dataset.suffix||"");
    }); return;
  }
  document.querySelectorAll('[data-count]').forEach(el=>{
    const io = new IntersectionObserver(es=>{
      es.forEach(e=>{
        if(e.isIntersecting){
          countUp(el, +el.dataset.count, el.dataset.suffix||"", el.dataset.prefix||"");
          io.unobserve(el);
        }
      });
    },{threshold:.4});
    io.observe(el);
  });
}

/* ============================================================
   ORDERS (localStorage — real user ke apne orders)
   ============================================================ */
const SRStore = {
  key:'srcm_orders',
  all(){ try{ return JSON.parse(localStorage.getItem(this.key) || '[]'); }catch(e){ return []; } },
  add(o){
    const l = this.all();
    o.id = "SR" + String(1001 + l.length);
    o.date = todayISO();
    o.status = o.status || "Pending";
    l.unshift(o);
    localStorage.setItem(this.key, JSON.stringify(l));
    return o;
  },
  byEmail(email){ return email ? this.all().filter(o => o.email === email) : this.all(); },
  total(){ return this.all().reduce((s,o)=> s + (Number(o.amount)||0), 0); },
  clear(){ localStorage.removeItem(this.key); },

  /* ============================================================
     ENQUIRY — Firestore me save (payment se pehle ka quote)
     firestore.rules me 'enquiries' create allowed hai.
     ============================================================ */
  async enquiry(data){
    const u = SRAuth.getUser();
    const rec = Object.assign({
      name  : (u && u.name)  || '',
      email : (u && u.email) || '',
      phone : '',
      biz   : '',
      cat   : '',
      note  : '',
      type  : '',
      amount: null,
      source: 'web',
      date  : todayISO(),
    }, data);

    /* local copy hamesha */
    this.add({ item: rec.type || 'Custom Enquiry', amount: rec.amount,
               email: rec.email, status:'Enquiry' });

    /* Firestore */
    if(window.SRFB && SRFB.ready()){
      try{
        await SRFB.col('enquiries').add(Object.assign(rec, {
          uid      : (u && u.uid) || null,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }));
        return { ok:true, remote:true };
      }catch(e){
        console.warn('enquiry save fail:', e);
        return { ok:true, remote:false, error:e.message };
      }
    }
    return { ok:true, remote:false };
  },
};
window.SRStore = SRStore;

function copyText(txt, label="Copied!"){
  const done = ()=> SRToast(label);
  if(navigator.clipboard?.writeText){
    navigator.clipboard.writeText(txt).then(done).catch(fallback);
  } else fallback();
  function fallback(){
    const ta = document.createElement('textarea');
    ta.value = txt; document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); done(); }catch(e){ SRToast("Copy nahi ho paya","err"); }
    ta.remove();
  }
}
window.copyText = copyText;

/* ============================================================
   APP SHELL — scroll progress, back-to-top, app-bar active state
   ============================================================ */
function initShell(){
  const bar = document.getElementById('progBar');
  const top = document.getElementById('toTop');
  let raf = null;

  const nav = document.querySelector('header.nav');
  function update(){
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? (window.scrollY / h) * 100 : 0;
    if(bar) bar.style.width = Math.min(100, Math.max(0, p)) + '%';
    if(top) top.classList.toggle('show', window.scrollY > 400);
    nav?.classList.toggle('scrolled', window.scrollY > 12);
    raf = null;
  }
  window.addEventListener('scroll', ()=>{
    if(raf === null) raf = requestAnimationFrame(update);
  }, {passive:true});
  window.addEventListener('resize', update, {passive:true});
  update();

  top?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  // app-bar active link
  const here = window.SR_PAGE || "index.html";
  document.querySelectorAll('.appbar a[data-nav]').forEach(a=>{
    if(a.dataset.nav === here) a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  runIntro();
  initNav();
  initShell();
  initReveal();
  initCounters();
  document.querySelectorAll('[data-year]').forEach(e=> e.textContent = new Date().getFullYear());
});




/* ============================================================
   SR CODEMATRIX — AUTH
   ------------------------------------------------------------
   PRIORITY:
     1) Firebase Auth (asli Google login + Firestore user doc)
     2) Raw Google OAuth (GOOGLE_CLIENT_ID) — agar Firebase off ho
     3) Guest preview (sirf local session)

   (koi demo/fake account nahi — sab real data)
   ============================================================ */

const SRAuth = {

  /* ---------- kaun sa mode chal raha hai ---------- */
  mode(){
    if(window.SRFB && SRFB.configured()) return 'firebase';
    if(SR_CONFIG.GOOGLE_CLIENT_ID && SR_CONFIG.GOOGLE_CLIENT_ID.trim() !== '') return 'google';
    return 'local';
  },

  ready(){
    return this.mode() !== 'local';
  },

  /* ---------- local session (fallback) ---------- */
  getUser(){
    try { return JSON.parse(localStorage.getItem('srcm_user') || 'null'); }
    catch(e){ return null; }
  },
  save(u){
    u.loggedAt = new Date().toISOString();
    localStorage.setItem('srcm_user', JSON.stringify(u));
  },
  _clearLocal(){ localStorage.removeItem('srcm_user'); },

  initials(name="?"){
    return name.trim().split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase();
  },
  colorFor(str=""){
    let h=0; for(let i=0;i<str.length;i++) h = (h*31 + str.charCodeAt(i)) >>> 0;
    const a = h % 360, b = (a + 55) % 360;
    return `linear-gradient(135deg,hsl(${a} 78% 58%),hsl(${b} 72% 52%))`;
  },
  avatarHTML(user, cls=""){
    if(!user) return "";
    const inner = user.picture
      ? `<img src="${user.picture}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover">`
      : this.initials(user.name);
    return `<span class="avatar ${cls}" style="background:${user.picture ? '#fff' : this.colorFor(user.email||user.name)}">${inner}</span>`;
  },

  /* ============================================================
     GOOGLE SIGN-IN
     ============================================================ */
  async googleSignIn(){
    if(this.mode() === 'firebase'){
      try{
        SRToast('Google se sign-in ho raha hai…', 'ok', 'Please wait');
        const u = await SRFB.signInGoogle();
        await this._firebaseSession(u);
      }catch(e){
        console.warn('firebase signin:', e);
        const msg = (e.code === 'auth/popup-blocked')
          ? 'Popup block ho gaya — browser me allow karo.'
          : (e.code === 'auth/unauthorized-domain')
            ? 'Ye domain Firebase Auth me add nahi hai (Console → Authentication → Settings → Authorized domains).'
            : (e.message || 'Sign-in fail');
        SRToast(msg, 'err');
      }
      return;
    }
    /* ---- fallback: raw Google OAuth ---- */
    if(this.mode() === 'local'){
      SRToast('Pehle config.js me Firebase ya Google Client ID daalo.', 'err', 'Setup Required');
      return;
    }
    if(!window.google?.accounts?.id){
      SRToast('Google abhi load ho raha hai — 2 second baad try karo.', 'err'); return;
    }
    google.accounts.id.prompt();
  },

  /* Firebase user → local session mirror (header/dashboard isi se chalte hain) */
  async _firebaseSession(u){
    let profile = null;
    try{ profile = await SRFB.ensureUser(u); }catch(e){ console.warn(e); }
    const d = (profile && profile.data && profile.data()) || profile || {};
    this.save({
      uid     : u.uid,
      name    : d.name     || u.displayName || 'User',
      email   : d.email    || u.email || '',
      picture : d.photo    || u.photoURL || null,
      provider: 'google',
      role    : d.role     || 'client',
      referral: d.referralCode || '',
    });
    this.paintHeader();
    SRToast(`Welcome ${(u.displayName||'User').split(' ')[0]}!`, 'ok', 'Signed in');
    setTimeout(()=> this.go('dashboard'), 700);
  },

  /* ---------- raw Google JWT (fallback mode) ---------- */
  handleCredential(resp){
    if(!resp || !resp.credential){
      SRToast("Google sign-in complete nahi hua. Dobara try karo.", "err"); return;
    }
    try{
      const p = JSON.parse(atob(resp.credential.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
      this.save({
        name : p.name || "User", email: p.email || "", picture: p.picture || null,
        provider: "google", role : "Client",
      });
      SRToast(`Welcome ${(p.name||"User").split(' ')[0]}!`, "ok", "Signed in");
      setTimeout(()=> this.go('dashboard'), 700);
    }catch(e){
      SRToast("Login decode nahi ho paya. Dobara try karo.", "err");
    }
  },

  /* ---------- Guest preview (sirf local session, koi server data nahi) ---------- */
  guest(){
    if(!SR_CONFIG.ALLOW_GUEST){
      SRToast("Guest preview band hai. Google se login karo.", "err"); return;
    }
    this.save({ name:"Guest", email:"", picture:null, provider:"guest", role:"Preview" });
    this.go('dashboard');
  },

  async signOut(){
    try{ await SRFB.signOut(); }catch(e){}
    this._clearLocal();
    SRToast("Signed out ho gaye.");
    setTimeout(()=> this.go('index'), 600);
  },

  requireAuth(){
    const u = this.getUser();
    if(!u){ this.go('login'); return null; }
    return u;
  },

  /* ---------- navigation (single-file router + multi-file dono me chale) ---------- */
  go(page){
    if(location.hash && document.getElementById('srPage')) location.hash = page;
    else location.href = page + '.html';
  },

  /* ============================================================
     GOOGLE SDK (fallback mode me hi chahiye)
     ============================================================ */
  loadGoogle(){
    if(this.mode() !== 'google') return;
    if(document.getElementById('gis')) return;
    const s = document.createElement('script');
    s.id = 'gis'; s.src = "https://accounts.google.com/gsi/client"; s.async = true; s.defer = true;
    s.onload = () => {
      try{
        google.accounts.id.initialize({
          client_id: SR_CONFIG.GOOGLE_CLIENT_ID,
          callback : r => SRAuth.handleCredential(r),
          auto_select: false, cancel_on_tap_outside: true,
        });
        document.querySelectorAll('.gbtn').forEach(b=>{
          b.disabled = false; b.classList.remove('is-disabled');
        });
      }catch(e){ console.warn("GIS init error:", e); }
    };
    s.onerror = () => SRToast("Google SDK load nahi hua — internet/domain check karo.", "err");
    document.head.appendChild(s);
  },

  /* ============================================================
     HEADER (nav + drawer)
     ============================================================ */
  paintHeader(){
    const u = this.getUser();
    const dashHref = document.getElementById('srPage') ? '#dashboard' : 'dashboard.html';
    const loginHref= document.getElementById('srPage') ? '#login'    : 'login.html';
    document.querySelectorAll('[data-auth-slot]').forEach(slot=>{
      if(u){
        slot.innerHTML = `
          <button class="chip" onclick="SRAuth.go('dashboard')" title="Dashboard">
            ${this.avatarHTML(u)}<span>${u.name.split(' ')[0]}</span>
          </button>
          <button class="btn btn-ghost btn-sm" onclick="SRAuth.signOut()">Sign out</button>`;
      }else{
        slot.innerHTML = `<a href="${loginHref}" class="btn btn-primary btn-sm">Login</a>`;
      }
    });
  },

  /* ============================================================
     PAGE-LEVEL BUTTONS (login page)
     ============================================================ */
  bindPage(){
    document.querySelectorAll('.gbtn').forEach(b=>{
      b.addEventListener('click', e=>{ e.preventDefault(); SRAuth.googleSignIn(); });
    });
    document.querySelectorAll('[data-guest]').forEach(b=>{
      b.addEventListener('click', ()=> SRAuth.guest());
    });

    /* login page par status note */
    const note = document.getElementById('oauthNote');
    if(note){
      const m = this.mode();
      note.className = (m === 'local') ? "notice" : "notice ok";
      note.innerHTML =
        m === 'firebase'
          ? `<b>● LIVE (Firebase)</b> — asli Google Sign-In ready hai. Neeche button dabao.`
          : m === 'google'
            ? `<b>● LIVE (Google OAuth)</b> — asli Google Sign-In ready hai. Neeche button dabao.`
            : `<b>● SETUP REQUIRED</b><br>
               Login abhi inactive hai. <code>assets/js/config.js</code> kholo aur
               <code>FIREBASE</code> block bharein (ya <code>GOOGLE_CLIENT_ID</code> daalo).`;
    }
  },

  /* ---------- Firebase auth state change → session mirror ---------- */
  watchFirebase(){
    if(this.mode() !== 'firebase') return;
    SRFB.whenReady(()=>{
      SRFB.onAuth(async u=>{
        if(u){
          const cur = this.getUser();
          if(!cur || cur.uid !== u.uid) await this._firebaseSession(u);
          else this.paintHeader();
        }else{
          if(this.getUser() && this.getUser().provider === 'google') this._clearLocal();
          this.paintHeader();
        }
      });
    });
  },
};

document.addEventListener('DOMContentLoaded', ()=>{
  SRAuth.loadGoogle();
  SRAuth.watchFirebase();
  SRAuth.paintHeader();
  SRAuth.bindPage();
});

/* window par bhi rakho (single-file bundle ka router isi se call karta hai) */
window.SRAuth = SRAuth;




(function(){
  const _dw = document.write.bind(document);
  let buf = '';
  document.write = h => { buf += h; };
  /* SR CODEMATRIX — Shared Header (DATA driven · systematic) */
(function(){
  const B = (window.DATA && DATA.brand) || { name:"SR Codematrix", short:"SR" };

  const links = [
    ["index.html","Home"],
    ["features.html","Features"],
    ["store.html","Store"],
    ["earnings.html","Earnings"],
    ["order.html","Banvayein"],
    ["dashboard.html","Dashboard"],
    ["admin.html","Admin"],
  ];
  const here = window.SR_PAGE || "index.html";

  const navLinks = links.map(([h,t])=>
    `<a href="${h}"${h===here?' class="active"':''}>${t}</a>`).join('');

  const drawerLinks = links.map(([h,t])=>
    `<a href="${h}"${h===here?' class="active"':''}>${t}</a>`).join('');

  const showBanner = (window.SR_CONFIG ? SR_CONFIG.SHOW_SETUP_BANNER : true)
                     && window.DATA && DATA.setupComplete === false;

  const banner = showBanner ? `
  <div class="setup-bar" id="setupBar">
    <span>⚙️ <b>Setup pending</b> — <code>assets/js/data.js</code> me apni details bharein.</span>
    <button onclick="document.getElementById('setupBar').remove()">Samajh gaya</button>
  </div>` : "";

  document.write(`
${banner}
<div class="progress"><i id="progBar"></i></div>

<header class="nav">
  <div class="wrap nav-in">
    <a href="index.html" class="logo">
      <span class="mark">${B.short || "SR"}</span>
      <span>${(B.name || "SR Codematrix").replace(B.short || "SR", '') || "Codematrix"}
        <span class="sub">${B.tagline || "WEBSITE · STORE"}</span>
      </span>
    </a>

    <nav class="nav-links">${navLinks}</nav>

    <div class="nav-actions" data-auth-slot></div>

    <button class="burger" id="burger" aria-label="Menu" aria-expanded="false" aria-controls="mDrawer">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M4 7h16M4 12h16M4 17h16"/>
      </svg>
    </button>
  </div>

  <div class="drawer" id="mDrawer">
    ${drawerLinks}
    <div class="drawer-auth" data-auth-slot></div>
  </div>
</header>`);
})();

  document.write = _dw;
  document.getElementById('srHeader').innerHTML = buf;
})();



(function(){
  const _dw = document.write.bind(document);
  let buf = '';
  document.write = h => { buf += h; };
  /* SR CODEMATRIX — Shared Footer (DATA driven) */
(function(){
  const D = window.DATA || {};
  const B = D.brand || {}, S = D.social || {};
  const name = B.name || "SR Codematrix";
  const dash = v => (v === "" || v === null || v === undefined) ? "—" : v;

  const SOCIALS = [
    ["whatsapp","s-wa", '<svg viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.03-.19-.31a8.22 8.22 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23z"/></svg>'],
    ["instagram","s-ig", '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.9-11.1a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z"/></svg>'],
    ["facebook","s-fb", '<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>'],
    ["youtube","s-yt", '<svg viewBox="0 0 24 24"><path d="M23 12s0-3.5-.5-5.2a2.7 2.7 0 0 0-1.9-1.9C19 4.4 12 4.4 12 4.4s-7 0-8.6.5a2.7 2.7 0 0 0-1.9 1.9C1 8.5 1 12 1 12s0 3.5.5 5.2a2.7 2.7 0 0 0 1.9 1.9c1.6.5 8.6.5 8.6.5s7 0 8.6-.5a2.7 2.7 0 0 0 1.9-1.9c.5-1.7.5-5.2.5-5.2zM9.8 15.6V8.4l6.3 3.6z"/></svg>'],
    ["linkedin","s-in", '<svg viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.3a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zM19 19h-3v-4.7c0-1.1-.4-1.9-1.4-1.9s-1.6.8-1.6 1.9V19h-3v-9h2.9v1.2a3.2 3.2 0 0 1 2.9-1.5c2.1 0 3.2 1.4 3.2 4z"/></svg>'],
    ["twitter","s-x", '<svg viewBox="0 0 24 24"><path d="M18.9 2H22l-7 8 7.5 12h-6.3l-5-7.3L5.6 22H2.4l7.3-8.4L2.2 2h6.4l4.6 6.8zm-1.1 18h1.7L7.4 3.7H5.6z"/></svg>'],
  ];

  const socialHTML = SOCIALS
    .filter(([k])=> S[k] && String(S[k]).trim() !== "")
    .map(([k,cls,svg])=> `<a class="${cls}" href="${S[k]}" target="_blank" rel="noopener" title="${k}">${svg}</a>`)
    .join('');

  const wa = (S.whatsapp || B.whatsapp || "").toString().trim();

  document.write(`
<footer class="mesh">
  <span class="blob b3"></span>
  <span class="blob b4"></span>
  <div class="wrap">
    <div class="f-top">
      <a href="index.html" class="logo">
        <span class="mark">${B.short || "SR"}</span>
        <span>${(B.name || "SR Codematrix").replace(B.short || "SR", '') || "Codematrix"}</span>
      </a>
      <p class="f-desc muted small">${dash(B.description)}</p>
      ${socialHTML ? `<div class="social f-social">${socialHTML}</div>` : ""}
    </div>

    <div class="f-links">
      <div class="f-col">
        <h5>Products</h5>
        <ul>
          <li><a href="store.html">Website Templates</a></li>
          <li><a href="store.html">E-Commerce Sites</a></li>
          <li><a href="order.html">Custom Development</a></li>
          <li><a href="features.html">Feature List</a></li>
          <li><a href="earnings.html">Reseller Program</a></li>
        </ul>
      </div>

      <div class="f-col">
        <h5>Company</h5>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="earnings.html">Multi Income Model</a></li>
          <li><a href="features.html">Why Choose Us</a></li>
          <li><a href="dashboard.html">My Dashboard</a></li>
          <li><a href="login.html">Login</a></li>
        </ul>
      </div>

      <div class="f-col">
        <h5>Contact</h5>
        <ul>
          <li>${B.email    ? `<a href="mailto:${B.email}">${B.email}</a>`              : `<span class="muted">—</span>`}</li>
          <li>${B.phone    ? `<a href="tel:${String(B.phone).replace(/[^0-9+]/g,'')}">${B.phone}</a>` : `<span class="muted">—</span>`}</li>
          <li>${wa         ? `<a href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp Chat</a>` : `<span class="muted">—</span>`}</li>
          <li class="muted small">${dash(B.address)}</li>
          <li class="muted small">${dash(B.hours)}</li>
        </ul>
      </div>

      <div class="f-col">
        <h5>Admin</h5>
        <ul>
          <li><a href="admin.html">Admin Panel</a></li>
          <li><a href="admin.html">Website Content Edit</a></li>
          <li><a href="admin.html">Templates / Rates</a></li>
          <li><a href="admin.html">Data Backup</a></li>
          <li><a href="admin.html">Reset Data</a></li>
        </ul>
      </div>
    </div>

    <div class="f-bot">
      <span>© <span data-year>2026</span> ${name}. All rights reserved.${B.gstin ? " · GSTIN " + B.gstin : ""}</span>
      <span class="f-made">Made with <span class="f-heart">❤</span> in India</span>
    </div>
  </div>
</footer>

<!-- ===== APP-LIKE BOTTOM BAR (mobile only) ===== -->
<nav class="appbar" aria-label="Quick navigation">
  <ul>
    <li><a href="index.html" data-nav="index.html">
      <svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>
      Home</a></li>
    <li><a href="store.html" data-nav="store.html">
      <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg>
      Store</a></li>
    <li><a href="order.html" data-nav="order.html">
      <svg viewBox="0 0 24 24"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>
      Banvayein</a></li>
    <li><a href="earnings.html" data-nav="earnings.html">
      <svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      Earn</a></li>
    <li><a href="dashboard.html" data-nav="dashboard.html">
      <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      Account</a></li>
  </ul>
</nav>

<button class="to-top" id="toTop" aria-label="Upar jayein" title="Upar jayein">
  <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
</button>

${wa ? `<a class="wa" href="https://wa.me/${wa}" target="_blank" rel="noopener" title="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.03-.19-.31a8.22 8.22 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23z"/></svg>
</a>` : ""}`);
})();

  document.write = _dw;
  document.getElementById('srFooter').innerHTML = buf;
})();



/* ---------- helpers ---------- */
function SRReady(fn){ try{ fn(); }catch(e){ console.error(e); } }
function SRGo(name){ location.hash = name; }

const SRPAGES = {
  index: "<!-- ================= INTRO ================= -->\n\n\n\n\n\n\n\n\n  \n\n\n\n\n<!-- ================= HERO ================= -->\n<section class=\"hero mesh\">\n  <span class=\"blob b1\"></span><span class=\"blob b2\"></span><span class=\"blob b3\"></span>\n  <div class=\"dots\"></div>\n  <div class=\"wrap\">\n    <div class=\"hero-grid\">\n      <div>\n        <span class=\"eyebrow\"><span class=\"dot\"></span> <span id=\"heroEyebrow\"></span></span>\n        <h1 class=\"mt-16\">\n          <span id=\"hL1\"></span> <span class=\"grad-text\" id=\"hH1\"></span><br>\n          <span id=\"hL2\"></span> <span class=\"grad-text cool\" id=\"hH2\"></span>\n        </h1>\n        <p class=\"lead\" id=\"heroSub\"></p>\n\n        <div class=\"row mt-24\">\n          <a class=\"btn btn-primary\" id=\"cta1\">\n            <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z\"></path><path d=\"M3 6h18M16 10a4 4 0 0 1-8 0\"></path></svg>\n            <span id=\"cta1t\"></span>\n          </a>\n          <a class=\"btn btn-ghost\" id=\"cta2\"><span id=\"cta2t\"></span> →</a>\n        </div>\n\n        <div class=\"hero-badges\" id=\"heroBadges\"></div>\n      </div>\n\n      <!-- CSS/SVG showcase graphics -->\n      <div class=\"showcase\">\n        <div class=\"hero-main-card\">\n          <div class=\"browser\"><i style=\"background:#f43f5e\"></i><i style=\"background:#f59e0b\"></i><i style=\"background:#10b981\"></i></div>\n          <div class=\"skel\"><i></i><i></i><i></i><i></i><i></i></div>\n        </div>\n        <div class=\"float-card fc1\">\n          <span class=\"fc-ic\" style=\"background:linear-gradient(135deg,#f59e0b,#f97316)\">\n            <svg viewBox=\"0 0 24 24\"><path d=\"M13 2 3 14h8l-1 8 10-12h-8z\"></path></svg></span>\n          <div><b>Lightning Fast</b><span>95+ PageSpeed</span></div>\n        </div>\n        <div class=\"float-card fc2\">\n          <span class=\"fc-ic\" style=\"background:linear-gradient(135deg,#10b981,#14b8a6)\">\n            <svg viewBox=\"0 0 24 24\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"></path></svg></span>\n          <div><b>Secure by Default</b><span>SSL + daily backup</span></div>\n        </div>\n        <div class=\"float-card fc3\">\n          <span class=\"fc-ic\" style=\"background:linear-gradient(135deg,#ec4899,#f43f5e)\">\n            <svg viewBox=\"0 0 24 24\"><path d=\"M3 3v18h18\"></path><path d=\"m7 14 4-4 3 3 5-6\"></path></svg></span>\n          <div><b>SEO + Growth</b><span>Rank on Google</span></div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"stat-grid\" id=\"statGrid\"></div>\n  </div>\n</section>\n<div id=\"wave1\"></div>\n\n<!-- ================= DO RAASTE ================= -->\n<section class=\"section tint tint-indigo\">\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow\"><span class=\"dot\"></span> Do raaste — aap choose karo</span>\n      <h2 class=\"h2 mt-16\">Sirf website nahi, <span class=\"grad-text\">poora business</span></h2>\n      <p>Template kharido ya scratch se banvayein — dono ka rasta yahin se shuru hota hai.</p>\n    </div>\n    <div class=\"grid g2\" id=\"pathsGrid\"></div>\n  </div>\n</section>\n<div id=\"wave2\"></div>\n\n<!-- ================= CORE FEATURES ================= -->\n<section class=\"section tint tint-violet\">\n  <span class=\"blob b4\"></span>\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow pink\"><span class=\"dot\"></span> Core Features</span>\n      <h2 class=\"h2 mt-16\">Har website me <span class=\"grad-text warm\">ye sab built-in</span></h2>\n      <p>Basic package me hi milta hai — koi extra charge nahi.</p>\n    </div>\n    <div class=\"grid g3\" id=\"coreGrid\"></div>\n    <div class=\"center mt-32\"><a href=\"features.html\" class=\"btn btn-outline\">Poori Feature List (110+) →</a></div>\n  </div>\n</section>\n\n<!-- ================= WHY CHOOSE ================= -->\n<section class=\"section-sm tint tint-mint\">\n  <div class=\"wrap\">\n    <div class=\"grid g4\" id=\"whyGrid\"></div>\n  </div>\n</section>\n\n<!-- ================= INCOME PREVIEW ================= -->\n<section class=\"section tint tint-peach\">\n  <span class=\"blob b2\"></span>\n  <div class=\"wrap\">\n    <div class=\"head\">\n      <span class=\"eyebrow amber\"><span class=\"dot\"></span> Multi Income Model</span>\n      <h2 class=\"h2 mt-16\">Sirf kharcha nahi — <span class=\"grad-text warm\">kamaai bhi</span></h2>\n      <p>Ek platform, 8 alag-alag income sources. Client bano, reseller bano, ya partner.</p>\n    </div>\n    <div class=\"grid g4\" id=\"incomePreview\"></div>\n    <div class=\"center mt-32\"><a href=\"earnings.html\" class=\"btn btn-warm\">Saare 8 Income Sources Dekho →</a></div>\n  </div>\n</section>\n\n<!-- ================= PROCESS ================= -->\n<section class=\"section tint tint-sky\">\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow mint\"><span class=\"dot\"></span> Kaise kaam karta hai</span>\n      <h2 class=\"h2 mt-16\">4 simple steps, <span class=\"grad-text cool\">bas itna hi</span></h2>\n    </div>\n    <div class=\"grid g4\" id=\"processGrid\"></div>\n  </div>\n</section>\n\n<!-- ================= PRICING ================= -->\n<section class=\"section tint tint-rose\">\n  <span class=\"blob b1\"></span>\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow pink\"><span class=\"dot\"></span> Pricing</span>\n      <h2 class=\"h2 mt-16\">Jeb par bhaari nahi, <span class=\"grad-text\">kaam me solid</span></h2>\n      <p>Koi hidden charge nahi — jo likha hai wahi milega.</p>\n    </div>\n    <div class=\"grid g3\" id=\"plansGrid\"></div>\n  </div>\n</section>\n\n<!-- ================= TESTIMONIALS ================= -->\n<section class=\"section tint tint-indigo\">\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow\"><span class=\"dot\"></span> Testimonials</span>\n      <h2 class=\"h2 mt-16\">Clients kya kehte hain</h2>\n    </div>\n    <div id=\"testiBox\"></div>\n  </div>\n</section>\n\n<!-- ================= CTA ================= -->\n<section class=\"section\">\n  <div class=\"wrap\">\n    <div class=\"grad-border\">\n      <div class=\"center\" style=\"padding:52px 30px\">\n        <span class=\"eyebrow\"><span class=\"dot\"></span> Aaj hi shuru karo</span>\n        <h2 class=\"h2 mt-16\">Apni website <span class=\"grad-text\">aaj</span> live karwao</h2>\n        <p class=\"muted mt-12\" style=\"max-width:560px;margin-inline:auto\">\n          Free consultation ke liye WhatsApp karo ya Google account se login kar ke dashboard explore karo.\n        </p>\n        <div class=\"row\" style=\"justify-content:center;margin-top:26px\">\n          <a href=\"login.html\" class=\"btn btn-primary\">Google se Login Karo</a>\n          <a href=\"order.html\" class=\"btn btn-ghost\">Free Quote Pao →</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n\n\n\n\n<!-- ===== APP-LIKE BOTTOM BAR (mobile only) ===== -->",
  login: "<main class=\"auth-wrap\">\n  <div class=\"mesh\" style=\"border-radius:26px\">\n    <span class=\"blob b1\"></span><span class=\"blob b2\"></span>\n    <div class=\"auth-card\" data-reveal=\"\" style=\"position:relative;z-index:3\">\n\n      <div class=\"intro-logo\" style=\"width:66px;height:66px;font-size:21px;border-radius:19px;margin-bottom:18px\" id=\"lgMark\">SR</div>\n      <h2><span id=\"lgName\">SR Codematrix</span> me <span class=\"grad-text\">Welcome</span></h2>\n      <p class=\"muted small\">Login kar ke apna dashboard, orders aur earnings dekho.</p>\n\n      <div class=\"mt-24\">\n        <button class=\"gbtn\" type=\"button\">\n          <svg viewBox=\"0 0 48 48\" aria-hidden=\"true\">\n            <path fill=\"#EA4335\" d=\"M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.8 2.6 13.6l7.8 6.1C12.3 13.7 17.6 9.5 24 9.5z\"></path>\n            <path fill=\"#4285F4\" d=\"M46.1 24.5c0-1.6-.1-2.8-.4-4.1H24v8.4h12.5c-.3 2.1-1.6 5.2-4.7 7.3l7.6 5.9c4.5-4.2 6.7-10.3 6.7-17.5z\"></path>\n            <path fill=\"#FBBC05\" d=\"M10.4 28.3A14.6 14.6 0 0 1 9.6 24c0-1.5.3-3 .7-4.3l-7.7-6A23.6 23.6 0 0 0 .5 24c0 3.8.9 7.4 2.5 10.4l7.4-6.1z\"></path>\n            <path fill=\"#34A853\" d=\"M24 47.5c6.2 0 11.5-2 15.4-5.6l-7.6-5.9c-2 1.4-4.8 2.4-7.8 2.4-6.4 0-11.7-4.3-13.6-10.1l-7.4 6.1C6.5 42.2 14.6 47.5 24 47.5z\"></path>\n          </svg>\n          Sign in with Google\n        </button>\n      </div>\n\n      <div id=\"oauthNote\" class=\"notice mt-16\"></div>\n\n      <div class=\"or\">ya</div>\n\n      <button class=\"btn btn-ghost btn-block\" data-guest=\"\">\n        <svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z\"></path><circle cx=\"12\" cy=\"12\" r=\"3\"></circle></svg>\n        Bina login Dashboard Preview Dekho\n      </button>\n      <p class=\"tiny muted mt-12\">Guest mode sirf layout dikhane ke liye hai — koi data save nahi hota server par.</p>\n\n      <div class=\"divider\"></div>\n\n      <div class=\"grid g3\" style=\"gap:10px;text-align:left\">\n        <div style=\"display:flex;gap:8px;align-items:flex-start\">\n          <span class=\"ic i-green\" style=\"width:34px;height:34px;border-radius:10px;margin:0;flex-shrink:0\"><svg viewBox=\"0 0 24 24\" style=\"width:17px;height:17px\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"></path></svg></span>\n          <div class=\"tiny muted\"><b style=\"color:var(--txt)\">Secure</b><br>OAuth 2.0</div>\n        </div>\n        <div style=\"display:flex;gap:8px;align-items:flex-start\">\n          <span class=\"ic i-violet\" style=\"width:34px;height:34px;border-radius:10px;margin:0;flex-shrink:0\"><svg viewBox=\"0 0 24 24\" style=\"width:17px;height:17px\"><path d=\"M13 2 3 14h8l-1 8 10-12h-8z\"></path></svg></span>\n          <div class=\"tiny muted\"><b style=\"color:var(--txt)\">Fast</b><br>2 min setup</div>\n        </div>\n        <div style=\"display:flex;gap:8px;align-items:flex-start\">\n          <span class=\"ic i-amber\" style=\"width:34px;height:34px;border-radius:10px;margin:0;flex-shrink:0\"><svg viewBox=\"0 0 24 24\" style=\"width:17px;height:17px\"><path d=\"M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"></path></svg></span>\n          <div class=\"tiny muted\"><b style=\"color:var(--txt)\">Earn</b><br>Reseller panel</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>\n\n<section class=\"wrap\" style=\"padding-bottom:60px\">\n  <div class=\"grid g3\">\n    <div class=\"card center c-indigo\" data-reveal=\"\">\n      <div class=\"ic i-indigo\" style=\"margin-inline:auto\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"></path></svg></div>\n      <h4>Secure Login</h4>\n      <p class=\"muted small mt-8\">Google OAuth 2.0 — hum aapka password store hi nahi karte.</p>\n    </div>\n    <div class=\"card center c-violet\" data-reveal=\"\" data-delay=\"70\">\n      <div class=\"ic i-violet\" style=\"margin-inline:auto\"><svg viewBox=\"0 0 24 24\"><path d=\"M13 2 3 14h8l-1 8 10-12h-8z\"></path></svg></div>\n      <h4>2 Minute Setup</h4>\n      <p class=\"muted small mt-8\">Login → template chuno → payment → live.</p>\n    </div>\n    <div class=\"card center c-pink\" data-reveal=\"\" data-delay=\"140\">\n      <div class=\"ic i-pink\" style=\"margin-inline:auto\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"></path></svg></div>\n      <h4>Reseller Income</h4>\n      <p class=\"muted small mt-8\">Login ke baad referral link + wallet milta hai.</p>\n    </div>\n  </div>\n</section>\n\n\n\n\n<!-- ===== APP-LIKE BOTTOM BAR (mobile only) ===== -->",
  store: "<!-- HERO -->\n<section class=\"section-sm mesh\" style=\"padding-top:58px\">\n  <span class=\"blob b1\"></span><span class=\"blob b3\"></span>\n  <div class=\"dots\"></div>\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow\"><span class=\"dot\"></span> Website Store</span>\n      <h1 class=\"h1 mt-16\">Ready website <span class=\"grad-text\">kharido</span></h1>\n      <p>Professionally designed templates — download karo, apna content daalo, live ho jao.\n        Source code + installation support included.</p>\n    </div>\n    <div class=\"grid g3\" style=\"max-width:820px;margin-inline:auto\" id=\"storeMeta\"></div>\n  </div>\n</section>\n<div id=\"waveA\"></div>\n\n<!-- STORE -->\n<section class=\"section tint tint-indigo\" style=\"padding-top:34px\">\n  <div class=\"wrap\">\n    <div class=\"spread mb-24\">\n      <div class=\"filters\" style=\"margin:0\" id=\"filters\"></div>\n      <div class=\"small muted\" id=\"countLbl\"></div>\n    </div>\n    <div id=\"storeBody\"></div>\n  </div>\n</section>\n\n<!-- WHY -->\n<section class=\"section tint tint-mint\">\n  <div class=\"wrap\">\n    <div class=\"head center\"><h2 class=\"h2\">Har template me <span class=\"grad-text fresh\">kya milta hai</span></h2></div>\n    <div class=\"grid g4\">\n      <div class=\"card center c-indigo\" data-reveal=\"\">\n        <div class=\"ic i-indigo\" style=\"margin-inline:auto\"><svg viewBox=\"0 0 24 24\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path><path d=\"M14 2v6h6\"></path></svg></div>\n        <b>Full Source Code</b><p class=\"muted small mt-8\">Zip file + documentation</p></div>\n      <div class=\"card center c-green\" data-reveal=\"\" data-delay=\"60\">\n        <div class=\"ic i-green\" style=\"margin-inline:auto\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"></path></svg></div>\n        <b>Free SSL</b><p class=\"muted small mt-8\">HTTPS + security headers</p></div>\n      <div class=\"card center c-cyan\" data-reveal=\"\" data-delay=\"120\">\n        <div class=\"ic i-cyan\" style=\"margin-inline:auto\"><svg viewBox=\"0 0 24 24\"><rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\"></rect><path d=\"M12 18h.01\"></path></svg></div>\n        <b>100% Responsive</b><p class=\"muted small mt-8\">Har device pe perfect</p></div>\n      <div class=\"card center c-amber\" data-reveal=\"\" data-delay=\"180\">\n        <div class=\"ic i-amber\" style=\"margin-inline:auto\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M12 6v6l4 2\"></path></svg></div>\n        <b>Installation Support</b><p class=\"muted small mt-8\">Hum setup karke denge</p></div>\n    </div>\n  </div>\n</section>\n\n\n\n\n<!-- ===== APP-LIKE BOTTOM BAR (mobile only) ===== -->",
  earnings: "<!-- HERO -->\n<section class=\"section-sm mesh\" style=\"padding-top:58px\">\n  <span class=\"blob b1\"></span><span class=\"blob b4\"></span>\n  <div class=\"dots\"></div>\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow amber\"><span class=\"dot\"></span> Multi Income Model</span>\n      <h1 class=\"h1 mt-16\">Ek platform, <span class=\"grad-text warm\">8 kamaai ke raaste</span></h1>\n      <p>Sirf website banane ki jagah nahi — ek complete income ecosystem. Client bano, reseller bano, ya partner.</p>\n    </div>\n    <div class=\"grid g4\" id=\"earnMeta\"></div>\n  </div>\n</section>\n<div id=\"waveE\"></div>\n\n<!-- SOURCES -->\n<section class=\"section tint tint-peach\" style=\"padding-top:34px\">\n  <div class=\"wrap\">\n    <div class=\"head\">\n      <span class=\"eyebrow amber\"><span class=\"dot\"></span> Saare sources</span>\n      <h2 class=\"h2 mt-16\">8 tarah se <span class=\"grad-text warm\">paisa kaise banta hai</span></h2>\n      <p>Har source ka detail — kaise shuru karein, kitna effort, aur kitna mil sakta hai.</p>\n    </div>\n    <div class=\"grid g2\" id=\"srcGrid\"></div>\n  </div>\n</section>\n\n<!-- REVENUE MIX -->\n<section class=\"section tint tint-sky\">\n  <div class=\"wrap\">\n    <div class=\"grid g2\" style=\"align-items:center;gap:40px\">\n      <div>\n        <span class=\"eyebrow mint\"><span class=\"dot\"></span> Revenue Mix</span>\n        <h2 class=\"h2 mt-16\">Kaunsa source <span class=\"grad-text cool\">sabse zyada</span> deta hai</h2>\n        <p class=\"muted mt-12\">\n          Har business ka mix alag hota hai. Neeche chart me apna actual revenue split daal sakte ho —\n          <code style=\"background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:1px 6px\">data.js → revenueMix</code>\n        </p>\n        <ul class=\"f-list mt-24\">\n          <li><span class=\"tk\"><svg viewBox=\"0 0 24 24\"><path d=\"M20 6 9 17l-5-5\"></path></svg></span> <b>One-time:</b> Template + custom projects</li>\n          <li><span class=\"tk\"><svg viewBox=\"0 0 24 24\"><path d=\"M20 6 9 17l-5-5\"></path></svg></span> <b>Recurring:</b> Hosting, domain, AMC</li>\n          <li><span class=\"tk\"><svg viewBox=\"0 0 24 24\"><path d=\"M20 6 9 17l-5-5\"></path></svg></span> <b>Passive:</b> Referral, ad share, courses</li>\n        </ul>\n      </div>\n      <div class=\"card\" id=\"mixCard\">\n        <h3 class=\"h3 mb-24\">Revenue Split</h3>\n        <div id=\"mixBox\"></div>\n      </div>\n    </div>\n  </div>\n</section>\n\n<!-- RESELLER -->\n<section class=\"section tint tint-violet\">\n  <span class=\"blob b2\"></span>\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow pink\"><span class=\"dot\"></span> Reseller Program</span>\n      <h2 class=\"h2 mt-16\">Reseller bano — <span class=\"grad-text\">commission kamao</span></h2>\n      <p id=\"resellerNote\"></p>\n    </div>\n    <div class=\"tbl-wrap\"><table id=\"resellerTbl\"></table></div>\n  </div>\n</section>\n\n<!-- CALCULATOR -->\n<section class=\"section tint tint-mint\">\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow mint\"><span class=\"dot\"></span> Earning Calculator</span>\n      <h2 class=\"h2 mt-16\">Apni potential <span class=\"grad-text fresh\">kamaai dekho</span></h2>\n    </div>\n    <div class=\"card\" style=\"max-width:640px;margin-inline:auto\">\n      <div class=\"field\">\n        <label>Mahine me kitne clients la sakte ho? <b style=\"color:#4f46e5\" id=\"clVal\">10</b></label>\n        <input type=\"range\" id=\"clients\" min=\"1\" max=\"50\" value=\"10\">\n      </div>\n      <div class=\"field\">\n        <label>Average order value: <b style=\"color:#4f46e5\" id=\"avVal\">₹5,000</b></label>\n        <input type=\"range\" id=\"aov\" min=\"1000\" max=\"100000\" step=\"500\" value=\"5000\">\n      </div>\n      <div class=\"divider\"></div>\n      <div class=\"spread\">\n        <div>\n          <div class=\"kicker\">Monthly commission <span id=\"commLbl\"></span></div>\n          <div class=\"h2 grad-text\" id=\"calcOut\">—</div>\n        </div>\n        <div style=\"text-align:right\">\n          <div class=\"kicker\">Saal ka</div>\n          <div class=\"h3\" id=\"calcYear\">—</div>\n        </div>\n      </div>\n      <p class=\"tiny muted mt-12\">*Ye sirf ek estimate hai. Actual earning aapke effort par depend karti hai.</p>\n    </div>\n  </div>\n</section>\n\n\n\n\n<!-- ===== APP-LIKE BOTTOM BAR (mobile only) ===== -->",
  order: "<section class=\"section-sm mesh\" style=\"padding-top:58px\">\n  <span class=\"blob b1\"></span><span class=\"blob b2\"></span>\n  <div class=\"dots\"></div>\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow\"><span class=\"dot\"></span> Custom Website</span>\n      <h1 class=\"h1 mt-16\">Apni website <span class=\"grad-text\">banvayein</span></h1>\n      <p>Neeche apna requirement select karo — <b style=\"color:#10b981\">live quote</b> turant milega.\n        Form bhejte hi hum contact karenge.</p>\n    </div>\n  </div>\n</section>\n<div id=\"waveO\"></div>\n\n<section class=\"section tint tint-indigo\" style=\"padding-top:34px\">\n  <div class=\"wrap\">\n    <div class=\"grid order-grid\">\n\n      <!-- FORM -->\n      <div class=\"card\">\n        <h3 class=\"h3 mb-8\">1. Website ka type chuno</h3>\n        <p class=\"muted small mb-16\">Sabse pehle batayein aapko kaisi website chahiye.</p>\n        <div class=\"opt\" id=\"typeOpts\"></div>\n\n        <div class=\"divider\"></div>\n\n        <h3 class=\"h3 mb-8\">2. Kitne pages chahiye?</h3>\n        <div class=\"field mt-16\">\n          <label>Pages: <b style=\"color:#4f46e5\" id=\"pgVal\">5</b>\n            <span class=\"muted small\" id=\"pgRate\"></span></label>\n          <input type=\"range\" id=\"pages\" min=\"1\" max=\"30\" value=\"5\">\n          <div class=\"spread tiny muted\"><span>1</span><span>30</span></div>\n        </div>\n\n        <div class=\"divider\"></div>\n\n        <h3 class=\"h3 mb-8\">3. Extra features (jo chahiye wo tick karo)</h3>\n        <p class=\"muted small mb-16\">Har feature ka alag charge — total right side me live update hoga.</p>\n        <div id=\"addons\"></div>\n\n        <div class=\"divider\"></div>\n\n        <h3 class=\"h3 mb-8\">4. Delivery speed</h3>\n        <div class=\"opt mt-16\" id=\"speedOpts\"></div>\n\n        <div class=\"divider\"></div>\n\n        <h3 class=\"h3 mb-16\">5. Apni details</h3>\n        <form id=\"orderForm\">\n          <div class=\"grid g2\" style=\"gap:0 14px\">\n            <div class=\"field\"><label>Poora Naam <span>*</span></label><input type=\"text\" id=\"oName\" required=\"\"></div>\n            <div class=\"field\"><label>WhatsApp Number <span>*</span></label><input type=\"tel\" id=\"oPhone\" required=\"\" pattern=\"[0-9+ ]{8,}\"></div>\n            <div class=\"field\"><label>Email <span>*</span></label><input type=\"email\" id=\"oEmail\" required=\"\"></div>\n            <div class=\"field\"><label>Business Name</label><input type=\"text\" id=\"oBiz\"></div>\n          </div>\n          <div class=\"field\">\n            <label>Business Category</label>\n            <select id=\"oCat\">\n              <option>Retail / Shop</option><option>Restaurant / Cafe</option><option>Clinic / Hospital</option>\n              <option>School / Coaching</option><option>Real Estate</option><option>Manufacturing</option>\n              <option>IT / Agency</option><option>Salon / Gym</option><option>NGO / Trust</option><option>Other</option>\n            </select>\n          </div>\n          <div class=\"field\">\n            <label>Apna requirement detail me batao</label>\n            <textarea id=\"oNote\" placeholder=\"Jaise: online booking chahiye, 3 language me site chahiye, payment gateway lagana hai…\"></textarea>\n          </div>\n          <button type=\"submit\" class=\"btn btn-primary btn-block btn-lg\">Requirement Bhejo — Free Quote Pao</button>\n          <p class=\"tiny muted center mt-12\">🔒 Aapki details sirf quote ke liye use hongi.</p>\n        </form>\n      </div>\n\n      <!-- LIVE QUOTE -->\n      <div style=\"position:sticky;top:calc(var(--nav-h) + 20px)\">\n        <div class=\"card\" style=\"box-shadow:0 20px 50px -20px rgba(79,70,229,.35)\">\n          <span class=\"eyebrow\"><span class=\"dot\"></span> Live Quote</span>\n          <div class=\"mt-16\" id=\"sumBox\"></div>\n          <div class=\"divider\"></div>\n          <div class=\"spread\">\n            <div><div class=\"kicker\">Estimated Total</div><div class=\"h2 grad-text\" id=\"total\">—</div></div>\n            <div style=\"text-align:right\"><div class=\"kicker\">Delivery</div><div class=\"h3\" id=\"deliv\">—</div></div>\n          </div>\n          <div id=\"priceWarn\"></div>\n          <div class=\"divider\"></div>\n          <div class=\"grid g2\" style=\"gap:8px\">\n            <div class=\"kpi\" style=\"padding:12px\"><div class=\"lbl\">Advance (50%)</div><div class=\"val\" style=\"font-size:19px\" id=\"adv\">—</div></div>\n            <div class=\"kpi\" style=\"padding:12px\"><div class=\"lbl\">After Delivery</div><div class=\"val\" style=\"font-size:19px\" id=\"bal\">—</div></div>\n          </div>\n          <div class=\"divider\"></div>\n          <div class=\"kicker mb-8\">Package me included</div>\n          <div id=\"inclBox\"></div>\n        </div>\n\n        <div class=\"card mt-16\">\n          <h4>Need help?</h4>\n          <p class=\"muted small mt-8\">Confused ho? Seedha baat kar lo — free consultation.</p>\n          <div class=\"grid\" style=\"gap:8px;margin-top:14px\" id=\"helpBox\"></div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</section>\n\n<!-- PROCESS -->\n<section class=\"section tint tint-mint\">\n  <div class=\"wrap\">\n    <div class=\"head center\"><h2 class=\"h2\">Order ke baad <span class=\"grad-text fresh\">kya hoga</span></h2></div>\n    <div class=\"grid g4\" id=\"procBox\"></div>\n  </div>\n</section>\n\n\n\n\n<!-- ===== APP-LIKE BOTTOM BAR (mobile only) ===== -->",
  features: "<!-- HERO -->\n<section class=\"section-sm mesh\" style=\"padding-top:58px\">\n  <span class=\"blob b1\"></span><span class=\"blob b3\"></span>\n  <div class=\"dots\"></div>\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow\"><span class=\"dot\"></span> Full Feature List</span>\n      <h1 class=\"h1 mt-16\"><span class=\"grad-text\" id=\"fCount\">0</span> features</h1>\n      <p>Hum kya kya dete hain — poori list, koi chhupa hua charge nahi.\n        <span class=\"pill c3\">Included</span> <span class=\"pill c2\">Pro</span> <span class=\"pill c4\">Add-on</span></p>\n    </div>\n    <div class=\"grid g4\" id=\"featMeta\"></div>\n  </div>\n</section>\n<div id=\"waveF\"></div>\n\n<!-- FEATURES -->\n<section class=\"section tint tint-indigo\" style=\"padding-top:34px\">\n  <div class=\"wrap\" id=\"featureRoot\"></div>\n</section>\n\n<!-- COMPARISON -->\n<section class=\"section tint tint-sky\">\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow mint\"><span class=\"dot\"></span> Plan Comparison</span>\n      <h2 class=\"h2 mt-16\">Kaunsa plan <span class=\"grad-text cool\">aapke liye sahi</span></h2>\n    </div>\n    <div class=\"tbl-wrap\"><table id=\"cmpTbl\"></table></div>\n  </div>\n</section>\n\n<!-- TECH STACK -->\n<section class=\"section tint tint-violet\">\n  <span class=\"blob b4\"></span>\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow pink\"><span class=\"dot\"></span> Tech Stack</span>\n      <h2 class=\"h2 mt-16\">Jis technology par <span class=\"grad-text\">bana hai</span></h2>\n    </div>\n    <div class=\"grid g4\" id=\"techGrid\"></div>\n  </div>\n</section>\n\n<!-- FAQ -->\n<section class=\"section tint tint-mint\">\n  <div class=\"wrap\">\n    <div class=\"head center\">\n      <span class=\"eyebrow mint\"><span class=\"dot\"></span> FAQ</span>\n      <h2 class=\"h2 mt-16\">Aksar poochhe jaane wale <span class=\"grad-text fresh\">sawaal</span></h2>\n    </div>\n    <div class=\"grid g2\" id=\"faqBox\"></div>\n  </div>\n</section>\n\n\n\n\n<!-- ===== APP-LIKE BOTTOM BAR (mobile only) ===== -->",
  dashboard: "<div class=\"wrap\">\n  <div class=\"dash\">\n\n    <!-- SIDEBAR -->\n    <aside class=\"side\">\n      <div class=\"side-user\" id=\"sideUser\"></div>\n      <div class=\"side-nav\">\n        <button class=\"on\" data-tab=\"overview\">\n          <svg viewBox=\"0 0 24 24\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"9\" rx=\"1\"></rect><rect x=\"14\" y=\"3\" width=\"7\" height=\"5\" rx=\"1\"></rect><rect x=\"14\" y=\"12\" width=\"7\" height=\"9\" rx=\"1\"></rect><rect x=\"3\" y=\"16\" width=\"7\" height=\"5\" rx=\"1\"></rect></svg>\n          Overview\n        </button>\n        <button data-tab=\"orders\">\n          <svg viewBox=\"0 0 24 24\"><path d=\"M6 2h9l5 5v15H6z\"></path><path d=\"M15 2v5h5\"></path></svg>\n          My Orders <span class=\"badge\" id=\"ordCount\">0</span>\n        </button>\n        <button data-tab=\"earnings\">\n          <svg viewBox=\"0 0 24 24\"><path d=\"M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"></path></svg>\n          Earnings\n        </button>\n        <button data-tab=\"referral\">\n          <svg viewBox=\"0 0 24 24\"><path d=\"M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3\"></path><path d=\"M18 3v4h-4M6 21v-4h4\"></path></svg>\n          Refer &amp; Earn\n        </button>\n        <button data-tab=\"services\">\n          <svg viewBox=\"0 0 24 24\"><path d=\"M14.7 6.3a4 4 0 1 0 5 5L21 7l-4-4z\"></path><path d=\"m3 21 4-4\"></path></svg>\n          New Order\n        </button>\n        <button data-tab=\"settings\">\n          <svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"3\"></circle><path d=\"M19.4 14a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 13.6H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.7 7L4.6 7a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z\"></path></svg>\n          Settings\n        </button>\n        <button onclick=\"SRAuth.signOut()\" style=\"color:#e11d48\">\n          <svg viewBox=\"0 0 24 24\"><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9\"></path></svg>\n          Sign Out\n        </button>\n      </div>\n    </aside>\n\n    <!-- MAIN -->\n    <main>\n      <div id=\"guard\" style=\"display:none\">\n        <div class=\"card center\" style=\"padding:60px 24px\">\n          <div class=\"ic i-indigo\" style=\"margin-inline:auto\"><svg viewBox=\"0 0 24 24\"><rect x=\"4\" y=\"10\" width=\"16\" height=\"11\" rx=\"2\"></rect><path d=\"M8 10V7a4 4 0 0 1 8 0v3\"></path></svg></div>\n          <h3 class=\"h3\">Pehle login karo 🔒</h3>\n          <p class=\"muted mt-8\">Dashboard dekhne ke liye Google account se login zaroori hai.</p>\n          <a href=\"login.html\" class=\"btn btn-primary mt-24\">Login Karo</a>\n        </div>\n      </div>\n\n      <div id=\"dashBody\" style=\"display:none\">\n\n        <!-- OVERVIEW -->\n        <section class=\"tabpane on\" id=\"tab-overview\">\n          <h2 class=\"h2\"><span id=\"welcomeLbl\">Namaste</span>, <span class=\"grad-text\" id=\"firstName\">User</span></h2>\n          <p class=\"muted\">Yeh hai aapke account ka overview.</p>\n\n          <div class=\"grid g4 mt-24\">\n            <div class=\"kpi\"><div class=\"lbl\">Total Orders</div><div class=\"val\" id=\"kOrders\">0</div><div class=\"sub\" id=\"kOrdersSub\">koi order nahi</div></div>\n            <div class=\"kpi\"><div class=\"lbl\">Total Value</div><div class=\"val\" id=\"kValue\">₹0</div><div class=\"sub\">aapke orders ka</div></div>\n            <div class=\"kpi\"><div class=\"lbl\">In Progress</div><div class=\"val\" id=\"kActive\">0</div><div class=\"sub\">chal rahe projects</div></div>\n            <div class=\"kpi\"><div class=\"lbl\">Member Since</div><div class=\"val\" id=\"kSince\" style=\"font-size:20px\">—</div><div class=\"sub\" id=\"kProvider\">—</div></div>\n          </div>\n\n          <div class=\"panel mt-24\">\n            <div class=\"ph\"><h3>Recent Orders</h3>\n              <a href=\"#\" onclick=\"switchTab('orders')\" style=\"color:#4f46e5;font-size:13px;font-weight:700\">Sab dekho →</a></div>\n            <div id=\"recentOrders\"></div>\n          </div>\n\n          <div class=\"grid g2\">\n            <div class=\"panel\" style=\"margin-bottom:0\">\n              <div class=\"ph\"><h3>Quick Actions</h3></div>\n              <div class=\"grid g2\" style=\"gap:10px\">\n                <a href=\"store.html\" class=\"btn btn-ghost btn-sm\">🛍️ Template Kharido</a>\n                <a href=\"order.html\" class=\"btn btn-ghost btn-sm\">🛠️ Site Banvayein</a>\n                <button class=\"btn btn-ghost btn-sm\" onclick=\"switchTab('referral')\">🔗 Referral Link</button>\n                <a href=\"earnings.html\" class=\"btn btn-ghost btn-sm\">💰 Income Guide</a>\n              </div>\n            </div>\n            <div class=\"panel\" style=\"margin-bottom:0\">\n              <div class=\"ph\"><h3>Account</h3></div>\n              <div class=\"small muted\" id=\"acctBox\"></div>\n            </div>\n          </div>\n        </section>\n\n        <!-- ORDERS -->\n        <section class=\"tabpane\" id=\"tab-orders\">\n          <h2 class=\"h2\">My Orders</h2>\n          <p class=\"muted\">Aapke dwara kiye gaye saare orders.</p>\n          <div class=\"mt-24\" id=\"ordersWrap\"></div>\n        </section>\n\n        <!-- EARNINGS -->\n        <section class=\"tabpane\" id=\"tab-earnings\">\n          <h2 class=\"h2\">Earnings</h2>\n          <p class=\"muted\">Reseller commission aur payout ka poora hisaab.</p>\n          <div class=\"grid g3 mt-24\">\n            <div class=\"kpi\"><div class=\"lbl\">Commission Rate</div><div class=\"val\" id=\"eRate\">—</div></div>\n            <div class=\"kpi\"><div class=\"lbl\">Min. Payout</div><div class=\"val\" id=\"eMin\">—</div></div>\n            <div class=\"kpi\"><div class=\"lbl\">Payout Day</div><div class=\"val\" id=\"eDay\" style=\"font-size:20px\">—</div></div>\n          </div>\n          <div class=\"grid g3 mt-16\">\n            <div class=\"kpi\"><div class=\"lbl\">Total Commission</div><div class=\"val\" id=\"kEarn\">₹0</div><div class=\"sub\" id=\"earnNote\">server se verified</div></div>\n            <div class=\"kpi\"><div class=\"lbl\">Wallet Balance</div><div class=\"val\" id=\"kWallet\">₹0</div><div class=\"sub\">payout ke liye ready</div></div>\n            <div class=\"kpi\"><div class=\"lbl\">Referral Bonus</div><div class=\"val\" id=\"kRefBonus\">₹0</div><div class=\"sub\">refer ki hui sales se</div></div>\n          </div>\n          <div class=\"mt-24\" id=\"earningsBody\"></div>\n        </section>\n\n        <!-- REFERRAL -->\n        <section class=\"tabpane\" id=\"tab-referral\">\n          <h2 class=\"h2\">Refer &amp; <span class=\"grad-text\">Earn</span></h2>\n          <p class=\"muted\" id=\"refNote\"></p>\n          <div class=\"grid g2 mt-24\">\n            <div class=\"panel\" style=\"margin-bottom:0\">\n              <h3>Aapka Referral Link</h3>\n              <div class=\"ref-box mt-16\">\n                <input type=\"text\" id=\"refLink\" readonly=\"\">\n                <button class=\"btn btn-primary btn-sm\" id=\"copyRef\">Copy</button>\n              </div>\n              <div class=\"row mt-16\">\n                <button class=\"btn btn-ghost btn-sm\" id=\"shareWA\">WhatsApp Share</button>\n                <button class=\"btn btn-ghost btn-sm\" onclick=\"copyText(document.getElementById('refLink').value,'Link copied!')\">Copy Again</button>\n              </div>\n            </div>\n            <div class=\"panel\" style=\"margin-bottom:0\">\n              <h3>Kaise kaam karta hai</h3>\n              <div class=\"timeline mt-16\">\n                <div class=\"tl\"><div class=\"dotp\">1</div><div><b>Link share karo</b><div class=\"muted small\">WhatsApp, Instagram, Facebook — jahan man kare.</div></div></div>\n                <div class=\"tl\"><div class=\"dotp\">2</div><div><b>Friend kharide</b><div class=\"muted small\">Wo template kharide ya custom site banvaye.</div></div></div>\n                <div class=\"tl\"><div class=\"dotp\">3</div><div><b>Commission mile</b><div class=\"muted small\">Payment clear hote hi aapke wallet me.</div></div></div>\n                <div class=\"tl\"><div class=\"dotp\">4</div><div><b>Withdraw karo</b><div class=\"muted small\">Payout day ko bank/UPI transfer.</div></div></div>\n              </div>\n            </div>\n          </div>\n        </section>\n\n        <!-- NEW ORDER -->\n        <section class=\"tabpane\" id=\"tab-services\">\n          <h2 class=\"h2\">Naya Order <span class=\"grad-text\">Karo</span></h2>\n          <p class=\"muted\">Kya chahiye? Ek click me shuru karo.</p>\n          <div class=\"grid g2 mt-24\" id=\"svcGrid\"></div>\n        </section>\n\n        <!-- SETTINGS -->\n        <section class=\"tabpane\" id=\"tab-settings\">\n          <h2 class=\"h2\">Settings</h2>\n          <p class=\"muted\">Profile aur account preferences.</p>\n          <div class=\"grid g2 mt-24\">\n            <div class=\"panel\">\n              <h3>Profile</h3>\n              <div class=\"field mt-16\"><label>Poora Naam</label><input type=\"text\" id=\"setName\"></div>\n              <div class=\"field\"><label>Email</label><input type=\"email\" id=\"setEmail\" readonly=\"\"></div>\n              <div class=\"field\"><label>Phone</label><input type=\"tel\" id=\"setPhone\" placeholder=\"+91 ...\"></div>\n              <div class=\"field\"><label>Business Name</label><input type=\"text\" id=\"setBiz\"></div>\n              <button class=\"btn btn-primary btn-block\" id=\"saveProfile\">Save Changes</button>\n              <p class=\"tiny muted mt-12\">Ye details sirf aapke browser me save hoti hain.</p>\n            </div>\n            <div class=\"panel\">\n              <h3>Local Data</h3>\n              <p class=\"muted small mt-8\">Dashboard par dikha hua data aapke isi browser me stored hai.</p>\n              <div class=\"row mt-16\">\n                <button class=\"btn btn-ghost btn-sm\" id=\"exportBtn\">Export JSON</button>\n                <button class=\"btn btn-ghost btn-sm\" id=\"clearBtn\" style=\"color:#e11d48\">Clear Orders</button>\n              </div>\n              <div class=\"divider\"></div>\n              <h3 style=\"font-size:15px\">Google Login Status</h3>\n              <div id=\"oauthStatus\" class=\"notice mt-12\"></div>\n            </div>\n          </div>\n        </section>\n\n      </div>\n    </main>\n  </div>\n</div>\n\n\n\n\n<!-- ===== APP-LIKE BOTTOM BAR (mobile only) ===== -->",
  admin: "<!-- ===== HEADER ===== -->\n\n\n\n<!-- ===== LOCK SCREEN (sirf tab jab config me ADMIN_PIN ho) ===== -->\n<section class=\"wrap section\" id=\"lockScreen\" hidden=\"\">\n  <div class=\"auth-wrap\" style=\"padding-block:60px\">\n    <div class=\"auth-card\" style=\"max-width:400px\">\n      <span class=\"ic i-indigo\" style=\"margin-inline:auto\"><svg viewBox=\"0 0 24 24\"><path d=\"M4 10h16v11H4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"></path><path d=\"M8 10V7a4 4 0 0 1 8 0v3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"></path></svg></span>\n      <h2 class=\"h3 mt-16\">Admin PIN</h2>\n      <p class=\"muted small mt-8\">Panel kholne ke liye apna PIN daalein (config.js me set hai).</p>\n      <form id=\"pinForm\" class=\"mt-24 text-left\">\n        <div class=\"field\">\n          <label>PIN <span>*</span></label>\n          <input type=\"password\" id=\"pinInput\" inputmode=\"numeric\" maxlength=\"8\" placeholder=\"••••\" autocomplete=\"off\">\n        </div>\n        <button class=\"btn btn-primary\" style=\"width:100%\">Unlock</button>\n      </form>\n    </div>\n  </div>\n</section>\n\n<!-- ===== ADMIN APP ===== -->\n<main class=\"wrap section\" id=\"adminApp\" hidden=\"\">\n\n  <div class=\"sec-head\">\n    <h1 class=\"h2\">Website Control Panel</h1>\n    <p class=\"muted\">Yahan se site ka <b>saara content</b> badal sakte ho — brand, contact, templates,\n      rates, features, FAQ, sab kuch. <b>Save</b> karte hi poori site update ho jayegi.</p>\n  </div>\n\n  <!-- status bar -->\n  <div class=\"admin-bar\" id=\"adminBar\">\n    <div class=\"row-c\" style=\"gap:14px\">\n      <span class=\"pill c1\" id=\"dirtyPill\">All Saved</span>\n      <span class=\"muted small\" id=\"savedAt\">Abhi tak save nahi kiya</span>\n    </div>\n    <div class=\"row-c\" style=\"gap:10px\">\n      <button class=\"btn btn-line btn-sm\" id=\"btnExport\">⬇ JSON Export</button>\n      <button class=\"btn btn-line btn-sm\" id=\"btnImport\">⬆ JSON Import</button>\n      <button class=\"btn btn-line btn-sm\" id=\"btnDownload\">⬇ data.js Download</button>\n      <button class=\"btn btn-primary btn-sm\" id=\"btnSave\">💾 Save &amp; Publish</button>\n      <input type=\"file\" id=\"fileInput\" accept=\".json,application/json\" hidden=\"\">\n    </div>\n  </div>\n\n  <div class=\"notice info mt-16\" id=\"adminNotice\">\n    <b>Kaise kaam karta hai:</b> aap jo badlav karte ho wo is browser me\n    <code>localStorage</code> me save hota hai aur poori site turant update ho jati hai.\n    Hamesha ke liye <b>data.js Download</b> karke purani file replace kar dein —\n    tab kisi doosre device/browser par bhi wahi dikhega.\n  </div>\n\n  <div class=\"dash mt-24\">\n    <!-- ---------- SIDEBAR ---------- -->\n    <aside class=\"side\">\n      <div class=\"side-user\">\n        <span class=\"avatar av-i\">SR</span>\n        <div>\n          <div class=\"t\" style=\"font-weight:800\" id=\"admName\">SR Codematrix</div>\n          <div class=\"d muted small\">Owner / Admin</div>\n        </div>\n      </div>\n      <nav class=\"side-nav\" id=\"adminNav\" aria-label=\"Admin sections\"></nav>\n      <div class=\"admin-side-foot\">\n        <button class=\"btn btn-line btn-sm\" id=\"btnReset\" style=\"width:100%\">↻ Sab Kuch Reset</button>\n      </div>\n    </aside>\n\n    <!-- ---------- CONTENT ---------- -->\n    <div id=\"adminBody\">\n      <div class=\"panel\"><div class=\"pb\"><p class=\"muted\">Loading…</p></div></div>\n    </div>\n  </div>\n</main>",
};

const SRCODE = {
  index: function(){

/* ================= HOME PAGE RENDER (DATA driven) ================= */
SRReady(()=>{

  const B = DATA.brand;

  /* ---------- intro ---------- */
  document.getElementById('introLogo').textContent = B.short || "SR";
  document.getElementById('introName').textContent = (B.name || "SR Codematrix").toUpperCase();
  document.getElementById('introTag').textContent  = B.tagline || "";

  /* ---------- hero ---------- */
  const H = DATA.hero;
  document.getElementById('heroEyebrow').textContent = H.eyebrow || "";
  document.getElementById('hL1').textContent = H.line1 || "";
  document.getElementById('hH1').textContent = H.highlight1 || "";
  document.getElementById('hL2').textContent = H.line2 || "";
  document.getElementById('hH2').textContent = H.highlight2 || "";
  document.getElementById('heroSub').textContent = H.sub || "";
  document.getElementById('cta1').href = H.ctaPrimary.href;
  document.getElementById('cta1t').textContent = H.ctaPrimary.label;
  document.getElementById('cta2').href = H.ctaSecondary.href;
  document.getElementById('cta2t').textContent = H.ctaSecondary.label;

  document.getElementById('heroBadges').innerHTML = has(H.badges)
    ? H.badges.map((b,i)=> `<span class="pill ${['c1','c3','c2','c4'][i%4]}">${esc(b)}</span>`).join('')
    : `<span class="pill">data.js → hero.badges</span>`;

  /* ---------- stats ---------- */
  const sg = document.getElementById('statGrid');
  sg.innerHTML = has(DATA.stats)
    ? DATA.stats.slice(0,4).map((s,i)=>`
        <div class="stat s${i+1}" data-reveal data-delay="${i*70}">
          <b><span data-count="${s.value}" data-suffix="${s.suffix||''}" data-prefix="${s.prefix||''}">0</span></b>
          <span>${esc(s.label)}</span>
        </div>`).join('')
    : Array.from({length:4}).map((_,i)=>`
        <div class="stat" data-reveal data-delay="${i*70}">
          <b style="color:#c7d2fe">—</b><span>data.js → stats</span>
        </div>`).join('');

  /* ---------- do raaste ---------- */
  document.getElementById('pathsGrid').innerHTML = DATA.paths.map((p,i)=>`
    <div class="card card-hover c-${p.color}" data-reveal data-delay="${i*90}">
      ${iconEl(p.icon, 'i-' + p.color)}
      <h3 class="h3">${p.n}️⃣ ${esc(p.title)}</h3>
      <p class="muted mt-8">${esc(p.desc)}</p>
      ${has(p.points)
        ? `<ul class="f-list">${p.points.map(x=>`<li><span class="tk"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>${esc(x)}</li>`).join('')}</ul>`
        : `<div class="empty sm mt-16"><p>Apne points add karo: <code>data.js → paths[${i}].points</code></p></div>`}
      <a href="${p.cta.href}" class="btn btn-primary btn-block mt-24">${esc(p.cta.label)}</a>
    </div>`).join('');

  /* ---------- core features ---------- */
  document.getElementById('coreGrid').innerHTML = DATA.coreFeatures.map((f,i)=>`
    <div class="card card-hover" data-reveal data-delay="${i*60}">
      ${iconEl(f.icon, 'i-' + f.color)}
      <h4>${esc(f.title)}</h4>
      <p class="muted small mt-8">${esc(f.desc)}</p>
    </div>`).join('');

  /* ---------- why choose ---------- */
  document.getElementById('whyGrid').innerHTML = DATA.whyChoose.map((w,i)=>`
    <div class="card card-hover c-${w.color}" data-reveal data-delay="${i*60}">
      ${iconEl(w.icon, 'i-' + w.color)}
      <h4>${esc(w.title)}</h4>
      <p class="muted small mt-8">${esc(w.desc)}</p>
    </div>`).join('');

  /* ---------- income preview ---------- */
  document.getElementById('incomePreview').innerHTML = DATA.incomeSources.slice(0,4).map((s,i)=>`
    <div class="card card-hover" data-reveal data-delay="${i*70}">
      <span class="pill c${i+1}">${s.n}</span>
      <h4 class="mt-12">${esc(s.title)}</h4>
      <p class="muted small mt-8">${esc(s.desc).slice(0,80)}…</p>
      <div class="pot mt-12" style="display:inline-block">${has(s.potential) ? esc(s.potential) : "—"}</div>
    </div>`).join('');

  /* ---------- process ---------- */
  document.getElementById('processGrid').innerHTML = DATA.process.map((p,i)=>`
    <div class="card card-hover center" data-reveal data-delay="${i*70}">
      ${iconEl(p.icon, 'i-' + p.color, 'style="margin-inline:auto"')}
      <h4>${p.n}. ${esc(p.title)}</h4>
      <p class="muted small mt-8">${esc(p.desc)}</p>
    </div>`).join('');

  /* ---------- pricing ---------- */
  document.getElementById('plansGrid').innerHTML = DATA.plans.map((p,i)=>`
    <div class="card card-hover c-${p.color}" data-reveal data-delay="${i*80}"
         style="${p.popular ? 'background:linear-gradient(180deg,#f5f3ff,#fff);box-shadow:0 20px 50px -20px rgba(124,58,237,.4)' : ''}">
      ${p.popular ? `<span class="pill c2" style="position:absolute;top:18px;right:18px">MOST POPULAR</span>` : ""}
      <h3 class="h3">${esc(p.name)}</h3>
      <div class="price mt-8 ${p.price===null?'na':''}">${money(p.price)}
        ${p.original ? `<small>${money(p.original)}</small>` : ""}</div>
      <p class="muted small">${esc(p.for)}</p>
      <div class="divider"></div>
      ${has(p.features)
        ? `<ul class="f-list">${p.features.map(x=>`<li><span class="tk"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>${esc(x)}</li>`).join('')}</ul>`
        : `<div class="empty sm"><p>Features + price add karo: <code>data.js → plans[${i}]</code></p></div>`}
      <a href="${p.price===null ? 'order.html' : 'store.html'}"
         class="btn ${p.popular ? 'btn-primary' : 'btn-ghost'} btn-block mt-24">
         ${p.price===null ? "Quote Pao" : "Buy Now"}</a>
    </div>`).join('');

  /* ---------- testimonials ---------- */
  document.getElementById('testiBox').innerHTML = has(DATA.testimonials)
    ? `<div class="grid g3">${DATA.testimonials.map((t,i)=>`
        <div class="card" data-reveal data-delay="${i*60}">
          <div style="color:#f59e0b;font-size:15px">${"★".repeat(t.rating||5)}</div>
          <p class="mt-12">"${esc(t.text)}"</p>
          <div class="row-c mt-16">
            <span class="avatar" style="background:${SRAuth.colorFor(t.name)}">${SRAuth.initials(t.name)}</span>
            <div><b class="small">${esc(t.name)}</b><div class="tiny muted">${esc(t.role||"")} ${t.city? "· "+esc(t.city):""}</div></div>
          </div>
        </div>`).join('')}</div>`
    : emptyBox("Abhi koi testimonial nahi hai",
               "Jab real client feedback aaye to yahan add karo:",
               "data.js → testimonials");

  /* ---------- decorative waves ---------- */
  document.getElementById('wave1').innerHTML = waveDivider("#eef2ff");
  document.getElementById('wave2').innerHTML = waveDivider("#faf5ff");
  ['wave1','wave2'].forEach(id=>{
    const el = document.getElementById(id);
    el.style.cssText = "margin-top:-70px;margin-bottom:-1px;position:relative;z-index:3;line-height:0";
  });

  initCounters(); initReveal();
});

  },
  login: function(){

SRReady(()=>{
  document.getElementById('lgMark').textContent = DATA.brand.short || "SR";
  document.getElementById('lgName').textContent = DATA.brand.name || "SR Codematrix";
});

  },
  store: function(){

SRReady(()=>{

  /* ---------- top meta strip ---------- */
  document.getElementById('storeMeta').innerHTML = [
    { k:"Delivery",    v:"" },
    { k:"Templates",   v: has(DATA.templates) ? DATA.templates.length + "+" : "" },
    { k:"Licence",     v:"Lifetime" },
  ].map(m=>`<div class="card center" style="padding:18px">
      <div class="kicker">${m.k}</div>
      <b style="font-size:20px">${has(m.v) ? esc(m.v) : "—"}</b></div>`).join('');

  /* ---------- filters ---------- */
  const cats = has(DATA.templates)
    ? ["all", ...Array.from(new Set(DATA.templates.map(t=>t.c)))]
    : ["all", ...DATA.templateCategories];
  document.getElementById('filters').innerHTML =
    cats.map((c,i)=> `<button class="f-chip${i===0?' on':''}" data-cat="${esc(c)}">${c==="all"?"Sabhi":esc(c)}</button>`).join('');

  /* ---------- grid ---------- */
  const body = document.getElementById('storeBody');
  const shots = ['shot-a','shot-b','shot-c','shot-d'];

  function render(cat="all"){
    const list = (cat === "all") ? DATA.templates : DATA.templates.filter(t => t.c === cat);
    document.getElementById('countLbl').textContent =
      has(DATA.templates) ? `${list.length} template${list.length===1?'':'s'}` : "0 templates";

    if(!has(DATA.templates)){
      body.innerHTML = `
        <div class="grid g3">
          ${Array.from({length:3}).map(()=> skeleton("Template placeholder")).join('')}
        </div>
        <div class="mt-24">${emptyBox("Templates abhi add nahi hue",
          "Apne templates yahan add karo — naam, category, price aur description:",
          "data.js → templates")}</div>`;
      return;
    }

    body.innerHTML = `<div class="grid g3">${list.map((t,i)=>`
      <div class="tpl" data-reveal data-delay="${i*40}">
        <div class="tpl-shot ${shots[i%4]}">
          ${t.badge ? `<span class="tpl-badge ${t.badge.toLowerCase()==='hot'?'hot':'new'}">${esc(t.badge)}</span>` : ""}
          <div class="mini"><i></i><i></i><i></i><i class="b" style="background:${['#4f46e5','#10b981','#f59e0b','#ec4899'][i%4]}"></i><i></i><i></i></div>
        </div>
        <div class="tpl-body">
          <h4>${esc(t.n)}</h4>
          <p>${esc(t.d || "")}</p>
          ${has(t.tags) ? `<div class="tpl-tags">${t.tags.map(x=>`<span class="pill">${esc(x)}</span>`).join('')}</div>` : ""}
          <div class="tpl-foot">
            <div class="price ${t.p===null||t.p===undefined?'na':''}">${money(t.p)}
              ${t.o ? `<small>${money(t.o)}</small>` : ""}</div>
            <button class="btn btn-primary btn-sm" data-buy="${esc(t.n)}" data-amt="${t.p ?? 0}">Buy Now</button>
          </div>
        </div>
      </div>`).join('')}</div>`;

    body.querySelectorAll('[data-buy]').forEach(b=>{
      b.addEventListener('click', ()=> buy(b.dataset.buy, +b.dataset.amt));
    });
    document.querySelectorAll('#storeBody [data-reveal]').forEach(el=> el.classList.add('in'));
  }

  function buy(name, amt){
    if(!SR_CONFIG.ENABLE_ORDERS){ SRToast("Orders abhi band hain.","err"); return; }
    const u = SRAuth.getUser();
    if(!u){
      SRToast("Pehle login karo — phir order kar sakte ho.", "err", "Login Required");
      setTimeout(()=> SRAuth.go('login'), 1100);
      return;
    }

    /* ---------- REAL PAYMENT (Razorpay + Cloud Function) ---------- */
    if(SRPay.configured() && SRFB.ready()){
      SRPay.pay({
        amount: amt, item:name, kind:'template',
        notes:{ template:name, phone:u.phone || '' },
        onSuccess: ()=> setTimeout(()=> SRAuth.go('dashboard'), 900),
      });
      return;
    }

    /* ---------- LOCAL / SETUP-PENDING MODE ---------- */
    if(SRPay.configured() && !SRFB.ready()){
      SRToast("Payment server connect ho raha hai — 2 second baad try karo.", "err");
      return;
    }
    SRPay.fallbackEnquiry(name, amt);
  }

  document.querySelectorAll('.f-chip').forEach(c=>{
    c.addEventListener('click', ()=>{
      document.querySelectorAll('.f-chip').forEach(x=> x.classList.remove('on'));
      c.classList.add('on'); render(c.dataset.cat);
    });
  });

  render();
  document.getElementById('waveA').innerHTML = waveDivider("#eef2ff");
  document.getElementById('waveA').style.cssText = "margin-top:-70px;position:relative;z-index:3;line-height:0";
  initReveal();
});

  },
  earnings: function(){

SRReady(()=>{

  const C = DATA.commission;

  /* ---------- top meta ---------- */
  document.getElementById('earnMeta').innerHTML = [
    { k:"Total Streams",  v: DATA.incomeSources.length ? DATA.incomeSources.length : "" },
    { k:"Referral %",     v: C.referralPercent ? C.referralPercent + "%" : "" },
    { k:"Reseller Margin",v: C.resellerMargin  ? C.resellerMargin  + "%" : "" },
    { k:"Min. Payout",    v: money(C.minPayout) === "—" ? "" : money(C.minPayout) },
  ].map((m,i)=>`<div class="card center" style="padding:18px">
      <div class="kicker">${m.k}</div>
      <b class="h3 ${has(m.v)?'grad-text':''}">${has(m.v) ? esc(m.v) : "—"}</b></div>`).join('');

  /* ---------- 8 sources ---------- */
  document.getElementById('srcGrid').innerHTML = DATA.incomeSources.map((s,i)=>`
    <div class="earn" data-reveal data-delay="${i*50}">
      <div class="n" style="background:${['linear-gradient(135deg,#4f46e5,#7c3aed)','linear-gradient(135deg,#7c3aed,#ec4899)','linear-gradient(135deg,#10b981,#14b8a6)','linear-gradient(135deg,#f59e0b,#f97316)','linear-gradient(135deg,#ec4899,#f43f5e)','linear-gradient(135deg,#06b6d4,#3b82f6)','linear-gradient(135deg,#f43f5e,#f97316)','linear-gradient(135deg,#84cc16,#10b981)'][i%8]}">${s.n}</div>
      <div>
        <h4>${esc(s.title)}</h4>
        <p>${esc(s.desc)}</p>
        <div class="earn-meta">
          <span class="pot">${has(s.potential) ? esc(s.potential) : "Potential: —"}</span>
          <span class="pill c${(i%6)+1}">${esc(s.type)}</span>
          <span class="pill">Effort: ${esc(s.effort)}</span>
        </div>
        <div class="divider" style="margin:14px 0"></div>
        <div class="kicker" style="margin-bottom:8px">Kaise shuru karein</div>
        <ul class="f-list" style="gap:6px">
          ${(s.how||[]).map(h=>`<li><span class="tk"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>${esc(h)}</li>`).join('')}
        </ul>
      </div>
    </div>`).join('');

  /* ---------- revenue mix ---------- */
  const mixBox = document.getElementById('mixBox');
  if(has(DATA.revenueMix)){
    mixBox.innerHTML = `<div class="chart">${DATA.revenueMix.map(m=>`
      <div class="bar-row">
        <span class="muted">${esc(m.name)}</span>
        <div class="bar-track"><div class="bar-fill" data-w="${m.pct*2.6}"
          style="background:linear-gradient(90deg,${m.color||'#4f46e5'},${m.color||'#4f46e5'}66)"></div></div>
        <span class="bar-val" style="color:${m.color||'#4f46e5'}">${m.pct}%</span>
      </div>`).join('')}</div>`;
    setTimeout(()=> mixBox.querySelectorAll('.bar-fill').forEach(f=> f.style.width = f.dataset.w + '%'), 350);
  }else{
    mixBox.innerHTML = emptyBox("Revenue split set nahi hai",
      "Apne actual numbers daalo (har source ka %):", "data.js → revenueMix");
  }

  /* ---------- reseller ---------- */
  document.getElementById('resellerNote').textContent =
    has(C.referralPercent) ? `Har successful sale par ${C.referralPercent}% commission.`
                           : "Commission % set karne ke liye data.js → commission";

  document.getElementById('resellerTbl').innerHTML = `
    <thead><tr><th>Plan</th><th>Commission</th><th>Target</th><th>Payout</th><th>Joining Fee</th><th>Dashboard</th></tr></thead>
    <tbody>${DATA.resellerPlans.map(p=>`
      <tr>
        <td><b>${esc(p.name)}</b></td>
        <td>${has(p.commission)?esc(p.commission):"—"}</td>
        <td>${has(p.target)?esc(p.target):"—"}</td>
        <td>${has(p.payout)?esc(p.payout):"—"}</td>
        <td>${has(p.fee)?esc(p.fee):"—"}</td>
        <td><span class="pill c2">${esc(p.plan)}</span></td>
      </tr>`).join('')}</tbody>`;

  /* ---------- calculator ---------- */
  const cl = document.getElementById('clients'), av = document.getElementById('aov');
  const pct = C.referralPercent;
  document.getElementById('commLbl').textContent = has(pct) ? `(${pct}%)` : "(commission % nahi set)";
  function calc(){
    const c = +cl.value, a = +av.value;
    document.getElementById('clVal').textContent = c;
    document.getElementById('avVal').textContent = inr(a);
    if(!has(pct)){
      document.getElementById('calcOut').textContent  = "—";
      document.getElementById('calcYear').textContent = "—";
      return;
    }
    const m = Math.round(c * a * (pct/100));
    document.getElementById('calcOut').textContent  = inr(m);
    document.getElementById('calcYear').textContent = inr(m * 12);
  }
  cl.addEventListener('input', calc); av.addEventListener('input', calc); calc();

  document.getElementById('waveE').innerHTML = waveDivider("#fff7ed");
  document.getElementById('waveE').style.cssText = "margin-top:-70px;position:relative;z-index:3;line-height:0";
  initReveal();
});

  },
  order: function(){

SRReady(()=>{

  const K = DATA.calculator, B = DATA.brand;
  let sel = { type:(K.types[0] && K.types[0].id) || "", speed:"normal", addons:new Set() };
  if(K.types.length) sel.type = (K.types[1] || K.types[0]).id;   // default = Business

  const num = v => (v === null || v === undefined || v === "") ? 0 : Number(v);

  /* ---------- type options ---------- */
  document.getElementById('typeOpts').innerHTML = K.types.map(t=>`
    <div class="opt-card${t.id===sel.type?' on':''}" data-type="${esc(t.id)}">
      <b>${esc(t.t)}</b><span class="d">${esc(t.d)}</span>
      <span class="p">${money(t.p)} se · ${t.days} din</span>
    </div>`).join('');

  document.getElementById('pgRate').textContent =
    has(K.pageRate) ? `(extra page ₹${K.pageRate} — pehle ${K.freePages} free)` : "(per-page rate set nahi)";

  document.getElementById('addons').innerHTML = K.addons.map(a=>`
    <label class="check">
      <input type="checkbox" data-addon="${esc(a.id)}">
      <span><span class="t">${esc(a.t)}</span><span class="d">${esc(a.d)}</span></span>
      <span class="p">+${money(a.p)}</span>
    </label>`).join('');

  document.getElementById('speedOpts').innerHTML = K.speeds.map(s=>`
    <div class="opt-card${s.id===sel.speed?' on':''}" data-speed="${esc(s.id)}">
      <b>${esc(s.t)}</b><span class="d">${esc(s.d)}</span>
      <span class="p">${s.pct ? '+' + s.pct + '% charge' : 'No extra charge'}</span>
    </div>`).join('');

  /* ---------- calculate ---------- */
  function calc(){
    const type  = K.types.find(t=>t.id===sel.type)  || {p:null,days:0,t:"—"};
    const speed = K.speeds.find(s=>s.id===sel.speed)|| {pct:0,days:0,t:"Normal"};
    const pages = +document.getElementById('pages').value;

    const base    = num(type.p);
    const extraPg = Math.max(0, pages - (K.freePages||0)) * num(K.pageRate);
    let addonTotal = 0; const lines = [];

    lines.push([type.t + " (base)", type.p]);
    K.addons.forEach(a=>{ if(sel.addons.has(a.id)){ addonTotal += num(a.p); lines.push([a.t, a.p]); } });
    if(extraPg > 0) lines.push([`Extra pages (${pages-(K.freePages||0)})`, extraPg]);

    let sub = base + addonTotal + extraPg;
    const speedCharge = Math.round(sub * ((speed.pct||0)/100));
    if(speedCharge > 0) lines.push([`${speed.t} delivery`, speedCharge]);
    const total = sub + speedCharge;
    const days  = Math.max(2, (type.days||0) + (speed.days||0) + Math.floor(pages/6));

    const missing = (type.p === null) ||
                    (pages > (K.freePages||0) && K.pageRate === null) ||
                    K.addons.some(a => sel.addons.has(a.id) && a.p === null);

    document.getElementById('sumBox').innerHTML = lines.map(l=>
      `<div class="sum-row"><span class="muted">${esc(l[0])}</span><b>${money(l[1])}</b></div>`).join('')
      + `<div class="sum-row" style="border-top:1px solid var(--line);margin-top:8px;padding-top:12px">
           <span>Subtotal</span><b>${missing ? "—" : money(total)}</b></div>`;

    document.getElementById('total').textContent = missing ? "—" : money(total);
    document.getElementById('deliv').textContent = days + " din";
    document.getElementById('adv').textContent   = missing ? "—" : money(Math.round(total/2));
    document.getElementById('bal').textContent   = missing ? "—" : money(total - Math.round(total/2));
    document.getElementById('pgVal').textContent = pages;

    document.getElementById('priceWarn').innerHTML = missing
      ? `<div class="notice mt-16" style="font-size:12.5px">⚠️ Kuch rates abhi set nahi hain —
           <code>data.js → calculator</code> me apni pricing daalo, tab exact total dikhega.</div>`
      : "";

    return { total, type, days, missing };
  }

  /* ---------- events ---------- */
  document.querySelectorAll('[data-type]').forEach(c=> c.addEventListener('click', ()=>{
    sel.type = c.dataset.type;
    document.querySelectorAll('[data-type]').forEach(x=> x.classList.toggle('on', x===c));
    calc();
  }));
  document.querySelectorAll('[data-speed]').forEach(c=> c.addEventListener('click', ()=>{
    sel.speed = c.dataset.speed;
    document.querySelectorAll('[data-speed]').forEach(x=> x.classList.toggle('on', x===c));
    calc();
  }));
  document.querySelectorAll('[data-addon]').forEach(cb=> cb.addEventListener('change', ()=>{
    cb.checked ? sel.addons.add(cb.dataset.addon) : sel.addons.delete(cb.dataset.addon);
    calc();
  }));
  document.getElementById('pages').addEventListener('input', calc);

  /* ---------- included list ---------- */
  document.getElementById('inclBox').innerHTML = has(K.included)
    ? `<ul class="f-list">${K.included.map(x=>`<li><span class="tk"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span>${esc(x)}</li>`).join('')}</ul>`
    : `<div class="empty sm"><p>Package inclusions add karo: <code>data.js → calculator.included</code></p></div>`;

  /* ---------- help ---------- */
  const wa = (DATA.social.whatsapp || B.whatsapp || "").trim();
  document.getElementById('helpBox').innerHTML =
    (wa ? `<a href="https://wa.me/${wa}" class="btn btn-fresh btn-sm btn-block">💬 WhatsApp Karo</a>` : "") +
    (B.phone ? `<a href="tel:${String(B.phone).replace(/[^0-9+]/g,'')}" class="btn btn-ghost btn-sm btn-block">📞 Call Karo</a>` : "") +
    (B.email ? `<a href="mailto:${B.email}" class="btn btn-ghost btn-sm btn-block">✉️ Email Karo</a>` : "") +
    (!wa && !B.phone && !B.email ? `<div class="empty sm"><p>Contact add karo: <code>data.js → brand</code></p></div>` : "");

  /* ---------- process ---------- */
  document.getElementById('procBox').innerHTML = DATA.process.map((p,i)=>`
    <div class="card card-hover center" data-reveal data-delay="${i*60}">
      ${iconEl(p.icon,'i-'+p.color,'style="margin-inline:auto"')}
      <b>${p.n}. ${esc(p.title)}</b><p class="muted small mt-8">${esc(p.desc)}</p>
    </div>`).join('');

  /* ---------- submit ---------- */
  document.getElementById('orderForm').addEventListener('submit', async e=>{
    e.preventDefault();
    if(!SR_CONFIG.ENABLE_ORDERS){ SRToast("Orders abhi band hain.","err"); return; }
    const r = calc();
    const u = SRAuth.getUser();

    const btn = e.target.querySelector('button[type=submit]');
    const lbl = btn ? btn.innerHTML : '';
    if(btn){ btn.disabled = true; btn.innerHTML = 'Bhej rahe hain…'; }

    const res = await SRStore.enquiry({
      type  : `${r.type.t} — Custom Project`,
      amount: r.missing ? null : r.total,
      email : u ? u.email : document.getElementById('oEmail').value,
      phone : document.getElementById('oPhone').value,
      biz   : document.getElementById('oBiz').value,
      cat   : document.getElementById('oCat').value,
      note  : document.getElementById('oNote').value,
      pages : +document.getElementById('pages').value,
      speed : (K.speeds.find(s=>s.id===sel.speed)||{}).t || '',
    });

    if(btn){ btn.disabled = false; btn.innerHTML = lbl; }
    SRToast(`Requirement mil gaya! Estimate <b>${r.missing ? "—" : inr(r.total)}</b> · ${r.days} din.`
            + (res.remote ? '' : ' <span class="tiny">(local save)</span>'),
            "ok", "Quote Ready");
    e.target.reset();
    sel.addons.clear();
    document.querySelectorAll('[data-addon]').forEach(cb => cb.checked = false);
    calc();
    setTimeout(()=>{ if(u) SRAuth.go('dashboard'); }, 1600);
  });

  calc();
  document.getElementById('waveO').innerHTML = waveDivider("#eef2ff");
  document.getElementById('waveO').style.cssText = "margin-top:-70px;position:relative;z-index:3;line-height:0";
  initReveal();
});

  },
  features: function(){

SRReady(()=>{

  const groups = DATA.featureGroups;
  const all    = groups.flatMap(g => g.items);
  const inc = all.filter(i=>i[1]==='inc').length;
  const pro = all.filter(i=>i[1]==='pro').length;
  const add = all.filter(i=>i[1]==='add').length;

  document.getElementById('fCount').textContent = all.length + "+";
  document.getElementById('featMeta').innerHTML = [
    ["Total Features", all.length, 'grad-text'],
    ["Free Included",  inc,        'grad-text'],
    ["Pro Features",   pro,        'grad-text'],
    ["Add-ons",        add,        'grad-text'],
  ].map(([k,v,c],i)=>`<div class="card center" style="padding:18px" data-reveal data-delay="${i*60}">
      <div class="kicker">${k}</div>
      <b class="h3 ${c}" data-count="${v}">0</b></div>`).join('');

  const BADGE = {
    inc:['<span class="pill c3">Included</span>','inc','✓'],
    pro:['<span class="pill c2">Pro</span>','pro','★'],
    add:['<span class="pill c4">Add-on</span>','add','+'],
  };
  const GRAD = {
    indigo:'linear-gradient(135deg,#4f46e5,#7c3aed)', cyan:'linear-gradient(135deg,#06b6d4,#3b82f6)',
    pink:'linear-gradient(135deg,#ec4899,#f43f5e)',   violet:'linear-gradient(135deg,#7c3aed,#ec4899)',
    green:'linear-gradient(135deg,#10b981,#14b8a6)',  amber:'linear-gradient(135deg,#f59e0b,#f97316)',
    rose:'linear-gradient(135deg,#f43f5e,#f97316)',   blue:'linear-gradient(135deg,#3b82f6,#6366f1)',
    teal:'linear-gradient(135deg,#14b8a6,#06b6d4)',   lime:'linear-gradient(135deg,#84cc16,#10b981)',
  };

  document.getElementById('featureRoot').innerHTML = groups.map((g,gi)=>`
    <div class="feat-group" data-reveal data-delay="${gi*40}">
      <div class="feat-head">
        <span class="n" style="background:${GRAD[g.color]||GRAD.indigo}">${g.n}</span>
        <h3 class="h3">${esc(g.title)}</h3>
        <span class="pill">${g.items.length} features</span>
      </div>
      <div class="flist">
        ${g.items.map(([name,kind])=>{
          const [badge,cls,tk] = BADGE[kind] || BADGE.inc;
          return `<div class="fi ${cls}">
            <span class="tk">${tk}</span><span>${esc(name)}</span><span class="meta">${badge}</span></div>`;
        }).join('')}
      </div>
    </div>`).join('');

  /* ---------- comparison ---------- */
  const C = DATA.comparison;
  document.getElementById('cmpTbl').innerHTML = `
    <thead><tr><th>Feature</th>${C.columns.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead>
    <tbody>${C.rows.map(r=>`
      <tr><td><b>${esc(r[0])}</b></td>
      ${r.slice(1).map(v=>`<td>${has(v) ? (v==="✔" ? `<span class="yes">✔</span>` : esc(v)) : `<span class="no">—</span>`}</td>`).join('')}
      </tr>`).join('')}</tbody>`;

  /* ---------- tech stack ---------- */
  const TCOL = ['i-indigo','i-cyan','i-green','i-amber','i-pink','i-violet','i-teal','i-blue'];
  document.getElementById('techGrid').innerHTML = DATA.techStack.map((t,i)=>`
    <div class="card center" data-reveal data-delay="${i*50}">
      <div class="ic ${TCOL[i%8]}" style="margin-inline:auto"><svg viewBox="0 0 24 24">${icon(['code','cloud','layers','shield','wallet','globe','chart','zap'][i%8])}</svg></div>
      <b>${esc(t.title)}</b><p class="muted small mt-8">${esc(t.desc)}</p>
    </div>`).join('');

  /* ---------- FAQ ---------- */
  document.getElementById('faqBox').innerHTML = has(DATA.faqs)
    ? DATA.faqs.map((f,i)=>`
      <div class="card card-hover" data-reveal data-delay="${i*40}">
        <h4 style="font-size:16px">${esc(f[0])}</h4>
        <p class="muted small mt-8">${esc(f[1])}</p>
      </div>`).join('')
    : emptyBox("FAQ abhi khaali hai", "Apne sawal-jawab add karo:", "data.js → faqs");

  document.getElementById('waveF').innerHTML = waveDivider("#eef2ff");
  document.getElementById('waveF').style.cssText = "margin-top:-70px;position:relative;z-index:3;line-height:0";
  initCounters(); initReveal();
});

  },
  dashboard: function(){
/* ============================================================
   SR CODEMATRIX — DASHBOARD
   Koi demo/fake data nahi — sirf user ke apne real orders.
   ============================================================ */

function switchTab(id){
  document.querySelectorAll('.tabpane').forEach(p => p.classList.toggle('on', p.id === 'tab-' + id));
  document.querySelectorAll('.side-nav button[data-tab]').forEach(b => b.classList.toggle('on', b.dataset.tab === id));
  window.scrollTo({top:0, behavior:'smooth'});
}
window.switchTab = switchTab;

SRReady(async ()=>{

  const user = SRAuth.getUser();
  const guard = document.getElementById('guard');
  const body  = document.getElementById('dashBody');
  if(!user){ guard.style.display = 'block'; return; }
  body.style.display = 'block';

  const C = DATA.commission;

  /* ---------- sidebar + greeting ---------- */
  document.getElementById('sideUser').innerHTML = `
    ${SRAuth.avatarHTML(user)}
    <div style="min-width:0">
      <b style="display:block;font-size:14.5px">${esc(user.name)}</b>
      <div class="tiny muted" style="overflow:hidden;text-overflow:ellipsis">${esc(user.email || "guest session")}</div>
      <span class="pill c2" style="margin-top:4px">${esc(user.role || "User")}</span>
    </div>`;
  document.getElementById('firstName').textContent = user.name.split(' ')[0];
  document.getElementById('welcomeLbl').textContent = DATA.dashboard.welcome || "Namaste";

  /* ---------- orders ----------
     Firebase ready ho to Firestore se (asli, server-verified orders),
     warna localStorage (local mode).                              ---------- */
  let orders = [];
  let remote = false;
  let earn   = null;

  if(window.SRFB && SRFB.ready() && user.uid){
    try{
      const [fsOrders, fsEarn] = await Promise.all([
        SRFB.myOrders(user.uid),
        SRFB.myEarnings(user.uid),
      ]);
      orders = fsOrders.map(o=>({
        id    : o.id.slice(-6).toUpperCase(),
        item  : o.item,
        date  : o.paidAt && o.paidAt.toDate
                  ? o.paidAt.toDate().toISOString().slice(0,10)
                  : (o.createdAt && o.createdAt.toDate
                      ? o.createdAt.toDate().toISOString().slice(0,10) : '—'),
        amount: o.amount,
        status: o.status === 'paid' ? 'Paid' : (o.status || 'Pending'),
      }));
      earn   = fsEarn;
      remote = true;
    }catch(e){ console.warn('firestore orders:', e); }
  }
  if(!remote) orders = SRStore.byEmail(user.email);

  const total  = orders.reduce((s,o)=> s + (Number(o.amount)||0), 0);
  const active = orders.filter(o => /progress|pending|created/i.test(o.status||"")).length;

  document.getElementById('kOrders').textContent = orders.length;
  document.getElementById('kOrdersSub').textContent = remote
    ? (orders.length ? "verified orders" : "koi order nahi")
    : (orders.length ? "local orders" : "koi order nahi");
  document.getElementById('kValue').textContent  = inr(total);
  document.getElementById('kActive').textContent = active;
  document.getElementById('ordCount').textContent = orders.length;

  /* ---------- earnings (server se calculate hui) ---------- */
  if(earn){
    const set = (id, v) => { const el = document.getElementById(id); if(el) el.textContent = v; };
    set('kEarn',    inr(earn.commission || 0));
    set('kWallet',  inr(earn.wallet || 0));
    set('kRefBonus',inr(earn.referralBonus || 0));
    set('earnNote', 'Server se verified · har sale par automatic');
  }

  if(user.loggedAt){
    const d = new Date(user.loggedAt);
    document.getElementById('kSince').textContent = d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  }
  document.getElementById('kProvider').textContent =
    user.provider === 'google' ? "Google account" : (user.provider === 'guest' ? "Guest preview" : "Local session");

  const statusPill = s => {
    const m = { "Delivered":"c3", "Completed":"c3", "In Progress":"c4", "Pending":"c5",
                "Pending Quote":"c5", "Active":"c1" };
    return `<span class="pill ${m[s] || ''}">${esc(s || "Pending")}</span>`;
  };

  const ordersTable = `
    <div class="tbl-wrap"><table>
      <thead><tr><th>Order ID</th><th>Item</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
      <tbody>${orders.map(o=>`
        <tr>
          <td><b style="font-family:ui-monospace,monospace">#${esc(o.id)}</b></td>
          <td>${esc(o.item)}</td>
          <td class="muted">${esc(o.date)}</td>
          <td><b>${inr(o.amount || 0)}</b></td>
          <td>${statusPill(o.status)}</td>
        </tr>`).join('')}</tbody>
    </table></div>`;

  document.getElementById('ordersWrap').innerHTML = orders.length
    ? ordersTable
    : emptyBox("Abhi koi order nahi hai",
               "Store se template kharido ya custom site ka quote bhejo — order yahan dikhega.",
               "store.html / order.html");

  document.getElementById('recentOrders').innerHTML = orders.length
    ? orders.slice(0,3).map(o=>`
      <div class="spread" style="padding:11px 0;border-bottom:1px solid var(--line)">
        <div><b style="font-size:14px">${esc(o.item)}</b>
             <div class="tiny muted">#${esc(o.id)} · ${esc(o.date)}</div></div>
        <div style="text-align:right"><b>${inr(o.amount || 0)}</b><br>${statusPill(o.status)}</div>
      </div>`).join('')
    : `<div class="empty sm"><p>Koi recent order nahi. <a href="store.html" style="color:#4f46e5;font-weight:700">Store dekho →</a></p></div>`;

  /* ---------- account box ---------- */
  document.getElementById('acctBox').innerHTML = `
    <div class="spread" style="padding:7px 0"><span class="muted">Name</span><b>${esc(user.name)}</b></div>
    <div class="spread" style="padding:7px 0"><span class="muted">Email</span><b>${esc(user.email || "—")}</b></div>
    <div class="spread" style="padding:7px 0"><span class="muted">Login</span><b>${esc(user.provider || "—")}</b></div>
    <div class="spread" style="padding:7px 0"><span class="muted">Role</span><b>${esc(user.role || "User")}</b></div>`;

  /* ---------- earnings ---------- */
  document.getElementById('eRate').textContent = has(C.referralPercent) ? C.referralPercent + "%" : "—";
  document.getElementById('eMin').textContent  = money(C.minPayout);
  document.getElementById('eDay').textContent  = has(C.payoutDay) ? C.payoutDay : "—";

  document.getElementById('earningsBody').innerHTML = emptyBox(
    "Earnings data abhi available nahi hai",
    "Live earnings ke liye backend (payment + referral tracking) connect karna hoga. " +
    "Settings me commission rate set kar sakte ho:",
    "data.js → commission");

  /* ---------- referral ---------- */
  const slug = (user.email ? user.email.split('@')[0] : (user.name || "user"))
                 .replace(/[^a-z0-9]/gi,'').toLowerCase() || "user";
  const domain = location.hostname || "srcodematrix.com";
  const link = `${location.origin || ("https://" + domain)}/?ref=${slug}`;
  document.getElementById('refLink').value = link;
  document.getElementById('refNote').textContent = has(C.referralPercent)
    ? `Har successful sale par ${C.referralPercent}% commission — minimum payout ${money(C.minPayout)}.`
    : "Commission rate set karne ke liye data.js → commission.referralPercent";

  document.getElementById('copyRef')?.addEventListener('click', ()=> copyText(link, "Referral link copied!"));
  document.getElementById('shareWA')?.addEventListener('click', ()=>{
    window.open(`https://wa.me/?text=${encodeURIComponent("Website banvane ke liye: " + link)}`, '_blank');
  });

  /* ---------- new order cards ---------- */
  const svc = [
    { icon:"bag",  color:"i-indigo", t:"Ready Template Kharido", d:"Store se turant download.", href:"store.html", btn:"Store Kholo" },
    { icon:"code", color:"i-violet", t:"Custom Website Banvayein", d:"Live quote calculator.", href:"order.html", btn:"Quote Nikalo" },
    { icon:"cloud",color:"i-green",  t:"Hosting + Domain", d:"Setup aur migration support.", href:"order.html", btn:"Poochho" },
    { icon:"shield",color:"i-amber", t:"AMC / Maintenance", d:"Backup, updates, security.", href:"order.html", btn:"Poochho" },
  ];
  document.getElementById('svcGrid').innerHTML = svc.map(s=>`
    <div class="card card-hover">
      ${iconEl(s.icon, s.color)}
      <h4>${s.t}</h4><p class="muted small mt-8">${s.d}</p>
      <a href="${s.href}" class="btn btn-ghost btn-block mt-16 btn-sm">${s.btn}</a>
    </div>`).join('');

  /* ---------- settings ---------- */
  document.getElementById('setName').value  = user.name || "";
  document.getElementById('setEmail').value = user.email || "";
  document.getElementById('setPhone').value = user.phone || "";
  document.getElementById('setBiz').value   = user.biz || "";

  document.getElementById('saveProfile')?.addEventListener('click', ()=>{
    user.name  = document.getElementById('setName').value || user.name;
    user.phone = document.getElementById('setPhone').value;
    user.biz   = document.getElementById('setBiz').value;
    SRAuth.save(user); SRAuth.paintHeader();
    SRToast("Profile save ho gaya.");
  });

  document.getElementById('exportBtn')?.addEventListener('click', ()=>{
    const blob = new Blob([JSON.stringify({user, orders:SRStore.all()}, null, 2)], {type:"application/json"});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "sr-codematrix-data.json";
    a.click();
    SRToast("JSON file download ho gayi.");
  });

  document.getElementById('clearBtn')?.addEventListener('click', ()=>{
    if(confirm("Saare local orders delete ho jayenge. Continue?")){
      localStorage.removeItem('srcm_orders');
      SRToast("Local orders clear ho gaye.", "ok");
      setTimeout(()=> location.reload(), 800);
    }
  });

  const st = document.getElementById('oauthStatus');
  st.className = SRAuth.ready() ? "notice ok" : "notice";
  st.innerHTML = SRAuth.ready()
    ? "<b>● Active</b> — Google Client ID set hai."
    : "<b>● Inactive</b> — <code>config.js</code> me GOOGLE_CLIENT_ID daalo.";

  /* ---------- tabs ---------- */
  document.querySelectorAll('.side-nav button[data-tab]').forEach(b=>{
    b.addEventListener('click', ()=> switchTab(b.dataset.tab));
  });
});

  },
  admin: function(){
/* ============================================================
   SR CODEMATRIX — ADMIN PANEL ENGINE
   ------------------------------------------------------------
   Site ka SAARA data UI se edit karo.
   • Save  → is browser me turant apply (localStorage)
   • data.js Download → file replace kar do = har jagah permanent
   • JSON Export / Import → backup aur transfer
   ============================================================ */
(function(){
'use strict';

const D   = window.DATA || {};
const CFG = window.SR_CONFIG || {};
const PIN = String(CFG.ADMIN_PIN || "").trim();
const KEY = 'srcm_data_override';

/* ---------- field labels (Hinglish) ---------- */
const LBL = {
  name:'Company Ka Naam', short:'Chhota Naam (logo me)', tagline:'Tagline',
  description:'Description', email:'Email', phone:'Phone',
  whatsapp:'WhatsApp Number', address:'Address', hours:'Working Hours',
  gstin:'GST Number', established:'Sansthapna Saal',
  instagram:'Instagram', facebook:'Facebook', youtube:'YouTube',
  linkedin:'LinkedIn', twitter:'Twitter / X',
  eyebrow:'Chhoti Label (upar)', line1:'Line 1', highlight1:'Highlight Word',
  line2:'Line 2', highlight2:'Highlight Word 2', sub:'Sub Text',
  ctaPrimary:'Primary Button', ctaSecondary:'Secondary Button',
  badges:'Badges', value:'Number', suffix:'Suffix', label:'Label',
  color:'Colour', icon:'Icon', points:'Bullet Points', cta:'Button',
  n:'Number', title:'Title', desc:'Description', type:'Type', effort:'Mehnat',
  how:'Steps', potential:'Monthly Potential', pct:'Percent',
  price:'Price (₹)', original:'Purani Price (₹)', popular:'Popular?',
  for:'Kiske Liye', features:'Features', tags:'Tags', badge:'Badge',
  c:'Category', o:'Purani Price', t:'Naam', p:'Price (₹)', id:'ID',
  days:'Din', target:'Target', payout:'Payout', fee:'Fee', plan:'Plan',
  commission:'Commission', pageRate:'Per Page Rate (₹)', freePages:'Free Pages',
  addons:'Add-ons', speeds:'Speed Options', included:'Kya Kya Milta Hai',
  types:'Website Types', welcome:'Welcome Word', notes:'Special Message',
  columns:'Columns', rows:'Rows',
  setupComplete:'Setup Complete?', referralPercent:'Referral Commission %',
  resellerMargin:'Reseller Margin %', minPayout:'Minimum Payout (₹)',
  payoutDay:'Payout Din', templates:'Templates',
  templateCategories:'Categories', revenueMix:'Revenue Mix',
  resellerPlans:'Reseller Plans', process:'Process Steps',
  whyChoose:'Why Choose Us', techStack:'Tech Stack',
  comparison:'Comparison Table', testimonials:'Testimonials',
  faqs:'FAQ', seo:'SEO Meta', stats:'Stats / Numbers', paths:'Do Raaste',
  coreFeatures:'Core Features', featureGroups:'Feature Groups',
  incomeSources:'Income Sources', plans:'Pricing Plans',
  calculator:'Order Calculator', brand:'Brand & Contact',
  social:'Social Links', hero:'Hero Section', dashboard:'Dashboard Text',
};
const TEXTS = ['desc','sub','points','how','features','notes','description',
               'text','badges','included','tags','d'];

/* ---------- naye item ke blank shape ---------- */
const DEFAULTS = {
  templates:{n:'',c:'',p:null,o:null,badge:'',d:'',tags:[]},
  stats:{value:null,suffix:'',label:'',color:'indigo'},
  paths:{n:'',color:'indigo',icon:'bag',title:'',desc:'',points:[],cta:{label:'',href:''}},
  coreFeatures:{icon:'star',color:'indigo',title:'',desc:''},
  featureGroups:{n:'',title:'',color:'indigo',icon:'grid',items:[]},
  incomeSources:{n:'',title:'',type:'',effort:'',color:'indigo',desc:'',how:[],potential:''},
  revenueMix:{name:'',pct:null,color:'#7c3aed'},
  resellerPlans:{name:'',commission:'',target:'',payout:'',fee:'Free',plan:''},
  plans:{name:'',price:null,original:null,color:'indigo',popular:false,for:'',features:[]},
  process:{n:'',icon:'check',color:'indigo',title:'',desc:''},
  whyChoose:{icon:'star',color:'indigo',title:'',desc:''},
  techStack:{title:'',desc:''},
  testimonials:{name:'',role:'',city:'',text:'',rating:5},
  faqs:['',''],
};

/* ---------- sections ---------- */
const SECTIONS = [
  {id:'brand',             t:'Brand & Contact',      i:'star',    d:'Company ka naam, email, phone, address, GST — sab kuch.'},
  {id:'social',            t:'Social Links',         i:'share',   d:'Khaali chhod do to button footer me nahi dikhega.'},
  {id:'setup',             t:'Setup Status',         i:'settings',d:'Data bhar chuke ho? Toggle ON kar do.'},
  {id:'hero',              t:'Hero Section',         i:'rocket',  d:'Home page ka sabse bada hissa.'},
  {id:'stats',             t:'Stats / Numbers',      i:'chart',   d:'Websites delivered, happy clients, etc.'},
  {id:'paths',             t:'Do Raaste',            i:'code',    d:'Kharido vs Banvayein — dono cards.'},
  {id:'coreFeatures',      t:'Core Features',        i:'grid',    d:'Home page ke 6 feature cards.'},
  {id:'featureGroups',     t:'Feature List',         i:'check',   d:'Poori feature list (112 items) — group wise.'},
  {id:'incomeSources',     t:'Income Sources',       i:'coin',    d:'8 earning streams + unke steps.'},
  {id:'revenueMix',        t:'Revenue Mix',          i:'gauge',   d:'Income ka % breakdown.'},
  {id:'commission',        t:'Commission',           i:'wallet',  d:'Referral %, reseller margin, payout.'},
  {id:'resellerPlans',     t:'Reseller Plans',       i:'award',   d:'Starter / Silver / Gold / Elite.'},
  {id:'templates',         t:'Templates',            i:'bag',     d:'Store me kaun se templates dikhayein.'},
  {id:'templateCategories',t:'Categories',           i:'layers',  d:'Store ke filter buttons.'},
  {id:'calculator',        t:'Order Calculator',     i:'card',    d:'Website type, add-on, speed — rates yahan.'},
  {id:'plans',             t:'Pricing Plans',        i:'target',  d:'Starter / Business / Enterprise.'},
  {id:'process',           t:'Process',              i:'refresh', d:'Kaam kaise hota hai — 4 steps.'},
  {id:'whyChoose',         t:'Why Choose Us',        i:'bolt',    d:'4 strong points.'},
  {id:'techStack',         t:'Tech Stack',           i:'plug',    d:'Kaun si technology use karte ho.'},
  {id:'comparison',        t:'Comparison Table',     i:'file',    d:'Plans ka comparison.'},
  {id:'testimonials',      t:'Testimonials',         i:'heart',   d:'Sirf real client feedback daalein.'},
  {id:'faqs',              t:'FAQ',                  i:'chat',    d:'Aam sawal-jawab.'},
  {id:'dashboard',         t:'Dashboard Text',       i:'gauge',   d:'Dashboard ka welcome message.'},
  {id:'seo',               t:'SEO Meta',             i:'globe',   d:'Har page ka title + description.'},
];

/* ============================================================
   STATE
   ============================================================ */
const state = {
  data: JSON.parse(JSON.stringify(D)),
  sec : 'brand',
  dirty: false,
};

/* ---------- path helpers ---------- */
const getP = (o,p)=> p.split('.').reduce((a,k)=> (a==null? a : a[k]), o);
function setP(o,p,v){
  const ks = p.split('.'), last = ks.pop();
  let t = o;
  ks.forEach(k=>{ if(t[k]==null || typeof t[k] !== 'object') t[k] = {}; t = t[k]; });
  t[last] = v;
}
function delP(o,p){
  const ks = p.split('.'), last = ks.pop();
  const arr = getP(o, ks.join('.'));
  if(Array.isArray(arr)) arr.splice(+last, 1);
}
const clone = v => JSON.parse(JSON.stringify(v));
/* element na mile to chup-chaap chhod do (single-file bundle me kuch button
   header ke andar hote hain jo page content me nahi hota) */
const on = (id, ev, fn)=>{ const el = document.getElementById(id); if(el) el.addEventListener(ev, fn); };
const pre = k => (LBL[k] || k.replace(/([A-Z])/g,' $1').replace(/^./, c=>c.toUpperCase()));

/* ============================================================
   RENDERERS
   ============================================================ */
function render(key, path, val){
  /* array → khaali ho to default shape se pata karo (list / matrix / string list) */
  if(Array.isArray(val)){
    if(!val.length){
      const d = DEFAULTS[key];
      if(d && !Array.isArray(d)) return list(key, path, val);
      if(Array.isArray(d))        return matrix(key, path, val);
      return strList(key, path, val);
    }
    /* array of objects → repeatable cards */
    if(typeof val[0] === 'object' && !Array.isArray(val[0])) return list(key, path, val);
    /* array of arrays → matrix rows */
    if(Array.isArray(val[0])) return matrix(key, path, val);
    /* array of strings */
    return strList(key, path, val);
  }
  /* nested object */
  if(val && typeof val === 'object')
    return `<div class="admin-card">
      <div class="admin-card-h">${pre(key)}</div>
      <div class="admin-card-b">${Object.keys(val).map(k=> render(k, path+'.'+k, val[k])).join('')}</div>
    </div>`;
  return input(key, path, val);
}

function input(key, path, val){
  const L = pre(key), id = 'f'+path.replace(/\./g,'_');
  if(typeof val === 'boolean')
    return `<label class="check" for="${id}">
      <input type="checkbox" id="${id}" data-p="${path}" ${val?'checked':''}>
      <span><span class="t">${L}</span><span class="d">On / Off</span></span></label>`;
  if(val === null || typeof val === 'number')
    return `<div class="field"><label for="${id}">${L}</label>
      <input type="number" id="${id}" data-p="${path}" value="${val===null?'':val}"
             placeholder="khaali = —"></div>`;
  const long = TEXTS.indexOf(key) > -1 || String(val).length > 70;
  if(long)
    return `<div class="field"><label for="${id}">${L}</label>
      <textarea id="${id}" data-p="${path}" rows="3">${esc(val)}</textarea></div>`;
  return `<div class="field"><label for="${id}">${L}</label>
    <input type="text" id="${id}" data-p="${path}" value="${esc(val)}"></div>`;
}

function strList(key, path, val){
  const L = pre(key);
  const txt = val.map(v=> (Array.isArray(v)? v.join(' | ') : v)).join(', ');
  return `<div class="field"><label>${L}</label>
    <input type="text" data-p="${path}" data-list="1" value="${esc(txt)}"
           placeholder="Comma se alag karein">
    <p class="hint">Comma se alag karein · ${val.length} item</p></div>`;
}

function list(key, path, arr){
  const blank = (arr.length && typeof arr[0]==='object')
      ? clone(arr[0]) : (DEFAULTS[key] || {title:'', desc:''});
  const titleOf = o => o.title || o.name || o.t || o.n || o.label || `#`;
  return `<div class="admin-list">
    <div class="admin-list-h">
      <b>${pre(key)}</b><span class="pill c6">${arr.length}</span>
      <button class="btn btn-line btn-sm" data-act="add" data-p="${path}"
        data-blank='${esc(JSON.stringify(blank))}'>+ Add</button>
    </div>
    ${arr.map((o,i)=>`
      <div class="admin-card">
        <div class="admin-card-h">
          <span class="admin-idx">${i+1}</span>
          <span class="admin-card-t">${esc(String(titleOf(o)).slice(0,46)) || '(khaali)'}</span>
          <button class="admin-del" data-act="del" data-p="${path}.${i}" title="Delete">✕</button>
        </div>
        <div class="admin-card-b">
          ${Object.keys(o).map(k=> render(k, `${path}.${i}.${k}`, o[k])).join('')}
        </div>
      </div>`).join('') || `<p class="muted small">Koi item nahi — <b>+ Add</b> dabao.</p>`}
  </div>`;
}

function matrix(key, path, rows){
  const isKind = rows.length && rows.every(r=> r.length===2 && ['inc','pro','add'].indexOf(r[1])>-1);
  const isQA   = rows.length && rows.every(r=> r.length===2) && !isKind && (key==='rows' ? false : true);
  const wide   = rows.length ? Math.max.apply(null, rows.map(r=>r.length)) : 2;
  const blank  = new Array(wide).fill('');
  return `<div class="admin-list">
    <div class="admin-list-h">
      <b>${pre(key)}</b><span class="pill c6">${rows.length}</span>
      <button class="btn btn-line btn-sm" data-act="row-add" data-p="${path}"
        data-blank='${esc(JSON.stringify(blank))}'>+ Row</button>
    </div>
    ${rows.map((r,i)=>`
      <div class="admin-row">
        ${r.map((c,j)=> isKind && j===1
          ? `<select data-p="${path}.${i}.${j}">
              <option value="inc"${c==='inc'?' selected':''}>inc</option>
              <option value="pro"${c==='pro'?' selected':''}>pro</option>
              <option value="add"${c==='add'?' selected':''}>add</option></select>`
          : `<input type="text" data-p="${path}.${i}.${j}" value="${esc(c)}"
              placeholder="${isQA?(j===0?'Sawal':'Jawab'):('col '+(j+1))}">`).join('')}
        <button class="admin-del" data-act="row-del" data-p="${path}.${i}" title="Delete">✕</button>
      </div>`).join('') || `<p class="muted small">Koi row nahi — <b>+ Row</b> dabao.</p>`}
  </div>`;
}

/* ============================================================
   NAV + SECTION
   ============================================================ */
function renderNav(){
  const nav = document.getElementById('adminNav');
  nav.innerHTML = SECTIONS.map(s=>
    `<button data-go="${s.id}" class="${s.id===state.sec?'on':''}">
      <svg viewBox="0 0 24 24">${icon(s.i)}</svg>${s.t}</button>`).join('');
  nav.querySelectorAll('[data-go]').forEach(b=> b.addEventListener('click', ()=>{
    state.sec = b.dataset.go;
    renderNav(); renderSection();
    const side = document.querySelector('.side');
    if(side && typeof side.scrollIntoView === 'function') side.scrollIntoView({block:'nearest'});
  }));
}

function renderSection(){
  const body = document.getElementById('adminBody');
  if(state.sec === 'setup'){
    const v = state.data.setupComplete;
    body.innerHTML = `
    <div class="panel"><div class="pb">
      <h3 class="h3">Setup Status</h3>
      <p class="muted mt-8">Data bhar chuke ho to <b>ON</b> kar do — upar wali
        "Setup pending" patti hat jayegi.</p>
      <div class="mt-24">
        <label class="check"><input type="checkbox" data-p="setupComplete" ${v?'checked':''}>
          <span><span class="t">Setup Complete</span><span class="d">Saara data bhar diya hai</span></span></label>
      </div>
      <div class="notice info mt-16">
        <b>Poora data file:</b> neeche <b>data.js Download</b> dabao — aapko ek nayi
        <code>data.js</code> file milegi jise <code>assets/js/data.js</code> ki jagah
        rakh do. Fir kisi bhi device par wahi content dikhega.
      </div>
    </div></div>`;
    return;
  }
  const s = SECTIONS.find(x=>x.id===state.sec);
  const val = state.data[s.id];
  body.innerHTML = `
    <div class="panel"><div class="pb">
      <div class="admin-sec-h">
        <span class="ic i-indigo"><svg viewBox="0 0 24 24">${icon(s.i)}</svg></span>
        <div><h3 class="h3">${s.t}</h3><p class="muted small">${s.d||''}</p></div>
      </div>
      ${render(s.id, s.id, val)}
    </div></div>`;
}

/* ============================================================
   BINDING (event delegation — har input turant state me)
   ============================================================ */
function bind(){
  document.getElementById('adminBody').addEventListener('input', e=>{
    const el = e.target, p = el.dataset.p;
    if(!p) return;
    if(el.type === 'checkbox') setP(state.data, p, el.checked);
    else if(el.type === 'number') setP(state.data, p, el.value === '' ? null : Number(el.value));
    else if(el.dataset.list) setP(state.data, p,
      el.value.split(',').map(s=>s.trim()).filter(s=>s!==''));
    else setP(state.data, p, el.value);
    dirty(true);
  });
  document.getElementById('adminBody').addEventListener('change', e=>{
    const el = e.target;
    if(el.tagName === 'SELECT' && el.dataset.p) setP(state.data, el.dataset.p, el.value);
  });
  document.getElementById('adminBody').addEventListener('click', e=>{
    const b = e.target.closest('[data-act]');
    if(!b) return;
    const p = b.dataset.p, act = b.dataset.act;
    if(act === 'add'){
      const arr = getP(state.data, p);
      if(Array.isArray(arr)) arr.push(JSON.parse(b.dataset.blank || '{}'));
    } else if(act === 'del'){
      if(confirm('Ye item delete karein?')) delP(state.data, p);
    } else if(act === 'row-add'){
      const arr = getP(state.data, p);
      if(Array.isArray(arr)) arr.push(JSON.parse(b.dataset.blank || '[]'));
    } else if(act === 'row-del'){
      if(confirm('Ye row delete karein?')) delP(state.data, p);
    }
    dirty(true);
    renderSection();
  });
}

function dirty(on){
  state.dirty = on;
  const pill = document.getElementById('dirtyPill');
  pill.textContent = on ? 'Unsaved Changes' : 'All Saved';
  pill.className = 'pill ' + (on ? 'c4' : 'c1');
}

/* ============================================================
   SAVE / EXPORT / IMPORT / DOWNLOAD / RESET
   ============================================================ */
function save(silent){
  try{
    localStorage.setItem(KEY, JSON.stringify(state.data));
    localStorage.setItem(KEY + '_at', new Date().toISOString());
    dirty(false);
    document.getElementById('savedAt').textContent =
      'Saved: ' + new Date().toLocaleString('hi-IN');
    if(!silent) SRToast('Website update ho gayi! 🎉');
  }catch(err){
    SRToast('Save fail — ' + err.message, 'err');
  }
}

function fileText(){
  const json = JSON.stringify(state.data, null, 2);
  return `/* ============================================================
   SR CODEMATRIX — SINGLE DATA FILE
   (Admin panel se generate ki gayi file — ${new Date().toISOString().slice(0,10)})
   ============================================================ */

const DATA = ${json};

/* ---------- helpers ---------- */
const has   = v => Array.isArray(v) ? v.length > 0 : (v !== null && v !== undefined && v !== "");
const orDash = v => has(v) ? v : "—";
const money  = v => (v === null || v === undefined || v === "") ? "—" : "₹" + Number(v).toLocaleString("en-IN");

/* ---------- ADMIN PANEL OVERRIDE (admin.html se save hua) ---------- */
(function(){
  try{
    const saved = localStorage.getItem('srcm_data_override');
    if(saved){
      const over = JSON.parse(saved);
      if(over && typeof over === 'object'){
        Object.keys(over).forEach(k => { if(k !== 'setupComplete') DATA[k] = over[k]; });
        if(over.setupComplete !== undefined) DATA.setupComplete = over.setupComplete;
      }
    }
  }catch(e){ /* kharab JSON = ignore */ }
})();

window.DATA = DATA; window.has = has; window.orDash = orDash; window.money = money;
`;
}

function download(name, text, mime){
  const b = new Blob([text], {type: mime || 'text/plain;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(b);
  a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 400);
}

function bindTools(){
  on('btnSave',    'click', ()=> save());
  on('btnSaveTop', 'click', ()=> save());
  on('btnExport',  'click', ()=>{
    download('srcodematrix-data-' + todayISO() + '.json',
      JSON.stringify(state.data, null, 2), 'application/json');
    SRToast('JSON download ho gaya');
  });
  on('btnDownload','click', ()=>{
    download('data.js', fileText());
    SRToast('data.js download — purani file replace kar dein');
  });
  const fi = document.getElementById('fileInput');
  on('btnImport','click', ()=> fi && fi.click());
  fi.addEventListener('change', ()=>{
    const f = fi.files && fi.files[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = ()=>{
      try{
        const o = JSON.parse(r.result);
        if(typeof o !== 'object' || Array.isArray(o)) throw new Error('JSON object hona chahiye');
        state.data = o; dirty(true); renderNav(); renderSection();
        SRToast('Import ho gaya — ab Save dabayein');
      }catch(err){ SRToast('Import fail: ' + err.message, 'err'); }
    };
    r.readAsText(f);
    fi.value = '';
  });
  const reset = ()=>{
    if(!confirm('Sab badlav hata ke data.js file ki original value wapas layein?')) return;
    localStorage.removeItem(KEY);
    localStorage.removeItem(KEY + '_at');
    location.reload();
  };
  on('btnReset',    'click', reset);
  on('btnResetAll', 'click', reset);
  window.addEventListener('beforeunload', e=>{
    if(state.dirty){ e.preventDefault(); e.returnValue = ''; }
  });
}

/* ============================================================
   BOOT
   ============================================================ */
function boot(){
  const saved = localStorage.getItem(KEY);
  if(saved){ try{ state.data = JSON.parse(saved); }catch(e){} }
  document.getElementById('admName').textContent = (state.data.brand && state.data.brand.name) || 'SR Codematrix';
  const at = localStorage.getItem(KEY + '_at');
  if(at) document.getElementById('savedAt').textContent = 'Saved: ' + new Date(at).toLocaleString('hi-IN');
  renderNav(); renderSection(); bind(); bindTools(); dirty(false);
}

function initLock(){
  const lock = document.getElementById('lockScreen');
  const app  = document.getElementById('adminApp');
  if(!PIN){ if(app) app.hidden = false; boot(); return; }
  lock.hidden = false;
  on('pinForm','submit', e=>{
    e.preventDefault();
    if(document.getElementById('pinInput').value === PIN){
      lock.hidden = true; if(app) app.hidden = false; boot();
    }
    else SRToast('Galat PIN', 'err');
  });
}

SRReady(initLock);
})();

  },
};

/* ---------- header/footer ka active link ---------- */
function SRSyncNav(name){
  document.querySelectorAll('.nav-links a, .drawer a').forEach(a=>{
    const h = (a.getAttribute('href')||'').replace(/^#|\.html$/g,'');
    a.classList.toggle('active', h === name);
  });
  document.querySelectorAll('.appbar a[data-nav]').forEach(a=>
    a.classList.toggle('active', (a.dataset.nav||'').replace('.html','') === name));
}

/* ---------- router ---------- */
let SR_CURRENT = null;
function SRRoute(){
  let name = (location.hash || '#index').replace(/^#/, '');
  if(!SRPAGES[name]) name = 'index';
  if(name === SR_CURRENT) return;
  SR_CURRENT = name;

  window.SR_PAGE = name + '.html';
  /* localStorage me save kiya gaya data dobara apply karo
     (single-file me hash navigation par page reload nahi hota) */
  if(window.SRApplyOverride) SRApplyOverride();

  const page = document.getElementById('srPage');
  page.innerHTML = SRPAGES[name];

  /* header / footer dobara paint */
  if(window.SRAuth){ SRAuth.paintHeader(); SRAuth.bindPage(); }
  SRSyncNav(name);
  document.querySelectorAll('[data-year]').forEach(e=> e.textContent = new Date().getFullYear());

  /* page ka apna JS chalao */
  const fn = SRCODE[name];
  if(fn) SRReady(fn);

  /* animations / counters dubara bind karo */
  if(window.initReveal)   initReveal();
  if(window.initCounters) initCounters();
  if(window.initShell)    initShell();

  window.scrollTo({top:0, behavior:'instant' in window ? 'instant' : 'auto'});
  document.title = (window.DATA && DATA.brand && DATA.brand.name
    ? DATA.brand.name + ' — ' : '') + (name === 'index' ? 'Website Sell & Build' : name);
}

window.addEventListener('hashchange', SRRoute);
window.addEventListener('DOMContentLoaded', SRRoute);

/* ---------- purane .html links ko hash me badlo ---------- */
document.addEventListener('click', e=>{
  const a = e.target.closest && e.target.closest('a[href]');
  if(!a) return;
  const h = a.getAttribute('href') || '';
  if(/^[a-z]+\.html$/i.test(h)){
    e.preventDefault();
    location.hash = h.replace(/\.html$/i, '');
  }
});

/* ---------- drawer / burger band on navigate ---------- */
window.addEventListener('hashchange', ()=>{
  const d = document.getElementById('mDrawer'), b = document.getElementById('burger');
  d && d.classList.remove('open');
  b && b.setAttribute('aria-expanded','false');
});
