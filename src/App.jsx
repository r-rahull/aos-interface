import React, { useState, useRef, useEffect } from 'react';

const AOSInterface = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [query, setQuery] = useState('');
  const [logs, setLogs] = useState([
    '[SYSTEM] AOS v2.1.7 initialized',
    '[ASTRO] Birth data loaded successfully',
    '[CALC] Partnership algorithm ready',
  ]);
  const logRef = useRef(null);

  const addLog = (message) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  useEffect(() => {
    logRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

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

  const navStyle = {
    borderBottom: '1px solid #333',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: '"Courier New", monospace',
    background: '#0a0a0a',
    color: '#e5e5e5'
  };

  const buttonStyle = (active) => ({
    width: '100px',
    height: '34px',
    border: active ? '2px solid #00ff41' : '2px solid #444',
    background: active ? '#001a00' : '#111',
    color: active ? '#00ff41' : '#e5e5e5',
    fontFamily: '"Courier New", monospace',
    fontSize: '11px',
    cursor: 'pointer'
  });

  const titleStyle = { color: '#e5e5e5', fontSize: '12px', marginBottom: '16px' };
  const labelStyle = { color: '#888', fontSize: '11px' };
  const valueStyle = { color: '#e5e5e5', fontSize: '11px' };
  const greenValue = { color: '#00ff41', fontSize: '11px' };

  const panelStyle = {
    border: '1px solid #444',
    padding: '16px',
    overflow: 'auto',
    background: '#111'
  };

  if (activeScreen === 'dashboard') {
    return (
      <div style={{
        height: '100vh',
        display: 'grid',
        gridTemplateRows: '60px 1fr',
        fontFamily: '"Courier New", monospace',
        background: '#0a0a0a',
        color: '#e5e5e5'
      }}>
        <nav style={navStyle}>
          <div style={{ color: '#00ff41', fontSize: '12px', fontWeight: 'bold' }}>AOS v2.1.7</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setActiveScreen('dashboard')} style={buttonStyle(true)}>DASHBOARD</button>
            <button onClick={() => setActiveScreen('partnership')} style={buttonStyle(false)}>PARTNERSHIP</button>
            <button onClick={() => setActiveScreen('console')} style={buttonStyle(false)}>CONSOLE</button>
          </div>
        </nav>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '18px',
          padding: '18px',
          height: 'calc(100vh - 60px)'
        }}>
          {/* Birth Data */}
          <div style={panelStyle}>
            <div style={titleStyle}>BIRTH DATA</div>
            <div style={{ lineHeight: '1.4' }}>
              <div style={labelStyle}>Name:      <span style={valueStyle}>Rahul Sharma</span></div>
              <div style={labelStyle}>DOB:       <span style={valueStyle}>15-08-2003 14:32</span></div>
              <div style={labelStyle}>Location:  <span style={valueStyle}>Bengaluru, KA</span></div>
              <div style={labelStyle}>Latitude:  <span style={valueStyle}>12.9716°N</span></div>
              <div style={labelStyle}>Longitude: <span style={valueStyle}>77.5946°E</span></div>
            </div>
          </div>

          {/* Logs */}
          <div style={panelStyle}>
            <div style={titleStyle}>CALCULATION LOG</div>
            <div style={{ fontSize: '11px', lineHeight: '1.3', height: '100%', overflow: 'auto' }}>
              {logs.map((log, i) => <div key={i} style={{ marginBottom: '4px' }}>{log}</div>)}
              <div ref={logRef} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeScreen === 'partnership') {
    return (
      <div style={{
        minHeight: '100vh',
        fontFamily: '"Courier New", monospace',
        background: '#0a0a0a',
        color: '#e5e5e5',
        padding: '18px'
      }}>
        <nav style={navStyle}>
          <div style={{ color: '#00ff41', fontSize: '12px', fontWeight: 'bold' }}>AOS v2.1.7</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setActiveScreen('dashboard')} style={buttonStyle(false)}>DASHBOARD</button>
            <button onClick={() => setActiveScreen('partnership')} style={buttonStyle(true)}>PARTNERSHIP</button>
            <button onClick={() => setActiveScreen('console')} style={buttonStyle(false)}>CONSOLE</button>
          </div>
        </nav>

        <div style={{ display: 'grid', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={titleStyle}>PARTNERSHIP ALGORITHM v2.1</div>
          
          {/* Timeline */}
          <div>
            <div style={{ ...labelStyle, marginBottom: '12px' }}>TIMELINE ANALYSIS (2026-2027)</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '1px',
              height: '24px',
              background: '#222'
            }}>
              {Array(12).fill(0).map((_, i) => (
                <div key={i} style={{
                  background: i < 8 ? '#222' : '#111'
                }} />
              ))}
            </div>
          </div>

          {/* Probability Blocks */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              {label: 'Emotional', prob: 92},
              {label: 'Intellectual', prob: 78},
              {label: 'Physical', prob: 65},
              {label: 'Long-term', prob: 89},
              {label: 'Communication', prob: 84},
              {label: 'Conflict', prob: 71}
            ].map((item, i) => (
              <div key={i} style={panelStyle}>
                <div style={labelStyle}>{item.label}</div>
                <div style={{ 
                  height: '8px', 
                  border: '1px solid #333', 
                  margin: '10px 0',
                  background: '#222'
                }}>
                  <div style={{
                    height: '100%',
                    background: '#e5e5e5',
                    width: `${item.prob}%`
                  }} />
                </div>
                <div style={valueStyle}>{item.prob}%</div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div style={panelStyle}>
            <div style={labelStyle}>CALCULATION STEPS</div>
            <div style={{ fontSize: '11px', lineHeight: '1.4', marginTop: '12px' }}>
              <div>1. Synastry chart generated</div>
              <div>2. Composite chart analyzed</div>
              <div>3. Progressions calculated</div>
              <div>4. Transits weighted (67%)</div>
              <div style={greenValue}>5. FINAL: 87.3%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Console Screen
  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateRows: '60px 1fr 60px',
      fontFamily: '"Courier New", monospace',
      background: '#0a0a0a',
      color: '#e5e5e5',
      padding: '18px'
    }}>
      <nav style={navStyle}>
        <div style={{ color: '#00ff41', fontSize: '12px', fontWeight: 'bold' }}>AOS v2.1.7</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setActiveScreen('dashboard')} style={buttonStyle(false)}>DASHBOARD</button>
          <button onClick={() => setActiveScreen('partnership')} style={buttonStyle(false)}>PARTNERSHIP</button>
          <button onClick={() => setActiveScreen('console')} style={buttonStyle(true)}>CONSOLE</button>
        </div>
      </nav>

      <div style={{
        border: '1px solid #444',
        padding: '16px',
        background: '#111',
        overflow: 'auto',
        fontSize: '11px',
        lineHeight: '1.3'
      }}>
        {logs.map((log, i) => <div key={i} style={{ marginBottom: '4px' }}>{log}</div>)}
        <div ref={logRef} />
      </div>

      <form onSubmit={handleQuerySubmit} style={{ display: 'flex', gap: '12px', padding: '0 16px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="> Enter Query..."
          style={{
            flex: 1,
            background: '#111',
            border: '1px solid #444',
            color: '#e5e5e5',
            padding: '10px 12px',
            fontFamily: '"Courier New", monospace',
            fontSize: '11px'
          }}
        />
        <button 
          type="submit"
          style={{
            width: '60px',
            height: '34px',
            border: '2px solid #444',
            background: '#111',
            color: '#e5e5e5',
            fontFamily: '"Courier New", monospace',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          RUN
        </button>
      </form>
    </div>
  );
};

export default AOSInterface;
