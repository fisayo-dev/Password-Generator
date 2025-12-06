import {
  lowercaseLetters,
  numbers,
  symbols,
  uppercaseLetters,
} from "./constants.js";

// Selectors
const passwordInput = document.querySelector(".password");
const lengthSlider = document.querySelector("#length-sli");
const lengthDisplay = document.querySelector("#length-value");
const upperCaseCheckBox = document.querySelector("#uppercase");
const lowerCaseCheckBox = document.querySelector("#lowercase");
const numbersCheckBox = document.querySelector("#numbers");
const symbolsCaseCheckBox = document.querySelector("#symbols");
const regenerateButton = document.querySelector("#regen-btn");
const strengthTxt = document.querySelector("#strength-txt");
const strengthBar = document.querySelector(".strength-bar");

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

regenerateButton.addEventListener("click", makepassword);

// Functions

// Make password function
function makepassword() {
  const length = Number(lengthSlider.value);
  const includeUpper = upperCaseCheckBox.checked;
  const includeLower = lowerCaseCheckBox.checked;
  const includeNumbers = numbersCheckBox.checked;
  const includeSymbols = symbolsCaseCheckBox.checked;

  //   Logic for strength
  let strength = "low";
  let strengthScore = 1;

  if (length <= 10) {
    strengthScore += 5;
  } else if (length <= 15) {
    strengthScore += 10;
  } else {
    strengthScore += 15;
  }

  if (includeNumbers) strengthScore += 5;
  if (includeSymbols) strengthScore += 10;

  if (strengthScore <= 10) {
    strength = "low";
  } else if (strengthScore <= 25) {
    strength = "medium";
  } else {
    strength = "high";
  }

  if (!includeLower && !includeNumbers && !includeSymbols && !includeUpper) {
    alert("Please select at least one char type");
    return;
  }

  // Create new password with parameters
  const newPassword = doPassword(
    length,
    includeUpper,
    includeLower,
    includeNumbers,
    includeSymbols
  );
  strengthTxt.textContent = strength;
  passwordInput.textContent = newPassword;
  strengthBar.style.width = (strengthScore / 30) * 100 + "%";
}

// Actual password generation
function doPassword(Len, IUpp, ILow, INum, ISym) {
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
