import { useEffect, useRef, useState } from 'react';
import { BOOT_LOG, IBM_VERIFY } from '../data.js';

const LV_CLASS = { BOOT: 'lv-boot', INIT: 'lv-boot', LOAD: 'lv-load', RUN: 'lv-load', OK: 'lv-ok' };

function useInView(ref, threshold = 0.35) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (seen || !ref.current) return;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, seen, threshold]);
  return seen;
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function BootLog() {
  const ref = useRef(null);
  const seen = useInView(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!seen) return;
    if (prefersReducedMotion()) { setCount(BOOT_LOG.length + 1); return; }
    const timers = [];
    for (let i = 1; i <= BOOT_LOG.length + 1; i++) timers.push(setTimeout(() => setCount(i), i * 380));
    return () => timers.forEach(clearTimeout);
  }, [seen]);

  return (
    <section id="experience" className="exp" aria-labelledby="exp-title">
      <div className="exp-intro">
        <p className="eyebrow">EXPERIENCE</p>
        <h2 id="exp-title" className="h2" style={{ fontSize: 'clamp(32px, 4vw, 44px)' }}>My career, as a boot log.</h2>
        <p className="lede">Every device I ship starts with a log like this. So does my career.</p>
      </div>
      <figure className="serial" ref={ref} aria-label="Career timeline styled as a serial monitor log">
        <div className="serial-head"><span>Serial Monitor · /dev/ttyUSB0</span><span>115200 baud</span></div>
        <div className="serial-body">
          {/* Full text for screen readers, regardless of the animation */}
          <ol className="sr-only">
            {BOOT_LOG.map((l, i) => <li key={i}>{l.ts.trim()}: {l.text}</li>)}
          </ol>
          <div aria-hidden="true">
            {BOOT_LOG.slice(0, count).map((l, i) => (
              <div key={i}>
                <span className="ts">[{l.ts}]</span> <span className={LV_CLASS[l.lv.trim()]}>{l.lv}</span>  {l.text}
              </div>
            ))}
            {count > BOOT_LOG.length && <div style={{ color: '#fff' }}>&gt; ready for the next role<span className="cursor" /></div>}
          </div>
        </div>
      </figure>
    </section>
  );
}

export function Credentials() {
  return (
    <section className="creds" aria-labelledby="creds-title">
      <h2 id="creds-title" className="sr-only">Education and certification</h2>
      <div className="cred">
        <span className="cred-badge" style={{ background: 'var(--accent)' }} aria-hidden="true">IBM</span>
        <div>
          <span className="meta">CERTIFICATE · AUG 2026</span>
          <h3>IBM Data Analyst Professional Certificate</h3>
          <p>11 courses via Coursera, through a 3-month NAVTTC program by EXD.</p>
          <a href={IBM_VERIFY} className="link-arrow" target="_blank" rel="noreferrer">Verify credential →</a>
        </div>
      </div>
      <div className="cred">
        <span className="cred-badge" style={{ background: 'var(--ink)' }} aria-hidden="true">BS</span>
        <div>
          <span className="meta">EDUCATION · 2025</span>
          <h3>BS Computer Science</h3>
          <p>The Islamia University of Bahawalpur. CGPA 3.32 / 4.00.</p>
        </div>
      </div>
    </section>
  );
}
