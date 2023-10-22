import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React, { useContext } from "react";
import db from "@js/utilities/firebase";
import { doc, addDoc, collection } from "firebase/firestore";
import { cn } from "@/lib/utils";

import AuthContext from "@js/context/AuthContext";
import Account from "@js/types/Account";

interface Props {
  addAccount: (account: Account) => void;
}

const formSchema = z.object({
  name: z.string({
    required_error: "A name is required.",
  }),
  type: z.string({
    required_error: "A type is required.",
  }),
  balance: z.string({
    required_error: "A balance is required.",
  }),
});

const Create: React.FC<Props> = ({ addAccount }) => {
  const { currentUser } = useContext(AuthContext);
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      balance: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!currentUser) return;

    const userID = currentUser.uid;

    // Reference the user's document.
    const userDocRef = doc(db, "users", userID);

    // Get "accounts" subcollection within the user document.
    const accountsCollectionRef = collection(userDocRef, "accounts");

    const accountData = {
      name: values.name,
      type: values.type,
      balance: +values.balance,
    };

    // Add a new document to the "names" subcollection with your name.
    const nameDocRef = await addDoc(accountsCollectionRef, accountData);

    addAccount({
      id: nameDocRef.id,
      ...accountData,
    });

    form.reset();

    toast({
      description: "Account successfully added.",
    });
  };

  return (
    <div className="card">
      <h1 className="font-bold text-2xl mb-4">Add new account</h1>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "w-[220px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
    </div>
  );
};

export default Create;
