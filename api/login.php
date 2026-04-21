<?php
session_start();
require_once "../config/db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    if ($username === "" || $password === "") {
        die("Completează toate câmpurile.");
    }

    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user["password"])) {
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["username"] = $user["username"];

            echo "Logare reușită. Bine ai venit, " . htmlspecialchars($user["username"]) . "! <a href='../Pages/Index.html'>Mergi la site</a>";
        } else {
            echo "Parolă greșită.";
        }
    } else {
        echo "Utilizator inexistent.";
    }

    $stmt->close();
    $conn->close();
}
?>