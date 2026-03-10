let teste = document.querySelectorAll("li");

teste.forEach(function(test) {

    test.addEventListener("click", function() {
        alert("Ai ales: " + test.textContent);
    });

});