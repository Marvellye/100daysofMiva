<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "links";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set the content type to JSON
header('Content-Type: application/json');

// Fetch all links
$sql = "SELECT github, linkedin, devto, portfolio FROM links";
$result = $conn->query($sql);

$links = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $links[] = $row;
    }
}

// Return JSON encoded array of links
echo json_encode($links);

$conn->close();
?>