import {
  lowercaseLetters,
  numbers,
  symbols,
  uppercaseLetters,
} from "./constants.js";

export function doPassword(Len, IUpp, ILow, INum, ISym) {
  let finalPassword = "";
  let allCharacters = "";

  if (IUpp) allCharacters += uppercaseLetters;
  if (ILow) allCharacters += lowercaseLetters;
  if (INum) allCharacters += numbers;
  if (ISym) allCharacters += symbols;

  for (let i = 0; i < Len; i++) {
    finalPassword +=
      allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  return finalPassword;
}
