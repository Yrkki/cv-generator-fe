function handler(event) {
  var request = event.request;

  // Define custom dynamic redirects based on the host
  var redirectMap = {
    'cvgenerator.eu.marinov.link': 'https://cv-generator-fe-eu.herokuapp.com',
    'cvgenerator.marinov.link': 'https://cv-generator-fe-eu.herokuapp.com',
    'cvgenerator.us.marinov.link': 'https://cv-generator-fe.herokuapp.com',
    'eu.marinov.link': 'https://cv-generator-fe-eu.herokuapp.com/corporate',
    'georgi.eu.marinov.link': 'https://cv-generator-fe-eu.herokuapp.com/webpage',
    'georgi.marinov.link': 'https://cv-generator-fe-eu.herokuapp.com/webpage',
    'georgi.us.marinov.link': 'https://cv-generator-fe.herokuapp.com/webpage',
    'marinov.link': 'https://cv-generator-fe-eu.herokuapp.com/corporate',
    'us.marinov.link': 'https://cv-generator-fe.herokuapp.com/corporate',
    'www.cvgenerator.eu.marinov.link': 'https://cv-generator-fe-eu.herokuapp.com',
    'www.cvgenerator.marinov.link': 'https://cv-generator-fe-eu.herokuapp.com',
    'www.cvgenerator.us.marinov.link': 'https://cv-generator-fe.herokuapp.com',
    'www.eu.marinov.link': 'https://cv-generator-fe-eu.herokuapp.com/corporate',
    'www.marinov.link': 'https://cv-generator-fe-eu.herokuapp.com/corporate',
    'www.us.marinov.link': 'https://cv-generator-fe.herokuapp.com/corporate'
  };

  // Get the incoming headers
  var headers = request.headers;
  if (!headers) return request;

  // Get the incoming Host header
  var host = headers.host;
  if (!host) return request;

  // Get the incoming Host header value
  var hostValue = host.value;
  if (!hostValue) return request;

  // Get the target URL
  var targetUrl = redirectMap[hostValue];
  if (!targetUrl) return request;

  // Issue a clean 301 redirect to the guaranteed slash-free URL.
  var response = {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      'location': { value: targetUrl },
      'strict-transport-security': { value: 'max-age=63072000; includeSubdomains; preload' },
      'cloudfront-functions': { value: 'generated-by-CloudFront-Functions' }
    }
  };
  return response;
}