import { PROFILE, FEATURES, APPLICATIONS, CHARACTERISTICS, PINS_LEFT, PINS_RIGHT } from '../data.js';

export function Nav() {
  return (
    <header className="nav">
      <nav className="wrap nav-inner" aria-label="Main">
        <a href="#top" className="brand">
          <span className="brand-mark" aria-hidden="true">MHT</span>
          <span className="brand-name">{PROFILE.name}</span>
          <span className="sr-only">Back to top</span>
        </a>
        <div className="nav-links">
          <a href="#signal">Stack</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <a href={PROFILE.resume} className="btn btn-dark" download>Download resume</a>
        </div>
      </nav>
    </header>
  );
}

function Pin({ pin, side }) {
  const leg = <span className="pin-leg" aria-hidden="true" />;
  const num = <span className="pin-n" aria-hidden="true">{pin.n}</span>;
  return (
    <a href={`#${pin.to}`} className={`pin${pin.hot ? ' hot' : ''}`} aria-label={`${pin.label}: jump to the project that uses it`}>
      {side === 'left' ? <>{num}{pin.label}{leg}</> : <>{leg}{pin.label}{num}</>}
    </a>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title" id="top">
      <div className="wrap hero-inner">
        <div className="ds-strip">
          <span>DATASHEET · MHT-2026</span>
          <span>Rev. 10/2026 · {PROFILE.city}</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <div>
              <h1 id="hero-title">{PROFILE.name}</h1>
              <p className="hero-sub">{PROFILE.role}. Firmware, mobile and data in one package.</p>
            </div>
            <div className="ds-cols">
              <div className="ds-block">
                <h2>1 · FEATURES</h2>
                <ul>{FEATURES.map((f) => <li key={f}>{f}</li>)}</ul>
              </div>
              <div className="ds-block">
                <h2>2 · APPLICATIONS</h2>
                <ul>{APPLICATIONS.map((a) => <li key={a}>{a}</li>)}</ul>
              </div>
            </div>
            <div className="ds-block">
              <h2 id="t1">TABLE 1 · MEASURED CHARACTERISTICS</h2>
              <table className="ds-table" aria-labelledby="t1">
                <tbody>
                  {CHARACTERISTICS.map((c) => (
                    <tr key={c.label}>
                      <th scope="row">{c.label}</th>
                      <td>{c.value}{c.note && <small>{c.note}</small>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cta-row">
              <a href="#contact" className="btn btn-primary">Open a line to me</a>
              <a href={PROFILE.resume} className="btn btn-ghost" download>Resume (PDF)</a>
            </div>
          </div>

          <figure className="pinout grid-paper" aria-labelledby="fig1">
            <figcaption id="fig1" className="pinout-cap">FIGURE 1 · PIN CONFIGURATION (TOP VIEW)</figcaption>
            <div className="chip-row">
              <div className="pins left">{PINS_LEFT.map((p) => <Pin key={p.n} pin={p} side="left" />)}</div>
              <div className="chip" aria-hidden="true">
                <span className="chip-notch" />
                <span className="chip-dot" />
                <span className="chip-name">MHT-2026</span>
                <span className="chip-sub">DEV ENGINEER</span>
                <span className="chip-led">POWERED</span>
              </div>
              <div className="pins right">{PINS_RIGHT.map((p) => <Pin key={p.n} pin={p} side="right" />)}</div>
            </div>
            <p className="pinout-cap" style={{ margin: 0 }}>Each pin is a skill. Click one to see the project that uses it.</p>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span>MHT-2026 · designed and flashed in Lahore</span>
      </div>
    </footer>
  );
}
