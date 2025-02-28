import React from 'react';
import './App.css';
import ExpenseManager from './components/ExpenseManager';
import IncomeManager from './components/IncomeManager';
import CategoryManager from './components/CategoryManager';
import BudgetManager from './components/BudgetManager';
import RecurringTransactionManager from './components/RecurringTransactionManager';
import Report from './components/Report';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <CategoryManager />
        <ExpenseManager />
        <IncomeManager />
        <BudgetManager />
        <RecurringTransactionManager />
        <Report />
      </main>
    </div>
  );
}

export default App;