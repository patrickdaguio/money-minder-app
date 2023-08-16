interface Transaction {
  date: string;
  amount: number;
  description: string;
  category: string;
  type: "income" | "expense";
}

export default Transaction;
