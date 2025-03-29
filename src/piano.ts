/**
 * ScreenPiano
 * 
 * Just a simple piano display. Eventually we will make it playable with a traditional keyboard.
 * 
 * @version 1.0
 * @since 2025-03-24
 */

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const START_OCTAVE = 0;
const END_OCTAVE = 8;

interface PianoKey {
    [note: string]: {
        element: HTMLElement;
        note: number;
        isBlack: boolean;
    }
}

// Add these at the top level
const audioContext = new AudioContext();
const activeOscillators: Map<number, OscillatorNode> = new Map();

class ScreenPiano {
    private piano: HTMLElement;
    private keys: PianoKey;
    // private keyCount: number;

    constructor() {
        this.piano = document.getElementById('piano') as HTMLElement;
        this.keys = {};
    }

    private createPiano() {
        this.piano.innerHTML = '';

        for (let octave = START_OCTAVE; octave <= END_OCTAVE; octave++) {
            for (let noteIndex = 0; noteIndex < NOTES.length; noteIndex++) {
                
            }
        }
    }
}

export function createPiano() {
    const piano = document.getElementById('piano');
    if (!piano) return;

    piano.innerHTML = '';

    // Create keys from A0 to C8
    let keyCount = 0;
    for (let octave = START_OCTAVE; octave <= END_OCTAVE; octave++) {
        // For octave 0, start from A
        const startIndex = octave === 0 ? 9 : 0;
        // For octave 8, end at C
        const endIndex = octave === 8 ? 0 : 11;

        for (let noteIndex = startIndex; noteIndex <= endIndex; noteIndex++) {
            const note = NOTES[noteIndex];
            const isBlack = note.includes('#');
            const keyElement = document.createElement('div');
            
            const noteWithOctave = `${note}${octave}`;
            keyElement.dataset.note = noteWithOctave;
            
            if (isBlack) {
                keyElement.className = 'black-key key';
                const offset = getBlackKeyOffset(noteIndex);
                keyElement.style.left = `${keyCount * 40 - 12}px`;
            } else {
                keyElement.className = 'white-key key';
                keyCount++;
            }

            piano.appendChild(keyElement);
        }
    }

    // Set piano width based on number of white keys (52 white keys in 88-key piano)
    piano.style.width = `${52 * 40}px`;
}

function getBlackKeyOffset(noteIndex: number): number {
    // Calculate the offset for black keys based on their position
    const whiteKeyWidth = 40;
    switch (noteIndex) {
        case 1: // C#
            return whiteKeyWidth - 12;
        case 3: // D#
            return whiteKeyWidth - 12;
        case 6: // F#
            return whiteKeyWidth - 12;
        case 8: // G#
            return whiteKeyWidth - 12;
        case 10: // A#
            return whiteKeyWidth - 12;
        default:
            return 0;
    }
}

// Update the active keys
export function updatePianoKeys(activeNotes: number[]) {
    // Remove all active classes first
    document.querySelectorAll('.key').forEach(key => {
        key.classList.remove('active');
    });

    // Add active class to pressed keys
    activeNotes.forEach(midiNote => {
        const noteName = getNoteNameFromMidi(midiNote);
        if (noteName) {
            const key = document.querySelector(`[data-note="${noteName}"]`);
            if (key) {
                key.classList.add('active');
            }
        }
    });
}

// Convert MIDI note number to note name with octave
function getNoteNameFromMidi(midiNote: number): string | null {
    // MIDI note 21 is A0, 108 is C8
    if (midiNote < 21 || midiNote > 108) return null;
    
    const noteName = NOTES[midiNote % 12];
    const octave = Math.floor(midiNote / 12) - 1;
    return `${noteName}${octave}`;
}

// Add this function to create and play a note
function playNote(midiNote: number): void {
    const frequency = 440 * Math.pow(2, (midiNote - 69) / 12);
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.setTargetAtTime(0, audioContext.currentTime + 0.1, 0.015);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    activeOscillators.set(midiNote, oscillator);
    
    // Stop and remove oscillator after decay
    setTimeout(() => {
        oscillator.stop();
        oscillator.disconnect();
        activeOscillators.delete(midiNote);
    }, 1000);
}

// Add this function to stop a note
function stopNote(midiNote: number): void {
    const oscillator = activeOscillators.get(midiNote);
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        activeOscillators.delete(midiNote);
    }
}

// Export these functions
export { playNote, stopNote }; 