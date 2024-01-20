const express = require("express");
const path = require("path");
const { pathToFileURL, fileURLToPath } = require("url");
const configPath = pathToFileURL(process.cwd());
const app = express();

import(`${configPath}/config.mjs`).then((module) => {
  const config = module.default;

  app.use(
    config.base || "/",
    express.static(path.join(fileURLToPath(configPath), "dist"))
  );

  app.get("*", (req, res) => {
    res.sendFile(path.join(fileURLToPath(configPath), "dist", "index.html"));
  });

  const port = process.env.PORT || config.port || 3000;

  let message = `Server running on port ${port}`;
  config.base && (message += ` with base ${config.base}`);

  app.listen(port, () => {
    console.log(`\x1b[36m%s\x1b[0m`, message);
  });
});

