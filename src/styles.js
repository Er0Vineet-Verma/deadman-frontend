export const GlobalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f0f4ff; min-height: 100vh; }

  .bg { position: fixed; inset: 0; z-index: 0; background: linear-gradient(135deg, #dce8fe 0%, #f8d7e8 50%, #d8f0e4 100%); overflow: hidden; }
  .blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.6; }
  .blob1 { width: 500px; height: 500px; background: radial-gradient(circle, #a8c8ff, #d4a8ff); top: -100px; left: -100px; animation: floatA 10s ease-in-out infinite alternate; }
  .blob2 { width: 400px; height: 400px; background: radial-gradient(circle, #ffb3c6, #ffd6a5); bottom: -80px; right: -80px; animation: floatB 12s ease-in-out infinite alternate; }
  .blob3 { width: 300px; height: 300px; background: radial-gradient(circle, #b5ead7, #c7f2a4); top: 50%; left: 55%; animation: floatC 14s ease-in-out infinite alternate; }
  .blob4 { width: 250px; height: 250px; background: radial-gradient(circle, #ffd6e7, #c9b8ff); top: 20%; right: 10%; animation: floatA 9s ease-in-out infinite alternate-reverse; }

  @keyframes floatA { from{transform:translate(0,0) scale(1);} to{transform:translate(40px,30px) scale(1.1);} }
  @keyframes floatB { from{transform:translate(0,0) scale(1.05);} to{transform:translate(-30px,-40px) scale(0.95);} }
  @keyframes floatC { from{transform:translate(0,0) scale(0.9);} to{transform:translate(-20px,30px) scale(1.1);} }

  .sparkle { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: white; opacity: 0; animation: sparkleAnim 4s ease-in-out infinite; }
  .sparkle:nth-child(1){top:15%;left:20%;animation-delay:0s;}
  .sparkle:nth-child(2){top:35%;left:70%;animation-delay:1s;}
  .sparkle:nth-child(3){top:70%;left:30%;animation-delay:2s;}
  .sparkle:nth-child(4){top:55%;left:80%;animation-delay:0.5s;}
  .sparkle:nth-child(5){top:80%;left:60%;animation-delay:1.5s;}
  .sparkle:nth-child(6){top:10%;left:55%;animation-delay:2.5s;}
  @keyframes sparkleAnim{0%,100%{opacity:0;transform:scale(0);}50%{opacity:0.8;transform:scale(1.5);}}

  .wrapper { position: relative; z-index: 1; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 16px; }

  .card { width: 100%; max-width: 480px; background: rgba(255,255,255,0.75); border: 1px solid rgba(255,255,255,0.95); border-radius: 28px; padding: 48px 44px; backdrop-filter: blur(24px); box-shadow: 0 8px 40px rgba(80,60,160,0.15), 0 2px 8px rgba(0,0,0,0.06); animation: riseUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
  @keyframes riseUp{from{opacity:0;transform:translateY(32px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);}}

  .icon-wrap { width: 56px; height: 56px; border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 26px; margin-bottom: 20px; animation: gentlePulse 3s ease-in-out infinite; }
  @keyframes gentlePulse{0%,100%{transform:scale(1);}50%{transform:scale(1.05);}}

  h1 { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 600; color: #1a1040; margin-bottom: 8px; line-height: 1.2; }
  h2 { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 600; color: #1a1040; margin-bottom: 8px; }
  .subtitle { font-size: 14px; color: #5a5278; margin-bottom: 36px; line-height: 1.7; font-weight: 400; }

  .field { margin-bottom: 20px; }
  label { display: block; font-size: 11px; font-weight: 600; color: #6b5f8a; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }

  input[type=text], input[type=email], input[type=number], input[type=tel] {
    width: 100%; padding: 14px 18px;
    background: rgba(255,255,255,0.92);
    border: 1.5px solid rgba(108,80,200,0.25);
    border-radius: 14px; color: #1a1040; font-size: 15px;
    font-family: 'Plus Jakarta Sans', sans-serif; outline: none;
    transition: all 0.25s ease;
    box-shadow: 0 2px 8px rgba(108,80,200,0.06);
  }
  input[type=text]:focus, input[type=email]:focus, input[type=number]:focus {
    border-color: #a8c8ff; background: #fff;
    box-shadow: 0 0 0 4px rgba(168,200,255,0.25);
    transform: translateY(-1px);
  }
  input::placeholder { color: #a89ec0; }

  textarea {
    width: 100%; padding: 14px 18px;
    background: rgba(255,255,255,0.92);
    border: 1.5px solid rgba(108,80,200,0.25);
    border-radius: 14px; color: #1a1040; font-size: 15px;
    font-family: 'Plus Jakarta Sans', sans-serif; outline: none;
    resize: vertical; min-height: 90px; transition: all 0.25s;
    box-shadow: 0 2px 8px rgba(108,80,200,0.06);
  }
  textarea::placeholder { color: #a89ec0; }
  textarea:focus { border-color: #a8c8ff; background: #fff; box-shadow: 0 0 0 4px rgba(168,200,255,0.25); }

  .file-label { display: flex; align-items: center; gap: 14px; padding: 14px 18px; background: rgba(255,255,255,0.92); border: 1.5px dashed rgba(108,80,200,0.3); border-radius: 14px; cursor: pointer; transition: all 0.25s ease; color: #6b5f8a; font-size: 14px; font-weight: 500; }
  .file-label:hover { border-color: #a8c8ff; background: rgba(168,200,255,0.08); color: #4a3d7a; transform: translateY(-1px); }
  .file-label.has-file { border-color: rgba(181,234,215,0.8); background: rgba(181,234,215,0.15); color: #2e7d5e; }
  .file-icon { width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #a8c8ff, #d4a8ff); display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
  .file-label.has-file .file-icon { background: linear-gradient(135deg, #b5ead7, #c7f2a4); }
  input[type=file] { display: none; }

  .divider { display: flex; align-items: center; gap: 12px; margin: 24px 0; }
  .divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(108,80,200,0.2), transparent); }
  .divider-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(108,80,200,0.3); }

  .days-row { display: flex; align-items: center; gap: 12px; }
  .days-row input { flex: 1; }
  .days-badge { padding: 8px 16px; background: linear-gradient(135deg, rgba(168,200,255,0.25), rgba(212,168,255,0.25)); border: 1px solid rgba(108,80,200,0.25); border-radius: 20px; color: #4a3d7a; font-size: 13px; white-space: nowrap; font-weight: 600; }

  .btn { width: 100%; padding: 16px; margin-top: 10px; border: none; border-radius: 14px; font-size: 15px; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer; transition: all 0.25s ease; letter-spacing: 0.02em; }
  .btn-primary { background: linear-gradient(135deg, #a8c8ff 0%, #d4a8ff 50%, #ffb3c6 100%); color: #1a1040; box-shadow: 0 4px 20px rgba(168,200,255,0.4); background-size: 200% 200%; animation: gradientShift 4s ease infinite; }
  .btn-green { background: linear-gradient(135deg, #b5ead7 0%, #c7f2a4 50%, #a8c8ff 100%); color: #1a3d2e; box-shadow: 0 4px 20px rgba(181,234,215,0.4); font-weight: 600; }
  .btn-danger { background: linear-gradient(135deg, #ffb3c6, #ffd6a5); color: #5a1a2e; box-shadow: 0 4px 20px rgba(255,179,198,0.4); font-weight: 600; }
  .btn-ghost { background: rgba(108,80,200,0.08); color: #4a3d7a; border: 1.5px solid rgba(108,80,200,0.2); font-weight: 600; }
  @keyframes gradientShift{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
  .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(168,200,255,0.5); }
  .btn:active { transform: translateY(0); }
  .btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; animation: none; }

  .status { margin-top: 16px; padding: 14px 18px; border-radius: 12px; font-size: 13px; text-align: center; animation: riseUp 0.3s ease both; font-weight: 500; }
  .status.success { background: rgba(181,234,215,0.35); color: #1e6b4a; border: 1px solid rgba(181,234,215,0.7); }
  .status.error { background: rgba(255,179,198,0.25); color: #8b1a3a; border: 1px solid rgba(255,179,198,0.6); }
  .status.loading { background: rgba(168,200,255,0.25); color: #2a4a8a; border: 1px solid rgba(168,200,255,0.5); }

  .nav { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: rgba(255,255,255,0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(108,80,200,0.1); position: sticky; top: 0; z-index: 10; }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 20px; color: #1a1040; font-weight: 600; }
  .nav-links { display: flex; gap: 8px; }
  .nav-link { padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; background: transparent; color: #6b5f8a; transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif; }
  .nav-link:hover { background: rgba(108,80,200,0.1); color: #1a1040; }
  .nav-link.active { background: rgba(108,80,200,0.12); color: #1a1040; }

  .page-wrapper { position: relative; z-index: 1; min-height: 100vh; padding: 32px 24px; max-width: 960px; margin: 0 auto; }

  .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 28px; }
  .stat-card { background: rgba(255,255,255,0.78); border: 1px solid rgba(255,255,255,0.95); border-radius: 20px; padding: 24px; backdrop-filter: blur(20px); box-shadow: 0 4px 16px rgba(80,60,160,0.08); }
  .stat-icon { font-size: 28px; margin-bottom: 12px; }
  .stat-label { font-size: 11px; color: #6b5f8a; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; font-weight: 600; }
  .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #1a1040; font-weight: 600; }
  .stat-sub { font-size: 12px; color: #5a5278; margin-top: 4px; font-weight: 500; }

  .section { background: rgba(255,255,255,0.78); border: 1px solid rgba(255,255,255,0.95); border-radius: 20px; padding: 28px; backdrop-filter: blur(20px); margin-bottom: 20px; box-shadow: 0 4px 16px rgba(80,60,160,0.08); }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; color: #1a1040; margin-bottom: 20px; font-weight: 600; }

  .recipient-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(108,80,200,0.08); }
  .recipient-row:last-child { border-bottom: none; }
  .recipient-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #a8c8ff, #d4a8ff); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600; color: #1a1040; flex-shrink: 0; }
  .recipient-info { flex: 1; }
  .recipient-name { font-size: 14px; color: #1a1040; font-weight: 600; }
  .recipient-email { font-size: 12px; color: #6b5f8a; font-weight: 500; }
  .recipient-remove { width: 28px; height: 28px; border-radius: 8px; background: rgba(255,179,198,0.25); border: none; cursor: pointer; color: #8b1a3a; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
  .recipient-remove:hover { background: rgba(255,179,198,0.5); }

  .add-recipient { display: grid; grid-template-columns: 1fr 1fr auto; gap: 10px; margin-top: 16px; align-items: end; }
  .add-btn { padding: 14px 20px; background: linear-gradient(135deg, #a8c8ff, #d4a8ff); border: none; border-radius: 14px; color: #1a1040; font-size: 20px; font-weight: 700; cursor: pointer; transition: all 0.2s; height: 50px; display: flex; align-items: center; justify-content: center; }
  .add-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(168,200,255,0.5); }

  .log-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(108,80,200,0.06); font-size: 13px; color: #5a5278; font-weight: 500; }
  .log-row:last-child { border-bottom: none; }
  .log-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .log-dot.green { background: #2e7d5e; }
  .log-dot.blue { background: #2a4a8a; }
  .log-dot.orange { background: #8a5a1a; }

  .progress-bar { height: 8px; background: rgba(108,80,200,0.12); border-radius: 4px; margin-top: 12px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 4px; transition: width 1s ease; }
`;

export const Background = () => (
  <>
    <div className="bg">
      <div className="blob blob1" /><div className="blob blob2" />
      <div className="blob blob3" /><div className="blob blob4" />
      <div className="sparkle" /><div className="sparkle" />
      <div className="sparkle" /><div className="sparkle" />
      <div className="sparkle" /><div className="sparkle" />
    </div>
  </>
);

export const REGISTER_URL = "https://deadman-checker-gehcacg4dbanfhg2.canadacentral-01.azurewebsites.net/api/register";
export const CHECKIN_URL = "https://deadman-checker-gehcacg4dbanfhg2.canadacentral-01.azurewebsites.net/api/checkin";