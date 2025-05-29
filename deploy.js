import ghpages from 'gh-pages';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ghpages.publish(
  path.join(__dirname, 'dist'), // Full path to 'dist'
  {
    branch: 'gh-pages',
    repo: 'https://github.com/Mohit3126/EVM.git',
    remote: 'origin',
    message: '🚀 Deployed using custom script',
    user: {
      name: 'Mohit3126',
      email: 'you@example.com' // use your GitHub email
    }
  },
  (err) => {
    if (err) {
      console.error('❌ Deployment failed:', err);
    } else {
      console.log('✅ Deployment successful!');
    }
  }
);
