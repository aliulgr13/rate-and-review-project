export const computeAverageStar = (reviews) => {
  const totalRates = reviews.reduce((acc, cur) => {
    return acc + cur.star;
  }, 0);
  return reviews.length === 0
    ? 0
    : Math.round((totalRates / reviews.length) * 10) / 10;
};
