// FarmGain Comprehensive Mock Dataset for Hackathon Prototype
// Multi-State India Agricultural Locations & Buyers (Vegetables & Fruits Expanded)

const mockCrops = [
  // Vegetables
  { id: 'tomato', name: 'Tomato', icon: '🍅', category: 'Vegetable', basePrice: 28, unit: 'kg', mainStates: 'Karnataka, Andhra Pradesh, Maharashtra, Tamil Nadu' },
  { id: 'onion', name: 'Onion', icon: '🧅', category: 'Vegetable', basePrice: 24, unit: 'kg', mainStates: 'Maharashtra, Madhya Pradesh, Karnataka, Gujarat' },
  { id: 'potato', name: 'Potato', icon: '🥔', category: 'Tubers', basePrice: 20, unit: 'kg', mainStates: 'Uttar Pradesh, West Bengal, Punjab, Bihar, Gujarat' },
  { id: 'chilli', name: 'Chilli (Green/Red)', icon: '🌶️', category: 'Spices', basePrice: 85, unit: 'kg', mainStates: 'Andhra Pradesh, Telangana, Karnataka, Madhya Pradesh' },
  { id: 'cabbage', name: 'Cabbage', icon: '🥬', category: 'Vegetable', basePrice: 16, unit: 'kg', mainStates: 'West Bengal, Odisha, Maharashtra, Karnataka' },
  { id: 'brinjal', name: 'Brinjal (Eggplant)', icon: '🍆', category: 'Vegetable', basePrice: 32, unit: 'kg', mainStates: 'West Bengal, Odisha, Gujarat, Uttar Pradesh, Karnataka' },
  { id: 'cucumber', name: 'Cucumber', icon: '🥒', category: 'Vegetable', basePrice: 22, unit: 'kg', mainStates: 'Haryana, Karnataka, Rajasthan, Uttar Pradesh' },
  { id: 'carrot', name: 'Carrot', icon: '🥕', category: 'Vegetable', basePrice: 35, unit: 'kg', mainStates: 'Tamil Nadu (Nilgiris), Punjab, Haryana, Karnataka' },
  { id: 'capsicum', name: 'Capsicum (Bell Pepper)', icon: '🫑', category: 'High-Value Veg', basePrice: 65, unit: 'kg', mainStates: 'Karnataka, Himachal Pradesh, Maharashtra' },
  { id: 'garlic', name: 'Garlic', icon: '🧄', category: 'Spice/Veg', basePrice: 140, unit: 'kg', mainStates: 'Madhya Pradesh, Rajasthan, Gujarat' },
  
  // Fruits
  { id: 'banana', name: 'Banana (G9 / Cavendish)', icon: '🍌', category: 'Fruit', basePrice: 18, unit: 'kg', mainStates: 'Tamil Nadu, Andhra Pradesh, Maharashtra, Gujarat' },
  { id: 'mango', name: 'Mango (Alphonso / Banganapalli)', icon: '🥭', category: 'Fruit', basePrice: 75, unit: 'kg', mainStates: 'Andhra Pradesh, Uttar Pradesh, Maharashtra, Karnataka' },
  { id: 'watermelon', name: 'Watermelon', icon: '🍉', category: 'Fruit', basePrice: 15, unit: 'kg', mainStates: 'Tamil Nadu, Karnataka, Andhra Pradesh, Maharashtra' },
  { id: 'grapes', name: 'Grapes (Thompson Seedless)', icon: '🍇', category: 'Fruit', basePrice: 90, unit: 'kg', mainStates: 'Maharashtra (Nashik), Karnataka' },
  { id: 'apple', name: 'Apple (Royal Delicious)', icon: '🍎', category: 'Fruit', basePrice: 110, unit: 'kg', mainStates: 'Himachal Pradesh, Jammu & Kashmir, Uttarakhand' },
  { id: 'orange', name: 'Orange / Citrus', icon: '🍊', category: 'Fruit', basePrice: 45, unit: 'kg', mainStates: 'Maharashtra (Nagpur), Punjab, Andhra Pradesh' }
];

const mockVehicles = [
  { id: 'mini_truck', name: 'Mini Commercial (Tata Ace)', ratePerKm: 15, maxCapacity: 750, icon: '🛺' },
  { id: 'pickup', name: 'Pickup Truck (Mahindra Bolero)', ratePerKm: 22, maxCapacity: 1500, icon: '🛻' },
  { id: 'tractor', name: 'Tractor Trailer', ratePerKm: 28, maxCapacity: 3000, icon: '🚜' },
  { id: 'large_truck', name: 'Heavy Commercial Truck', ratePerKm: 42, maxCapacity: 9000, icon: '🚛' }
];

