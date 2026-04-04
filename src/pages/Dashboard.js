import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStyles, Background, CHECKIN_URL } from "../styles";

export default function Dashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "";
  const name = localStorage.getItem("userName") || "User";
  const inactivityDays = parseInt(localStorage.getItem("inactivityDays") || "30");

  const [daysLeft, setDaysLeft] = useState(null);
  const [lastActivity, setLastActivity] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [logs, setLogs] = useState([]);
  const [paused, setPaused] = useState(false);
  const [pauseDays, setPauseDays] = useState(7);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) { navigate("/"); return; }
    const stored = localStorage.getItem("vaultData");
    if (stored) {
      const data = JSON.parse(stored);
      setRecipients(data.recipients || []);
      setLogs(data.logs || []);
      if (data.lastLogin) {
        const last = new Date(data.lastLogin);
        const now = new Date();
        const daysSince = Math.floor((now - last) / (1000 * 60 * 60 * 24));
        setDaysLeft(inactivityDays - daysSince);
        setLastActivity(last.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }));
      }
    } else {
      setDaysLeft(inactivityDays);
      setLastActivity("Today");
      setLogs([{ type: "green", text: "Vault activated", time: "Just now" }]);
    }
  }, [email, navigate, inactivityDays]);

  const handleCheckin = async () => {
    setLoading(true);
    setStatus({ type: "loading", msg: "Recording check-in..." });
    try {
      const response = await fetch(CHECKIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        const now = new Date();
        setDaysLeft(inactivityDays);
        setLastActivity("Today");
        const newLog = { type: "green", text: "Check-in recorded", time: now.toLocaleTimeString() };
        const updatedLogs = [newLog, ...logs].slice(0, 10);
        setLogs(updatedLogs);
        localStorage.setItem("vaultData", JSON.stringify({
          lastLogin: now.toISOString(),
          recipients,
          logs: updatedLogs
        }));
        setStatus({ type: "success", msg: "Timer reset! You're good for another " + inactivityDays + " days." });
      } else {
        setStatus({ type: "error", msg: "Something went wrong. Try again." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Error: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePause = () => {
    setPaused(true);
    const newLog = { type: "orange", text: `System paused for ${pauseDays} days`, time: new Date().toLocaleTimeString() };
    const updatedLogs = [newLog, ...logs].slice(0, 10);
    setLogs(updatedLogs);
    setStatus({ type: "success", msg: `System paused for ${pauseDays} days. No emails will be sent.` });
  };

  const progressPct = daysLeft !== null ? Math.max(0, Math.min(100, (daysLeft / inactivityDays) * 100)) : 100;
  const progressColor = progressPct > 50 ? "#2e7d5e" : progressPct > 20 ? "#8a5a1a" : "#8b1a3a";

  return (
    <>
      <style>{GlobalStyles}</style>
      <Background />

      <nav className="nav">
        <div className="nav-logo">🕊️ Vault</div>
        <div className="nav-links">
          <button className="nav-link active">Dashboard</button>
          <button className="nav-link" onClick={() => navigate("/vault")}>My Vault</button>
          <button className="nav-link" onClick={() => navigate("/")}>+ New</button>
        </div>
      </nav>

      <div className="page-wrapper">
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ marginBottom: 4 }}>Welcome back, {name.split(" ")[0]} 👋</h1>
          <p className="subtitle" style={{ marginBottom: 0 }}>Your vault is {paused ? "paused" : "active"} and protecting your files.</p>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-label">Days left</div>
            <div className="stat-value" style={{ color: progressColor }}>{daysLeft ?? "—"}</div>
            <div className="stat-sub">before vault triggers</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: progressPct + "%", background: progressColor }} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-label">Last activity</div>
            <div className="stat-value" style={{ fontSize: 22, paddingTop: 6 }}>{lastActivity ?? "—"}</div>
            <div className="stat-sub">last check-in</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-label">Recipients</div>
            <div className="stat-value">{recipients.length}</div>
            <div className="stat-sub">will be notified</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">{paused ? "⏸️" : "🛡️"}</div>
            <div className="stat-label">Status</div>
            <div className="stat-value" style={{ fontSize: 18, paddingTop: 8 }}>{paused ? "Paused" : "Active"}</div>
            <div className="stat-sub">{paused ? "emails suspended" : "monitoring active"}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="section">
            <div className="section-title">Quick actions</div>
            <button className="btn btn-green" style={{ marginBottom: 10, marginTop: 0 }} onClick={handleCheckin} disabled={loading}>
              {loading ? "Checking in..." : "I'm still here ✓"}
            </button>
            <button className="btn btn-ghost" style={{ marginTop: 0 }} onClick={() => navigate("/vault")}>
              Edit my vault →
            </button>
            {status && <div className={`status ${status.type}`}>{status.msg}</div>}
          </div>

          <div className="section">
            <div className="section-title">Emergency pause</div>
            <p style={{ fontSize: 13, color: "#5a5278", marginBottom: 16, lineHeight: 1.6, fontWeight: 500 }}>
              Temporarily pause the system. No emails will be sent during this period.
            </p>
            <div className="days-row" style={{ marginBottom: 12 }}>
              <input type="number" min={1} max={30} value={pauseDays} onChange={e => setPauseDays(Number(e.target.value))} />
              <span className="days-badge">{pauseDays} days</span>
            </div>
            <button className="btn btn-danger" style={{ marginTop: 0 }} onClick={handlePause} disabled={paused}>
              {paused ? "System paused ⏸️" : "Pause system ⏸️"}
            </button>
          </div>

          <div className="section" style={{ gridColumn: "1 / -1" }}>
            <div className="section-title">Recipients</div>
            {recipients.length === 0 ? (
              <p style={{ fontSize: 13, color: "#6b5f8a", fontWeight: 500 }}>
                No recipients added yet.{" "}
                <span style={{ color: "#4a3d7a", cursor: "pointer", fontWeight: 700 }} onClick={() => navigate("/")}>Add recipients →</span>
              </p>
            ) : (
              recipients.map((r, i) => (
                <div className="recipient-row" key={i}>
                  <div className="recipient-avatar">{r.name[0].toUpperCase()}</div>
                  <div className="recipient-info">
                    <div className="recipient-name">{r.name}</div>
                    <div className="recipient-email">{r.email}</div>
                  </div>
                  <span style={{ fontSize: 11, color: "#4a3d7a", background: "rgba(168,200,255,0.2)", padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>Priority {i + 1}</span>
                </div>
              ))
            )}
          </div>

          <div className="section" style={{ gridColumn: "1 / -1" }}>
            <div className="section-title">Activity log</div>
            {logs.length === 0 ? (
              <p style={{ fontSize: 13, color: "#6b5f8a", fontWeight: 500 }}>No activity yet.</p>
            ) : (
              logs.map((log, i) => (
                <div className="log-row" key={i}>
                  <div className={`log-dot ${log.type}`} />
                  <span style={{ flex: 1 }}>{log.text}</span>
                  <span style={{ fontSize: 11, color: "#6b5f8a", fontWeight: 600 }}>{log.time}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}