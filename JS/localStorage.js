export function GetMaxValueNumber() {
  let max = -1;
  for (let index = 0; index < localStorage.length; index++) {
    let key = +localStorage.key(index);
    if (max < key) {
      max = key;
    }
  }

  return max + 1;
}

export function SortLocalStorage() {
  const keys = Object.keys(localStorage);

  const validNumbers = keys.filter(Number);

  const numericKeys = validNumbers.map((key) => parseInt(key, 10));

  numericKeys.sort((a, b) => a - b);

  let localStorageArray = [];
  for (const key of numericKeys) {
    const value = localStorage.getItem(key.toString());
    localStorageArray.push(value);
  }

  return { localStorageArray, numericKeys };
}

export function GetUsersFromLocalStorage() {
  const keys = Object.keys(localStorage);

  const validKeys = keys.filter((key) => key.startsWith("user"));

  let localStorageArray = [];
  for (const key of validKeys) {
    const value = localStorage.getItem(key.toString());
    localStorageArray.push(value);
  }

  return localStorageArray;
}
