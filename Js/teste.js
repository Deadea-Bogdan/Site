const anCurent = document.getElementById("anCurent");
const testMesaj = document.getElementById("testMesaj");
const butoane = document.querySelectorAll(".test-btn");

anCurent.textContent = new Date().getFullYear();

butoane.forEach(function (buton) {
  buton.addEventListener("click", function () {
    const numeTest = buton.getAttribute("data-test");
    testMesaj.textContent = "Ai selectat: " + numeTest + ". În această etapă poți conecta butonul la pagina sau logica testului.";
  });
});