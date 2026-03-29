(() => {
  'use strict';

  const API = 'https://api.discogs.com';

  // ── STATE ─────────────────────────────────────────────
  const state = {
    listings: [],
    currentIndex: -1,
    pagination: { page: 0, pages: 1, totalItems: 0 },
    loading: false,
    query: null,
    token: '',
    filters: { priceMin: '', priceMax: '', formats: [] }
  };

  // ── FILTERED LISTING VIEW ─────────────────────────────
  function getVisibleListings() {
    const f = state.filters;
    return state.listings.filter(l => {
      if (f.priceMin !== '' || f.priceMax !== '') {
        const num = parseFloat(l.price.replace(/[^0-9.]/g, ''));
        if (isNaN(num)) return false;
        if (f.priceMin !== '' && num < parseFloat(f.priceMin)) return false;
        if (f.priceMax !== '' && num > parseFloat(f.priceMax)) return false;
      }
      if (f.formats.length > 0 && !f.formats.some(fmt => l.format.includes(fmt))) return false;
      return true;
    });
  }

  // ── DOM REFS ──────────────────────────────────────────
  const $ = id => document.getElementById(id);
  const urlInput      = $('discogs-url');
  const tokenInput    = $('discogs-token');
  const tokenRow      = $('token-row');
  const loadBtn       = $('load-btn');
  const prevBtn       = $('prev-btn');
  const nextBtn       = $('next-btn');
  const touchPrev     = $('touch-prev');
  const touchNext     = $('touch-next');
  const emptyState    = $('empty-state');
  const recordDisplay = $('record-display');
  const recordJacket  = $('record-jacket');
  const albumArt      = $('album-art');
  const artSkeleton   = $('art-skeleton');
  const noImage       = $('no-image-placeholder');
  const captionTitle  = $('caption-title');
  const captionArtist = $('caption-artist');
  const metaPanel     = $('metadata-panel');
  const metaSkeleton  = $('meta-skeleton');
  const metaContent   = $('meta-content');
  const metaPrice     = $('meta-price');
  const metaOffers    = $('meta-offers');
  const metaCondition = $('meta-condition');
  const metaSleeve    = $('meta-sleeve');
  const metaYear      = $('meta-year');
  const metaLabelVal  = $('meta-label-val');
  const metaFormat    = $('meta-format');
  const metaSellerName   = $('meta-seller-name');
  const metaSellerRating = $('meta-seller-rating');
  const metaShips     = $('meta-ships');
  const metaComments  = $('meta-comments');
  const addToCartBtn  = $('add-to-cart-btn');
  const paginationCtr = $('pagination-counter');
  const loadingInd    = $('loading-indicator');
  const errorMsg      = $('error-msg');

  // ── RESTORE SAVED TOKEN ───────────────────────────────
  const savedToken = localStorage.getItem('discogs_token');
  if (savedToken) {
    tokenInput.value = savedToken;
  } else {
    // No token yet — auto-expand settings panel on next tick (after DOM settled)
    setTimeout(() => {
      $('settings-panel').classList.remove('hidden');
      $('settings-toggle-btn').classList.add('active');
    }, 0);
  }

  // ── URL HISTORY ───────────────────────────────────────
  function saveUrlHistory(url) {
    const key = 'discogs_url_history';
    let hist = JSON.parse(localStorage.getItem(key) || '[]');
    hist = [url, ...hist.filter(u => u !== url)].slice(0, 10);
    localStorage.setItem(key, JSON.stringify(hist));
    const dl = $('url-history');
    dl.innerHTML = hist.map(u => `<option value="${u.replace(/"/g, '&quot;')}">`).join('');
  }
  // Populate datalist from existing history on page load
  (function restoreUrlHistory() {
    const hist = JSON.parse(localStorage.getItem('discogs_url_history') || '[]');
    const dl = $('url-history');
    dl.innerHTML = hist.map(u => `<option value="${u.replace(/"/g, '&quot;')}">`).join('');
  })();

  // ── STORES HISTORY ────────────────────────────────────
  async function saveStore() {
    if (!state.query) return;
    const name = state.query.username || state.query.artistName || state.query.artistId || state.query.rawUrl || '';
    const thumb = state.listings[0] ? state.listings[0].imageUrl : '';
    let avatar = '', location = '';

    if (state.query.type === 'seller' && state.query.username) {
      try {
        const r = await fetch(`${API}/users/${encodeURIComponent(state.query.username)}`,
          { headers: { 'Authorization': `Discogs token=${state.token}` } });
        if (r.ok) {
          const d = await r.json();
          avatar   = d.avatar_url || '';
          location = d.location   || '';
        }
      } catch (_) {}
    } else if (state.query.type === 'artist') {
      avatar = state.query.artistImage || thumb;
    }

    const key = 'discogs_stores';
    let stores = JSON.parse(localStorage.getItem(key) || '[]');
    const entry = { url: state.query.rawUrl || '', name, thumb, avatar, location,
                    visitedAt: new Date().toISOString() };
    stores = [entry, ...stores.filter(s => s.url !== entry.url)].slice(0, 30);
    localStorage.setItem(key, JSON.stringify(stores));
    renderStoresHistory();
  }

  function renderStoresHistory() {
    const key = 'discogs_stores';
    const stores = JSON.parse(localStorage.getItem(key) || '[]');
    const grid = $('stores-grid');
    const empty = $('stores-empty');
    if (stores.length === 0) {
      grid.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');
    grid.innerHTML = stores.map(s => {
      const url  = s.url  || '';
      const name = s.name || url || '—';
      const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      const thumbStyle  = s.thumb  ? `background-image:url('${s.thumb.replace(/'/g, "\\'")}')` : '';
      const avatarStyle = s.avatar ? `background-image:url('${s.avatar.replace(/'/g, "\\'")}')` : '';
      const locationHtml = s.location ? `<div class="store-card-location">&#128205; ${s.location.replace(/</g, '&lt;')}</div>` : '';
      const avatarHtml = avatarStyle ? `<div class="store-card-avatar" style="${avatarStyle}"></div>` : '';
      return `<div class="store-card" data-url="${url.replace(/"/g, '&quot;')}">
        <button class="store-card-remove" title="Remove from history">&#x2715;</button>
        <div class="store-card-thumb" style="${thumbStyle}"></div>
        <div class="store-card-info">
          ${avatarHtml}
          <div class="store-card-text">
            <div class="store-card-name">${name.replace(/</g, '&lt;')}</div>
            ${locationHtml}
            <div class="store-card-url">${displayUrl.replace(/</g, '&lt;')}</div>
          </div>
        </div>
      </div>`;
    }).join('');
    grid.querySelectorAll('.store-card').forEach(card => {
      card.querySelector('.store-card-remove').addEventListener('click', e => {
        e.stopPropagation();
        const key = 'discogs_stores';
        let stores = JSON.parse(localStorage.getItem(key) || '[]');
        stores = stores.filter(s => s.url !== card.dataset.url);
        localStorage.setItem(key, JSON.stringify(stores));
        renderStoresHistory();
      });
      card.addEventListener('click', () => {
        urlInput.value = card.dataset.url;
        switchTab('browse');
        startLoad();
      });
    });
  }

  // Populate stores history on page load
  renderStoresHistory();

  // ── TAB SWITCHING ──────────────────────────────────────
  const stage     = $('stage');
  const storesPanel = $('stores-panel');

  function switchTab(tab) {
    const tabBrowse = $('tab-browse');
    const tabStores = $('tab-stores');
    if (tab === 'browse') {
      stage.classList.remove('hidden');
      storesPanel.classList.add('hidden');
      tabBrowse.classList.add('active');
      tabStores.classList.remove('active');
    } else {
      stage.classList.add('hidden');
      storesPanel.classList.remove('hidden');
      tabBrowse.classList.remove('active');
      tabStores.classList.add('active');
      renderStoresHistory();
    }
  }

  $('tab-browse').addEventListener('click', () => switchTab('browse'));
  $('tab-stores').addEventListener('click', () => switchTab('stores'));

  // ── URL PARSING ───────────────────────────────────────
  function parseDiscogsUrl(raw) {
    let url = raw.trim();
    if (!url) return null;

    // seller: /seller/USERNAME/profile
    const seller = url.match(/discogs\.com\/seller\/([^/?#\s]+)/);
    if (seller) return { type: 'seller', username: seller[1], rawUrl: raw };

    // user profile: /user/USERNAME — normalize to canonical seller URL
    const userProfile = url.match(/discogs\.com\/user\/([^/?#\s]+)/);
    if (userProfile) return { type: 'seller', username: userProfile[1], rawUrl: `https://www.discogs.com/seller/${userProfile[1]}/profile` };

    // artist marketplace: ?artist_id=123
    const artist = url.match(/[?&]artist_id=(\d+)/);
    if (artist) return { type: 'artist', artistId: artist[1], rawUrl: raw };

    // release marketplace: ?release_id=123 or /sell/release/123
    const releaseQ = url.match(/[?&]release_id=(\d+)/);
    if (releaseQ) return { type: 'release', releaseId: releaseQ[1], rawUrl: raw };
    const releaseP = url.match(/\/sell\/release\/(\d+)/);
    if (releaseP) return { type: 'release', releaseId: releaseP[1], rawUrl: raw };

    // label: ?label_id=123
    const label = url.match(/[?&]label_id=(\d+)/);
    if (label) return { type: 'label', labelId: label[1], rawUrl: raw };

    return null;
  }

  function buildApiUrl(query, page) {
    if (query.type === 'seller') {
      return `${API}/users/${encodeURIComponent(query.username)}/inventory?status=For+Sale&sort=listed&sort_order=desc&per_page=100&page=${page}`;
    }
    if (query.type === 'artist') {
      return `${API}/database/search?artist=${encodeURIComponent(query.artistName)}&type=release&per_page=50&page=${page}`;
    }
    if (query.type === 'release') {
      return `${API}/marketplace/search?release_id=${query.releaseId}&per_page=50&page=${page}`;
    }
    if (query.type === 'label') {
      return `${API}/marketplace/search?label_id=${query.labelId}&per_page=50&page=${page}`;
    }
    return null;
  }

  // ── API FETCH — direct to Discogs, no third-party proxy ──
  async function fetchPage(query, page) {
    // For artist queries, resolve the name first (API needs name, not id)
    if (query.type === 'artist' && !query.artistName) {
      const artistRes = await fetch(`${API}/artists/${query.artistId}`, {
        headers: { 'Authorization': `Discogs token=${state.token}` }
      });
      if (artistRes.status === 404) throw new Error('Artist not found — double-check the URL.');
      if (!artistRes.ok) throw new Error(`Could not resolve artist (HTTP ${artistRes.status}).`);
      const artistData = await artistRes.json();
      query.artistName  = artistData.name;
      query.artistImage = (artistData.images && artistData.images[0]) ? (artistData.images[0].uri || '') : '';
    }

    const url = buildApiUrl(query, page);
    if (!url) throw new Error('Unsupported URL type');

    const res = await fetch(url, {
      headers: { 'Authorization': `Discogs token=${state.token}` }
    });
    if (res.status === 401 || res.status === 403) throw new Error('Token invalid or expired — check discogs.com/settings/developers.');
    if (res.status === 404) throw new Error('Not found — double-check the URL.');
    if (res.status === 429) throw new Error('Rate limited by Discogs. Wait a moment and try again.');
    if (!res.ok) throw new Error(`Discogs returned HTTP ${res.status}.`);
    return res.json();
  }

  // ── NORMALISE ─────────────────────────────────────────
  function normalizeListing(raw) {
    // Database search result shape (artist browse via /database/search)
    if (raw.community !== undefined) {
      return {
        id: raw.id,
        title: raw.title || '(Unknown)',
        artist: state.query.artistName || '',
        year: raw.year || '',
        label: Array.isArray(raw.label) ? raw.label.join(', ') : (raw.label || ''),
        format: Array.isArray(raw.format) ? raw.format.join(', ') : (raw.format || ''),
        imageUrl: raw.cover_image || raw.thumb || '',
        price: '—',
        allowOffers: false,
        condition: '',
        sleeveCondition: '',
        shipsFrom: '',
        sellerName: '',
        sellerRating: null,
        sellerFeedback: null,
        comments: '',
        listingUrl: `https://www.discogs.com/sell/release/${raw.id}`
      };
    }

    // Inventory response shape
    if (raw.release && raw.price) {
      const r = raw.release;
      const images = (r.images && r.images.length) ? r.images : [];
      const img = images.find(i => i.type === 'primary') || images[0];
      return {
        id: raw.id,
        title: r.title || '(Unknown)',
        artist: r.artist || r.description || '',
        year: r.year || '',
        label: Array.isArray(r.label) ? r.label.join(', ') : (r.label || ''),
        format: Array.isArray(r.format) ? r.format.join(', ') : (r.format || ''),
        imageUrl: img ? (img.uri || img.resource_url || '') : '',
        price: raw.price ? `${raw.price.currency} ${parseFloat(raw.price.value).toFixed(2)}` : '—',
        allowOffers: raw.allow_offers,
        condition: raw.condition || '',
        sleeveCondition: raw.sleeve_condition || '',
        shipsFrom: raw.ships_from || '',
        sellerName: raw.seller ? raw.seller.username : '',
        sellerRating: raw.seller && raw.seller.stats ? raw.seller.stats.rating : null,
        sellerFeedback: raw.seller && raw.seller.stats ? raw.seller.stats.total : null,
        comments: raw.comments || '',
        listingUrl: raw.uri
          ? (raw.uri.startsWith('http') ? raw.uri : `https://www.discogs.com${raw.uri}`)
          : `https://www.discogs.com/sell/item/${raw.id}`
      };
    }

    // Marketplace search shape
    const r = raw.release || {};
    const stats = raw.stats || {};
    const seller = raw.seller || {};
    const images = (r.images && r.images.length) ? r.images : [];
    const img = images.find(i => i.type === 'primary') || images[0];
    return {
      id: raw.id,
      title: r.title || raw.title || '(Unknown)',
      artist: (r.artists && r.artists.length) ? r.artists.map(a => a.name).join(', ') : (raw.artist || ''),
      year: r.year || raw.year || '',
      label: (r.labels && r.labels.length) ? r.labels.map(l => l.name).join(', ') : '',
      format: (r.formats && r.formats.length) ? r.formats.map(f => f.name).join(', ') : '',
      imageUrl: img ? (img.uri || img.resource_url || '') : (r.thumb || ''),
      price: raw.price ? `${raw.price.currency} ${parseFloat(raw.price.value).toFixed(2)}` : '—',
      allowOffers: raw.allow_offers,
      condition: raw.condition || '',
      sleeveCondition: raw.sleeve_condition || '',
      shipsFrom: raw.ships_from || seller.ships_from || '',
      sellerName: seller.username || '',
      sellerRating: seller.stats ? seller.stats.rating : (stats.user ? stats.user.rating : null),
      sellerFeedback: seller.stats ? seller.stats.total : null,
      comments: raw.comments || '',
      listingUrl: raw.uri
        ? (raw.uri.startsWith('http') ? raw.uri : `https://www.discogs.com${raw.uri}`)
        : `https://www.discogs.com/sell/item/${raw.id}`
    };
  }

  // ── CONDITION BADGE ───────────────────────────────────
  function conditionBadge(cond) {
    if (!cond) return '<span class="meta-val">—</span>';
    const abbr = cond.replace(/[^A-Za-z+]/g, '').replace('Mint', 'M').replace('VeryGood', 'VG').replace('Good', 'G').replace('Fair', 'F').replace('Poor', 'P');
    const cls = abbr.startsWith('NM') || abbr === 'M' ? 'cond-NM'
              : abbr.startsWith('VGP') || abbr === 'VG+' ? 'cond-VGP'
              : abbr.startsWith('VG') ? 'cond-VG'
              : 'cond-GP';
    return `<span class="condition-badge ${cls}">${cond}</span>`;
  }

  // ── RENDER ────────────────────────────────────────────
  function renderContent(quick = false) {
    const visible = getVisibleListings();
    const listing = visible[state.currentIndex];
    if (!listing) return;

    // Caption
    captionTitle.textContent = listing.title;
    captionArtist.textContent = listing.artist;

    // Album art
    if (quick) {
      albumArt.classList.remove('fading');
      noImage.classList.add('hidden');
      if (listing.imageUrl) {
        albumArt.style.display = 'block';
        artSkeleton.classList.remove('hidden');
        albumArt.src = listing.imageUrl;
        albumArt.onload  = () => artSkeleton.classList.add('hidden');
        albumArt.onerror = () => {
          albumArt.style.display = 'none';
          artSkeleton.classList.add('hidden');
          noImage.classList.remove('hidden');
        };
      } else {
        albumArt.style.display = 'none';
        albumArt.src = '';
        artSkeleton.classList.add('hidden');
        noImage.classList.remove('hidden');
      }
    } else {
      albumArt.classList.add('fading');
      artSkeleton.classList.add('hidden');
      noImage.classList.add('hidden');
      albumArt.style.display = 'block';
      setTimeout(() => {
        if (listing.imageUrl) {
          albumArt.src = listing.imageUrl;
          albumArt.onload  = () => albumArt.classList.remove('fading');
          albumArt.onerror = () => {
            albumArt.style.display = 'none';
            noImage.classList.remove('hidden');
          };
        } else {
          albumArt.style.display = 'none';
          albumArt.classList.remove('fading');
          noImage.classList.remove('hidden');
        }
      }, 80);
    }

    // Price sticker on jacket
    const priceTag = $('price-tag');
    if (listing.price && listing.price !== '—') {
      priceTag.textContent = listing.price;
      priceTag.classList.remove('hidden');
    } else {
      priceTag.classList.add('hidden');
    }

    // Metadata
    metaPrice.textContent = listing.price;
    metaOffers.textContent = listing.allowOffers ? 'Offers accepted' : '';
    metaCondition.innerHTML = conditionBadge(listing.condition);
    metaSleeve.innerHTML = conditionBadge(listing.sleeveCondition);
    metaYear.textContent = listing.year || '—';
    metaLabelVal.textContent = listing.label || '—';
    metaFormat.textContent = listing.format || '—';

    metaSellerName.textContent = listing.sellerName || '—';
    if (listing.sellerRating != null) {
      metaSellerRating.textContent = `${listing.sellerRating}% (${listing.sellerFeedback || '?'} ratings)`;
    } else {
      metaSellerRating.textContent = '';
    }
    metaShips.textContent = listing.shipsFrom ? `Ships from ${listing.shipsFrom}` : '';

    if (listing.comments) {
      metaComments.textContent = listing.comments;
      metaComments.classList.remove('hidden');
    } else {
      metaComments.classList.add('hidden');
    }

    addToCartBtn.onclick = () => window.open(listing.listingUrl, '_blank', 'noopener,noreferrer');

    const q = encodeURIComponent(`${listing.artist} ${listing.title}`);
    $('search-youtube').href      = `https://www.youtube.com/results?search_query=${q}`;
    $('search-bandcamp').href     = `https://bandcamp.com/search?q=${q}`;
    $('search-soundcloud').href   = `https://soundcloud.com/search?q=${q}`;

    // Pagination
    const filterActive = state.filters.priceMin !== '' || state.filters.priceMax !== '' || state.filters.formats.length > 0;
    const total = filterActive ? visible.length : (state.pagination.totalItems || state.listings.length);
    const suffix = filterActive ? ` (${visible.length} filtered)` : '';
    paginationCtr.textContent = `${state.currentIndex + 1} / ${total}${suffix}`;

    // Nav buttons
    prevBtn.disabled = state.currentIndex <= 0;
    nextBtn.disabled = state.currentIndex >= visible.length - 1 && state.pagination.page >= state.pagination.pages;
    touchPrev.disabled = prevBtn.disabled;
    touchNext.disabled = nextBtn.disabled;
  }

  function render() {
    renderContent();
  }

  // ── NAVIGATE (animated crate-flip) ────────────────────
  let animating = false;

  function navigate(delta) {
    if (state.loading || animating) return;
    const visible = getVisibleListings();
    const next = state.currentIndex + delta;
    if (next < 0) return;
    if (next >= visible.length) {
      if (state.pagination.page < state.pagination.pages) loadNextPage();
      return;
    }

    animating = true;

    // Phase 1 — exit: top of jacket falls backward (rotateX from bottom)
    recordJacket.style.transition = 'transform 0.22s ease-in, opacity 0.18s ease-in';
    recordJacket.style.transformOrigin = '50% 100%';
    recordJacket.style.transform = 'perspective(700px) rotateX(-88deg)';
    recordJacket.style.opacity = '0';

    setTimeout(() => {
      // Phase 2 — swap content while card is "away"
      state.currentIndex = next;
      renderContent(true);

      recordJacket.style.transition = 'none';
      recordJacket.style.transform = 'perspective(700px) rotateX(-14deg)';
      recordJacket.style.opacity = '0.5';

      requestAnimationFrame(() => requestAnimationFrame(() => {
        // Phase 3 — animate to resting flat position
        recordJacket.style.transition = 'transform 0.22s ease-out, opacity 0.2s ease-out';
        recordJacket.style.transform = '';
        recordJacket.style.opacity = '';
        setTimeout(() => { animating = false; }, 230);
      }));

      // Prefetch if near end
      if (visible.length - next < 10 && state.pagination.page < state.pagination.pages) {
        loadNextPage();
      }
    }, 210);
  }

  // ── LOAD ──────────────────────────────────────────────
  async function loadNextPage() {
    if (state.loading || state.pagination.page >= state.pagination.pages) return;
    state.loading = true;
    loadingInd.classList.remove('hidden');

    try {
      const nextPage = state.pagination.page + 1;
      const data = await fetchPage(state.query, nextPage);
      const raw = data.listings || data.results || [];
      const normalized = raw.reduce((acc, item) => {
        try { acc.push(normalizeListing(item)); } catch (_) { /* skip malformed listing */ }
        return acc;
      }, []);
      state.listings.push(...normalized);

      const pg = data.pagination || {};
      state.pagination.page  = pg.page  || nextPage;
      state.pagination.pages = pg.pages || 1;
      state.pagination.totalItems = pg.items || state.listings.length;

      // If navigating forward was pending (first page)
      if (state.currentIndex < 0 && state.listings.length > 0) {
        state.currentIndex = 0;
        showRecordDisplay();
        render();
        saveStore();
        rebuildFilterOptions();
      } else {
        render();
        rebuildFilterOptions();
      }
    } catch (err) {
      showError(err.message);
    } finally {
      state.loading = false;
      loadingInd.classList.add('hidden');
    }
  }

  async function startLoad() {
    const raw = urlInput.value.trim();
    if (!raw) return;

    const token = tokenInput.value.trim();
    if (!token) {
      showError('A Discogs token is required. Get one free at discogs.com/settings/developers → Generate token.');
      tokenInput.focus();
      return;
    }

    const query = parseDiscogsUrl(raw);
    if (!query) {
      showError('Could not parse URL. Paste a full Discogs seller or artist URL.');
      return;
    }

    saveUrlHistory(raw);
    state.token = token;
    localStorage.setItem('discogs_token', token);
    state.query = query;
    state.listings = [];
    state.currentIndex = -1;
    state.pagination = { page: 0, pages: 1, totalItems: 0 };
    state.loading = false;
    state.filters = { priceMin: '', priceMax: '', formats: [] };
    $('f-price-min').value = '';
    $('f-price-max').value = '';
    $('f-format-chips').innerHTML = '';

    hideError();
    showLoadingSkeleton();
    await loadNextPage();
  }

  // ── UI HELPERS ────────────────────────────────────────
  function showLoadingSkeleton() {
    emptyState.classList.add('hidden');
    recordDisplay.classList.add('hidden');
    metaSkeleton.classList.remove('hidden');
    metaContent.classList.add('hidden');
  }

  function showRecordDisplay() {
    emptyState.classList.add('hidden');
    recordDisplay.classList.remove('hidden');
    artSkeleton.classList.add('hidden');
    metaSkeleton.classList.add('hidden');
    metaContent.classList.remove('hidden');
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove('hidden');
    if (state.listings.length === 0) {
      emptyState.classList.remove('hidden');
      recordDisplay.classList.add('hidden');
      metaSkeleton.classList.add('hidden');
    }
    if (msg.toLowerCase().includes('token') || msg.toLowerCase().includes('401') || msg.toLowerCase().includes('403')) {
      $('settings-panel').classList.remove('hidden');
      $('settings-toggle-btn').classList.add('active');
    }
  }

  function hideError() {
    errorMsg.textContent = '';
    errorMsg.classList.add('hidden');
  }

  // ── FILTERS ───────────────────────────────────────────
  function rebuildFilterOptions() {
    const chipsWrap = $('f-format-chips');
    const formats = [...new Set(
      state.listings.flatMap(l => l.format.split(',').map(f => f.trim()).filter(Boolean))
    )].sort();
    const activeFormats = state.filters.formats;
    chipsWrap.innerHTML = formats.map(fmt =>
      `<button class="format-chip${activeFormats.includes(fmt) ? ' active' : ''}" data-fmt="${fmt.replace(/"/g, '&quot;')}">${fmt.replace(/</g, '&lt;')}</button>`
    ).join('');
    chipsWrap.querySelectorAll('.format-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const fmt = chip.dataset.fmt;
        if (state.filters.formats.includes(fmt)) {
          state.filters.formats = state.filters.formats.filter(f => f !== fmt);
          chip.classList.remove('active');
        } else {
          state.filters.formats.push(fmt);
          chip.classList.add('active');
        }
        applyFilters();
      });
    });
  }

  function applyFilters() {
    state.currentIndex = 0;
    const visible = getVisibleListings();
    if (visible.length === 0) {
      paginationCtr.textContent = '0 / 0 (filtered)';
      prevBtn.disabled = true; nextBtn.disabled = true;
      touchPrev.disabled = true; touchNext.disabled = true;
      return;
    }
    render();
  }

  // Filter sidebar toggle
  $('filter-toggle-btn').addEventListener('click', () => {
    $('filter-sidebar').classList.toggle('hidden');
    $('filter-toggle-btn').classList.toggle('active');
  });
  $('filter-sidebar-close').addEventListener('click', () => {
    $('filter-sidebar').classList.add('hidden');
    $('filter-toggle-btn').classList.remove('active');
  });

  // Price inputs
  $('f-price-min').addEventListener('input', e => { state.filters.priceMin = e.target.value; applyFilters(); });
  $('f-price-max').addEventListener('input', e => { state.filters.priceMax = e.target.value; applyFilters(); });

  // Clear button
  $('f-clear-btn').addEventListener('click', () => {
    state.filters = { priceMin: '', priceMax: '', formats: [] };
    $('f-price-min').value = '';
    $('f-price-max').value = '';
    $('f-format-chips').querySelectorAll('.format-chip').forEach(c => c.classList.remove('active'));
    applyFilters();
  });

  // Settings panel toggle
  $('settings-toggle-btn').addEventListener('click', () => {
    $('settings-panel').classList.toggle('hidden');
    $('settings-toggle-btn').classList.toggle('active');
  });

  // ── EVENTS — LOAD ─────────────────────────────────────
  loadBtn.addEventListener('click', startLoad);
  urlInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') startLoad();
  });

  // ── EVENTS — KEYBOARD NAVIGATION ─────────────────────
  document.addEventListener('keydown', e => {
    if (e.target === urlInput || e.target === tokenInput) return;
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp'   || e.key === 'h') navigate(-1);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown'  || e.key === 'l') navigate(+1);
  });

  // ── EVENTS — BUTTONS ──────────────────────────────────
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(+1));
  touchPrev.addEventListener('click', () => navigate(-1));
  touchNext.addEventListener('click', () => navigate(+1));

  // ── EVENTS — MOUSE WHEEL ──────────────────────────────
  recordDisplay.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = e.deltaX || e.deltaY;
    if (delta > 0) navigate(+1);
    else if (delta < 0) navigate(-1);
  }, { passive: false });

  // ── EVENTS — TOUCH SWIPE (horizontal or vertical) ────
  let touchStartX = null, touchStartY = null;
  recordDisplay.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  recordDisplay.addEventListener('touchend', e => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    touchStartX = touchStartY = null;
    if (Math.abs(dy) > Math.abs(dx)) {
      if (Math.abs(dy) > 40) navigate(dy < 0 ? +1 : -1);
    } else {
      if (Math.abs(dx) > 40) navigate(dx < 0 ? +1 : -1);
    }
  }, { passive: true });

})();
