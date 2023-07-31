const env = process.env.ENVIRONMENT;
let URL;
switch (env) {
  case "staging":
    URL = "https://stg.dgrebb.com";
    break;
  case "production":
    URL = "https://www.dgrebb.com";

  default:
    URL = "http://localhost:8080";
    break;
}

module.exports = {
  URL: URL,
};
