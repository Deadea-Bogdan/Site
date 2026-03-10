let form = document.querySelector("form");

form.addEventListener("submit", function(event) {

    let parola = document.querySelector('input[name="password"]').value;
    let confirm = document.querySelector('input[name="confirm_password"]').value;

    if (parola !== confirm) {
        alert("Parolele nu coincid!");
        event.preventDefault();
    }
});