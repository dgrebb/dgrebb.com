const https = require("https");
const express = require("express");
const server = express();
const port = "7331";
const bodyParser = require("body-parser");

function post(url, data) {
  const dataString = JSON.stringify(data);

  console.log(dataString);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github.everest-preview+json",
      Authorization:
        `Bearer ${process.env.github_pat}`,
      "User-Agent": "dgrebb",
    },
    timeout: 1000,
  };

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(new Error(`HTTP status code ${res.statusCode}`));
      }

      const body = [];
      res.on("data", (chunk) => body.push(chunk));
      res.on("end", () => {
        const resString = Buffer.concat(body).toString();
        resolve(resString);
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request time out"));
    });

    req.write(dataString);
    req.end();
  });
}

server.use(bodyParser.json());
server.post("/ignite", async (req, res) => {
  post(`${process.env.github_dispatch_url}`, {
    event_type: "strapi",
  }); 
  res.end("Building and Deploying...")
});

server.listen(port, () => {
  console.log(`Listening for new content at http://localhost:${port}`);
});
