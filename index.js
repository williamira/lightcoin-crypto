let balance = 0;
class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (const transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }


}
class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) {
      return false
    }
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true
  }
}

class Deposit extends Transaction {


  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");


console.log('Starting Balance:', myAccount.balance);

t1 = new Deposit(500, myAccount);
console.log(t1.commit());


t2 = new Withdrawal(250, myAccount);
t2.commit();
console.log(myAccount.balance);

t3 = new Withdrawal(251, myAccount);
t3.commit()
console.log("Commit result should be false: ", t3.commit());
console.log('Ending Balance:', myAccount.balance);