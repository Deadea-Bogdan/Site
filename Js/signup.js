const anCurent = document.getElementById("anCurent");
const signupForm = document.getElementById("signupForm");
const formMesaj = document.getElementById("formMesaj");
const mesajInfo = document.getElementById("mesajInfo");

anCurent.textContent = new Date().getFullYear();

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  if (username === "" || email === "" || password === "" || confirmPassword === "") {
    formMesaj.textContent = "Te rog completează toate câmpurile.";
    mesajInfo.textContent = "Formularul trebuie completat integral înainte de trimitere.";
    return;
  }

  if (password.length < 6) {
    formMesaj.textContent = "Parola trebuie să aibă cel puțin 6 caractere.";
    mesajInfo.textContent = "Alege o parolă puțin mai lungă pentru validare.";
    return;
  }

  if (password !== confirmPassword) {
    formMesaj.textContent = "Parolele nu coincid.";
    mesajInfo.textContent = "Verifică parola introdusă și confirmarea acesteia.";
    return;
  }

  formMesaj.textContent = "Contul a fost validat local. Poți conecta aici logica de înregistrare.";
  mesajInfo.textContent = "Datele au trecut validarea de bază din JavaScript.";
  signupForm.reset();
});