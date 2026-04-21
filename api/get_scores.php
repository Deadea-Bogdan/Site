<?php
header("Content-Type: application/json");
require_once "../config/db.php";

$sql = "
    SELECT users.username, scores.game_name, scores.score, scores.total_questions, scores.played_at
    FROM scores
    INNER JOIN users ON scores.user_id = users.id
    ORDER BY scores.score DESC, scores.played_at ASC
";

$result = $conn->query($sql);

$rezultate = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $rezultate[] = $row;
    }
}

echo json_encode($rezultate);

$conn->close();
?>