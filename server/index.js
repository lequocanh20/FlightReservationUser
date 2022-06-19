require('dotenv').config();

const express = require('express')
const app = express()
const cors = require('cors');

app.use(express.json())
app.use(cors({
    origin: "http://localhost:4200"
}));

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

app.post("/checkout", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          return {
            price_data: {
              currency: "VND",
              product_data: {
                name: item.id,
              },
              unit_amount: item.priceInCents,
            },
            quantity: item.adult + item.children,
          }
        }),
        success_url: `${process.env.CLIENT_URL}/flight-form`,
        cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
      })
      res.json({ url: session.url })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
})

app.listen(5000, () => {
    console.log("App is listening on port 5000")
}) 