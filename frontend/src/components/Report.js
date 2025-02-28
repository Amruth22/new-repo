import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function Report() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/expenses'),
      axios.get('/income')
    ])
    .then(([expensesResponse, incomeResponse]) => {
      setExpenses(expensesResponse.data);
      setIncome(incomeResponse.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, []);

  const data = {
    labels: ['Expenses', 'Income'],
    datasets: [
      {
        label: 'Amount',
        data: [
          expenses.reduce((acc, expense) => acc + expense.amount, 0),
          income.reduce((acc, inc) => acc + inc.amount, 0)
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Financial Report</h2>
      {loading ? <p className="loading">Loading report...</p> : <Bar data={data} />}
    </div>
  );
}

export default Report;