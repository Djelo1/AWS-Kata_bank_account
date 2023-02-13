from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from sqlalchemy.exc import SQLAlchemyError
from datetime import date

app = Flask(__name__)

if __name__ == '__main__':
  app.run(debug=True, port = 8080)
  
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
db = SQLAlchemy(app)

class Account(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  type = db.Column(db.String(20), unique=False, nullable=False)
  surname = db.Column(db.String(20), unique=False, nullable=False)
  creationDate = db.Column(db.String(20), unique=False, nullable=False)
  modificationDate = db.Column(db.String(20), unique=False, nullable=False)
  amount = db.Column(db.Integer, unique=False, nullable=False)

  def __init__(self, type, name, creationDate, modificationDate, userId, amount):
    self.type = type
    self.surname = name
    self.creationDate = creationDate
    self.modificationDate = modificationDate
    self.amount = amount
    
class Operation(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  type = db.Column(db.String(20), unique=False, nullable=False)
  amount = db.Column(db.Integer, unique=False, nullable=False)
  executionDate = db.Column(db.String(20), unique=False, nullable=False)
  realDate = db.Column(db.String(20), unique=False, nullable=False)
  userFrom = db.Column(db.Integer, unique=False, nullable=False)
  accountFrom = db.Column(db.Integer, unique=False, nullable=False)

  def __init__(self, type, amount, executionDate, realDate, userFrom, accountFrom):
    self.type = type
    self.amount = amount
    self.executionDate = executionDate
    self.realDate = realDate
    self.userFrom = userFrom
    self.accountFrom = accountFrom
    
db.create_all()
        
@app.route('/api/v1/create-account', methods=['POST'])
def create_account():
  body = request.get_json()
  creationDate = date.today()
  modificationDate = date.today()
  try:   
    db.session.add(Account(body['type'], body['surname'], creationDate, modificationDate, body['userId'], body['amount']))
    db.session.commit()
    return "Account created", 200
  except SQLAlchemyError as e:
    error = str(e.__dict__['orig'])
    return error, 500

def get_amount(id):
  try:
    Account = Account.query.get(id)
    return Account.__dict__['amount'], 200
  except SQLAlchemyError as e:
    error = str(e.__dict__['orig'])
    return error, 500


@app.route('/api/v1/account/<int:account_id>', methods=['GET'])
def account(account_id):
    account = Account.query.filter_by(id=account_id).first()
    if not account:
        return jsonify({"message": "Account not found"}), 404
    else:
        return jsonify({'id': account.id, 'accountnumber': account.accountnumber, 'balance': account.balance}), 200

@app.route('/api/v1/deposit', methods=['PUT'])
def deposit():
  body = request.get_json()
  modificationDate = date.today()
  amount = int(get_amount(body['account_id'])) + int(body['deposit'])
  try:   
    db.session.query(Account).filter_by(id=body['account_id']).update(
      dict(modificationDate=modificationDate, amount=amount))
    db.session.commit()
    new_operation("deposit", amount, body['user_id'], body['account_id'])
    return "The deposit have been done", 200
  except SQLAlchemyError as e:
    error = str(e.__dict__['orig'])
    return error, 500

@app.route('/api/v1/withdrawal', methods=['PUT'])
def withdrawal():
  body = request.get_json()
  modificationDate = date.today()
  amount = int(get_amount(body['account_id'])) - int(body['deposit']) 
  account = Account.query.filter_by(id=body['account_id']).first()
  if not account:
      return 'Account not found', 404
  if account.amount > amount:
    try:   
      db.session.query(Account).filter_by(id=body['account_id']).update(
        dict(modificationDate=modificationDate, amount=amount))
      db.session.commit()
      new_operation("withdrawal", amount, body['user_id'], body['account_id'])
      return "The withdrawal have been done", 200
    except SQLAlchemyError as e:
      error = str(e.__dict__['orig'])
      return error
  else:
    return "You doesn't have enough money", 400

@app.route('/api/v1/accounts', methods=['GET'])
def get_accounts():
  Accounts = []
  try:
    for Account in db.session.query(Account).all():
      del Account.__dict__['_sa_instance_state'] #TypeError: Object of type 'InstanceState' is not JSON serializable
      Accounts.append(Account.__dict__)
    return jsonify(Accounts), 200
  except SQLAlchemyError as e:
    error = str(e.__dict__['orig'])
    return error, 500
