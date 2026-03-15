const fs = require('fs');
const files = ['match.html', 'chat.html', 'profile.html', 'alert.html', 'dashboard.html'];

const mobileWrapperStart = '<div class="relative mx-auto min-h-screen max-w-[480px] bg-background-light dark:bg-background-dark flex flex-col pb-24 shadow-2xl">';
const mobileWrapperEnd = '</div>';

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if already wrapped
    if (content.includes('max-w-[480px]')) {
        console.log(`${file} already has a mobile wrapper, skipping or updating...`);
    }

    // Extract body content
    const bodyMatch = content.match(/<body[^>]*>(.*?)<\/body>/s);
    if (bodyMatch) {
        let bodyContent = bodyMatch[1].trim();
        
        // Remove existing nav/footer if any (to handle it specifically)
        // Actually it's easier to just wrap everything and fix the 'fixed' elements
        
        const newBody = `\n${mobileWrapperStart}\n${bodyContent}\n${mobileWrapperEnd}\n`;
        content = content.replace(/(<body[^>]*>).*?<\/body>/s, `$1${newBody}</body>`);
        
        // Fix fixed elements to be centered and 480px wide
        content = content.replace(/class="fixed bottom-0 (?!left-1\/2)/g, 'class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] ');
        
        // Remove any max-w-md constraints that might conflict
        content = content.replace(/max-w-md/g, 'max-w-full');

        fs.writeFileSync(file, content);
        console.log(`Mobile format applied to ${file}`);
    }
});
