const fs = require('fs');
let c = fs.readFileSync('src/pages/Admin.jsx', 'utf8');

c = c.replace(/import \{ getPlots, addPlot, updatePlot, deletePlot \} from '\.\.\/utils\/plots';/, "import { getPlots, addPlot, updatePlot, deletePlot } from '../utils/plots';\nimport { getInquiries, markAsSeen } from '../utils/inquiries';\nimport { Mail, Eye } from 'lucide-react';");

c = c.replace(/const \[plots, setPlots\] = useState\(\[\]\);/, "const [plots, setPlots] = useState([]);\n  const [inquiries, setInquiries] = useState([]);");

c = c.replace(/setPlots\(getPlots\(\)\);/, "setPlots(getPlots());\n    setInquiries(getInquiries());");

const dashboardHeader = `        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage your property portfolio</p>
          </div>
          <button onClick={() => setView('add-form')} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-gold)', color: 'white' }}>
            <Plus size={18} /> Add New Project
          </button>
        </div>`;

const newDashboardHeader = `        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage your property portfolio and inquiries</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => setView('inquiries')} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} /> View Inquiries
              {inquiries.filter(i => i.status === 'new').length > 0 && (
                <span style={{ background: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                  {inquiries.filter(i => i.status === 'new').length}
                </span>
              )}
            </button>
            <button onClick={() => setView('add-form')} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-gold)', color: 'white' }}>
              <Plus size={18} /> Add New Project
            </button>
          </div>
        </div>`;

c = c.replace(dashboardHeader, newDashboardHeader);

const inquiriesView = `  // Render Inquiries View
  if (view === 'inquiries') {
    return (
      <div className="admin-page container" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ color: 'var(--accent-dark)', marginBottom: '0.5rem' }}>Customer Inquiries</h1>
            <p style={{ color: 'var(--text-muted)' }}>View and manage messages from the contact form</p>
          </div>
          <button onClick={() => setView('dashboard')} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ChevronLeft size={18} /> Back to Dashboard
          </button>
        </div>

        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
          {inquiries.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No inquiries found.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: 'var(--bg-alt)', borderBottom: '1px solid rgba(0,0,0,0.05)', textAlign: 'left' }}>
                <tr>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Name</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Contact Info</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Message</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map(inq => (
                  <tr key={inq.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', background: inq.status === 'new' ? 'rgba(212, 175, 55, 0.05)' : 'white' }}>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{new Date(inq.date).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{inq.name}</td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem' }}>
                      <a href={\`mailto:\${inq.email}\`} style={{ display: 'block', color: 'var(--primary-teal)', textDecoration: 'none' }}>{inq.email}</a>
                      <a href={\`tel:\${inq.phone}\`} style={{ display: 'block', color: 'var(--text-main)', textDecoration: 'none', marginTop: '0.25rem' }}>{inq.phone}</a>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', maxWidth: '300px', fontSize: '0.9rem', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inq.message}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: inq.status === 'new' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: inq.status === 'new' ? 'red' : 'var(--success)' }}>
                        {inq.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {inq.status === 'new' && (
                          <button onClick={() => { markAsSeen(inq.id); setInquiries(getInquiries()); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-teal)', padding: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }} title="Mark as Seen">
                            <CheckCircle size={16} /> Mark Seen
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }

  // Render Dashboard
`;

c = c.replace(/  \/\/ Render Dashboard/g, inquiriesView);
fs.writeFileSync('src/pages/Admin.jsx', c);
console.log('Fixed Admin.jsx');
