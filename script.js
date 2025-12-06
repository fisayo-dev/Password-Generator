const passwordInput = document.querySelector(".password");
const lengthSlider = document.getElementById("length-sli");
const lengthDisplay = document.getElementById("length-value");
const upperCaseCheckBox = document.getElementById("uppercase");
const lowerCaseCheckBox = document.getElementById("lowercase");
const numbersCheckBox = document.getElementById("numbers");
const symbolsCaseCheckBox = document.getElementById("symbols");
const regenerateButton = document.getElementById("regen-btn");
const strengthTxt = document.getElementById("strength-txt");
const strengthBar = document.querySelector(".strength-bar");

const uppercaseLetters = "ABCDEFGHIJKMNLOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijkmnlopqrstuvwxyz";
const numbers = "1234567890";
const symbols = "!@#$%^&*()_-'+=:;?><,./~`|";

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

regenerateButton.addEventListener("click", makepassword);

function makepassword() {
  const length = Number(lengthSlider.value);
  const includeUpper = upperCaseCheckBox.checked;
  const includeLower = lowerCaseCheckBox.checked;
  const includeNumbers = numbersCheckBox.checked;
  const includeSymbols = symbolsCaseCheckBox.checked;

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
