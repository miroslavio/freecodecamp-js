let price = 2;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
let cash = 10;
let status = "OPEN";
const currencyUnit = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

function getChange(cid, price, paid) {
  let change = paid - price;
  cid = cid.reverse();
  const changeObj = {};

  cid.forEach(cash => {
    const denomination = cash[0];
    const denominationValue = currencyUnit[denomination];
    let denominationCount = Math.round(cash[1] / denominationValue);

    while (denominationCount > 0 && change >= denominationValue) {
      change -= denominationValue;
      cash[1] -= denominationValue;
      denominationCount--;
      changeObj[denomination] = (changeObj[denomination] || 0) + denominationValue;
    }
  })

  return changeObj;
}

getChange(cid, price, cash);