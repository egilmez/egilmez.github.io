// öGuide — Placeholder Data
// Replace this with API calls when backend is ready.

const OGuideData = {

  cities: [
    {
      id: 'new-york',
      name: 'New York',
      tagline: 'The city that never stops surprising',
      heroImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=900&q=80'
    },
    {
      id: 'san-francisco',
      name: 'San Francisco',
      tagline: 'Fog, hills, and extraordinary flavour',
      heroImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=900&q=80'
    },
    {
      id: 'chicago',
      name: 'Chicago',
      tagline: 'Bold, architectural, and deeply delicious',
      heroImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80'
    },
    {
      id: 'new-orleans',
      name: 'New Orleans',
      tagline: 'Where every meal is a celebration',
      heroImage: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=900&q=80'
    }
  ],

  categories: [
    { id: 'restaurant', label: 'Restaurants', icon: '◈' },
    { id: 'bar',        label: 'Bars',         icon: '◇' },
    { id: 'cocktail-bar', label: 'Cocktail Bars', icon: '◆' },
    { id: 'cafe',       label: 'Cafés',        icon: '○' },
    { id: 'hotel',      label: 'Hotels',       icon: '□' },
    { id: 'bakery',     label: 'Bakeries',     icon: '△' }
  ],

  // Scoring: 0–30 scale (Zagat-style).
  // Three criteria — rename these when the real names are decided.
  criteriaLabels: {
    c1: 'Food',
    c2: 'Service',
    c3: 'Ambiance'
  },

  businesses: [
    {
      id: 1,
      name: 'Le Bernardin',
      category: 'restaurant',
      city: 'new-york',
      neighborhood: 'Midtown',
      address: '155 W 51st St, New York, NY 10019',
      phone: '+1 (212) 554-1515',
      website: '#',
      hours: 'Mon–Fri 12–2:30 pm, 5:30–10:30 pm',
      cuisine: 'French Seafood',
      priceRange: '$$$$',
      heroImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
      featured: true,
      description: 'The gold standard of French seafood in Manhattan. Chef Eric Ripert\'s temple to the ocean delivers breathtaking precision with every plate — the barely-cooked fish, the ethereal broths, the sheer restraint of each composition. As close to perfect as dining gets in this city.',
      score: { c1: 28, c2: 27, c3: 26, overall: 27 },
      reviews: [
        {
          id: 1,
          author: 'M. Dubois',
          date: 'Jan 2026',
          score: { c1: 29, c2: 27, c3: 27 },
          text: 'The dover sole arrived as a revelation — barely touched by heat, dressed in a beurre blanc that tasted like the sea itself. Service was impeccable without a single false step across four hours.'
        },
        {
          id: 2,
          author: 'R. Chen',
          date: 'Dec 2025',
          score: { c1: 28, c2: 26, c3: 25 },
          text: 'Three visits, three perfect meals. The room is perhaps a touch corporate, but the moment the first course arrives, nothing else matters. The tuna carpaccio remains my benchmark.'
        }
      ]
    },
    {
      id: 2,
      name: 'Gramercy Tavern',
      category: 'restaurant',
      city: 'new-york',
      neighborhood: 'Gramercy',
      address: '42 E 20th St, New York, NY 10003',
      phone: '+1 (212) 477-0777',
      website: '#',
      hours: 'Mon–Thu 12–2 pm, 5:30–10 pm; Fri–Sun 12–3 pm, 5:30–11 pm',
      cuisine: 'American Seasonal',
      priceRange: '$$$',
      heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
      featured: true,
      description: 'The great American tavern, three decades on and still setting the standard. The seasonal menu shifts with a farmer\'s-market devotion, the front bar is open all day, and the service feels genuinely warm rather than trained to seem so.',
      score: { c1: 26, c2: 27, c3: 25, overall: 26 },
      reviews: [
        {
          id: 1,
          author: 'S. Okafor',
          date: 'Feb 2026',
          score: { c1: 27, c2: 28, c3: 24 },
          text: 'The roasted beet dish changed my mind about beets entirely. Hospitality here is a masterclass — never hovering, always present. One of the best lunch experiences in New York.'
        },
        {
          id: 2,
          author: 'L. Pérez',
          date: 'Nov 2025',
          score: { c1: 25, c2: 26, c3: 25 },
          text: 'Solid, seasonal, and deeply comforting. The tavern room has a warmth that few restaurants manage to sustain after the first five years, let alone thirty.'
        }
      ]
    },
    {
      id: 3,
      name: 'Employees Only',
      category: 'cocktail-bar',
      city: 'new-york',
      neighborhood: 'West Village',
      address: '510 Hudson St, New York, NY 10014',
      phone: '+1 (212) 242-3021',
      website: '#',
      hours: 'Daily 6 pm–3:30 am',
      cuisine: 'Craft Cocktails',
      priceRange: '$$$',
      heroImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80',
      featured: true,
      description: 'The bar that helped define the modern cocktail revival. The speakeasy entrance still feels like a secret, the barmen still wear suspenders, and the drinks — particularly anything built on gin — remain the best in the West Village.',
      score: { c1: 24, c2: 25, c3: 26, overall: 25 },
      reviews: [
        {
          id: 1,
          author: 'T. Nakamura',
          date: 'Mar 2026',
          score: { c1: 25, c2: 24, c3: 27 },
          text: 'The gin-gin mule was everything the recipe promised. The room buzzes with exactly the right kind of energy — lively enough to feel alive, quiet enough to hold a proper conversation.'
        }
      ]
    },
    {
      id: 4,
      name: 'The NoMad Bar',
      category: 'bar',
      city: 'new-york',
      neighborhood: 'NoMad',
      address: '1170 Broadway, New York, NY 10001',
      phone: '+1 (212) 796-1500',
      website: '#',
      hours: 'Daily 3 pm–1 am',
      cuisine: 'Bar Food & Cocktails',
      priceRange: '$$$',
      heroImage: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200&q=80',
      featured: false,
      description: 'Hotel bar done right. The library setting lends intellectual atmosphere and the cocktail list rewards patience — order the Paper Plane and settle in. The bar snacks outshine many full restaurants.',
      score: { c1: 22, c2: 24, c3: 25, overall: 24 },
      reviews: [
        {
          id: 1,
          author: 'A. Williams',
          date: 'Jan 2026',
          score: { c1: 21, c2: 24, c3: 26 },
          text: 'The room is the thing. Bookshelves, leather, and low light — the ideal setting for a Paper Plane and an unhurried evening. The lamb merguez snack was an unexpected star.'
        }
      ]
    },
    {
      id: 5,
      name: 'Zuni Café',
      category: 'restaurant',
      city: 'san-francisco',
      neighborhood: 'Hayes Valley',
      address: '1658 Market St, San Francisco, CA 94102',
      phone: '+1 (415) 552-2522',
      website: '#',
      hours: 'Tue–Thu 11:30 am–11 pm; Fri–Sat 11:30 am–midnight; Sun 11 am–11 pm',
      cuisine: 'California Mediterranean',
      priceRange: '$$$',
      heroImage: 'https://images.unsplash.com/photo-1550966871-3ed3cfd86b1f?w=1200&q=80',
      featured: true,
      description: 'The roast chicken for two — brined for 24 hours, roasted in a wood-burning oven, served on a bread salad — is one of California cuisine\'s defining dishes. Built around that fireplace and Judy Rodgers\'s enduring vision, Zuni remains essential.',
      score: { c1: 26, c2: 23, c3: 24, overall: 24 },
      reviews: [
        {
          id: 1,
          author: 'P. Larsen',
          date: 'Feb 2026',
          score: { c1: 27, c2: 23, c3: 25 },
          text: 'The chicken lived up to every word written about it. The wait was long and the service stretched thin on a Friday night, but I would not have traded a single moment of that meal.'
        },
        {
          id: 2,
          author: 'C. Bianchi',
          date: 'Oct 2025',
          score: { c1: 25, c2: 22, c3: 23 },
          text: 'Wonderful Caesar, extraordinary chicken, forgettable service. The room has great bones — zinc bar, wood beams, afternoon light. Still very much worth the trip.'
        }
      ]
    },
    {
      id: 6,
      name: 'Vesuvio Café',
      category: 'bar',
      city: 'san-francisco',
      neighborhood: 'North Beach',
      address: '255 Columbus Ave, San Francisco, CA 94133',
      phone: '+1 (415) 362-3370',
      website: '#',
      hours: 'Daily 6 am–2 am',
      cuisine: 'Historic Bar',
      priceRange: '$$',
      heroImage: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1200&q=80',
      featured: false,
      description: 'Kerouac drank here. The Beats made this corner their own, and something of that spirit — romantic, literary, generously poured — still hangs in the air. The upstairs window seat overlooking Columbus Avenue is worth the trip alone.',
      score: { c1: 18, c2: 20, c3: 26, overall: 22 },
      reviews: [
        {
          id: 1,
          author: 'D. Kim',
          date: 'Nov 2025',
          score: { c1: 16, c2: 19, c3: 28 },
          text: 'You don\'t come for the food. You come for the window, the walls, the ghosts. The house wine is perfectly rough. A great San Francisco experience regardless of the drink quality.'
        }
      ]
    },
    {
      id: 7,
      name: 'Alinea',
      category: 'restaurant',
      city: 'chicago',
      neighborhood: 'Lincoln Park',
      address: '1723 N Halsted St, Chicago, IL 60614',
      phone: '+1 (312) 867-0110',
      website: '#',
      hours: 'Wed–Sun from 5 pm (seatings vary)',
      cuisine: 'Progressive American',
      priceRange: '$$$$',
      heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80',
      featured: true,
      description: 'Grant Achatz\'s perpetual reinvention of what a meal can be. Not a restaurant in the conventional sense — a performance, a puzzle, a generous assault on expectation. The kitchen operates at a remove from reality that somehow still feels warm and deeply human.',
      score: { c1: 29, c2: 28, c3: 29, overall: 29 },
      reviews: [
        {
          id: 1,
          author: 'H. Johansson',
          date: 'Jan 2026',
          score: { c1: 30, c2: 28, c3: 29 },
          text: 'Fourteen courses and I remember every one. The helium balloon dessert is theatre, but it\'s backed by technical mastery that earns every moment of wonder. The highest dining I have experienced in America.'
        },
        {
          id: 2,
          author: 'F. Moreau',
          date: 'Dec 2025',
          score: { c1: 29, c2: 27, c3: 29 },
          text: 'An almost overwhelming experience — by the end I was moved in a way restaurants rarely manage. The team remembers every detail you mentioned at the outset. Absolutely worth the advance planning required.'
        }
      ]
    },
    {
      id: 8,
      name: 'The Aviary',
      category: 'cocktail-bar',
      city: 'chicago',
      neighborhood: 'Fulton Market',
      address: '955 W Fulton Market, Chicago, IL 60607',
      phone: '+1 (312) 226-0868',
      website: '#',
      hours: 'Wed–Sun 5 pm–midnight',
      cuisine: 'Culinary Cocktails',
      priceRange: '$$$$',
      heroImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=80',
      featured: false,
      description: 'The cocktail bar as Alinea\'s sibling — and it lives up to that billing. Drinks arrive in custom glassware as individually engineered as any dish next door. The In the Rocks cocktail (frozen sphere, spirit poured in at the table) is simply genius.',
      score: { c1: 27, c2: 26, c3: 27, overall: 27 },
      reviews: [
        {
          id: 1,
          author: 'Y. Tanaka',
          date: 'Feb 2026',
          score: { c1: 28, c2: 25, c3: 28 },
          text: 'The "In the Rocks" arrives as a frozen sphere. You watch it melt. You drink a perfect Negroni. The presentation never overwhelms the flavour — that\'s the trick they pull off here.'
        }
      ]
    },
    {
      id: 9,
      name: "Galatoire's",
      category: 'restaurant',
      city: 'new-orleans',
      neighborhood: 'French Quarter',
      address: '209 Bourbon St, New Orleans, LA 70130',
      phone: '+1 (504) 525-2021',
      website: '#',
      hours: 'Tue–Sun 11:30 am–10 pm',
      cuisine: 'French Creole',
      priceRange: '$$$',
      heroImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
      featured: false,
      description: 'Since 1905, this Bourbon Street institution has served Creole French cooking with a ritual devotion that feels more like family than restaurant. Friday lunch is a New Orleans rite of passage — order the trout meunière amandine and understand everything.',
      score: { c1: 25, c2: 24, c3: 26, overall: 25 },
      reviews: [
        {
          id: 1,
          author: 'B. Tran',
          date: 'Jan 2026',
          score: { c1: 26, c2: 24, c3: 26 },
          text: 'Friday lunch at Galatoire\'s is New Orleans at its most itself. The trout meunière was perfect. The regulars at the next table have clearly been coming since 1982. Worth every penny of the Friday surcharge.'
        }
      ]
    },
    {
      id: 10,
      name: 'Cure',
      category: 'cocktail-bar',
      city: 'new-orleans',
      neighborhood: 'Freret',
      address: '4905 Freret St, New Orleans, LA 70115',
      phone: '+1 (504) 302-2357',
      website: '#',
      hours: 'Mon–Thu 5 pm–midnight; Fri–Sat 5 pm–1 am',
      cuisine: 'Craft Cocktails',
      priceRange: '$$$',
      heroImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=80',
      featured: true,
      description: 'The bar that put Freret Street on the map and helped write the grammar for the modern New Orleans cocktail bar. Studiously sourced spirits, seasonal syrups made in-house, and a room that manages to feel both sophisticated and completely relaxed.',
      score: { c1: 26, c2: 25, c3: 27, overall: 26 },
      reviews: [
        {
          id: 1,
          author: 'O. García',
          date: 'Mar 2026',
          score: { c1: 27, c2: 25, c3: 27 },
          text: 'Opened with a Ramos Gin Fizz — made correctly, with the full eight-minute shake. The bar team here takes the craft seriously without any of the self-importance. Exceptional neighbourhood bar by any measure.'
        },
        {
          id: 2,
          author: 'N. Hoffman',
          date: 'Dec 2025',
          score: { c1: 25, c2: 26, c3: 27 },
          text: 'Every drink we ordered was better than the last. The room is warm, dark, and exactly right. One of the best cocktail bar experiences in the South.'
        }
      ]
    }
  ]

};

