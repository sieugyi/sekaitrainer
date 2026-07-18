/**
 * SEKAI TRAINER - Main Application Script
 * Handles song loading, filtering, selection, and video player control
 */

/* ============================================
   STATE MANAGEMENT
   ============================================ */

const appState = {
  songs: [],
  selectedSong: null,
  selectedDifficulty: 'expert',
  searchQuery: '',
  darkMode: false,
};

/* ============================================
   DOM ELEMENTS
   ============================================ */

const DOM = {
  songList: document.getElementById('songList'),
  searchInput: document.getElementById('searchInput'),
  searchCount: document.getElementById('searchCount'),
  videoPlayer: document.getElementById('videoPlayer'),
  videoPlaceholder: document.getElementById('videoPlaceholder'),
  songInfo: document.getElementById('songInfo'),
  songTitle: document.getElementById('songTitle'),
  songArtist: document.getElementById('songArtist'),
  difficultyButtons: document.querySelectorAll('.difficulty-btn'),
  darkModeToggle: document.getElementById('darkModeToggle'),
  emptyState: document.getElementById('emptyState'),
};

/* ============================================
   INITIALIZATION
   ============================================ */

/**
 * Initialize the application
 */
async function init() {
  // Load dark mode preference
  initializeDarkMode();
  
  // Load songs from JSON
  await loadSongs();
  
  // Render initial UI
  renderSongList(appState.songs);
  
  // Attach event listeners
  attachEventListeners();
  
  console.log('🎵 Sekai Trainer initialized successfully');
}

/**
 * Load songs from songs.json
 */
async function loadSongs() {
  try {
    const response = await fetch('songs.json');
    if (!response.ok) throw new Error('Failed to load songs.json');
    
    appState.songs = await response.json();
    console.log(`✅ Loaded ${appState.songs.length} songs`);
  } catch (error) {
    console.error('❌ Error loading songs:', error);
    showEmptyState('Failed to load songs. Please refresh the page.');
  }
}

/**
 * Attach all event listeners
 */
function attachEventListeners() {
  // Search input
  DOM.searchInput.addEventListener('input', handleSearch);
  DOM.searchInput.addEventListener('keydown', handleSearchKeydown);
  
  // Difficulty buttons
  DOM.difficultyButtons.forEach(btn => {
    btn.addEventListener('click', handleDifficultyChange);
  });
  
  // Dark mode toggle
  DOM.darkModeToggle.addEventListener('click', toggleDarkMode);
  
  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboardNavigation);
}

/* ============================================
   SEARCH FUNCTIONALITY
   ============================================ */

/**
 * Handle search input changes
 */
function handleSearch(event) {
  appState.searchQuery = event.target.value.toLowerCase().trim();
  
  const filtered = filterSongs(appState.songs);
  renderSongList(filtered);
  updateSearchCount(filtered.length);
}

/**
 * Handle keyboard navigation in search
 */
function handleSearchKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    // Focus first song in list
    const firstSong = DOM.songList.querySelector('.song-item');
    if (firstSong) firstSong.focus();
  }
}

/**
 * Filter songs based on search query
 * Searches in title and artist
 */
function filterSongs(songs) {
  if (!appState.searchQuery) {
    return songs;
  }
  
  return songs.filter(song => {
    const title = song.title.toLowerCase();
    const artist = (song.artist || '').toLowerCase();
    const query = appState.searchQuery;
    
    return title.includes(query) || artist.includes(query);
  });
}

/**
 * Update search results count
 */
function updateSearchCount(count) {
  const total = appState.songs.length;
  DOM.searchCount.textContent = `${count} / ${total}`;
}

/* ============================================
   RENDERING
   ============================================ */

/**
 * Render song list in the DOM
 */
function renderSongList(songs) {
  DOM.songList.innerHTML = '';
  
  if (songs.length === 0) {
    showEmptyState();
    return;
  }
  
  hideEmptyState();
  
  songs.forEach((song, index) => {
    const songElement = createSongElement(song, index);
    DOM.songList.appendChild(songElement);
  });
}