// All Major Indian States & Agricultural Hub Places
const mockLocations = [
  { id: 'karnataka_kolar', name: 'Kolar, Karnataka (Tomato & Veg Hub)', state: 'Karnataka' },
  { id: 'karnataka_belagavi', name: 'Belagavi, Karnataka (Onion & Veg Hub)', state: 'Karnataka' },
  { id: 'maharashtra_nashik', name: 'Nashik, Maharashtra (Onion, Grapes & Veg Capital)', state: 'Maharashtra' },
  { id: 'maharashtra_pune', name: 'Pune, Maharashtra (Veg & Fruit Hub)', state: 'Maharashtra' },
  { id: 'maharashtra_nagpur', name: 'Nagpur, Maharashtra (Orange & Citrus Hub)', state: 'Maharashtra' },
  { id: 'ap_guntur', name: 'Guntur, Andhra Pradesh (Chilli Hub of Asia)', state: 'Andhra Pradesh' },
  { id: 'ap_chittoor', name: 'Chittoor, Andhra Pradesh (Tomato & Mango Belt)', state: 'Andhra Pradesh' },
  { id: 'up_agra', name: 'Agra, Uttar Pradesh (Potato Hub)', state: 'Uttar Pradesh' },
  { id: 'up_varanasi', name: 'Varanasi, Uttar Pradesh (Brinjal & Veg Belt)', state: 'Uttar Pradesh' },
  { id: 'up_malihabad', name: 'Malihabad (Lucknow), Uttar Pradesh (Mango Capital)', state: 'Uttar Pradesh' },
  { id: 'wb_hooghly', name: 'Hooghly, West Bengal (Potato & Veg Hub)', state: 'West Bengal' },
  { id: 'punjab_ludhiana', name: 'Ludhiana, Punjab (Potato & Kinnow Hub)', state: 'Punjab' },
  { id: 'mp_indore', name: 'Indore, Madhya Pradesh (Garlic & Onion Hub)', state: 'Madhya Pradesh' },
  { id: 'mp_neemuch', name: 'Neemuch, Madhya Pradesh (Garlic & Spice Mandi)', state: 'Madhya Pradesh' },
  { id: 'gujarat_anand', name: 'Anand, Gujarat (Banana & Veg Hub)', state: 'Gujarat' },
  { id: 'tn_dindigul', name: 'Dindigul, Tamil Nadu (Vegetable & Fruit Market)', state: 'Tamil Nadu' },
  { id: 'tn_trichy', name: 'Trichy, Tamil Nadu (Banana Hub of South)', state: 'Tamil Nadu' },
  { id: 'tn_ooty', name: 'Ooty (Nilgiris), Tamil Nadu (Carrot & Exotic Veg)', state: 'Tamil Nadu' },
  { id: 'rajasthan_jaipur', name: 'Jaipur, Rajasthan (Cucumber & Garlic Market)', state: 'Rajasthan' },
  { id: 'haryana_karnal', name: 'Karnal, Haryana (Cucumber & Veg Hub)', state: 'Haryana' },
  { id: 'hp_shimla', name: 'Shimla, Himachal Pradesh (Apple & Capsicum Hub)', state: 'Himachal Pradesh' },
  { id: 'telangana_khammam', name: 'Khammam, Telangana (Chilli & Mango Hub)', state: 'Telangana' },
  { id: 'custom', name: 'My Current GPS Location', state: 'GPS' }
];

