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
    <div className="expense-manager">
      <h2 className="section-title">Manage Expenses</h2>
      
      <div className="card">
        <h3 className="mb-3">Add New Expense</h3>
        <div className="form-container">
          <div className="form-row">
            <div className="form-group col-xs-12 col-sm-6 col-md-4">
              <label className="form-label" htmlFor="expense-name">Name</label>
              <input 
                type="text" 
                id="expense-name"
                className="form-control" 
                placeholder="Expense name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
              />
            </div>
            
            <div className="form-group col-xs-12 col-sm-6 col-md-4">
              <label className="form-label" htmlFor="expense-amount">Amount</label>
              <input 
                type="number" 
                id="expense-amount"
                className="form-control" 
                placeholder="Amount" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
              />
            </div>
            
            <div className="form-group col-xs-12 col-md-4">
              <label className="form-label" htmlFor="expense-category">Category</label>
              <input 
                type="text" 
                id="expense-category"
                className="form-control" 
                placeholder="Category" 
                value={category} 
                onChange={e => setCategory(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="form-row mt-3">
            <div className="form-group col-xs-12 col-sm-6 col-md-4">
              <button 
                className="btn btn-primary btn-block" 
                onClick={addExpense}
                disabled={!name || !amount || !category}
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card mt-4">
        <h3 className="mb-3">Expense History</h3>
        {loading ? (
          <div className="loading">Loading expenses...</div>
        ) : expenses.length === 0 ? (
          <div className="text-center p-3">No expenses recorded yet.</div>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(expense => (
                  <tr key={expense.id}>
                    <td>{expense.name}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseManager;