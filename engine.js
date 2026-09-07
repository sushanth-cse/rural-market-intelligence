// FarmGain Best Selling Decision Engine & Net Profit Calculator

/**
 * Calculates complete net profit breakdown for a list of buyers given farmer inputs
 * @param {Array} buyersList List of buyer objects
 * @param {string} cropId Selected crop ID
 * @param {number} quantityKg Crop quantity in kg
 * @param {object} vehicle Selected vehicle object { id, ratePerKm, maxCapacity }
 * @returns {Array} Ranked buyers with calculated math and recommendation tags
 */
function calculateMarketProfits(buyersList, cropId, quantityKg, vehicle) {
  if (!buyersList || !Array.isArray(buyersList)) return [];
  
  const selectedVehicleRate = vehicle ? vehicle.ratePerKm : 15;
  
  // Filter buyers interested in this crop
  const filtered = buyersList.filter(b => b.crop.toLowerCase() === cropId.toLowerCase());
  
  const processed = filtered.map(buyer => {
    const grossEarning = Math.round(quantityKg * buyer.pricePerKg);
    const transportCost = Math.round(buyer.distanceKm * selectedVehicleRate);
    const otherCosts = buyer.otherCostsEst || 200;
    const netProfit = grossEarning - transportCost - otherCosts;
    const profitPerKg = Math.round((netProfit / quantityKg) * 100) / 100;
    
    return {
      ...buyer,
      calculated: {
        quantityKg,
        pricePerKg: buyer.pricePerKg,
        distanceKm: buyer.distanceKm,
        vehicleRatePerKm: selectedVehicleRate,
        grossEarning,
        transportCost,
        otherCosts,
        netProfit,
        profitPerKg,
        marginPct: Math.round((netProfit / grossEarning) * 100)
      }
    };
  });

  // SORT PRIMARILY BY HIGHEST NET PROFIT (Heart of the App!)
  processed.sort((a, b) => b.calculated.netProfit - a.calculated.netProfit);

  // Mark top result as BEST OPTION
  if (processed.length > 0) {
    processed[0].isBestOption = true;
    processed[0].recommendationBadge = "🏆 BEST NET PROFIT";
  }

  return processed;
}

/**
 * Generates an intelligent selling recommendation comparing best place vs best time
 * @param {Array} rankedBuyers List of calculated buyers sorted by net profit
 * @param {object} forecast 7-Day forecast object for the crop
 * @param {number} quantityKg Quantity in kg
 * @returns {object} Structured recommendation
 */
function generateSellingDecision(rankedBuyers, forecast, quantityKg) {
  if (!rankedBuyers || rankedBuyers.length === 0) {
    return {
      bestBuyerName: "N/A",
      bestNetProfit: 0,
      bestPlaceMessage: "No active buyers found for selected crop.",
      bestTimeMessage: "Check back later for market updates.",
      holdingAdvice: "Sell when market updates."
    };
  }

  const topBuyer = rankedBuyers[0];
  const netProfitStr = `₹${topBuyer.calculated.netProfit.toLocaleString('en-IN')}`;

  // Analyze forecast
  let timeAdvice = "Sell Today";
  let forecastMessage = "Prices are stable today.";
  
  if (forecast) {
    if (forecast.trend === 'rising' && forecast.expectedChange > 0) {
      const extraProfitPotential = Math.round(quantityKg * forecast.expectedChange);
      timeAdvice = "Consider Waiting 2–3 Days 📈";
      forecastMessage = `Prices are expected to rise by +₹${forecast.expectedChange}/kg over the next 3 days. Holding could earn you up to +₹${extraProfitPotential.toLocaleString('en-IN')} extra!`;
    } else if (forecast.trend === 'falling') {
      timeAdvice = "Sell Immediately 📉";
      forecastMessage = `Prices are expected to decline by ₹${Math.abs(forecast.expectedChange)}/kg soon due to high arrivals. Selling today protects your profit!`;
    } else {
      timeAdvice = "Sell Anytime Today or Tomorrow ➡";
      forecastMessage = `Prices are steady. Selling today gives immediate liquidity without holding risk.`;
    }
  }

  return {
    bestBuyerName: topBuyer.name,
    bestBuyerLocation: topBuyer.location,
    bestNetProfit: topBuyer.calculated.netProfit,
    bestNetProfitFormatted: netProfitStr,
    distanceKm: topBuyer.distanceKm,
    bestPlaceMessage: `Sell to ${topBuyer.name} (${topBuyer.distanceKm} km away) to maximize estimated net earnings at ${netProfitStr}.`,
    bestTimeAdvice: timeAdvice,
    forecastMessage: forecastMessage
  };
}

/**
 * Explains the side-by-side math example comparing Buyer A vs Buyer B
 */
function getSideBySideComparisonExample(cropName = 'Tomato', qty = 500) {
  return {
    buyerA: {
      name: "ABC Fresh Traders (Local Mandi)",
      price: 28,
      distance: 5,
      gross: 28 * qty, // 14,000
      transport: 800,
      other: 200,
      net: (28 * qty) - 800 - 200, // 13,000
      isWinner: true
    },
    buyerB: {
      name: "City APMC Yard (Distant Hub)",
      price: 30.5,
      distance: 35,
      gross: 30.5 * qty, // 15,250
      transport: 3000,
      other: 450,
      net: (30.5 * qty) - 3000 - 450, // 11,800
      isWinner: false
    },
    explanation: "Even though City APMC offers a higher price (₹30.50 vs ₹28.00), the extra 30 km transport cost (₹3,000 vs ₹800) reduces your final take-home earnings by ₹1,200! Local Buyer A gives you ₹1,200 MORE NET PROFIT!"
  };
}
