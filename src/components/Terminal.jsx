import { useCallback, useEffect, useRef, useState } from 'react';
import { PROFILE, FRAUD_REPO } from '../data.js';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
const HOST = 'hamza.tahir';
const PROMPT = `guest@${HOST}:~$`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ART = [
  '  _   _    _    __  __ _____    _    ',
  ' | | | |  / \\  |  \\/  |__  /   / \\   ',
  ' | |_| | / _ \\ | |\\/| | / /   / _ \\  ',
  ' |  _  |/ ___ \\| |  | |/ /_  / ___ \\ ',
  ' |_| |_/_/   \\_\\_|  |_/____|/_/   \\_\\',
];

const JOKES = [
  'My code works on my machine. Luckily, I also ship the machine.',
  'I told my ESP32 a joke. It didn’t laugh, but it did reset.',
  'Firmware engineers don’t have bugs. We have undocumented hardware features.',
  'Why did the packet cross the network? It was retransmitted.',
  'There are 10 kinds of people: those who read binary, and those who scrolled past this line.',
    // embedded
  'My ESP32 and I have an understanding. I don’t ask about the watchdog, it doesn’t reset during demos.',
  'printf debugging on a microcontroller: when the bug disappears the moment you try to look at it.',
  'I don’t always test my firmware, but when I do, it’s in production. Kidding. Mostly.',
  'There are two hard things in embedded: memory, memory, and off-by-one errors.',
  'FreeRTOS taught me patience. Every task gets its turn. Unlike my weekend.',
  'Hardware engineer: “It’s a software bug.” Software engineer: “It’s a hardware bug.” Me, doing both: “...it’s a me bug.”',
  // mobile
  'Android: works on 2,000 devices. iOS: works on 1 device, if the provisioning profile is in a good mood.',
  'I don’t fear production bugs. I fear “Your provisioning profile has expired.”',
  'Cross-platform means writing it once and debugging it twice.',
  'MVVM: because one layer of indirection was never going to be enough.',
  // data
  'My model has 99% recall. The other 1% is why I still have a job.',
  'Data cleaning is 80% of data science. The other 20% is complaining about data cleaning.',
  'I asked my Isolation Forest what was wrong with the data. It said “you, mostly.”',
  'SQL query walks into a bar, sees two tables and asks: “Can I JOIN you?”',
  // general dev life
  'Git commit -m "final fix". Git commit -m "final fix 2". Git commit -m "ok actually final".',
  'It’s not a bug, it’s an undocumented feature waiting for a patent.',
  'I have a joke about UDP, but you might not get it.',
  'I would tell you a TCP joke, but I’d have to keep repeating it until you acknowledged it.',
  'Weekend plan: touch grass. Actual weekend: touch firmware.',
  'Load shedding taught me more about graceful degradation than any textbook.',
];

const COMMANDS = ['about', 'projects', 'open ', 'skills', 'experience', 'resume', 'socials', 'message', 'joke', 'clear', 'history', 'exit', 'help', 'whoami'];

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const coarsePointer = () => window.matchMedia?.('(pointer: coarse)').matches;

