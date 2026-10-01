import { Nav, Hero, Footer } from './components/Frame.jsx';
import SignalPath from './components/SignalPath.jsx';
import Work from './components/Work.jsx';
import { BootLog, Credentials } from './components/Career.jsx';
import Terminal from './components/Terminal.jsx';
import { PROFILE } from './data.js';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <SignalPath />
        <div className="wrap">
          <Work />
          <BootLog />
          <Credentials />
          <section id="contact" className="contact" aria-labelledby="contact-title">
            <div className="contact-head">
              <p className="eyebrow">CONTACT</p>
              <h2 id="contact-title">No contact form. Open a shell.</h2>
              <p className="lede">You're about to log in to my server. Explore it, find the hidden commands, then type <code>message</code>. It goes straight to my inbox.</p>
            </div>
            <Terminal />
            <p className="fallback">
              Prefer the old way? <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a> · <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> · <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
