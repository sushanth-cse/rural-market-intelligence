/* ==========================================================================
   AgriPulse AI - Core Application Logic & Data Engine
   ========================================================================== */

// --- Global State ---
let currentLang = 'en';
let activeTab = 'mandi';
let forecastChartInstance = null;
let isVoiceModeActive = false;

// --- 1. Multilingual Translation Dictionary ---
const translations = {
  en: {
    tab_mandi: "Mandi Intelligence",
    tab_ai_forecast: "AI Price & Demand",
    tab_supply_chain: "Supply Chain Router",
    tab_b2b: "Direct B2B Market",
    tab_advisor: "KrishiMitra AI",
    tab_income: "Income Maximizer"
  },
  hi: {
    tab_mandi: "मंडी इंटेलिजेंस",
    tab_ai_forecast: "AI मूल्य पूर्वानुमान",
    tab_supply_chain: "सप्लाई चेन रूटर",
    tab_b2b: "डायरेक्ट B2B मार्केट",
    tab_advisor: "कृषि मित्र AI",
    tab_income: "आय अधिकतम कैलकुलेटर"
  },
  mr: {
    tab_mandi: "बाजार समिती भाव",
    tab_ai_forecast: "AI दर अंदाज",
    tab_supply_chain: "वाहतूक नफा रूटर",
    tab_b2b: "थेट B2B खरेदी",
    tab_advisor: "कृषी मित्र AI",
    tab_income: "उत्पन्न वाढवा"
  },
  pa: {
    tab_mandi: "ਮੰਡੀ ਇੰਟੈਲੀਜੈਂਸ",
    tab_ai_forecast: "AI ਭਾਅ ਭਵਿੱਖਬਾਣੀ",
    tab_supply_chain: "ਸਪਲਾਈ ਚੇਨ ਰੂਟਰ",
    tab_b2b: "ਸਿੱਧਾ B2B ਬਾਜ਼ਾਰ",
    tab_advisor: "ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ AI",
    tab_income: "ਆਮਦਨ ਵਧਾਓ"
  },
  te: {
    tab_mandi: "మార్కెట్ సమాచారం",
    tab_ai_forecast: "AI ధరల అంచనా",
    tab_supply_chain: "రవాణా లాభాల రూటర్",
    tab_b2b: "నేరుగా B2B కొనుగోళ్లు",
    tab_advisor: "కృషిమిత్ర AI",
    tab_income: "ఆదాయం పెంపు"
  },
  ta: {
    tab_mandi: "சந்தை விவரங்கள்",
    tab_ai_forecast: "AI விலை கணிப்பு",
    tab_supply_chain: "சப்ளை செயின் ரூட்டர்",
    tab_b2b: "நேரடி B2B சந்தை",
    tab_advisor: "கிரிஷிமித்ரா AI",
    tab_income: "வருமான கணிப்பான்"
  },
  kn: {
    tab_mandi: "ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ",
    tab_ai_forecast: "AI ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
    tab_supply_chain: "ಸರಬರಾಜು ಮಾರ್ಗ",
    tab_b2b: "ನೇರ B2B ಮಾರುಕಟ್ಟೆ",
    tab_advisor: "ಕೃಷಿಮಿತ್ರ AI",
    tab_income: "ಆದಾಯ ಹೆಚ್ಚಳ"
  },
  bn: {
    tab_mandi: "মন্ডি ইন্টেলিজেন্স",
    tab_ai_forecast: "AI দর পূর্বাভাস",
    tab_supply_chain: "সাপ্লাই চেন রুটার",
    tab_b2b: "ডাইরেক্ট B2B বাজার",
    tab_advisor: "কৃষি মিত্র AI",
    tab_income: "আয় বৃদ্ধিকারক"
  }
};

