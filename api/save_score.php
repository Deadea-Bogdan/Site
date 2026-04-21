<?php
header("Content-Type: application/json");
require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Date invalide"]);
    exit;
}

$user_id = isset($data["user_id"]) ? (int)$data["user_id"] : 0;
$game_name = isset($data["game_name"]) ? trim($data["game_name"]) : "";
$score = isset($data["score"]) ? (int)$data["score"] : 0;
$total_questions = isset($data["total_questions"]) ? (int)$data["total_questions"] : 0;

if ($user_id <= 0 || $game_name === "" || $total_questions <= 0) {
    echo json_encode(["success" => false, "message" => "Câmpuri lipsă"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO scores (user_id, game_name, score, total_questions) VALUES (?, ?, ?, ?)");
$stmt->bind_param("isii", $user_id, $game_name, $score, $total_questions);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Scor salvat"]);
} else {
    echo json_encode(["success" => false, "message" => "Eroare la salvare"]);
}

$stmt->close();
$conn->close();
?>