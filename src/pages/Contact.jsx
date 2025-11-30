import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validate = () => {
        let newErrors = {};

        if (!form.name.trim()) newErrors.name = "Name is required";

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!form.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{7,15}$/.test(form.phone)) {
            newErrors.phone = "Phone must be 7–15 digits";
        }

        if (!form.message.trim()) newErrors.message = "Message cannot be empty";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
        setTouched({ ...touched, [field]: true });
    };

    const isValid = (field) => !errors[field] && form[field].trim() !== "";

    const handleSubmit = () => {
        if (!validate()) {
            setTouched({
                name: true,
                email: true,
                phone: true,
                message: true,
            });
            return;
        }

        setSuccess(true);

        setTimeout(() => {
            navigate("/");
        }, 2500);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                gap: "50px",
                padding: "40px 20px",
                fontFamily: "sans-serif",
                position: "relative",
            }}
        >
            {success && (
                <div
                    style={{
                        position: "fixed",
                        top: "20px",
                        right: "20px",
                        background: "#4CAF50",
                        color: "white",
                        padding: "12px 20px",
                        borderRadius: "6px",
                        fontSize: "16px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                        transition: "0.3s",
                        zIndex: 1000,
                    }}
                >
                    Message sent successfully! Redirecting...
                </div>
            )}

            <div
                style={{
                    width: "330px",
                    padding: "30px",
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.08)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <div
                        style={{
                            width: "45px",
                            height: "45px",
                            background: "#e43d3d",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "22px",
                            marginRight: "12px",
                        }}
                    >
                        ☎
                    </div>
                    <h3 style={{ margin: 0, fontSize: "20px" }}>Call To Us</h3>
                </div>

                <p>We are available 24/7, 7 days a week.</p>
                <p style={{ fontWeight: "bold", marginBottom: "20px" }}>
                    Phone: +88016111122222
                </p>

                <hr />

                <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                    <div
                        style={{
                            width: "45px",
                            height: "45px",
                            background: "#e43d3d",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "22px",
                            marginRight: "12px",
                        }}
                    >
                        ✉
                    </div>
                    <h3 style={{ margin: 0, fontSize: "20px" }}>Write To Us</h3>
                </div>

                <p style={{ marginTop: "20px" }}>
                    Fill out our form and we will contact you within 24 hours.
                </p>

                <p>Emails: customer@exclusive.com</p>
                <p>Emails: support@exclusive.com</p>
            </div>

            <div
                style={{
                    width: "650px",
                    padding: "30px",
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.08)",
                }}
            >
                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                    <div style={{ width: "100%" }}>
                        <input
                            type="text"
                            placeholder="Your Name *"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            onBlur={() => validate()}
                            style={{
                                ...inputStyle,
                                border: touched.name
                                    ? isValid("name")
                                        ? "2px solid #4CAF50"
                                        : "2px solid #e43d3d"
                                    : "1px solid #ddd",
                            }}
                        />
                        {errors.name && touched.name && (
                            <p style={errorText}>{errors.name}</p>
                        )}
                    </div>

                    <div style={{ width: "100%" }}>
                        <input
                            type="email"
                            placeholder="Your Email *"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            onBlur={() => validate()}
                            style={{
                                ...inputStyle,
                                border: touched.email
                                    ? isValid("email")
                                        ? "2px solid #4CAF50"
                                        : "2px solid #e43d3d"
                                    : "1px solid #ddd",
                            }}
                        />
                        {errors.email && touched.email && (
                            <p style={errorText}>{errors.email}</p>
                        )}
                    </div>

                    <div style={{ width: "100%" }}>
                        <input
                            type="text"
                            placeholder="Your Phone *"
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            onBlur={() => validate()}
                            style={{
                                ...inputStyle,
                                border: touched.phone
                                    ? isValid("phone")
                                        ? "2px solid #4CAF50"
                                        : "2px solid #e43d3d"
                                    : "1px solid #ddd",
                            }}
                        />
                        {errors.phone && touched.phone && (
                            <p style={errorText}>{errors.phone}</p>
                        )}
                    </div>
                </div>
                <div>
                    <textarea
                        placeholder="Your Message"
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        onBlur={() => validate()}
                        style={{
                            width: "100%",
                            height: "180px",
                            padding: "12px",
                            borderRadius: "6px",
                            resize: "none",
                            outline: "none",
                            fontSize: "14px",
                            background: "#f7f7f7",
                            border: touched.message
                                ? isValid("message")
                                    ? "2px solid #4CAF50"
                                    : "2px solid #e43d3d"
                                : "1px solid #ddd",
                        }}
                    />
                    {errors.message && touched.message && (
                        <p style={errorText}>{errors.message}</p>
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    style={{
                        background: "#e43d3d",
                        color: "white",
                        border: "none",
                        padding: "12px 30px",
                        borderRadius: "6px",
                        fontSize: "16px",
                        cursor: "pointer",
                        float: "right",
                        marginTop: "15px",
                    }}
                >
                    Send Message
                </button>
            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    background: "#f3f3f3",
    outline: "none",
    fontSize: "14px",
};

const errorText = {
    color: "#e43d3d",
    fontSize: "13px",
    marginTop: "5px",
};
