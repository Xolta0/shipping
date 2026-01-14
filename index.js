// trigger first vercel deploy

const express = require('express');
const app = express();
const Shopify = require("shopify-api-node");
const atoken = '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';
const site = 'blushandbeauty';
const shopify = new Shopify({shopName: site,accessToken: atoken});
const cors = require("cors");

app.use(cors());

async function getOrder(orderid) {
    try {
      const response = await shopify.order.list({ name: orderid });
      return response;
      } catch (e) {
          console.log(e)
      }
  }

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let result = await getOrder(id);
        res.send(result)

    } catch (e) {
        console.log(e)
    }
    
})

app.listen(process.env.PORT || 5000, 
	() => console.log("Server is running..."));



module.exports = app;    
