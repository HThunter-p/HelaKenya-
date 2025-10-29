require("dotenv").config();
const express = require("express");
const axios = require("axios");
const moment = require("moment");
const app = express();
app.use(express.json());

const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const businessShortCode = process.env.MPESA_SHORTCODE;
const passkey = process.env.MPESA_PASSKEY;
const callbackUrl = process.env.MPESA_CALLBACK_URL || "https://yourdomain.com/api/callback";

async function getAccessToken() {
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  const res = await axios.get(url, {
    headers: { Authorization: `Basic ${auth}` }
  });
  return res.data.access_token;
}

app.post("/api/stkpush", async (req, res) => {
  const { amount, phone } = req.body;
  try {
    const accessToken = await getAccessToken();

    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(businessShortCode + passkey + timestamp).toString("base64");

    const stkPushRequest = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: businessShortCode,
      PhoneNumber: phone,
      CallBackURL: callbackUrl,
      AccountReference: "Deposit",
      TransactionDesc: "Deposit via app"
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      stkPushRequest,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message, details: error.response?.data });
  }
});

app.post("/api/callback", (req, res) => {
  console.log("Received M-Pesa callback:", req.body);
  res.status(200).send("Callback received");
});

app.listen(3000, () => console.log("Server running on port 3000"));
