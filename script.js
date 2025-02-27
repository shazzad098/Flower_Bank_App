const balanceElement = document.getElementById("balance");
const addMoneyBtn = document.getElementById("addMoneyBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const transactionList = document.getElementById("transactionList");
const transactionModal = document.getElementById("transactionModal");
const modalTitle = document.getElementById("modalTitle");
const amountInput = document.getElementById("amountInput");
const descriptionInput = document.getElementById("descriptionInput");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

let currentBalance = 0;
let transactions = [];
let isDeposit = true;

// Format currency with dollar sign and 2 decimal places
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

// Format date as "Jan 15, 2025"
function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Update balance display
function updateBalanceDisplay() {
  balanceElement.textContent = formatCurrency(currentBalance);
}
