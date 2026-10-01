import { FRAUD_REPO, PROFILE } from '../data.js';

function PipelineFigure() {
  return (
    <figure className="fig pipe" aria-label="Pipeline: three sources flow through ETL into PostgreSQL, then three detectors, then an ensemble that caught 386 of 390 planted cases">
      <div className="pipe-row">
        <div className="pipe-col" style={{ flex: '1 1 120px' }}>
          <div className="box tint"><b>Registry</b><br /><span className="mono">5,090 rows</span></div>
          <div className="box tint"><b>National ID</b><br /><span className="mono">6,040 rows</span></div>
          <div className="box tint"><b>Payments</b><br /><span className="mono">18,844 rows</span></div>
        </div>
        <span className="arrow" aria-hidden="true">▶</span>
        <div className="pipe-col" style={{ flex: '1 1 110px' }}>
          <div className="box" style={{ textAlign: 'center', borderWidth: 1.5 }}><b>ETL</b><br /><span style={{ color: 'var(--muted-2)' }}>flag, never drop</span></div>
          <div className="box db"><b>PostgreSQL</b><br /><span style={{ color: 'var(--muted-2)' }}>5 tables</span></div>
        </div>
        <span className="arrow" aria-hidden="true">▶</span>
        <div className="pipe-col" style={{ flex: '1 1 130px' }}>
          <div className="box det">Rules</div>
          <div className="box det">Fuzzy linkage</div>
          <div className="box det">Isolation Forest</div>
        </div>
        <span className="arrow" aria-hidden="true">▶</span>
        <div className="box out" style={{ flex: '1 1 90px' }}><b>386</b><br />of 390 caught</div>
      </div>
      <div className="pipe-foot">Apache Airflow DAG in Docker · daily run · quality gate blocks regressions · Streamlit dashboard</div>
    </figure>
  );
}

function RedactedPhones() {
  return (
    <figure className="fig phones" aria-label="Illustration of the app with its details redacted under NDA">
      <svg viewBox="0 0 180 340" aria-hidden="true">
        <rect x="4" y="4" width="172" height="332" rx="26" fill="#0E1726" />
        <rect x="12" y="14" width="156" height="312" rx="19" fill="#fff" />
        <rect x="66" y="20" width="48" height="10" rx="5" fill="#0E1726" />
        <rect x="26" y="50" width="70" height="12" rx="2" fill="#0E1726" />
        <rect x="26" y="78" width="128" height="70" rx="10" fill="#1D4ED8" fillOpacity="0.12" />
        <rect x="38" y="96" width="60" height="9" rx="2" fill="#0E1726" />
        <rect x="38" y="114" width="96" height="7" rx="2" fill="#C9D2DE" />
        <rect x="38" y="128" width="74" height="7" rx="2" fill="#C9D2DE" />
        {[160, 204, 248].map((y, i) => (
          <g key={y}>
            <rect x="26" y={y} width="128" height="36" rx="8" fill="#F1F5FB" />
            <rect x="38" y={y + 14} width={[80, 56, 92][i]} height="8" rx="2" fill="#0E1726" />
          </g>
        ))}
        <rect x="28" y="296" width="124" height="22" rx="7" fill="#1D4ED8" />
      </svg>
      <svg viewBox="0 0 180 340" aria-hidden="true">
        <rect x="4" y="4" width="172" height="332" rx="26" fill="#0E1726" />
        <rect x="12" y="14" width="156" height="312" rx="19" fill="#fff" />
        <rect x="66" y="20" width="48" height="10" rx="5" fill="#0E1726" />
        <circle cx="90" cy="120" r="38" fill="#1D4ED8" fillOpacity="0.12" />
        <rect x="66" y="112" width="48" height="16" rx="2" fill="#0E1726" />
        <rect x="40" y="182" width="100" height="11" rx="2" fill="#0E1726" />
        <rect x="52" y="202" width="76" height="7" rx="2" fill="#C9D2DE" />
        <rect x="28" y="296" width="124" height="22" rx="7" fill="none" stroke="#0E1726" strokeWidth="1.2" />
      </svg>
      <span className="stamp" aria-hidden="true">UNDER NDA</span>
    </figure>
  );
}

function RedactedSpec() {
  const rows = [['4.1 Commands', '100%'], ['4.2 Packet format', '55%'], ['4.3 Handshake', '40%'], ['4.4 Security', '100%'], ['4.5 Memory map', '62%']];
  return (
    <figure className="fig spec" aria-label="Illustration of a firmware specification sheet with its contents redacted under NDA">
      <div className="spec-head">
        <span>FIRMWARE SPEC · DEVICE <span className="bar" style={{ width: 60, verticalAlign: 'middle' }} /></span>
        <span>CONFIDENTIAL</span>
      </div>
      <div className="spec-rows" aria-hidden="true">
        {rows.map(([label, w]) => (
          <div className="spec-row" key={label}><span>{label}</span><span className="bar" style={{ width: w === '100%' ? undefined : w, flex: w === '100%' ? 1 : undefined }} /></div>
        ))}
      </div>
      <div className="spec-table" aria-hidden="true">
        <span className="th">BYTE</span><span className="th">FIELD</span><span className="th">SIZE</span><span className="th">NOTE</span>
        {['0', '1', '2..n'].map((b) => (
          <span key={b} style={{ display: 'contents' }}><span>{b}</span><span className="x" /><span className="x" /><span className="x" /></span>
        ))}
      </div>
      <span className="stamp" style={{ top: '58%', transform: 'translate(-50%, -50%) rotate(-9deg)' }} aria-hidden="true">REDACTED · NDA</span>
    </figure>
  );
}

