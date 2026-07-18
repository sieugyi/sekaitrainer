# 🎵 Sekai Trainer

A modern, responsive chart viewer for **Project SEKAI** players. Select a song and watch the corresponding difficulty chart video instantly.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Platform: GitHub Pages](https://img.shields.io/badge/Platform-GitHub%20Pages-blue.svg)

## 🌟 Features

- **Live Search** - Find songs by title or artist name
- **Multiple Difficulties** - Expert, Master, and Append charts
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Mode** - Easy on the eyes with light/dark theme toggle
- **Keyboard Navigation** - Full keyboard support for power users
- **Smooth Animations** - Modern glassmorphism design with smooth transitions
- **YouTube Integration** - Embedded video player for each chart
- **Accessibility** - Screen reader friendly with ARIA labels

## 🎮 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search bar |
| `↓` / `↑` | Navigate songs (when song list is focused) |
| `→` / `←` | Change difficulty |
| `Enter` | Select focused song |

## 🚀 Quick Start

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sieugyi/sekaitrainer.git
   cd sekaitrainer
   ```

2. **Start a local server:**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   http-server
   
   # Or simply drag index.html to your browser
   ```

3. **Open in browser:**
   Navigate to `http://localhost:8000`

### GitHub Pages Deployment

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set Source to `main` branch (or your default branch)
   - Click Save

2. **Access your site:**
   - Your site will be live at: `https://sieugyi.github.io/sekaitrainer`
   - Changes pushed to main branch auto-deploy

## 📝 Adding Songs

The song database is stored in `songs.json`. Each song entry contains:

```json
{
  "title": "Song Name",
  "artist": "Artist Name",
  "expert": "YOUTUBE_VIDEO_ID",
  "master": "YOUTUBE_VIDEO_ID",
  "append": "YOUTUBE_VIDEO_ID"
}
```

### Adding a New Song

1. Edit `songs.json`
2. Add a new object to the array:
   ```json
   {
     "title": "Your Song",
     "artist": "Your Artist",
     "expert": "dQw4w9WgXcQ",
     "master": "jNQXAC9IVRw",
     "append": "9bZkp7q19f0"
   }
   ```
3. Commit and push your changes
4. The new song appears automatically!

### Finding YouTube Video IDs

For a YouTube URL like: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

The video ID is: `dQw4w9WgXcQ`

## 🎨 Customization

### Colors & Theme

Edit the CSS variables in `style.css`:

```css
:root {
  --color-primary: #6366f1;      /* Main brand color */
  --color-secondary: #06b6d4;    /* Accent color */
  --color-accent: #a855f7;       /* Highlight color */
  --color-background: #f8fafc;   /* Light background */
}
```

### Adding Custom Logo

Replace the emoji logo in `index.html`:

```html
<h1 class="logo">🎵 Sekai Trainer</h1>
<!-- Change 🎵 to your custom logo or image -->
```

Or use an image:

```html
<h1 class="logo">
  <img src="assets/logo.png" alt="Sekai Trainer">
  Sekai Trainer
</h1>
```

## 📱 Responsive Breakpoints

- **Desktop** (1024px+) - Two-column layout (songs | player)
- **Tablet** (768px - 1023px) - Single column layout
- **Mobile** (480px - 767px) - Optimized single column
- **Small Mobile** (< 480px) - Compact layout

## 🛠️ Project Structure

```
sekaitrainer/
├── index.html          # HTML structure
├── style.css           # Styles & responsive design
├── script.js           # Application logic
├── songs.json          # Song database
├── README.md           # This file
└── assets/
    ├── logo.png        # Logo image (optional)
    └── placeholder.png # Placeholder image (optional)
```

## 💻 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, Gradients, Animations
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **JSON** - Data format for songs
- **YouTube Embed API** - Video player

## 🔮 Future Features

These features are designed to be easy to add without major refactoring:

- ⭐ **Favorites** - Save your favorite songs locally
- 👀 **Recently Viewed** - Track recently viewed charts
- 🎴 **Song Covers** - Display jacket images
- 🎯 **Level Filters** - Filter by difficulty level
- 🎭 **Unit Filters** - Filter by Project SEKAI unit
- 📊 **Sorting Options** - Sort by name, artist, date added
- 📋 **Playlists** - Create custom song collections
- ⚙️ **Settings** - More customization options
- 📲 **PWA Support** - Install as app on mobile

## 🤝 Contributing

Found a bug? Want to add a feature?

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

- Built for [Project SEKAI](https://pjsekai.sega.jp/) players
- Inspired by rhythm game design aesthetics
- Created with ❤️ for the community

## 📞 Support

- 📧 Create an issue on GitHub for bugs
- 💬 Discussions for feature requests
- 🎮 Join Project SEKAI communities for recommendations

---

**Made with 🎵 for rhythm game enthusiasts**
