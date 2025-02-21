<?php
$token = "#XzSMlMZT9XwMqXEb"; // Token autentikasi
$log_file = "server_log.txt";

if (!isset($_GET['action'])) {
    echo "Aksi tidak valid!";
    exit;
}

$action = $_GET['action'];

if ($action == "start") {
    exec("bash start_minecraft_server.sh");
    echo "Server sedang dimulai...";
} elseif ($action == "stop") {
    exec("bash stop_minecraft_server.sh");
    echo "Server sedang dimatikan...";
} else {
    echo "Aksi tidak valid!";
}
?>