export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [mode, setModeState] = useState('idle'); // idle | busy | shell | msg-name | msg-email | msg-body | closed
  const [input, setInput] = useState('');
  const modeRef = useRef('idle');
  const hist = useRef([]);
  const hIdx = useRef(-1);
  const draft = useRef({});
  const pending = useRef(new Set());
  const skipping = useRef(false);
  const alive = useRef(true);
  const started = useRef(false);
  const boxRef = useRef(null);
  const outRef = useRef(null);
  const inRef = useRef(null);

  const setMode = (m) => { modeRef.current = m; setModeState(m); };
  const push = useCallback((...ls) => setLines((cur) => cur.concat(ls.map(([k, t, href]) => ({ k, t, href })))), []);
  const setLast = useCallback((t) => setLines((cur) => (cur.length ? [...cur.slice(0, -1), { ...cur[cur.length - 1], t }] : cur)), []);

  // A cancellable, skippable delay used by every animation.
  const wait = useCallback((ms) => new Promise((resolve) => {
    if (skipping.current || reducedMotion()) return resolve();
    const entry = { resolve };
    entry.t = setTimeout(() => { pending.current.delete(entry); resolve(); }, ms);
    pending.current.add(entry);
  }), []);

  const skip = () => {
    skipping.current = true;
    pending.current.forEach((e) => { clearTimeout(e.t); e.resolve(); });
    pending.current.clear();
  };

  const focusInput = () => {
    if (!inRef.current || coarsePointer()) return;
    inRef.current.focus({ preventScroll: true });
  };

  const finish = (m = 'shell') => {
    if (!alive.current) return;
    skipping.current = false;
    setMode(m);
    setTimeout(focusInput, 0);
  };

  const play = async (steps) => {
    for (const [ms, line] of steps) {
      await wait(ms);
      if (!alive.current) return;
      push(line);
    }
  };

  const boot = useCallback(async () => {
    if (started.current) return;
    started.current = true;
    setMode('busy');
    setLines([]);
    const now = new Date();
    let tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { tz = ''; }
    const cmd = `ssh guest@${HOST}`;
    push(['cmd', '$ ']);
    for (let i = 1; i <= cmd.length; i++) {
      await wait(55);
      if (!alive.current) return;
      setLast('$ ' + cmd.slice(0, i));
    }
    await play([
      [300, ['dim', `Resolving ${HOST} ................ ok`]],
      [420, ['dim', 'Connecting to Lahore, PK (UTC+5) ..... ok']],
      [480, ['dim', 'Negotiating session ................. ok']],
      [360, ['ok', 'Authenticated as guest. Welcome aboard.']],
      [240, ['out', '']],
      ...ART.map((row) => [90, ['art', row]]),
      [240, ['out', '']],
      [120, ['acc', `${HOST} · firmware / mobile / data · v${now.getFullYear()}`]],
      [120, ['dim', `Last login: ${now.toDateString()} ${now.toTimeString().slice(0, 8)}${tz ? ' from ' + tz : ''}`]],
      [260, ['out', '']],
      [200, ['out', 'You’re on my personal server. Look around with  help']],
      [160, ['out', 'or type  message  to send me a note. It lands in my real inbox.']],
      [120, ['out', '']],
    ]);
    finish();
  }, [push, setLast, wait]); // eslint-disable-line react-hooks/exhaustive-deps

  // Connect when the terminal scrolls into view.
  useEffect(() => {
    alive.current = true;
    const el = boxRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { boot(); io.disconnect(); } }, { threshold: 0.45 });
    io.observe(el);
    return () => { io.disconnect(); };
  }, [boot]);

  useEffect(() => () => {
    alive.current = false;
    pending.current.forEach((e) => clearTimeout(e.t));
  }, []);

  useEffect(() => { if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight; }, [lines, mode]);

  const progress = async (label, total = 10, ms = 140) => {
    push(['warn', `${label}  [..........]   0%`]);
    for (let n = 1; n <= total; n++) {
      await wait(ms);
      if (!alive.current) return;
      setLast(`${label}  [${'█'.repeat(n)}${'.'.repeat(total - n)}] ${String(n * 10).padStart(3, ' ')}%`);
    }
  };

  const promptText = () => {
    const m = modeRef.current;
    if (m === 'msg-name') return 'name ›';
    if (m === 'msg-email') return 'email ›';
    if (m === 'msg-body') return 'message ›';
    return PROMPT;
  };

  const startMessage = async () => {
    setMode('busy');
    draft.current = {};
    await play([
      [150, ['acc', `Opening a direct channel to Hamza...`]],
      [400, ['dim', 'Three quick questions. Type  cancel  any time to back out.']],
      [280, ['out', 'What should I call you?']],
    ]);
    finish('msg-name');
  };

  const send = async (d) => {
    setMode('busy');
    const ticket = 'MHT-' + Math.floor(1000 + Math.random() * 9000);
    const payload = { name: d.name, email: d.email, message: d.body, _subject: `Portfolio terminal: ${d.name} (${ticket})`, ticket };
    const request = FORMSPREE_ID
      ? fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }).then((r) => r.ok).catch(() => false)
      : Promise.resolve(null);

    await play([
      [200, ['dim', `Packing payload ............. ${JSON.stringify(payload).length} bytes`]],
      [420, ['dim', `Stamping with ticket ........ ${ticket}`]],
    ]);
    await progress('Transmitting', 10, 160);
    const ok = await request;
    if (!alive.current) return;

    if (ok) {
      const title = `  MESSAGE DELIVERED · ticket ${ticket}`;
      const w = Math.max(title.length + 4, 44);
      const bar = '─'.repeat(w);
      await play([
        [100, ['ok', `ACK received from ${HOST} ✓`]],
        [280, ['out', '']],
        [110, ['box', `┌${bar}┐`]],
        [110, ['box', `│${title.padEnd(w, ' ')}│`]],
        [110, ['box', `└${bar}┘`]],
        [280, ['out', '']],
        [200, ['acc', `Thanks, ${d.name}. That just landed in my inbox.`]],
        [280, ['out', `I’ll reply to ${d.email} myself. No bots, no autoresponder.`]],
        [280, ['dim', 'Keep exploring if you like. help is always here.']],
      ]);
    } else {
      const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent('Hello from your portfolio')}&body=${encodeURIComponent(d.body + '\n\n' + d.name + ' · ' + d.email)}`;
      await play([
        [120, ['err', ok === null ? 'NACK: the mail relay isn’t switched on yet.' : 'NACK: the relay didn’t answer. Your message wasn’t sent.']],
        [240, ['out', 'Nothing is lost. This link opens your email app with the message filled in:']],
        [120, ['link', `→ email ${PROFILE.email}`, mailto]],
      ]);
    }
    draft.current = {};
    finish();
  };

  const flow = (m, v) => {
    if (v.toLowerCase() === 'cancel') {
      push(['dim', 'Channel closed. Nothing was sent.']);
      draft.current = {};
      setMode('shell');
      return;
    }
    if (m === 'msg-name') {
      if (!v) return push(['err', 'A name, please. Anything you like to be called.']);
      draft.current.name = v.slice(0, 80);
      push(['out', `Nice to meet you, ${draft.current.name}. Where can I reach you? (email)`]);
      setMode('msg-email');
    } else if (m === 'msg-email') {
      if (!EMAIL_RE.test(v)) return push(['err', 'That doesn’t look like an email. One more try?']);
      draft.current.email = v;
      push(['out', 'Got it. What’s on your mind? (one line, Enter sends it)']);
      setMode('msg-body');
    } else if (m === 'msg-body') {
      if (!v) return push(['err', 'The message is empty. Say anything, even hi.']);
      send({ ...draft.current, body: v.slice(0, 4000) });
    }
  };

  const run = async (raw) => {
    const [c0 = '', ...restParts] = raw.split(/\s+/);
    const c = c0.toLowerCase();
    const rest = restParts.join(' ');
    if (!c) return;
    switch (c) {
      case 'help': case '?': case 'man':
        return push(
          ['acc', 'Commands I understand'],
          ['out', '  about          who I am, in one breath'],
          ['out', '  projects       what I’ve built  (then: open 1-4)'],
          ['out', '  skills         languages and tools'],
          ['out', '  experience     where I’ve worked'],
          ['out', '  resume         grab my resume'],
          ['out', '  socials        GitHub, LinkedIn, email'],
          ['out', '  message        talk to me directly  ← the good one'],
          ['out', '  clear · history · exit'],
          ['dim', '  psst: a few commands aren’t on this list.'],
        );
      case 'about': case 'whois':
        return push(
          ['out', 'Muhammad Hamza Tahir. Development Engineer in Lahore.'],
          ['out', 'I write ESP32 firmware, build the .NET MAUI app that talks to it,'],
          ['out', 'and turn messy data into answers with Python and SQL.'],
          ['dim', 'One engineer, every layer.'],
        );
      case 'projects': case 'ls':
        return push(
          ['acc', 'projects/'],
          ['out', '  1  welfare-fraud-pipeline   Python · PostgreSQL · Airflow'],
          ['out', '  2  companion-app [NDA]      .NET MAUI · iOS · Android'],
          ['out', '  3  device-firmware [NDA]    C · ESP32 · FreeRTOS'],
          ['out', '  4  smart-solar-inverter     ESP32 · Django'],
          ['dim', 'type  open 1  for details'],
        );
      case 'open': case 'cat': case 'cd': {
        const key = (rest.match(/\d/) || [''])[0];
        const d = {
          1: [['acc', 'welfare-fraud-pipeline'], ['out', 'Joins 3 disconnected systems, cleans ~30k messy records,'], ['out', 'runs rules + fuzzy linkage + Isolation Forest.'], ['ok', 'ensemble recall 99.0% on 390 planted cases'], ['link', '→ view the repo on GitHub', FRAUD_REPO]],
          2: [['acc', 'companion-app'], ['out', 'Sole mobile engineer. Empty project to release on Android 10+ and iOS 18+.'], ['out', 'Biometric sign-in, role-based access, native iOS device pairing.'], ['warn', 'cat: product details: Permission denied (NDA)']],
          3: [['acc', 'device-firmware'], ['out', 'ESP32 firmware from early prototype to field releases.'], ['out', 'Command handling, memory and message-flow tuning.'], ['warn', 'cat: protocol spec: Permission denied (NDA)']],
          4: [['acc', 'smart-solar-inverter'], ['out', 'AC/DC power monitoring, ESP32 to a live Django dashboard.'], ['ok', 'sensor-to-screen latency < 2 s']],
        }[key];
        return d ? push(...d) : push(['err', 'usage: open <1-4>']);
      }
      case 'skills':
        return push(
          ['out', 'embedded   C, ESP32, FreeRTOS, Wi-Fi, BLE'],
          ['out', 'mobile     C#, .NET MAUI, XAML, MVVM, iOS, Android'],
          ['out', 'data       Python, pandas, SQL, PostgreSQL, scikit-learn, Airflow'],
          ['out', 'web        Django, DRF, React, Three.js, Docker, Git'],
        );
      case 'experience': case 'dmesg':
        return push(
          ['dim', '[2024.01]'], ['out', '  R&D Associate, Logithoroughfare AB (remote, Sweden)'],
          ['dim', '[2025.09]'], ['out', '  Development Engineer, Robusys, Lahore'],
          ['ok', '  running: firmware.esp32 · app.android · app.ios · tech.docs'],
        );
      case 'resume': case 'cv': {
        setMode('busy');
        await progress('Fetching resume.pdf');
        const a = document.createElement('a');
        a.href = PROFILE.resume; a.download = 'Muhammad-Hamza-Tahir-Resume.pdf';
        document.body.appendChild(a); a.click(); a.remove();
        push(['ok', 'resume.pdf saved. Check your downloads.']);
        return finish();
      }
      case 'socials': case 'links':
        return push(
          ['link', 'github     github.com/HamzaTahir-codes', PROFILE.github],
          ['link', 'linkedin   linkedin.com/in/m-hamza-tahir-dev-eng', PROFILE.linkedin],
          ['link', `email      ${PROFILE.email}`, `mailto:${PROFILE.email}`],
        );
      case 'message': case 'contact': case 'mail': case 'hire':
        return startMessage();
      case 'whoami':
        return push(['out', 'guest'], ['dim', 'but I’d love to know your actual name. Try  message']);
      case 'date':
        return push(['out', new Date().toString()]);
      case 'echo':
        return push(['out', rest]);
      case 'history':
        return push(...hist.current.map((x, i) => ['out', `  ${i + 1}  ${x}`]));
      case 'clear': case 'cls':
        return setLines([]);
      case 'joke':
        return push(['out', JOKES[Math.floor(Math.random() * JOKES.length)]]);
      case 'git':
        if (/blame/.test(rest)) return push(['out', 'every line: Muhammad Hamza Tahir'], ['dim', 'I take full responsibility. For the bugs too.']);
        return push(['out', 'On branch main. Your branch is up to date with ’career/next’.']);
      case 'sudo':
        if (/hire/.test(rest)) {
          setMode('busy');
          await play([
            [200, ['dim', '[sudo] password for guest: ********']],
            [600, ['ok', 'Access granted. Starting hiring sequence...']],
            [500, ['out', '  ▸ reviewing candidate ........ looks promising']],
            [500, ['out', '  ▸ checking references ....... see GitHub']],
            [500, ['acc', 'Last step needs a human. Run  message  and say hello.']],
          ]);
          return finish();
        }
        return push(['err', 'guest is not in the sudoers file. This incident will be reported.'], ['dim', '(to Hamza. He’ll probably laugh.)']);
      case 'flash': case 'esptool': case 'make':
        setMode('busy');
        await play([[150, ['dim', 'Connecting.....  Chip is ESP32 (revision v3.0)']]]);
        await progress('Writing firmware');
        push(['ok', 'Hash of data verified.'], ['dim', 'Hard resetting via RTS pin... Old habits.']);
        return finish();
      case 'rm':
        return push(['err', 'Nice try. This server is read-only for guests.']);
      case 'coffee': case 'brew': case 'tea': case 'chai':
        return push(['warn', '418 I’m a teapot.']);
      case 'hello': case 'hi': case 'hey': case 'salam':
        return push(['out', 'Hey! Say that to me directly: type  message']);
      case 'exit': case 'logout': case 'quit':
        push(['dim', `Connection to ${HOST} closed.`]);
        return setMode('closed');
      default:
        return push(['err', `command not found: ${c}`], ['dim', 'type  help  to see what I understand']);
    }
  };

  const submit = (value) => {
    const m = modeRef.current;
    if (m !== 'shell' && !m.startsWith('msg-')) return;
    const v = value.trim();
    push(['cmd', `${promptText()} ${value}`]);
    setInput('');
    if (m === 'shell') {
      if (v) { hist.current.push(v); hIdx.current = -1; }
      run(v);
    } else {
      flow(m, v);
    }
  };

  const complete = (v) => {
    if (!v) return;
    const hits = COMMANDS.filter((x) => x.startsWith(v.toLowerCase()));
    if (hits.length === 1) setInput(hits[0]);
    else if (hits.length > 1) push(['cmd', `${PROMPT} ${v}`], ['dim', hits.join('   ')]);
  };

  const onKey = (e) => {
    const m = modeRef.current;
    if (e.key === 'Enter') { e.preventDefault(); submit(input); return; }
    if (m !== 'shell') return;
    if (e.key === 'Tab') { e.preventDefault(); complete(input); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const h = hist.current; if (!h.length) return;
      hIdx.current = hIdx.current < 0 ? h.length - 1 : Math.max(0, hIdx.current - 1);
      setInput(h[hIdx.current]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const h = hist.current; if (hIdx.current < 0) return;
      if (hIdx.current >= h.length - 1) { hIdx.current = -1; setInput(''); } else { hIdx.current += 1; setInput(h[hIdx.current]); }
    } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setLines([]); }
  };

  const reconnect = () => { started.current = false; boot(); };
  const quick = (cmd) => {
    const m = modeRef.current;
    if (m === 'idle' || m === 'closed') { reconnect(); return; }
    if (m === 'shell') submit(cmd);
  };

  const live = mode !== 'idle' && mode !== 'closed';
  const typing = mode === 'shell' || mode.startsWith('msg-');
  const placeholder = { shell: 'type help, or message', 'msg-name': 'your name', 'msg-email': 'you@example.com', 'msg-body': 'say hello...' }[mode] || '';

  return (
    <div className="term-wrap" ref={boxRef}>
      <div className="term" role="region" aria-label="Interactive terminal for contacting Hamza">
        <div className="term-bar">
          <span className="dot" style={{ background: '#FF5F57' }} aria-hidden="true" />
          <span className="dot" style={{ background: '#FEBC2E' }} aria-hidden="true" />
          <span className="dot" style={{ background: '#28C840' }} aria-hidden="true" />
          <span className="term-title">guest@{HOST} · ssh · 100×30</span>
          {mode === 'busy' && <button type="button" className="term-skip" onClick={skip}>skip ⏭</button>}
          <span className={`term-status${live ? ' on' : ''}`}>{live ? '● connected' : '○ offline'}</span>
        </div>
        <div className="term-out" ref={outRef} onClick={focusInput} aria-live="polite">
          {mode === 'idle' && (
            <div className="term-idle">
              <small>{HOST} is listening on port 22</small>
              <button type="button" className="term-connect" onClick={boot}>$ ssh guest@{HOST} ⏎</button>
              <small>or just scroll here and it connects itself</small>
            </div>
          )}
          {lines.map((l, i) => (
            <div key={i} className={`ln k-${l.k === 'link' ? 'out k-link' : l.k}`}>
              {l.href ? <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{l.t}</a> : l.t}
            </div>
          ))}
          {typing && (
            <div className="prompt-row">
              <label htmlFor="term-input" className={`prompt${mode.startsWith('msg-') ? ' msg' : ''}`}>{promptText()}</label>
              <input
                id="term-input" ref={inRef} className="term-input" value={input} placeholder={placeholder}
                onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
                autoComplete={mode === 'msg-email' ? 'email' : mode === 'msg-name' ? 'name' : 'off'}
                type={mode === 'msg-email' ? 'email' : 'text'}
                autoCapitalize="off" autoCorrect="off" spellCheck={false} enterKeyHint="send"
              />
            </div>
          )}
          {mode === 'closed' && (
            <button type="button" className="term-connect" style={{ marginTop: 14, minHeight: 44, fontSize: 14 }} onClick={reconnect}>↻ reconnect</button>
          )}
        </div>
      </div>
      <div className="chips">
        <span>Not a terminal person? Tap a command:</span>
        {['help', 'about', 'projects', 'message', 'sudo hire-hamza'].map((c) => (
          <button key={c} type="button" className="chip-btn" onClick={() => quick(c)} disabled={mode === 'busy' || mode.startsWith('msg-')}>{c}</button>
        ))}
      </div>
    </div>
  );
}
