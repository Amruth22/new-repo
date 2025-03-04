import React, { useEffect, useState, useRef } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import axios from 'axios';

function Report() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('summary');
  const chartRef = useRef(null);

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

  // Calculate total expenses and income
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const totalIncome = income.reduce((acc, inc) => acc + inc.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  // Summary chart data
  const summaryData = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [
      {
        label: 'Amount',
        data: [totalIncome, totalExpenses, balance],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          balance >= 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          balance >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Category breakdown chart data
  const categoryData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(expensesByCategory),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options for responsiveness
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: activeChart === 'summary' ? 'Financial Summary' : 'Expenses by Category',
      },
    },
  };

  return (
    <div className="report">
      <h2 className="section-title">Financial Reports</h2>
      
      {loading ? (
        <div className="loading">Loading report data...</div>
      ) : (
        <>
          <div className="card mb-4">
            <h3 className="mb-3">Summary</h3>
            <div className="row">
              <div className="col-xs-12 col-md-4">
                <div className="summary-card" style={{ backgroundColor: 'rgba(54, 162, 235, 0.1)', padding: '1rem', borderRadius: '4px' }}>
                  <h4>Total Income</h4>
                  <p className="summary-value">${totalIncome.toFixed(2)}</p>
                </div>
              </div>
              <div className="col-xs-12 col-md-4">
                <div className="summary-card" style={{ backgroundColor: 'rgba(255, 99, 132, 0.1)', padding: '1rem', borderRadius: '4px' }}>
                  <h4>Total Expenses</h4>
                  <p className="summary-value">${totalExpenses.toFixed(2)}</p>
                </div>
              </div>
              <div className="col-xs-12 col-md-4">
                <div className="summary-card" style={{ 
                  backgroundColor: balance >= 0 ? 'rgba(75, 192, 192, 0.1)' : 'rgba(255, 159, 64, 0.1)', 
                  padding: '1rem', 
                  borderRadius: '4px' 
                }}>
                  <h4>Balance</h4>
                  <p className="summary-value" style={{ color: balance >= 0 ? 'green' : 'red' }}>
                    ${balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="chart-controls mb-3">
              <button 
                className={`btn ${activeChart === 'summary' ? 'btn-primary' : 'btn-outline-primary'} mr-2`}
                onClick={() => setActiveChart('summary')}
              >
                Summary Chart
              </button>
              <button 
                className={`btn ${activeChart === 'category' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveChart('category')}
              >
                Category Breakdown
              </button>
            </div>
            
            <div className="chart-container" style={{ height: '300px' }}>
              {activeChart === 'summary' ? (
                <Bar 
                  ref={chartRef}
                  data={summaryData} 
                  options={chartOptions}
                />
              ) : (
                <Pie 
                  ref={chartRef}
                  data={categoryData} 
                  options={chartOptions}
                />
              )}
            </div>
          </div>
          
          <div className="card mt-4">
            <h3 className="mb-3">Recent Transactions</h3>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {[...expenses, ...income]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.hasOwnProperty('source') ? 'Income' : 'Expense'}</td>
                        <td>{transaction.name}</td>
                        <td style={{ color: transaction.hasOwnProperty('source') ? 'green' : 'red' }}>
                          {transaction.hasOwnProperty('source') ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </td>
                        <td>{transaction.category || transaction.source || 'N/A'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Report;