// --- 2. Mock Datasets ---
const MANDI_DATA = [
  { id: 1, crop: "Wheat (Gehun)", category: "Cereals", mandi: "Khanna Mandi", state: "Punjab", minPrice: 2250, maxPrice: 2420, modalPrice: 2380, trend: "up", change: 3.4, arrival: "14,500 Qtl", dist: "12 km", grade: "Grade A Premium" },
  { id: 2, crop: "Tomato (Tamatar)", category: "Vegetables", mandi: "Pimpalgaon Mandi", state: "Maharashtra", minPrice: 1800, maxPrice: 2600, modalPrice: 2450, trend: "up", change: 8.2, arrival: "8,200 Qtl", dist: "28 km", grade: "Hybrid Hybrid Red" },
  { id: 3, crop: "Soybean", category: "Oilseeds", mandi: "Indore Mandi", state: "Madhya Pradesh", minPrice: 4300, maxPrice: 4750, modalPrice: 4620, trend: "up", change: 1.8, arrival: "19,000 Qtl", dist: "45 km", grade: "Yellow Grade 1" },
  { id: 4, crop: "Cotton (Kapas)", category: "Oilseeds", mandi: "Rajkot Mandi", state: "Gujarat", minPrice: 6800, maxPrice: 7450, modalPrice: 7280, trend: "down", change: -1.2, arrival: "11,300 Qtl", dist: "65 km", grade: "Long Staple" },
  { id: 5, crop: "Basmati Rice", category: "Cereals", mandi: "Karnal Grain Hub", state: "Haryana", minPrice: 3800, maxPrice: 4250, modalPrice: 4100, trend: "up", change: 2.1, arrival: "22,400 Qtl", dist: "18 km", grade: "Pusa 1121" },
  { id: 6, crop: "Onion (Pyaz)", category: "Vegetables", mandi: "Lasalgaon Mandi", state: "Maharashtra", minPrice: 1400, maxPrice: 1950, modalPrice: 1820, trend: "up", change: 5.6, arrival: "31,000 Qtl", dist: "32 km", grade: "Nashik Red" },
  { id: 7, crop: "Potato (Aloo)", category: "Vegetables", mandi: "Agra Mandi", state: "Uttar Pradesh", minPrice: 1100, maxPrice: 1450, modalPrice: 1380, trend: "down", change: -2.4, arrival: "45,000 Qtl", dist: "24 km", grade: "Kufri Jyoti" },
  { id: 8, crop: "Mustard (Sarson)", category: "Oilseeds", mandi: "Alwar Mandi", state: "Rajasthan", minPrice: 5100, maxPrice: 5650, modalPrice: 5520, trend: "up", change: 4.0, arrival: "9,800 Qtl", dist: "50 km", grade: "High Oil Content" },
  { id: 9, crop: "Chana (Chickpeas)", category: "Pulses", mandi: "Latur Mandi", state: "Maharashtra", minPrice: 4900, maxPrice: 5350, modalPrice: 5200, trend: "up", change: 1.5, arrival: "6,400 Qtl", dist: "75 km", grade: "Desi Grade A" },
  { id: 10, crop: "Red Chilli", category: "Spices", mandi: "Guntur Yard", state: "Andhra Pradesh", minPrice: 16500, maxPrice: 19800, modalPrice: 18900, trend: "up", change: 6.7, arrival: "4,100 Qtl", dist: "110 km", grade: "Teja Super Red" }
];

const B2B_BUYERS = [
  { id: 'b1', name: "Reliance Fresh Retail Ltd", type: "Supermarket Chain", location: "Mumbai Hub", cropNeeded: "Tomato (Hybrid Red)", qty: "500 Quintals", rate: "₹2,650 / Qtl", paymentTerms: "T+1 Instant Escrow", trustScore: 98 },
  { id: 'b2', name: "Haldiram Snacks Procurement", type: "Food Processor", location: "Nagpur Plant", cropNeeded: "Potato (Kufri Jyoti)", qty: "1,200 Quintals", rate: "₹1,520 / Qtl", paymentTerms: "Direct Bank Transfer", trustScore: 96 },
  { id: 'b3', name: "ITC Agri-Business Division", type: "Corporate Exporter", location: "Indore Logistics Park", cropNeeded: "Wheat (Durum / Premium)", qty: "2,500 Quintals", rate: "₹2,510 / Qtl", paymentTerms: "e-NAM Escrow Guaranteed", trustScore: 99 },
  { id: 'b4', name: "BigBasket Direct Farm Procurement", type: "E-Commerce Grocery", location: "Pune Warehouse", cropNeeded: "Onion (Nashik Red)", qty: "800 Quintals", rate: "₹1,980 / Qtl", paymentTerms: "Same-Day Escrow", trustScore: 97 },
  { id: 'b5', name: "Mother Dairy Fruits & Vegetables", type: "Cooperative Enterprise", location: "Delhi NCR Hub", cropNeeded: "Basmati Rice (Pusa 1121)", qty: "600 Quintals", rate: "₹4,300 / Qtl", paymentTerms: "Govt Backed Escrow", trustScore: 99 }
];

