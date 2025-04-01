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

    fetchCandlestickData().then((data) => {
      candlestickSeries.setData(data);
    });
    return () => {
      chart.remove();
    };
  }, [symbol]);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }} />
  );
};

export default CandlestickChart;
