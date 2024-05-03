const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

button.addEventListener("click", () => {
  if (isEmpty()) {
    alert("Please input a value")
  } else {
    showResult();
  };
});

const isEmpty = () => input.value.length === 0;

function isPalindrome(str) {
  const reversedStr = str.toLowerCase().split('').reverse().join('');
  return str.toLowerCase() == reversedStr;
}

function getResult() {
  if (isPalindrome(cleanInput(input.value))) {
    return `<strong>${input.value}</strong> is a palindrome`
  }
  return `<strong>${input.value}</strong> is not a palindrome`
}

function showResult() {
  resultDiv.innerHTML = getResult();
}

function cleanInput(str) {
  const regex = /[^a-zA-Z0-9]/g;
  return str.toLowerCase().replace(regex, '');
}