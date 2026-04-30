"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string; // ISO string
}

export function useTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Transaction[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[];
      
      setTransactions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addTransaction = async (data: Omit<Transaction, "id">) => {
    if (!user) return;
    await addDoc(collection(db, "transactions"), {
      ...data,
      userId: user.uid,
      date: new Date(data.date).toISOString(),
    });
  };

  const deleteTransaction = async (id: string) => {
    await deleteDoc(doc(db, "transactions", id));
  };

  const updateTransaction = async (id: string, data: Omit<Transaction, "id">) => {
    if (!user) return;
    const docRef = doc(db, "transactions", id);
    await updateDoc(docRef, {
      ...data,
      date: new Date(data.date).toISOString(),
    });
  };

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return {
    transactions,
    loading,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    balance,
    updateTransaction,
  };
}