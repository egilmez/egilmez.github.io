// ø̈Guide — Data
// The irreplaceable places.

const OGuideData = {

  cities: [
    {
      id: 'new-york',
      name: 'New York',
      tagline: 'Twelve million opinions, a handful of certainties'
    },
    {
      id: 'san-francisco',
      name: 'San Francisco',
      tagline: 'The city that keeps rewriting itself'
    },
    {
      id: 'chicago',
      name: 'Chicago',
      tagline: 'Built to last, if you let it'
    },
    {
      id: 'new-orleans',
      name: 'New Orleans',
      tagline: 'The only American city that feels inevitable'
    }
  ],

  categories: [
    { id: 'restaurant',    label: 'Restaurants' },
    { id: 'bar',           label: 'Bars' },
    { id: 'cafe',          label: 'Cafes' },
    { id: 'bookshop',      label: 'Bookshops' },
    { id: 'corner-store',  label: 'Corner Stores' },
    { id: 'barbershop',    label: 'Barbershops' }
  ],

  businesses: [
    {
      id: 1,
      name: 'Strand Bookstore',
      category: 'bookshop',
      city: 'new-york',
      neighborhood: 'East Village',
      address: '828 Broadway, New York, NY 10003',
      phone: '+1 (212) 473-1452',
      website: '#',
      hours: 'Daily 10 am - 10 pm',
      type: 'Independent Bookstore',
      priceRange: '$$',
      since: 1927,
      featured: true,
      description: '18 miles of books and nearly a century of stubbornness against Manhattan real estate. If the Strand closes, the city loses a piece of its spine.',
      writeup: 'The Strand has been fighting to exist since 1927. That fight — against rising rents, against chain stores, against the general indifference of a city that eats its own landmarks — is part of what makes it irreplaceable. You can buy books anywhere. You cannot walk into a place where the dollar carts out front contain better literature than most curated shelves, where the staff recommendations are genuinely unhinged in the best way, where every floor smells like dust and ambition. The Strand is not a store. It is a public utility that happens to charge for its services.'
    },
    {
      id: 2,
      name: 'Economy Candy',
      category: 'corner-store',
      city: 'new-york',
      neighborhood: 'Lower East Side',
      address: '108 Rivington St, New York, NY 10002',
      phone: '+1 (212) 254-1531',
      website: '#',
      hours: 'Mon-Sat 9 am - 6 pm, Sun 10 am - 5 pm',
      type: 'Candy & Dry Goods',
      priceRange: '$',
      since: 1937,
      featured: true,
      description: 'A Lower East Side candy shop that has survived every wave of gentrification since 1937. The neighbourhood needs this more than another juice bar.',
      writeup: 'Economy Candy looks exactly like it did decades ago, which is to say: overwhelming. Floor-to-ceiling bins of every candy you remember and dozens you have never seen. The Cohens have run it since the beginning — through the Depression, through white flight, through the transformation of the LES from tenement blocks to boutique hotels. It costs almost nothing to walk in and feel like a kid. That is an increasingly rare service in a city that charges fifteen dollars for a smoothie. Economy Candy is proof that not everything old has to become something new to survive.'
    },
    {
      id: 3,
      name: "Sunny's Bar",
      category: 'bar',
      city: 'new-york',
      neighborhood: 'Red Hook',
      address: '253 Conover St, Brooklyn, NY 11231',
      phone: '+1 (718) 625-8211',
      website: '#',
      hours: 'Wed-Sat 5 pm - late',
      type: 'Neighbourhood Bar',
      priceRange: '$',
      since: 1890,
      featured: false,
      description: 'A Red Hook waterfront bar that has been pouring drinks since the 1890s. The kind of place that does not exist anymore, except that it does.',
      writeup: "Sunny's has survived Prohibition, decades of longshoreman trade, the near-total abandonment of Red Hook, and a devastating hurricane. It is a wooden room with a tin ceiling and a bar that has absorbed more stories than most libraries. On weekends someone plays bluegrass in the back. The drinks are cheap and honest. Sunny Balzano himself kept it running as something between a bar and a living room for the neighbourhood — a place where Red Hook could be itself. His successors carry that forward. Every waterfront neighbourhood in America used to have a Sunny's. Almost none of them do anymore."
    },
    {
      id: 4,
      name: 'City Lights Books',
      category: 'bookshop',
      city: 'san-francisco',
      neighborhood: 'North Beach',
      address: '261 Columbus Ave, San Francisco, CA 94133',
      phone: '+1 (415) 362-8193',
      website: '#',
      hours: 'Daily 10 am - midnight',
      type: 'Bookstore & Publisher',
      priceRange: '$$',
      since: 1953,
      featured: true,
      description: 'The bookstore that published Howl and never stopped howling. North Beach without City Lights is San Francisco without a heartbeat.',
      writeup: "Lawrence Ferlinghetti opened City Lights in 1953 as the first all-paperback bookstore in America. Then he published Allen Ginsberg's Howl and got arrested for obscenity. He won the trial and the store became a landmark — not just of literature but of the idea that a bookshop can be a political act. Today it still stocks poetry more prominently than fiction. The narrow wooden stairs still creak. The basement still feels like a secret. City Lights is not nostalgic — it stocks new voices alongside the Beats and it remains one of the few bookstores in the country where the staff selections feel genuinely dangerous."
    },
    {
      id: 5,
      name: 'Trouble Coffee',
      category: 'cafe',
      city: 'san-francisco',
      neighborhood: 'Outer Sunset',
      address: '4033 Judah St, San Francisco, CA 94122',
      phone: '+1 (415) 682-4732',
      website: '#',
      hours: 'Daily 7 am - 6 pm',
      type: 'Coffee Shop',
      priceRange: '$',
      since: 2007,
      featured: true,
      description: 'A tiny cafe in the Outer Sunset that sells coffee, coconuts, and thick toast. It held the neighbourhood together when nothing else would.',
      writeup: 'Trouble Coffee is a plywood box on Judah Street, half a block from the Pacific. Giulietta Carrelli opened it in 2007 with a deliberately strange menu: drip coffee, whole coconuts, and cinnamon toast on thick bread. That is still mostly what they sell. The simplicity is the point. In a neighbourhood that felt forgotten by the rest of San Francisco, Trouble became the gathering place — surfers, retirees, N-Judah commuters, people who just needed a warm room and a familiar face. Carrelli has spoken openly about building the cafe as a way to build community while managing her own mental health. That honesty is baked into the walls. Trouble Coffee matters because it proved that a cafe does not need to be precious to be essential.'
    },
    {
      id: 6,
      name: 'Green Mill',
      category: 'bar',
      city: 'chicago',
      neighborhood: 'Uptown',
      address: '4802 N Broadway, Chicago, IL 60640',
      phone: '+1 (773) 878-5552',
      website: '#',
      hours: 'Daily 12 pm - 4 am',
      type: 'Jazz Club & Poetry Venue',
      priceRange: '$$',
      since: 1907,
      featured: true,
      description: 'A jazz club that has been open since 1907. Al Capone had a booth. The music has not stopped since.',
      writeup: "The Green Mill opened as a roadhouse in 1907 and became a speakeasy during Prohibition — Al Capone's favourite, with tunnels running under the building that you can still see if you ask nicely. But its survival is not about gangster tourism. The Green Mill hosts live jazz seven nights a week. It hosts the longest-running poetry slam in America every Sunday. The room is dark, the drinks are strong, and the cover charge is modest. Uptown has lost nearly everything around it to disinvestment and neglect. The Green Mill stayed. That stubbornness is worth more than any landmark plaque."
    },
    {
      id: 7,
      name: "Jim's Original",
      category: 'restaurant',
      city: 'chicago',
      neighborhood: 'University Village',
      address: '1250 S Union Ave, Chicago, IL 60607',
      phone: '+1 (312) 733-7820',
      website: '#',
      hours: 'Daily 24 hours',
      type: 'Hot Dog Stand',
      priceRange: '$',
      since: 1939,
      featured: false,
      description: 'A Maxwell Street hot dog stand that opened in 1939. No seats, no pretence, no plans to change.',
      writeup: "Jim's Original is a hot dog stand. It has been a hot dog stand since 1939, first on Maxwell Street and now on Union Avenue after the university forced the old market to close. There are no seats. You stand outside and eat a polish sausage with mustard and onions off a piece of wax paper. The grill has not been turned off in decades — they claim it has been continuously lit since the 1940s. Jim's is the last surviving vendor from the original Maxwell Street Market, which was one of the great open-air markets in America before the University of Illinois paved it over. Every bite is an act of defiance against the forces that believe a city should be clean and orderly and forgettable."
    },
    {
      id: 8,
      name: "Angelo's Barbershop",
      category: 'barbershop',
      city: 'chicago',
      neighborhood: 'Bridgeport',
      address: '742 W 33rd St, Chicago, IL 60616',
      phone: '+1 (312) 555-0147',
      website: '#',
      hours: 'Tue-Sat 8 am - 5 pm',
      type: 'Traditional Barbershop',
      priceRange: '$',
      since: 1965,
      featured: false,
      description: 'A Bridgeport barbershop where three generations of the same family have been cutting hair since 1965. The chairs are original.',
      writeup: "Angelo Ferraro opened this shop in 1965 and his grandson runs it now. The chairs are the same. The prices are unreasonable — unreasonably low. You walk in without an appointment, sit down, and have a conversation that ranges from the White Sox to local politics to whatever Angelo Jr. watched on television last night. The cut takes twelve minutes and costs what some places charge for a comb. Bridgeport has changed around it — the old stockyard families replaced by students and young professionals — but Angelo's remains fixed. It is the kind of place that every neighbourhood used to have and that almost none of them can sustain anymore. Its survival is a minor miracle performed with scissors and patience."
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
      hours: 'Tue-Sun 11:30 am - 10 pm',
      type: 'French Creole Restaurant',
      priceRange: '$$$',
      since: 1905,
      featured: true,
      description: 'A Bourbon Street restaurant that has been serving Creole French cooking since 1905. Friday lunch here is a civic institution.',
      writeup: "Galatoire's opened in 1905 and the downstairs dining room — the only room that matters — still does not take reservations. You wait in line on Bourbon Street, often for over an hour, alongside people in seersucker suits and people in flip-flops. The trout meuniere amandine has not changed. The waiters have worked here for decades and they remember what you ordered last time. Friday lunch at Galatoire's is not a meal — it is a ceremony. People take the afternoon off work. Tables order bottles of wine at noon. The room gets louder and happier as the hours pass. New Orleans has dozens of great restaurants but Galatoire's is the only one where the building, the food, the service, and the clientele form a single unbroken tradition stretching back over a century."
    },
    {
      id: 10,
      name: "Domilise's",
      category: 'restaurant',
      city: 'new-orleans',
      neighborhood: 'Uptown',
      address: '5240 Annunciation St, New Orleans, LA 70115',
      phone: '+1 (504) 899-9126',
      website: '#',
      hours: 'Mon-Sat 10 am - 7 pm',
      type: "Po-Boy Shop",
      priceRange: '$',
      since: 1918,
      featured: false,
      description: 'An Uptown po-boy shop run from a converted house since 1918. The shrimp po-boy here is the standard by which all others are judged.',
      writeup: "Domilise's is a house on Annunciation Street with a kitchen in the back and a few tables up front. They make po-boys. They have been making po-boys since 1918. The shrimp po-boy — fried to order, dressed with lettuce, tomato, and mayo on Leidenheimer bread — is not the fanciest version in the city, but it is the most correct. Miss Dot ran the shop for decades and her presence is still felt in the no-nonsense efficiency of the place. You order at the counter, you wait, you eat, you leave happy. Domilise's does not need to reinvent itself. It does not need a website redesign or a social media strategy. It needs to keep making po-boys exactly the way it always has, and the neighbourhood needs it to stay exactly where it is."
    }
  ]

};

// --- Utility helpers ---

/**
 * Returns price range HTML.
 */
function priceDisplay(range) {
  return `<span class="price-range">${range}</span>`;
}

/**
 * Renders a business card (returns HTML string).
 */
function renderBusinessCard(b) {
  const city = OGuideData.cities.find(c => c.id === b.city);
  return `
    <a class="business-card" href="business.html?id=${b.id}">
      <div class="business-card__body">
        <div class="business-card__meta">
          <span class="business-card__city">${city ? city.name : b.city} / ${b.neighborhood}</span>
          ${priceDisplay(b.priceRange)}
        </div>
        <h3 class="business-card__name">${b.name}</h3>
        <p class="business-card__desc">${b.description}</p>
        <div class="business-card__footer">
          ${b.since ? `<span class="business-card__since">Since ${b.since}</span>` : '<span></span>'}
          <span class="business-card__arrow">&rarr;</span>
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
