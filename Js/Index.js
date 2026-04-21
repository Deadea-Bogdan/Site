const anCurent = document.getElementById("anCurent");
const butonMesaj = document.getElementById("schimbaTextul");
const mesaj = document.getElementById("mesaj");

anCurent.textContent = new Date().getFullYear();

const mesaje = [
  "Ești pregătit să înveți geografia într-un mod interactiv?",
  "Începe cu testul steagurilor și vezi ce scor obții.",
  "Geo Quiz te ajută să exersezi rapid și ușor.",
  "Poți învăța, te poți antrena și te poți compara cu alți jucători."
];

let i = 0;

butonMesaj.addEventListener("click", function () {
  i++;
  if (i >= mesaje.length) {
    i = 0;
  }
  mesaj.textContent = mesaje[i];
});