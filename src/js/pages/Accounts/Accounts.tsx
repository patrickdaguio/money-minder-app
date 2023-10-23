import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

import Account from "@js/types/Account";

import AuthContext from "@js/context/AuthContext";
import db from "@js/utilities/firebase";

import Create from "@js/pages/Accounts/Create";
import DataTable from "@/js/pages/Accounts/DataTable";
import columns from "@/js/pages/Accounts/DataColumns";

const Accounts = () => {
  const { currentUser } = useContext(AuthContext);
  const userID = currentUser!.uid;

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching accounts: ", error);
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, [userID]);

  const handleDeleteAccount = async (accountId: string) => {
    try {
      const userDocRef = doc(db, "users", userID);
      const accountsCollectionRef = collection(userDocRef, "accounts");

      await deleteDoc(doc(accountsCollectionRef, accountId));

      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== accountId)
      );
    } catch (error) {
      console.log("Error deleting account: ", error);
    }
  };

  const handleAddAccount = (account: Account) => {
    setAccounts((prevAccounts) => [...prevAccounts, account]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Create addAccount={handleAddAccount} />
      <div className="card mt-5">
        <h2 className="font-bold text-2xl mb-4">Accounts</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : accounts.length === 0 ? (
          <p>No accounts found.</p>
        ) : (
          <>
            <ul>
              {accounts.map((account) => (
                <li className="flex justify-between" key={account.id}>
                  <span>{account.name}</span>
                  <span>{account.balance}</span>
                  <button onClick={() => handleDeleteAccount(account.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <DataTable columns={columns} data={accounts}/>
          </>
        )}
      </div>
    </div>
  );
};

export default Accounts;
