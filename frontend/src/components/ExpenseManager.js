import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExpenseManager() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/expenses')
      .then(response => {
        setExpenses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching expenses:', error);
        setLoading(false);
      });
  }, []);

  const addExpense = () => {
    axios.post('/expenses', { name, amount: parseFloat(amount), category })
      .then(response => {
        setExpenses([...expenses, response.data]);
        setName('');
        setAmount('');
        setCategory('');
      })
      .catch(error => console.error('Error adding expense:', error));
  };

  return (
    <div>
      <h2>Manage Expenses</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <button onClick={addExpense}>Add Expense</button>
      {loading ? <p className="loading">Loading expenses...</p> : (
        <ul>
          {expenses.map(expense => (
            <li key={expense.id}>{expense.name} - ${expense.amount} ({expense.category})</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseManager;