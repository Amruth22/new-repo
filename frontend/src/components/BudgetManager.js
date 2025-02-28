import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BudgetManager() {
  const [budgets, setBudgets] = useState([]);
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    axios.get('/budgets')
      .then(response => setBudgets(response.data))
      .catch(error => console.error('Error fetching budgets:', error));
  }, []);

  const addBudget = () => {
    axios.post('/budgets', { amount: parseFloat(amount), start_date: startDate, end_date: endDate })
      .then(response => {
        setBudgets([...budgets, response.data]);
        setAmount('');
        setStartDate('');
        setEndDate('');
      })
      .catch(error => console.error('Error adding budget:', error));
  };

  return (
    <div>
      <h2>Manage Budgets</h2>
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <input type="date" placeholder="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" placeholder="End Date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button onClick={addBudget}>Add Budget</button>
      <ul>
        {budgets.map(budget => (
          <li key={budget.id}>${budget.amount} from {budget.start_date} to {budget.end_date}</li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetManager;