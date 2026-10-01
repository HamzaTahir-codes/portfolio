// All the facts on the site live here, so updating the portfolio means editing one file.

export const PROFILE = {
  name: 'Muhammad Hamza Tahir',
  role: 'Development Engineer',
  city: 'Lahore, Pakistan',
  email: 'm.hamza.codes@gmail.com',
  github: 'https://github.com/HamzaTahir-codes',
  linkedin: 'https://www.linkedin.com/in/m-hamza-tahir-dev-eng',
  resume: '/resume.pdf',
};

export const FEATURES = [
  'ESP32 firmware on FreeRTOS',
  'Cross-platform apps in .NET MAUI',
  'Data pipelines in Python and SQL',
  'Patent and technical writing',
];

export const APPLICATIONS = [
  'Connected devices',
  'Companion mobile apps',
  'Fraud and anomaly detection',
  'IoT monitoring dashboards',
];

export const CHARACTERISTICS = [
  { label: 'Platforms shipped', value: 'Android 10+, iOS 18+' },
  { label: 'Fraud detection recall', value: '99.0%', note: 'on a planted test set of 390 cases' },
  { label: 'IoT dashboard latency', value: '< 2 s', note: 'sensor to screen' },
  { label: 'Operating timezone', value: 'UTC+5' },
];

// Pins of the MHT-2026 chip. `to` is the section each pin links to.
export const PINS_LEFT = [
  { n: 1, label: 'C', to: 'proj-fw' },
  { n: 2, label: 'C#', to: 'proj-mob' },
  { n: 3, label: 'Python', to: 'proj-data' },
  { n: 4, label: 'SQL', to: 'proj-data' },
  { n: 5, label: 'JS', to: 'work' },
  { n: 6, label: 'XAML', to: 'proj-mob' },
];
export const PINS_RIGHT = [
  { n: 12, label: 'ESP32', to: 'proj-fw' },
  { n: 11, label: 'FreeRTOS', to: 'proj-fw' },
  { n: 10, label: '.NET MAUI', to: 'proj-mob', hot: true },
  { n: 9, label: 'PostgreSQL', to: 'proj-data' },
  { n: 8, label: 'Airflow', to: 'proj-data' },
  { n: 7, label: 'Django', to: 'proj-solar' },
];

export const LAYERS = {
  fw: {
    tab: 'Firmware', title: 'Device firmware on ESP32', meta: 'ROBUSYS · SEP 2025 TO NOW',
    body: 'Firmware for a connected hardware product, taken from early prototype to field releases. The product itself is under NDA.',
    stat: 'C + RTOS', statLabel: 'command handling, memory and message flow', to: 'proj-fw',
  },
  mob: {
    tab: 'Mobile', title: 'Companion app in .NET MAUI', meta: 'ROBUSYS · SEP 2025 TO NOW',
    body: 'Sole mobile engineer, from empty project to release. Biometric sign-in, role-based access and native iOS device pairing. The product itself is under NDA.',
    stat: '2 platforms', statLabel: 'Android 10+ and iOS 18+', to: 'proj-mob',
  },
  data: {
    tab: 'Data', title: 'Welfare Fraud Detection Pipeline', meta: 'PERSONAL PROJECT · 2026',
    body: 'Joins three disconnected systems, cleans about 30,000 messy records and runs three detectors, orchestrated by Airflow in Docker.',
    stat: '386 / 390', statLabel: 'planted fraud cases caught', to: 'proj-data',
  },
};

// Boot log. Fill in the month where it shows spaces, e.g. '2024.09'.
export const BOOT_LOG = [
  { ts: '2024.01', lv: 'BOOT', text: 'R&D Associate, Logithoroughfare AB (remote, Sweden)' },
  { ts: '2024   ', lv: 'LOAD', text: 'Final year project: Smart Solar Inverter, ESP32 + Django' },
  { ts: '2025   ', lv: 'OK  ', text: 'BS Computer Science, Islamia University of Bahawalpur' },
  { ts: '2025.09', lv: 'INIT', text: 'Development Engineer, Robusys, Lahore' },
  { ts: '2025.09', lv: 'RUN ', text: 'firmware.esp32 · app.android · app.ios · tech.docs' },
  { ts: '2026   ', lv: 'OK  ', text: 'welfare-fraud-pipeline: 386/390 caught' },
  { ts: '2026.08', lv: 'OK  ', text: 'IBM Data Analyst Professional Certificate' },
];

export const FRAUD_REPO = 'https://github.com/HamzaTahir-codes/welfare-fraud-detection-pipeline';
export const IBM_VERIFY = 'https://coursera.org/verify/professional-cert/BX5HAG96Y4E9';
