import { CHORD_TYPES } from './chords.js';
// Constants
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const START_OCTAVE = 3;
const NUM_OCTAVES = 3;
// State
const activeNotes = new Set();
const pianoKeys = [];
// Piano setup
function createPiano() {
    const piano = document.getElementById('piano');
    if (!piano)
        return;
    for (let octave = START_OCTAVE; octave < START_OCTAVE + NUM_OCTAVES; octave++) {
        for (let i = 0; i < 12; i++) {
            const note = octave * 12 + i;
            const isBlack = NOTES[i].includes('#');
            const key = document.createElement('div');
            key.className = isBlack ? 'black-key key' : 'white-key key';
            key.dataset.note = note.toString();
            if (isBlack) {
                key.style.left = `${(i - 0.5) * 40 + (octave - START_OCTAVE) * 40 * 7}px`;
            }
            else {
                piano.appendChild(key);
            }
            pianoKeys.push({ element: key, note });
        }
        // Add black keys after white keys to ensure proper z-index
        for (let i = 0; i < 12; i++) {
            const note = octave * 12 + i;
            const isBlack = NOTES[i].includes('#');
            if (isBlack) {
                const key = pianoKeys.find(k => k.note === note)?.element;
                if (key)
                    piano.appendChild(key);
            }
        }
    }
}
// Update piano visualization
function updatePianoKeys() {
    pianoKeys.forEach(({ element, note }) => {
        element.classList.toggle('active', activeNotes.has(note));
    });
}
// Update chord list highlighting
function updateChordList(detectedChord) {
    const chordItems = document.querySelectorAll('.chord-item');
    chordItems.forEach(item => {
        const chordText = item.textContent || '';
        const chordName = chordText.split(' (')[1]?.replace(')', '');
        item.classList.toggle('active', detectedChord === chordName);
    });
}
// Convert MIDI note number to note name
function getNoteNameFromMIDI(midiNote) {
    const noteName = NOTES[midiNote % 12];
    const octave = Math.floor(midiNote / 12) - 1;
    return `${noteName}${octave}`;
}
// Get all possible rotations of intervals
function getAllRotations(intervals) {
    const rotations = [];
    const len = intervals.length;
    for (let i = 0; i < len; i++) {
        const rotation = [];
        for (let j = 0; j < len; j++) {
            const idx = (i + j) % len;
            rotation.push((intervals[idx] - intervals[i] + 12) % 12);
        }
        rotations.push(rotation.sort((a, b) => a - b));
    }
    return rotations;
}
// Get intervals between notes
function getIntervals(notes) {
    const sortedNotes = Array.from(notes).sort((a, b) => a - b);
    const intervals = [];
    const baseNote = sortedNotes[0] % 12;
    for (let i = 0; i < sortedNotes.length; i++) {
        const interval = (sortedNotes[i] % 12 - baseNote + 12) % 12;
        if (!intervals.includes(interval)) {
            intervals.push(interval);
        }
    }
    return intervals.sort((a, b) => a - b);
}
// Find bass note (lowest note)
function findBassNote(notes) {
    return Math.min(...Array.from(notes));
}
// Detect chord from intervals
function detectChord(notes) {
    if (notes.size < 2)
        return null;
    const intervals = getIntervals(notes);
    const bassNote = NOTES[findBassNote(notes) % 12];
    const rotations = getAllRotations(intervals);
    // Try to match each rotation against known chord types
    for (const rotation of rotations) {
        for (const [type, pattern] of Object.entries(CHORD_TYPES)) {
            if (pattern.length === rotation.length) {
                const matches = rotation.every((interval, i) => interval === pattern[i]);
                if (matches) {
                    // If the bass note is not the root note, it's an inversion
                    const rootNote = NOTES[(findBassNote(notes) - rotation[0] + 12) % 12];
                    if (rootNote !== bassNote) {
                        return `${rootNote}${type}/${bassNote}`;
                    }
                    return `${rootNote}${type}`;
                }
            }
        }
    }
    // If no exact match found, try to identify partial matches
    if (intervals.length >= 3) {
        // Check if it might be an extended or altered chord
        const hasThird = intervals.some(i => i === 3 || i === 4);
        const hasFifth = intervals.includes(7);
        const hasSeventh = intervals.some(i => i === 10 || i === 11);
        if (hasThird && hasFifth) {
            const isMinor = intervals.includes(3);
            const chordQuality = isMinor ? 'minor' : 'major';
            const extensions = [];
            if (hasSeventh) {
                extensions.push('7');
            }
            if (intervals.includes(9) || intervals.includes(14)) {
                extensions.push('9');
            }
            if (intervals.includes(11) || intervals.includes(17)) {
                extensions.push('11');
            }
            if (extensions.length > 0) {
                return `${bassNote}${chordQuality}(${extensions.join(',')})`;
            }
        }
    }
    return 'Unknown';
}
// Update the display
function updateDisplay() {
    const chord = detectChord(activeNotes);
    const chordDisplay = document.getElementById('chord-display');
    if (chordDisplay) {
        chordDisplay.textContent = chord || '-';
    }
    const noteNames = Array.from(activeNotes)
        .map(note => getNoteNameFromMIDI(note))
        .join(', ');
    const activeNotesDisplay = document.getElementById('active-notes');
    if (activeNotesDisplay) {
        activeNotesDisplay.textContent = noteNames;
    }
    updatePianoKeys();
    updateChordList(chord);
}
// Initialize MIDI
function initializeMIDI() {
    navigator.requestMIDIAccess()
        .then((access) => {
        const statusDisplay = document.getElementById('status');
        if (statusDisplay) {
            statusDisplay.textContent = 'MIDI ready! Play some notes...';
        }
        access.inputs.forEach((input) => {
            input.onmidimessage = (message) => {
                const data = Array.from(message.data);
                const [command, note, velocity] = data;
                // Note on with velocity > 0
                if (command === 144 && velocity > 0) {
                    activeNotes.add(note);
                    updateDisplay();
                }
                // Note off or note on with velocity 0
                else if (command === 128 || (command === 144 && velocity === 0)) {
                    activeNotes.delete(note);
                    updateDisplay();
                }
            };
        });
    })
        .catch((error) => {
        const statusDisplay = document.getElementById('status');
        const noMidiDisplay = document.getElementById('no-midi');
        if (statusDisplay) {
            statusDisplay.textContent =
                'Error accessing MIDI. Please ensure you\'re using a compatible browser (like Chrome) and have allowed MIDI access.';
        }
        if (noMidiDisplay) {
            noMidiDisplay.classList.add('show');
        }
        console.error('MIDI Access Error:', error);
    });
}
// Initialize the application
function initialize() {
    createPiano();
    initializeMIDI();
}
// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initialize);
