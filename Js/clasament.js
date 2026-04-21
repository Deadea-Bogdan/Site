const anCurent = document.getElementById("anCurent");
const numarJucatori = document.getElementById("numarJucatori");
const scorMaxim = document.getElementById("scorMaxim");
const clasamentBody = document.getElementById("clasamentBody");

anCurent.textContent = new Date().getFullYear();

fetch("../api/get_scores.php")
  .then(function (response) {
    return response.json();
  })
  .then(function (rezultate) {
    numarJucatori.textContent = rezultate.length;

    if (rezultate.length > 0) {
      scorMaxim.textContent = rezultate[0].score;
    } else {
      scorMaxim.textContent = 0;
    }

    if (rezultate.length === 0) {
      clasamentBody.innerHTML = `
        <tr>
          <td colspan="4">Nu există scoruri salvate.</td>
        </tr>
      `;
      return;
    }

    rezultate.forEach(function (rezultat, index) {
      const rand = document.createElement("tr");

      rand.innerHTML = `
        <td>${index + 1}</td>
        <td>${rezultat.username}</td>
        <td>${rezultat.game_name}</td>
        <td>${rezultat.score} / ${rezultat.total_questions}</td>
      `;

      clasamentBody.appendChild(rand);
    });
  })
  .catch(function (error) {
    console.log("Eroare la încărcarea clasamentului:", error);
  });