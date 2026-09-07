// FarmGain Market Result Card Component

function renderMarketCard(buyer, state, rankIndex = 0) {
  const t = translations[state.lang] || translations.en;
  const calc = buyer.calculated;
  const isBest = buyer.isBestOption;

  return `
    <div class="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition border ${isBest ? 'border-amber-400 ring-2 ring-amber-400/40 bg-gradient-to-b from-amber-50/30 to-white' : 'border-slate-200'} p-5 mb-4">
      
      <!-- Top Badges -->
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div class="flex items-center space-x-2">
          ${isBest ? `
            <span class="bg-amber-400 text-emerald-950 font-extrabold text-xs px-3 py-1 rounded-full shadow-sm flex items-center space-x-1 animate-pulse">
              <span>🏆</span>
              <span>${t.bestOption} - ${t.highestNetProfit}</span>
            </span>
          ` : `
            <span class="bg-slate-100 text-slate-700 font-semibold text-xs px-2.5 py-1 rounded-md">
              Rank #${rankIndex + 1}
            </span>
          `}
          <span class="bg-emerald-50 text-emerald-800 text-xs px-2.5 py-1 rounded-md font-medium border border-emerald-200/60">
            📍 ${buyer.distanceKm} km away
          </span>
        </div>

        <div class="text-xs text-slate-400 font-medium">
          ⏱️ ${buyer.updatedAgo}
        </div>
      </div>

      <!-- Main Body: Buyer Info & Price -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        <!-- Left 6 cols: Buyer Name, Type, Address, Rating -->
        <div class="md:col-span-6">
          <div class="flex items-start space-x-3">
            <div class="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg flex-shrink-0">
              🏬
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h3 class="font-bold text-slate-900 text-base leading-snug">${buyer.name}</h3>
                ${buyer.verified ? `<span class="text-emerald-600 text-sm" title="Verified Market Buyer">✓</span>` : ''}
              </div>
              <p class="text-xs text-slate-500 font-medium">${buyer.type} • ${buyer.location}</p>
              <div class="flex items-center space-x-2 mt-1 text-xs text-slate-600">
                <span class="text-amber-500 font-bold">★ ${buyer.rating}</span>
                <span class="text-slate-400">(${buyer.reviewsCount} reviews)</span>
                <span class="text-slate-300">•</span>
                <span class="text-slate-500 truncate">${buyer.address}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right 6 cols: Price per kg & Financial Breakdown -->
        <div class="md:col-span-6 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div class="grid grid-cols-2 xs:grid-cols-4 gap-2 text-center">
            
            <div class="p-1">
              <span class="block text-[11px] text-slate-500 uppercase font-semibold">${t.pricePerKg}</span>
              <span class="text-base font-bold text-slate-800">₹${buyer.pricePerKg}/kg</span>
            </div>

            <div class="p-1">
              <span class="block text-[11px] text-slate-500 uppercase font-semibold">${t.grossEarning}</span>
              <span class="text-sm font-semibold text-slate-700">₹${calc.grossEarning.toLocaleString('en-IN')}</span>
            </div>

            <div class="p-1">
              <span class="block text-[11px] text-slate-500 uppercase font-semibold">${t.transportCost}</span>
              <span class="text-sm font-semibold text-rose-600">-₹${calc.transportCost.toLocaleString('en-IN')}</span>
            </div>

            <!-- NET PROFIT HIGHLIGHT -->
            <div class="p-1 rounded-lg ${isBest ? 'bg-emerald-100/90 border border-emerald-300' : 'bg-emerald-50'}">
              <span class="block text-[11px] text-emerald-900 font-bold uppercase">${t.netProfit}</span>
              <span class="text-lg font-extrabold ${isBest ? 'text-emerald-800' : 'text-emerald-700'}">₹${calc.netProfit.toLocaleString('en-IN')}</span>
            </div>

          </div>
        </div>

      </div>

      <!-- Action Buttons & Math Formula Toggle -->
      <div class="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        
        <button onclick="window.appState.openFormulaModal('${buyer.id}')" class="text-xs text-emerald-700 hover:text-emerald-900 font-medium underline flex items-center space-x-1">
          <span>❓ How is ₹${calc.netProfit.toLocaleString('en-IN')} calculated?</span>
        </button>

        <div class="flex items-center space-x-2">
          <button onclick="window.appState.openChat('${buyer.id}')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center space-x-1">
            <span>💬</span>
            <span>${t.chatWithBuyer}</span>
          </button>
          
          <button onclick="window.appState.openSellingModal('${buyer.id}')" class="px-4 py-2 ${isBest ? 'bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md' : 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold'} text-xs rounded-xl transition flex items-center space-x-1">
            <span>📦</span>
            <span>${t.sendSellingRequest}</span>
          </button>
        </div>

      </div>

    </div>
  `;
}