function MonitorFigure() {
  return (
    <figure className="fig" aria-label="Illustration of the live AC and DC power monitoring dashboard">
      <div className="mon-head">
        <span style={{ fontWeight: 600, fontSize: 14 }}>Inverter monitor</span>
        <span className="live">LIVE · &lt; 2 s</span>
      </div>
      <div className="mon-grid">
        <div className="mon-cell">
          <span className="meta">AC OUTPUT</span>
          <svg viewBox="0 0 200 70" width="100%" aria-hidden="true">
            <polyline points="0,40 14,34 28,38 42,30 56,33 70,26 84,30 98,24 112,28 126,22 140,27 154,20 168,25 182,19 200,22" fill="none" stroke="#1D4ED8" strokeWidth="2" />
            <line x1="0" y1="69" x2="200" y2="69" stroke="#DCE2EA" />
          </svg>
        </div>
        <div className="mon-cell">
          <span className="meta">DC INPUT</span>
          <svg viewBox="0 0 200 70" width="100%" aria-hidden="true">
            <polyline points="0,55 14,50 28,46 42,40 56,36 70,30 84,27 98,24 112,22 126,24 140,28 154,33 168,38 182,44 200,50" fill="none" stroke="#EA580C" strokeWidth="2" />
            <line x1="0" y1="69" x2="200" y2="69" stroke="#DCE2EA" />
          </svg>
        </div>
      </div>
      <div className="mon-foot">
        <span className="chipbox">ESP32 sensors</span><span aria-hidden="true">▶</span>
        <span className="chipbox">Django backend</span><span aria-hidden="true">▶</span>
        <span className="chipbox">live dashboard</span>
      </div>
    </figure>
  );
}

export default function Work() {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="section-head">
        <p className="eyebrow">SELECTED WORK</p>
        <h2 id="work-title" className="h2">Four projects, four layers of the stack.</h2>
      </div>

      <article id="proj-data" className="project">
        <div className="project-text">
          <p className="meta" style={{ margin: 0 }}>DATA ENGINEERING · 2026</p>
          <h3>Welfare Fraud Detection Pipeline</h3>
          <p>Three welfare systems that never cross-check each other. I built the layer that joins them, cleans about 30,000 messy records without deleting evidence, and runs three different fraud detectors against a planted answer key.</p>
          <div className="stats">
            <div className="stat"><b>99%</b><span>ensemble recall on planted cases</span></div>
            <div className="stat"><b>0.972</b><span>ROC-AUC, Isolation Forest</span></div>
            <div className="stat"><b>40 / 40</b><span>duplicate identities found</span></div>
            <div className="stat"><b>12M → 547</b><span>pairs compared after blocking</span></div>
          </div>
          <p className="note">Synthetic data with planted fraud, so every detector can be scored honestly. The repo documents the limits too.</p>
          <a href={FRAUD_REPO} className="link-arrow" target="_blank" rel="noreferrer">Read the code on GitHub →</a>
        </div>
        <PipelineFigure />
      </article>

      <article id="proj-mob" className="project">
        <RedactedPhones />
        <div className="project-text">
          <p className="meta" style={{ margin: 0 }}>MOBILE · ROBUSYS · SEP 2025 TO NOW</p>
          <h3>Companion app for a connected hardware product</h3>
          <p>I'm the only mobile engineer. I took a cross-platform .NET MAUI app from an empty project to release on Android 10+ and iOS 18+, then brought iOS to full parity with Android.</p>
          <ul>
            <li>Biometric authentication and role-based access</li>
            <li>Native iOS frameworks for device pairing</li>
            <li>MVVM architecture with custom controls where MAUI fell short</li>
          </ul>
          <p className="tags">C# · XAML · MVVM · iOS · Android</p>
          <p className="note">The product is under NDA and patent filing, so these screens are redacted illustrations.</p>
        </div>
      </article>

      <article id="proj-fw" className="project">
        <div className="project-text">
          <p className="meta" style={{ margin: 0 }}>FIRMWARE · ROBUSYS · SEP 2025 TO NOW</p>
          <h3>Firmware for the same device, on ESP32</h3>
          <p>Written from an early prototype and maintained through every release since, including the communication layer between the device and the app.</p>
          <ul>
            <li>Packet-based command handling</li>
            <li>Tuned memory handling and message flow</li>
            <li>New features and field fixes shipped in each release</li>
          </ul>
          <p className="tags">C · ESP32 · FreeRTOS</p>
        </div>
        <RedactedSpec />
      </article>

      <article id="proj-solar" className="project">
        <MonitorFigure />
        <div className="project-text">
          <p className="meta" style={{ margin: 0 }}>IOT · FINAL YEAR PROJECT · 2024 TO 2025</p>
          <h3>Smart Solar Inverter, real-time monitoring</h3>
          <p>An end-to-end IoT system for AC and DC power. ESP32 firmware reads the hardware, and a Django dashboard shows live readings with under 2 seconds of delay.</p>
          <p className="tags">ESP32 · C · Django · Python</p>
        </div>
      </article>

      <div className="also">
        <p><b>Also built:</b> ExplorOut, a Django e-commerce store for a freelance client, running in production.</p>
        <a href={PROFILE.github} className="link-arrow" target="_blank" rel="noreferrer">All repositories →</a>
      </div>
    </section>
  );
}
