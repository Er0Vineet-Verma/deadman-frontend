import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStyles, REGISTER_URL } from "../styles";
import { useScrollReveal } from "../utils/scrollReveal";

export default function Vault() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "";
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [days, setDays] = useState(parseInt(localStorage.getItem("inactivityDays") || "30"));
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [rName, setRName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useScrollReveal([recipients]);

  useEffect(() => {
    if (!email) { navigate("/"); return; }
    const stored = localStorage.getItem("vaultData");
    if (stored) {
      const data = JSON.parse(stored);
      setRecipients(data.recipients || []);
      setMessage(data.message || "");
    }
  }, [email, navigate]);

  const addRecipient = () => {
    if (!rName || !rEmail) return;
    setRecipients([...recipients, { name: rName, email: rEmail }]);
    setRName(""); setREmail("");
  };

  const removeRecipient = (i) =>
    setRecipients(recipients.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setLoading(true);
    setStatus({ type: "loading", msg: "Saving changes…" });
    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, inactivityDays: days, message, recipients }),
      });
      if (response.ok) {
        localStorage.setItem("userName", name);
        localStorage.setItem("inactivityDays", days);
        const stored = localStorage.getItem("vaultData");
        const existing = stored ? JSON.parse(stored) : {};
        localStorage.setItem("vaultData", JSON.stringify({
          ...existing,
          recipients,
          message,
          logs: [
            { type: "blue", text: "Vault settings updated", time: new Date().toLocaleTimeString() },
            ...(existing.logs || []),
          ].slice(0, 10),
        }));
        setStatus({ type: "success", msg: "Vault updated successfully." });
      } else {
        setStatus({ type: "error", msg: "Something went wrong. Please try again." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Network error: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <style>{GlobalStyles}</style>

      <div className="ambient">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-app-icon">🕊️</div>
          Vault
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className="nav-link active">My Vault</button>
          <button className="nav-link" onClick={() => navigate("/")}>+ New</button>
        </div>
      </nav>

      <div className="page-wrapper">

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontSize: "clamp(26px, 5vw, 36px)",
              fontWeight: 700,
              color: "#1d1d1f",
              letterSpacing: "-0.03em",
              marginBottom: 4,
              animation: "riseUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            My vault
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#6e6e73",
              letterSpacing: "-0.01em",
              animation: "riseUp 0.5s 0.06s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            Update your settings, recipients, and content anytime.
          </p>
        </div>

        {/* Personal + Threshold */}
        <div className="two-col">
          <div className="section reveal">
            <div className="section-title">Personal details</div>
            <div className="field">
              <label>Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Email address (read-only)</label>
              <input type="email" value={email} disabled />
            </div>
          </div>

          <div className="section reveal reveal-delay-1">
            <div className="section-title">Inactivity threshold</div>
            <p style={{ fontSize: 13, color: "#6e6e73", marginBottom: 16, lineHeight: 1.65 }}>
              How many days before your vault triggers?
            </p>
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
        </div>

        {/* Message */}
        <div className="section reveal">
          <div className="section-title">Your message</div>
          <textarea
            placeholder="Write a message to your recipients…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ minHeight: 120 }}
          />
        </div>

        {/* File */}
        <div className="section reveal reveal-delay-1">
          <div className="section-title">Attachment</div>
          <label className={`file-label ${file ? "has-file" : ""}`}>
            <div className="file-icon">{file ? "✓" : "↑"}</div>
            <span>{file ? file.name : "Choose a new file to replace existing"}</span>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </label>
        </div>

        {/* Recipients */}
        <div className="section reveal">
          <div className="section-title">Recipients</div>

          {recipients.map((r, i) => (
            <div className="recipient-row" key={i}>
              <div className="recipient-avatar">{r.name[0].toUpperCase()}</div>
              <div className="recipient-info">
                <div className="recipient-name">{r.name}</div>
                <div className="recipient-email">{r.email}</div>
              </div>
              <span className="priority-badge">Priority {i + 1}</span>
              <button className="recipient-remove" onClick={() => removeRecipient(i)}>
                ✕
              </button>
            </div>
          ))}

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
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
              <button className="add-btn" onClick={addRecipient}>+</button>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="section reveal reveal-delay-1">
          <button
            className="btn btn-primary"
            style={{ marginTop: 0 }}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving…" : "Save changes →"}
          </button>
          {status && <div className={`status ${status.type}`}>{status.msg}</div>}
        </div>

        {/* Danger zone */}
        <div className="section section-danger reveal">
          <div className="section-title">Danger zone</div>
          <p style={{ fontSize: 13, color: "#6e6e73", marginBottom: 16, lineHeight: 1.65 }}>
            Permanently delete your vault. This cannot be undone — all files, recipients and
            settings will be removed.
          </p>
          {!showDelete ? (
            <button
              className="btn btn-danger"
              style={{ marginTop: 0 }}
              onClick={() => setShowDelete(true)}
            >
              Delete vault permanently
            </button>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="btn btn-danger"
                style={{ marginTop: 0 }}
                onClick={handleDelete}
              >
                Yes, delete everything
              </button>
              <button
                className="btn btn-ghost"
                style={{ marginTop: 0 }}
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
