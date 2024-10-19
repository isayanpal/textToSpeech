const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/getText", (req, res) => {
  const dummyText = {
    text: "This is a dummy text from the backend for testing the app",
  };

  res.json(dummyText);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
