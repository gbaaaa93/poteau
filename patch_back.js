const fs = require('fs');
const files = ['index.html', 'match.html', 'chat.html', 'profile.html', 'alert.html', 'dashboard.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Improved Back Button logic: Find any element containing arrow_back and ensure it's wrapped in index.html link
    // We target the closest parent that acts as a button (button, div with cursor-pointer, etc.)
    
    // 1. Replace existing arrow_back structures (Div style)
    content = content.replace(/<(div|button)[^>]*class="[^"]*(?:cursor-pointer|hover:bg)[^"]*"[^>]*>[\s\n]*<span[^>]*>arrow_back<\/span>[\s\n]*<\/\1>/gs, (m) => {
        if (m.includes('href="index.html"')) return m;
        return `<a href="index.html" style="text-decoration: none; color: inherit;">${m}</a>`;
    });

    // 2. Catch all remaining arrow_back spans that aren't inside an <a> tag
    // This is a bit risky but safer than leaving them broken.
    // We look for the span and check if it's already inside an <a> with a simple lookbehind-like check
    const arrowBackRegex = /<span[^>]*>arrow_back<\/span>/g;
    let match;
    let indexOffset = 0;
    const matches = [...content.matchAll(arrowBackRegex)];
    
    for (const m of matches) {
        const span = m[0];
        const index = m.index;
        
        // Primitive check: is it already inside an <a>?
        const before = content.substring(Math.max(0, index - 50), index);
        const after = content.substring(index + span.length, index + span.length + 50);
        
        if (!before.includes('<a') && !before.includes('href="index.html"')) {
             // If it's inside a button that we missed, wrap the button
             // For now, let's just wrap the span itself if it seems naked
             content = content.replace(span, `<a href="index.html" style="display: inline-flex; align-items: center; justify-content: center;">${span}</a>`);
        }
    }

    fs.writeFileSync(file, content);
    console.log(`Universal back-button patch applied to ${file}`);
});
