export const setEndDate = (days: number) => {
  const now = Date.now();
  const daysToMilisec = days * 24 * 60 * 60 * 1000;
  const endDate = new Date(now + daysToMilisec).valueOf();
  return endDate;
};

export const formatMilicesToHMS = (milisec?: string) => {
  if (!milisec) {
    return '';
  }

  const now = Date.now();
  const secondsLeft = Math.floor((Number(milisec) - now) / 1000);
  const hours = Math.floor(secondsLeft / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((secondsLeft % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(secondsLeft % 60)
    .toString()
    .padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};
