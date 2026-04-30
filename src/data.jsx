// Mock data for the trip summary
const MOCK = {
  guest: {
    name: "Vanessa",
    pastGuestNum: "00998877",
    travelers: 4,
  },
  cruise: {
    title: "7 Night Western Caribbean Cruise",
    line: "Royal Caribbean",
    ship: "Serenade of the Seas",
    lineCode: "RC",
    lineColor: "#1c0f44",
    depart: { port: "Miami, Florida", date: "Fri, Jun 12, 2026" },
    returnT: { port: "Miami, Florida", date: "Fri, Jun 19, 2026" },
    cabin: "Balcony Cabin 11A",
    cabinDesc: "Deck 7 · Ocean View Balcony",
    ports: [
      "Nassau, Bahamas",
      "CocoCay, Bahamas",
      "Cozumel, Mexico",
      "George Town, Cayman",
      "Labadee, Haiti",
    ],
    promos: [
      { label: "Savings:", text: "Up to 25% instant savings — details" },
      { label: "Member deal:", text: "AAA/CAA Vacations Member Deal — Bottle of wine + plate of six chocolates" },
      { label: "Bundle:", text: "Buy One Get One 60% OFF + Kids Sail Free (non-refundable deposit)" },
    ],
    basePrice: 2890,
    taxes: 272,
    depositPct: 0.25,
    finalPaymentDate: "2026-10-14",
    images: {
      ship: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1400&q=80",
      beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
      palms: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
      cabin: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      thumb: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
    },
  },
  insurance: {
    title: "Travel Protection Plus",
    desc: "Trip cancellation, interruption, and medical coverage up to $100,000 per traveler.",
    pricePer: 89,
  },
  addons: [
    { id: "drinks",  icon: "Wine",     title: "Deluxe Beverage Package",   desc: "Unlimited premium cocktails, wine, beer & specialty coffees.",   price: 399, unit: "per guest" },
    { id: "wifi",    icon: "Wifi",     title: "VOOM Surf + Stream",        desc: "Fast Wi-Fi for 1 device in every port and at sea.",              price: 129, unit: "per guest" },
    { id: "dining",  icon: "Utensils", title: "Specialty Dining Package",  desc: "3 nights at any specialty restaurant — a 45% savings.",          price: 149, unit: "per guest" },
    { id: "photos",  icon: "Camera",   title: "Digital Photo Package",     desc: "Unlimited digital photos taken by onboard photographers.",        price: 199, unit: "per cabin" },
    { id: "excurs",  icon: "Anchor",   title: "Shore Excursion Credit",    desc: "$50 credit toward any shore excursion you book onboard.",        price: 50,  unit: "per guest" },
    { id: "gifts",   icon: "Gift",     title: "Celebration Package",       desc: "Cake, chocolate-dipped strawberries, and champagne in the cabin.", price: 79, unit: "per cabin" },
  ],
  pretravel: {
    hotel: {
      pre: [
        { id: "h-pre-1", name: "Marriott Miami Airport",       stars: 4, dist: "0.3 mi from MIA",         price: 219, perks: ["Free shuttle to port", "Breakfast included"] },
        { id: "h-pre-2", name: "InterContinental Miami",       stars: 5, dist: "Downtown · Bayfront",     price: 389, perks: ["Bay view", "Walk to PortMiami"] },
        { id: "h-pre-3", name: "Hampton Inn Coconut Grove",    stars: 3, dist: "5 mi from port",          price: 159, perks: ["Pool", "Free WiFi"] },
      ],
      post: [
        { id: "h-post-1", name: "Loews Miami Beach",           stars: 5, dist: "South Beach",             price: 459, perks: ["Beachfront", "Spa access"] },
        { id: "h-post-2", name: "Kimpton EPIC Miami",          stars: 4, dist: "Brickell",                price: 319, perks: ["Rooftop pool", "Walk to nightlife"] },
        { id: "h-post-3", name: "Hilton Miami Airport Blue Lagoon", stars: 4, dist: "Near MIA",          price: 189, perks: ["Free port shuttle", "Late checkout"] },
      ],
    },
    flight: {
      out: [
        { id: "f-out-1", airline: "Delta",        flightNo: "DL 1438", times: "8:45 AM → 12:10 PM", stops: "Nonstop",   price: 312 },
        { id: "f-out-2", airline: "American",     flightNo: "AA 2201", times: "11:20 AM → 2:55 PM", stops: "Nonstop",   price: 298 },
        { id: "f-out-3", airline: "JetBlue",      flightNo: "B6 411",  times: "6:15 AM → 11:42 AM", stops: "1 stop · CLT", price: 234 },
      ],
      back: [
        { id: "f-back-1", airline: "Delta",       flightNo: "DL 1539", times: "4:20 PM → 7:48 PM",  stops: "Nonstop",   price: 332 },
        { id: "f-back-2", airline: "American",    flightNo: "AA 1842", times: "1:15 PM → 4:40 PM",  stops: "Nonstop",   price: 318 },
        { id: "f-back-3", airline: "Spirit",      flightNo: "NK 246",  times: "9:55 PM → 2:30 AM",  stops: "Nonstop",   price: 189 },
      ],
    },
    transfer: {
      pre:  [
        { id: "t-pre-shared",  type: "Shared shuttle",  desc: "MIA → PortMiami · ~45 min",  price: 29,  unit: "per guest" },
        { id: "t-pre-private", type: "Private sedan",   desc: "MIA → PortMiami · 25 min",   price: 119, unit: "per cabin" },
        { id: "t-pre-luxury",  type: "Luxury SUV",      desc: "MIA → PortMiami · 25 min",   price: 189, unit: "per cabin" },
      ],
      post: [
        { id: "t-post-shared",  type: "Shared shuttle",  desc: "PortMiami → MIA · ~45 min", price: 29,  unit: "per guest" },
        { id: "t-post-private", type: "Private sedan",   desc: "PortMiami → MIA · 25 min",  price: 119, unit: "per cabin" },
        { id: "t-post-luxury",  type: "Luxury SUV",      desc: "PortMiami → MIA · 25 min",  price: 189, unit: "per cabin" },
      ],
    },
  },
  diningOptions: ["", "Early seating (5:30 PM)", "Late seating (8:00 PM)", "My Time Dining (flexible)"],
  bedOptions: ["", "King bed (pushed together)", "Two twin beds"],
  dietOptions: ["No preference", "Vegetarian", "Vegan", "Gluten-free", "Kosher", "Halal"],
  cabinReqOptions: ["No preference", "Higher deck", "Quiet area", "Mid-ship (less motion)", "Near elevators"],
  occasionOptions: ["None", "Anniversary", "Birthday", "Honeymoon", "Family reunion"],
  states: ["", "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"],
};

