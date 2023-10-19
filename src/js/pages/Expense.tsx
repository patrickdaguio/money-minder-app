import { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  query,
  orderBy,
  addDoc,
  getDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { CalendarIcon } from "@radix-ui/react-icons";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

import Account from "@js/types/Account";
import AuthContext from "@js/context/AuthContext";
import db from "@js/utilities/firebase";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string({
    required_error: "A name is required.",
  }),
  amount: z.string({
    required_error: "An amount is required.",
  }),
  date: z.date({
    required_error: "A date  is required.",
  }),
  account: z.string({
    required_error: "Please select an account.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  notes: z.string({
    required_error: "Please select a language.",
  }),
});

const Expense = () => {
  const { currentUser } = useContext(AuthContext);

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [openAccounts, setOpenAccounts] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  const userID = currentUser!.uid;

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

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

  useEffect(() => {
    // Retrieve all categories
    const fetchCategories = async () => {
      if (!currentUser) return;

      const userID = currentUser!.uid;

      try {
        const categoriesCollectionRef = collection(db, "categories");

        const querySnapshot = await getDocs(
          query(
            categoriesCollectionRef,
            where("expense", "==", true),
            orderBy("name")
          )
        );

        const categoriesArray: string[] = [];
        querySnapshot.forEach((doc) => {
          // Access the data for each document in the "names" subcollection.
          const categoryData = doc.data();
          categoriesArray.push(categoryData.name);
        });

        // Fetch data from the "categories" subcollection inside the user's document
        const userDocRef = doc(db, "users", userID);
        const userCategoriesCollectionRef = collection(
          userDocRef,
          "categories"
        );

        const userCategoriesQuerySnapshot = await getDocs(
          query(
            userCategoriesCollectionRef,
            where("expense", "==", true),
            orderBy("name")
          )
        );

        userCategoriesQuerySnapshot.forEach((doc) => {
          const categoryData = doc.data();
          categoriesArray.push(categoryData.name);
        });

        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, [currentUser]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!currentUser) return;

    const userID = currentUser.uid;

    try {
      // Reference the user's document.
      const userDocRef = doc(db, "users", userID);

      // Get "accounts" subcollection within the user document.
      const accountsCollectionRef = collection(userDocRef, "accounts");

      const accountDocRef = doc(accountsCollectionRef, values.account);

      // Fetch the current data of the account document.
      const accountDocSnapshot = await getDoc(accountDocRef);
      if (accountDocSnapshot.exists()) {
        // Get the current data.
        const currentData = accountDocSnapshot.data();

        // Modify the balance field.
        const newBalance = currentData.balance - +values.amount; // Change the balance as needed.

        // Create a new object with the updated balance.
        const updatedData = { ...currentData, balance: newBalance };

        // Update the document with the new data.
        await updateDoc(accountDocRef, updatedData);

        console.log("Balance updated successfully.");
      } else {
        console.error("Account document does not exist.");
      }

      const transactionsCollectionRef = collection(
        accountDocRef,
        "transactions"
      );

      const expenseData = {
        name: values.name,
        amount: +values.amount,
        account: values.account,
        category: values.category,
        notes: values.notes,
        date: values.date,
        type: "expense",
      };

      // Add a new document to the "names" subcollection with your name.
      const expenseDocRef = await addDoc(
        transactionsCollectionRef,
        expenseData
      );

      form.reset();

      toast({
        description: "Expense successfully added.",
      });
      console.log("Transaction successfully added with ID: ", expenseDocRef.id);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 card">
          <h1 className="font-bold text-2xl mb-4">Add Expense</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover open={openCategories} onOpenChange={setOpenCategories}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[220px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value
                          ? categories.find(
                              (category) => category === field.value
                            )
                          : "Select category"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[220px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search category..."
                        className="h-9"
                      />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={category}
                            key={category}
                            onSelect={() => {
                              form.setValue("category", category);
                              setOpenCategories(false);
                            }}>
                            {category}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                category === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Account</FormLabel>
                <Popover open={openAccounts} onOpenChange={setOpenAccounts}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[220px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value
                          ? accounts.find(
                              (account) => account.id === field.value
                            )?.name
                          : "Select account"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[220px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search account..."
                        className="h-9"
                      />
                      <CommandEmpty>No account found.</CommandEmpty>
                      <CommandGroup>
                        {accounts.map((account) => (
                          <CommandItem
                            value={account.id}
                            key={account.id}
                            onSelect={() => {
                              form.setValue("account", account.id);
                              setOpenAccounts(false);
                            }}>
                            {account.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                account.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[220px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Notes <span className="text-xs">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              className="w-full mt-4 text-base font-medium"
              size={"lg"}
              type="submit">
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Expense;
