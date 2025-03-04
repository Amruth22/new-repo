import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IncomeManager() {
  const [income, setIncome] = useState([]);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/income')
      .then(response => {
        setIncome(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching income:', error);
        setLoading(false);
      });
  }, []);

  const addIncome = () => {
    axios.post('/income', { source, amount: parseFloat(amount) })
      .then(response => {
        setIncome([...income, response.data]);
        setSource('');
        setAmount('');
      })
      .catch(error => console.error('Error adding income:', error));
  };

  return (
    <div>
      <h2>Manage Income</h2>
      <input type="text" placeholder="Source" value={source} onChange={e => setSource(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={addIncome}>Add Income</button>
      {loading ? <p className="loading">Loading income...</p> : (
        <ul>
          {income.map(inc => (
            <li key={inc.id}>{inc.source} - ${inc.amount}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IncomeManager;