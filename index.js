const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  try {
    const rawText = req.body.log;  // ✅ ← 修正ポイント！
    const payload = { log: rawText };

    const webhookUrl = "https://script.google.com/macros/s/AKfycbyjsm_FhQeSJU7iyR5cYmCeqHeLEtClIgbSRo89fDO_n2nf8ucVHASVtMwlVst5RQEN/exec";

    await axios.post(webhookUrl, payload, {
      headers: { "Content-Type": "application/json" }
    });

    res.status(200).send("Webhook relay successful");
  } catch (error) {
    console.error("Error relaying webhook:", error.message);
    res.status(500).send("Relay failed");
  }
});

app.get("/", (req, res) => {
  res.send("Webhook relay bot is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
