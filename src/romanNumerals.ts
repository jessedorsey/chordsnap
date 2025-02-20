// Define types for scale degrees
type ScaleDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type RomanNumeral = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII';

// Map scale degrees to Roman numerals
const ROMAN_NUMERALS: Record<ScaleDegree, RomanNumeral> = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII'
};

// Define major scale intervals (in semitones from the root)
const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];

// Get the scale degree (1-7) of a note within a key
function getScaleDegree(noteIndex: number, keyIndex: number): ScaleDegree | null {
    const relativeIndex = (noteIndex - keyIndex + 12) % 12;
    const scaleDegree = MAJOR_SCALE_INTERVALS.indexOf(relativeIndex) + 1;
    return scaleDegree as ScaleDegree || null;
}

// Convert note index to Roman numeral in the given key
function getRomanNumeral(noteIndex: number, keyIndex: number): string | null {
    const scaleDegree = getScaleDegree(noteIndex, keyIndex);
    if (!scaleDegree) return null;

    let romanNumeral = ROMAN_NUMERALS[scaleDegree];
    
    // Check if the chord is minor
    const thirdInterval = (noteIndex + 3) % 12; // Minor third
    const isMinor = getScaleDegree(thirdInterval, keyIndex) !== null;
    
    return isMinor ? romanNumeral.toLowerCase() : romanNumeral;
}

// Main function to get Roman numeral analysis of a chord
export function analyzeChordInKey(chordRoot: string, chordQuality: string, key: string): string | null {
    const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const chordRootIndex = NOTES.indexOf(chordRoot);
    const keyIndex = NOTES.indexOf(key);
    
    if (chordRootIndex === -1 || keyIndex === -1) return null;

    const romanNumeral = getRomanNumeral(chordRootIndex, keyIndex);
    if (!romanNumeral) return null;

    // Add chord quality to the Roman numeral
    let quality = '';
    switch (chordQuality) {
        case 'minor':
            // Already handled by lowercase numeral
            break;
        case 'diminished':
            quality = '°';
            break;
        case 'augmented':
            quality = '+';
            break;
        case 'major7':
            quality = 'maj7';
            break;
        case 'minor7':
            quality = '7';
            break;
        case 'dominant7':
            quality = '7';
            break;
        // Add more cases as needed
    }

    return `${romanNumeral}${quality}`;
} 