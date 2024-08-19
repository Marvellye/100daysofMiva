<?php
//This script returns an hello world on get request
header('Content-Type: application/json');

$response = [
    'message' => 'Hello, World!'
];

echo json_encode($response);
?>
