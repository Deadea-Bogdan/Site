let an = new Date().getFullYear();

document.getElementById("an").textContent = "An: " + an;

let titlu = document.querySelector("h1");

titlu.addEventListener("mouseover", function() {
    titlu.style.color = "blue";
});

titlu.addEventListener("mouseout", function() {
    titlu.style.color = "black";
});