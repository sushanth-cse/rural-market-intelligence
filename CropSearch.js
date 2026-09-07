// FarmGain Crop Search Component (Price & Net Profit Search Interface)

function renderCropSearch(containerId, state) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const t = translations[state.lang] || translations.en;
  const currentVehicle = mockVehicles.find(v => v.id === state.selectedVehicle) || mockVehicles[0];
  const rankedBuyers = calculateMarketProfits(mockBuyers, state.selectedCrop, state.selectedQuantity, currentVehicle);
  const sideBySide = getSideBySideComparisonExample(mockCrops.find(c => c.id === state.selectedCrop)?.name, state.selectedQuantity);

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <!-- Search Panel Box -->
      <div class="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-xl mb-8 relative overflow-hidden">
        
        <div class="absolute -right-10 -bottom-10 opacity-10 text-9xl select-none">🌾</div>

        <div class="relative z-10">
          <div class="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span>⚡ Market Intelligence Engine</span>
          </div>

          <h1 class="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            ${t.searchTitle}
          </h1>
          <p class="text-emerald-200 text-sm mb-6 max-w-2xl">
            Enter your produce details to calculate exact transport costs and discover which buyer yields the <strong class="text-amber-300 font-bold">Highest Net Profit</strong>.
          </p>

          <!-- Input Controls Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
            <!-- 1. What are you selling? -->
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <label class="block text-xs text-emerald-200 font-semibold mb-1">${t.whatSelling}</label>
              <select onchange="window.appState.setSelectedCrop(this.value)" class="w-full bg-emerald-950/80 text-white font-bold rounded-xl px-3 py-2 text-sm border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-400">
                ${mockCrops.map(crop => `
                  <option value="${crop.id}" ${state.selectedCrop === crop.id ? 'selected' : ''}>
                    ${crop.icon} ${crop.name} (Base ₹${crop.basePrice}/kg)
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- 2. Quantity -->
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <label class="block text-xs text-emerald-200 font-semibold mb-1">${t.quantity}</label>
              <div class="flex items-center space-x-2">
                <input type="number" value="${state.selectedQuantity}" min="10" max="50000" step="50" onchange="window.appState.setSelectedQuantity(Number(this.value))" class="w-full bg-emerald-950/80 text-white font-bold rounded-xl px-3 py-2 text-sm border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <span class="text-xs text-emerald-200 font-bold">kg</span>
              </div>
            </div>

            <!-- 3. Your Location -->
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <label class="block text-xs text-emerald-200 font-semibold mb-1">${t.location}</label>
              <select onchange="window.appState.setSelectedLocation(this.value)" class="w-full bg-emerald-950/80 text-white font-bold rounded-xl px-3 py-2 text-sm border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-400">
                ${mockLocations.map(loc => `
                  <option value="${loc.id}" ${state.selectedLocation === loc.id ? 'selected' : ''}>
                    ${loc.name}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- 4. Vehicle Type -->
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <label class="block text-xs text-emerald-200 font-semibold mb-1">${t.vehicleType}</label>
              <select onchange="window.appState.setSelectedVehicle(this.value)" class="w-full bg-emerald-950/80 text-white font-bold rounded-xl px-3 py-2 text-sm border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-400">
                ${mockVehicles.map(v => `
                  <option value="${v.id}" ${state.selectedVehicle === v.id ? 'selected' : ''}>
                    ${v.icon} ${v.name} (₹${v.ratePerKm}/km)
                  </option>
                `).join('')}
              </select>
            </div>

          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap items-center justify-between gap-4">
            <button onclick="window.appState.useCurrentGPSLocation()" class="px-4 py-2 bg-emerald-700/60 hover:bg-emerald-600 text-amber-300 text-xs font-bold rounded-xl border border-emerald-500 transition flex items-center space-x-1.5">
              <span>📍</span>
              <span>${t.useMyLocation}</span>
            </button>

            <button onclick="window.appState.triggerSearch()" class="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-sm rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-95 flex items-center justify-center space-x-2">
              <span>🔍</span>
              <span>${t.findBestPrice}</span>
            </button>
          </div>

        </div>
      </div>

      <!-- Side-by-Side Differentiating Educational Banner -->
      <div class="bg-amber-50 rounded-2xl p-5 border border-amber-200 shadow-sm mb-8">
        <div class="flex items-start space-x-3">
          <div class="text-2xl">💡</div>
          <div>
            <h4 class="font-extrabold text-amber-950 text-sm mb-1">
              Why FarmGain Recommends Highest Profit over Highest Price:
            </h4>
            <p class="text-xs text-amber-900 leading-relaxed mb-3">
              ${sideBySide.explanation}
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="bg-white p-3 rounded-xl border border-emerald-300 shadow-xs">
                <span class="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">RECOMMENDED</span>
                <p class="font-bold text-slate-800 mt-1">${sideBySide.buyerA.name}</p>
                <div class="text-slate-600 mt-0.5">Price: ₹${sideBySide.buyerA.price}/kg • Dist: ${sideBySide.buyerA.distance} km • Transport: ₹${sideBySide.buyerA.transport}</div>
                <div class="font-extrabold text-emerald-700 text-sm mt-1">Net Earnings: ₹${sideBySide.buyerA.net.toLocaleString('en-IN')}</div>
              </div>

              <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-xs opacity-75">
                <span class="bg-slate-400 text-white font-bold text-[10px] px-2 py-0.5 rounded">HIGHER PRICE BUT LOWER NET PROFIT</span>
                <p class="font-bold text-slate-800 mt-1">${sideBySide.buyerB.name}</p>
                <div class="text-slate-600 mt-0.5">Price: ₹${sideBySide.buyerB.price}/kg • Dist: ${sideBySide.buyerB.distance} km • Transport: ₹${sideBySide.buyerB.transport}</div>
                <div class="font-bold text-rose-600 text-sm mt-1">Net Earnings: ₹${sideBySide.buyerB.net.toLocaleString('en-IN')} (-₹1,200)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Header -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900">
            Nearby Buyer Results (${rankedBuyers.length})
          </h2>
          <p class="text-xs text-slate-500">Sorted by highest Net Profit taking transportation costs into account</p>
        </div>

        <button onclick="window.appState.setActiveTab('comparison')" class="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          📊 View Comparison Table
        </button>
      </div>

      <!-- Ranked Results Cards List -->
      <div class="space-y-4">
        ${rankedBuyers.map((buyer, idx) => renderMarketCard(buyer, state, idx)).join('')}
      </div>

    </div>
  `;
}
