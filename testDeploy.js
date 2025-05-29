import ghpages from 'gh-pages';

console.log('Starting deployment...');

ghpages.publish(
  'dist',
  {
    repo: 'https://github.com/Mohit3126/EVM.git',
    branch: 'gh-pages',
  },
  (err) => {
    if (err) {
      console.error('❌ Deployment failed:', err);
    } else {
      console.log('✅ Deployment successful!');
    }
  }
);
