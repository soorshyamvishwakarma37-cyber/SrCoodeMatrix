/* ============================================================
   SR CodeMatrix Pvt Ltd — COMPLETE JS (all files joined)
   config.js + store.js + main.js + admin.js
   Load AFTER Firebase SDK scripts (config first — order below).
   ============================================================ */


/* ======================================================================
   ===== js/config.js (74 lines) =====
   ====================================================================== */

/* ============================================================
   SR CodeMatrix Pvt Ltd — Site Configuration (LIVE READY)
   ============================================================ */

window.SR_CONFIG = {
  // ---- Brand ----
  BRAND: "SR CodeMatrix Pvt Ltd",
  BRAND_SHORT: "SR CodeMatrix",
  TAGLINE: "India's developer marketplace for software, services & digital products",
  SUPPORT_EMAIL: "support@srcodematrix.com",
  SUPPORT_PHONE: "+91 78699 69190",
  ADDRESS: "Narmadapuram Road, Misrod, Bhopal 462026, Madhya Pradesh",

  // ---- Admin (ONLY this email can access admin.html) ----
  ADMIN_EMAIL: "soorshyamvishwakarma37@gmail.com",
  // Used ONLY when Firebase is offline (preview/demo mode).
  // LIVE: admin signs in with their real Firebase Auth password.
  ADMIN_LOCAL_PASSWORD: "Admin@2026",

  // ---- Razorpay ----
  // Default key. Admin Panel → Settings can OVERRIDE this key live.
  RAZORPAY_KEY_ID: "rzp_test_TfTNHTZ21d4UtB",
  RAZORPAY_CURRENCY: "INR",

  // ---- Google AdSense (Admin Panel can override) ----
  ADSENSE_CLIENT: "ca-pub-0000000000000000",
  ADSENSE_SLOTS: {
    header: "1234567890",
    home_banner: "1234567891",
    in_feed: "1234567892",
    sidebar: "1234567893",
    footer: "1234567894",
    sticky: "1234567895"
  },

  // ---- Affiliate Monetization ----
  AFFILIATE: {
    amazonTag: "srcodematrix-21",   // Your Amazon Associates tag
    flipkartId: "srcodematrix"      // Your Flipkart Affiliate ID
  },

  // ---- Income Sources ----
  PRO_PLAN: { name: "Pro Buyer", price: 99, benefit: "Extra 10% off with code PRO10 + early access" },
  PROMO_PRICE: 499,     // Featured product placement (one-time)
  TIP_AMOUNTS: [20, 50, 100],
  // Checkout upsells (order add-ons) — additional income per order
  CHECKOUT_ADDONS: [
    { id: "priority", label: "Priority Support Pack — 24×7 priority queue + setup call", price: 99 },
    { id: "warranty", label: "Extended Cover — 12 extra months of support & updates", price: 149 }
  ],
  // Paid listing fee charged when a new seller submits (0 = disabled)
  LISTING_FEE: 0,

  // ---- Firebase ----
  firebase: {
    apiKey: "AIzaSyAL9dsBvNrp-ijxAk7ZYZcbN0BPaZ5gYtw",
    authDomain: "sewaastra.firebaseapp.com",
    databaseURL: "https://sewaastra-default-rtdb.firebaseio.com",
    projectId: "sewaastra",
    storageBucket: "sewaastra.firebasestorage.app",
    messagingSenderId: "211091351218",
    appId: "1:211091351218:web:bba1de2cbfa6e26f464bab",
    measurementId: "G-817LNYXHRB"
  },

  // ---- Coupons (base set; admin can add more in Admin Panel) ----
  COUPONS: {
    SR10:      { type: "percent", value: 10, label: "10% OFF" },
    WELCOME50: { type: "flat", value: 50, label: "₹50 OFF" },
    FREESHIP:  { type: "flat", value: 30, label: "₹30 OFF (Shipping)" },
    PRO10:     { type: "percent", value: 10, label: "PRO 10% OFF", proOnly: true }
  }
};

/* ======================================================================
   ===== js/store.js (723 lines) =====
   ====================================================================== */

/* ============================================================
   SR CodeMatrix — Data Layer (LIVE READY)
   - NO demo/seed data: catalog & orders start empty
   - Firebase Realtime DB + Auth (auto local fallback offline)
   - Settings store (Razorpay key, AdSense, coupons, banners)
   - Admin-only guards (single admin email)
   ============================================================ */
