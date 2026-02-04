import chalk from 'chalk';
import { transactions } from './data.js';

// Adds a new transaction to the transactions array
export function addTransaction(transaction) {
  transactions.push(...[transaction]);
}

// Calculates and returns the total sum of all income transactions
export function getTotalIncome() {
  let total = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'income') {
      total += transaction.amount;
    }
  }
  return total;
}

// Calculates and returns the total sum of all expense transactions
export function getTotalExpenses() {
  let total = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'expense') {
      total += transaction.amount;
    }
  }
  return total;
}

// Calculates and returns the balance (total income minus total expenses)
export function getBalance() {
  return getTotalIncome() - getTotalExpenses();
}

// Filters and returns all transactions that match a specific category
export function getTransactionsByCategory(transactions, category) {
  const result = [];
  for (const transaction of transactions) {
    if (transaction.category === category) {
      result.push(transaction);
    }
  }
  return result;
}

// Finds and returns the transaction object with the highest expense amount
export function getLargestExpense() {
  let largestExpense = null;
  let maxAmount = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'expense' && transaction.amount > maxAmount) {
      maxAmount = transaction.amount;
      largestExpense = transaction;
    }
  }
  return largestExpense;
}

// Displays all transactions in a formatted console output
export function printAllTransactions(transactions) {
  console.log(chalk.bold.cyan('\n💰 PERSONAL FINANCE TRACKER 💰\n'));
  console.log(chalk.bold('All Transactions:\n'));

  transactions.forEach((transaction, index) => {
    // destructuring
    const { id, type, category, amount, description } = transaction;
    const typeLabel = type === 'income' ? '[INCOME]' : '[EXPENSE]'; // createing type label
    const coloredAmount =
      type === 'income' ? chalk.green(`€${amount}`) : chalk.red(`€${amount}`); // green for income red for expense
    const coloredCategory = chalk.yellow(`(${category})`); // yellow for category

    console.log(
      `${index + 1}. ${typeLabel} ${description} - ${coloredAmount} ${coloredCategory}`
    ); // output: 1. typeLabel description - €amount (category)
  });
  console.log(); // extra line for better readability
}

// Print summary of financial data
export function printSummary(transactions) {
  const totalIncome = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const balance = getBalance(transactions);
  const largestExpense = getLargestExpense(transactions);
  const transactionCount = transactions.length;

  console.log(chalk.bold.cyan('\n📊 FINANCIAL SUMMARY 📊\n'));

  console.log(`Total Income: ${chalk.green(`€${totalIncome}`)}`);
  console.log(`Total Expenses: ${chalk.red(`€${totalExpenses}`)}`);

  // Balance color-coded based on positive or negative
  const balanceColor = balance >= 0 ? chalk.cyan : chalk.red;
  console.log(`Current Balance: ${balanceColor(`€${balance}`)}`);

  if (largestExpense) {
    console.log(
      `\nLargest Expense: ${largestExpense.description} (${chalk.red(
        `€${largestExpense.amount}`
      )})`
    );
  }

  console.log(`Total Transactions: ${chalk.bold(transactionCount)}\n`);
}