function computeTotals({ base, travelers, insurance, addons, pretravel }) {
  const cruiseSub = base;
  const taxes = Math.round(base * 0.094);
  const insTotal = insurance ? insurance.pricePer * travelers : 0;
  const addonTotal = (addons || []).filter(a => a.on).reduce((s, a) => {
    const mult = a.unit === "per guest" ? travelers : 1;
    return s + a.price * mult;
  }, 0);

  // Pre/post travel: hotels (per-night × 1), flights (per-guest), transfers (per-guest or per-cabin)
  let preTravelTotal = 0;
  if (pretravel) {
    const { hotelPre, hotelPost, flightOut, flightBack, transferPre, transferPost } = pretravel;
    if (hotelPre)    preTravelTotal += hotelPre.price * (pretravel.hotelPreNights || 1);
    if (hotelPost)   preTravelTotal += hotelPost.price * (pretravel.hotelPostNights || 1);
    if (flightOut)   preTravelTotal += flightOut.price * travelers;
    if (flightBack)  preTravelTotal += flightBack.price * travelers;
    if (transferPre) {
      const m = transferPre.unit === "per guest" ? travelers : 1;
      preTravelTotal += transferPre.price * m;
    }
    if (transferPost) {
      const m = transferPost.unit === "per guest" ? travelers : 1;
      preTravelTotal += transferPost.price * m;
    }
  }

  const total = cruiseSub + taxes + insTotal + addonTotal + preTravelTotal;
  const deposit = Math.round(total * 0.25);
  const remaining = total - deposit;
  return { cruiseSub, taxes, insTotal, addonTotal, preTravelTotal, total, deposit, remaining };
}

const fmt = (n) => "$" + Math.round(n).toLocaleString();
const fmtDate = (iso) => {
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

window.MOCK = MOCK;
window.computeTotals = computeTotals;
window.fmt = fmt;
window.fmtDate = fmtDate;
