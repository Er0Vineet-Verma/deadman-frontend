export const GlobalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: -apple-system, "SF Pro Text", BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
    background: #f5f5f7;
    color: #1d1d1f;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  /* ─── Ambient background ─── */
  .ambient {
    position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
  }
  .ambient-orb {
    position: absolute; border-radius: 50%; filter: blur(90px);
  }
  .ambient-orb-1 {
    width: 700px; height: 700px;
    background: rgba(180, 190, 215, 0.22);
    top: -200px; left: -150px;
  }
  .ambient-orb-2 {
    width: 600px; height: 600px;
    background: rgba(195, 195, 220, 0.18);
    bottom: -100px; right: -120px;
  }
  .ambient-orb-3 {
    width: 400px; height: 400px;
    background: rgba(200, 210, 230, 0.14);
    top: 40%; left: 55%;
  }

  /* ─── Scroll reveal ─── */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.08s; }
  .reveal-delay-2 { transition-delay: 0.16s; }
  .reveal-delay-3 { transition-delay: 0.24s; }
  .reveal-delay-4 { transition-delay: 0.32s; }
  .reveal-scale {
    opacity: 0;
    transform: scale(0.95) translateY(16px);
    transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal-scale.visible { opacity: 1; transform: scale(1) translateY(0); }

  /* ─── Keyframes ─── */
  @keyframes riseUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scrollBob {
    0%, 100% { transform: translateY(0); opacity: 0.8; }
    50% { transform: translateY(7px); opacity: 0.2; }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.04); }
  }

  /* ─── Navigation ─── */
  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 52px;
    background: rgba(245, 245, 247, 0.85);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
  .nav-logo {
    font-size: 15px; font-weight: 700; color: #1d1d1f; letter-spacing: -0.02em;
    display: flex; align-items: center; gap: 8px; user-select: none;
  }
  .nav-app-icon {
    width: 26px; height: 26px; border-radius: 7px; background: #1d1d1f;
    display: flex; align-items: center; justify-content: center; font-size: 13px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12);
  }
  .nav-links { display: flex; gap: 2px; }
  .nav-link {
    padding: 5px 12px; border-radius: 8px; font-size: 13px; font-weight: 500;
    cursor: pointer; border: none; background: transparent; color: #6e6e73;
    transition: background 0.18s, color 0.18s; font-family: inherit; letter-spacing: -0.01em;
  }
  .nav-link:hover { background: rgba(0,0,0,0.06); color: #1d1d1f; }
  .nav-link.active { background: rgba(0,0,0,0.08); color: #1d1d1f; }

  /* ─── Page wrapper ─── */
  .page-wrapper {
    position: relative; z-index: 1;
    max-width: 960px; margin: 0 auto; padding: 40px 24px 100px;
    animation: fadeIn 0.4s ease both;
  }

  /* ─── Glass surface mixin (applied inline or via class) ─── */
  .glass {
    background: rgba(255, 255, 255, 0.68);
    backdrop-filter: blur(24px) saturate(180%) brightness(1.02);
    -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(1.02);
    border: 1px solid rgba(255, 255, 255, 0.55);
    box-shadow:
      inset 0 1.5px 0 rgba(255,255,255,0.85),
      inset 0 -1px 0 rgba(0,0,0,0.04),
      0 8px 32px rgba(0,0,0,0.06);
  }

  /* ─── Section card ─── */
  .section {
    border-radius: 18px; padding: 24px; margin-bottom: 14px;
    background: rgba(255, 255, 255, 0.68);
    backdrop-filter: blur(24px) saturate(180%) brightness(1.02);
    -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(1.02);
    border: 1px solid rgba(255, 255, 255, 0.55);
    box-shadow:
      inset 0 1.5px 0 rgba(255,255,255,0.85),
      inset 0 -1px 0 rgba(0,0,0,0.04),
      0 4px 20px rgba(0,0,0,0.05);
    transition: box-shadow 0.2s ease;
  }
  .section:hover {
    box-shadow:
      inset 0 1.5px 0 rgba(255,255,255,0.9),
      inset 0 -1px 0 rgba(0,0,0,0.04),
      0 8px 32px rgba(0,0,0,0.08);
  }
  .section-title {
    font-size: 11px; font-weight: 700; color: #aeaeb2;
    text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px;
  }
  .section-danger {
    border-color: rgba(255, 59, 48, 0.2);
    background: rgba(255, 59, 48, 0.03);
  }
  .section-danger .section-title { color: #ff3b30; }

  /* ─── Stat grid ─── */
  .stat-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 12px; margin-bottom: 14px;
  }
  .stat-card {
    border-radius: 18px; padding: 22px;
    background: rgba(255, 255, 255, 0.68);
    backdrop-filter: blur(24px) saturate(180%) brightness(1.02);
    -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(1.02);
    border: 1px solid rgba(255, 255, 255, 0.55);
    box-shadow:
      inset 0 1.5px 0 rgba(255,255,255,0.85),
      inset 0 -1px 0 rgba(0,0,0,0.04),
      0 4px 20px rgba(0,0,0,0.05);
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
    cursor: default;
  }
  .stat-card:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow:
      inset 0 1.5px 0 rgba(255,255,255,0.9),
      inset 0 -1px 0 rgba(0,0,0,0.04),
      0 12px 36px rgba(0,0,0,0.1);
  }
  .stat-icon-wrap {
    width: 38px; height: 38px; border-radius: 11px;
    background: rgba(0,0,0,0.05);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; margin-bottom: 14px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
  }
  .stat-label {
    font-size: 11px; color: #aeaeb2; text-transform: uppercase;
    letter-spacing: 0.08em; margin-bottom: 4px; font-weight: 600;
  }
  .stat-value {
    font-size: 32px; font-weight: 700; color: #1d1d1f;
    letter-spacing: -0.03em; line-height: 1;
  }
  .stat-sub { font-size: 12px; color: #aeaeb2; margin-top: 5px; }

  /* ─── Form elements ─── */
  .field { margin-bottom: 16px; }
  label {
    display: block; font-size: 12px; font-weight: 600; color: #6e6e73;
    letter-spacing: 0.03em; margin-bottom: 7px;
  }

  input[type=text], input[type=email], input[type=number], input[type=tel], textarea {
    width: 100%; padding: 12px 15px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.10);
    border-radius: 12px; color: #1d1d1f; font-size: 15px;
    font-family: inherit; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.8);
    -webkit-appearance: none;
  }
  input:focus, textarea:focus {
    border-color: #0071e3;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.14), inset 0 1px 3px rgba(0,0,0,0.04);
  }
  input::placeholder, textarea::placeholder { color: #c7c7cc; }
  input:disabled { opacity: 0.38; cursor: not-allowed; }
  textarea { resize: vertical; min-height: 90px; line-height: 1.6; }

  /* ─── File upload ─── */
  .file-label {
    display: flex; align-items: center; gap: 12px; padding: 12px 15px;
    background: rgba(255,255,255,0.9); border: 1.5px dashed rgba(0,0,0,0.12);
    border-radius: 12px; cursor: pointer; color: #6e6e73; font-size: 14px;
    font-family: inherit; transition: border-color 0.2s, color 0.2s, background 0.2s;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.04);
  }
  .file-label:hover { border-color: #0071e3; color: #0071e3; background: rgba(0,113,227,0.03); }
  .file-label.has-file {
    border-color: #34c759; border-style: solid;
    background: rgba(52, 199, 89, 0.05); color: #1a7a3a;
  }
  .file-icon {
    width: 30px; height: 30px; border-radius: 8px;
    background: rgba(0,0,0,0.05);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
  }
  .file-label.has-file .file-icon { background: rgba(52,199,89,0.15); }
  input[type=file] { display: none; }

  /* ─── Divider ─── */
  .divider { height: 1px; background: rgba(0,0,0,0.07); margin: 20px 0; }
  .divider-label {
    display: flex; align-items: center; gap: 12px; margin: 20px 0; color: #aeaeb2; font-size: 12px;
  }
  .divider-label::before, .divider-label::after {
    content: ''; flex: 1; height: 1px; background: rgba(0,0,0,0.08);
  }

  /* ─── Days row ─── */
  .days-row { display: flex; align-items: center; gap: 10px; }
  .days-row input { flex: 1; }
  .days-badge {
    padding: 8px 14px;
    background: rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.08);
    border-radius: 20px; color: #1d1d1f; font-size: 13px;
    white-space: nowrap; font-weight: 600;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
  }

  /* ─── Buttons ─── */
  .btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 13px 20px; border: none; border-radius: 12px;
    font-size: 15px; font-weight: 600; font-family: inherit;
    cursor: pointer; transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, background 0.15s;
    letter-spacing: -0.01em; margin-top: 8px; -webkit-appearance: none;
  }
  .btn-primary {
    background: #0071e3; color: #fff;
    box-shadow: 0 2px 8px rgba(0,113,227,0.25), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  .btn-primary:hover { background: #0077ed; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,113,227,0.35); }
  .btn-primary:active { transform: translateY(0); }

  .btn-green {
    background: #34c759; color: #fff;
    box-shadow: 0 2px 8px rgba(52,199,89,0.25), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  .btn-green:hover { background: #30d158; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(52,199,89,0.35); }
  .btn-green:active { transform: translateY(0); }

  .btn-danger {
    background: #ff3b30; color: #fff;
    box-shadow: 0 2px 8px rgba(255,59,48,0.2), inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .btn-danger:hover { background: #ff453a; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,59,48,0.3); }
  .btn-danger:active { transform: translateY(0); }

  .btn-ghost {
    background: rgba(0,0,0,0.05); color: #1d1d1f;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
  }
  .btn-ghost:hover { background: rgba(0,0,0,0.08); transform: translateY(-1px); }

  .btn-outline {
    background: transparent; color: #0071e3;
    border: 1px solid rgba(0,113,227,0.3);
  }
  .btn-outline:hover { background: rgba(0,113,227,0.05); border-color: #0071e3; transform: translateY(-1px); }

  .btn:disabled { opacity: 0.38; cursor: not-allowed; transform: none !important; box-shadow: none !important; }

  /* ─── Pill button (hero CTAs) ─── */
  .btn-pill {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 14px 28px; border-radius: 980px; font-size: 15px; font-weight: 600;
    font-family: inherit; cursor: pointer; border: none; letter-spacing: -0.01em;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, background 0.15s;
  }
  .btn-pill-primary {
    background: #0071e3; color: #fff;
    box-shadow: 0 4px 16px rgba(0,113,227,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  .btn-pill-primary:hover { background: #0077ed; transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 28px rgba(0,113,227,0.4); }
  .btn-pill-secondary {
    background: rgba(0,0,0,0.06); color: #1d1d1f;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
  }
  .btn-pill-secondary:hover { background: rgba(0,0,0,0.09); transform: translateY(-2px) scale(1.02); }

  /* ─── Status messages ─── */
  .status {
    margin-top: 12px; padding: 12px 16px; border-radius: 10px;
    font-size: 13px; font-weight: 500; text-align: center;
    animation: riseUp 0.3s ease both; letter-spacing: -0.01em;
  }
  .status.success {
    background: rgba(52,199,89,0.1); color: #1a7a3a;
    border: 1px solid rgba(52,199,89,0.22);
  }
  .status.error {
    background: rgba(255,59,48,0.08); color: #bf1a10;
    border: 1px solid rgba(255,59,48,0.2);
  }
  .status.loading {
    background: rgba(0,113,227,0.07); color: #0058b8;
    border: 1px solid rgba(0,113,227,0.16);
  }

  /* ─── Recipients ─── */
  .recipient-row {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.06);
    transition: background 0.15s;
  }
  .recipient-row:last-child { border-bottom: none; }
  .recipient-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: rgba(0,0,0,0.07);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: #1d1d1f; flex-shrink: 0;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
  }
  .recipient-info { flex: 1; min-width: 0; }
  .recipient-name { font-size: 14px; color: #1d1d1f; font-weight: 600; letter-spacing: -0.01em; }
  .recipient-email { font-size: 12px; color: #6e6e73; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .priority-badge {
    font-size: 11px; color: #6e6e73; background: rgba(0,0,0,0.05);
    padding: 3px 10px; border-radius: 20px; font-weight: 600; white-space: nowrap;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
  }
  .recipient-remove {
    width: 26px; height: 26px; border-radius: 8px; flex-shrink: 0;
    background: rgba(255,59,48,0.08); border: none; cursor: pointer;
    color: #ff3b30; font-size: 12px; display: flex; align-items: center; justify-content: center;
    transition: background 0.18s, transform 0.18s;
  }
  .recipient-remove:hover { background: rgba(255,59,48,0.16); transform: scale(1.1); }

  .add-btn {
    width: 48px; height: 48px; flex-shrink: 0;
    background: #0071e3; border: none; border-radius: 12px;
    color: #fff; font-size: 22px; font-weight: 300; cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(0,113,227,0.25), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  .add-btn:hover { background: #0077ed; transform: scale(1.08) translateY(-1px); box-shadow: 0 6px 18px rgba(0,113,227,0.35); }

  /* ─── Activity log ─── */
  .log-row {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.05);
    font-size: 13px; color: #6e6e73; letter-spacing: -0.01em;
  }
  .log-row:last-child { border-bottom: none; }
  .log-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .log-dot.green { background: #34c759; box-shadow: 0 0 6px rgba(52,199,89,0.5); }
  .log-dot.blue  { background: #0071e3; box-shadow: 0 0 6px rgba(0,113,227,0.4); }
  .log-dot.orange { background: #ff9f0a; box-shadow: 0 0 6px rgba(255,159,10,0.4); }

  /* ─── Progress bar ─── */
  .progress-bar {
    height: 4px; background: rgba(0,0,0,0.07);
    border-radius: 2px; margin-top: 12px; overflow: hidden;
  }
  .progress-fill { height: 100%; border-radius: 2px; transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1); }

  /* ─── Two-column grid ─── */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  /* ─── Feature cards (landing) ─── */
  .feature-card {
    border-radius: 20px; padding: 28px;
    background: rgba(255, 255, 255, 0.68);
    backdrop-filter: blur(24px) saturate(180%) brightness(1.02);
    -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(1.02);
    border: 1px solid rgba(255, 255, 255, 0.55);
    box-shadow:
      inset 0 1.5px 0 rgba(255,255,255,0.85),
      inset 0 -1px 0 rgba(0,0,0,0.04),
      0 4px 20px rgba(0,0,0,0.05);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  }
  .feature-card:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow:
      inset 0 1.5px 0 rgba(255,255,255,0.9),
      inset 0 -1px 0 rgba(0,0,0,0.04),
      0 16px 44px rgba(0,0,0,0.09);
  }
  .feature-num {
    font-size: 11px; font-weight: 800; color: #0071e3;
    letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 14px;
  }
  .feature-icon {
    width: 46px; height: 46px; border-radius: 13px;
    background: rgba(0,0,0,0.05);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; margin-bottom: 16px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 6px rgba(0,0,0,0.06);
  }
  .feature-title {
    font-size: 18px; font-weight: 700; color: #1d1d1f;
    letter-spacing: -0.02em; margin-bottom: 8px;
  }
  .feature-desc { font-size: 14px; color: #6e6e73; line-height: 1.65; }

  /* ─── Form glass card (register) ─── */
  .form-glass {
    border-radius: 24px; padding: 36px 32px;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(28px) saturate(200%) brightness(1.02);
    -webkit-backdrop-filter: blur(28px) saturate(200%) brightness(1.02);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow:
      inset 0 1.5px 0 rgba(255,255,255,0.92),
      inset 0 -1px 0 rgba(0,0,0,0.04),
      0 20px 60px rgba(0,0,0,0.08);
  }

  /* ─── Responsive ─── */
  @media (max-width: 680px) {
    .two-col { grid-template-columns: 1fr; }
    .stat-grid { grid-template-columns: 1fr 1fr; }
    .nav { padding: 0 16px; }
    .page-wrapper { padding: 24px 16px 80px; }
    .form-glass { padding: 24px 20px; }
  }
  @media (max-width: 420px) {
    .stat-grid { grid-template-columns: 1fr; }
  }
`;

export const REGISTER_URL = "https://deadman-checker-gehcacg4dbanfhg2.canadacentral-01.azurewebsites.net/api/register";
export const CHECKIN_URL  = "https://deadman-checker-gehcacg4dbanfhg2.canadacentral-01.azurewebsites.net/api/checkin";
