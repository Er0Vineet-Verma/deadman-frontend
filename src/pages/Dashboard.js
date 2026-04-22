import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStyles, CHECKIN_URL } from "../styles";
import { useScrollReveal } from "../utils/scrollReveal";

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

  useScrollReveal([daysLeft, recipients, logs]);

  useEffect(() => {
    if (!email) { navigate("/"); return; }
    const stored = localStorage.getItem("vaultData");
    if (stored) {
      const data = JSON.parse(stored);
      setRecipients(data.recipients || []);
      setLogs(data.logs || []);
      if (data.lastLogin) {
        const last = new Date(data.lastLogin);
        const daysSince = Math.floor((new Date() - last) / (1000 * 60 * 60 * 24));
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
    setStatus({ type: "loading", msg: "Recording check-in…" });
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
          logs: updatedLogs,
        }));
        setStatus({ type: "success", msg: `Timer reset — you're good for another ${inactivityDays} days.` });
      } else {
        setStatus({ type: "error", msg: "Something went wrong. Please try again." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Network error: " + err.message });
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

  const progressPct = daysLeft !== null
    ? Math.max(0, Math.min(100, (daysLeft / inactivityDays) * 100))
    : 100;
  const progressColor =
    progressPct > 50 ? "#34c759" : progressPct > 20 ? "#ff9f0a" : "#ff3b30";

  const firstName = name.split(" ")[0];

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
          <button className="nav-link active">Dashboard</button>
          <button className="nav-link" onClick={() => navigate("/vault")}>My Vault</button>
          <button className="nav-link" onClick={() => navigate("/")}>+ New</button>
        </div>
      </nav>

      <div className="page-wrapper">

        {/* Greeting */}
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
            Welcome back, {firstName}
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#6e6e73",
              letterSpacing: "-0.01em",
              animation: "riseUp 0.5s 0.06s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            Your vault is{" "}
            <span style={{ color: paused ? "#ff9f0a" : "#34c759", fontWeight: 600 }}>
              {paused ? "paused" : "active"}
            </span>{" "}
            and protecting your files.
          </p>
        </div>

        {/* Stat cards */}
        <div className="stat-grid">
          {[
            {
              icon: "⏳",
              label: "Days left",
              value: daysLeft ?? "—",
              sub: "before vault triggers",
              color: progressColor,
              progress: true,
              delay: "0.08s",
            },
            {
              icon: "✓",
              label: "Last activity",
              value: lastActivity ?? "—",
              sub: "last check-in",
              valueSize: 22,
              delay: "0.14s",
            },
            {
              icon: "👥",
              label: "Recipients",
              value: recipients.length,
              sub: "will be notified",
              delay: "0.20s",
            },
            {
              icon: paused ? "⏸" : "⬡",
              label: "Status",
              value: paused ? "Paused" : "Active",
              sub: paused ? "emails suspended" : "monitoring active",
              valueSize: 20,
              delay: "0.26s",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="stat-card"
              style={{ animation: `riseUp 0.6s ${card.delay} cubic-bezier(0.16, 1, 0.3, 1) both` }}
            >
              <div className="stat-icon-wrap">{card.icon}</div>
              <div className="stat-label">{card.label}</div>
              <div
                className="stat-value"
                style={{
                  color: card.color || "#1d1d1f",
                  fontSize: card.valueSize,
                }}
              >
                {card.value}
              </div>
              <div className="stat-sub">{card.sub}</div>
              {card.progress && (
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: progressPct + "%", background: progressColor }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions + Pause */}
        <div className="two-col">
          <div className="section reveal">
            <div className="section-title">Quick actions</div>
            <button
              className="btn btn-green"
              style={{ marginTop: 0, marginBottom: 10 }}
              onClick={handleCheckin}
              disabled={loading}
            >
              {loading ? "Checking in…" : "I'm still here ✓"}
            </button>
            <button
              className="btn btn-ghost"
              style={{ marginTop: 0 }}
              onClick={() => navigate("/vault")}
            >
              Edit my vault →
            </button>
            {status && <div className={`status ${status.type}`}>{status.msg}</div>}
          </div>

          <div className="section reveal reveal-delay-1">
            <div className="section-title">Emergency pause</div>
            <p
              style={{
                fontSize: 13,
                color: "#6e6e73",
                marginBottom: 16,
                lineHeight: 1.65,
                letterSpacing: "-0.01em",
              }}
            >
              Temporarily suspend the system. No emails will be sent during this period.
            </p>
            <div className="days-row" style={{ marginBottom: 12 }}>
              <input
                type="number"
                min={1}
                max={30}
                value={pauseDays}
                onChange={(e) => setPauseDays(Number(e.target.value))}
              />
              <span className="days-badge">{pauseDays} days</span>
            </div>
            <button
              className="btn btn-danger"
              style={{ marginTop: 0 }}
              onClick={handlePause}
              disabled={paused}
            >
              {paused ? "System paused ⏸" : "Pause system ⏸"}
            </button>
          </div>
        </div>

        {/* Recipients */}
        <div className="section reveal" style={{ gridColumn: "1 / -1" }}>
          <div className="section-title">Recipients</div>
          {recipients.length === 0 ? (
            <p style={{ fontSize: 13, color: "#6e6e73" }}>
              No recipients added yet.{" "}
              <span
                style={{ color: "#0071e3", cursor: "pointer", fontWeight: 600 }}
                onClick={() => navigate("/")}
              >
                Add recipients →
              </span>
            </p>
          ) : (
            recipients.map((r, i) => (
              <div className="recipient-row" key={i}>
                <div className="recipient-avatar">{r.name[0].toUpperCase()}</div>
                <div className="recipient-info">
                  <div className="recipient-name">{r.name}</div>
                  <div className="recipient-email">{r.email}</div>
                </div>
                <span className="priority-badge">Priority {i + 1}</span>
              </div>
            ))
          )}
        </div>

        {/* Activity log */}
        <div className="section reveal reveal-delay-1">
          <div className="section-title">Activity log</div>
          {logs.length === 0 ? (
            <p style={{ fontSize: 13, color: "#6e6e73" }}>No activity yet.</p>
          ) : (
            logs.map((log, i) => (
              <div className="log-row" key={i}>
                <div className={`log-dot ${log.type}`} />
                <span style={{ flex: 1 }}>{log.text}</span>
                <span style={{ fontSize: 11, color: "#aeaeb2", fontWeight: 600 }}>
                  {log.time}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}
