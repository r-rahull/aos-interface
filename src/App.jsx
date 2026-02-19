import React, { useState, useRef, useEffect } from 'react';

const AOSInterface = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [query, setQuery] = useState('');

  const staticLogs = [
    '[SYSTEM] AOS v2.1.7 initialized',
    '[ASTRO] Birth data loaded successfully',
    '[CALC] Partnership algorithm ready',
    '[INIT] Loading natal chart engine...',
    '[INIT] Ephemeris data: 2003-08-15 loaded',
    '[CALC] Sun position: Leo 22°14\'',
    '[CALC] Moon position: Scorpio 08°47\'',
    '[CALC] Ascendant: Sagittarius 14°03\'',
    '[CALC] Venus: Virgo 11°29\'',
    '[CALC] Mars: Pisces 00°52\'',
    '[CALC] Mercury: Leo 05°18\'',
    '[CALC] Jupiter: Leo 19°44\'',
    '[CALC] Saturn: Gemini 28°11\'',
    '[SYNASTRY] Cross-referencing partner chart...',
    '[SYNASTRY] Venus-Mars trine detected: +14.2pts',
    '[SYNASTRY] Moon-Sun opposition: +8.7pts',
    '[SYNASTRY] Saturn-Moon square: -3.1pts',
    '[COMPOSITE] Composite chart generated',
    '[WEIGHT] Applying transit multipliers...',
    '[WEIGHT] Jupiter transit window: active',
    '[RESULT] Final compatibility score: 87.3%',
    '[SYSTEM] Ready for queries',
  ];

  const [consoleLogs, setConsoleLogs] = useState([...staticLogs]);
  const logRef = useRef(null);

  const addLog = (message) => {
    setConsoleLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  useEffect(() => {
    logRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLogs]);

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    addLog(`> ${query}`);
    setQuery('');
    setTimeout(() => {
      addLog('PROCESSING... birth chart analysis');
      addLog('MATCH: 87.3%');
      addLog('OUTPUT: Venus-Mars synastry strong');
    }, 500);
  };

  const styles = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-weight: 700; }

    .aos-root {
      height: 100vh;
      font-family: "Courier New", monospace;
      background: #f5f2ee;
      color: #1a1a1a;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .aos-nav {
      border-bottom: 2px solid #333;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f5f2ee;
      flex-shrink: 0;
      flex-wrap: wrap;
      gap: 8px;
    }

    .aos-logo {
      color: #1a6b2e;
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
    }

    .aos-nav-buttons {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .nav-btn {
      height: 32px;
      border: 2px solid #888;
      background: #ede9e3;
      color: #000000;
      font-family: "Courier New", monospace;
      font-size: 10px;
      font-weight: 700;
      cursor: pointer;
      padding: 0 12px;
      white-space: nowrap;
      transition: all 0.15s;
      border-radius: 0;
    }

    .nav-btn:hover { border-color: #333; }

    .nav-btn.active {
      border-color: #1a6b2e;
      background: #d6eed9;
      color: #1a6b2e;
    }

    .aos-content {
      flex: 1;
      padding: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* DASHBOARD */
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      flex: 1;
      overflow: hidden;
    }

    @media (max-width: 600px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
        overflow-y: auto;
        flex: none;
        height: auto;
      }
      .panel { min-height: 240px; }
    }

    .panel {
      border: 2px solid #333;
      background: #ede9e3;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .panel-header {
      padding: 8px 14px;
      border-bottom: 2px solid #333;
      font-size: 11px;
      color: #000;
      letter-spacing: 0.08em;
      flex-shrink: 0;
      background: #ddd8d0;
    }

    .panel-body {
      padding: 14px;
      flex: 1;
      overflow-y: auto;
    }

    .panel-body::-webkit-scrollbar { width: 5px; }
    .panel-body::-webkit-scrollbar-track { background: #ede9e3; }
    .panel-body::-webkit-scrollbar-thumb { background: #999; border-radius: 0; }

    .field-row { font-size: 11px; line-height: 2; }
    .field-label { color: #2a2a2a; }
    .field-value { color: #000; }

    .log-entry { font-size: 11px; line-height: 1.65; margin-bottom: 1px; }
    .log-system { color: #1a6b2e; }
    .log-calc   { color: #444; }
    .log-default { color: #000; }

    /* PARTNERSHIP */
    .partnership-scroll {
      flex: 1;
      overflow-y: auto;
    }

    .partnership-scroll::-webkit-scrollbar { width: 5px; }
    .partnership-scroll::-webkit-scrollbar-track { background: #f5f2ee; }
    .partnership-scroll::-webkit-scrollbar-thumb { background: #999; }

    .partnership-grid {
      display: grid;
      gap: 18px;
      max-width: 960px;
      width: 100%;
      margin: 0 auto;
      padding-bottom: 16px;
    }

    .section-title {
      font-size: 12px;
      color: #000;
      letter-spacing: 0.06em;
    }

    .section-label {
      font-size: 11px;
      color: #2a2a2a;
      letter-spacing: 0.06em;
      margin-bottom: 10px;
    }

    .timeline-wrapper {
      border: 2px solid #333;
      background: #ede9e3;
      padding: 14px;
    }

    .timeline-months {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 2px;
      margin-bottom: 5px;
    }

    .month-label { font-size: 9px; color: #444; text-align: center; }

    .timeline-track {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 2px;
      height: 28px;
    }

    .timeline-cell      { background: #111; }
    .timeline-cell.med  { background: #777; }
    .timeline-cell.dim  { background: #ccc; }

    .prob-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }

    @media (max-width: 700px) { .prob-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 420px) { .prob-grid { grid-template-columns: 1fr; } }

    .prob-card {
      border: 2px solid #333;
      padding: 12px;
      background: #ede9e3;
    }

    .prob-label { color: #2a2a2a; font-size: 11px; margin-bottom: 8px; }
    .prob-bar-track { height: 10px; border: 1px solid #333; background: #ddd8d0; margin-bottom: 6px; }
    .prob-bar-fill  { height: 100%; background: #111; }
    .prob-value     { color: #000; font-size: 11px; }

    .steps-panel { border: 2px solid #333; background: #ede9e3; padding: 14px; }
    .steps-list  { font-size: 11px; line-height: 1.9; margin-top: 8px; color: #000; }
    .step-final  { color: #1a6b2e; }

    /* CONSOLE */
    .console-root {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .console-log {
      flex: 1;
      border: 2px solid #333;
      padding: 14px;
      background: #ede9e3;
      overflow-y: auto;
      font-size: 11px;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .console-log::-webkit-scrollbar { width: 5px; }
    .console-log::-webkit-scrollbar-track { background: #ede9e3; }
    .console-log::-webkit-scrollbar-thumb { background: #999; }

    .console-form { display: flex; gap: 10px; flex-shrink: 0; }

    .console-input {
      flex: 1;
      background: #ede9e3;
      border: 2px solid #333;
      color: #000;
      padding: 8px 12px;
      font-family: "Courier New", monospace;
      font-size: 11px;
      font-weight: 700;
      min-width: 0;
      border-radius: 0;
    }

    .console-input::placeholder { color: #666; font-weight: 700; }
    .console-input:focus { outline: none; border-color: #000; }

    .console-run {
      width: 56px;
      flex-shrink: 0;
      height: 36px;
      border: 2px solid #333;
      background: #ede9e3;
      color: #000;
      font-family: "Courier New", monospace;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      border-radius: 0;
      transition: all 0.15s;
    }

    .console-run:hover { background: #333; color: #f5f2ee; }
  `;

  const Nav = ({ current }) => (
    <nav className="aos-nav">
      <div className="aos-logo">AOS v2.1.7</div>
      <div className="aos-nav-buttons">
        {['dashboard', 'partnership', 'console'].map(s => (
          <button
            key={s}
            className={`nav-btn${current === s ? ' active' : ''}`}
            onClick={() => setActiveScreen(s)}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  );

  const logClass = (log) => {
    if (log.includes('[SYSTEM]') || log.includes('[RESULT]')) return 'log-entry log-system';
    if (log.includes('[CALC]') || log.includes('[SYNASTRY]') || log.includes('[WEIGHT]') || log.includes('[INIT]') || log.includes('[COMPOSITE]')) return 'log-entry log-calc';
    return 'log-entry log-default';
  };

  return (
    <>
      <style>{styles}</style>
      <div className="aos-root">

        {/* DASHBOARD */}
        {activeScreen === 'dashboard' && (
          <>
            <Nav current="dashboard" />
            <div className="aos-content">
              <div className="dashboard-grid">

                {/* Left — Birth Data */}
                <div className="panel">
                  <div className="panel-header">▸ BIRTH DATA</div>
                  <div className="panel-body">
                    <div className="field-row">
                      {[
                        ['Name',      'Rahul Sharma'],
                        ['DOB',       '15-08-2003 14:32'],
                        ['Location',  'Bengaluru, KA'],
                        ['Latitude',  '12.9716° N'],
                        ['Longitude', '77.5946° E'],
                        ['Sun Sign',  'Leo'],
                        ['Moon Sign', 'Scorpio'],
                        ['Ascendant', 'Sagittarius'],
                        ['Venus',     "Virgo 11°29'"],
                        ['Mars',      "Pisces 00°52'"],
                        ['Mercury',   "Leo 05°18'"],
                        ['Jupiter',   "Leo 19°44'"],
                        ['Saturn',    "Gemini 28°11'"],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <span className="field-label">{k}:&nbsp;&nbsp;</span>
                          <span className="field-value">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — Scrollable Calculation Log */}
                <div className="panel">
                  <div className="panel-header">▸ CALCULATION LOG</div>
                  <div className="panel-body">
                    {staticLogs.map((log, i) => (
                      <div key={i} className={logClass(log)}>{log}</div>
                    ))}
                    <div ref={logRef} />
                  </div>
                </div>

              </div>
            </div>
          </>
        )}

        {/* PARTNERSHIP */}
        {activeScreen === 'partnership' && (
          <>
            <Nav current="partnership" />
            <div className="aos-content">
              <div className="partnership-scroll">
                <div className="partnership-grid">
                  <div className="section-title">PARTNERSHIP ALGORITHM v2.1</div>

                  <div className="timeline-wrapper">
                    <div className="section-label">TIMELINE ANALYSIS — 2026–2027</div>
                    <div className="timeline-months">
                      {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, i) => (
                        <div key={i} className="month-label">{m}</div>
                      ))}
                    </div>
                    <div className="timeline-track">
                      {[90,85,88,92,87,83,78,80,75,70,65,60].map((v, i) => (
                        <div key={i} className={`timeline-cell${v < 75 ? ' dim' : v < 85 ? ' med' : ''}`} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="section-label">PROBABILITY BLOCKS</div>
                    <div className="prob-grid">
                      {[
                        { label: 'Emotional',     prob: 92 },
                        { label: 'Intellectual',  prob: 78 },
                        { label: 'Physical',      prob: 65 },
                        { label: 'Long-term',     prob: 89 },
                        { label: 'Communication', prob: 84 },
                        { label: 'Conflict Res.', prob: 71 },
                      ].map((item) => (
                        <div key={item.label} className="prob-card">
                          <div className="prob-label">{item.label}</div>
                          <div className="prob-bar-track">
                            <div className="prob-bar-fill" style={{ width: `${item.prob}%` }} />
                          </div>
                          <div className="prob-value">{item.prob}%</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="steps-panel">
                    <div className="section-label">CALCULATION BREAKDOWN</div>
                    <div className="steps-list">
                      <div>1. Synastry chart generated ............. OK</div>
                      <div>2. Composite chart analyzed ............. OK</div>
                      <div>3. Progressions calculated .............. OK</div>
                      <div>4. Transits weighted (67%) .............. OK</div>
                      <div>5. Jupiter window bonus applied ......... +4.2</div>
                      <div>6. Saturn square penalty ................ -1.8</div>
                      <div className="step-final">7. FINAL SCORE .......................... 87.3%</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </>
        )}

        {/* CONSOLE */}
        {activeScreen === 'console' && (
          <>
            <Nav current="console" />
            <div className="aos-content">
              <div className="console-root">
                <div className="console-log">
                  {consoleLogs.map((log, i) => (
                      <div key={i} className={logClass(log)}>{log}</div>
                    ))}
                  <div ref={logRef} />
                </div>
                <form className="console-form" onSubmit={handleQuerySubmit}>
                  <input
                    className="console-input"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="> Enter Query..."
                  />
                  <button type="submit" className="console-run">RUN</button>
                </form>
              </div>
            </div>
          </>
        )}

      </div>
    </>
  );
};

export default AOSInterface;