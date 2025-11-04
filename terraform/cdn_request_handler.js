// eslint-disable-next-line no-unused-vars
function handler(event) {
  // eslint-disable-next-line prefer-destructuring
  const request = event.request;
  const host = request.headers.host.value;
  const rootDomain = "iporaitech.com";

  // 1. Redirect root domain requests to www
  if (host.startsWith(rootDomain)) {
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        location: { value: `https://www.${host}${request.uri}` },
      },
    };
  }

  // 2. Handle requests to /es (spanish)
  if (request.uri === "/es") {
    request.uri = "/es/index.html";
  }

  return request;
}
