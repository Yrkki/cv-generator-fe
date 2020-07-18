/** CI Environment */
export const environment = {
  production: true,
  serverEndpointUri: 'https://cv-generator-project-server.herokuapp.com',
  hosts: ['localhost', '192.168.1.2', '192.168.1.6', '192.168.99.100'],
  CV_GENERATOR_APPVEYOR_TOKEN: '',
  CV_GENERATOR_SKIP_REDIRECT_TO_HTTPS: 'false',
  CV_GENERATOR_DOCKER_USERNAME: '',
  CV_GENERATOR_DOCKER_TOKEN: '',

  CHROME_BIN: '/app/.apt/opt/google/chrome/chrome',

  CI: true,
  HEROKU: true,
  CV_GENERATOR_AUDITING: false
};
