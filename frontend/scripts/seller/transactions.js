import { apiRequest } from '../utils/api.js';

async function loadTransactions() {
  try {
    const transactions = await apiRequest('/transactions');
    let html = '';

    if (transactions.length === 0) {
      html = '<p>No transactions yet.</p>';
    } else {
      transactions.forEach((tx) => {
        html += `
          <div class="transaction-row">
            <span>${new Date(tx.created_at).toLocaleDateString()}</span>
            <span>${tx.payment_method}</span>
            <span class="tx-status">${tx.status}</span>
            <span><b>$${(tx.amount / 100).toFixed(2)}</b></span>
          </div>
        `;
      });
    }
    document.querySelector('.js-transactions-container').innerHTML = html;
  } catch (err) {
    alert('Failed to load transactions: ' + err.message);
  }
}

loadTransactions();