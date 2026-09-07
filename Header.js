// FarmGain Header Component (Navigation, Role Switcher, Language Toggle)

function renderHeader(containerId, state, onStateChange) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const t = translations[state.lang] || translations.en;

  container.innerHTML = `
    <header class="bg-emerald-800 text-white shadow-lg sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Logo & Brand -->
          <div class="flex items-center space-x-3 cursor-pointer" onclick="window.appState.setActiveTab('home')">
            <div class="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-emerald-900 font-extrabold text-2xl shadow-inner">
              🌾
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <span class="font-bold text-xl tracking-tight">${t.appTitle}</span>
                <span class="bg-amber-400/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-medium border border-amber-400/30">v2.0 AI</span>
              </div>
              <p class="text-xs text-emerald-200 hidden sm:block">${t.tagline}</p>
            </div>
          </div>

          <!-- Desktop Navigation Links -->
          <nav class="hidden md:flex items-center space-x-1 lg:space-x-4">
            <button onclick="window.appState.setActiveTab('home')" class="px-3 py-2 rounded-lg text-sm font-medium transition ${state.activeTab === 'home' ? 'bg-emerald-900 text-amber-300 font-bold' : 'hover:bg-emerald-700/60 text-emerald-100'}">
              🏠 ${t.home}
            </button>
            <button onclick="window.appState.setActiveTab('markets')" class="px-3 py-2 rounded-lg text-sm font-medium transition ${state.activeTab === 'markets' ? 'bg-emerald-900 text-amber-300 font-bold' : 'hover:bg-emerald-700/60 text-emerald-100'}">
              🔎 ${t.markets}
            </button>
            <button onclick="window.appState.setActiveTab('forecast')" class="px-3 py-2 rounded-lg text-sm font-medium transition ${state.activeTab === 'forecast' ? 'bg-emerald-900 text-amber-300 font-bold' : 'hover:bg-emerald-700/60 text-emerald-100'}">
              📈 ${t.forecast}
            </button>
            <button onclick="window.appState.setActiveTab('calc')" class="px-3 py-2 rounded-lg text-sm font-medium transition ${state.activeTab === 'calc' ? 'bg-emerald-900 text-amber-300 font-bold' : 'hover:bg-emerald-700/60 text-emerald-100'}">
              🚚 ${t.calc}
            </button>
            <button onclick="window.appState.setActiveTab('chat')" class="relative px-3 py-2 rounded-lg text-sm font-medium transition ${state.activeTab === 'chat' ? 'bg-emerald-900 text-amber-300 font-bold' : 'hover:bg-emerald-700/60 text-emerald-100'}">
              💬 ${t.chat}
              ${state.unreadChat ? `<span class="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-emerald-800 animate-pulse"></span>` : ''}
            </button>
          </nav>

          <!-- Control Options: Role Switcher + Language Selector -->
          <div class="flex items-center space-x-3">
            
            <!-- Language Selector -->
            <div class="relative bg-emerald-900/80 rounded-lg p-1 border border-emerald-700/50 flex text-xs">
              <button onclick="window.appState.setLang('en')" class="px-2 py-1 rounded font-semibold transition ${state.lang === 'en' ? 'bg-amber-400 text-emerald-950 font-bold' : 'text-emerald-200 hover:text-white'}">
                EN
              </button>
              <button onclick="window.appState.setLang('kn')" class="px-2 py-1 rounded font-semibold transition ${state.lang === 'kn' ? 'bg-amber-400 text-emerald-950 font-bold' : 'text-emerald-200 hover:text-white'}">
                ಕನ್ನಡ
              </button>
              <button onclick="window.appState.setLang('hi')" class="px-2 py-1 rounded font-semibold transition ${state.lang === 'hi' ? 'bg-amber-400 text-emerald-950 font-bold' : 'text-emerald-200 hover:text-white'}">
                हिंदी
              </button>
            </div>

            <!-- Role Toggle Switch (Farmer vs Buyer) -->
            <button onclick="window.appState.setRole(window.appState.role === 'farmer' ? 'buyer' : 'farmer')" class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm ${state.role === 'buyer' ? 'bg-amber-400 text-emerald-950 border border-amber-300' : 'bg-emerald-700 text-white hover:bg-emerald-600 border border-emerald-500'}">
              <span>${state.role === 'farmer' ? '👨‍🌾' : '🏬'}</span>
              <span class="hidden xs:inline">${state.role === 'farmer' ? t.farmerRole : t.buyerRole}</span>
              <span class="text-[10px] bg-black/20 px-1.5 py-0.5 rounded ml-1">Switch</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  `;
}
