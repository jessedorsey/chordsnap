// Type definitions
export type Interval = number;
export type ChordPattern = Interval[] & {
    description?: string;
};

export interface Category {
    name: string;
    description?: string;
    chords: { [key: string]: ChordPattern };
}

export interface ChordsList {
    [category: string]: Category;
}

// Chord types and their interval patterns organized by category
export const CHORDS: ChordsList = {
    basic: {
        name: 'Basic Triads',
        chords: {
            // Major chord (root, major third, perfect fifth)
            'major': [0, 4, 7],
            // Minor chord (root, minor third, perfect fifth)
            'minor': [0, 3, 7],
            // Diminished chord (root, minor third, diminished fifth)
            'diminished': [0, 3, 6],
            // Augmented chord (root, major third, augmented fifth)
            'augmented': [0, 4, 8]
        }
    },

    suspended: {
        name: 'Suspended & Power',
        chords: {
            // Suspended second (root, major second, perfect fifth)
            'sus2': [0, 2, 7],
            // Suspended fourth (root, perfect fourth, perfect fifth)
            'sus4': [0, 5, 7],
            // Power chord (root, perfect fifth, octave)
            'power': [0, 7, 12],
            // Power chord (root, perfect fifth)
            '5': [0, 7]
        }
    },

    dominant: {
        name: 'Dominant Family',
        chords: {
            // Dominant seventh chord (root, major third, perfect fifth, minor seventh)
            'dominant7': [0, 4, 7, 10],
            // Dominant seventh with flat fifth
            'dominant7b5': [0, 4, 6, 10],
            // Dominant seventh with sharp fifth
            'dominant7#5': [0, 4, 8, 10]
        }
    },

    majorSeventh: {
        name: 'Major Seventh',
        chords: {
            // Major seventh chord
            'major7': [0, 4, 7, 11],
            // Major seventh with suspended second
            'major7sus2': [0, 2, 7, 11],
            // Major seventh with suspended fourth
            'major7sus4': [0, 5, 7, 11]
        }
    },

    minorSeventh: {
        name: 'Minor Seventh',
        chords: {
            // Minor seventh chord
            'minor7': [0, 3, 7, 10],
            // Minor major seventh
            'minorMajor7': [0, 3, 7, 11]
        }
    },

    diminishedSeventh: {
        name: 'Diminished Seventh',
        chords: {
            // Diminished seventh chord
            'diminished7': [0, 3, 6, 9],
            // Half-diminished seventh
            'half-diminished7': [0, 3, 6, 10]
        }
    },

    ninth: {
        name: 'Ninth Chords',
        chords: {
            // Major ninth chord
            'major9': [0, 4, 7, 11, 14],
            // Minor ninth chord
            'minor9': [0, 3, 7, 10, 14],
            // Dominant ninth chord
            'dominant9': [0, 4, 7, 10, 14]
        }
    },

    eleventhThirteenth: {
        name: 'Eleventh & Thirteenth',
        chords: {
            // Major eleventh chord
            'major11': [0, 4, 7, 11, 14, 17],
            // Minor eleventh chord
            'minor11': [0, 3, 7, 10, 14, 17],
            // Dominant eleventh chord
            'dominant11': [0, 4, 7, 10, 14, 17],
            // Major thirteenth chord
            'major13': [0, 4, 7, 11, 14, 17, 21],
            // Minor thirteenth chord
            'minor13': [0, 3, 7, 10, 14, 17, 21],
            // Dominant thirteenth chord
            'dominant13': [0, 4, 7, 10, 14, 17, 21]
        }
    },

    addedTone: {
        name: 'Added Tone',
        chords: {
            // Added ninth chord
            'add9': [0, 4, 7, 14],
            // Minor added ninth chord
            'madd9': [0, 3, 7, 14],
            // Added eleventh chord
            'add11': [0, 4, 7, 17],
            // Added thirteenth chord
            'add13': [0, 4, 7, 21]
        }
    },

    altered: {
        name: 'Altered',
        chords: {
            // Augmented seventh chord
            'augmented7': [0, 4, 8, 10],
            // Augmented major seventh chord
            'augmentedMajor7': [0, 4, 8, 11],
            // Major seventh flat fifth
            'maj7b5': [0, 4, 6, 11],
            // Major seventh with sharp eleventh
            'maj7#11': [0, 4, 7, 11, 18]
        }
    },

    nonTertian: {
        name: 'Non-Tertian',
        chords: {
            // Quartal chord (root, perfect fourth, augmented fourth)
            'quartal': [0, 5, 10],
            // Quintal chord (root, perfect fifth, augmented fifth)
            'quintal': [0, 7, 14],
            // Polychord (two distinct chords played together)
            'polychord': [0, 4, 7, 0, 4],
            // Whole tone scale chord
            'wholeTone': [0, 4, 8]
        }
    }
};
