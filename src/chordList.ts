import { CHORDS } from './chords';


export let currentRootNote = 'C';  // Default to C
export let showWithRootNote = true; // Default to showing root note

// Format chord name for display
export function formatChordName(chordName: string): string {
    if (showWithRootNote) {
    return chordName
        .replace('major', 'maj')
        .replace('minor', 'm')
        .replace('diminished', 'dim')
        .replace('augmented', 'aug')
        .replace('dominant', '')
        .replace('half-diminished', 'ø')
        .trim();
    } else {
        return chordName;
    }
}



export function initializeChordList() {
    const container = document.getElementById('chord-categories');
    if (!container) return;

    // Clear existing categories
    container.innerHTML = '';

    // Create and append chord categories in a musically logical order
    Object.entries(CHORDS).forEach(([categoryId, category]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'chord-category';
        
        const title = document.createElement('h3');
        title.textContent = category.name;
        if (category.description) {
            title.title = category.description;
        }
        categoryDiv.appendChild(title);

        Object.entries(category.chords).forEach(([chordName, chord]) => {
            const chordDiv = document.createElement('div');
            chordDiv.className = 'chord-item';
            chordDiv.dataset.chordType = chordName;
            const formattedName = formatChordName(chordName);
            updateChordDisplay(chordDiv, formattedName);
            
            // Add tooltip with chord description
            if (chord.description) {
                chordDiv.title = chord.description;
            }
            
            categoryDiv.appendChild(chordDiv);
        });

        container.appendChild(categoryDiv);
    });

    // Set up the root note display toggle
    const showRootNoteCheckbox = document.getElementById('showrootnote') as HTMLInputElement;
    if (showRootNoteCheckbox) {
        showRootNoteCheckbox.checked = showWithRootNote;
        showRootNoteCheckbox.addEventListener('change', (e) => {
            showWithRootNote = (e.target as HTMLInputElement).checked;
            updateAllChordDisplays();
        });
    }
}

function updateChordDisplay(chordDiv: HTMLElement, formattedName: string) {
    if (showWithRootNote) {
        chordDiv.innerHTML = `<span class="root-note">${currentRootNote}</span>${formattedName}`;
    } else {
        chordDiv.innerHTML = formattedName;
    }
}

function updateAllChordDisplays() {
    const chordItems = document.querySelectorAll('.chord-item');
    chordItems.forEach(item => {
        const chordType = (item as HTMLElement).dataset.chordType;
        if (chordType) {
            updateChordDisplay(item as HTMLElement, formatChordName(chordType));
        }
    });
}

// Update the active chord in the list
export function updateChordList(detectedChord: string | null) {
    const chordItems = document.querySelectorAll('.chord-item');
    chordItems.forEach(item => {
        const chordType = (item as HTMLElement).dataset.chordType;
        if (!chordType) return;

        // No chord detected, remove highlight
        if (!detectedChord) {
            item.classList.remove('active');
            return;
        }

        // Format the chord type for comparison
        const formattedType = formatChordName(chordType);
        
        // Split detected chord into parts (e.g., "Cmajor/E" -> ["Cmajor", "E"])
        const [detectedFull] = detectedChord.split('/');
        
        // Remove root note (e.g., "Cmajor" -> "major")
        const detectedQuality = detectedFull.replace(/^[A-G]#?/, '');
        
        // Format the detected quality for comparison
        const formattedDetectedQuality = formatChordName(detectedQuality);
        
        // Compare the formatted versions
        const isMatch = formattedDetectedQuality === formattedType;
        item.classList.toggle('active', isMatch);
    });
}

// Add this new function to update the root note
export function updateRootNote(note: string) {
    currentRootNote = note;
    if (showWithRootNote) {
        updateAllChordDisplays();
    }
} 