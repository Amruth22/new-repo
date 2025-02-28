# Expense Tracker

An application to track income and expenses, set budgets, and generate financial reports.

## Features
- User Authentication
- Expense Management
- Income Management
- Budgeting
- Reports and Analytics
- Responsive Design

## Technology Stack
- **Backend**: Flask (Python)
- **Frontend**: React
- **Database**: SQLite

## Getting Started

### Prerequisites
- Python 3.x
- Node.js and npm
- pip (Python package manager)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask application:
   ```bash
   python app.py
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### API Endpoints

#### Expenses
- `GET /expenses`: Retrieve all expenses.
- `POST /expenses`: Add a new expense.
  - Request body:
    ```json
    {
      "name": "Groceries",
      "amount": 150.00,
      "category": "Food"
    }
    ```

#### Income
- `GET /income`: Retrieve all income records.
- `POST /income`: Add a new income record.
  - Request body:
    ```json
    {
      "source": "Salary",
      "amount": 3000.00
    }
    ```

### Database
- The application uses SQLite for storing expenses and income data.
- The database file is named `expenses.db` and is created automatically in the `backend` directory.

## Future Enhancements
- Implement user authentication.
- Enhance reporting and analytics features.

---

Feel free to contribute to the project by submitting issues or pull requests.