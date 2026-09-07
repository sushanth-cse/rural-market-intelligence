// FarmGain Buyer Dashboard Component

function renderBuyerDashboard(containerId, state) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const t = translations[state.lang] || translations.en;
  const buyerProfile = mockBuyers[0]; // Active buyer persona (ABC Fresh Traders)

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <!-- Buyer Header Card -->
      <div class="bg-slate-900 text-white rounded-3xl p-6 shadow-xl mb-8 flex flex-wrap items-center justify-between gap-6">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-extrabold text-3xl shadow-inner">
            🏬
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <h1 class="text-2xl font-bold text-white">${buyerProfile.name}</h1>
              <span class="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full border border-emerald-400/30">Verified Buyer</span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">${buyerProfile.type} • ${buyerProfile.location}</p>
            <div class="flex items-center space-x-3 mt-1.5 text-xs text-slate-300">
              <span>★ ${buyerProfile.rating} (${buyerProfile.reviewsCount} reviews)</span>
              <span>•</span>
              <span>📞 ${buyerProfile.phone}</span>
            </div>
          </div>
        </div>

        <div>
          <button onclick="window.appState.toggleAddOfferModal()" class="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition flex items-center space-x-2">
            <span>➕</span>
            <span>Post New Crop Buy Offer</span>
          </button>
        </div>
      </div>

      <!-- Main Columns Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left 5 Cols: My Purchase Offers -->
        <div class="lg:col-span-5 space-y-4">
          
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span>📋</span>
              <span>${t.myOffers}</span>
            </h2>
            <span class="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
              ${mockBuyerOffers.length} Active
            </span>
          </div>

          <div class="space-y-3">
            ${mockBuyerOffers.map(offer => `
              <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center justify-between">
                <div>
                  <h3 class="font-bold text-slate-900 text-base">${offer.cropName}</h3>
                  <p class="text-xs text-slate-500">Buying Price: <strong class="text-emerald-700 text-sm">₹${offer.pricePerKg}/kg</strong></p>
                  <p class="text-[11px] text-slate-400">Required Quantity: ${offer.maxQtyKg} kg</p>
                </div>

                <div class="flex flex-col items-end space-y-2">
                  <span class="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                    ${offer.status}
                  </span>
                  <button class="text-xs text-slate-400 hover:text-slate-700 underline font-medium">Edit Rate</button>
                </div>
              </div>
            `).join('')}
          </div>

        </div>

        <!-- Right 7 Cols: Incoming Farmer Selling Requests -->
        <div class="lg:col-span-7 space-y-4">
          
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span>📦</span>
              <span>${t.incomingRequests}</span>
            </h2>
            <span class="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full">
              ${mockSellingRequests.length} Pending
            </span>
          </div>

          <div class="space-y-4">
            ${mockSellingRequests.map(req => `
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:border-emerald-300 transition">
                
                <div class="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                  <div class="flex items-center space-x-2">
                    <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">👨‍🌾</span>
                    <div>
                      <h4 class="font-bold text-slate-900 text-sm">${req.farmerName}</h4>
                      <p class="text-[11px] text-slate-400">${req.location} • ${req.timestamp}</p>
                    </div>
                  </div>

                  <span class="px-2.5 py-1 rounded-full text-xs font-bold ${req.status === 'Accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                    ${req.status}
                  </span>
                </div>

                <div class="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl mb-4 text-xs">
                  <div>
                    <span class="block text-slate-400 text-[10px] uppercase font-bold">Crop & Qty</span>
                    <span class="font-bold text-slate-800">${req.quantityKg} kg ${req.crop}</span>
                  </div>

                  <div>
                    <span class="block text-slate-400 text-[10px] uppercase font-bold">Offer Rate</span>
                    <span class="font-bold text-emerald-700">₹${req.offeredPricePerKg}/kg</span>
                  </div>

                  <div>
                    <span class="block text-slate-400 text-[10px] uppercase font-bold">Total Batch</span>
                    <span class="font-bold text-slate-900">₹${req.grossValue?.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div class="flex items-center justify-end space-x-2">
                  <button onclick="window.appState.openChat('b1')" class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition">
                    💬 Chat
                  </button>

                  ${req.status !== 'Accepted' ? `
                    <button onclick="window.appState.updateRequestStatus('${req.id}', 'Accepted')" class="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm transition">
                      ✓ Accept Offer
                    </button>
                  ` : `
                    <span class="text-xs text-emerald-700 font-bold">✓ Offer Confirmed</span>
                  `}
                </div>

              </div>
            `).join('')}
          </div>

        </div>

      </div>

    </div>
  `;
}
