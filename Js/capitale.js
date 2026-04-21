const anCurent = document.getElementById("anCurent");
const intrebareCurenta = document.getElementById("intrebareCurenta");
const totalIntrebari = document.getElementById("totalIntrebari");
const scorText = document.getElementById("scor");
const countryName = document.getElementById("countryName");
const questionText = document.getElementById("questionText");
const answersBox = document.getElementById("answersBox");
const mesajRaspuns = document.getElementById("mesajRaspuns");
const nextBtn = document.getElementById("nextBtn");
const finalBox = document.getElementById("finalBox");
const scorFinal = document.getElementById("scorFinal");
const rezultatText = document.getElementById("rezultatText");
const restartBtn = document.getElementById("restartBtn");
const quizBox = document.querySelector(".quiz-box");

anCurent.textContent = new Date().getFullYear();

const intrebari = [
  {
    tara: "Franța",
    intrebare: "Care este capitala acestei țări?",
    raspunsuri: ["Paris", "Roma", "Madrid", "Berlin"],
    corect: "Paris"
  },
  {
    tara: "Germania",
    intrebare: "Care este capitala acestei țări?",
    raspunsuri: ["Viena", "Berlin", "Praga", "Bruxelles"],
    corect: "Berlin"
  },
  {
    tara: "Italia",
    intrebare: "Care este capitala acestei țări?",
    raspunsuri: ["Roma", "Lisabona", "Atena", "Varșovia"],
    corect: "Roma"
  },
  {
    tara: "Japonia",
    intrebare: "Care este capitala acestei țări?",
    raspunsuri: ["Seul", "Beijing", "Tokyo", "Bangkok"],
    corect: "Tokyo"
  },
  {
    tara: "România",
    intrebare: "Care este capitala acestei țări?",
    raspunsuri: ["Cluj-Napoca", "București", "Iași", "Timișoara"],
    corect: "București"
  }
];

let indexCurent = 0;
let scor = 0;
let raspunsDat = false;

totalIntrebari.textContent = intrebari.length;

function afiseazaIntrebare() {
  const q = intrebari[indexCurent];

  intrebareCurenta.textContent = indexCurent + 1;
  scorText.textContent = scor;
  countryName.textContent = q.tara;
  questionText.textContent = q.intrebare;
  mesajRaspuns.textContent = "";
  nextBtn.style.display = "none";
  raspunsDat = false;

  answersBox.innerHTML = "";

  q.raspunsuri.forEach(function (raspuns) {
    const b = document.createElement("button");
    b.className = "answer-btn";
    b.textContent = raspuns;

    b.addEventListener("click", function () {
      if (raspunsDat) {
        return;
      }

      raspunsDat = true;

      const toateButoanele = document.querySelectorAll(".answer-btn");

      toateButoanele.forEach(function (btn) {
        btn.disabled = true;

        if (btn.textContent === q.corect) {
          btn.classList.add("corect");
        }
      });

      if (raspuns === q.corect) {
        b.classList.add("corect");
        mesajRaspuns.textContent = "Răspuns corect!";
        scor++;
        scorText.textContent = scor;
      } else {
        b.classList.add("gresit");
        mesajRaspuns.textContent = "Răspuns greșit!";
      }

      nextBtn.style.display = "inline-block";
    });

    answersBox.appendChild(b);
  });
}

nextBtn.addEventListener("click", function () {
  indexCurent++;

  if (indexCurent < intrebari.length) {
    afiseazaIntrebare();
  } else {
    terminaJoc();
  }
});

function terminaJoc() {
  quizBox.classList.add("ascuns");
  finalBox.classList.remove("ascuns");
  scorFinal.textContent = scor + " / " + intrebari.length;

  if (scor === intrebari.length) {
    rezultatText.textContent = "Excelent! Cunoști foarte bine capitalele.";
  } else if (scor >= 3) {
    rezultatText.textContent = "Rezultat bun! Mai poți exersa pentru un scor și mai mare.";
  } else {
    rezultatText.textContent = "Mai încearcă o dată pentru a învăța mai bine capitalele.";
  }

  const rezultatJoc = {
  game_name: "Testul Capitalelor",
  score: scor,
  total_questions: intrebari.length
};

fetch("../api/save_score.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(rezultatJoc)
})
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data.message);
})
.catch(function (error) {
  console.log("Eroare:", error);
});
}

restartBtn.addEventListener("click", function () {
  indexCurent = 0;
  scor = 0;
  finalBox.classList.add("ascuns");
  quizBox.classList.remove("ascuns");
  afiseazaIntrebare();
});

afiseazaIntrebare();