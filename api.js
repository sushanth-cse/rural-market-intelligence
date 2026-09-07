// FarmGain API Client Service (Connecting to Python REST backend with fallback)

const API_BASE = window.location.origin.startsWith('http') ? window.location.origin : 'http://localhost:8000';

const apiService = {
  async getMarkets(cropId, quantity, vehicleId) {
    try {
      const res = await fetch(`${API_BASE}/api/markets?crop=${cropId || ''}&quantity=${quantity || 500}&vehicle=${vehicleId || 'mini_truck'}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("API server unreachable, using mock data fallback", e);
    }
    // Fallback to local calculation using engine.js & mockData.js
    const vehicle = mockVehicles.find(v => v.id === vehicleId) || mockVehicles[0];
    const buyers = calculateMarketProfits(mockBuyers, cropId || 'tomato', quantity || 500, vehicle);
    return { status: 'success', buyers, source: 'client_fallback' };
  },

  async getForecast(cropId) {
    try {
      const res = await fetch(`${API_BASE}/api/forecast?crop=${cropId || 'tomato'}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("API forecast unreachable, using mock fallback", e);
    }
    const forecast = mockForecasts[cropId] || mockForecasts['tomato'];
    return { status: 'success', forecast, source: 'client_fallback' };
  },

  async getRecommendation(cropId, quantity, vehicleId) {
    try {
      const res = await fetch(`${API_BASE}/api/recommendation?crop=${cropId}&quantity=${quantity}&vehicle=${vehicleId}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("API recommendation unreachable, using mock fallback", e);
    }
    const vehicle = mockVehicles.find(v => v.id === vehicleId) || mockVehicles[0];
    const buyers = calculateMarketProfits(mockBuyers, cropId || 'tomato', quantity || 500, vehicle);
    const forecast = mockForecasts[cropId] || mockForecasts['tomato'];
    const decision = generateSellingDecision(buyers, forecast, quantity || 500);
    return { status: 'success', decision, source: 'client_fallback' };
  },

  async submitSellingRequest(requestPayload) {
    try {
      const res = await fetch(`${API_BASE}/api/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("API post request unreachable, storing locally", e);
    }
    // Client side update
    const newReq = {
      id: 'req_' + Date.now(),
      timestamp: 'Just now',
      status: 'Pending',
      ...requestPayload
    };
    mockSellingRequests.unshift(newReq);
    return { status: 'success', request: newReq, source: 'client_fallback' };
  }
};
