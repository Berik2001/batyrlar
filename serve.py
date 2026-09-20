"""Локальный dev-сервер без кеширования: правки CSS/JS видны сразу после обновления страницы."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

if __name__ == "__main__":
    print("Batyrlar.com → http://localhost:5173")
    ThreadingHTTPServer(("", 5173), NoCacheHandler).serve_forever()
