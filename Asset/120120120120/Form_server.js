// Memuat Bootstrap JS jika belum ada
(function loadBootstrap() {
    if (typeof bootstrap === "undefined") { // Cek apakah Bootstrap sudah ada
        let script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
        script.onload = () => console.log("Bootstrap Loaded!");
        document.head.appendChild(script);
    }
})();

// Memuat SweetAlert2 jika belum ada
(function loadSweetAlert() {
    if (!window.Swal) {
        let script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        script.onload = () => console.log("SweetAlert2 Loaded!");
        document.head.appendChild(script);
    }
})();

function submitReview() {
    var username = document.getElementById("username").value;
    var review = document.getElementById("review").value;
    var email = document.getElementById("email").value;

    // Ambil nilai rating yang dipilih
    var rating = document.querySelector('input[name="rating"]:checked');
    if (!rating) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Harap pilih rating sebelum mengirim review!",
        });
        return;
    }

    var data = {
        username: username,
        rating: rating.value,
        review: review,
        email: email
    };

    var scriptURL = "https://script.google.com/macros/s/AKfycbz-GYGTYq1D-8XQDldHwg_2fZyKDW6FCQjbxvIDsaAaZ3CGmj4J4tEi7lRrvBxNp_IVlA/exec";

    Swal.fire({
        title: "Mengirim review...",
        text: "Mohon tunggu sebentar",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    fetch(scriptURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        mode: 'no-cors'
    })
    .then(() => {
        Swal.fire({
            icon: "success",
            title: "Terima kasih!",
            text: "Review Anda berhasil dikirim.",
            confirmButtonColor: "#3085d6"
        });

        document.getElementById("reviewForm").reset();
    })
    .catch(error => {
        Swal.fire({
            icon: "error",
            title: "Gagal mengirim!",
            text: "Terjadi error: " + error.message,
            confirmButtonColor: "#d33"
        });
    });
}




// function submitReview() {
//     var username = document.getElementById("username").value;
//     var review = document.getElementById("review").value;
//     var email = document.getElementById("email").value;

//     // Ambil nilai rating yang dipilih
//     var rating = document.querySelector('input[name="rating"]:checked');
//     if (!rating) {
//         Swal.fire({
//             icon: "warning",
//             title: "Oops...",
//             text: "Harap pilih rating sebelum mengirim review!",
//         });
//         return;
//     }

//     var data = {
//         username: username,
//         rating: rating.value,
//         review: review,
//         email: email
//     };

//     // URL Google Apps Script (pastikan ini benar)
//     var scriptURL = "https://script.google.com/macros/s/AKfycbz-GYGTYq1D-8XQDldHwg_2fZyKDW6FCQjbxvIDsaAaZ3CGmj4J4tEi7lRrvBxNp_IVlA/exec";

//     // Tampilkan loading sebelum mengirim data
//     Swal.fire({
//         title: "Mengirim review...",
//         text: "Mohon tunggu sebentar",
//         allowOutsideClick: false,
//         showConfirmButton: false,
//         didOpen: () => {
//             Swal.showLoading();
//         }
//     });

//     fetch(scriptURL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data),
//         mode: 'no-cors'
//     })
//     .then(() => {
//         Swal.fire({
//             icon: "success",
//             title: "Terima kasih!",
//             text: "Review Anda berhasil dikirim.",
//             confirmButtonColor: "#3085d6"
//         });

//         document.getElementById("reviewForm").reset();
//     })
//     .catch(error => {
//         Swal.fire({
//             icon: "error",
//             title: "Gagal mengirim!",
//             text: "Terjadi error: " + error.message,
//             confirmButtonColor: "#d33"
//         });
//     });
// }