// Predefined buyers across all Indian States demonstrating Net Profit ranking
const mockBuyers = [
  // --- TOMATO BUYERS ---
  {
    id: 'b1',
    name: 'ABC Fresh Traders (Kolar Mandi)',
    type: 'Direct Mandi Buyer',
    location: 'Kolar Town, Karnataka',
    state: 'Karnataka',
    distanceKm: 4.8,
    crop: 'tomato',
    pricePerKg: 28.0,
    acceptedQtyKg: 2000,
    rating: 4.9,
    reviewsCount: 42,
    updatedAgo: '15 minutes ago',
    address: 'Near APMC Yard Gate 2, Kolar Main Road',
    phone: '+91 98765 43210',
    verified: true,
    otherCostsEst: 200
  },
  {
    id: 'b2',
    name: 'City Wholesale APMC Yard',
    type: 'Regional APMC Hub',
    location: 'Bangalore Outskirts, Karnataka',
    state: 'Karnataka',
    distanceKm: 34.5,
    crop: 'tomato',
    pricePerKg: 30.5,
    acceptedQtyKg: 10000,
    rating: 4.4,
    reviewsCount: 128,
    updatedAgo: '1 hour ago',
    address: 'Platform 4, Yeshwanthpur APMC Market',
    phone: '+91 98123 45678',
    verified: true,
    otherCostsEst: 500
  },
  {
    id: 'b3_ap',
    name: 'Madanapalle Tomato Market Hub',
    type: 'Asia Tomato Exchange',
    location: 'Madanapalle, Andhra Pradesh',
    state: 'Andhra Pradesh',
    distanceKm: 12.5,
    crop: 'tomato',
    pricePerKg: 29.5,
    acceptedQtyKg: 15000,
    rating: 4.8,
    reviewsCount: 230,
    updatedAgo: '10 minutes ago',
    address: 'Madanapalle APMC Market, Chittoor Dist',
    phone: '+91 94401 55667',
    verified: true,
    otherCostsEst: 350
  },

  // --- ONION BUYERS ---
  {
    id: 'b5',
    name: 'Lasalgaon Direct Onion Traders',
    type: 'Asia Largest Onion Mandi',
    location: 'Lasalgaon, Nashik, Maharashtra',
    state: 'Maharashtra',
    distanceKm: 6.0,
    crop: 'onion',
    pricePerKg: 25.5,
    acceptedQtyKg: 20000,
    rating: 4.9,
    reviewsCount: 310,
    updatedAgo: '10 minutes ago',
    address: 'Gate 1, Lasalgaon APMC, Nashik',
    phone: '+91 98220 11223',
    verified: true,
    otherCostsEst: 250
  },
  {
    id: 'b6_mp',
    name: 'Indore Malwa Agriculture Mart',
    type: 'Central MP Mandi',
    location: 'Indore, Madhya Pradesh',
    state: 'Madhya Pradesh',
    distanceKm: 14.0,
    crop: 'onion',
    pricePerKg: 24.5,
    acceptedQtyKg: 8000,
    rating: 4.7,
    reviewsCount: 95,
    updatedAgo: '20 minutes ago',
    address: 'Choithram Mandi, Indore',
    phone: '+91 98930 77889',
    verified: true,
    otherCostsEst: 300
  },

  // --- POTATO BUYERS ---
  {
    id: 'b7',
    name: 'Agra Taj Potato Cold Storage Mart',
    type: 'Cold Storage & Wholesale',
    location: 'Agra, Uttar Pradesh',
    state: 'Uttar Pradesh',
    distanceKm: 5.5,
    crop: 'potato',
    pricePerKg: 21.0,
    acceptedQtyKg: 25000,
    rating: 4.9,
    reviewsCount: 190,
    updatedAgo: '10 minutes ago',
    address: 'Fatehabad Road Cold Belt, Agra',
    phone: '+91 94122 33445',
    verified: true,
    otherCostsEst: 200
  },
  {
    id: 'b7_wb',
    name: 'Hooghly Cold Storage FPO Hub',
    type: 'Bengal Potato Hub',
    location: 'Hooghly, West Bengal',
    state: 'West Bengal',
    distanceKm: 7.2,
    crop: 'potato',
    pricePerKg: 20.5,
    acceptedQtyKg: 18000,
    rating: 4.8,
    reviewsCount: 145,
    updatedAgo: '30 minutes ago',
    address: 'Champadanga APMC, Hooghly',
    phone: '+91 98300 55667',
    verified: true,
    otherCostsEst: 180
  },

  // --- CHILLI BUYERS ---
  {
    id: 'b8',
    name: 'Guntur Asia Chilli Yard',
    type: 'International Chilli Exchange',
    location: 'Guntur, Andhra Pradesh',
    state: 'Andhra Pradesh',
    distanceKm: 6.0,
    crop: 'chilli',
    pricePerKg: 88.0,
    acceptedQtyKg: 30000,
    rating: 4.9,
    reviewsCount: 420,
    updatedAgo: '5 minutes ago',
    address: 'Mirchi Yard, GT Road, Guntur',
    phone: '+91 98480 11223',
    verified: true,
    otherCostsEst: 400
  },

  // --- BANANA BUYERS (Fruits) ---
  {
    id: 'b_banana_tn',
    name: 'Trichy Banana Traders Association',
    type: 'Fruit Export Hub',
    location: 'Trichy, Tamil Nadu',
    state: 'Tamil Nadu',
    distanceKm: 8.5,
    crop: 'banana',
    pricePerKg: 19.5,
    acceptedQtyKg: 12000,
    rating: 4.8,
    reviewsCount: 140,
    updatedAgo: '12 minutes ago',
    address: 'Gandhi Market, Trichy',
    phone: '+91 94433 22110',
    verified: true,
    otherCostsEst: 200
  },
  {
    id: 'b_banana_mh',
    name: 'Jalgaon Banana Export Cooperative',
    type: 'Banana Belt Exporter',
    location: 'Jalgaon, Maharashtra',
    state: 'Maharashtra',
    distanceKm: 14.0,
    crop: 'banana',
    pricePerKg: 20.0,
    acceptedQtyKg: 25000,
    rating: 4.9,
    reviewsCount: 260,
    updatedAgo: '20 minutes ago',
    address: 'Bypass Highway, Jalgaon Mandi',
    phone: '+91 98225 66778',
    verified: true,
    otherCostsEst: 300
  },

  // --- MANGO BUYERS (Fruits) ---
  {
    id: 'b_mango_ap',
    name: 'Vijayawada Banganapalli Mango Mart',
    type: 'State Fruit Exchange',
    location: 'Vijayawada, Andhra Pradesh',
    state: 'Andhra Pradesh',
    distanceKm: 11.0,
    crop: 'mango',
    pricePerKg: 78.0,
    acceptedQtyKg: 10000,
    rating: 4.9,
    reviewsCount: 310,
    updatedAgo: '15 minutes ago',
    address: 'Kedarishwar Pet Fruit Market',
    phone: '+91 98491 55443',
    verified: true,
    otherCostsEst: 350
  },
  {
    id: 'b_mango_mh',
    name: 'Ratnagiri Alphonso Exporters',
    type: 'Premium Fruit Exporter',
    location: 'Ratnagiri, Maharashtra',
    state: 'Maharashtra',
    distanceKm: 18.5,
    crop: 'mango',
    pricePerKg: 95.0,
    acceptedQtyKg: 8000,
    rating: 5.0,
    reviewsCount: 180,
    updatedAgo: '10 minutes ago',
    address: 'APMC Fruit Yard, Ratnagiri',
    phone: '+91 98210 99887',
    verified: true,
    otherCostsEst: 450
  },

  // --- WATERMELON BUYERS (Fruits) ---
  {
    id: 'b_watermelon_tn',
    name: 'Tindivanam Fruit Mandi',
    type: 'Watermelon Hub',
    location: 'Tindivanam, Tamil Nadu',
    state: 'Tamil Nadu',
    distanceKm: 9.0,
    crop: 'watermelon',
    pricePerKg: 16.0,
    acceptedQtyKg: 30000,
    rating: 4.7,
    reviewsCount: 115,
    updatedAgo: '25 minutes ago',
    address: 'NH 45 Bypass Fruit Yard',
    phone: '+91 94441 22334',
    verified: true,
    otherCostsEst: 200
  },

  // --- GRAPES BUYERS (Fruits) ---
  {
    id: 'b_grapes_mh',
    name: 'Nashik Grape Exporters Association',
    type: 'Global Grape Exporter',
    location: 'Pimpalgaon, Nashik, Maharashtra',
    state: 'Maharashtra',
    distanceKm: 7.5,
    crop: 'grapes',
    pricePerKg: 94.0,
    acceptedQtyKg: 15000,
    rating: 4.9,
    reviewsCount: 290,
    updatedAgo: '10 minutes ago',
    address: 'Cold Chain Park, Pimpalgaon',
    phone: '+91 98220 88990',
    verified: true,
    otherCostsEst: 400
  },

  // --- APPLE BUYERS (Fruits) ---
  {
    id: 'b_apple_hp',
    name: 'Shimla Dhalli Fruit Market',
    type: 'Apple Wholesale Mandi',
    location: 'Shimla, Himachal Pradesh',
    state: 'Himachal Pradesh',
    distanceKm: 6.0,
    crop: 'apple',
    pricePerKg: 115.0,
    acceptedQtyKg: 20000,
    rating: 4.9,
    reviewsCount: 340,
    updatedAgo: '5 minutes ago',
    address: 'Dhalli APMC Market, Shimla',
    phone: '+91 98160 11223',
    verified: true,
    otherCostsEst: 500
  },

  // --- ORANGE BUYERS (Fruits) ---
  {
    id: 'b_orange_mh',
    name: 'Nagpur Mandi Citrus Association',
    type: 'Orange City Mandi',
    location: 'Nagpur, Maharashtra',
    state: 'Maharashtra',
    distanceKm: 8.0,
    crop: 'orange',
    pricePerKg: 48.0,
    acceptedQtyKg: 15000,
    rating: 4.8,
    reviewsCount: 210,
    updatedAgo: '15 minutes ago',
    address: 'Kalamna Market Yard, Nagpur',
    phone: '+91 98231 77665',
    verified: true,
    otherCostsEst: 250
  },

  // --- GARLIC BUYERS (Spice/Veg) ---
  {
    id: 'b_garlic_mp',
    name: 'Neemuch Spice & Garlic Yard',
    type: 'Largest Garlic Mandi',
    location: 'Neemuch, Madhya Pradesh',
    state: 'Madhya Pradesh',
    distanceKm: 5.0,
    crop: 'garlic',
    pricePerKg: 145.0,
    acceptedQtyKg: 10000,
    rating: 4.9,
    reviewsCount: 270,
    updatedAgo: '10 minutes ago',
    address: 'Mandi Road, Neemuch',
    phone: '+91 98932 11009',
    verified: true,
    otherCostsEst: 400
  },

  // --- CARROT BUYERS ---
  {
    id: 'b_carrot_tn',
    name: 'Ooty Nilgiris Cold Supply',
    type: 'Hill Vegetable Hub',
    location: 'Ooty, Tamil Nadu',
    state: 'Tamil Nadu',
    distanceKm: 7.0,
    crop: 'carrot',
    pricePerKg: 36.5,
    acceptedQtyKg: 8000,
    rating: 4.8,
    reviewsCount: 95,
    updatedAgo: '20 minutes ago',
    address: 'Mettupalayam Gate, Ooty',
    phone: '+91 94435 88990',
    verified: true,
    otherCostsEst: 200
  },

  // --- CAPSICUM BUYERS ---
  {
    id: 'b_capsicum_ka',
    name: 'Bangalore Polyhouse Exporters',
    type: 'Exotic Vegetable Mart',
    location: 'Doddaballapur, Karnataka',
    state: 'Karnataka',
    distanceKm: 12.0,
    crop: 'capsicum',
    pricePerKg: 68.0,
    acceptedQtyKg: 4000,
    rating: 4.9,
    reviewsCount: 110,
    updatedAgo: '15 minutes ago',
    address: 'Greenhouse Zone 3, Bangalore Rural',
    phone: '+91 99002 44556',
    verified: true,
    otherCostsEst: 300
  }
];

