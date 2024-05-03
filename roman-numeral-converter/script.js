const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const outputDiv = document.getElementById("output");

const romanNumerals = {
  1000: "M",
  900: "CM",
  500: "D",
  400: "CD",
  100: "C",
  90: "XC",
  50: "L",
  40: "XL",
  10: "X",
  9: "IX",
  5: "V",
  4: "IV",
  1: "I"
};

const decimalToRoman = (input) => {
  let result = "";

  const arabicNums = Object.keys(romanNumerals).sort((a, b,) => b - a); // descending sort
  
  if (input === 1) {
    return "I";
  }

  for (const arabicNum of arabicNums) {
    while (input >= arabicNum) {
      input -= arabicNum;
      result += romanNumerals[arabicNum];
    }
  }

  outputDiv.innerHTML = `<p>${result}</p>`;
};

const checkInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt)) {
    outputDiv.innerHTML = `<p>Please enter a valid number</p>`;
    return;
  }

  if (inputInt < 1) {
    outputDiv.innerHTML = `<p>Please enter a number greater than or equal to 1</p>`;
    return;
  }

  if (inputInt >= 4000) {
    outputDiv.innerHTML = `<p>Please enter a number less than or equal to 3999</p>`;
    return;
  }

  decimalToRoman(inputInt);
};

// Event listeners
convertBtn.addEventListener("click", checkInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput();
  }
});
