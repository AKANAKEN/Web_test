<?php
$log_file = "server_log.txt";

if (!file_exists($log_file)) {
    echo "Log tidak ditemukan!";
    exit;
}

$log_data = file($log_file);
$last_line = trim(end($log_data));

if (strpos($last_line, "Server started.") !== false) {
    echo "ONLINE";
} elseif (strpos($last_line, "Server stopped.") !== false) {
    echo "OFFLINE";
} else {
    echo "STATUS TIDAK DIKETAHUI";
}
?>
