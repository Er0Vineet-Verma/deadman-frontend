import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStyles, REGISTER_URL } from "../styles";
import { useScrollReveal } from "../utils/scrollReveal";

const FEATURES = [
  {
    num: "01",
    icon: "⏱",
    title: "Set your threshold",
    desc: "Choose how many days of inactivity trigger your vault — anywhere from 1 to 365 days.",
  },
  {
    num: "02",
    icon: "✉️",
    title: "Write your message",
    desc: "Compose a personal message and optionally attach a file your recipients will receive.",
  },
  {
    num: "03",
    icon: "👥",
    title: "Add recipients",
    desc: "Add the trusted people who will be notified if you go quiet for too long.",
  },
];

export default function Register() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [days, setDays] = useState(30);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [rName, setRName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useScrollReveal([]);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const addRecipient = () => {
    if (!rName || !rEmail) return;
    setRecipients([...recipients, { name: rName, email: rEmail }]);
    setRName("");
    setREmail("");
  };

  const removeRecipient = (i) =>
    setRecipients(recipients.filter((_, idx) => idx !== i));

  const handleRegister = async () => {
    if (!email || !name) {
      setStatus({ type: "error", msg: "Please fill in your name and email." });
      return;
    }
    if (recipients.length === 0) {
      setStatus({ type: "error", msg: "Please add at least one recipient." });
      return;
    }
    setLoading(true);
    setStatus({ type: "loading", msg: "Activating your vault…" });
    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, inactivityDays: days, message, recipients }),
      });
      if (response.ok) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", name);
        localStorage.setItem("inactivityDays", days);
        localStorage.setItem(
          "vaultData",
          JSON.stringify({
            recipients,
            message,
            lastLogin: new Date().toISOString(),
            logs: [{ type: "green", text: "Vault activated", time: new Date().toLocaleTimeString() }],
          })
        );
        setStatus({ type: "success", msg: "Vault activated — redirecting…" });
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setStatus({ type: "error", msg: "Something went wrong. Please try again." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Network error: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{GlobalStyles}</style>

      {/* Ambient background */}
      <div className="ambient">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      {/* ── Hero Section ── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
          overflow: "hidden",
        }}
      >
        {/* App icon */}
        <div
          style={{
            width: 86,
            height: 86,
            borderRadius: 24,
            background: "#1d1d1f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            marginBottom: 32,
            boxShadow: "0 20px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.14)",
            animation: "riseUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          🕊️
        </div>

        <h1
          style={{
            fontSize: "clamp(42px, 8vw, 76px)",
            fontWeight: 700,
            color: "#1d1d1f",
            letterSpacing: "-0.04em",
            lineHeight: 1.04,
            marginBottom: 18,
            animation: "riseUp 0.8s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          Deadman Switch
        </h1>

        <p
          style={{
            fontSize: 19,
            color: "#6e6e73",
            maxWidth: 420,
            lineHeight: 1.65,
            marginBottom: 44,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            animation: "riseUp 0.8s 0.16s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          Your most important message, delivered when it matters most.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "riseUp 0.8s 0.24s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <button className="btn-pill btn-pill-primary" onClick={scrollToForm}>
            Get started
          </button>
          <button
            className="btn-pill btn-pill-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Go to dashboard
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "riseUp 1s 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "#aeaeb2",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 22,
              height: 38,
              border: "1.5px solid rgba(0,0,0,0.12)",
              borderRadius: 11,
              display: "flex",
              justifyContent: "center",
              paddingTop: 6,
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                width: 3,
                height: 7,
                background: "#aeaeb2",
                borderRadius: 2,
                animation: "scrollBob 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "100px 24px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <div className="reveal" style={{ textAlign: "center", marginBottom: 56 }}>
          <p
            style={{
              fontSize: 12,
              color: "#0071e3",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            How it works
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              color: "#1d1d1f",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Peace of mind in three steps
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 16,
          }}
        >
          {FEATURES.map((f, i) => (
            <div key={f.num} className={`feature-card reveal reveal-delay-${i + 1}`}>
              <div className="feature-num">{f.num}</div>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Registration Form Section ── */}
      <section
        ref={formRef}
        style={{
          position: "relative",
          zIndex: 1,
          padding: "20px 24px 120px",
          maxWidth: 580,
          margin: "0 auto",
        }}
      >
        <div className="reveal" style={{ textAlign: "center", marginBottom: 40 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: 700,
              color: "#1d1d1f",
              letterSpacing: "-0.03em",
              marginBottom: 10,
            }}
          >
            Activate your vault
          </h2>
          <p style={{ fontSize: 16, color: "#6e6e73", letterSpacing: "-0.01em" }}>
            Set up takes less than two minutes.
          </p>
        </div>

        <div className="form-glass reveal">
          {/* Personal details */}
          <div className="field">
            <label>Your name</label>
            <input
              type="text"
              placeholder="e.g. Vineet Verma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Your email</label>
            <input
              type="email"
              placeholder="e.g. you@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="divider" />

          {/* Inactivity threshold */}
          <div className="field">
            <label>Inactivity threshold</label>
            <div className="days-row">
              <input
                type="number"
                min={1}
                max={365}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              />
              <span className="days-badge">
                {days} {days === 1 ? "day" : "days"}
              </span>
            </div>
          </div>

          {/* Message */}
          <div className="field">
            <label>Your message (optional)</label>
            <textarea
              placeholder="Write something for your recipients…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* File */}
          <div className="field">
            <label>Attachment (optional)</label>
            <label className={`file-label ${file ? "has-file" : ""}`}>
              <div className="file-icon">{file ? "✓" : "↑"}</div>
              <span>{file ? file.name : "Choose a file to send to recipients"}</span>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </label>
          </div>

          <div className="divider-label">Recipients</div>

          {/* Recipients list */}
          {recipients.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              {recipients.map((r, i) => (
                <div className="recipient-row" key={i}>
                  <div className="recipient-avatar">{r.name[0].toUpperCase()}</div>
                  <div className="recipient-info">
                    <div className="recipient-name">{r.name}</div>
                    <div className="recipient-email">{r.email}</div>
                  </div>
                  <span className="priority-badge">#{i + 1}</span>
                  <button className="recipient-remove" onClick={() => removeRecipient(i)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add recipient */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              type="text"
              placeholder="Recipient name"
              value={rName}
              onChange={(e) => setRName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addRecipient()}
            />
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="email"
                placeholder="Recipient email"
                value={rEmail}
                onChange={(e) => setREmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addRecipient()}
                style={{ flex: 1 }}
              />
              <button className="add-btn" onClick={addRecipient} title="Add recipient">
                +
              </button>
            </div>
          </div>

          {recipients.length === 0 && (
            <p style={{ fontSize: 12, color: "#c7c7cc", marginTop: 10 }}>
              Enter a name and email above, then press + to add a recipient.
            </p>
          )}

          <button
            className="btn btn-primary"
            style={{ marginTop: 24 }}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Activating…" : "Activate vault protection →"}
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: 18,
              fontSize: 13,
              color: "#6e6e73",
            }}
          >
            Already registered?{" "}
            <span
              style={{ color: "#0071e3", cursor: "pointer", fontWeight: 600 }}
              onClick={() => navigate("/dashboard")}
            >
              Go to dashboard →
            </span>
          </p>

          {status && <div className={`status ${status.type}`}>{status.msg}</div>}
        </div>
      </section>
    </>
  );
}
