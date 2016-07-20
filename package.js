Package.describe({
  name: 'smaltcreation:manager-api',
  version: '0.0.1',
  summary: 'Smalt Création Manager API Connector',
  documentation: 'README.md',
  git: 'https://github.com/smaltcreation/manager-api'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.5.1');

  api.use([
    'ecmascript',
    'http'
  ], 'server');

  api.mainModule('manager-api.js', 'server');
});
