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
        <div>
          <h4>Marketplace</h4>
          <a href="products.html">All Products</a>
          <a href="deals.html">Affiliate Deals</a>
          <a href="products.html?cat=Software">Software</a>
          <a href="products.html?cat=Services">Services</a>
          <a href="products.html?cat=Courses">Courses</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="about.html">About Us</a>
          <a href="sell.html">Sell with Us</a>
          <a href="dashboard.html">Seller Dashboard</a>
          <a href="contact.html">Contact</a>
        </div>
        <div>
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
      <div class="foot-bottom">
        <span>© ${new Date().getFullYear()} ${esc(CFG.BRAND)}. All rights reserved. · GST registered</span>
        <span class="foot-legal">
          <a href="terms.html">Terms</a> ·
          <a href="privacy.html">Privacy</a> ·
          <a href="refund.html">Refunds</a> ·
          <a href="shipping.html">Delivery</a> ·
          <a href="admin.html">Admin</a>
        </span>
      </div>
    </div>`;

    $$(".tip-btn", $("#site-footer")).forEach(b => {
      b.addEventListener("click", () => tipJar(Number(b.dataset.tip)));
    });
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
      `<option value="${code}"${code === taxCfg.state_code ? "" : ""}>${name} (${code})</option>`).join("");

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