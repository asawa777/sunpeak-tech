const fs = require('fs');
const path = require('path');

const enPath = path.join(process.cwd(), 'messages', 'en.json');

try {
  const content = fs.readFileSync(enPath, 'utf8');
  const json = JSON.parse(content);
  
  if (json.contactContent) {
    console.log('contactContent found.');
    if (json.contactContent['request-a-consultation']) {
      console.log('request-a-consultation found.');
      console.log('Keys:', Object.keys(json.contactContent['request-a-consultation']));
    } else {
      console.error('request-a-consultation MISSING inside contactContent.');
      console.log('Available keys:', Object.keys(json.contactContent));
    }
  } else {
    console.error('contactContent MISSING entirely.');
  }

} catch (e) {
  console.error('JSON Parse Error:', e.message);
}