// 7-Day Forecast Data for crops
const mockForecasts = {
  tomato: {
    cropName: 'Tomato', unit: 'kg', todayPrice: 28.0, targetPrice: 30.0, expectedChange: 2.0, variationPct: 7.14, trend: 'rising',
    recommendation: 'Prices expected to increase over the next 3-4 days due to supply shortages.',
    dailyData: [{ day: 'Today', price: 28.0 }, { day: 'Day 1', price: 28.5 }, { day: 'Day 2', price: 29.0 }, { day: 'Day 3', price: 29.8 }, { day: 'Day 4', price: 30.0 }, { day: 'Day 5', price: 29.5 }, { day: 'Day 6', price: 28.8 }, { day: 'Day 7', price: 28.2 }]
  },
  onion: {
    cropName: 'Onion', unit: 'kg', todayPrice: 24.0, targetPrice: 26.0, expectedChange: 2.0, variationPct: 8.33, trend: 'rising',
    recommendation: 'Onion demand is steadily rising across Maharashtra & MP mandis.',
    dailyData: [{ day: 'Today', price: 24.0 }, { day: 'Day 1', price: 24.2 }, { day: 'Day 2', price: 24.8 }, { day: 'Day 3', price: 25.4 }, { day: 'Day 4', price: 26.0 }, { day: 'Day 5', price: 25.8 }, { day: 'Day 6', price: 25.5 }, { day: 'Day 7', price: 25.0 }]
  },
  potato: {
    cropName: 'Potato', unit: 'kg', todayPrice: 20.0, targetPrice: 19.2, expectedChange: -0.8, variationPct: -4.00, trend: 'falling',
    recommendation: 'Heavy cold storage releases in UP and Bengal mandis. Selling immediately protects profit.',
    dailyData: [{ day: 'Today', price: 20.0 }, { day: 'Day 1', price: 19.8 }, { day: 'Day 2', price: 19.5 }, { day: 'Day 3', price: 19.2 }, { day: 'Day 4', price: 19.0 }, { day: 'Day 5', price: 18.8 }, { day: 'Day 6', price: 18.7 }, { day: 'Day 7', price: 18.5 }]
  },
  chilli: {
    cropName: 'Chilli (Green/Red)', unit: 'kg', todayPrice: 85.0, targetPrice: 97.5, expectedChange: 12.5, variationPct: 14.70, trend: 'rising',
    recommendation: 'High export demand in Guntur & Byadgi spice yards.',
    dailyData: [{ day: 'Today', price: 85.0 }, { day: 'Day 1', price: 87.0 }, { day: 'Day 2', price: 90.0 }, { day: 'Day 3', price: 93.5 }, { day: 'Day 4', price: 97.5 }, { day: 'Day 5', price: 96.0 }, { day: 'Day 6', price: 94.0 }, { day: 'Day 7', price: 92.5 }]
  },
  banana: {
    cropName: 'Banana (G9)', unit: 'kg', todayPrice: 18.0, targetPrice: 20.5, expectedChange: 2.5, variationPct: 13.88, trend: 'rising',
    recommendation: 'High institutional and festive demand in Tamil Nadu and Maharashtra.',
    dailyData: [{ day: 'Today', price: 18.0 }, { day: 'Day 1', price: 18.5 }, { day: 'Day 2', price: 19.0 }, { day: 'Day 3', price: 19.8 }, { day: 'Day 4', price: 20.5 }, { day: 'Day 5', price: 20.2 }, { day: 'Day 6', price: 19.8 }, { day: 'Day 7', price: 19.5 }]
  },
  mango: {
    cropName: 'Mango', unit: 'kg', todayPrice: 75.0, targetPrice: 84.0, expectedChange: 9.0, variationPct: 12.00, trend: 'rising',
    recommendation: 'Export orders picking up in AP & Maharashtra. Excellent price expected over the week.',
    dailyData: [{ day: 'Today', price: 75.0 }, { day: 'Day 1', price: 77.0 }, { day: 'Day 2', price: 80.0 }, { day: 'Day 3', price: 82.5 }, { day: 'Day 4', price: 84.0 }, { day: 'Day 5', price: 83.0 }, { day: 'Day 6', price: 81.0 }, { day: 'Day 7', price: 79.0 }]
  },
  apple: {
    cropName: 'Apple', unit: 'kg', todayPrice: 110.0, targetPrice: 122.0, expectedChange: 12.0, variationPct: 10.90, trend: 'rising',
    recommendation: 'Premium grade harvest in Shimla mandis seeing high buyer competition.',
    dailyData: [{ day: 'Today', price: 110.0 }, { day: 'Day 1', price: 112.0 }, { day: 'Day 2', price: 115.0 }, { day: 'Day 3', price: 119.0 }, { day: 'Day 4', price: 122.0 }, { day: 'Day 5', price: 120.0 }, { day: 'Day 6', price: 118.0 }, { day: 'Day 7', price: 116.0 }]
  },
  garlic: {
    cropName: 'Garlic', unit: 'kg', todayPrice: 140.0, targetPrice: 155.0, expectedChange: 15.0, variationPct: 10.71, trend: 'rising',
    recommendation: 'Neemuch & MP spice mandis reporting strong buyer bidding. Consider holding.',
    dailyData: [{ day: 'Today', price: 140.0 }, { day: 'Day 1', price: 142.0 }, { day: 'Day 2', price: 146.0 }, { day: 'Day 3', price: 150.0 }, { day: 'Day 4', price: 155.0 }, { day: 'Day 5', price: 153.0 }, { day: 'Day 6', price: 150.0 }, { day: 'Day 7', price: 148.0 }]
  },
  watermelon: {
    cropName: 'Watermelon', unit: 'kg', todayPrice: 15.0, targetPrice: 14.2, expectedChange: -0.8, variationPct: -5.33, trend: 'falling',
    recommendation: 'High summer crop arrivals in Tamil Nadu & AP. Selling early is recommended.',
    dailyData: [{ day: 'Today', price: 15.0 }, { day: 'Day 1', price: 14.8 }, { day: 'Day 2', price: 14.5 }, { day: 'Day 3', price: 14.2 }, { day: 'Day 4', price: 14.0 }, { day: 'Day 5', price: 13.8 }, { day: 'Day 6', price: 13.7 }, { day: 'Day 7', price: 13.5 }]
  },
  grapes: {
    cropName: 'Grapes', unit: 'kg', todayPrice: 90.0, targetPrice: 98.0, expectedChange: 8.0, variationPct: 8.88, trend: 'rising',
    recommendation: 'Nashik cold chain export quality demand is high. Price trend is upward.',
    dailyData: [{ day: 'Today', price: 90.0 }, { day: 'Day 1', price: 92.0 }, { day: 'Day 2', price: 94.0 }, { day: 'Day 3', price: 96.5 }, { day: 'Day 4', price: 98.0 }, { day: 'Day 5', price: 97.0 }, { day: 'Day 6', price: 95.0 }, { day: 'Day 7', price: 93.0 }]
  },
  cabbage: {
    cropName: 'Cabbage', unit: 'kg', todayPrice: 16.0, targetPrice: 16.2, expectedChange: 0.2, variationPct: 1.25, trend: 'stable',
    recommendation: 'Market supply and demand are balanced across Bengal and Maharashtra.',
    dailyData: [{ day: 'Today', price: 16.0 }, { day: 'Day 1', price: 16.0 }, { day: 'Day 2', price: 16.1 }, { day: 'Day 3', price: 16.2 }, { day: 'Day 4', price: 16.2 }, { day: 'Day 5', price: 16.1 }, { day: 'Day 6', price: 16.0 }, { day: 'Day 7', price: 15.9 }]
  },
  brinjal: {
    cropName: 'Brinjal', unit: 'kg', todayPrice: 32.0, targetPrice: 34.5, expectedChange: 2.5, variationPct: 7.81, trend: 'rising',
    recommendation: 'Moderate price rise predicted in UP and Karnataka markets.',
    dailyData: [{ day: 'Today', price: 32.0 }, { day: 'Day 1', price: 32.5 }, { day: 'Day 2', price: 33.2 }, { day: 'Day 3', price: 34.0 }, { day: 'Day 4', price: 34.5 }, { day: 'Day 5', price: 34.0 }, { day: 'Day 6', price: 33.5 }, { day: 'Day 7', price: 33.0 }]
  },
  cucumber: {
    cropName: 'Cucumber', unit: 'kg', todayPrice: 22.0, targetPrice: 21.0, expectedChange: -1.0, variationPct: -4.54, trend: 'falling',
    recommendation: 'Polyhouse harvests in Haryana & Rajasthan increasing supply.',
    dailyData: [{ day: 'Today', price: 22.0 }, { day: 'Day 1', price: 21.8 }, { day: 'Day 2', price: 21.5 }, { day: 'Day 3', price: 21.2 }, { day: 'Day 4', price: 21.0 }, { day: 'Day 5', price: 20.8 }, { day: 'Day 6', price: 20.6 }, { day: 'Day 7', price: 20.5 }]
  },
  carrot: {
    cropName: 'Carrot', unit: 'kg', todayPrice: 35.0, targetPrice: 38.0, expectedChange: 3.0, variationPct: 8.57, trend: 'rising',
    recommendation: 'Nilgiris and cold climate crop in high demand across South markets.',
    dailyData: [{ day: 'Today', price: 35.0 }, { day: 'Day 1', price: 35.5 }, { day: 'Day 2', price: 36.5 }, { day: 'Day 3', price: 37.5 }, { day: 'Day 4', price: 38.0 }, { day: 'Day 5', price: 37.5 }, { day: 'Day 6', price: 36.8 }, { day: 'Day 7', price: 36.0 }]
  },
  capsicum: {
    cropName: 'Capsicum', unit: 'kg', todayPrice: 65.0, targetPrice: 72.0, expectedChange: 7.0, variationPct: 10.76, trend: 'rising',
    recommendation: 'High-value polyhouse capsicum demand is strong in urban retail hubs.',
    dailyData: [{ day: 'Today', price: 65.0 }, { day: 'Day 1', price: 66.5 }, { day: 'Day 2', price: 68.5 }, { day: 'Day 3', price: 70.5 }, { day: 'Day 4', price: 72.0 }, { day: 'Day 5', price: 71.0 }, { day: 'Day 6', price: 69.5 }, { day: 'Day 7', price: 68.0 }]
  },
  orange: {
    cropName: 'Orange', unit: 'kg', todayPrice: 45.0, targetPrice: 49.5, expectedChange: 4.5, variationPct: 10.00, trend: 'rising',
    recommendation: 'Nagpur citrus harvest seeing strong buyer bidding from processing hubs.',
    dailyData: [{ day: 'Today', price: 45.0 }, { day: 'Day 1', price: 46.0 }, { day: 'Day 2', price: 47.2 }, { day: 'Day 3', price: 48.5 }, { day: 'Day 4', price: 49.5 }, { day: 'Day 5', price: 49.0 }, { day: 'Day 6', price: 48.0 }, { day: 'Day 7', price: 47.0 }]
  }
};

