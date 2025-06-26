// Universal encryptor using Unicode character codes

function encryptText(text, key) {
  if (!key) {
    alert("Please enter a key!");
    return "";
  }

  let result = "";

  for (let i = 0; i < text.length; i++) {
    const textCharCode = text.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    const encryptedCharCode = (textCharCode + keyCharCode) % 65535;
    result += String.fromCharCode(encryptedCharCode);
  }

  return result;
}

function decryptText(text, key) {
  if (!key) {
    alert("Please enter a key!");
    return "";
  }

  let result = "";

  for (let i = 0; i < text.length; i++) {
    const encryptedCharCode = text.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    let decryptedCharCode = encryptedCharCode - keyCharCode;
    if (decryptedCharCode < 0) decryptedCharCode += 65535;
    result += String.fromCharCode(decryptedCharCode);
  }

  return result;
}

function animateResult(resultText) {
  const resultEl = document.getElementById("result");
  resultEl.textContent = "";
  let i = 0;

  const interval = setInterval(() => {
    if (i < resultText.length) {
      resultEl.textContent += resultText[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, 10);
}

function showToast(message = "Скопійовано!") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function updateResult(isEncrypting) {
  let text = document.getElementById("message").value.trim(); // <== Ось тут trim()
  const key = document.getElementById("key").value;

  const result = isEncrypting ? encryptText(text, key) : decryptText(text, key);
  animateResult(result);
}

// Event Listeners
document.getElementById("enc-btn").addEventListener("click", () => {
  updateResult(true);
});

document.getElementById("dec-btn").addEventListener("click", () => {
  updateResult(false);
});

document.getElementById("result").addEventListener("click", () => {
  const text = document.getElementById("result").textContent;
  if (text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Скопійовано!");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateResult(true);
});
