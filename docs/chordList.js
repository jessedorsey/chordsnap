import { CHORD_TYPES, ChordCategory } from './chords';
// Helper function to get chord category
function getChordCategory(chordName) {
    if (chordName.includes('7') && !chordName.includes('maj'))
        return ChordCategory.Seventh;
    if (chordName.includes('9') || chordName.includes('11') || chordName.includes('13'))
        return ChordCategory.Extended;
    if (chordName.includes('add'))
        return ChordCategory.AddedTone;
    if (chordName.includes('6'))
        return ChordCategory.Sixth;
    if (['major', 'minor', 'diminished', 'augmented', 'sus2', 'sus4'].includes(chordName))
        return ChordCategory.Triad;
    return ChordCategory.Other;
}
// Format chord name for display
function formatChordName(chordName) {
    // Convert internal chord name to display format
    const chordDisplayName = chordName
        // Handle special cases first
        .replace('major', 'maj')
        .replace('minor', 'm')
        .replace('diminished', 'dim')
        .replace('augmented', 'aug')
        .replace('dominant', '')
        .replace('half-diminished', 'ø')
        // Clean up any double spaces
        .trim();
    // Add example with C as root
    return `${chordDisplayName.charAt(0).toUpperCase() + chordDisplayName.slice(1)} (C${chordDisplayName})`;
}
export function initializeChordList() {
    const container = document.getElementById('chord-categories');
    if (!container)
        return;
    // Group chords by category
    const chordsByCategory = Object.entries(CHORD_TYPES).reduce((acc, [name, pattern]) => {
        const category = getChordCategory(name);
        if (!acc[category])
            acc[category] = [];
        acc[category].push(name);
        return acc;
    }, {});
    // Create and append chord categories
    const categories = [
        ChordCategory.Triad,
        ChordCategory.Seventh,
        ChordCategory.Extended,
        ChordCategory.AddedTone,
        ChordCategory.Sixth
    ];
    categories.forEach(category => {
        if (!chordsByCategory[category])
            return;
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'chord-category';
        const title = document.createElement('h3');
        title.textContent = category;
        categoryDiv.appendChild(title);
        chordsByCategory[category].forEach(chordName => {
            const chordDiv = document.createElement('div');
            chordDiv.className = 'chord-item';
            chordDiv.textContent = formatChordName(chordName);
            categoryDiv.appendChild(chordDiv);
        });
        container.appendChild(categoryDiv);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    initializeChordList();
    // ... rest of your initialization code ...
});
