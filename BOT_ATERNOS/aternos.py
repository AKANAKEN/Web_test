import requests
from bs4 import BeautifulSoup

class Aternos:
    BASE_URL = "https://aternos.org"
    
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.session = requests.Session()
        self.logged_in = False

    def login(self):
        """Login ke akun Aternos"""
        login_url = f"{self.BASE_URL}/go/"
        login_page = self.session.get(login_url)

        if "Login" in login_page.text:
            login_data = {"user": self.username, "password": self.password}
            response = self.session.post(f"{self.BASE_URL}/ajax/account/login", data=login_data)
            if response.status_code == 200 and "error" not in response.text:
                self.logged_in = True
                return True
        return False

    def get_servers(self):
        """Mengambil daftar server Aternos"""
        if not self.logged_in:
            self.login()
        response = self.session.get(f"{self.BASE_URL}/servers/")
        soup = BeautifulSoup(response.text, "html.parser")
        servers = soup.find_all("div", class_="server-body")
        server_list = []

        for server in servers:
            server_id = server["data-id"]
            server_name = server.find("div", class_="server-name").text.strip()
            server_status = server.find("div", class_="statuslabel").text.strip()
            server_list.append({"id": server_id, "name": server_name, "status": server_status})
        
        return server_list

    def get_server_status(self, server_id):
        """Mengambil status server tertentu"""
        if not self.logged_in:
            self.login()
        response = self.session.get(f"{self.BASE_URL}/servers/")
        soup = BeautifulSoup(response.text, "html.parser")
        server = soup.find("div", {"data-id": server_id})
        if server:
            status = server.find("div", class_="statuslabel").text.strip()
            return status
        return "Unknown"

    def start_server(self, server_id):
        """Memulai server Aternos"""
        if not self.logged_in:
            self.login()
        start_url = f"{self.BASE_URL}/ajax/server/start"
        response = self.session.post(start_url, data={"id": server_id})
        return response.status_code == 200

    def stop_server(self, server_id):
        """Mematikan server Aternos"""
        if not self.logged_in:
            self.login()
        stop_url = f"{self.BASE_URL}/ajax/server/stop"
        response = self.session.post(stop_url, data={"id": server_id})
        return response.status_code == 200
