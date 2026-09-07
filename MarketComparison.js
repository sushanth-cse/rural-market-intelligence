// FarmGain Market Comparison Dashboard Component

function renderMarketComparison(containerId, state) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const t = translations[state.lang] || translations.en;
  const vehicle = mockVehicles.find(v => v.id === state.selectedVehicle) || mockVehicles[0];
  const buyers = calculateMarketProfits(mockBuyers, state.selectedCrop, state.selectedQuantity, vehicle);
  const cropObj = mockCrops.find(c => c.id === state.selectedCrop) || mockCrops[0];

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <!-- Title & Context Banner -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div class="flex items-center space-x-2">
            <span class="text-2xl">${cropObj.icon}</span>
            <h1 class="text-2xl font-bold text-slate-900">${t.comparisonTitle}</h1>
          </div>
          <p class="text-xs text-slate-500 mt-1">
            Comparing buyers for <strong class="text-slate-800">${state.selectedQuantity} kg ${cropObj.name}</strong> using <strong class="text-slate-800">${vehicle.name}</strong> (₹${vehicle.ratePerKm}/km)
          </p>
        </div>

        <div class="flex items-center space-x-2">
          <select onchange="window.appState.setSelectedCrop(this.value)" class="bg-slate-50 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 border border-slate-200">
            ${mockCrops.map(c => `<option value="${c.id}" ${state.selectedCrop === c.id ? 'selected' : ''}>${c.icon} ${c.name}</option>`).join('')}
          </select>
          <button onclick="window.appState.setActiveTab('markets')" class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm">
            🔍 Back to Search
          </button>
        </div>
      </div>

      <!-- Responsive Comparison Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            
            <thead>
              <tr class="bg-slate-50 text-slate-600 text-xs font-bold border-b border-slate-200 uppercase tracking-wider">
                <th class="py-3.5 px-4">${t.marketName}</th>
                <th class="py-3.5 px-4">${t.pricePerKg}</th>
                <th class="py-3.5 px-4">${t.distance}</th>
                <th class="py-3.5 px-4">${t.transportCost}</th>
                <th class="py-3.5 px-4">${t.grossRev}</th>
                <th class="py-3.5 px-4">${t.estCosts}</th>
                <th class="py-3.5 px-4 text-emerald-800">${t.netProfit}</th>
                <th class="py-3.5 px-4">${t.priceTrend}</th>
                <th class="py-3.5 px-4 text-right">${t.action}</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
              ${buyers.map((b, idx) => {
                const c = b.calculated;
                const isBest = b.isBestOption;
                return `
                  <tr class="${isBest ? 'bg-amber-50/60 font-semibold' : 'hover:bg-slate-50/80'} transition">
                    
                    <!-- Market / Buyer -->
                    <td class="py-4 px-4">
                      <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">🏬</div>
                        <div>
                          <div class="font-bold text-slate-900 flex items-center space-x-1">
                            <span>${b.name}</span>
                            ${isBest ? `<span class="bg-amber-400 text-emerald-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full ml-1">${t.bestProfitBadge}</span>` : ''}
                          </div>
                          <span class="text-[11px] text-slate-500">${b.location} • ★ ${b.rating}</span>
                        </div>
                      </div>
                    </td>

                    <!-- Price per kg -->
                    <td class="py-4 px-4 text-slate-900 font-bold">
                      ₹${b.pricePerKg}/kg
                    </td>

                    <!-- Distance -->
                    <td class="py-4 px-4 text-slate-600">
                      📍 ${b.distanceKm} km
                    </td>

                    <!-- Transport Cost -->
                    <td class="py-4 px-4 text-rose-600 font-semibold">
                      -₹${c.transportCost.toLocaleString('en-IN')}
                    </td>

                    <!-- Gross Revenue -->
                    <td class="py-4 px-4 text-slate-700">
                      ₹${c.grossEarning.toLocaleString('en-IN')}
                    </td>

                    <!-- Estimated Mandi/Other Costs -->
                    <td class="py-4 px-4 text-slate-500">
                      -₹${c.otherCosts.toLocaleString('en-IN')}
                    </td>

                    <!-- NET PROFIT -->
                    <td class="py-4 px-4">
                      <div class="inline-block px-3 py-1.5 rounded-xl ${isBest ? 'bg-emerald-700 text-white font-extrabold text-base shadow-sm' : 'bg-emerald-100 text-emerald-900 font-bold text-sm'}">
                        ₹${c.netProfit.toLocaleString('en-IN')}
                      </div>
                    </td>

                    <!-- Price Trend -->
                    <td class="py-4 px-4">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${idx % 2 === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                        ${idx % 2 === 0 ? '↑ Rising' : '→ Stable'}
                      </span>
                    </td>

                    <!-- Action Buttons -->
                    <td class="py-4 px-4 text-right">
                      <div class="flex items-center justify-end space-x-1.5">
                        <button onclick="window.appState.openChat('${b.id}')" class="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs" title="Chat">💬</button>
                        <button onclick="window.appState.openSellingModal('${b.id}')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs">Send Request</button>
                      </div>
                    </td>

                  </tr>
                `;
              }).join('')}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  `;
}
