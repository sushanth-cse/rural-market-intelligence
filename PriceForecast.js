// FarmGain 7-Day Crop Price Forecast Component

function renderPriceForecast(containerId, state) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const t = translations[state.lang] || translations.en;
  const cropId = state.selectedCrop || 'tomato';
  const forecast = mockForecasts[cropId] || mockForecasts['tomato'];
  const cropObj = mockCrops.find(c => c.id === cropId) || mockCrops[0];

  const isRising = forecast.trend === 'rising';
  const isFalling = forecast.trend === 'falling';

  container.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <!-- Top Title & Crop Switcher -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6">
        
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-3xl">${cropObj.icon}</span>
              <h1 class="text-2xl font-extrabold text-slate-900">${t.forecastTitle}</h1>
            </div>
            <p class="text-xs text-slate-500 mt-1">${t.forecastSubtitle}</p>
          </div>

          <div class="flex items-center space-x-2">
            <label class="text-xs text-slate-500 font-bold">Select Crop:</label>
            <select onchange="window.appState.setSelectedCrop(this.value)" class="bg-slate-50 text-slate-900 text-xs font-bold rounded-xl px-3 py-2 border border-slate-300">
              ${mockCrops.map(c => `
                <option value="${c.id}" ${cropId === c.id ? 'selected' : ''}>
                  ${c.icon} ${c.name}
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Metric Cards Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
            <span class="block text-xs font-bold text-slate-500 uppercase">${t.todayPrice}</span>
            <span class="text-xl font-extrabold text-slate-900 mt-1 block">₹${forecast.todayPrice}/kg</span>
          </div>

          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
            <span class="block text-xs font-bold text-slate-500 uppercase">${t.targetPrice}</span>
            <span class="text-xl font-extrabold text-slate-900 mt-1 block">₹${forecast.targetPrice}/kg</span>
          </div>

          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
            <span class="block text-xs font-bold text-slate-500 uppercase">${t.expectedChange}</span>
            <span class="text-xl font-extrabold ${isRising ? 'text-emerald-700' : isFalling ? 'text-rose-600' : 'text-slate-700'} mt-1 block">
              ${forecast.expectedChange > 0 ? '+' : ''}₹${forecast.expectedChange}/kg
            </span>
          </div>

          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
            <span class="block text-xs font-bold text-slate-500 uppercase">${t.variation}</span>
            <span class="text-xl font-extrabold ${isRising ? 'text-emerald-700' : isFalling ? 'text-rose-600' : 'text-slate-700'} mt-1 block flex items-center justify-center space-x-1">
              <span>${isRising ? '📈' : isFalling ? '📉' : '➡'}</span>
              <span>${forecast.variationPct > 0 ? '+' : ''}${forecast.variationPct}%</span>
            </span>
          </div>

        </div>

      </div>

      <!-- Forecast Recommendation Box -->
      <div class="p-5 rounded-2xl border mb-6 ${isRising ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : isFalling ? 'bg-amber-50 border-amber-300 text-amber-950' : 'bg-slate-50 border-slate-300 text-slate-900'}">
        <div class="flex items-start space-x-3">
          <div class="text-2xl">${isRising ? '💡' : isFalling ? '⚠️' : 'ℹ️'}</div>
          <div>
            <h4 class="font-extrabold text-sm mb-1">${t.recommendedAction}</h4>
            <p class="text-xs leading-relaxed font-medium">
              ${forecast.recommendation}
            </p>
          </div>
        </div>
      </div>

      <!-- Line Chart Graphic Container -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-800 text-sm">7-Day Price Curve Trend (₹/kg)</h3>
          <span class="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">Interactive AI Chart</span>
        </div>
        <div class="relative h-64 sm:h-80 w-full">
          <canvas id="forecastChartCanvas"></canvas>
        </div>
      </div>

      <!-- AI Disclaimer Tag -->
      <div class="bg-slate-100 rounded-xl p-3 border border-slate-200 text-center">
        <p class="text-[11px] text-slate-500 font-medium">
          ${t.aiDisclaimer}
        </p>
      </div>

    </div>
  `;

  // Render Chart.js line graph after DOM inject
  setTimeout(() => {
    const ctx = document.getElementById('forecastChartCanvas');
    if (!ctx || typeof Chart === 'undefined') return;

    if (window.activeForecastChart) {
      window.activeForecastChart.destroy();
    }

    const labels = forecast.dailyData.map(d => d.day);
    const dataPoints = forecast.dailyData.map(d => d.price);

    window.activeForecastChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: `${cropObj.name} Price (₹/kg)`,
          data: dataPoints,
          borderColor: isRising ? '#16a34a' : isFalling ? '#dc2626' : '#2563eb',
          backgroundColor: isRising ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#15803d',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            ticks: { callback: value => '₹' + value }
          }
        }
      }
    });
  }, 100);
}
