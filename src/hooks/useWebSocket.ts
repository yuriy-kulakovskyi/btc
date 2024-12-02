import { useEffect, useRef, useState } from "react";
import { Transaction } from "../interfaces/Transaction";

const WEBSOCKET_URL = "wss://ws.blockchain.info/inv";

export const useWebSocket = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  const start = () => {
    if (!isSubscribed) {
      wsRef.current = new WebSocket(WEBSOCKET_URL);

      wsRef.current.onopen = () => {
        wsRef.current?.send(JSON.stringify({ op: "unconfirmed_sub" }));
        setIsSubscribed(true);
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data?.x) {
          const value = data.x.out.reduce(
            (sum: number, output: { value: number }) => sum + output.value,
            0
          );

          const transaction: Transaction = {
            hash: data.x.hash,
            value: value / 100000000,
          };

          setTransactions((prev) => [transaction, ...prev]);
          setTotalSum((prev) => prev + transaction.value);
        }
      };

      wsRef.current.onclose = () => {
        setIsSubscribed(false);
      };
    }
  };

  const stop = () => {
    if (isSubscribed && wsRef.current) {
      wsRef.current.send(JSON.stringify({ op: "unconfirmed_unsub" }));
      wsRef.current.close();
      setIsSubscribed(false);
    }
  };

  const reset = () => {
    setTransactions([]);
    setTotalSum(0);
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return { transactions, totalSum, isSubscribed, start, stop, reset };
};
