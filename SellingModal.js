// FarmGain Selling Request Modal Dialog Component

function renderSellingModal(containerId, state) {
  const container = document.getElementById(containerId);
  if (!container || !state.sellingModalBuyerId) {
    if (container) container.innerHTML = '';
    return;
  }

  const buyer = mockBuyers.find(b => b.id === state.sellingModalBuyerId) || mockBuyers[0];
  const cropObj = mockCrops.find(c => c.id === state.selectedCrop) || mockCrops[0];
  const vehicle = mockVehicles.find(v => v.id === state.selectedVehicle) || mockVehicles[0];

  const qty = state.selectedQuantity || 500;
  const gross = qty * buyer.pricePerKg;
  const transport = Math.round(buyer.distanceKm * vehicle.ratePerKm);
  const net = gross - transport - (buyer.otherCostsEst || 200);

  container.innerHTML = `
    <div class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
        
        <!-- Close Button -->
        <button onclick="window.appState.closeSellingModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold">
          ✕
        </button>

        <!-- Header -->
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-bold">
            📦
          </div>
          <div>
            <h3 class="font-extrabold text-slate-900 text-lg">Send Direct Selling Request</h3>
            <p class="text-xs text-slate-500">Submit your produce offer directly to ${buyer.name}</p>
          </div>
        </div>

        <!-- Breakdown Card -->
        <div class="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 mb-5 text-xs space-y-2">
          <div class="flex justify-between">
            <span class="text-slate-600">Target Buyer:</span>
            <span class="font-bold text-slate-900">${buyer.name} (${buyer.location})</span>
          </div>

          <div class="flex justify-between">
            <span class="text-slate-600">Crop & Quantity:</span>
            <span class="font-bold text-slate-900">${cropObj.icon} ${qty} kg ${cropObj.name}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-slate-600">Buying Offer Price:</span>
            <span class="font-bold text-emerald-800">₹${buyer.pricePerKg}/kg</span>
          </div>

          <div class="flex justify-between border-t border-emerald-200 pt-2 font-bold text-sm">
            <span class="text-emerald-950">Est. Take-Home Profit:</span>
            <span class="text-emerald-800">₹${net.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- Form Inputs -->
        <div class="space-y-3 mb-6">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name</label>
            <input type="text" id="reqFarmerName" value="Ramesh Kumar" class="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold rounded-xl px-3 py-2 border border-slate-300" />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
            <input type="text" id="reqFarmerPhone" value="+91 94801 22334" class="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold rounded-xl px-3 py-2 border border-slate-300" />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Pickup Farm Address</label>
            <input type="text" id="reqFarmerAddress" value="Village Farm Gate, Kolar District" class="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold rounded-xl px-3 py-2 border border-slate-300" />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end space-x-3">
          <button onclick="window.appState.closeSellingModal()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl">
            Cancel
          </button>
          
          <button onclick="window.appState.submitSellingRequestFromModal()" class="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md transition">
            Confirm & Send Request
          </button>
        </div>

      </div>

    </div>
  `;
}
