async function fetchCandlestickData(symbol = "BTCUSDT") {
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=100`;
  const response = await fetch(url);
  const data = await response.json();

  return data.map((candle) => ({
    time: candle[0] / 1000 + PADDING_GMT_OFFSET, // Convert to seconds
    open: parseFloat(candle[1]),
    high: parseFloat(candle[2]),
    low: parseFloat(candle[3]),
    close: parseFloat(candle[4]),
  }));
}
const PADDING_GMT_OFFSET = 25200; // GMT+7 offset in seconds

export { fetchCandlestickData, PADDING_GMT_OFFSET };
