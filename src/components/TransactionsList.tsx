import React from "react";
import { Transaction } from "../interfaces/Transaction";

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  return (
    <ul className="list-none p-0">
      {transactions.map((tx) => (
        <li className="mb-[10px]" key={tx.hash}>
          <strong>{tx.hash}</strong> — {tx.value.toFixed(8)} BTC
        </li>
      ))}
    </ul>
  );
};

export default TransactionsList;