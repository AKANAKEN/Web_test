document.getElementById('websiteForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Mendapatkan nilai dari form
    const name = document.getElementById('name').value;
    const link = document.getElementById('link').value;

    // Mengirim data ke Node.js menggunakan AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/save_website', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            if (response.status === 'success') {
                addWebsiteToList(name, link);
                alert(response.message);
            } else {
                alert('Error: ' + response.message);
            }
        }
    };

    xhr.send('name=' + encodeURIComponent(name) + '&link=' + encodeURIComponent(link));

    // Mengosongkan form setelah submit
    document.getElementById('websiteForm').reset();
});

// Fungsi untuk menambahkan website ke list
function addWebsiteToList(name, link) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong> - <a href="${link}" target="_blank">${link}</a>`;
    document.getElementById('websiteList').appendChild(li);
}
