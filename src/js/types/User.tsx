import type Account from "@js/types/Account";
import type Budget from "@js/types/Budget";

interface User {
  name: string;
  email: string;
  defaultCurrency: string;
  accounts: { [accountId: string]: Account };
  budgets: { [budgetId: string]: Budget };
  categories: Category[];
}

export type Category = {
  id: string;
  name: string;
  expense: boolean;
};

export default User;
