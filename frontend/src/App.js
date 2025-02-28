import React from 'react';
import './App.css';
import ExpenseManager from './components/ExpenseManager';
import IncomeManager from './components/IncomeManager';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <ExpenseManager />
        <IncomeManager />
      </main>
    </div>
  );
}

export default App;