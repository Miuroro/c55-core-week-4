// This is the entrypoint for your application.
// node app.js
import { transactions } from './data.js';
import {
  addTransaction,
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getTransactionsByCategory,
  getLargestExpense,
  printAllTransactions,
  printSummary,
  getAverageExpensePerCategory,
} from './finance.js';

// Main execution
console.clear();
printAllTransactions(transactions);
printSummary(transactions);
getAverageExpensePerCategory(transactions);
// End of file