// Initial Chat Conversations with buyers
const mockInitialChats = {
  b1: [
    { sender: 'buyer', time: '10:30 AM', text: 'Hello! Welcome to ABC Fresh Traders (Kolar). What produce do you have available today?' },
    { sender: 'farmer', time: '10:32 AM', text: 'Hello, I have 500 kg of fresh Tomatoes ready for harvesting.' },
    { sender: 'buyer', time: '10:34 AM', text: 'Great! Our current offer for grade-A tomatoes is ₹28/kg. We can accept up to 2000 kg today.' },
    { sender: 'farmer', time: '10:35 AM', text: 'Can you confirm pickup from my farm or should I transport it?' },
    { sender: 'buyer', time: '10:36 AM', text: 'If you bring it to our yard (4.8 km away), we offer immediate cash/UPI payment with minimum waiting time!' }
  ],
  b_banana_tn: [
    { sender: 'buyer', time: '09:15 AM', text: 'Trichy Banana Traders Desk active. Current G9 Banana rate ₹19.50/kg.' },
    { sender: 'farmer', time: '09:20 AM', text: 'We have 1500 kg Cavendish bananas ready for cutting.' },
    { sender: 'buyer', time: '09:22 AM', text: 'We can arrange truck pickup directly from your farm gate!' }
  ]
};

