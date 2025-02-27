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

function renderTransactions() {
  transactionList.innerHTML = "";
  const sortedTransactions = [...transactions].sort((a, b) => b.date - a.date);
  const currentTransactions = sortedTransactions;
  currentTransactions.forEach((transaction) => {
    const card = document.createElement("div");
    card.className =
      "bg-zinc-800 rounded-md p-4 flex items-center justify-between";

    const leftDiv = document.createElement("div");
    leftDiv.className = "flex items-center gap-3";
    const iconDiv = document.createElement("div");
    iconDiv.className = `rounded-full p-2 ${
      transaction.isDeposit
        ? "bg-green-900/20 text-green-500"
        : "bg-red-900/20 text-red-500"
    }`;
    const icon = document.createElement("i");
    icon.className = `fa-solid ${
      transaction.isDeposit ? "fa-plus" : "fa-arrow-down"
    }`;
    iconDiv.appendChild(icon);
    leftDiv.appendChild(iconDiv);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.innerHTML = `
              <h4 class="font-medium">${transaction.description}</h4>
              <p class="text-gray-400 text-sm">${formatDate(
                transaction.date
              )}</p>
          `;
    leftDiv.appendChild(descriptionDiv);

    const rightDiv = document.createElement("div");
    rightDiv.className = `font-bold ${
      transaction.isDeposit ? "text-green-500" : "text-red-500"
    }`;
    const amountFormatted = transaction.isDeposit
      ? `+${formatCurrency(transaction.amount).substring(1)}`
      : `-${formatCurrency(transaction.amount).substring(1)}`;
    rightDiv.textContent = amountFormatted;

    card.appendChild(leftDiv);
    card.appendChild(rightDiv);
    transactionList.appendChild(card);
  });
}

// Add a new transaction
function addTransaction(description, amount, isDeposit) {
  const transaction = {
    date: new Date(),
    description: description || (isDeposit ? "Deposit" : "Withdrawal"),
    type: isDeposit ? "Add Money" : "Withdraw",
    amount: amount,
    isDeposit: isDeposit,
  };

  transactions.unshift(transaction);

  // Update balance
  if (isDeposit) {
    currentBalance += amount;
  } else {
    currentBalance -= amount;
  }

  // Update UI
  updateBalanceDisplay();
  renderTransactions();
}

// Show modal for adding or withdrawing money
function showTransactionModal(deposit) {
  isDeposit = deposit;
  modalTitle.textContent = deposit ? "Add Money" : "Withdraw Money";
  confirmBtn.className = deposit
    ? "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
    : "px-4 py-2 bg-red-600 hover:bg-red-700 rounded";

  amountInput.value = "";
  descriptionInput.value = "";
  transactionModal.classList.remove("hidden");
}

// Initialize the app
function initApp() {
  updateBalanceDisplay();
  renderTransactions();

  addMoneyBtn.addEventListener("click", () => showTransactionModal(true));
  withdrawBtn.addEventListener("click", () => showTransactionModal(false));

  cancelBtn.addEventListener("click", () => {
    transactionModal.classList.add("hidden");
  });

  confirmBtn.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (!isDeposit && amount > currentBalance) {
      alert("Insufficient funds");
      return;
    }

    const description = descriptionInput.value.trim();
    addTransaction(description, amount, isDeposit);
    transactionModal.classList.add("hidden");
  });

  // Close modal when clicking outside
  transactionModal.addEventListener("click", (e) => {
    if (e.target === transactionModal) {
      transactionModal.classList.add("hidden");
    }
  });
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", initApp);
