import http.server
import socketserver
import urllib.parse
import json
import os

PORT = 8000
STATIC_DIR = os.path.join(os.path.dirname(__file__), 'static')

# Mock data definitions in Python for REST endpoints
CROPS = [
    {"id": "tomato", "name": "Tomato", "icon": "🍅", "basePrice": 28},
    {"id": "onion", "name": "Onion", "icon": "🧅", "basePrice": 24},
    {"id": "potato", "name": "Potato", "icon": "🥔", "basePrice": 20},
    {"id": "chilli", "name": "Chilli", "icon": "🌶️", "basePrice": 85},
    {"id": "cabbage", "name": "Cabbage", "icon": "🥬", "basePrice": 16},
    {"id": "brinjal", "name": "Brinjal", "icon": "🍆", "basePrice": 32},
    {"id": "cucumber", "name": "Cucumber", "icon": "🥒", "basePrice": 22},
    {"id": "carrot", "name": "Carrot", "icon": "🥕", "basePrice": 35},
    {"id": "capsicum", "name": "Capsicum", "icon": "🫑", "basePrice": 65},
    {"id": "garlic", "name": "Garlic", "icon": "🧄", "basePrice": 140},
    {"id": "banana", "name": "Banana", "icon": "🍌", "basePrice": 18},
    {"id": "mango", "name": "Mango", "icon": "🥭", "basePrice": 75},
    {"id": "watermelon", "name": "Watermelon", "icon": "🍉", "basePrice": 15},
    {"id": "grapes", "name": "Grapes", "icon": "🍇", "basePrice": 90},
    {"id": "apple", "name": "Apple", "icon": "🍎", "basePrice": 110},
    {"id": "orange", "name": "Orange", "icon": "🍊", "basePrice": 45}
]

BUYERS = [
    {
        "id": "b1", "name": "ABC Fresh Traders", "type": "Local Shop / Direct Buyer",
        "location": "Kolar Town", "distanceKm": 4.8, "crop": "tomato", "pricePerKg": 28.0,
        "rating": 4.9, "otherCostsEst": 200, "updatedAgo": "15 minutes ago"
    },
    {
        "id": "b2", "name": "City Wholesale APMC Yard", "type": "Regional Mandi",
        "location": "Bangalore Outskirts", "distanceKm": 34.5, "crop": "tomato", "pricePerKg": 30.5,
        "rating": 4.4, "otherCostsEst": 500, "updatedAgo": "1 hour ago"
    },
    {
        "id": "b3", "name": "GreenField Organics", "type": "Processing Plant",
        "location": "Hoskote Industrial Area", "distanceKm": 18.2, "crop": "tomato", "pricePerKg": 29.0,
        "rating": 4.7, "otherCostsEst": 300, "updatedAgo": "30 minutes ago"
    }
]

class FarmGainRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        query = urllib.parse.parse_qs(parsed_path.query)

        # API Routes
        if path == '/api/health':
            self.send_json({'status': 'ok', 'app': 'FarmGain v2.0 AI Backend', 'version': '2.0.0'})
            return

        elif path == '/api/prices':
            self.send_json({'status': 'success', 'crops': CROPS})
            return

        elif path == '/api/markets':
            crop_id = query.get('crop', ['tomato'])[0]
            quantity = float(query.get('quantity', [500])[0])
            vehicle_rate = 15.0  # Mini truck rate

            calculated_buyers = []
            for b in BUYERS:
                if b['crop'] == crop_id:
                    gross = round(quantity * b['pricePerKg'])
                    transport = round(b['distanceKm'] * vehicle_rate)
                    other = b['otherCostsEst']
                    net = gross - transport - other
                    calculated_buyers.append({
                        **b,
                        'calculated': {
                            'quantityKg': quantity,
                            'grossEarning': gross,
                            'transportCost': transport,
                            'otherCosts': other,
                            'netProfit': net
                        }
                    })

            calculated_buyers.sort(key=lambda x: x['calculated']['netProfit'], reverse=True)
            if calculated_buyers:
                calculated_buyers[0]['isBestOption'] = True

            self.send_json({'status': 'success', 'buyers': calculated_buyers})
            return

        elif path == '/api/forecast':
            crop_id = query.get('crop', ['tomato'])[0]
            forecast = {
                'crop': crop_id,
                'todayPrice': 28.0,
                'targetPrice': 30.0,
                'expectedChange': 2.0,
                'variationPct': 7.14,
                'trend': 'rising',
                'recommendation': 'Prices are expected to rise over the next 3 days. If storage is available, consider waiting.'
            }
            self.send_json({'status': 'success', 'forecast': forecast})
            return

        elif path == '/api/recommendation':
            self.send_json({
                'status': 'success',
                'recommendation': {
                    'bestBuyer': 'ABC Fresh Traders',
                    'netProfit': 13000,
                    'action': 'Sell to ABC Fresh Traders for highest net realization of ₹13,000'
                }
            })
            return

        # Fallback to static file server
        if path == '/':
            self.path = '/index.html'
        return super().do_GET()

    def do_POST(self):
        parsed_path = urllib.parse.urlparse(self.path)
        if parsed_path.path == '/api/requests':
            content_length = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_length)
            payload = json.loads(post_body.decode('utf-8'))
            self.send_json({
                'status': 'success',
                'message': 'Selling request received successfully by FarmGain backend engine.',
                'request': payload
            })
            return

        self.send_error(404, "Endpoint not found")

    def send_json(self, data, status_code=200):
        response_bytes = json.dumps(data).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(response_bytes)))
        self.end_headers()
        self.wfile.write(response_bytes)

if __name__ == '__main__':
    print(f"🌾 FarmGain Market Intelligence & Selling Server starting on http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), FarmGainRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped gracefully.")
