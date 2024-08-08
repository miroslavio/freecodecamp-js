let price = 19.5;
let cid = [
  ['PENNY', 0.1],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];

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

const cash = document.querySelector("#cash");
const purchaseBtn = document.querySelector("#purchase-btn");
const changeDue = document.querySelector("#change-due");
const register = document.querySelector("#register");

class CashRegister {
  constructor(cid) {
    this.cid = cid.slice().reverse(); //makes more sense to always try highest denominations first
    this.status = "OPEN";
  }

  getTotalCash() {
    const total = this.cid.reduce((total, currency) => total + currency[1], 0);
    return parseFloat(total.toFixed(2));
  }

  getCashByDenomination(denomination) {
    const currency = this.cid.find(item => item[0] === denomination);
    return currency ? currency[1] : 0;
  }

  getCountByDenomination(denomination) {
    const cashByDenomination = this.getCashByDenomination(denomination);
    return Math.floor(cashByDenomination / currencyUnit[denomination]);
  }

  // calculate difference between cash and price and return an object of currency and corresponding amount, i.e. 
  getChange(cash) {
    let change = Number((cash - price).toFixed(2));

    if (change > this.getTotalCash()) {
      this.status = "INSUFFICIENT_FUNDS";
      return {};
    }

    const changeObj = {};

    this.cid.forEach(currency => {
      const denomination = currency[0];
      const denominationValue = currencyUnit[denomination];

      while(this.getCountByDenomination(currency[0]) > 0 && change >= denominationValue) {
        change -= denominationValue;
        change = Number(change.toFixed(2));
        currency[1] -= denominationValue;
        currency[1] = Number(currency[1].toFixed(2));
        changeObj[denomination] = (changeObj[denomination] || 0) + denominationValue;
        changeObj[denomination] = Number(changeObj[denomination].toFixed(2));
      }
    });

    if (change > 0) {
      this.status = "INSUFFICIENT_FUNDS";
      return {};
    }

    if (this.getTotalCash() > 0) {
      this.status = "OPEN";
    } else {
      this.status = "CLOSED"
    }

    return changeObj;
  }
}

const updateChangeDue = (status, changeObj) => {
  changeDue.innerHTML = "";
  changeDue.innerHTML += `<p>Status: ${status}</p>`;
  for (const [key, value] of Object.entries(changeObj)) {
    changeDue.innerHTML += `<p>${key}: $${value}</p>`;
  }
}

const updateRegisterAmount = () => {
  register.innerHTML = "<h2>Cash left in register</h2>";

  cid.forEach(money => {
    register.innerHTML += `<p>${money[0].toLowerCase()}: $${money[1]}</p>`;
  })
};

updateRegisterAmount();

purchaseBtn.addEventListener("click", () => {
  
  const cashRegister = new CashRegister(cid);

  if (!cash.value) return; 

  if (cash.value < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash.value == price) {
    changeDue.textContent = "No change due - customer paid with exact cash"
    return;
  }

  const changeGiven = cashRegister.getChange(cash.value);
  updateRegisterAmount();
  updateChangeDue(cashRegister.status, changeGiven);
});