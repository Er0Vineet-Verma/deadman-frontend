import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStyles, Background, REGISTER_URL } from "../styles";

export default function Register() {
  const navigate = useNavigate();
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

  const addRecipient = () => {
    if (!rName || !rEmail) return;
    setRecipients([...recipients, { name: rName, email: rEmail }]);
    setRName(""); setREmail("");
  };

  const removeRecipient = (i) => setRecipients(recipients.filter((_, idx) => idx !== i));

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
    setStatus({ type: "loading", msg: "Activating your vault..." });
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
        localStorage.setItem("vaultData", JSON.stringify({
          recipients,
          message,
          lastLogin: new Date().toISOString(),
          logs: [{ type: "green", text: "Vault activated", time: new Date().toLocaleTimeString() }]
        }));
        setStatus({ type: "success", msg: "Vault activated! Redirecting to dashboard..." });
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setStatus({ type: "error", msg: "Something went wrong. Try again." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Error: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  const extraStyles = `
    h1 { color: #1a1040 !important; }
    .subtitle { color: #5a5278 !important; }
    label { color: #6b5f8a !important; font-weight: 600 !important; }
    input[type=text], input[type=email], input[type=number], textarea {
      color: #1a1040 !important;
      border-color: rgba(108,80,200,0.25) !important;
      background: rgba(255,255,255,0.92) !important;
    }
    input::placeholder, textarea::placeholder { color: #a89ec0 !important; }
    .recipient-name { color: #1a1040 !important; font-weight: 500; }
    .recipient-email { color: #6b5f8a !important; }
    .days-badge { color: #4a3d7a !important; font-weight: 600 !important; }
    .file-label { color: #6b5f8a !important; border-color: rgba(108,80,200,0.3) !important; }
  `;

  return (
    <>
      <style>{GlobalStyles}</style>
      <style>{extraStyles}</style>
      <Background />
      <div className="wrapper">
        <div className="card" style={{ maxWidth: 520 }}>
          <div className="icon-wrap" style={{ background: "linear-gradient(135deg, #a8c8ff, #d4a8ff)", boxShadow: "0 4px 20px rgba(168,200,255,0.5)" }}>🕊️</div>
          <h1>Activate vault protection</h1>
          <p className="subtitle">A gentle guardian for your important files. If you go quiet for too long, we'll make sure your message gets through.</p>

          <div className="field">
            <label>Your name *</label>
            <input type="text" placeholder="e.g. Vineet Verma" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div className="field">
            <label>Your email *</label>
            <input type="email" placeholder="e.g. you@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>

          <div className="field">
            <label>Inactivity threshold *</label>
            <div className="days-row">
              <input type="number" min={1} max={365} value={days} onChange={e => setDays(Number(e.target.value))} />
              <span className="days-badge">{days} {days === 1 ? "day" : "days"}</span>
            </div>
          </div>

          <div className="field">
            <label>Your message (optional)</label>
            <textarea
              placeholder="Write a message to your recipients..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.92)", border: "1.5px solid rgba(108,80,200,0.25)", borderRadius: 14, color: "#1a1040", fontSize: 15, fontFamily: "'Plus Jakarta Sans', sans-serif", outline: "none", resize: "vertical", minHeight: 90, transition: "all 0.25s" }}
            />
          </div>

          <div className="field">
            <label>Your file (optional)</label>
            <label className={`file-label ${file ? "has-file" : ""}`}>
              <div className="file-icon">{file ? "✓" : "+"}</div>
              <span>{file ? file.name : "Choose a file to send to recipients"}</span>
              <input type="file" onChange={e => setFile(e.target.files[0])} />
            </label>
          </div>

          <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>

          <div className="field">
            <label>Recipients * (add at least one)</label>
            {recipients.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                {recipients.map((r, i) => (
                  <div className="recipient-row" key={i}>
                    <div className="recipient-avatar">{r.name[0].toUpperCase()}</div>
                    <div className="recipient-info">
                      <div className="recipient-name">{r.name}</div>
                      <div className="recipient-email">{r.email}</div>
                    </div>
                    <span style={{ fontSize: 11, color: "#6b5f8a", background: "rgba(168,200,255,0.2)", padding: "4px 10px", borderRadius: 20, marginRight: 8 }}>#{i + 1}</span>
                    <button className="recipient-remove" onClick={() => removeRecipient(i)}>✕</button>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                type="text"
                placeholder="Recipient name  e.g. John Smith"
                value={rName}
                onChange={e => setRName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addRecipient()}
              />
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="email"
                  placeholder="Recipient email  e.g. john@gmail.com"
                  value={rEmail}
                  onChange={e => setREmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addRecipient()}
                  style={{ flex: 1 }}
                />
                <button
                  className="add-btn"
                  onClick={addRecipient}
                  title="Add recipient"
                >+</button>
              </div>
            </div>
            {recipients.length === 0 && (
              <p style={{ fontSize: 12, color: "#a89ec0", marginTop: 8 }}>
                Fill in name and email above, then click + to add a recipient.
              </p>
            )}
          </div>

          <button className="btn btn-primary" onClick={handleRegister} disabled={loading}>
            {loading ? "Activating..." : "Activate vault protection →"}
          </button>

          <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#6b5f8a" }}>
            Already registered?{" "}
            <span style={{ color: "#4a3d7a", cursor: "pointer", fontWeight: 600 }} onClick={() => navigate("/dashboard")}>
              Go to dashboard →
            </span>
          </p>

          {status && <div className={`status ${status.type}`}>{status.msg}</div>}
        </div>
      </div>
    </>
  );
}