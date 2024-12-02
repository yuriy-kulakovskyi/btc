import React from "react";
import { useWebSocket } from "./hooks/useWebSocket";
import Button from "./components/Button";
import TransactionsList from "./components/TransactionsList";

const App: React.FC = () => {
  const { transactions, totalSum, isSubscribed, start, stop, reset } = useWebSocket();

  return (
    <div className="p-[20px]">
      <h1 className="mb-[20px]">Bitcoin Transactions</h1>
      <div>
        <Button onClick={start} disabled={isSubscribed}>
          Запуск
        </Button>
        <Button onClick={stop} disabled={!isSubscribed}>
          Зупинка
        </Button>
        <Button onClick={reset}>Скинути</Button>
      </div>

      <h2 className="mb-[20px]">Сума транзакцій: {totalSum.toFixed(8)} BTC</h2>

      <TransactionsList transactions={transactions} />
    </div>
  );
};

export default App;