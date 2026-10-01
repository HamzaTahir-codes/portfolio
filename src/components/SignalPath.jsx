import { useState } from 'react';
import { LAYERS } from '../data.js';

const ICONS = {
  fw: <><rect x="6" y="6" width="12" height="12" rx="1.5" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  mob: <><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M10 18h4" /></>,
  data: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
};
const SUBS = { fw: 'C · FreeRTOS', mob: '.NET MAUI', data: 'Python · SQL' };
const NAMES = { fw: 'ESP32 firmware', mob: 'Mobile app', data: 'Data pipeline' };
const ORDER = ['fw', 'mob', 'data'];

function Node({ id, active, onPick }) {
  return (
    <button type="button" className="node" aria-pressed={active === id} aria-controls="layer-detail" onClick={() => onPick(id)}>
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">{ICONS[id]}</svg>
      <span className="node-title">{NAMES[id]}</span>
      <span className="node-sub">{SUBS[id]}</span>
    </button>
  );
}

export default function SignalPath() {
  const [active, setActive] = useState('mob');
  const cur = LAYERS[active];
  const w1 = active === 'fw' || active === 'mob';
  const w2 = active === 'mob' || active === 'data';
  return (
    <section id="signal" className="signal grid-paper" aria-labelledby="signal-title">
      <div className="wrap signal-inner">
        <div className="section-head">
          <p className="eyebrow">TRACE THE SIGNAL</p>
          <h2 id="signal-title" className="h2">From the chip to the screen. Pick a layer.</h2>
        </div>
        <div className="tabs" role="group" aria-label="Layers of the stack">
          {ORDER.map((id) => (
            <button key={id} type="button" className="tab" aria-pressed={active === id} aria-controls="layer-detail" onClick={() => setActive(id)}>
              {LAYERS[id].tab}
            </button>
          ))}
        </div>
        <div className="path">
          <Node id="fw" active={active} onPick={setActive} />
          <div className={`wire${w1 ? ' on' : ''}`} aria-hidden="true"><span className="line" /><span className="pkt" /><span className="line" /></div>
          <Node id="mob" active={active} onPick={setActive} />
          <div className={`wire${w2 ? ' on' : ''}`} aria-hidden="true"><span className="line" /><span className="pkt round" /><span className="line" /></div>
          <Node id="data" active={active} onPick={setActive} />
        </div>
        <div className="detail" id="layer-detail" aria-live="polite">
          <div className="detail-text">
            <span className="meta">{cur.meta}</span>
            <h3>{cur.title}</h3>
            <p>{cur.body}</p>
            <a href={`#${cur.to}`} className="link-arrow">See the project ↓</a>
          </div>
          <div>
            <div className="stat-big">{cur.stat}</div>
            <div className="meta" style={{ fontSize: 14, fontFamily: 'var(--sans)' }}>{cur.statLabel}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
