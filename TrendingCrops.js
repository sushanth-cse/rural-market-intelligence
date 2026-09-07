// FarmGain Trending Crops Component

function renderTrendingCrops(containerId, state) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const t = translations[state.lang] || translations.en;

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
            <span>🔥</span>
            <span>${t.trendingTitle}</span>
          </h2>
          <p class="text-xs text-slate-500 mt-1">Crops experiencing strong price movement & high market demand</p>
        </div>
      </div>

      <!-- Grid of Crop Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${mockCrops.map(crop => {
          const forecast = mockForecasts[crop.id] || { expectedChange: 1.5, variationPct: 5.0, trend: 'rising' };
          const isRising = forecast.variationPct >= 0;

          return `
            <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition">
              <div class="flex items-center justify-between mb-3">
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-2xl font-bold">
                  ${crop.icon}
                </div>
                <span class="px-2.5 py-1 rounded-full text-xs font-bold ${isRising ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'} flex items-center space-x-1">
                  <span>${isRising ? '📈' : '📉'}</span>
                  <span>${isRising ? '+' : ''}${forecast.variationPct}%</span>
                </span>
              </div>

              <h3 class="font-bold text-slate-900 text-base">${crop.name}</h3>
              <p class="text-xs text-slate-500 font-medium mb-3">${crop.category}</p>

              <div class="flex items-baseline space-x-1 mb-4">
                <span class="text-2xl font-extrabold text-slate-900">₹${crop.basePrice}</span>
                <span class="text-xs text-slate-400 font-medium">/ kg</span>
              </div>

              <div class="grid grid-cols-2 gap-2 text-xs">
                <button onclick="window.appState.selectCropAndNavigate('${crop.id}', 'markets')" class="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl text-center border border-emerald-200 transition">
                  ${t.viewMarket}
                </button>
                <button onclick="window.appState.selectCropAndNavigate('${crop.id}', 'forecast')" class="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-xl text-center border border-amber-200 transition">
                  ${t.viewForecast}
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;
}
