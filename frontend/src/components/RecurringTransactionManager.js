import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecurringTransactionManager() {
  const [recurring, setRecurring] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [frequency, setFrequency] = useState('');

  useEffect(() => {
    axios.get('/recurring')
      .then(response => setRecurring(response.data))
      .catch(error => console.error('Error fetching recurring transactions:', error));
  }, []);

  const addRecurringTransaction = () => {
    axios.post('/recurring', { name, amount: parseFloat(amount), category_id: parseInt(categoryId), frequency })
      .then(response => {
        setRecurring([...recurring, response.data]);
        setName('');
        setAmount('');
        setCategoryId('');
        setFrequency('');
      })
      .catch(error => console.error('Error adding recurring transaction:', error));
  };

  return (
    <div>
      <h2>Manage Recurring Transactions</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <input type="text" placeholder="Category ID" value={categoryId} onChange={e => setCategoryId(e.target.value)} />
      <input type="text" placeholder="Frequency" value={frequency} onChange={e => setFrequency(e.target.value)} />
      <button onClick={addRecurringTransaction}>Add Recurring Transaction</button>
      <ul>
        {recurring.map(r => (
          <li key={r.id}>{r.name} - ${r.amount} ({r.frequency})</li>
        ))}
      </ul>
    </div>
  );
}

export default RecurringTransactionManager;