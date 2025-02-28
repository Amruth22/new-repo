from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    date = db.Column(db.Date, default=datetime.utcnow)

class Income(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, default=datetime.utcnow)

class Budget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

class RecurringTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    frequency = db.Column(db.String(50), nullable=False)  # e.g., 'monthly', 'weekly'

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Expense Tracker API'})

# Category Endpoints
@app.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{'id': c.id, 'name': c.name} for c in categories])

@app.route('/categories', methods=['POST'])
def add_category():
    data = request.get_json()
    new_category = Category(name=data['name'])
    db.session.add(new_category)
    db.session.commit()
    return jsonify({'message': 'Category added successfully'}), 201

# Budget Endpoints
@app.route('/budgets', methods=['GET'])
def get_budgets():
    budgets = Budget.query.all()
    return jsonify([{'id': b.id, 'amount': b.amount, 'start_date': b.start_date, 'end_date': b.end_date} for b in budgets])

@app.route('/budgets', methods=['POST'])
def add_budget():
    data = request.get_json()
    new_budget = Budget(amount=data['amount'], start_date=datetime.strptime(data['start_date'], '%Y-%m-%d'), end_date=datetime.strptime(data['end_date'], '%Y-%m-%d'))
    db.session.add(new_budget)
    db.session.commit()
    return jsonify({'message': 'Budget added successfully'}), 201

# Recurring Transactions Endpoints
@app.route('/recurring', methods=['GET'])
def get_recurring_transactions():
    recurring = RecurringTransaction.query.all()
    return jsonify([{'id': r.id, 'name': r.name, 'amount': r.amount, 'category_id': r.category_id, 'frequency': r.frequency} for r in recurring])

@app.route('/recurring', methods=['POST'])
def add_recurring_transaction():
    data = request.get_json()
    new_recurring = RecurringTransaction(name=data['name'], amount=data['amount'], category_id=data['category_id'], frequency=data['frequency'])
    db.session.add(new_recurring)
    db.session.commit()
    return jsonify({'message': 'Recurring transaction added successfully'}), 201

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)