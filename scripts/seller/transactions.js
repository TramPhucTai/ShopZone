import { addTransaction }
  from '../../data/transactions.js';

import { formatCurrency }
  from '../utils/money.js';

const transactions = addTransaction();

let transactionsHTML = '';

transactions.forEach((transaction) => {

  transactionsHTML += `
  
    <div class="transaction-card">

      <div>

        <div>
          <strong>Transaction ID:</strong>
          ${transaction.id}
        </div>

        <div>
          <strong>Order ID:</strong>
          ${transaction.orderId}
        </div>

        <div>
          <strong>Customer:</strong>
          ${transaction.customerEmail}
        </div>

        <div>
          <strong>Amount:</strong>
          $${formatCurrency(transaction.amountCents)}
        </div>

        <div>
          <strong>Method:</strong>
          ${transaction.paymentMethod}
        </div>

        <div>
          <strong>Date:</strong>
          ${new Date(transaction.createdAt).toLocaleString()}
        </div>

      </div>

      <div class="transaction-status">
        ${transaction.status}
      </div>

    </div>
  `;
});

document.querySelector('.js-transactions-container').innerHTML =
  transactionsHTML;