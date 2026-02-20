const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #09090f;
    --surface: #111118;
    --surface2: #1a1a24;
    --border: #2a2a38;
    --text: #f0f0f8;
    --muted: #7070a0;
    --accent: #a78bfa;
    --accent2: #6366f1;
    --success: #10b981;
    --danger: #f43f5e;
    --warning: #f59e0b;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .app {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ── Nav ── */
  .nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid var(--border); margin-bottom: 36px; }
  .nav-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem; background: linear-gradient(135deg, #a78bfa, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .nav-tabs { display: flex; gap: 4px; }
  .nav-tab { background: none; border: none; color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: 0.9rem; padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
  .nav-tab:hover { color: var(--text); background: var(--surface2); }
  .nav-tab.active { color: var(--accent); background: rgba(167,139,250,0.1); }

  /* ── Page headers ── */
  .page-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.8rem; margin-bottom: 6px; }
  .page-sub { color: var(--muted); margin-bottom: 28px; font-size: 0.9rem; }

  /* ── Shared buttons ── */
  .btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; border-radius: 10px; padding: 10px 20px; color: white; font-family: 'DM Sans', sans-serif; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
  .btn-primary:hover { opacity: 0.9; }
  .btn-outline { background: none; border: 1px solid var(--border); border-radius: 10px; padding: 10px 20px; color: var(--text); font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); }
  .back-btn { display: inline-flex; align-items: center; gap: 6px; background: none; border: 1px solid var(--border); border-radius: 8px; padding: 8px 14px; color: var(--muted); cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; margin-bottom: 24px; transition: all 0.2s; }
  .back-btn:hover { border-color: var(--accent); color: var(--accent); }

  /* ── Form elements ── */
  .form-input { background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.9rem; outline: none; transition: border-color 0.2s; width: 100%; }
  .form-input:focus { border-color: var(--accent); }
  .form-input.error { border-color: var(--danger); }
  .form-label { font-size: 0.8rem; font-weight: 600; color: var(--muted); letter-spacing: 0.3px; text-transform: uppercase; }
  .form-error { font-size: 0.75rem; color: var(--danger); }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-group.full { grid-column: 1 / -1; }

  /* ── Feedback states ── */
  .loading { display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 12px; padding: 60px; color: var(--muted); }
  .spinner { width: 36px; height: 36px; border: 3px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .error-box { background: rgba(244,63,94,0.08); border: 1px solid rgba(244,63,94,0.3); border-radius: 10px; padding: 16px; color: var(--danger); text-align: center; margin: 20px 0; }
  .empty-state { text-align: center; padding: 60px 20px; color: var(--muted); }

  /* ── Status badges ── */
  .status-badge { padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; flex-shrink: 0; }
  .status-pending   { background: rgba(245,158,11,0.15); color: var(--warning); }
  .status-confirmed { background: rgba(16,185,129,0.15); color: var(--success); }
  .status-completed { background: rgba(99,102,241,0.15); color: var(--accent2); }
  .status-cancelled { background: rgba(244,63,94,0.1);  color: var(--danger); }

  /* ── Expert list ── */
  .controls { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }
  .search-box { flex: 1; min-width: 200px; position: relative; }
  .search-input { width: 100%; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 10px 16px 10px 40px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.9rem; outline: none; transition: border-color 0.2s; }
  .search-input:focus { border-color: var(--accent); }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); }
  .filter-scroll { display: flex; gap: 8px; flex-wrap: wrap; }
  .filter-btn { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 8px 14px; color: var(--muted); font-size: 0.82rem; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .filter-btn:hover { border-color: var(--accent); color: var(--accent); }
  .filter-btn.active { background: rgba(167,139,250,0.15); border-color: var(--accent); color: var(--accent); }
  .experts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-bottom: 36px; }

  /* ── Expert card ── */
  .expert-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 22px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden; }
  .expert-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--accent), var(--accent2)); opacity: 0; transition: opacity 0.25s; }
  .expert-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,102,241,0.15); }
  .expert-card:hover::before { opacity: 1; }
  .card-top { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 14px; }
  .card-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 4px; }
  .card-cat { display: inline-block; font-size: 0.72rem; font-weight: 500; padding: 2px 8px; border-radius: 20px; }
  .card-bio { font-size: 0.83rem; color: var(--muted); line-height: 1.5; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .card-stats { display: flex; gap: 16px; padding-top: 14px; border-top: 1px solid var(--border); }
  .stat { display: flex; flex-direction: column; gap: 2px; }
  .stat-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; }
  .stat-label { font-size: 0.72rem; color: var(--muted); }
  .rating { color: #f59e0b; font-weight: 600; font-size: 0.9rem; }

  /* ── Avatar ── */
  .avatar       { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; flex-shrink: 0; }
  .avatar-large { width: 80px; height: 80px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.6rem; flex-shrink: 0; }

  /* ── Pagination ── */
  .pagination { display: flex; justify-content: center; gap: 8px; padding-bottom: 40px; }
  .page-btn { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 8px 14px; color: var(--muted); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .page-btn.active { background: var(--accent2); border-color: var(--accent2); color: white; }
  .page-btn:hover:not(.active) { border-color: var(--accent); color: var(--accent); }
  .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  /* ── Expert detail ── */
  .detail-header { display: flex; gap: 20px; align-items: flex-start; margin-bottom: 32px; padding: 28px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; }
  .detail-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.6rem; margin-bottom: 8px; }
  .detail-bio { color: var(--muted); line-height: 1.6; margin-bottom: 16px; font-size: 0.9rem; }
  .detail-meta { display: flex; gap: 20px; flex-wrap: wrap; }
  .meta-chip { background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 6px 12px; font-size: 0.82rem; }

  /* ── Slots ── */
  .slots-section { margin-bottom: 32px; }
  .slots-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.1rem; margin-bottom: 16px; }
  .date-group { margin-bottom: 20px; }
  .date-label { font-size: 0.82rem; font-weight: 600; color: var(--muted); letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 10px; }
  .slots-row { display: flex; flex-wrap: wrap; gap: 8px; }
  .slot-btn { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 8px 14px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; color: var(--text); }
  .slot-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); background: rgba(167,139,250,0.08); }
  .slot-btn.booked   { background: rgba(244,63,94,0.08); border-color: rgba(244,63,94,0.3); color: var(--muted); cursor: not-allowed; text-decoration: line-through; }
  .slot-btn.selected { background: rgba(167,139,250,0.15); border-color: var(--accent); color: var(--accent); font-weight: 600; }
  .realtime-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--success); margin-left: 12px; }
  .pulse-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--success); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.3); } }
  .book-cta { width: 100%; background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; border-radius: 12px; padding: 14px; color: white; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; cursor: pointer; transition: opacity 0.2s; margin-top: 8px; }
  .book-cta:hover:not(:disabled) { opacity: 0.9; }
  .book-cta:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── Booking form ── */
  .booking-form { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 28px; max-width: 600px; margin: 0 auto; }
  .form-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem; margin-bottom: 6px; }
  .form-subtitle { color: var(--muted); font-size: 0.87rem; margin-bottom: 24px; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-summary { background: var(--surface2); border-radius: 10px; padding: 14px; margin: 16px 0; border-left: 3px solid var(--accent); }
  .summary-row { display: flex; justify-content: space-between; font-size: 0.84rem; padding: 4px 0; }
  .summary-row span:first-child { color: var(--muted); }
  .submit-btn { width: 100%; background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; border-radius: 12px; padding: 14px; color: white; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; cursor: pointer; margin-top: 16px; transition: opacity 0.2s; }
  .submit-btn:hover:not(:disabled) { opacity: 0.9; }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── Success ── */
  .success-card { background: var(--surface); border: 1px solid rgba(16,185,129,0.3); border-radius: 16px; padding: 40px; text-align: center; max-width: 600px; margin: 0 auto; }
  .success-icon  { font-size: 3rem; margin-bottom: 16px; }
  .success-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.5rem; margin-bottom: 8px; color: var(--success); }
  .success-msg   { color: var(--muted); line-height: 1.6; margin-bottom: 24px; }
  .success-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  /* ── My Bookings ── */
  .email-lookup { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 24px; margin-bottom: 24px; }
  .email-lookup h2 { font-family: 'Syne', sans-serif; font-weight: 700; margin-bottom: 16px; }
  .email-row { display: flex; gap: 10px; }
  .booking-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 20px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
  .booking-info h3 { font-family: 'Syne', sans-serif; font-weight: 700; margin-bottom: 6px; }
  .booking-meta { font-size: 0.83rem; color: var(--muted); display: flex; flex-direction: column; gap: 3px; }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .form-grid { grid-template-columns: 1fr; }
    .detail-header { flex-direction: column; }
    .detail-meta { flex-direction: column; }
    .email-row { flex-direction: column; }
  }
`;

export default globalStyles;
