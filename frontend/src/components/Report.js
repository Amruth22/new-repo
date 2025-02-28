import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function Report() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    axios.get('/expenses')
      .then(response => setExpenses(response.data))
      .catch(error => console.error('Error fetching expenses:', error));

    axios.get('/income')
      .then(response => setIncome(response.data))
      .catch(error => console.error('Error fetching income:', error));
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
      <Bar data={data} />
    </div>
  );
}

export default Report;