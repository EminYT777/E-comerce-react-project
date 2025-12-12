import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Home() {
  const navigate = useNavigate();

  const bannerImages = [
    "https://m-cdn.phonearena.com/images/hub/238-wide-two_1200/Apple-iPhone-14-release-date-price-and-features.jpg",
    "https://www.apple.com/v/iphone-17-pro/c/images/meta/iphone-17-pro_overview__er68vecct16q_og.png?202510300415",
    "https://zagrangid.com/wp-content/uploads/iphone16.jpg",
  ];

  const [slide, setSlide] = useState(0);
  const next = () => setSlide((s) => (s + 1) % bannerImages.length);
  const prev = () => setSlide((s) => (s === 0 ? bannerImages.length - 1 : s - 1));

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, []);

  function getDailyCountdown() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);

    const t = tomorrow - now;
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

  const [timeLeft, setTimeLeft] = useState(getDailyCountdown());
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getDailyCountdown()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.page}>
      <main style={styles.main}>


        <section style={styles.banner}>
          <div>
            <h4 style={{ color: "#ffffffff", marginBottom: 8 }}>iPhone 17 Series</h4>
            <h1 style={styles.bannerTitle}>Up to 10% off Voucher</h1>

            <Link to="/shop" style={styles.shopButton}>
              Shop Now →
            </Link>
          </div>

          <div style={styles.sliderWrap}>
            <img src={bannerImages[slide]} alt="banner" style={styles.bannerImg} />

            <button style={styles.arrowLeft} onClick={prev}>‹</button>
            <button style={styles.arrowRight} onClick={next}>›</button>
          </div>
        </section>


        <section style={{ marginTop: 80 }}>
          <div style={styles.redLabel}>Featured</div>
          <h2 style={styles.sectionTitle}>Shop Collection</h2>

          <div style={styles.collectionGrid}>

            <div style={styles.collectionLeft}
              className="collection-card"
            >
              <img
                src="https://static.elitoptimal.az/ElitOptimal/79c4bf03-2a01-476f-a4c4-fa66f83416c0_Thumb.jpeg"
                style={styles.imgBig}
              />
              <h3 style={styles.collectionTitle}>Headband</h3>
              <Link to="/shop" style={styles.collectionLink}>Collection →</Link>
            </div>

            <div style={styles.collectionRight}>
              <div style={styles.collectionSmall} className="collection-card">
                <h3 style={styles.collectionTitle}>Airpods Pro</h3>
                <Link to="/shop" style={styles.collectionLink}>Collection →</Link>
                <img
                  src="https://cdn.road.cc/sites/default/files/styles/main_width/public/2021-apple-airpods-pro.jpg"
                  style={styles.imgSmall}
                />
              </div>

              <div style={styles.collectionSmall} className="collection-card">
                <h3 style={styles.collectionTitle}>Accessories</h3>
                <Link to="/shop" style={styles.collectionLink}>Collection →</Link>
                <img
                  src="https://strgimgr.umico.az/img/product/840/e5f8daef-37af-4f83-a840-7e21a2810bc6.jpeg"
                  style={styles.imgSmall}
                />
              </div>
            </div>
          </div>
        </section>


        <section style={{ marginTop: 100 }}>
          <div style={styles.redLabel}>Special Promotion</div>
          <h2 style={styles.sectionTitle}>Hurry Up! 40% OFF</h2>

          <div style={styles.promoGrid}>
            <img
              src="https://www.meme-arsenal.com/memes/8f2089c5cab98a792aebae7711cf2190.jpg"
              style={styles.promoImg}
            />

            <div style={styles.promoContent}>
              <h2 style={{ fontSize: 36 }}>Limited Time Offer</h2>
              <p style={{ color: "#555", width: 280 }}>
                Thousands of high-tech products are waiting for you.
              </p>

              <div style={styles.timerRow}>
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Minutes", val: timeLeft.minutes },
                  { label: "Seconds", val: timeLeft.seconds },
                ].map((t) => (
                  <div key={t.label} style={styles.timerBlock}>
                    <div style={styles.timerNumber}>{t.val}</div>
                    <div style={styles.timerLabel}>{t.label}</div>
                  </div>
                ))}
              </div>

              <Link to="/shop" style={styles.promoButton}>Shop Now</Link>
            </div>
          </div>
        </section>


        <section style={{ marginTop: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <div style={{ width: 12, height: 20, background: "#d00", borderRadius: 2 }}></div>
            <span style={{ color: "#d00", fontWeight: 600 }}>Our Products</span>
          </div>

          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 25 }}>Special promotion</h2>

          <div
            style={{
              background: "#1c1c25",
              borderRadius: 14,
              padding: "70px 60px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <div>
              <div style={{ opacity: 0.7, marginBottom: 10 }}>Pro. Beyond.</div>

              <h1 style={{ fontSize: 54, fontWeight: 700, margin: 0 }}>
                IPhone 17 pro max <span style={{ color: "#fff" }}>Pro</span>
              </h1>

              <p style={{ marginTop: 10, opacity: 0.7, maxWidth: 350 }}>
                Created to change everything for the better.
                For everyone
              </p>

              <button
                onClick={() => navigate("/shop")}
                style={{
                  marginTop: 30,
                  padding: "14px 30px",
                  border: "1px solid #fff",
                  background: "transparent",
                  color: "#fff",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 16,
                }}
              >
                Shop Now
              </button>
            </div>

            <img
              src="https://static.technote.az/media/posts/thumbnail/Apple-iPhone-17-Pro-camera-close-up-250909_big.jpg.large_2x.jpeg"
              style={{
                width: "100%",
                objectFit: "contain",
                justifySelf: "end",
              }}
            />
          </div>
        </section>


        <section style={{ marginTop: 120 }}>


          <Container className="text-center mb-5">
            <h2 className="text-danger" style={{ fontSize: 34, fontWeight: 700 }}>
              Feedback Corner
            </h2>
          </Container>


          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 30,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: 35,
                borderRadius: 12,
                boxShadow: "0 0 25px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: 40, color: "#d00" }}>“</div>
              <h3 style={{ marginTop: 5, marginBottom: 10 }}>Emily Wilson</h3>
              <p style={{ opacity: 0.7 }}>
                The customer experience was exceptional from start to finish. The website is user-friendly,
                the checkout process was smooth, and the clothes I ordered fit perfectly. I’m beyond satisfied!
              </p>
            </div>

            <div
              style={{
                background: "#f9e3e3",
                padding: 35,
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: 40, color: "#d00" }}>“</div>
              <h3 style={{ marginTop: 5, marginBottom: 10 }}>Sarah Thompson</h3>
              <p style={{ opacity: 0.7 }}>
                I absolutely love the quality and style of the clothing I purchased.
                Customer service was outstanding, and my order arrived quickly.
                Highly recommended!
              </p>
            </div>

            <div
              style={{
                background: "#fff",
                padding: 35,
                borderRadius: 12,
                boxShadow: "0 0 25px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ fontSize: 40, color: "#d00" }}>“</div>
              <h3 style={{ marginTop: 5, marginBottom: 10 }}>Olivia Martinez</h3>
              <p style={{ opacity: 0.7 }}>
                I had a great experience shopping on this website. The clothes I bought are fashionable
                and comfortable. Highly satisfied!
              </p>
            </div>
          </div>
        </section>


        <section style={{ marginTop: 120 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <div style={{ width: 12, height: 20, background: "#d00", borderRadius: 2 }}></div>
            <span style={{ color: "#d00", fontWeight: 600 }}>Our Products</span>
          </div>

          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 35 }}>
            Explore Our Products
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 25,
            }}
          >
            <div
              style={{
                background: "#f3f5f7",
                borderRadius: 12,
                padding: "30px 25px",
                textAlign: "center",
              }}
            >
              <img
                src="https://cdn0.it4profit.com/s3size/el:t/rt:fill/plain/s3://cms/product/3f/6d/3f6d9919916a6b670582e90692a99c5a/250915140014016549.webp"
                style={{ width: "75%", marginBottom: 20 }}
              />
              <h3 style={{ fontWeight: 600 }}>Popular Products</h3>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 20 }}>
                iPod combines incredible performance, multitasking and ease of use.
              </p>
              <button
                onClick={() => navigate("/shop")}
                style={{
                  padding: "10px 24px",
                  background: "#000",
                  color: "#fff",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Shop Now
              </button>
            </div>

            <div
              style={{
                background: "#f3f5f7",
                borderRadius: 12,
                padding: "30px 25px",
                textAlign: "center",
              }}
            >
              <img
                src="https://kontakt.az/media/catalog/product/cache/a404967cc40694dc557cd869288440a4/N/e/New-Project-31_1_1.jpg"
                style={{ width: "85%", marginBottom: 20 }}
              />
              <h3 style={{ fontWeight: 600 }}>Ipad Pro</h3>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 20 }}>
                iPad contains a magnificent 10.2-inch Retina display, incredible performance.
              </p>
              <button
                onClick={() => navigate("/shop")}
                style={{
                  padding: "10px 24px",
                  background: "#000",
                  color: "#fff",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Shop Now
              </button>
            </div>

            <div
              style={{
                background: "#f3f5f7",
                borderRadius: 12,
                padding: "30px 25px",
                textAlign: "center",
              }}
            >
              <img
                src="https://kontakt.az/media/catalog/product/cache/a252e3db3d11365dd1457895056a5f34/t/m/tm-dg-sbp-1105-sm-2647_12.png"
                style={{ width: "70%", marginBottom: 20 }}
              />
              <h3 style={{ fontWeight: 600 }}>Samsung Galaxy</h3>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 20 }}>
                Samsung combines a magnificent 12-inch design, multitasking and power.
              </p>
              <button
                onClick={() => navigate("/shop")}
                style={{
                  padding: "10px 24px",
                  background: "#000",
                  color: "#fff",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Shop Now
              </button>
            </div>

            <div
              style={{
                background: "#1c1c25",
                borderRadius: 12,
                padding: "30px 25px",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4RnqL3BRteUchsR4S_rhSaG3UqQlcESUK8w&s"
                style={{ width: "80%", marginBottom: 20 }}
              />
              <h3 style={{ fontWeight: 600 }}>Macbook Pro</h3>
              <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 20 }}>
                iPad contains a magnificent 12-inch Retina display, performance and multitasking.
              </p>
              <button
                onClick={() => navigate("/shop")}
                style={{
                  padding: "10px 24px",
                  background: "#fff",
                  color: "#000",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Shop Now
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}


const styles = {
  page: { display: "flex", justifyContent: "center", padding: 20, background: "#fafafa" },
  main: { width: "100%", maxWidth: 1200 },

  banner: {
    background: "#000",
    color: "#fff",
    padding: 40,
    borderRadius: 14,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerTitle: { fontSize: 42, fontWeight: 700 },
  shopButton: {
    display: "inline-block",
    marginTop: 20,
    padding: "12px 26px",
    background: "#fff",
    color: "#000",
    fontWeight: 600,
    borderRadius: 8,
    textDecoration: "none",
    transition: "0.3s",
  },

  sliderWrap: { position: "relative" },
  bannerImg: {
    width: 500,
    height: 300,
    borderRadius: 14,
    objectFit: "cover",
  },
  arrowLeft: {
    position: "absolute",
    left: -50,
    top: "50%",
    transform: "translateY(-50%)",
    background: "#ffffff40",
    border: "none",
    fontSize: 32,
    padding: 10,
    cursor: "pointer",
    borderRadius: 8,
  },
  arrowRight: {
    position: "absolute",
    right: -50,
    top: "50%",
    transform: "translateY(-50%)",
    background: "#ffffff40",
    border: "none",
    fontSize: 32,
    padding: 10,
    cursor: "pointer",
    borderRadius: 8,
  },

  redLabel: { color: "#d00", fontWeight: 600, marginBottom: 5 },
  sectionTitle: { fontSize: 32, fontWeight: 700, marginBottom: 25 },

  collectionGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 20,
  },

  collectionLeft: {
    background: "#f3f5f7",
    padding: 30,
    borderRadius: 14,
    position: "relative",
  },

  collectionRight: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gap: 20,
  },

  collectionSmall: {
    background: "#f3f5f7",
    padding: 30,
    borderRadius: 14,
    position: "relative",
  },

  imgBig: {
    width: "90%",
    height: "auto",
    marginBottom: 20,
    objectFit: "contain",
  },

  imgSmall: {
    width: "60%",
    position: "absolute",
    right: 20,
    bottom: 20,
  },

  collectionTitle: {
    fontSize: 22,
    fontWeight: 700,
  },

  collectionLink: {
    marginTop: 6,
    display: "inline-block",
    fontSize: 14,
    color: "#000",
    opacity: 0.7,
    textDecoration: "none",
  },

  promoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    borderRadius: 14,
    overflow: "hidden",
  },

  promoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  promoContent: {
    background: "#f5f5f5",
    padding: 40,
  },

  timerRow: { display: "flex", gap: 15, margin: "25px 0" },

  timerBlock: {
    background: "#fff",
    padding: "12px 16px",
    borderRadius: 10,
    minWidth: 70,
    textAlign: "center",
  },
  timerNumber: { fontSize: 22, fontWeight: 700 },
  timerLabel: { fontSize: 12, opacity: 0.6 },

  promoButton: {
    padding: "12px 28px",
    background: "#000",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
    display: "inline-block",
    fontWeight: 600,
  },
};
