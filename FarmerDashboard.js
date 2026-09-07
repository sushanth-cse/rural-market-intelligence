// FarmGain Farmer Dashboard & Landing Component

function renderFarmerDashboard(containerId, state) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const t = translations[state.lang] || translations.en;
  const cropObj = mockCrops.find(c => c.id === state.selectedCrop) || mockCrops[0];
  const vehicle = mockVehicles.find(v => v.id === state.selectedVehicle) || mockVehicles[0];
  const rankedBuyers = calculateMarketProfits(mockBuyers, state.selectedCrop, state.selectedQuantity, vehicle);
  const forecast = mockForecasts[state.selectedCrop] || mockForecasts['tomato'];
  const decision = generateSellingDecision(rankedBuyers, forecast, state.selectedQuantity);

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <!-- Greeting Header -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900">${t.greeting}</h1>
          <p class="text-xs sm:text-sm text-slate-500 font-medium">${t.motto}</p>
        </div>
        
        <div class="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <span class="text-xs text-emerald-800 font-bold">📍 Kolar Market Zone</span>
          <span class="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded-full font-bold">Live</span>
        </div>
      </div>

      <!-- TODAY'S MARKET INTELLIGENCE SUMMARY BANNER (Heart of Dashboard) -->
      <div class="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
        
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-700/60 pb-4 mb-6">
          <div class="flex items-center space-x-2">
            <span class="text-2xl">⚡</span>
            <h2 class="text-lg font-bold text-amber-300 uppercase tracking-wide">${t.summaryTitle}</h2>
          </div>
          <span class="text-xs text-emerald-200 font-medium">Updated 15 mins ago</span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span class="block text-xs text-emerald-200 font-semibold mb-1">${t.selectedCrop}</span>
            <div class="text-xl font-extrabold text-white flex items-center space-x-1">
              <span>${cropObj.icon}</span>
              <span>${cropObj.name}</span>
            </div>
            <span class="text-[11px] text-emerald-300">${state.selectedQuantity} kg batch</span>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span class="block text-xs text-emerald-200 font-semibold mb-1">${t.bestPrice}</span>
            <div class="text-xl font-extrabold text-white">₹${rankedBuyers[0]?.pricePerKg || 28}/kg</div>
            <span class="text-[11px] text-emerald-300">${rankedBuyers[0]?.name || 'ABC Market'}</span>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span class="block text-xs text-emerald-200 font-semibold mb-1">${t.bestBuyer}</span>
            <div class="text-base font-extrabold text-white truncate">${decision.bestBuyerName}</div>
            <span class="text-[11px] text-emerald-300">📍 ${decision.distanceKm} km away</span>
          </div>

          <!-- ESTIMATED NET PROFIT CARD -->
          <div class="bg-amber-400 text-emerald-950 rounded-2xl p-4 shadow-lg border border-amber-300">
            <span class="block text-xs font-black uppercase tracking-wider">${t.estimatedProfit}</span>
            <div class="text-2xl font-black">${decision.bestNetProfitFormatted}</div>
            <span class="text-[11px] font-bold text-emerald-900">Highest Net Realization</span>
          </div>

        </div>

        <!-- Intelligent Recommendation Text Box -->
        <div class="bg-emerald-950/80 rounded-2xl p-4 border border-emerald-700/80 flex items-start space-x-3">
          <div class="text-2xl">🤖</div>
          <div>
            <h4 class="font-extrabold text-amber-300 text-xs sm:text-sm uppercase tracking-wide">
              AI Decision Recommendation: ${decision.bestTimeAdvice}
            </h4>
            <p class="text-xs sm:text-sm text-emerald-100 mt-1 leading-relaxed">
              ${decision.bestPlaceMessage} ${decision.forecastMessage}
            </p>
          </div>
        </div>

      </div>

      <!-- Hero Action CTAs & Search Trigger -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        <div onclick="window.appState.setActiveTab('markets')" class="cursor-pointer bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition flex items-center justify-between group">
          <div class="flex items-center space-x-4">
            <div class="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl font-bold group-hover:scale-110 transition transform">
              🔎
            </div>
            <div>
              <h3 class="font-extrabold text-slate-900 text-lg group-hover:text-emerald-700 transition">Find Best Net Profit Market</h3>
              <p class="text-xs text-slate-500">Search nearby buyers taking transport into account</p>
            </div>
          </div>
          <span class="text-2xl text-emerald-700 group-hover:translate-x-2 transition transform">➔</span>
        </div>

        <div onclick="window.appState.setActiveTab('forecast')" class="cursor-pointer bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition flex items-center justify-between group">
          <div class="flex items-center space-x-4">
            <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-3xl font-bold group-hover:scale-110 transition transform">
              📈
            </div>
            <div>
              <h3 class="font-extrabold text-slate-900 text-lg group-hover:text-amber-700 transition">Check 7-Day Price Forecast</h3>
              <p class="text-xs text-slate-500">Know whether to sell today or wait for higher prices</p>
            </div>
          </div>
          <span class="text-2xl text-amber-700 group-hover:translate-x-2 transition transform">➔</span>
        </div>

      </div>

      <!-- Quick Section Tabs Grid -->
      <div class="mb-8">
        <h3 class="text-lg font-bold text-slate-900 mb-4">Farmer Dashboard Sections</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <button onclick="window.appState.setActiveTab('markets')" class="p-4 bg-white rounded-2xl shadow-xs border border-slate-200 hover:border-emerald-500 text-left transition">
            <span class="text-2xl block mb-1">🛒</span>
            <span class="font-bold text-slate-800 text-xs sm:text-sm block">Best Prices Near Me</span>
            <span class="text-[10px] text-slate-400">Ranked by Net Profit</span>
          </button>

          <button onclick="window.appState.setActiveTab('comparison')" class="p-4 bg-white rounded-2xl shadow-xs border border-slate-200 hover:border-emerald-500 text-left transition">
            <span class="text-2xl block mb-1">📊</span>
            <span class="font-bold text-slate-800 text-xs sm:text-sm block">Market Comparison</span>
            <span class="text-[10px] text-slate-400">Side-by-side table</span>
          </button>

          <button onclick="window.appState.setActiveTab('forecast')" class="p-4 bg-white rounded-2xl shadow-xs border border-slate-200 hover:border-emerald-500 text-left transition">
            <span class="text-2xl block mb-1">📈</span>
            <span class="font-bold text-slate-800 text-xs sm:text-sm block">Price Forecast</span>
            <span class="text-[10px] text-slate-400">7-Day trend graph</span>
          </button>

          <button onclick="window.appState.setActiveTab('calc')" class="p-4 bg-white rounded-2xl shadow-xs border border-slate-200 hover:border-emerald-500 text-left transition">
            <span class="text-2xl block mb-1">🚚</span>
            <span class="font-bold text-slate-800 text-xs sm:text-sm block">Transport Calculator</span>
            <span class="text-[10px] text-slate-400">Vehicle rate simulator</span>
          </button>

        </div>
      </div>

      <!-- Embedded Trending Crops Section -->
      <div id="dashboardTrendingContainer"></div>

    </div>
  `;

  // Render sub-components inside dashboard
  renderTrendingCrops('dashboardTrendingContainer', state);
}
