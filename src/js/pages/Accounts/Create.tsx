import React, { useState, useContext, type FormEvent } from "react";
import db from "@js/utilities/firebase";
import { doc, addDoc, collection } from "firebase/firestore";

import AuthContext from "@js/context/AuthContext";
import Account from "@js/types/Account";

interface Props {
  addAccount: (account: Account) => void;
}

const Create: React.FC<Props> = ({ addAccount }) => {
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [balance, setBalance] = useState("");

  const handleAddAccountSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!currentUser) return;

    const userID = currentUser.uid;

    // Reference the user's document.
    const userDocRef = doc(db, "users", userID);

    // Get "accounts" subcollection within the user document.
    const accountsCollectionRef = collection(userDocRef, "accounts");

    const accountData = {
      name,
      type,
      balance: +balance,
    };

    // Add a new document to the "names" subcollection with your name.
    const nameDocRef = await addDoc(accountsCollectionRef, accountData);

    addAccount({
      id: nameDocRef.id,
      ...accountData,
    });

    setName("");
    setBalance("");
    setType("");

    console.log("Account successfully added with ID: ", nameDocRef.id);
  };

  return (
    <div className="card">
      <h1 className="font-bold text-2xl mb-4">Add new account</h1>
      <form onSubmit={handleAddAccountSubmit}>
        <div className="form-group">
          <label htmlFor="account-name">Account Name</label>
          <input
            type="text"
            id="account-name"
            name="account-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="account-type">Type</label>
          <select
            value={type}
            name="account-type"
            id="account-type"
            onChange={(e) => setType(e.target.value)}>
            <option value="" disabled hidden>
              Choose here
            </option>
            <option value="savings">Savings</option>
            <option value="investments">Invesment</option>
            <option value="current">Current</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="account-balance">Balance</label>
          <input
            value={balance}
            type="number"
            id="account-balance"
            name="account-balance"
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>
        <button className="btn btn--primary" type="submit">
          Add account
        </button>
      </form>
    </div>
  );
};

export default Create;
