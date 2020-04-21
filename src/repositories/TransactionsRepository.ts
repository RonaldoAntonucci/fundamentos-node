import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

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
    let incomeValues = 0;
    let outcomeValues = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        incomeValues += transaction.value;
      } else if (transaction.type === 'outcome') {
        outcomeValues += transaction.value;
      }
    });

    const balance = {
      income: incomeValues,
      outcome: outcomeValues,
      total: incomeValues - outcomeValues,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