// Initial Selling Requests submitted by farmers
const mockSellingRequests = [
  {
    id: 'req_101',
    farmerName: 'Ramesh Kumar (Karnataka)',
    farmerPhone: '+91 94801 22334',
    buyerId: 'b1',
    buyerName: 'ABC Fresh Traders',
    crop: 'Tomato',
    cropId: 'tomato',
    quantityKg: 500,
    offeredPricePerKg: 28.0,
    grossValue: 14000,
    transportEstimate: 800,
    netProfitEstimate: 13000,
    location: 'Kolar Rural Farm, Karnataka',
    status: 'Pending',
    timestamp: 'Today, 11:15 AM'
  },
  {
    id: 'req_102',
    farmerName: 'Muthuvel (Tamil Nadu)',
    farmerPhone: '+91 94433 11223',
    buyerId: 'b_banana_tn',
    buyerName: 'Trichy Banana Traders Association',
    crop: 'Banana (G9)',
    cropId: 'banana',
    quantityKg: 1500,
    offeredPricePerKg: 19.5,
    grossValue: 29250,
    transportEstimate: 1200,
    netProfitEstimate: 27850,
    location: 'Trichy Farm Belt, Tamil Nadu',
    status: 'Accepted',
    timestamp: 'Yesterday, 04:30 PM'
  }
];

// Active buyer listings (for Buyer Dashboard view)
const mockBuyerOffers = [
  { id: 'bo_1', cropId: 'tomato', cropName: 'Tomato 🍅', pricePerKg: 28.0, maxQtyKg: 2000, status: 'Active' },
  { id: 'bo_2', cropId: 'banana', cropName: 'Banana 🍌', pricePerKg: 19.5, maxQtyKg: 10000, status: 'Active' },
  { id: 'bo_3', cropId: 'mango', cropName: 'Mango 🥭', pricePerKg: 78.0, maxQtyKg: 5000, status: 'Active' },
  { id: 'bo_4', cropId: 'grapes', cropName: 'Grapes 🍇', pricePerKg: 94.0, maxQtyKg: 8000, status: 'Active' },
  { id: 'bo_5', cropId: 'apple', cropName: 'Apple 🍎', pricePerKg: 115.0, maxQtyKg: 12000, status: 'Active' },
  { id: 'bo_6', cropId: 'garlic', cropName: 'Garlic 🧄', pricePerKg: 145.0, maxQtyKg: 6000, status: 'Active' }
];
