# 🌾 FarmGain – Rural Market Intelligence & Direct Selling Platform

> **"Don't just find the highest PRICE. Find the highest PROFIT."**

FarmGain is a full-featured, mobile-first web application designed for small and marginal farmers to decide **WHERE** and **WHEN** to sell their agricultural produce for maximum net profit.

---

## 🚀 Quickstart Guide

### 1. Launch the Server
Ensure Python 3 is available, then run:

```bash
cd C:\Users\USER\.gemini\antigravity\scratch\farmgain
python server.py
```

### 2. Open in Browser
Open your browser and navigate to:
[http://localhost:8000](http://localhost:8000)

---

## 🌟 Key Features

1. **Highest Net Profit Recommendation Engine**:
   Computes Net Realization = Gross Revenue - Transportation Cost (Distance × Vehicle Rate/km) - Mandi Fees & Handling. Automatically ranks buyers primarily by **NET PROFIT** and tags the top option with **🏆 BEST OPTION**.

2. **Side-by-Side Math Transparency**:
   Demonstrates why a nearby buyer offering ₹28/kg (5 km away) yields **MORE NET PROFIT** than a distant buyer offering ₹30.50/kg (35 km away) due to ₹3,000 transport fees.

3. **Market Comparison Matrix**:
   Multi-buyer table comparing current prices, distances, estimated costs, net profit, and price trends.

4. **Transportation Calculator**:
   Interactive slider allowing real-time adjustment of crop quantity, vehicle type (Mini Truck, Pickup, Tractor, Heavy Truck), and destination.

5. **7-Day AI Price Forecast & Line Chart**:
   Interactive Chart.js visualizer predicting daily price trends for tomatoes, onions, potatoes, chillies, and more, complete with action recommendations ("Hold 2-3 days" vs "Sell Immediately") and AI disclaimer tags.

6. **Direct Buyer Communication & Negotiation**:
   Interactive chat window with predefined response chips and real-time messaging with buyers.

7. **Direct Selling Requests**:
   Modal dialog allowing farmers to send formal selling requests, which reflect live on the Buyer Dashboard.

8. **Dual Persona Mode (Farmer & Buyer)**:
   Instant toggle between Farmer Mode and Buyer Management Portal (where buyers can post crop offers, view incoming selling requests, accept/reject requests, and chat).

9. **Multi-Language Support**:
   Supports **English**, **Kannada (ಕನ್ನಡ)**, and **Hindi (हिंदी)** text switching.

---

## 🎯 Hackathon Demo Flow (14 Steps)

1. Open `http://localhost:8000`.
2. Observe **Farmer Dashboard** with Today's Market Intelligence Summary banner.
3. Select **Tomato** and set quantity to **500 kg**.
4. Click **📍 Use My Location**.
5. Click **🔍 FIND BEST PRICE & PROFIT**.
6. View the ranked buyer results sorted by **Highest Net Profit**.
7. Observe why **Buyer A (ABC Fresh Traders @ ₹28/kg)** gets the **🏆 BEST OPTION** tag with ₹13,000 net profit over Buyer B (City APMC @ ₹30.50/kg) with ₹11,800 net profit.
8. Click **❓ How is Net Profit calculated?** on the card to inspect step-by-step math transparency.
9. Click **📈 7-Day Forecast** to view the interactive line chart and AI holding advice.
10. Click **🚚 Transport Calc** and slide quantity from 500 kg to 1500 kg to see live net earnings recalculation.
11. Click **💬 Chat with Buyer** on ABC Fresh Traders to start direct communication.
12. Click **📦 Send Selling Request** to submit a 500 kg tomato selling offer.
13. Click **Switch to Buyer Mode** in the top header.
14. View the incoming selling request on the **Buyer Dashboard** and click **✓ Accept Offer**.
