export function getRemaining(timestamp: number) {
  const now = Math.floor(Date.now() / 1000);
  const difference = timestamp - now;
  const secondsPerDay = 60 * 60 * 24;
  const totalDays = difference / secondsPerDay;
  const remainingDays = Math.ceil(totalDays);

  const endDate = new Date(timestamp * 1000);
  const day = endDate.getDate().toString().padStart(2, '0');
  const month = (endDate.getMonth() + 1).toString().padStart(2, '0');
  const year = endDate.getFullYear() % 100;
  const formattedDate = `${day}/${month}/${year}`;

  const percentageRemaining = ((remainingDays / 7) * 100).toFixed(2);

  return {
    days: remainingDays,
    date: formattedDate,
    percent: parseFloat(percentageRemaining)
  };
}
