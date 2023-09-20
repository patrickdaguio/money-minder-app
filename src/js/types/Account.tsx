import type Transaction from "@js/types/Transaction";

interface Account {
  id: string;
  name: string;
  balance: number;
  type: string;
  transactions?: { [transactionId: string]: Transaction };
}

export default Account;
