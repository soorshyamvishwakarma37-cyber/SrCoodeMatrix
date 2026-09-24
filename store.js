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
        const cred = await this.auth.createUserWithEmailAndPassword(email, password);
        if (name) await cred.user.updateProfile({ displayName: name });
        return { uid: cred.user.uid, email, name };
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

    /** Seller login — admin email is redirected to the Admin Panel. */
    async login(email, password) {
      await this.init();
      if (isAdminEmail(email)) throw new Error("Admin account — please sign in from the Admin Panel.");
      if (this.mode === "firebase") {
        const cred = await this.auth.signInWithEmailAndPassword(email, password);
        return { uid: cred.user.uid, email: cred.user.email, name: cred.user.displayName || email.split("@")[0] };
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
          throw new Error(e.message && e.message.includes("Access") ? e.message : "Invalid email or password.");
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
      const orders = await this.listOrders();
      for (const o of orders) {
        const demoOrder = /^SRD\d+/.test(o.id) || String(o.paymentId || "").startsWith("pay_seed");
        if (demoOrder) {
          if (this.mode === "firebase") await this.db.ref("orders/" + o.id).remove();
          else mem.set("sr_orders", mem.get("sr_orders", []).filter(x => x.id !== o.id));
          removed++;
        }
      }
      // legacy local keys
      ["sr_seed_v", "sr_products", "sr_orders_demo"].forEach(k => mem.del(k));
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