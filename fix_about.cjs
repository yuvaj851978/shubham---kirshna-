const fs = require('fs');
let c = fs.readFileSync('src/pages/About.jsx', 'utf8');

c = c.replace(/import React, \{ useEffect \} from 'react';/, "import React, { useEffect, useState } from 'react';\nimport { getSettings } from '../utils/settings';");

const compStart = /export default function About\(\) \{\s*const navigate = useNavigate\(\);/;
const stateAdd = `export default function About() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(getSettings());`;
c = c.replace(compStart, stateAdd);

const imgFind = /src="https:\/\/images\.unsplash\.com\/photo-1500382017468-9049fed747ef\?auto=format&fit=crop&w=1200&q=80"/;
c = c.replace(imgFind, 'src={settings.aboutHeroImage}');

const hookFind = /  useEffect\(\(\) => \{\s*window\.scrollTo\(0, 0\);\s*\}, \[\]\);/;
const hookReplace = `  useEffect(() => {
    window.scrollTo(0, 0);
    const handleUpdate = () => setSettings(getSettings());
    window.addEventListener('settingsUpdated', handleUpdate);
    return () => window.removeEventListener('settingsUpdated', handleUpdate);
  }, []);`;
c = c.replace(hookFind, hookReplace);

fs.writeFileSync('src/pages/About.jsx', c);
console.log('Done About');
