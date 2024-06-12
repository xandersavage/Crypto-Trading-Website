// This file starts up our application
const app = require("./app");
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Hey Alex! Server is running on port ", 3000);
});
