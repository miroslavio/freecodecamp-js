"use strict";

const numberInput = document.querySelector("#user-input");
const checkBtn = document.querySelector("#check-btn");
const clearBtn = document.querySelector("#clear-btn");
const resultsDiv = document.querySelector("#results-div");

function checkNumber() {
  const number = numberInput.value;

  if (!number) {
    alert("Please provide a phone number");
    return;
  }
  console.log(number);
  const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;
  const result = document.createElement("p");

  if (phoneRegex.test(number)) {
    result.textContent = `Valid US number: ${number}`;
    console.log("valid number");
  } else {
    result.textContent = `Invalid US number: ${number}`;
    console.log("invalid number");
  }

  resultsDiv.insertBefore(result, resultsDiv.firstChild);
}

function resetScreen() {
  resultsDiv.innerHTML = "";
  numberInput.value = "";
}

checkBtn.addEventListener("click", checkNumber);
clearBtn.addEventListener("click", resetScreen);