// ─── Utility helpers ────────────────────────────────────────────────

/**
 * Returns a score tier class for styling: 'score--high', 'score--mid', 'score--low'
 */
function scoreClass(n) {
  if (n >= 25) return 'score--high';
  if (n >= 18) return 'score--mid';
  return 'score--low';
}

/**
 * Returns HTML for a score badge.
 * size: '' | 'sm' | 'lg'
 */
function scoreBadge(n, size = '') {
  const cls = scoreClass(n);
  const sizeCls = size ? ` score-badge--${size}` : '';
  return `<span class="score-badge ${cls}${sizeCls}">${n}</span>`;
}

/**
 * Returns price range HTML with active $ styling.
 */
function priceDisplay(range) {
  return `<span class="price-range">${range}</span>`;
}

/**
 * Renders a business card element (returns HTML string).
 * mode: 'grid' | 'list'
 */
function renderBusinessCard(b, mode = 'grid') {
  const city = OGuideData.cities.find(c => c.id === b.city);
  const cat  = OGuideData.categories.find(c => c.id === b.category);
  return `
    <a class="business-card business-card--${mode}" href="business.html?id=${b.id}">
      <div class="business-card__img-wrap">
        <img src="${b.heroImage}" alt="${b.name}" loading="lazy">
        <span class="business-card__tag">${cat ? cat.label : b.category}</span>
      </div>
      <div class="business-card__body">
        <div class="business-card__meta">
          <span class="business-card__city">${city ? city.name : b.city} · ${b.neighborhood}</span>
          ${priceDisplay(b.priceRange)}
        </div>
        <h3 class="business-card__name">${b.name}</h3>
        <p class="business-card__desc">${b.description.slice(0, 100)}…</p>
        <div class="business-card__footer">
          ${scoreBadge(b.score.overall)}
          <span class="business-card__score-label">Overall</span>
          <span class="business-card__arrow">→</span>
        </div>
      </div>
    </a>
  `;
}

/**
 * Reads a query param from the current URL.
 */
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key) || '';
}
