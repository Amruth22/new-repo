from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)

class Income(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Expense Tracker API'})

@app.route('/expenses', methods=['GET'])
def get_expenses():
    expenses = Expense.query.all()
    return jsonify([{'id': e.id, 'name': e.name, 'amount': e.amount, 'category': e.category} for e in expenses])

@app.route('/expenses', methods=['POST'])
def add_expense():
    data = request.get_json()
    new_expense = Expense(name=data['name'], amount=data['amount'], category=data['category'])
    db.session.add(new_expense)
    db.session.commit()
    return jsonify({'message': 'Expense added successfully'}), 201

@app.route('/income', methods=['GET'])
def get_income():
    income = Income.query.all()
    return jsonify([{'id': i.id, 'source': i.source, 'amount': i.amount} for i in income])

@app.route('/income', methods=['POST'])
def add_income():
    data = request.get_json()
    new_income = Income(source=data['source'], amount=data['amount'])
    db.session.add(new_income)
    db.session.commit()
    return jsonify({'message': 'Income added successfully'}), 201

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)