(function () {
  "use strict";

  const CFG = window.SR_CONFIG || {};

  const mem = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  function uid(p) { return (p || "id") + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function normEmail(e) { return String(e || "").trim().toLowerCase(); }
  function isAdminEmail(e) { return normEmail(e) === normEmail(CFG.ADMIN_EMAIL); }

  /** Map Firebase auth codes → clear, user-friendly English messages. */
  function friendlyAuthError(e) {
    const code = (e && e.code) || "";
    const map = {
      "auth/email-already-in-use": "This email is already registered. Please Login instead.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password": "Password is too weak — use at least 6 characters.",
      "auth/user-not-found": "No account found with this email. Please Create Account first.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/invalid-credential": "Incorrect email or password. Please try again.",
      "auth/invalid-login-credentials": "Incorrect email or password. Please try again.",
      "auth/too-many-requests": "Too many attempts. Please wait a minute and try again.",
      "auth/network-request-failed": "Network error — check your internet connection and retry.",
      "auth/operation-not-allowed": "Google Sign-in is not enabled yet. Enable it in Firebase Console → Authentication → Sign-in method → Google → Save.",
      "auth/unauthorized-domain": "This domain is not authorized in Firebase. Add it under Authentication → Settings → Authorized domains.",
      "auth/popup-blocked": "Popup was blocked — allow popups for this site and try again.",
      "auth/popup-closed-by-user": "Google sign-in cancelled.",
      "auth/cancelled-popup-request": "Google sign-in cancelled.",
      "auth/account-exists-with-different-credential": "An account already exists with this email. Sign in with email & password instead.",
      "auth/user-disabled": "This account has been disabled. Please contact support."
    };
    if (map[code]) return new Error(map[code]);
    if (e instanceof Error) return e;
    return new Error((e && e.message) || "Authentication failed. Please try again.");
  }

  /* ---------- Seller Plans ---------- */
  const SELLER_PLANS = [
    {
      id: "starter", name: "Starter", price: 0, period: "forever",
      tagline: "Get started at zero cost",
      features: ["List up to 10 products", "Basic analytics", "Community support", "5% transaction fee", "Standard listing"]
    },
    {
      id: "growth", name: "Growth", price: 499, period: "per month", popular: true,
      tagline: "For serious sellers",
      features: ["Unlimited products", "Priority listings (top rank)", "Advanced analytics", "2% transaction fee", "Coupons & discounts", "24×7 chat support"]
    },
    {
      id: "enterprise", name: "Enterprise", price: 1999, period: "per month",
      tagline: "For brands & agencies",
      features: ["Everything in Growth", "0% transaction fee", "Custom storefront URL", "API access", "Dedicated manager", "Featured homepage slots"]
    }
  ];

  /* ---------- Affiliate Deals ---------- */
  const DEALS = [
    { id: "d1", title: "Latest Laptops", store: "Amazon", cat: "Computers", off: "Amazon", icon: "code", c1: "#ff9900", c2: "#f59e0b", note: "Check the latest price on the store", q: "laptop", kind: "amazon" },
    { id: "d2", title: "Smartphones", store: "Flipkart", cat: "Mobiles", off: "Flipkart", icon: "mobile", c1: "#2874f0", c2: "#06b6d4", note: "Check the latest price on the store", q: "smartphone", kind: "flipkart" },
    { id: "d3", title: "Developer Courses", store: "Amazon", cat: "Learning", off: "Amazon", icon: "cap", c1: "#ff9900", c2: "#ef4444", note: "Check the latest price on the store", q: "programming course", kind: "amazon" },
    { id: "d4", title: "Smart Watches", store: "Flipkart", cat: "Wearables", off: "Flipkart", icon: "chart", c1: "#2874f0", c2: "#8b5cf6", note: "Check the latest price on the store", q: "smart watch", kind: "flipkart" },
    { id: "d5", title: "Mechanical Keyboards", store: "Amazon", cat: "Accessories", off: "Amazon", icon: "template", c1: "#ff9900", c2: "#8b5cf6", note: "Check the latest price on the store", q: "mechanical keyboard", kind: "amazon" },
    { id: "d6", title: "Headphones & Earbuds", store: "Flipkart", cat: "Audio", off: "Flipkart", icon: "bot", c1: "#2874f0", c2: "#ec4899", note: "Check the latest price on the store", q: "earbuds", kind: "flipkart" },
    { id: "d7", title: "Monitors & Displays", store: "Amazon", cat: "Computers", off: "Amazon", icon: "cloud", c1: "#ff9900", c2: "#22d3ee", note: "Check the latest price on the store", q: "monitor", kind: "amazon" },
    { id: "d8", title: "Web Hosting Deals", store: "Amazon", cat: "Hosting", off: "Amazon", icon: "shield", c1: "#ff9900", c2: "#10b981", note: "Check the latest price on the store", q: "web hosting", kind: "amazon" }
  ];

  /* ============================================================
     Store
     ============================================================ */
  const Store = {
    mode: "local",
    db: null,
    auth: null,
    _authCbs: [],
    _user: null,
    _ready: null,
    _settingsCache: null,

    plans: SELLER_PLANS,
    deals: DEALS,

    init() {
      if (this._ready) return this._ready;
      this._ready = (async () => {
        try {
          if (window.firebase && firebase.apps && firebase.apps.length === 0) {
            firebase.initializeApp(CFG.firebase);
            this.db = firebase.database();
            this.auth = firebase.auth();
            this.mode = "firebase";
            this.auth.onAuthStateChanged(u => {
              this._user = u ? { uid: u.uid, email: u.email, name: u.displayName || (u.email || "").split("@")[0] } : null;
              if (!this._user) this._user = mem.get("sr_session", null);
              this._authCbs.forEach(cb => { try { cb(this._user); } catch (e) {} });
            });
          } else {
            throw new Error("firebase sdk not loaded");
          }
        } catch (e) {
          console.warn("[SR] Firebase unavailable → local mode.", e && e.message);
          this.mode = "local";
          this._user = mem.get("sr_session", null);
          setTimeout(() => this._authCbs.forEach(cb => { try { cb(this._user); } catch (e2) {} }), 0);
        }
        // Live start: NO demo products, NO demo orders.
        return this.mode;
      })();
      // Auto-purge legacy demo/sample data ONCE per browser (and Firebase on first run).
      this._ready.then(() => {
        try {
          if (!mem.get("sr_purge_done", false)) {
            this.purgeLegacyDemo().then(n => {
              mem.set("sr_purge_done", true);
              if (n) console.warn("[SR] Removed " + n + " legacy demo record(s).");
            }).catch(() => { mem.set("sr_purge_done", true); });
          }
        } catch (e) {}
      });
      return this._ready;
    },

    /* ---------- Settings (Razorpay key, AdSense, coupons, banner) ---------- */
    async getSettings() {
      await this.init();
      if (this._settingsCache) return this._settingsCache;
      let s = {};
      try {
        if (this.mode === "firebase") {
          const snap = await this.db.ref("settings/site").once("value");
          s = snap.val() || {};
        } else {
          s = mem.get("sr_settings", {});
        }
      } catch (e) { s = {}; }
      this._settingsCache = s;
      return s;
    },
    async saveSettings(patch, adminEmail) {
      await this.init();
      if (!isAdminEmail(adminEmail)) throw new Error("Only the site administrator can change settings.");
      const cur = await this.getSettings();
      const next = { ...cur, ...patch, updated_at: Date.now(), updated_by: normEmail(adminEmail) };
      if (this.mode === "firebase") {
        await this.db.ref("settings/site").set(next);
      } else {
        mem.set("sr_settings", next);
      }
      this._settingsCache = next;
      // activity log (last 30)
      try {
        const logs = (next.logs || []).slice(-29);
        logs.push({ t: Date.now(), by: normEmail(adminEmail), action: Object.keys(patch).join(",") });
        next.logs = logs;
        if (this.mode === "firebase") await this.db.ref("settings/site/logs").set(logs);
        else { const s2 = { ...next }; mem.set("sr_settings", s2); this._settingsCache = s2; }
      } catch (e) {}
      return next;
    },
    async getRazorpayKey() {
      const s = await this.getSettings();
      return (s.razorpay_key && /^rzp_(test|live)_[A-Za-z0-9]{8,}$/.test(s.razorpay_key))
        ? s.razorpay_key
        : CFG.RAZORPAY_KEY_ID;
    },
    async getAdsenseClient() {
      const s = await this.getSettings();
      return s.adsense_client || CFG.ADSENSE_CLIENT;
    },
    getCouponMap(base) {
      return base || {};
    },

    /* ---------- Products ---------- */
    async _rawProducts() {
      if (this.mode === "firebase") {
        const snap = await this.db.ref("products").once("value");
        return Object.values(snap.val() || {});
      }
      return mem.get("sr_products", []);
    },
    /** Storefront: only approved products. opts.all → everything (dashboard/admin). */
    async listProducts(opts) {
      await this.init();
      let arr = await this._rawProducts();
      if (!(opts && opts.all)) arr = arr.filter(p => p.approved !== false);
      return arr;
    },
    async getProduct(id) {
      const list = await this.listProducts();
      return list.find(p => p.id === id) || null;
    },
    async saveProduct(p) {
      await this.init();
      if (!p.id) p.id = uid("p");
      if (this.mode === "firebase") {
        await this.db.ref("products/" + p.id).set(p);
      } else {
        const list = mem.get("sr_products", []);
        const i = list.findIndex(x => x.id === p.id);
        if (i >= 0) list[i] = p; else list.unshift(p);
        mem.set("sr_products", list);
      }
      this._settingsCache = this._settingsCache; // no-op keep
      return p;
    },
    async deleteProduct(id) {
      await this.init();
      if (this.mode === "firebase") {
        await this.db.ref("products/" + id).remove();
      } else {
        mem.set("sr_products", mem.get("sr_products", []).filter(p => p.id !== id));
      }
    },
    async clearCatalog() {
      await this.init();
      const all = await this._rawProducts();
      for (const p of all) await this.deleteProduct(p.id);
      return all.length;
    },

    /* ---------- Orders ---------- */
    async listOrders() {
      await this.init();
      if (this.mode === "firebase") {
        const snap = await this.db.ref("orders").once("value");
        return Object.values(snap.val() || {}).sort((a, b) => (b.date || 0) - (a.date || 0));
      }
      return mem.get("sr_orders", []).slice().sort((a, b) => (b.date || 0) - (a.date || 0));
    },
    async saveOrder(o) {
      await this.init();
      if (!o.id) o.id = "SR" + Date.now().toString().slice(-8);
      o.date = o.date || Date.now();
      if (this.mode === "firebase") {
        await this.db.ref("orders/" + o.id).set(o);
      } else {
        const list = mem.get("sr_orders", []);
        list.unshift(o);
        mem.set("sr_orders", list);
      }
      return o;
    },
    async updateOrderStatus(id, status) {
      await this.init();
      if (!["pending", "paid", "delivered", "refunded", "cancelled"].includes(status)) {
        throw new Error("Invalid status.");
      }
      if (this.mode === "firebase") {
        await this.db.ref("orders/" + id + "/status").set(status);
      } else {
        const list = mem.get("sr_orders", []);
        const o = list.find(x => x.id === id);
        if (o) o.status = status;
        mem.set("sr_orders", list);
      }
    },

    /* ---------- Sellers ---------- */
    async saveSeller(s) {
      await this.init();
      if (isAdminEmail(s.email)) throw new Error("This email is reserved for the administrator.");
      if (!s.id) s.id = uid("s");
      s.createdAt = s.createdAt || Date.now();
      if (this.mode === "firebase") {
        await this.db.ref("sellers/" + s.id).set(s);
      } else {
        const list = mem.get("sr_sellers", []);
        list.unshift(s);
        mem.set("sr_sellers", list);
      }
      return s;
    },
    async listSellers() {
      await this.init();
      if (this.mode === "firebase") {
        const snap = await this.db.ref("sellers").once("value");
        return Object.values(snap.val() || {});
      }
      return mem.get("sr_sellers", []);
    },
    async updateSeller(id, patch) {
      await this.init();
      if (this.mode === "firebase") {
        await this.db.ref("sellers/" + id).update(patch);
      } else {
        const list = mem.get("sr_sellers", []);
        const s = list.find(x => x.id === id);
        if (s) Object.assign(s, patch);
        mem.set("sr_sellers", list);
      }
    },

    /* ---------- Messages ---------- */
    async saveMessage(m) {
      await this.init();
      m.id = uid("m");
      m.createdAt = Date.now();
      m.read = false;
      if (this.mode === "firebase") {
        await this.db.ref("messages/" + m.id).set(m);
      } else {
        const list = mem.get("sr_messages", []);
        list.unshift(m);
        mem.set("sr_messages", list);
      }
      return m;
    },
    async listMessages() {
      await this.init();
      if (this.mode === "firebase") {
        const snap = await this.db.ref("messages").once("value");
        return Object.values(snap.val() || {}).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      }
      return mem.get("sr_messages", []);
    },
    async markMessage(id, read) {
      await this.init();
      if (this.mode === "firebase") {
        await this.db.ref("messages/" + id + "/read").set(!!read);
      } else {
        const list = mem.get("sr_messages", []);
        const m = list.find(x => x.id === id);
        if (m) m.read = !!read;
        mem.set("sr_messages", list);
      }
    },

    /* ---------- Coupons (config base + admin extras) ---------- */
    async getCoupons() {
      const s = await this.getSettings();
      return { ...(CFG.COUPONS || {}), ...(s.coupons || {}) };
    },
    async saveCoupon(code, def, adminEmail) {
      code = String(code || "").trim().toUpperCase();
      if (!/^[A-Z0-9_]{3,20}$/.test(code)) throw new Error("Coupon code: 3–20 chars (A–Z, 0–9).");
      if (!def || !["percent", "flat"].includes(def.type)) throw new Error("Type must be percent or flat.");
      const value = Number(def.value);
      if (!value || value <= 0 || (def.type === "percent" && value > 90)) throw new Error("Invalid coupon value.");
      const s = await this.getSettings();
      const coupons = { ...(s.coupons || {}) };
      coupons[code] = { type: def.type, value, label: def.label || (def.type === "percent" ? value + "% OFF" : "₹" + value + " OFF"), proOnly: !!def.proOnly };
      return this.saveSettings({ coupons }, adminEmail);
    },
    async deleteCoupon(code, adminEmail) {
      code = String(code || "").trim().toUpperCase();
      if (CFG.COUPONS[code]) throw new Error("Base coupon — edit it in config.js instead.");
      const s = await this.getSettings();
      const coupons = { ...(s.coupons || {}) };
      delete coupons[code];
      return this.saveSettings({ coupons }, adminEmail);
    },

    /* ---------- Auth ---------- */
    isAdmin(u) { return isAdminEmail((u || this._user || {}).email); },
    onAuth(cb) {
      this._authCbs.push(cb);
      this.init().then(() => { try { cb(this._user); } catch (e) {} });
    },
    currentUser() { return this._user; },

    async register(email, password, name) {
      await this.init();
      if (isAdminEmail(email)) throw new Error("This email is reserved for the administrator.");
      if (this.mode === "firebase") {
        try {
          const cred = await this.auth.createUserWithEmailAndPassword(email, password);
          if (name) await cred.user.updateProfile({ displayName: name });
          return { uid: cred.user.uid, email, name };
        } catch (e) { throw friendlyAuthError(e); }
      }
      const users = mem.get("sr_users", []);
      if (users.find(u => normEmail(u.email) === normEmail(email))) throw new Error("Email already registered.");
      const u = { uid: uid("u"), email, password, name: name || email.split("@")[0] };
      users.push(u);
      mem.set("sr_users", users);
      const session = { uid: u.uid, email, name: u.name };
      mem.set("sr_session", session);
      this._user = session;
      this._authCbs.forEach(cb => { try { cb(this._user); } catch (e) {} });
      return session;
    },

    /**
     * Google Sign-In (Firebase live mode only).
     * opts.adminOnly → reject any Google account that is not CFG.ADMIN_EMAIL.
     */
    async googleLogin(opts) {
      await this.init();
      if (this.mode !== "firebase" || !this.auth) {
        throw new Error("Google Sign-in needs a live Firebase connection. Offline preview: use email & password.");
      }
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      try {
        const cred = await this.auth.signInWithPopup(provider);
        const email = normEmail(cred.user.email);
        if (opts && opts.adminOnly && !isAdminEmail(email)) {
          await this.auth.signOut();
          throw new Error("Access denied. This Google account is not the administrator.");
        }
        const user = {
          uid: cred.user.uid,
          email: cred.user.email,
          name: cred.user.displayName || email.split("@")[0]
        };
        this._user = user;
        mem.set("sr_session", user);
        // NOTE: do NOT fire _authCbs here — Firebase onAuthStateChanged already notifies listeners
        // (manual fire caused double dashboard/admin loads).
        return user;
      } catch (e) {
        const code = e && e.code;
        if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
          throw new Error("Google sign-in cancelled.");
        }
        if (e && e.message && e.message.indexOf("Access denied") === 0) throw e;
        throw friendlyAuthError(e);
      }
    },

    /** Seller login — admin email is redirected to the Admin Panel. */
    async login(email, password) {
      await this.init();
      if (isAdminEmail(email)) throw new Error("Admin account — please sign in from the Admin Panel.");
      if (this.mode === "firebase") {
        try {
          const cred = await this.auth.signInWithEmailAndPassword(email, password);
          return { uid: cred.user.uid, email: cred.user.email, name: cred.user.displayName || email.split("@")[0] };
        } catch (e) { throw friendlyAuthError(e); }
      }
      const users = mem.get("sr_users", []);
      const u = users.find(x => normEmail(x.email) === normEmail(email) && x.password === password);
      if (!u) throw new Error("Invalid credentials. Register first.");
      const session = { uid: u.uid, email: u.email, name: u.name };
      mem.set("sr_session", session);
      this._user = session;
      this._authCbs.forEach(cb => { try { cb(this._user); } catch (e) {} });
      return session;
    },

    /** ADMIN login — ONLY CFG.ADMIN_EMAIL allowed. */
    async adminLogin(email, password) {
      await this.init();
      if (!isAdminEmail(email)) throw new Error("Access denied. This panel is restricted to the site administrator.");
      // simple throttle (session)
      const key = "sr_admin_tries";
      const tries = JSON.parse(sessionStorage.getItem(key) || '{"n":0,"t":0}');
      if (tries.n >= 8 && Date.now() - tries.t < 60000) {
        throw new Error("Too many attempts. Try again in 1 minute.");
      }
      let user = null;
      if (this.mode === "firebase") {
        try {
          const cred = await this.auth.signInWithEmailAndPassword(normEmail(email), password);
          if (!isAdminEmail(cred.user.email)) {
            await this.auth.signOut();
            throw new Error("Access denied.");
          }
          user = { uid: cred.user.uid, email: cred.user.email, name: cred.user.displayName || "Admin" };
        } catch (e) {
          tries.n++; tries.t = Date.now();
          sessionStorage.setItem(key, JSON.stringify(tries));
          if (e && e.message && e.message.includes("Access denied")) throw e;
          throw friendlyAuthError(e);
        }
      } else {
        if (password !== CFG.ADMIN_LOCAL_PASSWORD) {
          tries.n++; tries.t = Date.now();
          sessionStorage.setItem(key, JSON.stringify(tries));
          throw new Error("Invalid email or password.");
        }
        user = { uid: "admin_local", email: normEmail(email), name: "Administrator" };
      }
      sessionStorage.removeItem(key);
      mem.set("sr_session", user);
      this._user = user;
      this._authCbs.forEach(cb => { try { cb(this._user); } catch (e) {} });
      return user;
    },

    async logout() {
      if (this.mode === "firebase" && this.auth) {
        try { await this.auth.signOut(); } catch (e) {}
      }
      mem.del("sr_session");
      this._user = null;
      this._authCbs.forEach(cb => { try { cb(null); } catch (e) {} });
    },

    /* ---------- Pro Buyer ---------- */
    isPro() { return mem.get("sr_pro", false); },
    setPro(v) { mem.set("sr_pro", !!v); },

    /* ---------- GST Tax helpers (inclusive pricing) ---------- */
    async taxConfig() {
      const s = await this.getSettings();
      const rate = Number(s.gst_rate != null ? s.gst_rate : 18);
      return {
        rate,
        gstin: s.gstin || "",
        company_legal: s.company_legal || CFG.BRAND,
        state_code: String(s.state_code || "23"),
        state_name: s.state_name || "Madhya Pradesh",
        invoice_prefix: s.invoice_prefix || "SRCM",
        sac_code: s.sac_code || "998313"
      };
    },
    /** total is GST-INCLUSIVE. Returns tax breakdown rounded to 2 decimals. */
    async computeTax(total, buyerStateCode) {
      const cfg = await this.taxConfig();
      const rate = cfg.rate;
      if (rate <= 0) return { rate: 0, taxable: r2(total), cgst: 0, sgst: 0, igst: 0, intra: true };
      const taxable = r2(total * 100 / (100 + rate));
      const tax = r2(total - taxable);
      const intra = String(buyerStateCode || cfg.state_code) === cfg.state_code;
      if (intra) {
        const half = r2(tax / 2);
        return { rate, taxable, cgst: half, sgst: r2(tax - half), igst: 0, intra: true };
      }
      return { rate, taxable, cgst: 0, sgst: 0, igst: tax, intra: false };

      function r2(n) { return Math.round(Number(n) * 100) / 100; }
    },
    invoiceNo(orderId) {
      const pref = (this._settingsCache && this._settingsCache.invoice_prefix) || "SRCM";
      return `INV-${pref}-${String(orderId || "").replace(/\D/g, "").slice(-6).padStart(6, "0")}`;
    },
    async getOrder(id) {
      await this.init();
      if (this.mode === "firebase") {
        const snap = await this.db.ref("orders/" + id).once("value");
        return snap.val() || null;
      }
      return mem.get("sr_orders", []).find(o => o.id === id) || null;
    },

    /* ---------- Reviews / Ratings ---------- */
    async listReviews(productId, includeHidden) {
      await this.init();
      let list;
      if (this.mode === "firebase") {
        const snap = await this.db.ref("reviews").once("value");
        list = Object.values(snap.val() || {});
      } else {
        list = mem.get("sr_reviews", []);
      }
      if (productId) list = list.filter(r => r.productId === productId);
      if (!includeHidden) list = list.filter(r => r.approved !== false);
      return list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    },
    async saveReview(r) {
      await this.init();
      const s = await this.getSettings();
      if (s.reviews_enabled === false) throw new Error("Reviews are currently disabled.");
      const rating = Math.round(Number(r.rating));
      if (!(rating >= 1 && rating <= 5)) throw new Error("Please choose a rating from 1 to 5 stars.");
      const productId = String(r.productId || "");
      const email = String(r.email || "").trim().toLowerCase();
      const name = String(r.name || "").trim().slice(0, 60);
      const title = String(r.title || "").trim().slice(0, 100);
      const text = String(r.text || "").trim().slice(0, 1500);
      if (!productId || !name || !email || !text) throw new Error("Please fill name, email and your review.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Invalid email address.");
      const existing = await this.listReviews(productId, true);
      if (existing.some(x => (x.email || "").toLowerCase() === email)) {
        throw new Error("You have already reviewed this product.");
      }
      const rev = {
        id: uid("rev"), productId, rating, name, email, title, text,
        createdAt: Date.now(), approved: true
      };
      if (this.mode === "firebase") {
        await this.db.ref("reviews/" + rev.id).set(rev);
      } else {
        const list = mem.get("sr_reviews", []);
        list.unshift(rev);
        mem.set("sr_reviews", list);
      }
      return rev;
    },
    async deleteReview(id) {
      await this.init();
      if (this.mode === "firebase") await this.db.ref("reviews/" + id).remove();
      else mem.set("sr_reviews", mem.get("sr_reviews", []).filter(r => r.id !== id));
    },
    async setReviewApproved(id, ok) {
      await this.init();
      if (this.mode === "firebase") await this.db.ref("reviews/" + id + "/approved").set(!!ok);
      else {
        const list = mem.get("sr_reviews", []);
        const r = list.find(x => x.id === id);
        if (r) r.approved = !!ok;
        mem.set("sr_reviews", list);
      }
    },
    ratingSummary(reviews) {
      if (!reviews.length) return { avg: 0, count: 0, dist: [0, 0, 0, 0, 0] };
      const dist = [0, 0, 0, 0, 0];
      let sum = 0;
      reviews.forEach(r => { sum += Number(r.rating) || 0; dist[5 - Math.round(r.rating)]++; });
      return { avg: Math.round((sum / reviews.length) * 10) / 10, count: reviews.length, dist };
    },

    /* ---------- Live purge: remove legacy demo records ---------- */
    async purgeLegacyDemo() {
      await this.init();
      let removed = 0;
      const demoProductIds = ["p_crm", "p_appdev", "p_host", "p_security", "p_react", "p_uiux", "p_theme", "p_chatbot", "p_seo", "p_integration", "p_wp", "p_analytics"];
      const products = await this._rawProducts();
      for (const p of products) {
        if (demoProductIds.includes(p.id)) { await this.deleteProduct(p.id); removed++; }
      }
      // orphan reviews on deleted demo products
      try {
        let revs;
        if (this.mode === "firebase") {
          const snap = await this.db.ref("reviews").once("value");
          revs = Object.values(snap.val() || {});
        } else {
          revs = mem.get("sr_reviews", []);
        }
        for (const r of revs) {
          if (demoProductIds.includes(r.productId)) { await this.deleteReview(r.id); removed++; }
        }
      } catch (e) {}
      const orders = await this.listOrders();
      for (const o of orders) {
        const demoOrder = /^SRD\d+/.test(o.id) || String(o.paymentId || "").startsWith("pay_seed");
        if (demoOrder) {
          if (this.mode === "firebase") await this.db.ref("orders/" + o.id).remove();
          else mem.set("sr_orders", mem.get("sr_orders", []).filter(x => x.id !== o.id));
          removed++;
        }
      }
      // legacy local keys (NOTE: "sr_products" is the LIVE catalog — never delete it wholesale)
      ["sr_seed_v", "sr_orders_demo", "sr_test_users"].forEach(k => mem.del(k));
      if (this.mode === "local") {
        // keep only non-demo local orders
        const local = mem.get("sr_orders", []);
        const kept = local.filter(o => !(/^SRD\d+/.test(o.id) || String(o.paymentId || "").startsWith("pay_seed")));
        if (kept.length !== local.length) { removed += local.length - kept.length; mem.set("sr_orders", kept); }
      }
      return removed;
    },

    /* ---------- Cart ---------- */
    getCart() { return mem.get("sr_cart", []); },
    addToCart(id, qty) {
      qty = qty || 1;
      const cart = this.getCart();
      const line = cart.find(l => l.id === id);
      if (line) line.qty += qty; else cart.push({ id, qty });
      mem.set("sr_cart", cart);
      return cart;
    },
    setQty(id, qty) {
      let cart = this.getCart();
      if (qty <= 0) cart = cart.filter(l => l.id !== id);
      else { const l = cart.find(x => x.id === id); if (l) l.qty = qty; }
      mem.set("sr_cart", cart);
      return cart;
    },
    removeFromCart(id) { return this.setQty(id, 0); },
    clearCart() { mem.set("sr_cart", []); },
    cartCount() { return this.getCart().reduce((s, l) => s + l.qty, 0); },
    async cartDetails() {
      const cart = this.getCart();
      const products = await this.listProducts();
      const lines = cart.map(l => {
        const p = products.find(x => x.id === l.id);
        return p ? { ...p, qty: l.qty, lineTotal: p.price * l.qty } : null;
      }).filter(Boolean);
      const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
      return { lines, subtotal };
    },

    /* ---------- Coupons apply ---------- */
    async applyCoupon(code, subtotal) {
      const map = await this.getCoupons();
      const c = map[String(code || "").trim().toUpperCase()];
      if (!c) return { ok: false, error: "Invalid coupon code." };
      if (c.proOnly && !this.isPro()) return { ok: false, error: "This code is for Pro members only." };
      const discount = c.type === "percent" ? Math.round(subtotal * c.value / 100) : Math.min(c.value, subtotal);
      return { ok: true, discount, label: c.label };
    },

    /* ---------- Stats ---------- */
    async stats() {
      const [products, orders, sellers, messages] = await Promise.all([
        this.listProducts({ all: true }), this.listOrders(), this.listSellers(), this.listMessages()
      ]);
      const revenue = orders.filter(o => o.status !== "failed" && o.status !== "refunded" && o.status !== "cancelled")
        .reduce((s, o) => s + (o.total || 0), 0);
      return {
        products: products.length,
        pendingProducts: products.filter(p => p.approved === false).length,
        orders: orders.length,
        revenue,
        sellers: sellers.length,
        pendingSellers: sellers.filter(s => s.status !== "active").length,
        messages: messages.length,
        unread: messages.filter(m => !m.read).length,
        customers: new Set(orders.map(o => (o.customer && o.customer.email) || o.id)).size
      };
    }
  };

  window.Store = Store;
})();

