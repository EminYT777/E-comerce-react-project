import React from "react";

export default function About() {
    return (
        <>
            {/* --- ОСНОВНОЙ БЛОК (ТЕКСТ + КАРТИНКА) --- */}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: "60px",
                    padding: "40px 20px",
                }}
            >
                {/* --- ТЕКСТ --- */}
                <div
                    style={{
                        padding: "20px 25px",
                        maxWidth: "500px",
                        fontFamily: "sans-serif",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "36px",
                            fontWeight: "700",
                            marginBottom: "15px",
                            display: "inline-block",
                            paddingBottom: "5px",
                        }}
                    >
                        Our Story
                    </h1>

                    <p
                        style={{
                            fontSize: "15px",
                            lineHeight: "1.6",
                            marginBottom: "16px",
                            paddingTop: "10px",
                        }}
                    >
                        Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace
                        with an active presence in Bangladesh. Supported by wide range of tailored
                        marketing, data and service solutions, Exclusive has 10,500 sellers and 300
                        brands and serves 3 millions customers across the region.
                    </p>

                    <p
                        style={{
                            fontSize: "15px",
                            lineHeight: "1.6",
                            paddingTop: "10px",
                        }}
                    >
                        Exclusive has more than 1 Million products to offer, growing at a very fast.
                        Exclusive offers a diverse assortment in categories ranging from consumer.
                    </p>
                </div>

                {/* --- КАРТИНКА --- */}
                <img
                    src="https://image-tc.galaxy.tf/wijpeg-5hwpt4qbfrteko9t5pkqcyqn3/shopping-resize_standard.jpg?crop=69%2C0%2C1783%2C1337"
                    alt="About us"
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        borderRadius: "12px",
                    }}
                />
            </div>

            {/* --- КАРТОЧКИ МЕТРИК --- */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "60px",
                    padding: "20px",
                    fontFamily: "sans-serif",
                }}
            >
                {/* 1 */}
                <div
                    style={{
                        width: "220px",
                        border: "2px solid #000000ff",
                        borderRadius: "8px",
                        padding: "25px",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: "40px", marginBottom: "10px" }}>🏪</div>
                    <h2 style={{ fontSize: "26px", fontWeight: "700" }}>10.5k</h2>
                    <p style={{ marginTop: "8px" }}>Sellers active our site</p>
                </div>

                {/* 2 */}
                <div
                    style={{
                        width: "220px",
                        border: "2px solid #000000ff",
                        borderRadius: "8px",
                        padding: "25px",
                        textAlign: "center",
                        background: "#e43d3d",
                        color: "white",
                    }}
                >
                    <div style={{ fontSize: "40px", marginBottom: "10px" }}>💲</div>
                    <h2 style={{ fontSize: "26px", fontWeight: "700" }}>33k</h2>
                    <p style={{ marginTop: "8px" }}>Monthly Product Sale</p>
                </div>

                {/* 3 */}
                <div
                    style={{
                        width: "220px",
                        border: "2px solid #000000ff",
                        borderRadius: "8px",
                        padding: "25px",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: "40px", marginBottom: "10px" }}>🎁</div>
                    <h2 style={{ fontSize: "26px", fontWeight: "700" }}>45.5k</h2>
                    <p style={{ marginTop: "8px" }}>Customer active in our site</p>
                </div>

                {/* 4 */}
                <div
                    style={{
                        width: "220px",
                        border: "2px solid #000000ff",
                        borderRadius: "8px",
                        padding: "25px",
                        textAlign: "center",
                    }}
                >
                    <div style={{ fontSize: "40px", marginBottom: "10px" }}>💰</div>
                    <h2 style={{ fontSize: "26px", fontWeight: "700" }}>25k</h2>
                    <p style={{ marginTop: "8px" }}>Annual gross sale in our site</p>
                </div>
            </div>

            {/* ========================================================= */}
            {/* --- TEAM SECTION (3 карточки) --- */}
            {/* ========================================================= */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "40px",
                    marginTop: "80px",
                    fontFamily: "sans-serif",
                    padding: "20px",
                }}
            >
                {/* --- ЧЕЛОВЕК 1 --- */}
                <div style={{ textAlign: "center", maxWidth: "260px" }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/The_White_House_-_54409525537_%28cropped%29.jpg/250px-The_White_House_-_54409525537_%28cropped%29.jpg"
                        alt="Team member 1"
                        style={{
                            width: "100%",
                            borderRadius: "10px",
                            marginBottom: "15px",
                        }}
                    />
                    <h3 style={{ margin: "5px 0", fontSize: "20px" }}>Elon Musk</h3>
                    <p style={{ margin: "0 0 10px", fontSize: "14px" }}>Company Director</p>
                    <i className="bi bi-facebook m-3"></i>
                    <i className="bi bi-twitter m-3"></i>
                    <i className="bi bi-instagram m-3" ></i>
                </div>

                {/* --- ЧЕЛОВЕК 2 --- */}
                <div style={{ textAlign: "center", maxWidth: "260px" }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/88/Bill_Gates_at_the_European_Commission_-_2025_-_P067383-987995_%28cropped%29.jpg"
                        alt="Team member 2"
                        style={{
                            width: "100%",
                            borderRadius: "10px",
                            marginBottom: "15px",
                        }}
                    />
                    <h3 style={{ margin: "5px 0", fontSize: "20px" }}>Bill Gates</h3>
                    <p style={{ margin: "0 0 10px", fontSize: "14px" }}>Managing Director</p>
                    <i className="bi bi-facebook m-3"></i>
                    <i className="bi bi-twitter m-3"></i>
                    <i className="bi bi-instagram m-3" ></i>
                </div>

                {/* --- ЧЕЛОВЕК 3 --- */}
                <div style={{ textAlign: "center", maxWidth: "260px" }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg"
                        alt="Team member 3"
                        style={{
                            width: "100%",
                            borderRadius: "10px",
                            marginBottom: "15px",
                        }}
                    />
                    <h3 style={{ margin: "5px 0", fontSize: "20px" }}>Mark Zuckerberg</h3>
                    <p style={{ margin: "0 0 10px", fontSize: "14px" }}>Product Designer</p>
                    <i className="bi bi-facebook m-3"></i>
                    <i className="bi bi-twitter m-3"></i>
                    <i className="bi bi-instagram m-3" ></i>
                </div>
            </div>

            {/* ========================================================= */}
            {/* --- SERVICE FEATURES --- */}
            {/* ========================================================= */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "80px",
                    marginTop: "80px",
                    marginBottom: "60px",
                    textAlign: "center",
                    fontFamily: "sans-serif",
                }}
            >
                {/* 1 */}
                <div style={{ maxWidth: "200px" }}>
                    <div
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            background: "#000",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "26px",
                            margin: "0 auto 10px",
                        }}
                    >
                        🚚
                    </div>
                    <h4>FREE AND FAST DELIVERY</h4>
                    <p style={{ fontSize: "13px", marginTop: "5px" }}>
                        Free delivery for all orders over $140
                    </p>
                </div>

                {/* 2 */}
                <div style={{ maxWidth: "200px" }}>
                    <div
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            background: "#000",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "26px",
                            margin: "0 auto 10px",
                        }}
                    >
                        🎧
                    </div>
                    <h4>24/7 CUSTOMER SERVICE</h4>
                    <p style={{ fontSize: "13px", marginTop: "5px" }}>
                        Friendly 24/7 customer support
                    </p>
                </div>

                {/* 3 */}
                <div style={{ maxWidth: "200px" }}>
                    <div
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            background: "#000",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "26px",
                            margin: "0 auto 10px",
                        }}
                    >
                        ✔️
                    </div>
                    <h4>MONEY BACK GUARANTEE</h4>
                    <p style={{ fontSize: "13px", marginTop: "5px" }}>
                        We return money within 30 days
                    </p>
                </div>
            </div>
        </>
    );
}
