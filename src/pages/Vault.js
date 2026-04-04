import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStyles, Background, REGISTER_URL } from "../styles";

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

  const removeRecipient = (i) => setRecipients(recipients.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setLoading(true);
    setStatus({ type: "loading", msg: "Saving changes..." });
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
            ...(existing.logs || [])
          ].slice(0, 10)
        }));
        setStatus({ type: "success", msg: "Vault updated successfully!" });
      } else {
        setStatus({ type: "error", msg: "Something went wrong. Try again." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Error: " + err.message });
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
      <Background />

      <nav className="nav">
        <div className="nav-logo">🕊️ Vault</div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className="nav-link active">My Vault</button>
          <button className="nav-link" onClick={() => navigate("/")}>+ New</button>
        </div>
      </nav>

      <div className="page-wrapper">
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ marginBottom: 4 }}>My vault</h1>
          <p className="subtitle" style={{ marginBottom: 0 }}>Update your settings, recipients, and content anytime.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          <div className="section">
            <div className="section-title">Personal details</div>
            <div className="field">
              <label>Your name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Your email (cannot change)</label>
              <input type="email" value={email} disabled style={{ opacity: 0.5, cursor: "not-allowed" }} />
            </div>
          </div>

          <div className="section">
            <div className="section-title">Inactivity threshold</div>
            <p style={{ fontSize: 13, color: "#5a5278", marginBottom: 16, lineHeight: 1.6, fontWeight: 500 }}>
              How many days of inactivity before your vault triggers?
            </p>
            <div className="days-row">
              <input type="number" min={1} max={365} value={days} onChange={e => setDays(Number(e.target.value))} />
              <span className="days-badge">{days} {days === 1 ? "day" : "days"}</span>
            </div>
          </div>

          <div className="section" style={{ gridColumn: "1 / -1" }}>
            <div className="section-title">Your message</div>
            <textarea
              placeholder="Write a message to your recipients..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>

          <div className="section" style={{ gridColumn: "1 / -1" }}>
            <div className="section-title">Your file</div>
            <label className={`file-label ${file ? "has-file" : ""}`}>
              <div className="file-icon">{file ? "✓" : "+"}</div>
              <span>{file ? file.name : "Choose a new file to replace existing"}</span>
              <input type="file" onChange={e => setFile(e.target.files[0])} />
            </label>
          </div>

          <div className="section" style={{ gridColumn: "1 / -1" }}>
            <div className="section-title">Recipients</div>
            {recipients.map((r, i) => (
              <div className="recipient-row" key={i}>
                <div className="recipient-avatar">{r.name[0].toUpperCase()}</div>
                <div className="recipient-info">
                  <div className="recipient-name">{r.name}</div>
                  <div className="recipient-email">{r.email}</div>
                </div>
                <span style={{ fontSize: 11, color: "#4a3d7a", background: "rgba(168,200,255,0.2)", padding: "4px 10px", borderRadius: 20, marginRight: 8, fontWeight: 600 }}>Priority {i + 1}</span>
                <button className="recipient-remove" onClick={() => removeRecipient(i)}>✕</button>
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              <input type="text" placeholder="Recipient name  e.g. John Smith" value={rName} onChange={e => setRName(e.target.value)} onKeyDown={e => e.key === "Enter" && addRecipient()} />
              <div style={{ display: "flex", gap: 10 }}>
                <input type="email" placeholder="Recipient email  e.g. john@gmail.com" value={rEmail} onChange={e => setREmail(e.target.value)} onKeyDown={e => e.key === "Enter" && addRecipient()} style={{ flex: 1 }} />
                <button className="add-btn" onClick={addRecipient}>+</button>
              </div>
            </div>
          </div>

          <div className="section" style={{ gridColumn: "1 / -1" }}>
            <button className="btn btn-primary" onClick={handleSave} disabled={loading} style={{ marginBottom: 12 }}>
              {loading ? "Saving..." : "Save changes →"}
            </button>
            {status && <div className={`status ${status.type}`}>{status.msg}</div>}
          </div>

          <div className="section" style={{ gridColumn: "1 / -1", border: "1.5px solid rgba(255,179,198,0.5)" }}>
            <div className="section-title" style={{ color: "#8b1a3a" }}>Danger zone</div>
            <p style={{ fontSize: 13, color: "#5a5278", marginBottom: 16, lineHeight: 1.6, fontWeight: 500 }}>
              Permanently delete your vault. This cannot be undone. All your files, recipients and settings will be removed.
            </p>
            {!showDelete ? (
              <button className="btn btn-danger" style={{ marginTop: 0 }} onClick={() => setShowDelete(true)}>
                Delete vault permanently
              </button>
            ) : (
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-danger" style={{ marginTop: 0 }} onClick={handleDelete}>Yes, delete everything</button>
                <button className="btn btn-ghost" style={{ marginTop: 0 }} onClick={() => setShowDelete(false)}>Cancel</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}