/* ======================================================================
   ===== js/main.js (1349 lines) =====
   ====================================================================== */

/* ============================================================
   SR CodeMatrix — App Logic (LIVE READY)
   Settings-aware Razorpay/AdSense, checkout add-ons,
   product approval flow, announcement bar. English only.
   ============================================================ */
(function () {
  "use strict";

  const CFG = window.SR_CONFIG;
  const page = document.body.dataset.page || "home";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const fmt = n => "₹" + Number(n || 0).toLocaleString("en-IN");
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const qs = k => new URLSearchParams(location.search).get(k);

  function toast(msg, type) {
    const root = $("#toast-root");
    const el = document.createElement("div");
    el.className = "toast " + (type || "ok");
    el.innerHTML = `<span class="toast-ic">${type === "err" ? "✕" : type === "warn" ? "⚠" : "✓"}</span><span>${esc(msg)}</span>`;
    root.appendChild(el);
    setTimeout(() => el.classList.add("show"), 10);
    setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 350); }, 3400);
  }

  function modal(html, cls) {
    const root = $("#modal-root");
    root.innerHTML = `<div class="modal-backdrop"><div class="modal ${cls || ""}">${html}</div></div>`;
    root.querySelector(".modal-backdrop").addEventListener("click", e => {
      if (e.target.classList.contains("modal-backdrop") && !root.dataset.locked) closeModal();
    });
    return root.querySelector(".modal");
  }
  function closeModal() { $("#modal-root").innerHTML = ""; delete $("#modal-root").dataset.locked; }

  /* ---------- Icons ---------- */
  const ICONS = {
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke-linecap="round"/></svg>',
    mobile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2" stroke-linecap="round"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 18a4.5 4.5 0 0 1-.7-8.95A6 6 0 0 1 18 10a4 4 0 0 1-.5 8H7z" stroke-linejoin="round"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke-linecap="round"/></svg>',
    cap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 8l10-4 10 4-10 4L2 8z" stroke-linejoin="round"/><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5M22 8v6" stroke-linecap="round"/></svg>',
    brush: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 4l5 5L9 20H4v-5L15 4z" stroke-linejoin="round"/><path d="M13 6l5 5"/></svg>',
    template: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 9h18M9 21V9"/></svg>',
    bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 3v4M8 13h.01M16 13h.01M9 16.5h6" stroke-linecap="round"/></svg>',
    rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 4c3 1 6 4 6 8-2.5 1-4.5 1-7 0l-1 3c-2.5 1-5 1-7.5 0 1-3 3-6.5 7-9l2.5-2z" stroke-linejoin="round"/><circle cx="14.5" cy="9.5" r="1.6"/><path d="M6 16l-2 4M10 17l-1 3" stroke-linecap="round"/></svg>',
    plug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0V8zM12 16v5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    wp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M4 9h16M6.5 9l3 9 2.5-6.5L14.5 18l3-9" stroke-linejoin="round"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13 4l-2 16" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ---------- Header / Footer ---------- */
  function renderHeader() {
    const links = [
      ["index.html", "Home", "home"],
      ["products.html", "Products", "products"],
      ["deals.html", "Deals 🔥", "deals"],
      ["sell.html", "Sell with Us", "sell"],
      ["dashboard.html", "Dashboard", "dashboard"],
      ["about.html", "About", "about"],
      ["contact.html", "Contact", "contact"]
    ];
    let announcement = "";
    try {
      const s = Store._settingsCache;
      if (s && s.announcement) {
        announcement = `<div class="announce"><span>${esc(s.announcement)}</span></div>`;
      }
    } catch (e) {}
    $("#site-header").innerHTML = announcement + `
    <div class="nav-wrap container">
      <a class="brand" href="index.html">
        <span class="brand-mark">SR</span>
        <span class="brand-txt">Code<span>Matrix</span></span>
        ${Store.isPro() ? '<span class="pro-chip" title="Pro Buyer member">PRO</span>' : ""}
      </a>
      <nav class="nav" id="main-nav">
        ${links.map(([h, t, k]) => `<a href="${h}" class="nav-link${page === k ? " active" : ""}">${t}</a>`).join("")}
      </nav>
      <div class="nav-actions">
        <button class="pro-btn hide-sm" id="nav-pro" type="button">Go Pro · ₹${CFG.PRO_PLAN.price}</button>
        <a href="cart.html" class="cart-btn${page === "cart" ? " active" : ""}" aria-label="Cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>
          <span class="cart-count" id="cart-count">0</span>
        </a>
        <a href="login.html" class="btn btn-outline btn-sm nav-login${page === "login" ? " active" : ""}">🔑 Login</a>
        <a href="sell.html" class="btn btn-primary btn-sm hide-sm">Start Selling</a>
        <button class="menu-btn" id="menu-btn" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>`;
    $("#menu-btn").addEventListener("click", () => $("#main-nav").classList.toggle("open"));
    const navPro = $("#nav-pro");
    if (navPro) navPro.addEventListener("click", buyPro);
    updateCartBadge();
  }

  function renderFooter() {
    const tips = (CFG.TIP_AMOUNTS || [20, 50, 100]).map(a =>
      `<button class="tip-btn" data-tip="${a}" type="button">₹${a}</button>`).join("");
    $("#site-footer").innerHTML = `
    <div class="container">
      <div class="foot-shortcut">
        <div class="fs-intro">
          <span class="fs-logo"><span class="brand-mark">SR</span></span>
          <div class="fs-intro-txt">
            <strong>SR CodeMatrix</strong>
            <span>India's developer marketplace — software, services &amp; digital products.</span>
          </div>
          <a class="btn btn-primary btn-sm fs-login" href="login.html">🔑 Login / Sign up</a>
        </div>
        <nav class="fs-links" aria-label="Quick links">
          <a href="index.html" class="fs-item"><span class="fs-ic">🏠</span>Home</a>
          <a href="products.html" class="fs-item"><span class="fs-ic">🛍️</span>Products</a>
          <a href="deals.html" class="fs-item"><span class="fs-ic">🔥</span>Deals</a>
          <a href="sell.html" class="fs-item"><span class="fs-ic">💼</span>Sell</a>
          <a href="dashboard.html" class="fs-item"><span class="fs-ic">📊</span>Dashboard</a>
          <a href="cart.html" class="fs-item"><span class="fs-ic">🛒</span>Cart</a>
          <a href="about.html" class="fs-item"><span class="fs-ic">ℹ️</span>About</a>
          <a href="contact.html" class="fs-item"><span class="fs-ic">✉️</span>Contact</a>
        </nav>
      </div>
      <div class="foot-grid">
        <div class="foot-brand">
          <a class="brand" href="index.html"><span class="brand-mark">SR</span><span class="brand-txt">Code<span>Matrix</span></span></a>
          <p>${esc(CFG.TAGLINE)}</p>
          <div class="pay-badges">
            <span class="pay-badge">💳 Razorpay</span>
            <span class="pay-badge">UPI</span>
            <span class="pay-badge">Net Banking</span>
            <span class="pay-badge">Cards</span>
          </div>
          <div class="tip-jar">
            <span class="tip-label">❤️ Support us — leave a tip</span>
            <div class="tip-row">${tips}</div>
          </div>
        </div>
        <div class="foot-col">
          <h4>Marketplace</h4>
          <a href="products.html">All Products</a>
          <a href="deals.html">Affiliate Deals</a>
          <a href="products.html?cat=Software">Software</a>
          <a href="products.html?cat=Services">Services</a>
          <a href="products.html?cat=Courses">Courses</a>
        </div>
        <div class="foot-col">
          <h4>Company</h4>
          <a href="about.html">About Us</a>
          <a href="sell.html">Sell with Us</a>
          <a href="dashboard.html">Seller Dashboard</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="foot-col">
          <h4>Support</h4>
          <a href="contact.html">Help Center</a>
          <a href="mailto:${CFG.SUPPORT_EMAIL}">${CFG.SUPPORT_EMAIL}</a>
          <a href="tel:${CFG.SUPPORT_PHONE.replace(/\s/g, "")}">${CFG.SUPPORT_PHONE}</a>
          <p class="foot-addr">${esc(CFG.ADDRESS)}</p>
          <div class="foot-social">
            <a href="#" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 3h3l-7.5 8.6L22 21h-6.8l-5-6.5L4.5 21H2l8-9.2L2.3 3H9l4.5 6L18 3z"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 3.5A1.5 1.5 0 1 1 5 6.5 1.5 1.5 0 0 1 5 3.5zM3.5 8.5h3V21h-3V8.5zM9.5 8.5h2.9v1.7h.1c.4-.8 1.5-1.9 3.4-1.9 3.6 0 4.3 2.3 4.3 5.4V21h-3v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21h-3V8.5z"/></svg></a>
            <a href="#" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg></a>
          </div>
        </div>
      </div>
      <div class="foot-legal-bar">
        <nav class="foot-legal" aria-label="Legal">
          <a href="terms.html">Terms of Service</a>
          <a href="privacy.html">Privacy Policy</a>
          <a href="refund.html">Refund Policy</a>
          <a href="shipping.html">Shipping Policy</a>
        </nav>
        <a class="foot-admin" href="admin.html">Admin Panel</a>
      </div>
      <div class="foot-bottom">
        <span>© ${new Date().getFullYear()} ${esc(CFG.BRAND)}. All rights reserved.</span>
        <span>GST registered · Payments secured by Razorpay</span>
      </div>
    </div>
    <div class="foot-endbar">
      <div class="container foot-endbar-in">
        <span class="feb-left">🇮🇳 Made in India · English · ₹ INR</span>
        <nav class="feb-links" aria-label="Quick">
          <a href="login.html">Login</a>
          <a href="sell.html">Sell</a>
          <a href="dashboard.html">Dashboard</a>
          <a href="admin.html">Admin</a>
          <a href="contact.html">Help</a>
        </nav>
        <button class="feb-top" id="feb-top" type="button" aria-label="Back to top">↑ Top</button>
      </div>
    </div>`;

    $$(".tip-btn", $("#site-footer")).forEach(b => {
      b.addEventListener("click", () => tipJar(Number(b.dataset.tip)));
    });
    const febTop = $("#feb-top");
    if (febTop) febTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function updateCartBadge() {
    const c = Store.cartCount();
    const el = $("#cart-count");
    if (el) { el.textContent = c; el.style.display = c ? "grid" : "none"; }
  }

  /* ---------- Product Cards ---------- */
  function stars(r) {
    const full = Math.floor(r || 0);
    let s = "";
    for (let i = 0; i < 5; i++) s += `<span class="star${i < full ? "" : " dim"}">★</span>`;
    return s;
  }

  function productVisual(p, big) {
    return `<div class="p-visual${big ? " big" : ""}" style="--g1:${esc(p.c1 || "#6366f1")};--g2:${esc(p.c2 || "#22d3ee")}">
      ${ICONS[p.icon] || ICONS.code}
      ${p.badge ? `<span class="p-badge">${esc(p.badge)}</span>` : ""}
      <span class="p-cat-tag">${esc(p.category)}</span>
    </div>`;
  }

  function productCard(p) {
    const off = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;
    return `<article class="product-card" data-id="${p.id}">
      <a href="product.html?id=${encodeURIComponent(p.id)}" class="p-link">
        ${productVisual(p)}
        <div class="p-body">
          <div class="p-meta"><span class="p-seller">${esc(p.seller)}</span><span class="p-sales">${p.featured ? "⭐ Featured" : (p.sales ? Number(p.sales).toLocaleString("en-IN") + " sold" : "New listing")}</span></div>
          <h3 class="p-title">${esc(p.title)}</h3>
          <div class="p-rating">${stars(p.rating)}<span>${Number(p.rating || 0).toFixed(1)}</span></div>
          <div class="p-price-row">
            <span class="p-price">${fmt(p.price)}</span>
            ${p.mrp > p.price ? `<span class="p-mrp">${fmt(p.mrp)}</span><span class="p-off">${off}% off</span>` : ""}
          </div>
        </div>
      </a>
      <div class="p-actions">
        <button class="btn btn-outline btn-sm add-cart" data-id="${p.id}">Add to Cart</button>
        <button class="btn btn-primary btn-sm buy-now" data-id="${p.id}">Buy Now</button>
      </div>
    </article>`;
  }

  document.addEventListener("click", async e => {
    const add = e.target.closest(".add-cart");
    if (add) {
      Store.addToCart(add.dataset.id, 1);
      updateCartBadge();
      toast("Added to cart ✓");
      add.textContent = "Added ✓";
      setTimeout(() => (add.textContent = "Add to Cart"), 1400);
      return;
    }
    const buy = e.target.closest(".buy-now");
    if (buy) {
      const p = await Store.getProduct(buy.dataset.id);
      if (p) startCheckout([{ ...p, qty: 1, lineTotal: p.price }], p.price, {});
    }
    const tip = e.target.closest("[data-tip]");
    if (tip && !tip.classList.contains("tip-btn")) tipJar(Number(tip.dataset.tip));
    const proBtn = e.target.closest("[data-buy-pro]");
    if (proBtn) buyPro();
    const promo = e.target.closest("[data-promote]");
    if (promo) promoteProduct();
  });

  /* ---------- Ads (settings-aware) ---------- */
  function houseAdHTML() {
    return `<div class="house-ad">
      <div class="ha-ic">⚡</div>
      <div class="ha-txt"><strong>Sell your products on SR CodeMatrix</strong><span>Seller Growth plan from just ₹499/month</span></div>
      <a class="btn btn-accent btn-sm" href="sell.html">Start Selling</a>
    </div>`;
  }

  function initAds(client) {
    const real = client && !/0{10,}/.test(String(client).replace("ca-pub-", ""));
    $$(".ad-slot").forEach(slot => {
      const format = slot.dataset.format || "auto";
      const slotId = slot.dataset.slot || CFG.ADSENSE_SLOTS.in_feed;
      if (real) {
        try {
          slot.innerHTML = `<span class="ad-label">Advertisement</span><ins class="adsbygoogle" style="display:block" data-ad-client="${client}" data-ad-slot="${slotId}" data-ad-format="${format}" data-full-width-responsive="true"></ins>`;
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          return;
        } catch (e) {}
      }
      slot.innerHTML = `<span class="ad-label">Sponsored</span>` + houseAdHTML();
    });
    if (real) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + client;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    }
    initStickyAd(real, client);
  }

  function initStickyAd(real, client) {
    if (sessionStorage.getItem("sr_sticky_closed")) return;
    const bar = document.createElement("div");
    bar.className = "sticky-ad";
    let inner = `<span class="ad-label">Advertisement</span>`;
    if (real) {
      inner += `<ins class="adsbygoogle" style="display:block;height:60px" data-ad-client="${client}" data-ad-slot="${CFG.ADSENSE_SLOTS.sticky}" data-ad-format="horizontal"></ins>`;
    } else {
      inner += `<div class="house-ad compact">
        <div class="ha-ic">🔥</div>
        <div class="ha-txt"><strong>Deals up to 70% off</strong><span>Curated tech deals — updated daily</span></div>
        <a class="btn btn-accent btn-sm" href="deals.html">View Deals</a>
      </div>`;
    }
    bar.innerHTML = inner + `<button class="sticky-x" type="button" aria-label="Close ad">×</button>`;
    document.body.appendChild(bar);
    document.body.classList.add("has-sticky-ad");
    if (real) { try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {} }
    bar.querySelector(".sticky-x").addEventListener("click", () => {
      bar.remove();
      document.body.classList.remove("has-sticky-ad");
      sessionStorage.setItem("sr_sticky_closed", "1");
    });
  }

  /* ---------- Razorpay ---------- */
  function loadRazorpay() {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => reject(new Error("Razorpay script blocked"));
      document.head.appendChild(s);
      setTimeout(() => reject(new Error("Razorpay timeout")), 8000);
    });
  }

  async function payNow({ amount, title, description, notes, onSuccess }) {
    const user = Store.currentUser();
    const key = await Store.getRazorpayKey(); // admin-managed key
    loadRazorpay().then(() => {
      const rzp = new window.Razorpay({
        key,
        amount: Math.round(amount * 100),
        currency: CFG.RAZORPAY_CURRENCY,
        name: CFG.BRAND,
        description: description || title,
        prefill: user ? { name: user.name, email: user.email } : {},
        notes: notes || {},
        theme: { color: "#6366f1" },
        handler: resp => onSuccess && onSuccess(resp.razorpay_payment_id, false),
        modal: { ondismiss: () => toast("Payment cancelled.", "warn") }
      });
      rzp.on("payment.failed", r => toast("Payment failed: " + ((r.error && r.error.description) || "try again"), "err"));
      rzp.open();
    }).catch(() => {
      toast("Payment gateway offline — demo completion only.", "warn");
      setTimeout(() => onSuccess && onSuccess("pay_DEMO" + Math.random().toString(36).slice(2, 10).toUpperCase(), true), 900);
    });
  }

  /* ---------- Income: Tip Jar ---------- */
  function tipJar(amount) {
    if (!amount || amount < 1) return;
    modal(`
      <button class="modal-x" onclick="closeModal()">&times;</button>
      <div class="success-box" style="text-align:left">
        <div class="tip-hero">☕</div>
        <h3 style="text-align:center">Support ${esc(CFG.BRAND_SHORT)}</h3>
        <p class="succ-note" style="text-align:center">A ₹${amount} tip keeps this marketplace independent. Thank you!</p>
        <button class="btn btn-primary btn-lg btn-block" id="tip-pay">Pay ₹${amount} via Razorpay</button>
      </div>`, "modal-sm");
    $("#tip-pay").addEventListener("click", () => {
      payNow({
        amount, title: "Tip", description: `Tip of ₹${amount} — thank you!`,
        notes: { type: "tip" },
        onSuccess: (pid, demo) => {
          closeModal();
          modal(`<div class="success-box">
            <div class="success-ring">❤</div>
            <h3>Thank you!</h3>
            <p class="succ-note">Your ₹${amount} tip was received${demo ? " (offline mode)" : ""}.<br>Payment ID: <span class="mono">${esc(pid)}</span></p>
            <button class="btn btn-primary" onclick="closeModal()">Done</button>
          </div>`, "modal-sm");
        }
      });
    });
  }

  /* ---------- Income: Pro Membership ---------- */
  function buyPro() {
    if (Store.isPro()) { toast("You already have Pro membership."); return; }
    const pro = CFG.PRO_PLAN;
    modal(`
      <button class="modal-x" onclick="closeModal()">&times;</button>
      <div class="pro-modal">
        <span class="pro-ribbon">PRO MEMBERSHIP</span>
        <h3>Go Pro — ₹${pro.price}/month</h3>
        <p class="succ-note">Unlock member-only savings across the marketplace.</p>
        <ul class="pro-perks">
          <li>✓ Extra 10% off with code <strong>PRO10</strong> on every order</li>
          <li>✓ Early access to new product launches</li>
          <li>✓ Exclusive member deals &amp; coupons</li>
          <li>✓ Priority support queue</li>
        </ul>
        <button class="btn btn-primary btn-lg btn-block" id="pro-pay">Join Pro — ₹${pro.price}/mo</button>
        <p class="ck-note">Billed via Razorpay.</p>
      </div>`);
    $("#pro-pay").addEventListener("click", () => {
      payNow({
        amount: pro.price, title: "Pro", description: "Pro Buyer Membership (Monthly)",
        notes: { type: "membership", plan: "pro_buyer" },
        onSuccess: (pid, demo) => {
          Store.setPro(true);
          closeModal();
          renderHeader();
          modal(`<div class="success-box">
            <div class="success-ring">★</div>
            <h3>You're Pro now!</h3>
            <p class="succ-note">Use code <strong>PRO10</strong> at checkout for an extra 10% off.<br>Payment ID: <span class="mono">${esc(pid)}</span>${demo ? " (offline)" : ""}</p>
            <div class="succ-actions">
              <a href="products.html" class="btn btn-primary">Start Shopping</a>
              <button class="btn btn-outline" onclick="closeModal()">Close</button>
            </div>
          </div>`, "modal-sm");
        }
      });
    });
  }

  /* ---------- Income: Featured Promotion ---------- */
  function promoteProduct() {
    const price = CFG.PROMO_PRICE;
    modal(`
      <button class="modal-x" onclick="closeModal()">&times;</button>
      <div class="pro-modal">
        <h3>🚀 Featured Placement</h3>
        <p class="succ-note">Boost your listing for 30 days — homepage featured grid + top of category results.</p>
        <ul class="pro-perks">
          <li>✓ 30 days featured homepage slot</li>
          <li>✓ Priority rank in category search</li>
          <li>✓ "Featured" badge on your card</li>
          <li>✓ Weekly performance report</li>
        </ul>
        <div class="ck-line total"><span>One-time price</span><span>${fmt(price)}</span></div>
        <button class="btn btn-primary btn-lg btn-block" id="promo-pay">Buy Promotion — ${fmt(price)}</button>
      </div>`);
    $("#promo-pay").addEventListener("click", () => {
      payNow({
        amount: price, title: "Promo", description: "Featured Product Placement (30 days)",
        notes: { type: "promotion" },
        onSuccess: (pid, demo) => {
          closeModal();
          modal(`<div class="success-box">
            <div class="success-ring">✓</div>
            <h3>Promotion Activated!</h3>
            <p class="succ-note">Your featured slot is active for 30 days.<br>Payment ID: <span class="mono">${esc(pid)}</span>${demo ? " (offline)" : ""}</p>
            <div class="succ-actions">
              <a href="dashboard.html" class="btn btn-primary">Go to Dashboard</a>
              <button class="btn btn-outline" onclick="closeModal()">Close</button>
            </div>
          </div>`, "modal-sm");
        }
      });
    });
  }

  /* ---------- Checkout with add-on upsells (income) ---------- */
  let couponState = { code: null, discount: 0, label: "" };

  /* Indian states with GST state codes */
  const STATES = [
    ["01","Jammu & Kashmir"],["02","Himachal Pradesh"],["03","Punjab"],["04","Chandigarh"],
    ["05","Uttarakhand"],["06","Haryana"],["07","Delhi"],["08","Rajasthan"],["09","Uttar Pradesh"],
    ["10","Bihar"],["11","Sikkim"],["12","Arunachal Pradesh"],["13","Nagaland"],["14","Manipur"],
    ["15","Mizoram"],["16","Tripura"],["17","Meghalaya"],["18","Assam"],["19","West Bengal"],
    ["20","Jharkhand"],["21","Odisha"],["22","Chhattisgarh"],["23","Madhya Pradesh"],["24","Gujarat"],
    ["26","Dadra & Nagar Haveli and Daman & Diu"],["27","Maharashtra"],["29","Karnataka"],["30","Goa"],
    ["31","Lakshadweep"],["32","Kerala"],["33","Tamil Nadu"],["34","Puducherry"],
    ["35","Andaman & Nicobar Islands"],["36","Telangana"],["37","Andhra Pradesh"],["38","Ladakh"],
    ["97","Other Territory"]
  ];

  async function startCheckout(lines, subtotal, customer) {
    if (!lines.length) { toast("Your cart is empty.", "warn"); return; }
    const user = Store.currentUser();
    const cus = {
      name: customer.name || (user && user.name) || "",
      email: customer.email || (user && user.email) || "",
      phone: customer.phone || ""
    };
    const addons = CFG.CHECKOUT_ADDONS || [];
    const discount = couponState.discount || 0;
    const base = Math.max(0, subtotal - discount);
    const taxCfg = await Store.taxConfig();
    const stateOptions = STATES.map(([code, name]) =>
      `<option value="${code}"${code === taxCfg.state_code ? " selected" : ""}>${name} (${code})</option>`).join("");

    modal(`
      <button class="modal-x" onclick="closeModal()">&times;</button>
      <div class="checkout-box">
        <div class="ck-head"><span class="ck-ic">🔐</span><div><h3>Secure Checkout</h3><p>${esc(CFG.BRAND)} · Razorpay · GST Invoice included</p></div></div>
        <div class="ck-lines">${lines.map(l => `<div class="ck-line"><span>${esc(l.title)} × ${l.qty}</span><span>${fmt(l.lineTotal)}</span></div>`).join("")}
          ${discount ? `<div class="ck-line disc"><span>Coupon ${esc(couponState.label)}</span><span>−${fmt(discount)}</span></div>` : ""}
          <div id="addon-lines"></div>
          <div class="ck-line" id="gst-line"><span>GST (inclusive)</span><span id="gst-amt">—</span></div>
          <div class="ck-line total"><span>Total Payable</span><span id="ck-total">${fmt(base)}</span></div>
        </div>
        ${addons.length ? `
        <div class="addons-box">
          <div class="addons-title">Add-ons (optional)</div>
          ${addons.map(a => `
            <label class="addon-row">
              <input type="checkbox" data-addon="${esc(a.id)}" data-price="${a.price}" data-label="${esc(a.label)}">
              <span class="addon-label">${esc(a.label)}</span>
              <span class="addon-price">+${fmt(a.price)}</span>
            </label>`).join("")}
        </div>` : ""}
        <form id="ck-form" class="form">
          <div class="form-grid">
            <label class="field"><span>Full Name *</span><input name="name" required value="${esc(cus.name)}" maxlength="80" placeholder="Your full name"></label>
            <label class="field"><span>Email *</span><input name="email" type="email" required value="${esc(cus.email)}" maxlength="120" placeholder="you@email.com"></label>
            <label class="field"><span>Phone *</span><input name="phone" required value="${esc(cus.phone)}" maxlength="15" placeholder="+91 98xxxxxx" pattern="[+0-9\\s-]{8,15}"></label>
            <label class="field"><span>State / UT * (for GST)</span>
              <select name="state" required>${stateOptions}</select>
            </label>
            <label class="field span-2"><span>Buyer GSTIN (optional — for B2B invoice)</span>
              <input name="gstin" maxlength="15" placeholder="15-character GSTIN" style="text-transform:uppercase">
            </label>
          </div>
          <button class="btn btn-primary btn-lg btn-block" type="submit" id="ck-pay-btn">Pay ${fmt(base)} via Razorpay</button>
          <p class="ck-note">Secured by Razorpay. Prices are inclusive of GST. Tax invoice issued instantly.</p>
        </form>
      </div>`);

    let chosen = [];
    const updateTaxLine = (buyerCode) => {
      Store.computeTax(base, buyerCode).then(tx => {
        const el = $("#gst-amt");
        if (el) el.textContent = `included in price · ${tx.rate}% ${tx.intra ? "(CGST+SGST)" : "(IGST)"} = ${fmt(tx.cgst + tx.sgst + tx.igst)}`;
      });
    };
    updateTaxLine(taxCfg.state_code);
    const stateSel = $('#ck-form select[name="state"]');
    if (stateSel) stateSel.addEventListener("change", () => updateTaxLine(stateSel.value));

    const recalc = () => {
      chosen = $$(".addons-box input:checked").map(i => ({
        id: i.dataset.addon, label: i.dataset.label, price: Number(i.dataset.price)
      }));
      const extra = chosen.reduce((s, a) => s + a.price, 0);
      const total = base + extra;
      $("#ck-total").textContent = fmt(total);
      $("#addon-lines").innerHTML = chosen.map(a =>
        `<div class="ck-line disc"><span>Add-on: ${esc(a.label.slice(0, 40))}</span><span>+${fmt(a.price)}</span></div>`).join("");
      $("#ck-pay-btn").textContent = `Pay ${fmt(total)} via Razorpay`;
      if (stateSel) updateTaxLine(stateSel.value);
      return total;
    };
    $$(".addons-box input").forEach(i => i.addEventListener("change", recalc));

    $("#ck-form").addEventListener("submit", async ev => {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      const buyerState = String(fd.get("state") || taxCfg.state_code);
      const buyerGstin = String(fd.get("gstin") || "").trim().toUpperCase();
      if (buyerGstin && !/^[0-9A-Z]{15}$/.test(buyerGstin)) {
        toast("GSTIN must be exactly 15 characters.", "err");
        return;
      }
      const total = recalc();
      const customer2 = {
        name: String(fd.get("name") || "").slice(0, 80),
        email: String(fd.get("email") || "").slice(0, 120),
        phone: String(fd.get("phone") || "").slice(0, 20),
        state: buyerState,
        state_name: (STATES.find(s => s[0] === buyerState) || [, ""])[1],
        gstin: buyerGstin
      };
      const tax = await Store.computeTax(total, buyerState);
      const btn = $("#ck-pay-btn");
      btn.disabled = true;
      btn.textContent = "Opening Razorpay…";

      const order = {
        id: "SR" + Date.now().toString().slice(-8),
        items: lines.map(l => ({ id: l.id, title: l.title, price: l.price, qty: l.qty, seller: l.seller })),
        addons: chosen,
        subtotal, discount, coupon: couponState.code || null, total,
        tax, buyer: customer2,
        invoice_no: Store.invoiceNo("SR" + Date.now().toString().slice(-8)),
        customer: { name: customer2.name, email: customer2.email, phone: customer2.phone, state: buyerState, gstin: buyerGstin },
        status: "paid", date: Date.now()
      };

      const finish = async (paymentId, demo) => {
        order.paymentId = paymentId;
        if (demo) order.offline = true;
        await Store.saveOrder(order);
        Store.clearCart();
        couponState = { code: null, discount: 0, label: "" };
        updateCartBadge();
        showSuccess(order);
      };

      try {
        const key = await Store.getRazorpayKey();
        await loadRazorpay();
        const rzp = new window.Razorpay({
          key,
          amount: Math.round(total * 100),
          currency: CFG.RAZORPAY_CURRENCY,
          name: CFG.BRAND,
          description: order.items.length === 1 ? order.items[0].title : `${order.items.length} items order`,
          prefill: { name: customer2.name, email: customer2.email, contact: customer2.phone },
          notes: { order_id: order.id, source: "srcodematrix_web" },
          theme: { color: "#6366f1" },
          modal: { ondismiss: () => { btn.disabled = false; recalc(); toast("Payment cancelled.", "warn"); } },
          handler: resp => finish(resp.razorpay_payment_id, false)
        });
        rzp.on("payment.failed", r => {
          toast("Payment failed: " + ((r.error && r.error.description) || "try again"), "err");
          btn.disabled = false;
          recalc();
        });
        rzp.open();
      } catch (err) {
        btn.textContent = "Processing offline completion…";
        setTimeout(() => finish("pay_OFFLINE" + Math.random().toString(36).slice(2, 10).toUpperCase(), true), 1100);
      }
    });
  }

  function showSuccess(order) {
    try { sessionStorage.setItem("sr_inv_" + order.id, JSON.stringify(order)); } catch (e) {}
    $("#modal-root").dataset.locked = "1";
    modal(`
      <div class="success-box">
        <div class="success-ring">✓</div>
        <h3>Payment Successful!</h3>
        <p class="succ-order">Order <strong>${esc(order.id)}</strong></p>
        <div class="ck-lines">
          <div class="ck-line"><span>Amount Paid</span><span>${fmt(order.total)}</span></div>
          ${order.tax && order.tax.rate ? `<div class="ck-line"><span>Includes GST @ ${order.tax.rate}%</span><span>${fmt((order.tax.cgst || 0) + (order.tax.sgst || 0) + (order.tax.igst || 0))}</span></div>` : ""}
          <div class="ck-line"><span>Payment ID</span><span class="mono">${esc(order.paymentId)}</span></div>
        </div>
        <p class="succ-note">A GST tax invoice is attached to your email. You can also view or print it now.</p>
        <div class="succ-actions">
          <button class="btn btn-accent" onclick="srOpenInvoice('${esc(order.id)}')">🧾 View GST Bill</button>
          <a href="products.html" class="btn btn-outline">Continue Shopping</a>
          <button class="btn btn-primary" onclick="closeModal()">Done</button>
        </div>
      </div>`, "modal-sm");
  }

  /** Snapshot order → open printable GST invoice */
  window.srOpenInvoice = function (orderId, orderSnapshot) {
    try {
      if (orderSnapshot) sessionStorage.setItem("sr_inv_" + orderId, JSON.stringify(orderSnapshot));
      else {
        Store.getOrder(orderId).then(o => {
          if (o) sessionStorage.setItem("sr_inv_" + orderId, JSON.stringify(o));
        });
      }
    } catch (e) {}
    window.open("invoice.html?id=" + encodeURIComponent(orderId), "_blank", "noopener");
  };

  window.closeModal = closeModal;
  window.toast = toast;
  window.startCheckout = startCheckout;
  window.srFmt = fmt;
  window.srEsc = esc;
  window.srCard = productCard;
  window.srVisual = productVisual;
  window.srStars = stars;
  window.srIcon = k => ICONS[k] || ICONS.code;
  window.srUpdateCart = updateCartBadge;
  window.srApplyCoupon = c => { couponState = c; };

  /* ============================================================
     PAGE: HOME
     ============================================================ */
  async function initHome() {
    const products = await Store.listProducts();
    const featured = [...products]
      .sort((a, b) => (Number(b.featured) - Number(a.featured)) || ((b.sales || 0) - (a.sales || 0)))
      .slice(0, 8);
    const grid = $("#featured-grid");
    if (grid) {
      grid.innerHTML = featured.length
        ? featured.map(productCard).join("")
        : `<div class="empty-state"><span>🏪</span><h3>The marketplace is live — waiting for its first listings</h3><p>New products are added by verified sellers every week.</p><a class="btn btn-primary" href="sell.html">Become the First Seller</a></div>`;
    }

    const cats = {};
    products.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
    const catIcons = { Software: "code", Services: "plug", Courses: "cap", Templates: "template", Design: "brush", Marketing: "rocket", Hosting: "cloud" };
    const catGrid = $("#cat-grid");
    if (catGrid) {
      catGrid.innerHTML = Object.keys(cats).length
        ? Object.keys(cats).map(c => `
        <a class="cat-card" href="products.html?cat=${encodeURIComponent(c)}">
          <span class="cat-ic">${ICONS[catIcons[c]] || ICONS.code}</span>
          <strong>${esc(c)}</strong>
          <span>${cats[c]} product${cats[c] > 1 ? "s" : ""}</span>
        </a>`).join("")
        : `<div class="empty-state" style="grid-column:1/-1"><span>📦</span><h3>Categories coming soon</h3><p>Products are being listed right now.</p></div>`;
    }

    const dealGrid = $("#deals-teaser");
    if (dealGrid) dealGrid.innerHTML = Store.deals.slice(0, 4).map(dealCard).join("");
  }

  /* ============================================================
     PAGE: DEALS
     ============================================================ */
  function dealUrl(d) {
    const A = CFG.AFFILIATE || {};
    if (d.kind === "flipkart") {
      return `https://www.flipkart.com/search?q=${encodeURIComponent(d.q)}&affid=${encodeURIComponent(A.flipkartId || "")}`;
    }
    return `https://www.amazon.in/s?k=${encodeURIComponent(d.q)}&tag=${encodeURIComponent(A.amazonTag || "")}`;
  }

  function dealCard(d) {
    return `<article class="product-card deal-card">
      <a href="${esc(dealUrl(d))}" target="_blank" rel="sponsored nofollow noopener" class="p-link">
        <div class="p-visual" style="--g1:${esc(d.c1)};--g2:${esc(d.c2)}">
          ${ICONS[d.icon] || ICONS.code}
          <span class="p-badge">${esc(d.off)}</span>
          <span class="p-cat-tag">${esc(d.store)}</span>
        </div>
        <div class="p-body">
          <div class="p-meta"><span class="p-seller">${esc(d.cat)}</span><span class="p-sales">Affiliate deal</span></div>
          <h3 class="p-title">${esc(d.title)}</h3>
          <p class="deal-note">${esc(d.note)}</p>
          <div class="deal-cta">View on ${esc(d.store)} →</div>
        </div>
      </a>
    </article>`;
  }

  async function initDeals() {
    const grid = $("#deals-grid");
    if (grid) grid.innerHTML = Store.deals.map(dealCard).join("");
  }

  /* ============================================================
     PAGE: PRODUCTS
     ============================================================ */
  async function initProducts() {
    const products = await Store.listProducts();
    let state = { cat: qs("cat") || "All", q: "", sort: "popular" };

    const cats = ["All", ...new Set(products.map(p => p.category))];
    $("#chip-row").innerHTML = cats.map(c => `<button class="chip${c === state.cat ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");

    function apply() {
      let list = products.filter(p =>
        (state.cat === "All" || p.category === state.cat) &&
        (!state.q || (p.title + " " + p.desc + " " + p.category).toLowerCase().includes(state.q))
      );
      if (state.sort === "price-low") list.sort((a, b) => a.price - b.price);
      else if (state.sort === "price-high") list.sort((a, b) => b.price - a.price);
      else if (state.sort === "rating") list.sort((a, b) => b.rating - a.rating);
      else list.sort((a, b) => (Number(b.featured) - Number(a.featured)) || ((b.sales || 0) - (a.sales || 0)));
      $("#results-count").textContent = list.length + " product" + (list.length === 1 ? "" : "s");
      $("#products-grid").innerHTML = list.length
        ? list.map(productCard).join("")
        : `<div class="empty-state"><span>🔍</span><h3>${products.length ? "No results found" : "No products listed yet"}</h3><p>${products.length ? "Try different filters or search terms." : "The store just went live — check back soon, or become our first seller."}</p><a class="btn btn-primary" href="sell.html">Sell on SR CodeMatrix</a></div>`;
    }
    apply();

    $("#chip-row").addEventListener("click", e => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      $$(".chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.cat = chip.dataset.cat;
      apply();
    });
    $("#search-input").addEventListener("input", e => { state.q = e.target.value.trim().toLowerCase(); apply(); });
    $("#sort-select").addEventListener("change", e => { state.sort = e.target.value; apply(); });

    const proBar = $("#pro-strip");
    if (proBar) {
      if (Store.isPro()) proBar.innerHTML = `<span class="pro-chip">PRO</span> You're a Pro member — use <strong>PRO10</strong> at checkout for an extra 10% off.`;
      else proBar.innerHTML = `💡 <button class="link-btn" data-buy-pro type="button"><strong>Go Pro for ₹${CFG.PRO_PLAN.price}/mo</strong></button> — unlock code <strong>PRO10</strong> (extra 10% off).`;
    }
  }

  /* ============================================================
     PAGE: PRODUCT DETAIL
     ============================================================ */
  async function initProduct() {
    const id = qs("id");
    const p = await Store.getProduct(id);
    const root = $("#product-root");
    if (!p) {
      root.innerHTML = `<div class="empty-state"><span>😕</span><h3>Product not found</h3><a class="btn btn-primary" href="products.html">Browse Products</a></div>`;
      return;
    }
    document.title = p.title + " — " + CFG.BRAND;
    const off = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;

    root.innerHTML = `
      <div class="pd-left">${productVisual(p, true)}
        <div class="pd-trust">
          <span>✓ 100% Secure Payment</span><span>✓ Instant Delivery</span><span>✓ 7-Day Refund*</span><span>✓ GST Invoice</span>
        </div>
      </div>
      <div class="pd-right">
        <div class="pd-tags"><span class="tag">${esc(p.category)}</span>${p.badge ? `<span class="tag tag-hot">${esc(p.badge)}</span>` : ""}</div>
        <h1>${esc(p.title)}</h1>
        <div class="pd-rating">${stars(p.rating)} <strong>${Number(p.rating || 0).toFixed(1)}</strong> · ${Number(p.sales || 0).toLocaleString("en-IN")} sales · Sold by <strong>${esc(p.seller)}</strong></div>
        <div class="pd-price"><span class="pd-amt">${fmt(p.price)}</span>${p.mrp > p.price ? `<span class="p-mrp">${fmt(p.mrp)}</span><span class="p-off">${off}% off</span>` : ""}<span class="pd-tax">incl. all taxes</span></div>
        <p class="pd-desc">${esc(p.desc)}</p>
        <ul class="pd-feats">${(p.features || []).map(f => `<li>✓ ${esc(f)}</li>`).join("")}</ul>
        ${Store.isPro() ? `<div class="pro-strip">⭐ Pro member — apply code <strong>PRO10</strong> at checkout for extra 10% off.</div>` : ""}
        <div class="pd-buy">
          <div class="qty-box">
            <button id="q-minus">−</button><span id="q-val">1</span><button id="q-plus">+</button>
          </div>
          <button class="btn btn-outline btn-lg" id="pd-cart">Add to Cart</button>
          <button class="btn btn-primary btn-lg" id="pd-buy">Buy Now — ${fmt(p.price)}</button>
        </div>
        <div class="pd-pay-icons">💳 RuPay/Visa/Master · 📱 UPI/GPay/PhonePe · 🏦 Net Banking · EMI available</div>
      </div>`;

    initReviews(p);

    let qty = 1;
    $("#q-minus").onclick = () => { qty = Math.max(1, qty - 1); $("#q-val").textContent = qty; };
    $("#q-plus").onclick = () => { qty = Math.min(99, qty + 1); $("#q-val").textContent = qty; };
    $("#pd-cart").onclick = () => { Store.addToCart(p.id, qty); updateCartBadge(); toast(`${qty} item(s) added to cart ✓`); };
    $("#pd-buy").onclick = () => startCheckout([{ ...p, qty, lineTotal: p.price * qty }], p.price * qty, {});

    const rel = (await Store.listProducts()).filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
    const relGrid = $("#related-grid");
    if (relGrid) relGrid.innerHTML = rel.length ? rel.map(productCard).join("") : "";
  }

  /* ============================================================
     PAGE: CART
     ============================================================ */
  async function initCart() {
    async function render() {
      const { lines, subtotal } = await Store.cartDetails();
      const wrap = $("#cart-content");
      if (!lines.length) {
        wrap.innerHTML = `<div class="empty-state"><span>🛒</span><h3>Your cart is empty</h3><p>Explore the marketplace and add products.</p><a class="btn btn-primary" href="products.html">Browse Products</a></div>`;
        return;
      }
      const discount = couponState.discount || 0;
      const total = Math.max(0, subtotal - discount);
      const proTip = Store.isPro()
        ? `<div class="pro-strip" style="margin-bottom:12px">⭐ Pro member — apply code <strong>PRO10</strong> for extra 10% off.</div>`
        : `<div class="pro-strip" style="margin-bottom:12px">💡 Not Pro yet? <button class="link-btn" data-buy-pro type="button"><strong>Go Pro (₹${CFG.PRO_PLAN.price}/mo)</strong></button> → save with PRO10.</div>`;
      wrap.innerHTML = `
        ${proTip}
        <div class="cart-layout">
          <div class="cart-lines card">
            ${lines.map(l => `
              <div class="cart-line" data-id="${l.id}">
                <a href="product.html?id=${l.id}" class="cl-thumb">${productVisual(l)}</a>
                <div class="cl-info">
                  <a href="product.html?id=${l.id}"><strong>${esc(l.title)}</strong></a>
                  <span class="cl-seller">${esc(l.seller)} · ${esc(l.category)}</span>
                  <div class="cl-price">${fmt(l.price)} <span class="cl-line-total">= ${fmt(l.lineTotal)}</span></div>
                </div>
                <div class="cl-right">
                  <div class="qty-box sm">
                    <button data-act="dec">−</button><span>${l.qty}</span><button data-act="inc">+</button>
                  </div>
                  <button class="cl-rm" data-act="rm" title="Remove">🗑</button>
                </div>
              </div>`).join("")}
          </div>
          <aside class="card price-card">
            <h3>Price Details</h3>
            <div class="ck-line"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
            <div class="ck-line"><span>Platform fee</span><span class="ok-txt">FREE</span></div>
            ${discount ? `<div class="ck-line disc"><span>Coupon ${esc(couponState.label)}</span><span>−${fmt(discount)}</span></div>` : ""}
            <div class="ck-line total"><span>Total</span><span>${fmt(total)}</span></div>
            <div class="coupon-row">
              <input id="coupon-input" placeholder="Coupon code (try SR10)" value="${couponState.code || ""}">
              <button class="btn btn-outline btn-sm" id="coupon-btn">Apply</button>
            </div>
            <button class="btn btn-primary btn-lg btn-block" id="pay-btn">Pay ${fmt(total)} Securely</button>
            <div class="pay-mini"> Razorpay · UPI · Cards · Netbanking · Add-ons at next step</div>
          </aside>
        </div>`;

      wrap.querySelectorAll(".cart-line").forEach(row => {
        const id = row.dataset.id;
        const line = lines.find(l => l.id === id);
        row.querySelector('[data-act="dec"]').onclick = () => { Store.setQty(id, line.qty - 1); updateCartBadge(); render(); };
        row.querySelector('[data-act="inc"]').onclick = () => { Store.setQty(id, line.qty + 1); updateCartBadge(); render(); };
        row.querySelector('[data-act="rm"]').onclick = () => { Store.removeFromCart(id); updateCartBadge(); toast("Item removed from cart."); render(); };
      });
      $("#coupon-btn").onclick = async () => {
        const code = $("#coupon-input").value;
        const r = await Store.applyCoupon(code, subtotal);
        if (!r.ok) { toast(r.error, "err"); return; }
        couponState = { code: code.toUpperCase(), discount: r.discount, label: r.label };
        toast("Coupon applied: " + r.label);
        render();
      };
      $("#pay-btn").onclick = () => startCheckout(lines, total, {});
    }
    render();
  }

  /* ============================================================
     PAGE: SELL
     ============================================================ */
  function initSell() {
    const grid = $("#plans-grid");
    grid.innerHTML = Store.plans.map(pl => `
      <div class="plan-card${pl.popular ? " popular" : ""}">
        ${pl.popular ? '<span class="plan-rib">★ MOST POPULAR</span>' : ""}
        <h3>${esc(pl.name)}</h3>
        <p class="plan-tag">${esc(pl.tagline)}</p>
        <div class="plan-price">${pl.price ? fmt(pl.price) : "FREE"}<small>/${pl.period === "forever" ? "forever" : "mo"}</small></div>
        <ul>${pl.features.map(f => `<li>✓ ${esc(f)}</li>`).join("")}</ul>
        <button class="btn ${pl.popular ? "btn-primary" : "btn-outline"} btn-block plan-choose" data-plan="${pl.id}">
          ${pl.price ? "Buy " + pl.name + " Plan" : "Start Free"}
        </button>
      </div>`).join("");

    let selectedPlan = Store.plans.find(p => p.popular);

    grid.addEventListener("click", e => {
      const b = e.target.closest(".plan-choose");
      if (!b) return;
      selectedPlan = Store.plans.find(p => p.id === b.dataset.plan);
      $$(".plan-card").forEach(c => c.classList.remove("sel"));
      b.closest(".plan-card").classList.add("sel");
      $("#plan-input").value = selectedPlan.name;
      toast(selectedPlan.name + " plan selected — please fill the form.");
      $("#seller-form").scrollIntoView({ behavior: "smooth", block: "center" });
    });

    $("#seller-form").addEventListener("submit", async e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const seller = {
        name: String(fd.get("name") || "").slice(0, 80),
        email: String(fd.get("email") || "").toLowerCase().slice(0, 120),
        phone: String(fd.get("phone") || "").slice(0, 20),
        business: String(fd.get("business") || "").slice(0, 100),
        category: String(fd.get("category") || "").slice(0, 40),
        plan: selectedPlan.id, planName: selectedPlan.name, planPrice: selectedPlan.price,
        status: selectedPlan.price ? "pending_payment" : "pending_review"
      };

      const finish = async (paymentId, demo) => {
        seller.paymentId = paymentId;
        seller.status = "pending_review";
        if (demo) seller.offline = true;
        try {
          await Store.saveSeller(seller);
        } catch (err) { toast(err.message, "err"); return; }
        $("#modal-root").dataset.locked = "1";
        modal(`<div class="success-box">
          <div class="success-ring">🎉</div>
          <h3>Application Submitted!</h3>
          <p class="succ-order"><strong>${esc(seller.business)}</strong> → ${esc(seller.planName)} plan</p>
          ${paymentId ? `<div class="ck-line"><span>Payment</span><span class="mono">${esc(paymentId)}</span></div>` : ""}
          <p class="succ-note">Our team will verify within 24 hours. Approval email will be sent to "${esc(seller.email)}".</p>
          <div class="succ-actions">
            <a href="dashboard.html" class="btn btn-primary">Go to Dashboard</a>
            <button class="btn btn-outline" onclick="closeModal()">Close</button>
          </div>
        </div>`, "modal-sm");
        e.target.reset();
        $("#plan-input").value = selectedPlan.name;
      };

      if (!selectedPlan.price) return finish(null, false);

      payNow({
        amount: selectedPlan.price, title: "Plan",
        description: selectedPlan.name + " Seller Plan (Monthly)",
        notes: { seller_email: seller.email, plan: selectedPlan.id, type: "seller_plan" },
        onSuccess: (pid, demo) => finish(pid, demo)
      });
    });
  }

  /* ============================================================
     PAGE: DASHBOARD (sellers)
     ============================================================ */
  function initDashboard() {
    const authView = $("#auth-view");
    const appView = $("#dashboard-view");

    Store.onAuth(async user => {
      if (!user) {
        authView.style.display = "";
        appView.style.display = "none";
        return;
      }
      if (Store.isAdmin(user)) {
        location.href = "admin.html";
        return;
      }
      authView.style.display = "none";
      appView.style.display = "";
      $("#user-chip").textContent = user.name || user.email;
      await loadOverview();
    });

    $("#login-form").addEventListener("submit", async e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      try {
        await Store.login(fd.get("email"), fd.get("password"));
        toast("Logged in successfully ✓");
      } catch (err) { toast(err.message, "err"); }
    });
    $("#register-form").addEventListener("submit", async e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      if (fd.get("password") !== fd.get("password2")) { toast("Passwords do not match.", "err"); return; }
      try {
        await Store.register(fd.get("email"), fd.get("password"), fd.get("name"));
        toast("Account created ✓");
      } catch (err) { toast(err.message, "err"); }
    });
    $("#auth-tabs").addEventListener("click", e => {
      const t = e.target.closest("[data-tab]");
      if (!t) return;
      $$("#auth-tabs .tab").forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      $("#login-form").style.display = t.dataset.tab === "login" ? "" : "none";
      $("#register-form").style.display = t.dataset.tab === "register" ? "" : "none";
    });

    const gBtn = $("#google-login-btn");
    if (gBtn) gBtn.addEventListener("click", async () => {
      gBtn.disabled = true;
      try {
        await Store.googleLogin();
        toast("Signed in with Google ✓");
      } catch (err) { toast(err.message, "err"); }
      finally { gBtn.disabled = false; }
    });

    $("#side-nav").addEventListener("click", e => {
      const t = e.target.closest("[data-view]");
      if (!t) return;
      $$("#side-nav .side-link").forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      $$(".dash-view").forEach(v => (v.style.display = "none"));
      $("#" + t.dataset.view + "-view").style.display = "";
      if (t.dataset.view === "products") renderProducts();
      if (t.dataset.view === "orders") renderOrders();
    });

    async function loadOverview() {
      const user = Store.currentUser();
      const [productsAll, ordersAll] = await Promise.all([
        Store.listProducts({ all: true }), Store.listOrders()
      ]);
      const products = productsAll.filter(p => normLower(p.seller) === normLower(user.name) || p.sellerEmail === user.email || Store.isAdmin());
      const orders = ordersAll;
      $("#st-products").textContent = products.length;
      $("#st-orders").textContent = orders.length;
      $("#st-revenue").textContent = fmt(orders.reduce((s, o) => s + (o.total || 0), 0));
      $("#st-customers").textContent = new Set(orders.map(o => (o.customer && o.customer.email) || o.id)).size;
      const recent = orders.slice(0, 5);
      $("#recent-orders").innerHTML = recent.map(o => `
        <tr><td class="mono">${esc(o.id)}</td><td>${esc((o.customer && o.customer.name) || "-")}</td>
        <td>${fmt(o.total)}</td><td><span class="tag tag-${esc(o.status)}">${esc(o.status)}</span></td>
        <td>${new Date(o.date).toLocaleDateString("en-IN")}</td></tr>`).join("") || `<tr><td colspan="5">No orders yet — your store is live and ready.</td></tr>`;
      const days = [...Array(7)].map((_, i) => {
        const start = Date.now() - (6 - i) * 86400000;
        const end = start + 86400000;
        return orders.filter(o => o.date >= start && o.date < end).reduce((s, o) => s + (o.total || 0), 0);
      });
      const max = Math.max(...days, 1);
      $("#chart").innerHTML = days.map((v, i) => `
        <div class="bar-col"><div class="bar" style="height:${Math.max(4, (v / max) * 100)}%" title="${fmt(v)}"></div>
        <span>${["M", "T", "W", "T", "F", "S", "S"][(new Date().getDay() + 1 + i) % 7]}</span></div>`).join("");
    }

    function normLower(s) { return String(s || "").toLowerCase().trim(); }

    async function renderProducts() {
      const user = Store.currentUser();
      const all = await Store.listProducts({ all: true });
      const products = all.filter(p => normLower(p.seller) === normLower(user.name) || p.sellerEmail === user.email);
      $("#manage-products").innerHTML = products.length ? products.map(p => `
        <div class="mp-row" data-id="${p.id}">
          <span class="mp-ic" style="--g1:${esc(p.c1)};--g2:${esc(p.c2)}">${ICONS[p.icon] || ICONS.code}</span>
          <div class="mp-info"><strong>${esc(p.title)}</strong><span>${esc(p.category)} · ${fmt(p.price)} · ${p.approved === false ? "⏳ pending approval" : "✓ live"}</span></div>
          <button class="cl-rm mp-del" title="Delete">🗑</button>
        </div>`).join("") : `<p class="muted">No products yet. Use “Add Product” to publish your first listing — it goes live after admin approval.</p>`;
      $$(".mp-del").forEach(b => b.onclick = async () => {
        const id = b.closest(".mp-row").dataset.id;
        await Store.deleteProduct(id);
        toast("Product deleted.");
        renderProducts();
      });
    }

    $("#product-form").addEventListener("submit", async e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const user = Store.currentUser();
      const palettes = [["#6366f1", "#22d3ee"], ["#8b5cf6", "#ec4899"], ["#10b981", "#84cc16"], ["#f59e0b", "#ef4444"], ["#06b6d4", "#3b82f6"]];
      const pal = palettes[Math.floor(Math.random() * palettes.length)];
      await Store.saveProduct({
        title: String(fd.get("title") || "").slice(0, 120),
        category: String(fd.get("category") || "").slice(0, 40),
        price: Math.max(1, Number(fd.get("price")) || 1),
        mrp: Math.max(0, Number(fd.get("mrp")) || 0),
        desc: String(fd.get("desc") || "").slice(0, 800),
        features: String(fd.get("features") || "").split(",").map(s => s.trim()).filter(Boolean).slice(0, 10),
        seller: user.name || "SR Seller",
        sellerEmail: user.email,
        rating: 0, sales: 0, icon: fd.get("icon") || "code",
        c1: pal[0], c2: pal[1], badge: null,
        approved: false // requires admin approval (secure marketplace)
      });
      toast("Product submitted — it goes live after admin approval ✓");
      e.target.reset();
      renderProducts();
    });

    async function renderOrders() {
      const orders = await Store.listOrders();
      $("#orders-table").innerHTML = orders.length ? orders.map(o => `
        <tr><td class="mono">${esc(o.id)}</td><td>${esc((o.customer && o.customer.name) || "-")}<br><span class="muted">${esc((o.customer && o.customer.email) || "")}</span></td>
        <td>${(o.items || []).map(i => esc(i.title)).join(", ")}${(o.addons || []).length ? `<br><span class="muted">+ ${o.addons.map(a => esc(a.label)).join(", ")}</span>` : ""}<br><a class="gst-link" href="invoice.html?id=${esc(o.id)}" target="_blank" rel="noopener">🧾 GST Bill</a></td>
        <td>${fmt(o.total)}</td>
        <td>
          <select class="status-sel" data-id="${esc(o.id)}">
            ${["pending", "paid", "delivered", "refunded", "cancelled"].map(s => `<option value="${s}"${o.status === s ? " selected" : ""}>${s}</option>`).join("")}
          </select>
        </td></tr>`).join("") : `<tr><td colspan="5">No orders yet.</td></tr>`;
      $$(".status-sel").forEach(sel => sel.onchange = async () => {
        try {
          await Store.updateOrderStatus(sel.dataset.id, sel.value);
          toast("Order status updated: " + sel.value);
        } catch (err) { toast(err.message, "err"); }
      });
    }

    $("#logout-btn2").addEventListener("click", async () => { await Store.logout(); toast("Logged out."); });
  }

  /* ============================================================
     PAGE: CONTACT
     ============================================================ */
  function initContact() {
    $("#contact-form").addEventListener("submit", async e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      await Store.saveMessage({
        name: String(fd.get("name") || "").slice(0, 80),
        email: String(fd.get("email") || "").slice(0, 120),
        subject: String(fd.get("subject") || "").slice(0, 100),
        message: String(fd.get("message") || "").slice(0, 2000),
        type: "contact"
      });
      toast("Message sent! We reply within 24 hours ✓");
      e.target.reset();
    });
    $("#newsletter-form").addEventListener("submit", async e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      await Store.saveMessage({ email: String(fd.get("email") || "").slice(0, 120), type: "newsletter" });
      toast("Subscribed to the newsletter ✓");
      e.target.reset();
    });
  }

  /* ============================================================
     PAGE: ABOUT
     ============================================================ */
  function initAbout() {
    const els = $$(".count-num");
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          el.textContent = cur + suffix;
        }, 25);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    els.forEach(el => io.observe(el));
  }


  /* ============================================================
     RATINGS & REVIEWS (customizable)
     ============================================================ */
  async function initReviews(product) {
    const wrap = $("#reviews-root");
    if (!wrap) return;
    const settings = await Store.getSettings();
    const enabled = settings.reviews_enabled !== false;

    async function render() {
      const reviews = await Store.listReviews(product.id);
      const sum = Store.ratingSummary(reviews);
      const baseRating = Number(product.rating || 0);
      const baseCount = Number(product.reviewCount || 0);
      const avg = sum.count ? sum.avg : baseRating;
      const count = sum.count || baseCount;

      wrap.innerHTML = `
        <div class="reviews-layout">
          <div class="review-summary card">
            <div class="rs-big">${avg ? avg.toFixed(1) : "—"}</div>
            <div class="rs-stars">${stars(Math.round(avg))}</div>
            <div class="rs-count">${count} rating${count === 1 ? "" : "s"}${sum.count ? " from buyers" : ""}</div>
            ${sum.count ? `<div class="rs-dist">${sum.dist.map((n, i) => `
              <div class="dist-row"><span>${5 - i}★</span>
              <div class="dist-bar"><i style="width:${Math.round(n / sum.count * 100)}%"></i></div>
              <span>${n}</span></div>`).join("")}</div>` : ""}
            ${enabled ? `<button class="btn btn-outline btn-block mt-2" id="write-review-btn" type="button">✍️ Write a Review</button>` : `<p class="muted mt-2">Reviews are currently disabled.</p>`}
          </div>
          <div class="review-list">
            ${reviews.length ? reviews.map(r => `
              <div class="review-item">
                <div class="ri-head">
                  <span class="t-av">${esc((r.name || "?").slice(0, 2).toUpperCase())}</span>
                  <div>
                    <strong>${esc(r.name)}</strong>
                    <div class="ri-meta">${stars(r.rating)} · ${new Date(r.createdAt).toLocaleDateString("en-IN")}</div>
                  </div>
                </div>
                ${r.title ? `<h4>${esc(r.title)}</h4>` : ""}
                <p>${esc(r.text)}</p>
              </div>`).join("")
              : `<div class="empty-state"><span>⭐</span><h3>No reviews yet</h3><p>Be the first to rate this product.</p></div>`}
          </div>
        </div>`;

      const wb = $("#write-review-btn");
      if (wb) wb.addEventListener("click", openForm);
    }

    function openForm() {
      modal(`
        <button class="modal-x" onclick="closeModal()">&times;</button>
        <div class="review-form-box">
          <h3>Rate this product</h3>
          <div class="star-input" id="star-input">
            ${[1, 2, 3, 4, 5].map(n => `<button type="button" class="star-pick" data-v="${n}">★</button>`).join("")}
          </div>
          <form id="review-form" class="form mt-2">
            <label class="field"><span>Your name *</span><input name="name" required maxlength="60"></label>
            <label class="field"><span>Email *</span><input name="email" type="email" required maxlength="120"></label>
            <label class="field"><span>Title (optional)</span><input name="title" maxlength="100" placeholder="Sum it up"></label>
            <label class="field"><span>Your review *</span><textarea name="text" required maxlength="1500" placeholder="What did you like or dislike?"></textarea></label>
            <input type="hidden" name="rating" id="rating-val" value="0">
            <button class="btn btn-primary btn-block btn-lg" type="submit">Submit Review</button>
            <p class="ck-note">One review per email. Reviews may be moderated by the admin.</p>
          </form>
        </div>`);
      let picked = 0;
      $$("#star-input .star-pick").forEach(b => {
        b.addEventListener("click", () => {
          picked = Number(b.dataset.v);
          $("#rating-val").value = picked;
          $$("#star-input .star-pick").forEach(x => x.classList.toggle("on", Number(x.dataset.v) <= picked));
        });
      });
      $("#review-form").addEventListener("submit", async ev => {
        ev.preventDefault();
        if (!picked) { toast("Please select a star rating.", "err"); return; }
        const fd = new FormData(ev.target);
        try {
          await Store.saveReview({
            productId: product.id, rating: picked,
            name: fd.get("name"), email: fd.get("email"),
            title: fd.get("title"), text: fd.get("text")
          });
          closeModal();
          toast("Review published — thank you! ⭐");
          render();
        } catch (err) { toast(err.message, "err"); }
      });
    }

    render();
  }

  /* ---------- Boot ---------- */
  async function boot() {
    await Store.init();
    const siteSettings = await Store.getSettings(); // warm cache (announcement + ads + payments)

    // Maintenance mode (admin can still access admin.html)
    if (siteSettings.maintenance && page !== "admin") {
      const u = Store.currentUser();
      if (!(u && String(u.email || "").toLowerCase() === String(CFG.ADMIN_EMAIL).toLowerCase())) {
        document.body.innerHTML = `
          <div class="maint-screen">
            <div class="maint-box">
              <div class="maint-ic">🛠️</div>
              <h1>We'll be right back</h1>
              <p>${esc(CFG.BRAND)} is undergoing scheduled maintenance. Please check back shortly.</p>
              <p class="maint-sub">Need help? <a href="mailto:${CFG.SUPPORT_EMAIL}">${CFG.SUPPORT_EMAIL}</a> · ${CFG.SUPPORT_PHONE}</p>
            </div>
          </div>`;
        return;
      }
    }

    if ($("#site-header")) renderHeader();
    if ($("#site-footer")) renderFooter();

    switch (page) {
      case "home": await initHome(); break;
      case "products": await initProducts(); break;
      case "product": await initProduct(); break;
      case "cart": await initCart(); break;
      case "sell": initSell(); break;
      case "dashboard": initDashboard(); break;
      case "login": initLogin(); break;
      case "contact": initContact(); break;
      case "about": initAbout(); break;
      case "deals": initDeals(); break;
    }
    if (page !== "admin") {
      const adsClient = await Store.getAdsenseClient();
      initAds(adsClient);
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();

/* ======================================================================
   ===== js/admin.js (457 lines) =====
   ====================================================================== */

/* ============================================================
   SR CodeMatrix — Admin Panel Controller
   Access restricted to CFG.ADMIN_EMAIL only.
   GST settings, ratings moderation, live data tools.
   ============================================================ */
(function () {
  "use strict";

  const CFG = window.SR_CONFIG;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const fmt = n => "₹" + Number(n || 0).toLocaleString("en-IN");
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const toast = (m, t) => window.toast(m, t);

  function assertAdmin() {
    const u = Store.currentUser();
    if (!u || String(u.email || "").toLowerCase() !== String(CFG.ADMIN_EMAIL).toLowerCase()) {
      toast("Admin access required.", "err");
      location.href = "admin.html";
      throw new Error("Not admin");
    }
    return u;
  }

  function maskKey(k) {
    if (!k) return "(default — from config)";
    return k.slice(0, 12) + "…" + k.slice(-4);
  }

  const STATES = [
    ["01","Jammu & Kashmir"],["02","Himachal Pradesh"],["03","Punjab"],["04","Chandigarh"],
    ["05","Uttarakhand"],["06","Haryana"],["07","Delhi"],["08","Rajasthan"],["09","Uttar Pradesh"],
    ["10","Bihar"],["11","Sikkim"],["12","Arunachal Pradesh"],["13","Nagaland"],["14","Manipur"],
    ["15","Mizoram"],["16","Tripura"],["17","Meghalaya"],["18","Assam"],["19","West Bengal"],
    ["20","Jharkhand"],["21","Odisha"],["22","Chhattisgarh"],["23","Madhya Pradesh"],["24","Gujarat"],
    ["26","Dadra & Nagar Haveli and Daman & Diu"],["27","Maharashtra"],["29","Karnataka"],["30","Goa"],
    ["31","Lakshadweep"],["32","Kerala"],["33","Tamil Nadu"],["34","Puducherry"],
    ["35","Andaman & Nicobar Islands"],["36","Telangana"],["37","Andhra Pradesh"],["38","Ladakh"],
    ["97","Other Territory"]
  ];

  document.addEventListener("DOMContentLoaded", async () => {
    await Store.init();
    await Store.getSettings();

    const authView = $("#admin-auth");
    const panelView = $("#admin-panel");

    /* ---------- Login gate: ONLY admin email ---------- */
    Store.onAuth(user => {
      const ok = user && String(user.email || "").toLowerCase() === String(CFG.ADMIN_EMAIL).toLowerCase();
      if (ok) {
        authView.style.display = "none";
        panelView.style.display = "";
        $("#admin-email-chip").textContent = user.email;
        loadOverview();
      } else {
        authView.style.display = "";
        panelView.style.display = "none";
        if (user) Store.logout();
      }
    });

    $("#admin-login-form").addEventListener("submit", async e => {
      e.preventDefault();
      try {
        await Store.adminLogin($("#admin-email").value.trim(), $("#admin-password").value);
        toast("Welcome, Administrator ✓");
        $("#admin-password").value = "";
      } catch (err) { toast(err.message, "err"); }
    });

    const adminGBtn = $("#admin-google-btn");
    if (adminGBtn) adminGBtn.addEventListener("click", async () => {
      adminGBtn.disabled = true;
      try {
        await Store.googleLogin({ adminOnly: true });
        toast("Welcome, Administrator ✓");
      } catch (err) { toast(err.message, "err"); }
      finally { adminGBtn.disabled = false; }
    });

    $("#admin-logout").addEventListener("click", async () => { await Store.logout(); toast("Signed out."); });

    /* ---------- Sidebar ---------- */
    $("#admin-side").addEventListener("click", e => {
      const t = e.target.closest("[data-view]");
      if (!t) return;
      $$("#admin-side .side-link").forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      $$(".admin-view").forEach(v => (v.style.display = "none"));
      $("#" + t.dataset.view + "-view").style.display = "";
      const loaders = {
        overview: loadOverview, products: loadProducts, orders: loadOrders,
        sellers: loadSellers, messages: loadMessages, coupons: loadCoupons,
        reviews: loadReviews, settings: loadSettings
      };
      if (loaders[t.dataset.view]) loaders[t.dataset.view]();
    });

    /* ---------- Overview ---------- */
    async function loadOverview() {
      assertAdmin();
      const st = await Store.stats();
      $("#a-products").textContent = st.products;
      $("#a-pending").textContent = st.pendingProducts;
      $("#a-orders").textContent = st.orders;
      $("#a-revenue").textContent = fmt(st.revenue);
      $("#a-sellers").textContent = st.sellers;
      $("#a-pending-sellers").textContent = st.pendingSellers;
      $("#a-messages").textContent = st.unread + " / " + st.messages;
      $("#a-customers").textContent = st.customers;

      const s = await Store.getSettings();
      $("#a-key").textContent = maskKey(await Store.getRazorpayKey()) + (s.razorpay_key ? " (admin override)" : " (config default)");
      $("#a-mode").textContent = Store.mode === "firebase" ? "Firebase (live)" : "Local storage (offline preview)";
      $("#a-gst").textContent = (s.gstin || "not set") + " · " + (s.gst_rate != null ? s.gst_rate : 18) + "%";

      const logs = (s.logs || []).slice(-8).reverse();
      $("#a-logs").innerHTML = logs.length
        ? logs.map(l => `<div class="log-row"><span class="mono">${new Date(l.t).toLocaleString("en-IN")}</span><span>${esc(l.by)}</span><span>${esc(l.action)}</span></div>`).join("")
        : `<p class="muted">No admin activity yet.</p>`;
    }

    /* ---------- Products ---------- */
    Store.getProductAdmin = async id => (await Store.listProducts({ all: true })).find(p => p.id === id);

    async function loadProducts() {
      assertAdmin();
      const products = await Store.listProducts({ all: true });
      $("#admin-products").innerHTML = products.length ? products.map(p => `
        <div class="ap-row${p.approved === false ? " pending" : ""}" data-id="${esc(p.id)}">
          <span class="mp-ic" style="--g1:${esc(p.c1 || "#6366f1")};--g2:${esc(p.c2 || "#22d3ee")}">${esc((p.title || "?").slice(0, 1).toUpperCase())}</span>
          <div class="mp-info">
            <strong>${esc(p.title)}</strong>
            <span>${esc(p.category)} · ${fmt(p.price)} · ${esc(p.seller || "-")} · ★ ${Number(p.rating || 0).toFixed(1)} ${p.featured ? "· ⭐ featured" : ""}</span>
          </div>
          <div class="ap-actions">
            ${p.approved === false
              ? `<button class="btn btn-accent btn-sm" data-act="approve">Approve</button>`
              : `<button class="btn btn-outline btn-sm" data-act="unapprove">Unpublish</button>`}
            <button class="btn btn-outline btn-sm" data-act="feature">${p.featured ? "Unfeature" : "Feature ⭐"}</button>
            <button class="btn btn-outline btn-sm" data-act="rating" title="Custom rating">★ Set</button>
            <button class="btn btn-outline btn-sm ap-del" data-act="delete" style="border-color:#7f1d1d;color:#fca5a5">Delete</button>
          </div>
        </div>`).join("") : `<p class="muted">No products yet. Add real listings below — they appear after publish.</p>`;

      $$(".ap-row").forEach(row => {
        const id = row.dataset.id;
        row.querySelector('[data-act="approve"]')?.addEventListener("click", async () => {
          assertAdmin(); const p = await Store.getProductAdmin(id);
          await Store.saveProduct({ ...p, approved: true }); toast("Approved & live ✓"); loadProducts();
        });
        row.querySelector('[data-act="unapprove"]')?.addEventListener("click", async () => {
          assertAdmin(); const p = await Store.getProductAdmin(id);
          await Store.saveProduct({ ...p, approved: false }); toast("Unpublished."); loadProducts();
        });
        row.querySelector('[data-act="feature"]')?.addEventListener("click", async () => {
          assertAdmin(); const p = await Store.getProductAdmin(id);
          const feat = !p.featured;
          await Store.saveProduct({ ...p, featured: feat, badge: feat ? (p.badge || "Featured") : (p.badge === "Featured" ? null : p.badge) });
          toast(feat ? "Featured ⭐" : "Feature removed."); loadProducts();
        });
        row.querySelector('[data-act="rating"]')?.addEventListener("click", async () => {
          assertAdmin();
          const p = await Store.getProductAdmin(id);
          const v = prompt("Set custom rating for “" + p.title + "” (0 – 5, e.g. 4.5):", String(p.rating || 0));
          if (v == null) return;
          const num = Math.max(0, Math.min(5, Number(v) || 0));
          await Store.saveProduct({ ...p, rating: Math.round(num * 10) / 10 });
          toast("Rating set to " + num.toFixed(1)); loadProducts();
        });
        row.querySelector('[data-act="delete"]')?.addEventListener("click", async () => {
          if (!confirm("Delete this product permanently?")) return;
          assertAdmin(); await Store.deleteProduct(id); toast("Deleted."); loadProducts();
        });
      });
    }

    $("#admin-product-form").addEventListener("submit", async e => {
      e.preventDefault();
      assertAdmin();
      const fd = new FormData(e.target);
      const palettes = [["#6366f1", "#22d3ee"], ["#8b5cf6", "#ec4899"], ["#10b981", "#84cc16"], ["#f59e0b", "#ef4444"]];
      const pal = palettes[Math.floor(Math.random() * palettes.length)];
      await Store.saveProduct({
        title: String(fd.get("title") || "").slice(0, 120),
        category: String(fd.get("category") || ""),
        price: Math.max(1, Number(fd.get("price")) || 1),
        mrp: Math.max(0, Number(fd.get("mrp")) || 0),
        desc: String(fd.get("desc") || "").slice(0, 800),
        features: String(fd.get("features") || "").split(",").map(s => s.trim()).filter(Boolean),
        seller: "SR CodeMatrix",
        sellerEmail: CFG.ADMIN_EMAIL,
        icon: fd.get("icon") || "code",
        rating: Math.max(0, Math.min(5, Number(fd.get("rating")) || 0)),
        sales: 0, c1: pal[0], c2: pal[1],
        badge: fd.get("badge") || null,
        approved: true
      });
      toast("Product published ✓");
      e.target.reset();
      loadProducts();
    });

    /* ---------- Reviews moderation ---------- */
    async function loadReviews() {
      assertAdmin();
      const reviews = await Store.listReviews(null, true);
      $("#admin-reviews").innerHTML = reviews.length ? reviews.map(r => `
        <div class="msg-row${r.approved === false ? "" : " unread"}" data-id="${esc(r.id)}">
          <div class="msg-head">
            <strong>${"★".repeat(Math.round(r.rating))}${"☆".repeat(5 - Math.round(r.rating))} · ${esc(r.title || "Review")}</strong>
            <span class="muted">${new Date(r.createdAt).toLocaleString("en-IN")}</span>
          </div>
          <div class="muted">${esc(r.name)} · ${esc(r.email)} · product: <span class="mono">${esc(r.productId)}</span> · ${r.approved === false ? "hidden" : "visible"}</div>
          <p>${esc(r.text)}</p>
          <div class="ap-actions">
            ${r.approved === false ? `<button class="btn btn-accent btn-sm" data-act="show">Show</button>` : `<button class="btn btn-outline btn-sm" data-act="hide">Hide</button>`}
            <button class="btn btn-outline btn-sm" data-act="del" style="border-color:#7f1d1d;color:#fca5a5">Delete</button>
          </div>
        </div>`).join("") : `<p class="muted">No reviews yet.</p>`;
      $$("#admin-reviews .msg-row").forEach(row => {
        const id = row.dataset.id;
        row.querySelector('[data-act="show"]')?.addEventListener("click", async () => { assertAdmin(); await Store.setReviewApproved(id, true); loadReviews(); });
        row.querySelector('[data-act="hide"]')?.addEventListener("click", async () => { assertAdmin(); await Store.setReviewApproved(id, false); loadReviews(); });
        row.querySelector('[data-act="del"]')?.addEventListener("click", async () => {
          if (!confirm("Delete this review?")) return;
          assertAdmin(); await Store.deleteReview(id); toast("Review deleted."); loadReviews();
        });
      });
    }

    /* ---------- Orders + GST invoice ---------- */
    async function loadOrders() {
      assertAdmin();
      const orders = await Store.listOrders();
      $("#admin-orders").innerHTML = orders.length ? orders.map(o => `
        <tr>
          <td class="mono">${esc(o.id)}<br><span class="muted">${esc(o.invoice_no || Store.invoiceNo(o.id))}</span></td>
          <td>${esc((o.customer && o.customer.name) || "-")}<br><span class="muted">${esc((o.customer && o.customer.email) || "")}${(o.customer && o.customer.gstin) ? "<br>GSTIN: " + esc(o.customer.gstin) : ""}</span></td>
          <td>${(o.items || []).map(i => esc(i.title)).join(", ")}
            ${(o.addons || []).length ? `<br><span class="muted">+ ${o.addons.map(a => esc(a.label)).join(", ")}</span>` : ""}
            <br><a class="gst-link" href="invoice.html?id=${esc(o.id)}" target="_blank" rel="noopener">🧾 GST Bill</a></td>
          <td>${fmt(o.total)}${o.tax && o.tax.rate ? `<br><span class="muted">GST ${fmt((o.tax.cgst || 0) + (o.tax.sgst || 0) + (o.tax.igst || 0))}</span>` : ""}<br><span class="muted mono">${esc(o.paymentId || "")}</span></td>
          <td>
            <select class="status-sel" data-id="${esc(o.id)}">
              ${["pending", "paid", "delivered", "refunded", "cancelled"].map(s => `<option value="${s}"${o.status === s ? " selected" : ""}>${s}</option>`).join("")}
            </select>
          </td>
        </tr>`).join("") : `<tr><td colspan="5">No orders yet — store is live.</td></tr>`;
      $$("#admin-orders .status-sel").forEach(sel => sel.onchange = async () => {
        assertAdmin();
        try { await Store.updateOrderStatus(sel.dataset.id, sel.value); toast("Status → " + sel.value); }
        catch (err) { toast(err.message, "err"); }
      });
    }

    $("#export-orders").addEventListener("click", async () => {
      assertAdmin();
      const orders = await Store.listOrders();
      const rows = [["Invoice", "Order ID", "Date", "Customer", "Email", "State", "Buyer GSTIN", "Items", "Add-ons", "Taxable", "CGST", "SGST", "IGST", "Total", "Payment ID", "Status"]];
      orders.forEach(o => rows.push([
        o.invoice_no || Store.invoiceNo(o.id), o.id, new Date(o.date).toISOString().slice(0, 10),
        (o.customer && o.customer.name) || "", (o.customer && o.customer.email) || "",
        (o.buyer && o.buyer.state_name) || "", (o.customer && o.customer.gstin) || "",
        (o.items || []).map(i => `${i.title} x${i.qty}`).join("; "),
        (o.addons || []).map(a => a.label).join("; "),
        (o.tax && o.tax.taxable) || o.total, (o.tax && o.tax.cgst) || 0, (o.tax && o.tax.sgst) || 0, (o.tax && o.tax.igst) || 0,
        o.total, o.paymentId || "", o.status
      ]));
      const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "sr-codematrix-orders.csv";
      a.click();
      URL.revokeObjectURL(a.href);
      toast("Orders CSV downloaded ✓");
    });

    /* ---------- Sellers ---------- */
    async function loadSellers() {
      assertAdmin();
      const sellers = await Store.listSellers();
      $("#admin-sellers").innerHTML = sellers.length ? sellers.map(s => `
        <div class="ap-row" data-id="${esc(s.id)}">
          <div class="mp-info">
            <strong>${esc(s.business)}</strong>
            <span>${esc(s.name)} · ${esc(s.email)} · ${esc(s.phone)} · ${esc(s.planName || "-")} · <b>${esc(s.status || "pending")}</b></span>
          </div>
          <div class="ap-actions">
            ${s.status !== "active" ? `<button class="btn btn-accent btn-sm" data-act="approve">Approve</button>` : ""}
            ${s.status !== "rejected" ? `<button class="btn btn-outline btn-sm" data-act="reject">Reject</button>` : ""}
          </div>
        </div>`).join("") : `<p class="muted">No seller applications yet.</p>`;
      $$("#admin-sellers .ap-row").forEach(row => {
        const id = row.dataset.id;
        row.querySelector('[data-act="approve"]')?.addEventListener("click", async () => {
          assertAdmin(); await Store.updateSeller(id, { status: "active" }); toast("Approved ✓"); loadSellers();
        });
        row.querySelector('[data-act="reject"]')?.addEventListener("click", async () => {
          assertAdmin(); await Store.updateSeller(id, { status: "rejected" }); toast("Rejected."); loadSellers();
        });
      });
    }

    /* ---------- Messages ---------- */
    async function loadMessages() {
      assertAdmin();
      const msgs = await Store.listMessages();
      $("#admin-messages").innerHTML = msgs.length ? msgs.map(m => `
        <div class="msg-row${m.read ? "" : " unread"}" data-id="${esc(m.id)}">
          <div class="msg-head">
            <strong>${esc(m.subject || m.type || "Message")}</strong>
            <span class="muted">${new Date(m.createdAt).toLocaleString("en-IN")}</span>
          </div>
          <div class="muted">${esc(m.email)}${m.name ? " · " + esc(m.name) : ""}</div>
          <p>${esc(m.message || "")}</p>
          <div class="ap-actions">
            ${!m.read ? `<button class="btn btn-outline btn-sm" data-act="read">Mark read</button>` : `<span class="ok-txt">✓ Read</span>`}
          </div>
        </div>`).join("") : `<p class="muted">No messages yet.</p>`;
      $$("#admin-messages .msg-row").forEach(row => {
        row.querySelector('[data-act="read"]')?.addEventListener("click", async () => {
          assertAdmin(); await Store.markMessage(row.dataset.id, true); loadMessages();
        });
      });
    }

    /* ---------- Coupons ---------- */
    async function loadCoupons() {
      assertAdmin();
      const map = await Store.getCoupons();
      $("#admin-coupons").innerHTML = Object.keys(map).map(code => {
        const c = map[code];
        const base = !!CFG.COUPONS[code];
        return `<div class="ap-row">
          <div class="mp-info"><strong class="mono">${esc(code)}</strong><span>${esc(c.label)} · ${c.type} ${c.value}${c.proOnly ? " · PRO only" : ""} ${base ? "· base (config)" : "· admin"}</span></div>
          <div class="ap-actions">${base ? `<span class="muted">fixed</span>` : `<button class="btn btn-outline btn-sm cp-del" data-code="${esc(code)}" style="border-color:#7f1d1d;color:#fca5a5">Delete</button>`}</div>
        </div>`;
      }).join("");
      $$(".cp-del").forEach(b => b.onclick = async () => {
        try { assertAdmin(); await Store.deleteCoupon(b.dataset.code, assertAdmin().email); toast("Coupon deleted."); loadCoupons(); }
        catch (err) { toast(err.message, "err"); }
      });
    }

    $("#coupon-form").addEventListener("submit", async e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      try {
        const admin = assertAdmin();
        await Store.saveCoupon(fd.get("code"), {
          type: fd.get("type"), value: Number(fd.get("value")),
          label: fd.get("label"), proOnly: fd.get("proOnly") === "on"
        }, admin.email);
        toast("Coupon created ✓");
        e.target.reset();
        loadCoupons();
      } catch (err) { toast(err.message, "err"); }
    });

    /* ---------- Settings: Razorpay + GST + Business + Site ---------- */
    async function loadSettings() {
      assertAdmin();
      const s = await Store.getSettings();
      $("#set-key").value = s.razorpay_key || "";
      $("#set-adsense").value = s.adsense_client || "";
      $("#set-announcement").value = s.announcement || "";
      $("#set-key-current").textContent = maskKey(await Store.getRazorpayKey());
      $("#set-ads-current").textContent = s.adsense_client || CFG.ADSENSE_CLIENT;

      // Business / GST
      $("#set-company").value = s.company_legal || "";
      $("#set-gstin").value = s.gstin || "";
      $("#set-gst-rate").value = s.gst_rate != null ? s.gst_rate : 18;
      $("#set-invoice-prefix").value = s.invoice_prefix || "SRCM";
      $("#set-sac").value = s.sac_code || "998313";
      $("#set-state").value = s.state_code || "23";
      // Contact
      $("#set-email").value = s.support_email || "";
      $("#set-phone").value = s.support_phone || "";
      $("#set-address").value = s.address || "";
      // Toggles
      $("#set-reviews").checked = s.reviews_enabled !== false;
      $("#set-maintenance").checked = !!s.maintenance;
    }

    $("#settings-form").addEventListener("submit", async e => {
      e.preventDefault();
      const admin = assertAdmin();
      const patch = {};
      const key = $("#set-key").value.trim();
      const ads = $("#set-adsense").value.trim();
      if (key) {
        if (!/^rzp_(test|live)_[A-Za-z0-9]{8,}$/.test(key)) { toast("Invalid Razorpay key (rzp_test_… / rzp_live_…).", "err"); return; }
        patch.razorpay_key = key;
      }
      if (ads) {
        if (!/^ca-pub-\d{10,20}$/.test(ads)) { toast("Invalid AdSense ID (ca-pub-…).", "err"); return; }
        patch.adsense_client = ads;
      }
      const gstin = $("#set-gstin").value.trim().toUpperCase();
      if (gstin && !/^[0-9A-Z]{15}$/.test(gstin)) { toast("GSTIN must be exactly 15 characters.", "err"); return; }
      const rate = Number($("#set-gst-rate").value);
      if (!(rate >= 0 && rate <= 28)) { toast("GST rate must be between 0 and 28.", "err"); return; }

      patch.announcement = $("#set-announcement").value.trim().slice(0, 200);
      patch.company_legal = $("#set-company").value.trim().slice(0, 120) || CFG.BRAND;
      patch.gstin = gstin;
      patch.gst_rate = rate;
      patch.invoice_prefix = ($("#set-invoice-prefix").value.trim() || "SRCM").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 10);
      patch.sac_code = $("#set-sac").value.trim().slice(0, 10);
      patch.state_code = $("#set-state").value;
      const sel = STATES.find(s => s[0] === patch.state_code);
      patch.state_name = sel ? sel[1] : "Madhya Pradesh";
      patch.support_email = $("#set-email").value.trim().slice(0, 120) || CFG.SUPPORT_EMAIL;
      patch.support_phone = $("#set-phone").value.trim().slice(0, 30) || CFG.SUPPORT_PHONE;
      patch.address = $("#set-address").value.trim().slice(0, 200) || CFG.ADDRESS;
      patch.reviews_enabled = $("#set-reviews").checked;
      patch.maintenance = $("#set-maintenance").checked;

      try {
        await Store.saveSettings(patch, admin.email);
        toast("All settings saved ✓" + (patch.maintenance ? " — MAINTENANCE MODE ON" : ""));
        loadSettings();
      } catch (err) { toast(err.message, "err"); }
    });

    $("#reset-key").addEventListener("click", async () => {
      const admin = assertAdmin();
      if (!confirm("Remove Razorpay key override and use config default?")) return;
      const s = await Store.getSettings();
      await Store.saveSettings({ ...s, razorpay_key: "" }, admin.email);
      toast("Key override cleared.");
      loadSettings();
    });

    /* ---------- Live data tools ---------- */
    $("#tool-clear").addEventListener("click", async () => {
      if (!confirm("DELETE ALL products? This cannot be undone.")) return;
      assertAdmin();
      const n = await Store.clearCatalog();
      toast(`Catalog cleared — ${n} products removed.`);
    });
    $("#tool-purge").addEventListener("click", async () => {
      if (!confirm("Purge ALL legacy demo/sample data (sample products, seeded demo orders)?")) return;
      assertAdmin();
      const n = await Store.purgeLegacyDemo();
      toast(`Purge complete — ${n} demo records removed ✓`);
    });
  });
})();
