declare namespace WebMidi {
    interface MIDIOptions {
        sysex?: boolean;
        software?: boolean;
    }

    interface MIDIAccess {
        inputs: MIDIInputMap;
        outputs: MIDIOutputMap;
        sysexEnabled: boolean;
        onstatechange: ((this: MIDIAccess, ev: MIDIConnectionEvent) => any) | null;
    }

    interface MIDIInputMap extends Map<string, MIDIInput> {}
    interface MIDIOutputMap extends Map<string, MIDIOutput> {}

    interface MIDIInput extends MIDIPort {
        onmidimessage: ((this: MIDIInput, ev: MIDIMessageEvent) => any) | null;
    }

    interface MIDIOutput extends MIDIPort {
        send(data: number[], timestamp?: number): void;
    }

    interface MIDIPort extends EventTarget {
        id: string;
        manufacturer?: string;
        name?: string;
        type: MIDIPortType;
        version?: string;
        state: MIDIPortDeviceState;
        connection: MIDIPortConnectionState;
        onstatechange: ((this: MIDIPort, ev: MIDIConnectionEvent) => any) | null;
        open(): Promise<MIDIPort>;
        close(): Promise<MIDIPort>;
    }

    type MIDIPortType = 'input' | 'output';
    type MIDIPortDeviceState = 'disconnected' | 'connected';
    type MIDIPortConnectionState = 'open' | 'closed' | 'pending';

    interface MIDIMessageEvent extends Event {
        data: Uint8Array;
    }

    interface MIDIConnectionEvent extends Event {
        port: MIDIPort;
    }
}

interface Navigator {
    requestMIDIAccess(options?: WebMidi.MIDIOptions): Promise<WebMidi.MIDIAccess>;
} 