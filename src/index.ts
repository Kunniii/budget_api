import express from "express";
import bodyParser from "body-parser";
import users from "./routes/users.js";
import validateEmail from "./routes/validateEmail.js";
import { checkEnvironmentVariables } from "./utils/index.js";

let app = express();
let port = process.env.PORT || "3000";

function main() {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use("/users", users);
  app.use("/validate-email", validateEmail);

  app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
  });
}

checkEnvironmentVariables()
  .then(() => {
    main();
  })
  .catch((err) => {
    console.error(err.message);
  });
