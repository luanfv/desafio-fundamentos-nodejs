import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    function reducer(accumulator: number, currentValue: number) {
      return accumulator + currentValue;
    }

    const incomes = this.transactions.filter(transaction => {
      if(transaction.type === 'income')
        return transaction.value;
    })

    const outcomes = this.transactions.filter(transaction => {
      if(transaction.type === 'outcome')
        return transaction.value;
    })

    const incomesTotal = incomes.reduce((total, income) => total + income.value, 0);
    const outcomesTotal = outcomes.reduce((total, outcome) => total + outcome.value, 0);
    const total = incomesTotal - outcomesTotal;

    const balance = { 
      income: incomesTotal, 
      outcome: outcomesTotal, 
      total,
    };

    return balance;
  }

  public create({ title, type, value }: Transaction): Transaction {
    const transaction = {
      id: uuid(),
      title, 
      type, 
      value,
    }

    this.transactions.push(transaction)

    return transaction;
  }
}

export default TransactionsRepository;
