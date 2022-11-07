export const getResults = (data: any) => {
  const res = data.reduce((cache: any, olympicWinner: any) => {
    const { age, athlete, gold, silver, bronze, total  } = olympicWinner;
    if (cache[athlete]) {
      const [g, s, b] = cache[athlete].data;
      cache[athlete].data = [g + gold, s + silver, b + bronze];
      cache[athlete].total += total;
      return cache;
    } else {
      cache[athlete] = {
        age,
        name: athlete,
        data: [gold, silver, bronze],
        total
      }
      return cache;
    }
  }, {});
  return Object.keys(res).slice(0, 5).map((id) => res[id]);
};
