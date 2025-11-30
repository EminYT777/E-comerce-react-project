import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ------------------ Картинки для карусели ------------------ */
const bannerImages = [
  "https://m-cdn.phonearena.com/images/hub/238-wide-two_1200/Apple-iPhone-14-release-date-price-and-features.jpg",
  "https://www.apple.com/v/iphone-17-pro/c/images/meta/iphone-17-pro_overview__er68vecct16q_og.png?202510300415",
  "https://zagrangid.com/wp-content/uploads/iphone16.jpg",
];

/* ------------------ Главная страница ------------------ */
export default function Home() {
  const navigate = useNavigate();

  /* ------ Карусель ------ */
  const [slide, setSlide] = useState(0);
  const next = () => setSlide((s) => (s + 1) % bannerImages.length);
  const prev = () =>
    setSlide((s) => (s === 0 ? bannerImages.length - 1 : s - 1));

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, []);

  /* ------ Таймер ------ */
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function getTimeRemaining() {
    const targetDate =
      new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // 3 дня
    const now = new Date().getTime();
    const t = targetDate - now;

    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  }

  /* ------ Категории ------ */
  const categories = [
    { id: 1, label: "Phones", icon: "📱" },
    { id: 2, label: "Computers", icon: "💻" },
    { id: 3, label: "SmartWatch", icon: "⌚" },
    { id: 4, label: "Camera", icon: "📷" },
    { id: 5, label: "HeadPhones", icon: "🎧" },
    { id: 6, label: "Gaming", icon: "🎮" },
  ];

  const [active, setActive] = useState(4);

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        {/* ------------------ Banner ------------------ */}
        <section style={styles.banner}>
          <div>
            <h4 style={{ color: "#fff", marginBottom: 8 }}>iPhone 17 Series</h4>
            <h1 style={styles.bannerTitle}>Up to 10% off Voucher</h1>

            <button style={styles.shopNow} onClick={() => navigate("/shop")}>
              Shop Now →
            </button>
          </div>

          <div style={styles.sliderWrap}>
            <img src={bannerImages[slide]} alt="banner" style={styles.bannerImg} />

            <button style={styles.arrowLeft} onClick={prev}>
              ‹
            </button>
            <button style={styles.arrowRight} onClick={next}>
              ›
            </button>
          </div>
        </section>

        {/* ------------------ Flash Sales ------------------ */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ marginBottom: 10 }}>Today's Flash Sales</h2>

          {/* TIMER */}
          <div style={styles.timerRow}>
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((t) => (
              <div key={t.label} style={styles.timerBlock}>
                <span style={{ fontSize: 20, fontWeight: 700 }}>{t.value}</span>
                <small>{t.label}</small>
              </div>
            ))}
          </div>

          {/* PRODUCTS */}
          <div style={styles.productsRow}>
            {products.map((p) => (
              <div key={p.title} style={styles.productCard}>
                <span style={styles.discount}>{p.discount}</span>
                <img src={p.img} style={styles.productImg} />
                <h4>{p.title}</h4>
                <div>
                  <span style={styles.priceNew}>${p.priceNew}</span>
                  <span style={styles.priceOld}>${p.priceOld}</span>
                </div>
                <div style={styles.rating}>⭐⭐⭐⭐☆ ({p.reviews})</div>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button style={styles.viewAll} onClick={() => navigate("/shop")}>
            View All Products
          </button>
        </section>

        {/* ------------------ CATEGORIES ------------------ */}
        <section style={{ marginTop: 60 }}>
          <div style={styles.catLabel}>Categories</div>
          <h2 style={styles.catTitle}>Browse By Category</h2>

          <div style={styles.catRow}>
            {categories.map((c) => (
              <div
                key={c.id}
                onClick={() => setActive(c.id)}
                style={{
                  ...styles.catCard,
                  ...(active === c.id ? styles.catActive : {}),
                }}
              >
                <div style={styles.catIcon}>{c.icon}</div>
                <div>{c.label}</div>
              </div>
            ))}

            <div style={styles.catArrow}>←</div>
            <div style={styles.catArrow}>→</div>
          </div>
        </section>

        {/* ------------------ NEW ARRIVAL (добавлено в конец) ------------------ */}
        <section style={{ marginTop: 80 }}>
          <div style={styles.featuredLabel}>Featured</div>
          <h2 style={styles.newArrivalTitle}>New Arrival</h2>

          <div style={styles.newGrid}>
            {/* PlayStation */}
            <div style={{ ...styles.newCard, ...styles.bigCard }}>
              <img
                src="https://c.files.bbci.co.uk/f310/live/f36de0e0-6f86-11ef-b410-fbf02dca0fc5.png"
                style={styles.newImg}
              />
              <div style={styles.newTextWrap}>
                <h3 style={styles.newTitle}>PlayStation 5</h3>
                <p style={styles.newDesc}>
                  Black and White version of the PS5 coming out on sale.
                </p>
                <span style={styles.newShop}>Shop Now</span>
              </div>
            </div>

            {/* Women Collection */}
            <div style={{ ...styles.newCard, ...styles.mediumCard }}>
              <img
                src="https://miro.medium.com/v2/resize:fit:1400/1*KhKN7SL3sTIvvtXSn_oLPQ.jpeg"
                style={styles.newImg}
              />
              <div style={styles.newTextWrap}>
                <h3 style={styles.newTitle}>Women’s Collections</h3>
                <p style={styles.newDesc}>
                  Featured women collections that give you another vibe.
                </p>
                <span style={styles.newShop}>Shop Now</span>
              </div>
            </div>

            {/* Speakers */}
            <div style={{ ...styles.newCard, ...styles.smallCard }}>
              <img
                src="https://i.guim.co.uk/img/media/f183d9937a705b78a19c48d286edd2031e262242/149_311_5091_3054/master/5091.jpg?width=465&dpr=1&s=none&crop=none"
                style={styles.newImg}
              />
              <div style={styles.newTextWrap}>
                <h3 style={styles.newTitle}>Speakers</h3>
                <p style={styles.newDesc}>Amazon wireless speakers</p>
                <span style={styles.newShop}>Shop Now</span>
              </div>
            </div>

            {/* Perfume */}
            <div style={{ ...styles.newCard, ...styles.smallCard }}>
              <img
                src="https://www.vperfumes.com/_next/image?url=https%3A%2F%2Fmedia.vperfumes.com%2Fproducts%2FGucci-Intense-Oud-EDP-For-Unisex-90ML-1731388689057.webp&w=1920&q=75"
                style={styles.newImg}
              />
              <div style={styles.newTextWrap}>
                <h3 style={styles.newTitle}>Perfume</h3>
                <p style={styles.newDesc}>GUCCI INTENSE OUD EDP</p>
                <span style={styles.newShop}>Shop Now</span>
              </div>
            </div>
          </div>

          {/* Footer Icons */}
          <div style={styles.infoRow}>
            <div style={styles.infoBox}>
              <div style={styles.infoIcon}>🚚</div>
              <h4 style={styles.infoTitle}>FREE AND FAST DELIVERY</h4>
              <p style={styles.infoText}>Free delivery for all orders over $140</p>
            </div>

            <div style={styles.infoBox}>
              <div style={styles.infoIcon}>🎧</div>
              <h4 style={styles.infoTitle}>24/7 CUSTOMER SERVICE</h4>
              <p style={styles.infoText}>Friendly 24/7 customer support</p>
            </div>

            <div style={styles.infoBox}>
              <div style={styles.infoIcon}>✔️</div>
              <h4 style={styles.infoTitle}>MONEY BACK GUARANTEE</h4>
              <p style={styles.infoText}>We return money within 30 days</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ------------------ Products ------------------ */
const products = [
  {
    title: "HAVIT HV-G92 Gamepad",
    priceNew: 120,
    priceOld: 160,
    discount: "-40%",
    reviews: 88,
    img: "https://www.ultratech.com.bd/image/cache/catalog/gamepad/havit/hv-g92/havit-hv-g92-gamepad-500x500.jpg",
  },
  {
    title: "Samsung Galaxy S21",
    priceNew: 799.99,
    priceOld: 1160,
    discount: "-35%",
    reviews: 75,
    img: "https://i5.walmartimages.com/seo/Samsung-Galaxy-S21-Plus-5G-128-256GB-SM-G996U1-US-Model-Unlocked-Cell-Phones-Very-Good-Condition_46af8b5d-3a63-46e8-97d7-3a8f9fa35f00.4243b2ff1db36d328a46f09ad220d988.jpeg",
  },
  {
    title: "Sony Sony PS5 Controller",
    priceNew: 69.99,
    priceOld: 400,
    discount: "-30%",
    reviews: 99,
    img: "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-controller-product-thumbnail-01-en-14sep21?$facebook$",
  },
  {
    title: "Nike Nike Running Shoes",
    priceNew: 89.99,
    priceOld: 400,
    discount: "-25%",
    reviews: 95,
    img: "https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwebce1bf5/nk/943/4/1/3/1/1/94341311_2775_4950_ba7e_83c397a73349.jpg?sw=700&sh=700&sm=fit&q=100&strip=false",
  },
];

/* ------------------ Styles ------------------ */
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Arial",
    padding: 20,
    background: "#fafafa",
  },

  main: {
    width: "100%",
    maxWidth: 1200,
  },

  /* ---- Banner ---- */
  banner: {
    background: "#000",
    color: "#fff",
    padding: 20,
    borderRadius: 10,
    height: 400,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bannerTitle: { fontSize: 36, fontWeight: 700 },

  shopNow: {
    padding: "12px 25px",
    borderRadius: 6,
    border: "none",
    background: "#fff",
    cursor: "pointer",
    fontSize: 16,
  },

  sliderWrap: { position: "relative" },

  bannerImg: {
    width: 500,
    height: 300,
    borderRadius: 10,
    objectFit: "cover",
    transition: "0.6s ease",
  },

  arrowLeft: {
    position: "absolute",
    left: -50,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 32,
    padding: "8px 16px",
    borderRadius: 6,
    border: "none",
    background: "#ffffff50",
    cursor: "pointer",
  },

  arrowRight: {
    position: "absolute",
    right: -50,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 32,
    padding: "8px 16px",
    borderRadius: 6,
    border: "none",
    background: "#ffffff50",
    cursor: "pointer",
  },

  /* ---- Timer ---- */
  timerRow: { display: "flex", gap: 20, marginTop: 20 },

  timerBlock: {
    background: "#eee",
    padding: "10px 15px",
    borderRadius: 8,
    textAlign: "center",
  },

  /* ---- Products ---- */
  productsRow: { display: "flex", gap: 25, flexWrap: "wrap", marginTop: 20 },

  productCard: {
    width: 200,
    padding: 15,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "relative",
  },

  discount: {
    position: "absolute",
    top: 10,
    left: 10,
    background: "red",
    color: "#fff",
    padding: "2px 6px",
    borderRadius: 4,
    fontSize: 12,
  },

  productImg: {
    width: "100%",
    height: 120,
    objectFit: "contain",
    marginBottom: 10,
  },

  priceNew: { color: "red", fontWeight: 700, marginRight: 10 },
  priceOld: { color: "#888", textDecoration: "line-through" },

  rating: { marginTop: 5 },

  viewAll: {
    display: "block",
    margin: "30px auto 0 auto",
    padding: "12px 25px",
    background: "#d60000",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },

  /* ---- Categories ---- */
  catLabel: { color: "#d00", fontWeight: 600, marginBottom: 8 },
  catTitle: { fontSize: 28, fontWeight: 700, marginBottom: 20 },

  catRow: {
    display: "flex",
    gap: 20,
    position: "relative",
    alignItems: "center",
    flexWrap: "wrap",
  },

  catCard: {
    width: 150,
    height: 130,
    border: "1px solid #ddd",
    borderRadius: 10,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: ".2s",
    fontSize: 16,
  },

  catActive: {
    background: "#d9534f",
    color: "#fff",
    border: "1px solid #d9534f",
  },

  catIcon: { fontSize: 36, marginBottom: 8 },

  catArrow: {
    width: 40,
    height: 40,
    background: "#eee",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 20,
  },

  /* ------------------ New Arrival ------------------ */
  featuredLabel: {
    color: "#d00",
    fontWeight: 600,
    marginBottom: 5,
  },
  newArrivalTitle: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 25,
  },
  newGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gridTemplateRows: "300px 150px",
    gap: 20,
  },
  newCard: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  bigCard: {
    gridRow: "1 / 3",
  },
  mediumCard: {
    height: "300px",
  },
  smallCard: {
    height: "150px",
  },
  newImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(60%)",
  },
  newTextWrap: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "#fff",
  },
  newTitle: {
    fontSize: 22,
    fontWeight: 700,
  },
  newDesc: {
    fontSize: 14,
    maxWidth: 250,
    margin: "5px 0",
  },
  newShop: {
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "underline",
    cursor: "pointer",
  },

  /* Info Icons */
  infoRow: {
    marginTop: 60,
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
  },
  infoBox: {
    width: "30%",
  },
  infoIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  infoTitle: {
    fontWeight: 700,
    fontSize: 16,
  },
  infoText: {
    fontSize: 13,
    color: "#555",
  },
};
