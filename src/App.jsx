import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

const TABS = ['dashboard', 'partnership', 'console'];

const BIRTH_DATA = [
  ['Name', 'Rahul Sharma'],
  ['DOB', '15-08-2003 14:32'],
  ['Location', 'Bengaluru, KA'],
  ['Latitude', '12.9716 deg N'],
  ['Longitude', '77.5946 deg E'],
  ['Sun Sign', 'Leo'],
  ['Moon Sign', 'Scorpio'],
  ['Ascendant', 'Sagittarius'],
  ['Venus', "Virgo 11deg29'"],
  ['Mars', "Pisces 00deg52'"],
  ['Mercury', "Leo 05deg18'"],
  ['Jupiter', "Leo 19deg44'"],
  ['Saturn', "Gemini 28deg11'"],
];

const INITIAL_LOGS = [
  '[SYSTEM] AOS v2.1.7 initialized',
  '[ASTRO] Birth data loaded successfully',
  '[CALC] Partnership algorithm ready',
  '[INIT] Loading natal chart engine',
  '[INIT] Ephemeris data loaded',
  '[CALC] Sun position computed',
  '[CALC] Moon position computed',
  '[SYNASTRY] Cross-reference complete',
  '[RESULT] Final compatibility score: 87.3%',
  '[SYSTEM] Ready for queries',
];

const TIMELINE = [90, 85, 88, 92, 87, 83, 78, 80, 75, 70, 65, 60];

const PROBABILITY_BLOCKS = [
  { label: 'Emotional', value: 92 },
  { label: 'Intellectual', value: 78 },
  { label: 'Physical', value: 65 },
  { label: 'Long-term', value: 89 },
  { label: 'Communication', value: 84 },
  { label: 'Conflict Res.', value: 71 },
];

const BREAKDOWN_STEPS = [
  '1. Synastry chart generated ............. OK',
  '2. Composite chart analyzed ............. OK',
  '3. Progressions calculated .............. OK',
  '4. Transits weighted (67%) .............. OK',
  '5. Jupiter window bonus applied ......... +4.2',
  '6. Saturn square penalty ................ -1.8',
  '7. FINAL SCORE .......................... 87.3%',
];

function getLogClass(log) {
  if (log.includes('[SYSTEM]') || log.includes('[RESULT]')) return 'log log-system';
  if (log.includes('[CALC]') || log.includes('[SYNASTRY]') || log.includes('[INIT]')) return 'log log-calc';
  return 'log';
}

function NavBar({ activeTab, onSelect }) {
  return (
    <header className="top-nav">
      <div className="logo">AOS v2.1.7</div>
      <nav className="tab-list" aria-label="Screen selector">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`tab-btn${activeTab === tab ? ' is-active' : ''}`}
            onClick={() => onSelect(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </nav>
    </header>
  );
}

function DashboardScreen() {
  return (
    <section className="dashboard-grid" aria-label="Split Screen Dashboard">
      <article className="panel">
        <h2 className="panel-title">BIRTH DATA PANEL</h2>
        <div className="panel-body">
          {BIRTH_DATA.map(([label, value]) => (
            <div key={label} className="data-row">
              <span className="data-label">{label}:</span>
              <span className="data-value">{value}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="panel">
        <h2 className="panel-title">CALCULATION LOG PANEL</h2>
        <div className="panel-body log-scroll">
          {INITIAL_LOGS.map((line, idx) => (
            <div key={`${line}-${idx}`} className={getLogClass(line)}>
              {line}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function PartnershipScreen() {
  const max = useMemo(() => Math.max(...TIMELINE), []);

  return (
    <section className="partnership-grid" aria-label="Partnership Algorithm Screen">
      <article className="panel">
        <h2 className="panel-title">TIMELINE / GRAPH</h2>
        <div className="panel-body">
          <div className="timeline-months">
            {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((month) => (
              <div key={month} className="month-label">
                {month}
              </div>
            ))}
          </div>
          <div className="timeline-bars" role="img" aria-label="Monthly probability timeline">
            {TIMELINE.map((value, idx) => (
              <div key={`${value}-${idx}`} className="timeline-cell">
                <div className="timeline-fill" style={{ height: `${(value / max) * 100}%` }} />
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="panel">
        <h2 className="panel-title">PROBABILITY BLOCKS</h2>
        <div className="panel-body probability-grid">
          {PROBABILITY_BLOCKS.map((item) => (
            <div key={item.label} className="prob-card">
              <div className="prob-label">{item.label}</div>
              <div className="prob-track">
                <div className="prob-fill" style={{ width: `${item.value}%` }} />
              </div>
              <div className="prob-value">{item.value}%</div>
            </div>
          ))}
        </div>
      </article>

      <article className="panel panel-full">
        <h2 className="panel-title">CALCULATION BREAKDOWN STEPS</h2>
        <div className="panel-body breakdown-list">
          {BREAKDOWN_STEPS.map((step) => (
            <div key={step} className={`breakdown-row${step.startsWith('7.') ? ' final' : ''}`}>
              {step}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function ConsoleScreen({ logs, query, onQueryChange, onSubmit, logEndRef }) {
  return (
    <section className="console-layout" aria-label="Console Chat Interface">
      <article className="panel console-panel">
        <h2 className="panel-title">SYSTEM OUTPUT</h2>
        <div className="panel-body console-output">
          {logs.map((line, idx) => (
            <div key={`${line}-${idx}`} className={getLogClass(line)}>
              {line}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </article>

      <form className="console-form" onSubmit={onSubmit}>
        <input
          className="console-input"
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="> Enter Query..."
          aria-label="Console query input"
        />
        <button type="submit" className="console-run">
          RUN
        </button>
      </form>
    </section>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [query, setQuery] = useState('');
  const [consoleLogs, setConsoleLogs] = useState(INITIAL_LOGS);
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [consoleLogs]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const timestamp = new Date().toLocaleTimeString();
    setConsoleLogs((prev) => [
      ...prev,
      `[${timestamp}] > ${trimmed}`,
      `[${timestamp}] [PROCESS] Running partnership query`,
      `[${timestamp}] [RESULT] Match: 87.3%`,
      `[${timestamp}] [OUTPUT] Venus-Mars synastry strong`,
    ]);

    setQuery('');
  };

  return (
    <div className="app-shell">
      <NavBar activeTab={activeTab} onSelect={setActiveTab} />
      <main className="main-area">
        {activeTab === 'dashboard' && <DashboardScreen />}
        {activeTab === 'partnership' && <PartnershipScreen />}
        {activeTab === 'console' && (
          <ConsoleScreen
            logs={consoleLogs}
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSubmit}
            logEndRef={logEndRef}
          />
        )}
      </main>
    </div>
  );
}