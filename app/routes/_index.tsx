import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import CandlestickChart from "~/components/CandlestickChart";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const DEFAULT_TRADING_PAIR = "BTCUSDT";
const ETH_TRADING_PAIR = "ETHUSDT";

export default function Index() {
  const [symbol, setSymbol] = useState(DEFAULT_TRADING_PAIR);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "green",
      }}
    >
      <select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", fontSize: "16px" }}
      >
        <option value={DEFAULT_TRADING_PAIR}>BTC/USDT</option>
        <option value={ETH_TRADING_PAIR}>ETH/USDT</option>
      </select>
      <CandlestickChart symbol={symbol} />
    </div>
  );
}
