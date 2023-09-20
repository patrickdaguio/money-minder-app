import { FormEvent, useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";

import Account from "@js/types/Account";

import AuthContext from "@js/context/AuthContext";
import db from "@js/utilities/firebase";

const Expense = () => {
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser!.uid;

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Retrieve all documents from the "accounts" subcollection.
    const fetchAccounts = async () => {
      try {
        const userDocRef = doc(db, "users", userID);
        const accountsCollectionRef = collection(userDocRef, "accounts");

        const querySnapshot = await getDocs(
          query(accountsCollectionRef, orderBy("name"))
        );

        const accountsArray: Account[] = [];
        querySnapshot.forEach((doc) => {
          // Access the data for each document in the "names" subcollection.
          const accountData = doc.data();
          accountsArray.push({
            id: doc.id,
            name: accountData.name as string,
            balance: accountData.balance as number,
            type: accountData.type as string,
          });
        });
        setAccounts(accountsArray);
      } catch (error) {
        console.error("Error fetching accounts: ", error);
      }
    };

    fetchAccounts();
  }, [userID]);

  const handleAddExpenseSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!currentUser) return;

    const userID = currentUser.uid;

    // Reference the user's document.
    const userDocRef = doc(db, "users", userID);

    // Get "accounts" subcollection within the user document.
    const accountsCollectionRef = collection(userDocRef, "accounts");

    const accountDocRef = doc(accountsCollectionRef, account);

    const transactionsCollectionRef = collection(accountDocRef, "transactions");

    const expenseData = {
      name,
      amount: +amount,
      account,
      category,
      description,
      date,
      type: "expense",
    };

    // Add a new document to the "names" subcollection with your name.
    const expenseDocRef = await addDoc(transactionsCollectionRef, expenseData);

    setName("");
    setAmount(0);
    setAccount("");
    setCategory("");
    setDescription("");
    setDate("");

    console.log("Account successfully added with ID: ", expenseDocRef.id);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="font-bold text-2xl mb-4">Add Expense</h1>
        <form onSubmit={handleAddExpenseSubmit}>
          <div className="form-group">
            <label htmlFor="expense-name">Name</label>
            <input
              type="text"
              id="expense-name"
              name="expense-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expense-amount">Amount</label>
            <input
              type="number"
              id="expense-amount"
              name="expense-amount"
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expense-account">Account</label>
            <select
              name="expense-account"
              id="expense-account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}>
              <option value="" disabled hidden>
                Choose account
              </option>
              {accounts.map((account) => (
                <option value={account.id} key={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="expense-category">Category</label>
            <select
              name="expense-category"
              id="expense-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled hidden>
                Choose category
              </option>
              <option value="food">Food</option>
              <option value="leisure">Leisure</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="expense-description">Description</label>
            <input
              type="text"
              id="expense-description"
              name="expense-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expense-date">Date</label>
            <input
              type="date"
              id="expense-date"
              name="expense-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button className="btn btn--primary" type="submit">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default Expense;
