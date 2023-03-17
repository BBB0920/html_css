const express = require("express");
const app = express();
const PORT = 8080;

const users = [
  {
    name: "example1",
    email: "example1@example.com",
    password: "123456",
    address: "address1"
  },
  {
    name: "example2",
    email: "example2@example.com",
    password: "abcdef",
    address: "address2"
  }
];

app.get("/api", (req, res) => {
  res.send(users);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
