import React, { useState } from 'react';
import './App.css';
import './styles/responsive.css';
import ExpenseManager from './components/ExpenseManager';
import IncomeManager from './components/IncomeManager';
import CategoryManager from './components/CategoryManager';
import BudgetManager from './components/BudgetManager';
import RecurringTransactionManager from './components/RecurringTransactionManager';
import Report from './components/Report';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('expenses');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'categories':
        return <CategoryManager />;
      case 'expenses':
        return <ExpenseManager />;
      case 'income':
        return <IncomeManager />;
      case 'budgets':
        return <BudgetManager />;
      case 'recurring':
        return <RecurringTransactionManager />;
      case 'reports':
        return <Report />;
      default:
        return <ExpenseManager />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          <div className="navbar-brand">Expense Tracker</div>
          <button 
            className="navbar-toggler d-md-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <span>☰</span>
          </button>
          <div className={`navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav">
              <li className={`nav-item ${activeTab === 'categories' ? 'active' : ''}`}>
                <button className="nav-link" onClick={() => setActiveTab('categories')}>Categories</button>
              </li>
              <li className={`nav-item ${activeTab === 'expenses' ? 'active' : ''}`}>
                <button className="nav-link" onClick={() => setActiveTab('expenses')}>Expenses</button>
              </li>
              <li className={`nav-item ${activeTab === 'income' ? 'active' : ''}`}>
                <button className="nav-link" onClick={() => setActiveTab('income')}>Income</button>
              </li>
              <li className={`nav-item ${activeTab === 'budgets' ? 'active' : ''}`}>
                <button className="nav-link" onClick={() => setActiveTab('budgets')}>Budgets</button>
              </li>
              <li className={`nav-item ${activeTab === 'recurring' ? 'active' : ''}`}>
                <button className="nav-link" onClick={() => setActiveTab('recurring')}>Recurring</button>
              </li>
              <li className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}>
                <button className="nav-link" onClick={() => setActiveTab('reports')}>Reports</button>
              </li>
            </ul>
          </div>
        </div>
      </header>
      
      <div className="main-container">
        {/* Desktop view - sidebar and content */}
        <div className="row d-none d-md-flex">
          <div className="col-md-3">
            <div className="section">
              <h3 className="section-title">Navigation</h3>
              <ul className="list">
                <li className={`list-item ${activeTab === 'categories' ? 'active' : ''}`}>
                  <button className="nav-btn" onClick={() => setActiveTab('categories')}>Categories</button>
                </li>
                <li className={`list-item ${activeTab === 'expenses' ? 'active' : ''}`}>
                  <button className="nav-btn" onClick={() => setActiveTab('expenses')}>Expenses</button>
                </li>
                <li className={`list-item ${activeTab === 'income' ? 'active' : ''}`}>
                  <button className="nav-btn" onClick={() => setActiveTab('income')}>Income</button>
                </li>
                <li className={`list-item ${activeTab === 'budgets' ? 'active' : ''}`}>
                  <button className="nav-btn" onClick={() => setActiveTab('budgets')}>Budgets</button>
                </li>
                <li className={`list-item ${activeTab === 'recurring' ? 'active' : ''}`}>
                  <button className="nav-btn" onClick={() => setActiveTab('recurring')}>Recurring</button>
                </li>
                <li className={`list-item ${activeTab === 'reports' ? 'active' : ''}`}>
                  <button className="nav-btn" onClick={() => setActiveTab('reports')}>Reports</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div className="section">
              {renderActiveComponent()}
            </div>
          </div>
        </div>
        
        {/* Mobile view - just content */}
        <div className="d-block d-md-none">
          <div className="section">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
      
      {/* Mobile bottom navigation */}
      <div className="mobile-nav d-block d-md-none">
        <div className="mobile-nav-item" onClick={() => setActiveTab('expenses')}>
          <span className={activeTab === 'expenses' ? 'active' : ''}>💰</span>
          <small>Expenses</small>
        </div>
        <div className="mobile-nav-item" onClick={() => setActiveTab('income')}>
          <span className={activeTab === 'income' ? 'active' : ''}>💵</span>
          <small>Income</small>
        </div>
        <div className="mobile-nav-item" onClick={() => setActiveTab('budgets')}>
          <span className={activeTab === 'budgets' ? 'active' : ''}>📊</span>
          <small>Budgets</small>
        </div>
        <div className="mobile-nav-item" onClick={() => setActiveTab('reports')}>
          <span className={activeTab === 'reports' ? 'active' : ''}>📈</span>
          <small>Reports</small>
        </div>
      </div>
    </div>
  );
}

export default App;