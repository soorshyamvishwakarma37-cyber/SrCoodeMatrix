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