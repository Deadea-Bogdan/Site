const an = document.getElementById("an");
const anFooter = document.getElementById("anFooter");
const mesajSite = document.getElementById("mesajSite");
const schimbaMesajul = document.getElementById("schimbaMesajul");

const anCurent = new Date().getFullYear();

an.textContent = anCurent;
anFooter.textContent = anCurent;

const mesaje = [
  "Geo Quiz își propune să transforme noțiunile de geografie într-o experiență mai interactivă și mai plăcută.",
  "Prin teste simple și clare, utilizatorul poate învăța geografia într-un mod accesibil.",
  "Site-ul combină exercițiul, verificarea cunoștințelor și motivația oferită de clasament.",
  "Geo Quiz este gândit ca un proiect introductiv, ușor de utilizat și ușor de extins."
];

let i = 0;

schimbaMesajul.addEventListener("click", function () {
  i++;
  if (i >= mesaje.length) {
    i = 0;
  }

  mesajSite.textContent = mesaje[i];
});