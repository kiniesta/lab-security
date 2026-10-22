const chars = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~|}{[]:;?><,.-="
};

const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const copyBtn = document.getElementById("copyBtn");
const copiedNotice = document.getElementById("copiedNotice");
const generateBtn = document.getElementById("generateBtn");

const upperCb = document.getElementById("uppercase");
const lowerCb = document.getElementById("lowercase");
const numberCb = document.getElementById("numbers");
const symbolCb = document.getElementById("symbols");

// Actualizar visor numérico del slider
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

// Función de generación con aleatoriedad criptográfica
function generatePassword() {
  let pool = "";
  if (upperCb.checked) pool += chars.uppercase;
  if (lowerCb.checked) pool += chars.lowercase;
  if (numberCb.checked) pool += chars.numbers;
  if (symbolCb.checked) pool += chars.symbols;

  if (pool === "") {
    passwordInput.value = "Selecciona al menos una opción";
    return;
  }

  const length = parseInt(lengthSlider.value, 10);
  const randomArray = new Uint32Array(length);
  window.crypto.getRandomValues(randomArray);

  let result = "";
  for (let i = 0; i < length; i++) {
    result += pool[randomArray[i] % pool.length];
  }

  passwordInput.value = result;
}

// Copiar al portapapeles
copyBtn.addEventListener("click", async () => {
  const pwd = passwordInput.value;
  if (!pwd || pwd.includes("Selecciona")) return;

  try {
    await navigator.clipboard.writeText(pwd);
    copiedNotice.classList.remove("hidden");
    setTimeout(() => {
      copiedNotice.classList.add("hidden");
    }, 1500);
  } catch (err) {
    console.error("Error al copiar: ", err);
  }
});

// Listeners
generateBtn.addEventListener("click", generatePassword);

// Generar una contraseña automáticamente al abrir el popup
window.addEventListener("DOMContentLoaded", generatePassword);
