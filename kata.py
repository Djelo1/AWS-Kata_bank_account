from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///accounts.db'
db = SQLAlchemy(app)

class Account(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    account_number = db.Column(db.Integer, unique=True, nullable=False)
    name = db.Column(db.String(30))
    firstname = db.Column(db.String(30))
    balance = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Account id={self.id} account_number={self.accountnumber} balance={self.balance}>'

    def __init__(self, account_number, balance):
        self.accountnumber = account_number
        self.balance = balance

@app.route('/api/v1/create_account', methods=['POST'])
def create_account():
    data = request.get_json()
    account_number = data.get('account_number')
    balance = data.get('balance')
    if not account_number or not balance:
        return jsonify({"message": "Account number and balance are required"}), 400
    new_account = Account(account_number=account_number, balance=balance)
    db.session.add(new_account)
    db.session.commit()
    return jsonify({"message": "Account created successfully"}), 200


@app.route('/api/v1/account/<int:account_id>', methods=['GET'])
def account(account_id):
    account = Account.query.filter_by(id=account_id).first()
    if not account:
        return jsonify({"message": "Account not found"}), 404
    else:
        return jsonify({'id': account.id, 'accountnumber': account.accountnumber, 'balance': account.balance}), 200


@app.route('/api/v1/deposit', methods=['POST'])
def deposit():
    data = request.get_json()
    id = data.get('id')
    account_number = data.get('accountnumber')
    account = Account.query.filter_by(id=id).first()
    if account:
        account.accountnumber = account_number
        db.session.commit()
        return {"message": "Deposit done."}
    else:
        return jsonify({"message": "Account not found"}), 404


@app.route('/api/v1/withdraw/<int:account_id>', methods=['DELETE'])
def withdraw(account_id):
    account = Account.query.filter_by(id=account_id).first()
    if not account:
        return 'Account not found', 404

    amount = request.json.get('amount')
    if not amount:
        return '"amount" is required', 400

    account.balance -= amount
    if account.balance < 0:
        return 'Insufficient funds', 400

    db.session.commit()
    return '', 204


if __name__ == '__main__':
     with app.app_context():
        db.create_all()
        app.run(debug=True, port=8080)
