import ghpages from 'gh-pages';

ghpages.publish(
  'dist',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/Mohit3126/EVM.git',
    message: 'Deploy from custom script (ESM)',
  },
  (err) => {
    if (err) {
      console.error('❌ Deployment failed:', err);
    } else {
      console.log('✅ Deployment successful!');
    }
  }
);
