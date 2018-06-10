import _ from 'lodash';

export const parseStockData = (stock, dataSets) => {
  const { chart, quote } = stock;
  const parsedDataSets = { prices: {}, dates: {} };
  let dates = _.reverse(chart.map(data => data.date));
  let latestDate = `${new Date().getMonth() + 1}/${new Date().getDate()}`;

  for (let i = 0; i < dataSets.length; i++) {
    let prices = _.reverse(Object.values(chart));
    let latestPrice = _.round(quote.latestPrice, 2);
    let set = dataSets[i];

    prices = prices.slice(0, new Date().getDay() - 1)
    prices = prices.map(date => _.round(date[set], 2));

    _.reverse(prices)
    prices.push(latestPrice);
    parsedDataSets.prices[set] = prices;
  }

  dates = dates.slice(0, new Date().getDay() - 1).map(date => {
    date = date.slice(5).split('-')
    date = date.map(num => parseInt(num, 10).toString())
    return date.join('/')
  });
  _.reverse(dates)
  dates.push(latestDate);
  parsedDataSets.dates = dates;

  return parsedDataSets;
}
