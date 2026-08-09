const fs = require('fs');
let c = fs.readFileSync('src/pages/Admin.jsx', 'utf8');

c = c.replace(/import \{ getInquiries, markAsSeen \} from '\.\.\/utils\/inquiries';/, "import { getInquiries, markAsSeen } from '../utils/inquiries';\nimport { getSettings, saveSettings } from '../utils/settings';");
c = c.replace(/import \{ Mail, Eye \} from 'lucide-react';/, "import { Mail, Eye, Settings } from 'lucide-react';");

c = c.replace(/const \[inquiries, setInquiries\] = useState\(\[\]\);/, "const [inquiries, setInquiries] = useState([]);\n  const [settings, setSettings] = useState(getSettings());");

const btnSearch = /<button onClick=\{\(\) => setView\('add-form'\)\} className="btn" style=\{\{ display: 'flex', alignItems: 'center', gap: '0\.5rem', background: 'var\(--accent-gold\)', color: 'white' \}\}>/;
const btnReplace = `<button onClick={() => setView('settings')} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Settings size={18} /> Settings
            </button>
            <button onClick={() => setView('add-form')} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-gold)', color: 'white' }}>`;
c = c.replace(btnSearch, btnReplace);

const settingsView = `  if (view === 'settings') {
    return (
      <div className="admin-page container" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>Site Settings</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage global images and configuration</p>
          </div>
          <button onClick={() => setView('dashboard')} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ChevronLeft size={18} /> Back to Dashboard
          </button>
        </div>

        <div style={{ background: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-dark)' }}>About Us Page</h3>
          
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Hero Image URL</label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input 
                type="text" 
                value={settings.aboutHeroImage} 
                onChange={(e) => setSettings({...settings, aboutHeroImage: e.target.value})} 
                style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)' }} 
                placeholder="Paste Image URL here"
              />
              <button 
                onClick={() => {
                  saveSettings(settings);
                  alert('Settings Saved Successfully!');
                }} 
                className="btn" 
                style={{ background: 'var(--accent-gold)', color: 'white', padding: '1rem 2rem' }}
              >
                <Save size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Save
              </button>
            </div>
            
            <div style={{ marginTop: '1.5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', height: '200px' }}>
              <img src={settings.aboutHeroImage} alt="About Hero Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.src='https://via.placeholder.com/800x400?text=Invalid+Image+URL'} />
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Preview of the image that will be displayed on the About Us page.</p>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'dashboard') {`;

c = c.replace(/  if \(view === 'dashboard'\) \{/, settingsView);

fs.writeFileSync('src/pages/Admin.jsx', c);
console.log('Fixed Admin settings');
