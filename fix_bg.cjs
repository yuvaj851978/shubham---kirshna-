const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const featuredBg = `        {/* Agricultural Plot Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <img src="/plot_bg.png" alt="Agricultural Plot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(253, 253, 250, 0.85)' }}></div>
        </div>`;

const whyChooseBg = `        {/* Agricultural Plot Background (Continuous) */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <img src="/plot_bg.png" alt="Agricultural Plot" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleY(-1)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(253, 253, 250, 0.85)' }}></div>
        </div>`;

content = content.replace(featuredBg, '');
content = content.replace(whyChooseBg, '');

// Change the section wrapping
content = content.replace(/className="home-section" style={{ position: 'relative', overflow: 'hidden' }}/g, 'className="home-section" style={{ position: \'relative\', zIndex: 10 }}');

const startTag = `{/* Featured Properties Section */}`;
const endTag = `      {/* CTA Section */}`;

const wrapperStart = `<div style={{ position: 'relative', backgroundImage: 'url(/plot_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(253, 253, 250, 0.85)', zIndex: 0 }}></div>
        
        {/* Featured Properties Section */}`;

const wrapperEnd = `      </div>\n\n      {/* CTA Section */}`;

content = content.replace(startTag, wrapperStart);
content = content.replace(endTag, wrapperEnd);

fs.writeFileSync('src/pages/Home.jsx', content, 'utf8');
console.log('Fixed background');
