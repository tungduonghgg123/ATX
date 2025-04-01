import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import { fetchCandlestickData } from "~/services/binance";

const CandlestickChart = ({ symbol }: { symbol: string }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create TradingView chart
    const chart = createChart(chartContainerRef.current, {
      width: 800,
      height: 400,
      timeScale: { timeVisible: true, secondsVisible: false },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries);

    // Fetch historical data

    fetchCandlestickData(symbol).then((data) => {
      candlestickSeries.setData(data);
    });

    // WebSocket for real-time updates
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1m`
    );

    ws.onmessage = (event) => {
      const { k: candle } = JSON.parse(event.data); // "k" contains candlestick data

      const newCandle = {
        time: candle.t / 1000, // Convert to seconds
        open: parseFloat(candle.o),
        high: parseFloat(candle.h),
        low: parseFloat(candle.l),
        close: parseFloat(candle.c),
      };

      if (candle.x) {
        candlestickSeries.update(newCandle);
      }
    };
    return () => {
      chart.remove();
      ws.close();
    };
  }, [symbol]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={chartContainerRef}
        style={{ width: "800px", height: "400px" }}
      />
    </div>
  );
};

export default CandlestickChart;
