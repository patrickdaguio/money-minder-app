import type Transaction from "@js/types/Transaction";

interface Accounts {
  name: string;
  balance: number;
  transactions: { [transactionId: string]: Transaction };
}

export default Accounts;
