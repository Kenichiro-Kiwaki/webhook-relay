{\rtf1\ansi\ansicpg932\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require("express");\
const axios = require("axios");\
const app = express();\
const port = process.env.PORT || 3000;\
\
app.use(express.json());\
\
app.post("/webhook", async (req, res) => \{\
  try \{\
    const rawText = req.body.text;\
    const payload = \{ log: rawText \};\
\
    const webhookUrl = "https://script.google.com/macros/s/AKfycbyjsm_FhQeSJU7iyR5cYmCeqHeLEtClIgbSRo89fDO_n2nf8ucVHASVtMwlVst5RQEN/exec";\
\
    await axios.post(webhookUrl, payload, \{\
      headers: \{ "Content-Type": "application/json" \}\
    \});\
\
    res.status(200).send("Webhook relay successful");\
  \} catch (error) \{\
    console.error("Error relaying webhook:", error.message);\
    res.status(500).send("Relay failed");\
  \}\
\});\
\
app.get("/", (req, res) => \{\
  res.send("Webhook relay bot is running");\
\});\
\
app.listen(port, () => \{\
  console.log(`Server is running on port $\{port\}`);\
\});\
}