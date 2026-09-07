// FarmGain Transportation Cost & Profit Calculator Component

function renderTransportCalc(containerId, state) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const t = translations[state.lang] || translations.en;
  const vehicle = mockVehicles.find(v => v.id === state.selectedVehicle) || mockVehicles[0];
  const cropObj = mockCrops.find(c => c.id === state.selectedCrop) || mockCrops[0];
  const buyer = mockBuyers.find(b => b.id === state.selectedCalcBuyer) || mockBuyers[0];

  const qty = state.selectedQuantity || 500;
  const price = buyer.pricePerKg || 28;
  const dist = buyer.distanceKm || 5;
  const vRate = vehicle.ratePerKm || 15;

  const grossRev = qty * price;
  const transportCost = Math.round(dist * vRate);
  const otherCosts = buyer.otherCostsEst || 200;
  const netProfit = grossRev - transportCost - otherCosts;

  container.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-2xl">🚚</div>
          <div>
            <h1 class="text-2xl font-extrabold text-slate-900">${t.calcTitle}</h1>
            <p class="text-xs text-slate-500">Adjust parameters below to see instant transportation and profit calculations</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <!-- Left Col: Input Parameters -->
          <div class="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            
            <!-- 1. Destination Buyer -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">${t.destination}</label>
              <select onchange="window.appState.setSelectedCalcBuyer(this.value)" class="w-full bg-white text-slate-900 font-bold rounded-xl px-3 py-2.5 text-xs sm:text-sm border border-slate-300 focus:ring-2 focus:ring-emerald-500">
                ${mockBuyers.map(b => `
                  <option value="${b.id}" ${buyer.id === b.id ? 'selected' : ''}>
                    ${b.name} (${b.distanceKm} km) - ₹${b.pricePerKg}/kg
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- 2. Crop Quantity -->
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="block text-xs font-bold text-slate-700 uppercase">${t.quantity}</label>
                <span class="text-xs font-extrabold text-emerald-800">${qty} kg</span>
              </div>
              <input type="range" min="100" max="5000" step="50" value="${qty}" oninput="window.appState.setSelectedQuantity(Number(this.value))" class="w-full accent-emerald-700 cursor-pointer" />
            </div>

            <!-- 3. Vehicle Type -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">${t.vehicleType}</label>
              <select onchange="window.appState.setSelectedVehicle(this.value)" class="w-full bg-white text-slate-900 font-bold rounded-xl px-3 py-2.5 text-xs sm:text-sm border border-slate-300 focus:ring-2 focus:ring-emerald-500">
                ${mockVehicles.map(v => `
                  <option value="${v.id}" ${vehicle.id === v.id ? 'selected' : ''}>
                    ${v.icon} ${v.name} (Rate: ₹${v.ratePerKm}/km)
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- 4. Price Override -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Price per kg (₹)</label>
              <input type="number" value="${price}" readonly class="w-full bg-slate-100 text-slate-700 font-bold rounded-xl px-3 py-2 text-sm border border-slate-200" />
            </div>

          </div>

          <!-- Right Col: Formula & Breakdown -->
          <div class="flex flex-col justify-between bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-800 relative overflow-hidden shadow-lg">
            
            <div class="absolute -right-8 -top-8 text-8xl opacity-10 select-none">🧮</div>

            <div>
              <h3 class="text-xs text-amber-300 font-bold uppercase tracking-wider mb-4">
                ${t.calcResult}
              </h3>

              <!-- Formula Lines -->
              <div class="space-y-3 text-xs sm:text-sm border-b border-emerald-800/80 pb-4">
                
                <div class="flex justify-between items-center text-emerald-200">
                  <span>Gross Revenue (${qty} kg × ₹${price})</span>
                  <span class="font-bold text-white">₹${grossRev.toLocaleString('en-IN')}</span>
                </div>

                <div class="flex justify-between items-center text-rose-300">
                  <span>Transport (${dist} km × ₹${vRate}/km)</span>
                  <span class="font-bold">-₹${transportCost.toLocaleString('en-IN')}</span>
                </div>

                <div class="flex justify-between items-center text-slate-300">
                  <span>Est. Mandi / Unloading Fee</span>
                  <span class="font-bold">-₹${otherCosts.toLocaleString('en-IN')}</span>
                </div>

              </div>

              <!-- Final Net Profit Calculation -->
              <div class="pt-4">
                <span class="block text-xs uppercase text-emerald-300 font-extrabold tracking-wider mb-1">${t.estimatedProfit}</span>
                <div class="text-3xl sm:text-4xl font-extrabold text-amber-400">
                  ₹${netProfit.toLocaleString('en-IN')}
                </div>
                <p class="text-[11px] text-emerald-300/80 mt-1">
                  Margin: ${(netProfit / grossRev * 100).toFixed(1)}% of gross revenue
                </p>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-emerald-800/80">
              <button onclick="window.appState.openSellingModal('${buyer.id}')" class="w-full py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs sm:text-sm rounded-xl transition shadow-md">
                📦 Request Selling Confirmation
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
