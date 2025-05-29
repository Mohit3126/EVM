const ghpages = require('gh-pages');

ghpages.publish(
  'dist',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/Mohit3126/EVM.git',
    message: 'Deploy from custom script'
  },
  function (err) {
    if (err) {
      console.error('❌ Deployment failed:', err);
    } else {
      console.log('✅ Deployment successful!');
    }
  }
);