/**
 * Create a song list item element
 */
function createSongElement(song, index) {
  const div = document.createElement('div');
  div.className = 'song-item';
  div.setAttribute('role', 'option');
  div.setAttribute('data-song-index', index);
  
  // Check if this song is selected
  if (appState.selectedSong && appState.selectedSong.title === song.title) {
    div.classList.add('active');
    div.setAttribute('aria-selected', 'true');
  }
  
  div.innerHTML = `
    <div class="song-item-content">
      <div class="song-item-title">${escapeHtml(song.title)}</div>
      <div class="song-item-artist">${escapeHtml(song.artist || 'Unknown Artist')}</div>
    </div>
    <div class="song-item-icon">✓</div>
  `;
  
  div.addEventListener('click', () => selectSong(song));
  div.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') selectSong(song);
  });
  
  return div;
}

/**
 * Show empty state message
 */
function showEmptyState(message = 'No songs found. Try a different search term.') {
  DOM.emptyState.style.display = 'block';
  DOM.emptyState.textContent = message;
  DOM.songList.style.display = 'none';
}

/**
 * Hide empty state message
 */
function hideEmptyState() {
  DOM.emptyState.style.display = 'none';
  DOM.songList.style.display = 'flex';
}

/* ============================================
   SONG SELECTION
   ============================================ */

/**
 * Select a song and update the video player
 */
function selectSong(song) {
  appState.selectedSong = song;
  
  // Update UI
  updateSongList();
  updateSongInfo();
  updateVideoPlayer();
  
  // Announce to accessibility tools
  announceSelection(`Selected ${song.title}`);
  
  console.log(`🎵 Selected: ${song.title} (${appState.selectedDifficulty})`);
}

/**
 * Update visual state of song list
 */
function updateSongList() {
  document.querySelectorAll('.song-item').forEach(item => {
    const itemTitle = item.querySelector('.song-item-title').textContent;
    
    if (appState.selectedSong && itemTitle === appState.selectedSong.title) {
      item.classList.add('active');
      item.setAttribute('aria-selected', 'true');
    } else {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    }
  });
}

/**
 * Update song info display
 */
function updateSongInfo() {
  if (!appState.selectedSong) {
    DOM.songInfo.style.display = 'none';
    return;
  }
  
  DOM.songTitle.textContent = appState.selectedSong.title;
  DOM.songArtist.textContent = appState.selectedSong.artist || 'Unknown Artist';
  DOM.songInfo.style.display = 'block';
}

/* ============================================
   VIDEO PLAYER CONTROL
   ============================================ */

/**
 * Update video player with current song and difficulty
 */
function updateVideoPlayer() {
  if (!appState.selectedSong) {
    hideVideo();
    return;
  }
  
  const videoId = appState.selectedSong[appState.selectedDifficulty];
  
  if (!videoId) {
    console.warn(`No video ID for ${appState.selectedDifficulty}`);
    hideVideo();
    return;
  }
  
  showVideo(videoId);
}

/**
 * Show video in the iframe
 */
function showVideo(videoId) {
  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
  DOM.videoPlayer.src = youtubeUrl;
  DOM.videoPlayer.style.display = 'block';
  DOM.videoPlaceholder.style.display = 'none';
}

/**
 * Hide video and show placeholder
 */
function hideVideo() {
  DOM.videoPlayer.style.display = 'none';
  DOM.videoPlaceholder.style.display = 'flex';
}

/* ============================================
   DIFFICULTY SELECTION
   ============================================ */

/**
 * Handle difficulty button clicks
 */
function handleDifficultyChange(event) {
  const button = event.currentTarget;
  const difficulty = button.dataset.difficulty;
  
  // Update state
  appState.selectedDifficulty = difficulty;
  
  // Update UI
  updateDifficultyButtons();
  updateVideoPlayer();
  
  // Announce to accessibility tools
  announceSelection(`Switched to ${difficulty} difficulty`);
  
  console.log(`🎮 Difficulty changed to: ${difficulty}`);
}

/**
 * Update visual state of difficulty buttons
 */
