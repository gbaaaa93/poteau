const fs = require('fs');

const replacements = [
    { icon: 'home', target: 'index.html' },
    { icon: 'sports_soccer', target: 'dashboard.html' },
    { icon: 'notifications', target: 'alert.html' },
    { icon: 'person', target: 'profile.html' },
    { icon: 'add', target: 'alert.html' }
];

const files = ['index.html', 'match.html', 'chat.html', 'profile.html', 'alert.html', 'dashboard.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Core Link replacements
    replacements.forEach(rep => {
        const regex = new RegExp('<a[^>]+href="[^"]*"[^>]*>(?:(?!</a>).)*<span[^>]+>' + rep.icon + '</span>', 'gs');
        const matches = content.match(regex);
        if (matches) {
            matches.forEach(m => {
                const fixed = m.replace(/href="[^"]*"/, `href="${rep.target}"`);
                content = content.replace(m, fixed);
            });
        }
    });

    // Special: Link Home cards to Match.html and Popular to External Sites
    if (file === 'index.html') {
        // Match cards -> Detail page
        content = content.replace(/min-w-\[280px\][^>]*>.*?<a[^>]*href="#"/gs, (m) => m.replace('href="#"', 'href="match.html"'));
        
        // Popular centers -> External official sites (UrbanSoccer, etc.)
        content = content.replace(/Urban Soccer Aubervilliers.*?href="#"/s, (m) => m.replace('href="#"', 'href="https://www.urbansoccer.fr/centres/aubervilliers/" target="_blank"'));
        content = content.replace(/Casa Padel Uno.*?href="#"/s, (m) => m.replace('href="#"', 'href="https://casapadel.fr/" target="_blank"'));
    }

    // Back Buttons
    content = content.replace(/material-symbols-outlined">arrow_back[^]*?<\/button>/g, '<a href="index.html"><span class="material-symbols-outlined">arrow_back</span></a>');

    fs.writeFileSync(file, content);
    console.log(`Final patch applied to ${file}`);
});
