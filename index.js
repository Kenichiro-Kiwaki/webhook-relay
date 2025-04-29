const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // ← CORS対応ここ！
app.use(express.json());

app.post("/webhook", async (req, res) => {
  try {
    const rawText = req.body.log || req.body.text; // "log"を優先
    const payload = { text: rawText }; // Apps Script用に"text"キーに揃える

    const webhookUrl = process.env.WEBHOOK_URL;

    const response = await axios.post(webhookUrl, payload, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("Relay Success:", response.data);
    res.status(200).send("Webhook relay successful");
  } catch (error) {
    console.error("Relay Failed:", error.message);
    res.status(500).send("Relay failed");
  }
});


app.get("/", (req, res) => {
  res.send("Webhook relay bot is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
