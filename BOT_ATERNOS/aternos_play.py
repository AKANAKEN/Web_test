from aternos import Aternos

USERNAME = "your_aternos_username"
PASSWORD = "your_aternos_password"

aternos = Aternos(USERNAME, PASSWORD)

if aternos.login():
    server = aternos.get_server()
    if server:
        print(f"Server: {server['name']} | Status: {server['status']}")

        # Jalankan server
        if aternos.start_server(server["id"]):
            print("Server sedang dimulai...")

        # Stop server
        if aternos.stop_server(server["id"]):
            print("Server telah dimatikan.")
    else:
        print("Tidak ada server ditemukan.")
else:
    print("Login gagal!")
