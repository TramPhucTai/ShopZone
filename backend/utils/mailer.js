const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function sendReceiptEmail(to, order) {
  const itemRows = order.items.map(i => `
    <tr>
      <td style="padding:8px">${i.productName}</td>
      <td style="padding:8px;text-align:center">${i.quantity}</td>
      <td style="padding:8px;text-align:right">$${(i.price / 100).toFixed(2)}</td>
      <td style="padding:8px;text-align:right">$${(i.subtotal / 100).toFixed(2)}</td>
    </tr>`).join('');

  await ses.send(new SendEmailCommand({
    Source: process.env.SES_FROM_EMAIL,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: `Order Confirmation #${order.order_code}` },
      Body: {
        Html: {
          Data: `
            <div style="font-family:Arial;max-width:600px;margin:auto;padding:20px">
              <h2>🛍️ Order Confirmation</h2>
              <p><b>Order:</b> ${order.order_code}</p>
              <p><b>Date:</b> ${new Date(order.created_at).toLocaleString()}</p>
              <table border="1" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:16px">
                <thead style="background:#f5f5f5">
                  <tr>
                    <th style="padding:8px;text-align:left">Product</th>
                    <th style="padding:8px">Qty</th>
                    <th style="padding:8px">Price</th>
                    <th style="padding:8px">Subtotal</th>
                  </tr>
                </thead>
                <tbody>${itemRows}</tbody>
              </table>
              <h3 style="text-align:right;margin-top:16px">
                Total: $${(order.total_amount / 100).toFixed(2)}
              </h3>
              <p style="color:#888;font-size:12px">Thank you for your order!</p>
            </div>
          `
        }
      }
    }
  }));
}

module.exports = { sendReceiptEmail };