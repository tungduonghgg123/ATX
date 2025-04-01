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
        width: "800px", // Limit the width to 800px
        margin: "0 auto", // Center the content horizontally
      }}
    >
      <select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={{
          alignSelf: "flex-end", // Align to the end of the row
          marginBottom: "20px",
          padding: "10px",
          fontSize: "16px",
        }}
      >
        <option value={DEFAULT_TRADING_PAIR}>BTC/USDT</option>
        <option value={ETH_TRADING_PAIR}>ETH/USDT</option>
      </select>
      <CandlestickChart symbol={symbol} />
      <p style={{ marginBottom: "20px", fontSize: "14px", color: "gray" }}>
        This chart is a live chart (GMT +7). Data gets updated every 1 minute.
      </p>
    </div>
  );
}
