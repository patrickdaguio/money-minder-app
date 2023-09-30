import { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";
import AuthContext from "@js/context/AuthContext";
import { Category } from "../types/User";

import db from "@js/utilities/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const FormSchema = z.object({
  name: z.string({
    required_error: "A name is required.",
  }),
  type: z.string({
    required_error: "A type is required.",
  }),
});

const Categories = () => {
  const { currentUser } = useContext(AuthContext);

  const [userCategories, setUserCategories] = useState<Category[]>([]);
  const [defaultCategories, setDefaultCategories] = useState<Category[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      if (!currentUser) return;

      const userID = currentUser!.uid;

      try {
        const categoriesCollectionRef = collection(db, "categories");

        // Fetch data from the main "categories" collection
        const mainCategoriesQuerySnapshot = await getDocs(
          categoriesCollectionRef
        );

        const defaultCategoriesArray: Category[] = [];
        mainCategoriesQuerySnapshot.forEach((doc) => {
          const categoryData = {
            id: doc.id,
            ...doc.data(),
          } as Category;
          defaultCategoriesArray.push(categoryData);
        });

        // Fetch data from the "categories" subcollection inside the user's document
        const userDocRef = doc(db, "users", userID);
        const userCategoriesCollectionRef = collection(
          userDocRef,
          "categories"
        );

        const userCategoriesQuerySnapshot = await getDocs(
          userCategoriesCollectionRef
        );

        const userCategoriesArray: Category[] = [];
        userCategoriesQuerySnapshot.forEach((doc) => {
          const categoryData = {
            id: doc.id,
            ...doc.data(),
          } as Category;
          userCategoriesArray.push(categoryData);
        });

        // Set the combined categories array in your state or wherever needed
        setUserCategories(userCategoriesArray);
        setDefaultCategories(defaultCategoriesArray);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, [currentUser]);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    if (!currentUser) return;

    const userID = currentUser!.uid;

    const categoryId = values.name
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/-+/g, "-");

    try {
      const userDocRef = doc(db, "users", userID);

      // Create a reference to the "categories" subcollection within the user's document
      const categoriesCollectionRef = collection(userDocRef, "categories");

      // Define the data for the new category
      const categoryData = {
        id: categoryId,
        name: values.name,
        expense: values.type === "expense" ? true : false,
      };

      // Use setDoc to add the new category document to the "categories" subcollection
      await setDoc(doc(categoriesCollectionRef, categoryId), categoryData);

      userCategories.push(categoryData);
    } catch (error) {
      console.error(error);
    }

    form.reset();

    toast({
      description: "Category successfully added.",
    });
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (!currentUser) return;

    const userID = currentUser!.uid;

    try {
      const userDocRef = doc(db, "users", userID);
      const userCategoriesCollectionRef = collection(userDocRef, "categories");

      await deleteDoc(doc(userCategoriesCollectionRef, categoryId));

      setUserCategories((prevCategory) =>
        prevCategory.filter((category: Category) => category.id !== categoryId)
      );
    } catch (error) {
      console.log("Error deleting account: ", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card">
        <h2 className="font-bold text-2xl mb-4">Add Category</h2>
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
                        <SelectValue placeholder="Select the category type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="card w-full">
        <h2 className="font-bold text-2xl mb-4">My Categories</h2>
        <ul className="space-y-2">
          {userCategories.map((category) => (
            <li key={category.name} className="grid grid-cols-3">
              <span>{category.name}</span>
              <span>{category.expense ? "Expense" : "Income"}</span>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleDeleteCategory(category.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="card w-full">
        <h2 className="font-bold text-2xl mb-4">Default Categories</h2>
        <ul className="space-y-2">
          {defaultCategories.map((category) => (
            <li key={category.name} className="flex justify-between">
              <span>{category.name}</span>
              <span>{category.expense ? "Expense" : "Income"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
