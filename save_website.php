<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Mendapatkan data dari request POST
    $name = $_POST['name'];
    $link = $_POST['link'];

    // Mempersiapkan format data yang akan disimpan
    $data = $name . "," . $link . "\n";

    // Menyimpan data ke file database.txt
    file_put_contents('database.txt', $data, FILE_APPEND);

    // Mengembalikan response sukses
    echo json_encode(["status" => "success", "message" => "Data berhasil disimpan!"]);
} else {
    // Mengembalikan response jika metode tidak sesuai
    echo json_encode(["status" => "error", "message" => "Metode tidak diizinkan"]);
}
?>
