/** Production environment */
export const environment = {
  production: true,
  serverEndpointUri: 'https://cv-generator-project-server-eu.herokuapp.com',
  hosts: ['localhost', '192.168.1.2', '192.168.1.6', '192.168.99.100'],
  CV_GENERATOR_APPVEYOR_TOKEN: '',
  CV_GENERATOR_FE_SKIP_REDIRECT_TO_HTTPS: 'true',
  CV_GENERATOR_DOCKER_USERNAME: '',
  CV_GENERATOR_DOCKER_TOKEN: '',
  CV_GENERATOR_GITHUB_TOKEN: '',
  CV_GENERATOR_FE_DEBUG: true,

  CV_GENERATOR_FE_APP_NAME: 'CV Generator',
  CV_GENERATOR_FE_APP_PACKAGE_NAME: 'cv-generator-fe',

  CV_GENERATOR_FE_USE_SPDY: false,

  CV_GENERATOR_AUDITING: false,
  CV_GENERATOR_OVERRIDE_UPDATE_PACKAGES: false
};
