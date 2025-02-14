# MIDI Chord Detector

A web-based MIDI chord detector that identifies chords from MIDI input in real-time. Built with TypeScript and the Web MIDI API.

## Features

- Real-time chord detection from MIDI input
- Supports a wide variety of chords (triads, seventh chords, extended chords)
- Detects chord inversions
- Clean, modern interface
- Works in Chrome, Edge, and Opera

## Try It Out

Visit the live demo: https://YOUR_USERNAME.github.io/YOUR_REPO/

## Requirements

- A modern web browser that supports the Web MIDI API (Chrome, Edge, or Opera)
- A MIDI device (keyboard, controller, etc.)

## Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## Deployment

The project is set up to deploy to GitHub Pages from the `docs` folder. To deploy:

1. Update the GitHub repository URL in both `index.html` and `docs/index.html`
2. Run the deploy script:

   ```bash
   npm run deploy
   ```

3. Go to your repository settings on GitHub:
   - Navigate to "Settings" > "Pages"
   - Set the source to "Deploy from a branch"
   - Select the "main" branch and "/docs" folder
   - Click "Save"

## Supported Chord Types

- Triads: major, minor, diminished, augmented, sus2, sus4
- Seventh chords: major7, minor7, dominant7, diminished7, half-diminished7
- Extended chords: 9th, 11th
- Added tone chords: add9, add11
- Sixth chords: major6, minor6
- Other: power chords (5), 6/9

## License

MIT
# priv_chordteach
# priv_chordteach
