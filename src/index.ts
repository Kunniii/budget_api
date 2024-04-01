import express from "express";
import bodyParser from "body-parser";
import { checkEnvironmentVariables } from "./utils/index.js";

import usersRoute from "./routes/users.js";
import expensesRoute from "./routes/expenses.js";
import validateEmailRoute from "./routes/validateEmail.js";

let app = express();
let port = process.env.PORT || "3000";

function main() {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use("/users", usersRoute);
  app.use("/spend", expensesRoute);
  app.use("/expense", expensesRoute);
  app.use("/validate-email", validateEmailRoute);

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
