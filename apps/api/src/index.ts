import env from "./config/env";
import app from "./config/express";
import "./config/typeorm";

app.listen(env.port, () => {
  console.info(
    `🌿 Server running at http://localhost:${env.port} (${env.environment})`
  );
});
