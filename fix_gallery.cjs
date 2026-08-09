const fs = require('fs');

['src/pages/PlotDetail.jsx', 'src/pages/AdminProjectDetail.jsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/height: '400px'/g, '/* removed */');
  content = content.replace(
    /<div style=\{\{ borderRadius: 'var\(--radius-lg\)', overflow: 'hidden', marginBottom: '3rem', boxShadow: 'var\(--shadow-sm\)', backgroundColor: 'var\(--bg-alt\)' \}\}>/g,
    '<div className="property-gallery" style={{ borderRadius: \\'var(--radius-lg)\\', overflow: \\'hidden\\', marginBottom: \\'3rem\\', boxShadow: \\'var(--shadow-sm)\\', backgroundColor: \\'var(--bg-alt)\\' }}>'
  );
  fs.writeFileSync(file, content);
});

let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('.property-gallery > *')) {
  css += `\n\n.property-gallery > * { height: 400px !important; }\n@media (max-width: 768px) { .property-gallery > * { height: 250px !important; } }\n`;
  fs.writeFileSync('src/index.css', css);
}
console.log('Fixed gallery heights');
