// FarmGain Formula Transparency Info Modal Component

function renderFormulaModal(containerId, state) {
  const container = document.getElementById(containerId);
  if (!container || !state.formulaModalBuyerId) {
    if (container) container.innerHTML = '';
    return;
  }

  const buyer = mockBuyers.find(b => b.id === state.formulaModalBuyerId) || mockBuyers[0];
  const vehicle = mockVehicles.find(v => v.id === state.selectedVehicle) || mockVehicles[0];
  const qty = state.selectedQuantity || 500;

  const gross = Math.round(qty * buyer.pricePerKg);
  const transport = Math.round(buyer.distanceKm * vehicle.ratePerKm);
  const other = buyer.otherCostsEst || 200;
  const net = gross - transport - other;

  container.innerHTML = `
    <div class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
        
        <button onclick="window.appState.closeFormulaModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold">
          ✕
        </button>

        <div class="flex items-center space-x-3 mb-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl font-bold">
            🧮
          </div>
          <div>
            <h3 class="font-extrabold text-slate-900 text-lg">Net Profit Calculation Transparency</h3>
            <p class="text-xs text-slate-500">Step-by-step breakdown for ${buyer.name}</p>
          </div>
        </div>

        <div class="space-y-3 text-xs sm:text-sm mb-6">
          
          <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span class="block text-[11px] font-bold text-slate-400 uppercase">Step 1: Gross Earnings</span>
            <div class="flex justify-between font-bold text-slate-800 mt-1">
              <span>${qty} kg × ₹${buyer.pricePerKg}/kg</span>
              <span>₹${gross.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="bg-rose-50 p-3 rounded-xl border border-rose-200">
            <span class="block text-[11px] font-bold text-rose-500 uppercase">Step 2: Transportation Cost</span>
            <div class="flex justify-between font-bold text-rose-700 mt-1">
              <span>${buyer.distanceKm} km × ₹${vehicle.ratePerKm}/km (${vehicle.name})</span>
              <span>-₹${transport.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span class="block text-[11px] font-bold text-slate-400 uppercase">Step 3: Est. Mandi Fees & Handling</span>
            <div class="flex justify-between font-bold text-slate-700 mt-1">
              <span>Unloading / Mandi Cess</span>
              <span>-₹${other.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="bg-emerald-100 p-4 rounded-xl border border-emerald-300">
            <span class="block text-xs font-black text-emerald-900 uppercase">Final Net Profit Realization</span>
            <div class="flex justify-between items-center mt-1">
              <span class="text-xs text-emerald-800 font-bold">Take-Home Profit</span>
              <span class="text-2xl font-black text-emerald-800">₹${net.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </div>

        <button onclick="window.appState.closeFormulaModal()" class="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl">
          Got It, Thanks!
        </button>

      </div>

    </div>
  `;
}
