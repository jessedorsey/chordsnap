// Chord categories for better organization
export var ChordCategory;
(function (ChordCategory) {
    ChordCategory["Triad"] = "Triad";
    ChordCategory["Seventh"] = "Seventh";
    ChordCategory["Extended"] = "Extended";
    ChordCategory["AddedTone"] = "AddedTone";
    ChordCategory["Sixth"] = "Sixth";
    ChordCategory["Other"] = "Other";
})(ChordCategory || (ChordCategory = {}));
// Chord types and their interval patterns
export const CHORD_TYPES = {
    // Triads
    'major': [0, 4, 7], // Major chord (root, major third, perfect fifth)
    'minor': [0, 3, 7], // Minor chord (root, minor third, perfect fifth)
    'diminished': [0, 3, 6], // Diminished chord (root, minor third, diminished fifth)
    'augmented': [0, 4, 8], // Augmented chord (root, major third, augmented fifth)
    'sus2': [0, 2, 7], // Suspended second (root, major second, perfect fifth)
    'sus4': [0, 5, 7], // Suspended fourth (root, perfect fourth, perfect fifth)
    'augmented7sus4': [0, 4, 7, 10, 5], // Augmented seventh with suspended fourth (root, major third, perfect fifth, minor seventh, suspended fourth)
    // Seventh chords
    'major7': [0, 4, 7, 11], // Major seventh chord (root, major third, perfect fifth, major seventh)
    'minor7': [0, 3, 7, 10], // Minor seventh chord (root, minor third, perfect fifth, minor seventh)
    'dominant7': [0, 4, 7, 10], // Dominant seventh chord (root, major third, perfect fifth, minor seventh)
    'diminished7': [0, 3, 6, 9], // Diminished seventh chord (root, minor third, diminished fifth, diminished seventh)
    'half-diminished7': [0, 3, 6, 10], // Half-diminished seventh (root, minor third, diminished fifth, minor seventh)
    'minorMajor7': [0, 3, 7, 11], // Minor major seventh (root, minor third, perfect fifth, major seventh)
    'augmented7': [0, 4, 8, 10], // Augmented seventh chord (root, major third, augmented fifth, minor seventh)
    'augmentedMajor7': [0, 4, 8, 11], // Augmented major seventh chord (root, major third, augmented fifth, major seventh)
    'major7sus2': [0, 2, 7, 11], // Major seventh with suspended second (root, major second, perfect fifth, major seventh)
    'major7sus4': [0, 5, 7, 11], // Major seventh with suspended fourth (root, perfect fourth, perfect fifth, major seventh)
    'dominant7b5': [0, 4, 6, 10], // Dominant seventh with flat fifth (root, major third, diminished fifth, minor seventh)
    'dominant7#5': [0, 4, 8, 10], // Dominant seventh with sharp fifth (root, major third, augmented fifth, minor seventh)
    // Extended chords
    'major9': [0, 4, 7, 11, 14], // Major ninth chord (root, major third, perfect fifth, major seventh, major ninth)
    'minor9': [0, 3, 7, 10, 14], // Minor ninth chord (root, minor third, perfect fifth, minor seventh, major ninth)
    'dominant9': [0, 4, 7, 10, 14], // Dominant ninth chord (root, major third, perfect fifth, minor seventh, major ninth)
    'major11': [0, 4, 7, 11, 14, 17], // Major eleventh chord (root, major third, perfect fifth, major seventh, major ninth, perfect eleventh)
    'minor11': [0, 3, 7, 10, 14, 17], // Minor eleventh chord (root, minor third, perfect fifth, minor seventh, major ninth, perfect eleventh)
    'dominant11': [0, 4, 7, 10, 14, 17], // Dominant eleventh chord (root, major third, perfect fifth, minor seventh, major ninth, perfect eleventh)
    'major13': [0, 4, 7, 11, 14, 17, 21], // Major thirteenth chord (root, major third, perfect fifth, major seventh, major ninth, perfect eleventh, major thirteenth)
    'minor13': [0, 3, 7, 10, 14, 17, 21], // Minor thirteenth chord (root, minor third, perfect fifth, minor seventh, major ninth, perfect eleventh, major thirteenth)
    'dominant13': [0, 4, 7, 10, 14, 17, 21], // Dominant thirteenth chord (root, major third, perfect fifth, minor seventh, major ninth, perfect eleventh, major thirteenth)
    'sus9': [0, 2, 7, 10, 14], // Suspended ninth chord (root, major second, perfect fifth, minor seventh, major ninth)
    // Added tone chords
    'add9': [0, 4, 7, 14], // Added ninth chord (root, major third, perfect fifth, major ninth)
    'madd9': [0, 3, 7, 14], // Minor added ninth chord (root, minor third, perfect fifth, major ninth)
    'add11': [0, 4, 7, 17], // Added eleventh chord (root, major third, perfect fifth, perfect eleventh)
    'add13': [0, 4, 7, 21], // Added thirteenth chord (root, major third, perfect fifth, major thirteenth)
    // Sixth chords
    'major6': [0, 4, 7, 9], // Major sixth chord (root, major third, perfect fifth, major sixth)
    'minor6': [0, 3, 7, 9], // Minor sixth chord (root, minor third, perfect fifth, major sixth)
    'dominant6': [0, 4, 7, 9], // Dominant sixth chord (same as major sixth)
    'minor6add9': [0, 3, 7, 9, 14], // Minor sixth with added ninth (root, minor third, perfect fifth, major sixth, major ninth)
    // Other combinations
    '5': [0, 7], // Power chord (root, perfect fifth)
    '6/9': [0, 4, 7, 9, 14], // Six nine chord (root, major third, perfect fifth, major sixth, major ninth)
    'power': [0, 7, 12], // Octave chord (often used in rock and metal)
    'augmented9': [0, 4, 8, 10, 14], // Augmented ninth chord (root, major third, augmented fifth, minor seventh, major ninth)
    'diminished9': [0, 3, 6, 9, 14], // Diminished ninth chord (root, minor third, diminished fifth, diminished seventh, major ninth)
    'maj7b5': [0, 4, 7, 10], // Major seventh flat fifth (root, major third, perfect fifth, minor seventh)
    'dim7b9': [0, 3, 6, 9, 14], // Diminished seventh with flat ninth (root, minor third, diminished fifth, diminished seventh, major ninth)
    'maj7#11': [0, 4, 7, 11, 18], // Major seventh with sharp eleventh (root, major third, perfect fifth, major seventh, sharp eleventh)
    'maj9sus4': [0, 5, 7, 11, 14], // Major ninth with suspended fourth (root, perfect fourth, perfect fifth, major seventh, major ninth)
    'm7sus4': [0, 5, 7, 10], // Minor seventh with suspended fourth (root, perfect fourth, perfect fifth, minor seventh)
    'dim6': [0, 3, 6, 9], // Diminished sixth chord (root, minor third, diminished fifth, diminished sixth)
    // Additional Chords
    'sus6': [0, 5, 7, 9], // Suspended sixth chord (root, perfect fourth, perfect fifth, major sixth)
    'dominant7b9#13': [0, 4, 7, 10, 13], // Dominant seventh with flat ninth and sharp thirteenth (root, major third, perfect fifth, minor seventh, flat ninth, sharp thirteenth)
    'major7#5': [0, 4, 8, 11], // Major seventh with sharp fifth (root, major third, augmented fifth, major seventh)
    'major7b5': [0, 4, 7, 10], // Major seventh with flat fifth (root, major third, perfect fifth, minor seventh)
    'wholeTone': [0, 4, 8], // Whole tone scale chord (root, major second, augmented fourth)
    'dim9': [0, 3, 6, 9], // Diminished ninth chord (root, minor third, diminished fifth, diminished ninth)
    'minor7b5': [0, 3, 6, 10], // Minor seventh chord with flat fifth (root, minor third, diminished fifth, minor seventh)
    'major6/9': [0, 4, 7, 9, 14], // Major sixth/ninth chord (root, major third, perfect fifth, major sixth, major ninth)
    'polychord': [0, 4, 7, 0, 4], // Polychord (two distinct chords played together, here using two major chords)
    'quartal': [0, 5, 10], // Quartal chord (root, perfect fourth, augmented fourth)
    'quintal': [0, 7, 14], // Quintal chord (root, perfect fifth, augmented fifth)
    'augmented6': [0, 4, 8, 11], // Augmented sixth chord (root, major third, augmented fifth, augmented sixth)
    'maj7#13': [0, 4, 7, 11, 21], // Major seventh with sharp thirteenth (root, major third, perfect fifth, major seventh, sharp thirteenth)
    'm7b9': [0, 3, 7, 10, 13], // Minor seventh with flat ninth (root, minor third, perfect fifth, minor seventh, flat ninth)
};
