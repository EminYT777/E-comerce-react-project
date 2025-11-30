export default function Error() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1 style={{ fontSize: "80px" }}>404 Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>

      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          background: "#db4343",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "6px",
        }}
      >
        Back to home page
      </a>
    </div>
  );
}
