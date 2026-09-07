// FarmGain Direct Buyer Chat Window Component

function renderChatWindow(containerId, state) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const buyerId = state.activeChatBuyerId || 'b1';
  const buyer = mockBuyers.find(b => b.id === buyerId) || mockBuyers[0];
  const messages = state.chatHistory[buyerId] || mockInitialChats[buyerId] || [];

  container.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[650px]">
        
        <!-- Chat Header -->
        <div class="bg-emerald-900 text-white p-4 flex items-center justify-between shadow-md">
          <div class="flex items-center space-x-3">
            <button onclick="window.appState.setActiveTab('markets')" class="text-emerald-200 hover:text-white mr-1 text-lg">←</button>
            <div class="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold text-lg">
              🏬
            </div>
            <div>
              <h3 class="font-bold text-base text-white leading-tight">${buyer.name}</h3>
              <p class="text-xs text-emerald-200">${buyer.type} • 📍 ${buyer.distanceKm} km away</p>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <a href="tel:${buyer.phone}" class="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1 border border-emerald-700">
              <span>📞</span>
              <span class="hidden sm:inline">Call Buyer</span>
            </a>
          </div>
        </div>

        <!-- Chat Messages Container -->
        <div id="chatMessagesBox" class="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
          ${messages.map(msg => {
            const isFarmer = msg.sender === 'farmer';
            return `
              <div class="flex ${isFarmer ? 'justify-end' : 'justify-start'}">
                <div class="max-w-[80%] rounded-2xl p-3 text-xs sm:text-sm shadow-xs ${isFarmer ? 'bg-emerald-700 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'}">
                  <div class="font-semibold text-[10px] opacity-80 mb-0.5">${isFarmer ? 'You (Farmer)' : buyer.name} • ${msg.time}</div>
                  <p class="leading-relaxed">${msg.text}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Quick Response Suggestion Chips -->
        <div class="px-4 py-2 bg-white border-t border-slate-100 flex items-center space-x-2 overflow-x-auto text-xs whitespace-nowrap">
          <span class="text-slate-400 font-bold text-[10px] uppercase">Quick Replies:</span>
          <button onclick="window.appState.sendChatMessage('${buyerId}', 'Can you confirm pickup time and location?')" class="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-full border border-slate-200 transition">
            💬 Confirm Pickup
          </button>
          <button onclick="window.appState.sendChatMessage('${buyerId}', 'I have 500 kg fresh Tomatoes available.')" class="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-full border border-slate-200 transition">
            🍅 500 kg Tomato
          </button>
          <button onclick="window.appState.sendChatMessage('${buyerId}', 'Can you offer ₹29/kg if I bring it today?')" class="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-full border border-slate-200 transition">
            🤝 Price Negotiation
          </button>
        </div>

        <!-- Chat Input Bar -->
        <div class="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input type="text" id="chatInputText" placeholder="Type a message to buyer..." onkeypress="if(event.key==='Enter') window.appState.sendChatMessageFromInput('${buyerId}')" class="flex-1 bg-slate-100 text-slate-900 text-xs sm:text-sm rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          <button onclick="window.appState.sendChatMessageFromInput('${buyerId}')" class="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-sm transition">
            Send
          </button>
        </div>

      </div>

    </div>
  `;

  // Auto scroll chat to bottom
  setTimeout(() => {
    const box = document.getElementById('chatMessagesBox');
    if (box) box.scrollTop = box.scrollHeight;
  }, 50);
}
