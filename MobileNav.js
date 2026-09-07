// FarmGain Mobile Bottom Navigation Component

function renderMobileNav(containerId, state, onStateChange) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const t = translations[state.lang] || translations.en;

  container.innerHTML = `
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl z-40 px-2 py-2">
      <div class="grid grid-cols-5 gap-1 text-center">
        
        <button onclick="window.appState.setActiveTab('home')" class="flex flex-col items-center justify-center py-1 rounded-lg transition ${state.activeTab === 'home' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500 hover:text-slate-800'}">
          <span class="text-xl">🏠</span>
          <span class="text-[10px] tracking-tight mt-0.5">${t.home}</span>
        </button>

        <button onclick="window.appState.setActiveTab('markets')" class="flex flex-col items-center justify-center py-1 rounded-lg transition ${state.activeTab === 'markets' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500 hover:text-slate-800'}">
          <span class="text-xl">🔎</span>
          <span class="text-[10px] tracking-tight mt-0.5">${t.markets}</span>
        </button>

        <button onclick="window.appState.setActiveTab('forecast')" class="flex flex-col items-center justify-center py-1 rounded-lg transition ${state.activeTab === 'forecast' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500 hover:text-slate-800'}">
          <span class="text-xl">📈</span>
          <span class="text-[10px] tracking-tight mt-0.5">${t.forecast}</span>
        </button>

        <button onclick="window.appState.setActiveTab('calc')" class="flex flex-col items-center justify-center py-1 rounded-lg transition ${state.activeTab === 'calc' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500 hover:text-slate-800'}">
          <span class="text-xl">🚚</span>
          <span class="text-[10px] tracking-tight mt-0.5">${t.calc}</span>
        </button>

        <button onclick="window.appState.setActiveTab('chat')" class="relative flex flex-col items-center justify-center py-1 rounded-lg transition ${state.activeTab === 'chat' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500 hover:text-slate-800'}">
          <span class="text-xl">💬</span>
          <span class="text-[10px] tracking-tight mt-0.5">${t.chat}</span>
          ${state.unreadChat ? `<span class="absolute top-1 right-3 w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>` : ''}
        </button>

      </div>
    </div>
  `;
}