// --- 3. Initializer ---
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  renderMandiTicker();
  renderMandiTable(MANDI_DATA);
  initForecastChart();
  calculateSupplyChainRoutes();
  renderB2BBuyers();
  calculateIncome();
  
  // Real-time live rate updates simulation every 4s
  setInterval(simulateLivePriceTicks, 4000);
});

// --- Tab Switching Logic ---
function switchTab(tabId) {
  activeTab = tabId;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-view').forEach(view => view.style.display = 'none');

  const activeBtn = document.getElementById(`btn-tab-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');

  const activeView = document.getElementById(`view-${tabId}`);
  if (activeView) activeView.style.display = 'block';

  if (tabId === 'prediction' && forecastChartInstance) {
    forecastChartInstance.resize();
  }
}

// --- Multilingual Switching ---
function changeLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang] || translations.en;

  for (let key in dict) {
    const el = document.getElementById(`btn-tab-${key.replace('tab_', '')}`);
    if (el) {
      const span = el.querySelector('span');
      if (span) span.textContent = dict[key];
    }
  }

  showToast(`Language switched to ${document.getElementById('langSelect').selectedOptions[0].text}`);
}

// --- Live Ticker Tape Simulation ---
function renderMandiTicker() {
  const tickerContainer = document.getElementById('liveTicker');
  let html = '';
  // Duplicate array for seamless infinite marquee scroll
  const items = [...MANDI_DATA, ...MANDI_DATA];
  
  items.forEach(item => {
    const isUp = item.trend === 'up';
    const arrow = isUp ? '▲' : '▼';
    const cssClass = isUp ? 'price-up' : 'price-down';
    
    html += `
      <div class="ticker-item">
        <span class="crop-name">${item.crop} (${item.mandi}):</span>
        <span class="crop-price">₹${item.modalPrice}/Qtl</span>
        <span class="${cssClass}">${arrow} ${item.change}%</span>
      </div>
    `;
  });
  
  tickerContainer.innerHTML = html;
}

function simulateLivePriceTicks() {
  // Pick random item and adjust price slightly
  const idx = Math.floor(Math.random() * MANDI_DATA.length);
  const delta = (Math.random() * 20 - 10).toFixed(0);
  MANDI_DATA[idx].modalPrice += parseInt(delta);
  if (MANDI_DATA[idx].modalPrice < 500) MANDI_DATA[idx].modalPrice = 500;
  
  renderMandiTicker();
  if (activeTab === 'mandi') filterMandiData();
}

// --- Section 1: Mandi Data Filtering & Render ---
function renderMandiTable(data) {
  const tbody = document.getElementById('mandiTableBody');
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:2rem; color:var(--text-muted);">No mandi records matching your filter criteria.</td></tr>`;
    return;
  }

  let html = '';
  data.forEach(item => {
    const isUp = item.trend === 'up';
    const badgeClass = isUp ? 'badge-emerald' : 'badge-rose';
    const trendIcon = isUp ? 'trending-up' : 'trending-down';

    html += `
      <tr>
        <td>
          <div class="crop-pill">
            <div class="crop-icon">${getCropEmoji(item.crop)}</div>
            <div>
              <div style="font-weight:700;">${item.crop}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${item.grade}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight:600;">${item.mandi}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${item.state}</div>
        </td>
        <td><span class="badge badge-amber">${item.category}</span></td>
        <td>₹${item.minPrice.toLocaleString()} - ₹${item.maxPrice.toLocaleString()}</td>
        <td><span class="price-tag" style="color:var(--primary-emerald);">₹${item.modalPrice.toLocaleString()}</span></td>
        <td>
          <span class="badge ${badgeClass}">
            <i data-lucide="${trendIcon}" style="width:12px;"></i> ${isUp ? '+' : ''}${item.change}%
          </span>
        </td>
        <td style="color:var(--text-muted); font-size:0.85rem;">${item.arrival}</td>
        <td style="color:var(--accent-cyan); font-weight:600;">${item.dist}</td>
        <td>
          <button class="btn btn-outline" style="padding:0.4rem 0.75rem; font-size:0.8rem;" onclick="quickSelectCropForForecast('${item.crop}')">
            Predict <i data-lucide="sparkles" style="width:14px;"></i>
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
  lucide.createIcons();
}

function filterMandiData() {
  const query = document.getElementById('mandiSearch').value.toLowerCase();
  const state = document.getElementById('stateFilter').value;
  const category = document.getElementById('categoryFilter').value;

  const filtered = MANDI_DATA.filter(item => {
    const matchesQuery = item.crop.toLowerCase().includes(query) || item.mandi.toLowerCase().includes(query);
    const matchesState = state === 'ALL' || item.state === state;
    const matchesCategory = category === 'ALL' || item.category === category;
    return matchesQuery && matchesState && matchesCategory;
  });

  renderMandiTable(filtered);
}

function getCropEmoji(cropName) {
  if (cropName.includes('Wheat')) return '🌾';
  if (cropName.includes('Tomato')) return '🍅';
  if (cropName.includes('Soybean')) return '🌱';
  if (cropName.includes('Cotton')) return '☁️';
  if (cropName.includes('Rice')) return '🍚';
  if (cropName.includes('Onion')) return '🧅';
  if (cropName.includes('Potato')) return '🥔';
  if (cropName.includes('Mustard')) return '🌼';
  if (cropName.includes('Chana')) return '🫘';
  if (cropName.includes('Chilli')) return '🌶️';
  return '🍃';
}

function quickSelectCropForForecast(cropName) {
  let selectVal = 'Wheat';
  if (cropName.includes('Tomato')) selectVal = 'Tomato';
  else if (cropName.includes('Soybean')) selectVal = 'Soybean';
  else if (cropName.includes('Cotton')) selectVal = 'Cotton';
  else if (cropName.includes('Rice')) selectVal = 'Rice';
  else if (cropName.includes('Onion')) selectVal = 'Onion';
  
  document.getElementById('forecastCropSelect').value = selectVal;
  switchTab('prediction');
  updateForecastChart();
}

// --- Section 2: Chart.js AI Forecasting Engine ---
function initForecastChart() {
  const ctx = document.getElementById('predictionChartCanvas').getContext('2d');
  
  forecastChartInstance = new Chart(ctx, {
    type: 'line',
    data: getForecastChartData('Wheat', 7, 0, 15),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { labels: { color: '#94A3B8', font: { family: 'Outfit', size: 12 } } },
        tooltip: {
          backgroundColor: '#0F172A',
          borderColor: '#10B981',
          borderWidth: 1,
          titleColor: '#FFF',
          bodyColor: '#A7F3D0',
          callbacks: {
            label: (context) => ` ${context.dataset.label}: ₹${context.parsed.y} / Qtl`
          }
        }
      },
      scales: {
        x: { ticks: { color: '#94A3B8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#94A3B8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });
}

function getForecastChartData(crop, days, rainImpact, festImpact) {
  const labels = [];
  const historical = [];
  const predicted = [];
  const upperBound = [];
  const lowerBound = [];

  let basePrice = 2300;
  if (crop === 'Tomato') basePrice = 2450;
  if (crop === 'Soybean') basePrice = 4620;
  if (crop === 'Cotton') basePrice = 7280;
  if (crop === 'Rice') basePrice = 4100;
  if (crop === 'Onion') basePrice = 1820;

  // Add historical 4 days
  for (let i = 4; i >= 1; i--) {
    labels.push(`Day -${i}`);
    const noise = Math.sin(i) * 30;
    historical.push(Math.round(basePrice - (i * 25) + noise));
    predicted.push(null);
    upperBound.push(null);
    lowerBound.push(null);
  }

  // Today
  labels.push('Today');
  historical.push(basePrice);
  predicted.push(basePrice);
  upperBound.push(basePrice);
  lowerBound.push(basePrice);

  // Future days
  const horizon = parseInt(days);
  const totalImpact = (rainImpact * 12) + (festImpact * 8);

  for (let d = 1; d <= horizon; d++) {
    labels.push(`Day +${d}`);
    historical.push(null);
    
    // AI Trend Curve
    const trendShift = (d * 35) + totalImpact;
    const pVal = Math.round(basePrice + trendShift + (Math.sin(d) * 20));
    predicted.push(pVal);
    upperBound.push(Math.round(pVal * 1.04));
    lowerBound.push(Math.round(pVal * 0.96));
  }

  return {
    labels: labels,
    datasets: [
      {
        label: 'Historical Arrival Price',
        data: historical,
        borderColor: '#94A3B8',
        backgroundColor: 'rgba(148, 163, 184, 0.1)',
        borderWidth: 2,
        tension: 0.3
      },
      {
        label: 'AgriPulse AI Forecast',
        data: predicted,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: '#10B981',
        tension: 0.35,
        fill: true
      },
      {
        label: '95% Confidence Upper Band',
        data: upperBound,
        borderColor: 'rgba(245, 158, 11, 0.5)',
        borderDash: [5, 5],
        borderWidth: 1,
        fill: false,
        pointRadius: 0
      }
    ]
  };
}

function updateForecastChart() {
  const crop = document.getElementById('forecastCropSelect').value;
  const days = document.getElementById('forecastDuration').value;
  const rain = parseInt(document.getElementById('sliderRain').value);
  const fest = parseInt(document.getElementById('sliderFest').value);

  if (forecastChartInstance) {
    forecastChartInstance.data = getForecastChartData(crop, days, rain, fest);
    forecastChartInstance.update();
  }

  // Update Decision Matrix Text
  const titleEl = document.getElementById('recActionTitle');
  const descEl = document.getElementById('recActionDesc');

  if (rain > 10 || fest > 20) {
    titleEl.textContent = `RECOMMENDATION: HOLD ${crop.toUpperCase()} FOR ${days} DAYS`;
    titleEl.style.color = 'var(--primary-emerald)';
    descEl.textContent = `Market arrivals projected to contract due to supply disruption and heavy buyer demand. Holding your harvest is expected to yield +12.4% higher net profit per quintal.`;
  } else if (rain < -10) {
    titleEl.textContent = `RECOMMENDATION: SELL ${crop.toUpperCase()} IMMEDIATELY`;
    titleEl.style.color = 'var(--accent-rose)';
    descEl.textContent = `Supply glut expected in neighboring regional mandis as weather clears. Sell now to avoid projected -8.2% drop in market prices.`;
  } else {
    titleEl.textContent = `RECOMMENDATION: OPTIMAL WINDOW WITHIN 3 DAYS`;
    titleEl.style.color = 'var(--accent-amber)';
    descEl.textContent = `Prices are steady with moderate demand from wholesale procurement centers. Direct B2B quotes are currently matching peak mandi modal rates.`;
  }
}

function simulateScenario() {
  const rainVal = document.getElementById('sliderRain').value;
  const festVal = document.getElementById('sliderFest').value;

  document.getElementById('val-rain').textContent = `${rainVal > 0 ? '+' : ''}${rainVal}% Impact`;
  document.getElementById('val-fest').textContent = `+${festVal}% Surge`;

  updateForecastChart();
}

// --- Section 3: Supply Chain Net Realization Math ---
function calculateSupplyChainRoutes() {
  const vol = parseFloat(document.getElementById('scVolume').value) || 100;
  const vehicle = document.getElementById('scVehicle').value;
  const perishability = document.getElementById('scPerishability').value;

  let perKmFreight = 35; // default truck
  if (vehicle === 'pickup') perKmFreight = 20;
  if (vehicle === 'reefer') perKmFreight = 55;

  const spoilageRatePerKm = perishability === 'high' ? 0.00035 : 0.00005;

  const routes = [
    { dest: "Local District Mandi (Nashik Yard)", distKm: 18, baseModalRate: 2450, mandiTaxPct: 0.015, loadFeePerQtl: 12 },
    { dest: "Regional Terminal Market (Vashi APMC Navi Mumbai)", distKm: 165, baseModalRate: 2820, mandiTaxPct: 0.01, loadFeePerQtl: 15 },
    { dest: "Direct Food Processor Park (Pune Food Cluster)", distKm: 210, baseModalRate: 2950, mandiTaxPct: 0.0, loadFeePerQtl: 10 }
  ];

  const container = document.getElementById('supplyChainCardsContainer');
  let html = '';

  routes.forEach(r => {
    const grossRevenue = vol * r.baseModalRate;
    const freightCost = r.distKm * perKmFreight;
    const spoilageLoss = grossRevenue * (r.distKm * spoilageRatePerKm);
    const mandiTax = grossRevenue * r.mandiTaxPct;
    const loadingFees = vol * r.loadFeePerQtl;

    const totalDeductions = freightCost + spoilageLoss + mandiTax + loadingFees;
    const netRealization = grossRevenue - totalDeductions;
    const netPerQtl = (netRealization / vol).toFixed(0);

    html += `
      <div class="route-card">
        <div>
          <div class="route-header">
            <h3 style="font-family:var(--font-heading); font-size:1.15rem;">${r.dest}</h3>
            <span class="badge badge-amber">${r.distKm} km</span>
          </div>

          <div style="margin-bottom:1rem; font-size:0.875rem; color:var(--text-muted);">
            <div>Gross Rate Offered: <strong style="color:#FFF;">₹${r.baseModalRate}/Qtl</strong></div>
            <div>Transit Freight Cost: <span style="color:var(--accent-rose);">₹${freightCost.toLocaleString()}</span></div>
            <div>Perishable Spoilage Risk: <span style="color:var(--accent-rose);">₹${spoilageLoss.toFixed(0)}</span></div>
            <div>Mandi Tax & Loading: <span style="color:var(--accent-rose);">₹${(mandiTax + loadingFees).toFixed(0)}</span></div>
          </div>
        </div>

        <div style="background:rgba(7, 11, 20, 0.6); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
          <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">NET TAKE-HOME REALIZATION</div>
          <div class="net-gain-highlight">₹${netRealization.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
          <div style="font-size:0.8rem; color:var(--primary-emerald); font-weight:700;">Effective Rate: ₹${netPerQtl} / Qtl</div>
          
          <button class="btn btn-primary" style="width:100%; margin-top:1rem; padding:0.5rem;" onclick="showToast('Logistics truck booked for ${r.dest}!')">
            <i data-lucide="truck"></i> Dispatch Transport
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  lucide.createIcons();
}

// --- Section 4: Direct B2B Buyer Marketplace ---
function renderB2BBuyers() {
  const container = document.getElementById('b2bBuyersContainer');
  let html = '';

  B2B_BUYERS.forEach(b => {
    html += `
      <div class="buyer-card verified">
        <div>
          <h3 style="font-family:var(--font-heading); font-size:1.2rem; color:var(--text-main); margin-bottom:0.2rem;">${b.name}</h3>
          <div style="font-size:0.8rem; color:var(--accent-cyan); font-weight:600;">${b.type} &bull; ${b.location}</div>
        </div>

        <div style="background:rgba(7, 11, 20, 0.6); padding:0.85rem; border-radius:var(--radius-md); font-size:0.85rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem;">
            <span style="color:var(--text-muted);">Required Batch:</span>
            <span style="font-weight:700;">${b.cropNeeded}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.3rem;">
            <span style="color:var(--text-muted);">Quantity Tender:</span>
            <span style="font-weight:700; color:var(--accent-amber);">${b.qty}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--text-muted);">Direct Offered Rate:</span>
            <span style="font-weight:800; color:var(--primary-emerald);">${b.rate}</span>
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.8rem; color:var(--text-muted);">
          <span>🛡️ ${b.paymentTerms}</span>
          <span style="color:var(--primary-emerald); font-weight:700;">Score: ${b.trustScore}%</span>
        </div>

        <button class="btn btn-primary" onclick="openDealModal('${b.name}', '${b.rate}', '${b.qty}')">
          <i data-lucide="handshake"></i> Submit Batch Quote
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
  lucide.createIcons();
}

function openDealModal(name, rate, qty) {
  document.getElementById('modalBuyerTitle').textContent = `Contract Deal with ${name}`;
  document.getElementById('modalQty').textContent = qty;
  document.getElementById('modalRate').textContent = rate;
  document.getElementById('modalTotal').textContent = '₹6,12,500';
  document.getElementById('dealModal').classList.add('active');
}

function closeModal() {
  document.getElementById('dealModal').classList.remove('active');
}

function confirmDealEscrow() {
  closeModal();
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 }
  });
  showToast('🎉 Digital Escrow Contract Sealed! Payment locked in Smart Escrow.');
}

// --- Section 5: KrishiMitra AI Chatbot Engine ---
function handleChatKeyPress(e) {
  if (e.key === 'Enter') sendChatMessage();
}

function sendPrompt(promptText) {
  document.getElementById('chatInput').value = promptText;
  sendChatMessage();
}

function sendChatMessage() {
  const inputEl = document.getElementById('chatInput');
  const query = inputEl.value.trim();
  if (!query) return;

  const chatContainer = document.getElementById('chatMessages');

  // Append user message
  const userMsg = document.createElement('div');
  userMsg.className = 'msg-bubble msg-user';
  userMsg.textContent = query;
  chatContainer.appendChild(userMsg);

  inputEl.value = '';
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Generate bot response
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'msg-bubble msg-bot';
    
    let botReply = getAIAdvisorReply(query);

    botMsg.innerHTML = `
      <div class="msg-bot-header">
        <i data-lucide="sparkles"></i> KRISHIMITRA AI ADVISOR
      </div>
      ${botReply}
    `;
    
    chatContainer.appendChild(botMsg);
    lucide.createIcons();
    chatContainer.scrollTop = chatContainer.scrollHeight;

    if (isVoiceModeActive && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(botReply.replace(/<[^>]*>?/gm, ''));
      window.speechSynthesis.speak(utterance);
    }
  }, 700);
}

function getAIAdvisorReply(query) {
  const q = query.toLowerCase();
  if (q.includes('wheat') || q.includes('gehun') || q.includes('punjab')) {
    return `In Khanna and Rajpura mandis (Punjab), Wheat is currently trading at <strong>₹2,380 / Quintal</strong>. AgriPulse AI predicts a <strong>+4.2% rise</strong> over the next 6 days due to government procurement volume targets.`;
  }
  if (q.includes('pm-kisan') || q.includes('subsidy') || q.includes('scheme')) {
    return `Under the PM-KISAN scheme, eligible farmers receive <strong>₹6,000 per year</strong> in 3 equal installments directly into direct-benefit transfer (DBT) bank accounts. You can link your Aadhaar on e-NAM or visit your local Krishi Vigyan Kendra.`;
  }
  if (q.includes('tomato') || q.includes('buyer')) {
    return `For Tomatoes in Maharashtra/Gujarat region, <strong>Reliance Fresh</strong> and <strong>BigBasket Direct Procurement</strong> are offering peak premium rates of <strong>₹2,650 / Qtl</strong> for Grade A red hybrid batches with instant escrow settlement.`;
  }
  if (q.includes('blight') || q.includes('disease') || q.includes('pest')) {
    return `To prevent early tomato blight during humid weather: 1) Apply Mancozeb 75% WP @ 2g/liter of water. 2) Ensure optimal soil drainage. 3) Avoid overhead sprinkler irrigation during late evening hours.`;
  }
  return `AgriPulse AI recommends checking local mandi arrivals today. Based on market liquidity, selling high-grade batches via direct B2B buyer contract earns an average <strong>18% higher return</strong> compared to local distress selling.`;
}

function toggleVoiceSim() {
  isVoiceModeActive = !isVoiceModeActive;
  const statusEl = document.getElementById('voiceMicStatus');
  const iconEl = document.getElementById('voiceMicIcon');

  if (isVoiceModeActive) {
    statusEl.textContent = 'Voice Audio On 🔊';
    showToast('Voice Text-to-Speech Enabled for KrishiMitra AI');
  } else {
    statusEl.textContent = 'Voice Input Mode';
    showToast('Voice Audio Muted');
  }
}

// --- Section 6: Income Maximizer Math ---
function calculateIncome() {
  const seeds = parseFloat(document.getElementById('costSeeds').value) || 0;
  const fert = parseFloat(document.getElementById('costFert').value) || 0;
  const fuel = parseFloat(document.getElementById('costFuel').value) || 0;
  const labor = parseFloat(document.getElementById('costLabor').value) || 0;
  const yieldQtl = parseFloat(document.getElementById('yieldQtl').value) || 0;

  const totalCost = seeds + fert + fuel + labor;
  document.getElementById('outTotalCost').textContent = `₹${totalCost.toLocaleString()}`;

  const tradRate = 1850;
  const tradRev = yieldQtl * tradRate;
  const tradProfit = tradRev - totalCost;
  document.getElementById('outTradProfit').textContent = `Net Profit: ₹${tradProfit.toLocaleString()}`;

  const aiRate = 2420;
  const aiRev = yieldQtl * aiRate;
  const aiProfit = aiRev - totalCost;
  document.getElementById('outAiProfit').textContent = `Net Profit: ₹${aiProfit.toLocaleString()}`;

  const gain = aiProfit - tradProfit;
  const pctGain = tradProfit > 0 ? ((gain / tradProfit) * 100).toFixed(1) : 0;
  document.getElementById('outGainBoost').textContent = `+₹${gain.toLocaleString()} / Acre (+${pctGain}%)`;
}

// --- Toast System ---
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="check-circle" style="color:var(--primary-emerald)"></i> ${msg}`;
  
  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.remove();
  }, 4000);
}
