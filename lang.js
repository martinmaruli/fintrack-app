const fs = require('fs');
let html = fs.readFileSync('public/app.html', 'utf8');

const langHTML = `
    <div class="lang-switch">
      <button class="lang-btn active" data-lang="en" onclick="changeLanguage('en')">EN</button>
      <button class="lang-btn" data-lang="id" onclick="changeLanguage('id')">ID</button>
    </div>
    <!-- LOGO -->
`;

html = html.replace('<!-- LOGO -->', langHTML);
fs.writeFileSync('public/app.html', html);
console.log('Added language switcher.');
