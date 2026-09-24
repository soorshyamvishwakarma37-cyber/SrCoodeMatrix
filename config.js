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