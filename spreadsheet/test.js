const string = "A1:A10";
const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;

const stringExpanded = string.replace(rangeRegex);
console.log(stringExpanded);