const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const START_OCTAVE = 0;
const END_OCTAVE = 8;

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