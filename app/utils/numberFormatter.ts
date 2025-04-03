export function addThousandSeparator(num: number): string {
  return num.toLocaleString();
}
export const checkAuctionActive = (
  startTime: string,
  endTime: string
): boolean => {
  const currentTime = new Date();
  return currentTime >= new Date(startTime) && currentTime <= new Date(endTime);
};
