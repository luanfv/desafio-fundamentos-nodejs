import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionInterface {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, type, title }: TransactionInterface): Transaction {
    if (type !== 'income' && type !== 'outcome')
      throw Error("The type has to be 'income' or 'outcome'");

    if (typeof value !== 'number' && typeof value !== 'number')
      throw Error("The value has to be number");

    if (type === 'outcome' && value > this.transactionsRepository.getBalance().total)
      throw Error("The value has to be number");

    const transaction = new Transaction({ title, value, type });
    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
