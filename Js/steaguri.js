const anCurent = document.getElementById("anCurent");
const intrebareCurenta = document.getElementById("intrebareCurenta");
const totalIntrebari = document.getElementById("totalIntrebari");
const scorText = document.getElementById("scor");
const flagImage = document.getElementById("flagImage");
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
    imagine: "../images/france.png",
    intrebare: "Ce țară are acest steag?",
    raspunsuri: ["Franța", "Germania", "Italia", "Belgia"],
    corect: "Franța"
  },
  {
    imagine: "../images/germany.png",
    intrebare: "Ce țară are acest steag?",
    raspunsuri: ["România", "Belgia", "Germania", "Austria"],
    corect: "Germania"
  },
  {
    imagine: "../images/italy.png",
    intrebare: "Ce țară are acest steag?",
    raspunsuri: ["Italia", "Franța", "Irlanda", "Mexic"],
    corect: "Italia"
  },
  {
    imagine: "../images/japan.png",
    intrebare: "Ce țară are acest steag?",
    raspunsuri: ["Coreea de Sud", "Japonia", "China", "Singapore"],
    corect: "Japonia"
  },
  {
    imagine: "../images/romania.png",
    intrebare: "Ce țară are acest steag?",
    raspunsuri: ["Ciad", "Moldova", "România", "Andorra"],
    corect: "România"
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
  flagImage.src = q.imagine;
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
    rezultatText.textContent = "Excelent! Ai răspuns corect la toate întrebările.";
  } else if (scor >= 3) {
    rezultatText.textContent = "Rezultat bun! Mai poți exersa pentru un scor și mai mare.";
  } else {
    rezultatText.textContent = "Poți încerca din nou pentru a obține un rezultat mai bun.";
  }

  const rezultatJoc = {
  game_name: "Testul Steagurilor",
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