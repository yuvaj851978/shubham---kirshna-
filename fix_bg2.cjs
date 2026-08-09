const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// 1. Remove Creeper Vines Overlay
const creeperVines = `        {/* Creeper Vines Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none', zIndex: 0, display: 'flex', justifyContent: 'space-between', opacity: 0.8 }}>
          <img src="/creeper_transparent.png" alt="Creeper Vine" style={{ width: '20vw', minWidth: '150px', objectFit: 'contain', transformOrigin: 'top center', marginTop: '-3%' }} />
          <img src="/creeper_transparent.png" alt="Creeper Vine" style={{ width: '25vw', minWidth: '200px', objectFit: 'contain', transform: 'scaleX(-1)', transformOrigin: 'top center', marginTop: '-3%' }} />
        </div>`;
content = content.replace(creeperVines, '');

// 2. Remove Agricultural Plot Background
const agriculturalBg = `        {/* Agricultural Plot Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <img src="/plot_bg.png" alt="Agricultural Plot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(253, 253, 250, 0.85)' }}></div>
        </div>`;
content = content.replace(agriculturalBg, '');

// 3. Remove bg-light from Why Choose Us section and remove overflow hidden
content = content.replace(/className="home-section bg-light" style={{ position: 'relative', overflow: 'hidden' }}/g, 'className="home-section" style={{ position: \'relative\', zIndex: 10 }}');
content = content.replace(/className="home-section" style={{ position: 'relative', overflow: 'hidden' }}/g, 'className="home-section" style={{ position: \'relative\', zIndex: 10 }}');

// 4. Swap sections (They are currently Why Choose Us THEN Featured Properties)
const whyChooseUsRegex = /(\s*\{\/\* Why Choose Us Section \*\/\}.*?<\/section>)/s;
const featuredPropertiesRegex = /(\s*\{\/\* Featured Properties Section \*\/\}.*?<\/section>)/s;

const whyChooseUsMatch = content.match(whyChooseUsRegex);
const featuredPropertiesMatch = content.match(featuredPropertiesRegex);

if (whyChooseUsMatch && featuredPropertiesMatch) {
  content = content.replace(whyChooseUsMatch[0], '###WHY_CHOOSE_US###');
  content = content.replace(featuredPropertiesMatch[0], whyChooseUsMatch[0]);
  content = content.replace('###WHY_CHOOSE_US###', featuredPropertiesMatch[0]);
}

// 5. Wrap them in a Parallax Background
const startTag = `{/* Featured Properties Section */}`;
const endTag = `      {/* CTA Section */}`;

const wrapperStart = `<div style={{ position: 'relative', backgroundImage: 'url(/plot_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(253, 253, 250, 0.85)', zIndex: 0 }}></div>
        
        {/* Featured Properties Section */}`;

const wrapperEnd = `      </div>\n\n      {/* CTA Section */}`;

content = content.replace(startTag, wrapperStart);
content = content.replace(endTag, wrapperEnd);

fs.writeFileSync('src/pages/Home.jsx', content, 'utf8');
console.log('Script ran successfully');
