<?php
require_once "../config/db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
    $confirm_password = trim($_POST["confirm_password"]);

    if ($username === "" || $email === "" || $password === "" || $confirm_password === "") {
        die("Toate câmpurile sunt obligatorii.");
    }

    if ($password !== $confirm_password) {
        die("Parolele nu coincid.");
    }

    $check = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $check->bind_param("ss", $username, $email);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        die("Există deja un utilizator cu acest nume sau email.");
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashed_password);

    if ($stmt->execute()) {
        echo "Înregistrare realizată cu succes. <a href='../Pages/login.html'>Mergi la logare</a>";
    } else {
        echo "Eroare la înregistrare.";
    }

    $stmt->close();
    $check->close();
    $conn->close();
}
?>