function updateDifficultyButtons() {
  DOM.difficultyButtons.forEach(btn => {
    const isActive = btn.dataset.difficulty === appState.selectedDifficulty;
    btn.setAttribute('aria-pressed', isActive);
    
    if (isActive) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/* ============================================
   DARK MODE
   ============================================ */

/**
 * Initialize dark mode from localStorage
 */
function initializeDarkMode() {
  const savedMode = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedMode !== null) {
    appState.darkMode = savedMode === 'true';
  } else {
    appState.darkMode = prefersDark;
  }
  
  applyDarkMode();
}

/**
 * Toggle dark mode
 */
function toggleDarkMode() {
  appState.darkMode = !appState.darkMode;
  applyDarkMode();
  localStorage.setItem('darkMode', appState.darkMode);
  
  // Update toggle icon
  updateDarkModeIcon();
  
  // Announce change
  announceSelection(appState.darkMode ? 'Dark mode enabled' : 'Dark mode disabled');
}

/**
 * Apply dark mode to document
 */
function applyDarkMode() {
  if (appState.darkMode) {
    document.body.classList.add('dark-mode');
    updateDarkModeIcon();
  } else {
    document.body.classList.remove('dark-mode');
    updateDarkModeIcon();
  }
}

/**
 * Update dark mode toggle button icon
 */
function updateDarkModeIcon() {
  const icon = DOM.darkModeToggle.querySelector('.toggle-icon');
  icon.textContent = appState.darkMode ? '☀️' : '🌙';
}

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */

/**
 * Handle global keyboard shortcuts
 */
function handleKeyboardNavigation(event) {
  // Only handle if no input is focused
  if (event.target === DOM.searchInput) {
    return;
  }
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      focusNextSong();
      break;
    
    case 'ArrowUp':
      event.preventDefault();
      focusPreviousSong();
      break;
    
    case 'ArrowRight':
      event.preventDefault();
      rotateDifficultyRight();
      break;
    
    case 'ArrowLeft':
      event.preventDefault();
      rotateDifficultyLeft();
      break;
    
    case '/':
      event.preventDefault();
      DOM.searchInput.focus();
      break;
  }
}

/**
 * Focus next song in list
 */
function focusNextSong() {
  const items = Array.from(DOM.songList.querySelectorAll('.song-item'));
  const focused = document.activeElement;
  const currentIndex = items.indexOf(focused);
  const nextIndex = (currentIndex + 1) % items.length;
  
  if (items[nextIndex]) {
    items[nextIndex].focus();
  }
}

/**
 * Focus previous song in list
 */
function focusPreviousSong() {
  const items = Array.from(DOM.songList.querySelectorAll('.song-item'));
  const focused = document.activeElement;
  const currentIndex = items.indexOf(focused);
  const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
  
  if (items[prevIndex]) {
    items[prevIndex].focus();
  }
}

/**
 * Rotate difficulty to the right
 */
function rotateDifficultyRight() {
  const difficulties = ['expert', 'master', 'append'];
  const currentIndex = difficulties.indexOf(appState.selectedDifficulty);
  const nextIndex = (currentIndex + 1) % difficulties.length;
  
  const button = document.querySelector(`[data-difficulty="${difficulties[nextIndex]}"]`);
  if (button) button.click();
}

/**
 * Rotate difficulty to the left
 */
function rotateDifficultyLeft() {
  const difficulties = ['expert', 'master', 'append'];
  const currentIndex = difficulties.indexOf(appState.selectedDifficulty);
  const prevIndex = currentIndex === 0 ? difficulties.length - 1 : currentIndex - 1;
  
  const button = document.querySelector(`[data-difficulty="${difficulties[prevIndex]}"]`);
  if (button) button.click();
}

/* ============================================
   ACCESSIBILITY
   ============================================ */

/**
 * Announce messages to screen readers
 */
function announceSelection(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => announcement.remove(), 1000);
}

/* ============================================
   UTILITIES
   ============================================ */

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ============================================
   STARTUP
   ============================================ */

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}