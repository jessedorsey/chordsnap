export interface Options {
    showChords: boolean;
    showPiano: boolean;
    showProgression: boolean;
    showRootNote: boolean;
}

export const defaultOptions: Options = {
    showChords: true,
    showPiano: true,
    showProgression: true,
    showRootNote: true,
};

export function initializeOptions() {
    const options = { ...defaultOptions };
    
    // Set initial checkbox states
    Object.entries(options).forEach(([key, value]) => {
        const checkbox = document.getElementById(key.toLowerCase()) as HTMLInputElement;
        if (checkbox) {
            checkbox.checked = value;
        }
    });

    return options;
} 