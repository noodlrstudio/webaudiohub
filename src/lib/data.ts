import type { Site } from './types';

export const sites: Site[] = [
  {
    id: 'pulse',
    name: 'Pulse',
    url: 'https://5of12.co.uk/Pulse/',
    category: 'drums',
    tags: ['drum-machine', 'patterns'],
    description:
      'Pattern-based drum machine by Chris Thomaidis. The reference app for the audiframe protocol.',
    audiframe: 'in-development',
  },
  {
    id: 'drumbit',
    name: 'Drumbit',
    url: 'https://drumbit.app',
    category: 'drums',
    tags: ['drum-machine', 'step-sequencer', 'recording'],
    description:
      'Drum machine with swappable kits, saved patterns and audio recording.',
  },
  {
    id: 'acid-machine',
    name: 'Acid Machine',
    url: 'https://errozero.co.uk/acid-machine/',
    category: 'drums',
    tags: ['groovebox', 'acid', 'bassline', 'step-sequencer'],
    description:
      'Two acid basslines and a drum machine in one groovebox, built for squelchy loops.',
  },
  {
    id: 'online-sequencer',
    name: 'Online Sequencer',
    url: 'https://onlinesequencer.net',
    category: 'sequencer',
    tags: ['piano-roll', 'composition', 'sharing'],
    description:
      'Piano-roll sequencer for writing songs and sharing them with a link.',
  },
  {
    id: 'beepbox',
    name: 'BeepBox',
    url: 'https://beepbox.co',
    category: 'sequencer',
    tags: ['chiptune', 'composition', 'sharing', 'open-source'],
    description:
      'Pattern-based song sketcher with a chiptune flavour. The whole song lives in the URL.',
  },
  {
    id: 'song-maker',
    name: 'Song Maker',
    url: 'https://musiclab.chromeexperiments.com/Song-Maker/',
    category: 'sequencer',
    tags: ['grid', 'education', 'composition'],
    description:
      'Paint notes and beats on a grid. Part of Chrome Music Lab, made for first-time music makers.',
  },
  {
    id: 'groove-pizza',
    name: 'Groove Pizza',
    url: 'https://apps.musedlab.org/groovepizza/',
    category: 'sequencer',
    tags: ['rhythm', 'education', 'circular'],
    description:
      'Build rhythms on a circle and see the geometry inside familiar grooves.',
  },
  {
    id: 'viktor-nv1',
    name: 'Viktor NV-1',
    url: 'https://nicroto.github.io/viktor/',
    category: 'synth',
    tags: ['subtractive', 'webmidi', 'open-source'],
    description:
      'Three-oscillator subtractive synth with filter, envelopes and MIDI keyboard support.',
  },
  {
    id: 'dx7-synth-js',
    name: 'DX7 Synth JS',
    url: 'https://mmontag.github.io/dx7-synth-js/',
    category: 'synth',
    tags: ['fm', 'webmidi', 'open-source', 'emulation'],
    description:
      'DX7-style FM synthesis in the browser, with patch banks and MIDI input.',
  },
  {
    id: '106-js',
    name: '106.js',
    url: 'https://juno-106.js.org/',
    category: 'synth',
    tags: ['analog', 'emulation', 'polysynth'],
    description: 'A playable take on the classic Juno-106 polysynth.',
  },
  {
    id: 'websynths',
    name: 'WebSynths',
    url: 'https://www.websynths.com/',
    category: 'synth',
    tags: ['collection', 'microtonal', 'instruments'],
    description:
      'A free collection of browser instruments, including microtonal tunings.',
  },
  {
    id: 'learning-synths',
    name: 'Learning Synths',
    url: 'https://learningsynths.ableton.com',
    category: 'synth',
    tags: ['education', 'playground'],
    description:
      "Ableton's interactive guide to synthesis, with a synth you can play on every page.",
  },
  {
    id: 'webmodular',
    name: 'WebModular',
    url: 'https://www.g200kg.com/docs/webmodular/',
    category: 'modular',
    tags: ['patching', 'analog', 'classic'],
    description:
      'Patch-cable modular synth that has been running in browsers since the early days of Web Audio.',
  },
  {
    id: 'noisecraft',
    name: 'NoiseCraft',
    url: 'https://noisecraft.app',
    category: 'modular',
    tags: ['patching', 'visual-programming', 'webmidi', 'open-source'],
    description:
      'Open-source visual programming for sound, with a library of shared projects.',
  },
  {
    id: 'web-synth',
    name: 'web-synth',
    url: 'https://synth.ameo.dev',
    category: 'modular',
    tags: ['wasm', 'patching', 'open-source', 'experimental'],
    description:
      'Rust and WebAssembly synthesis environment with a graph editor, effects and synths.',
  },
  {
    id: 'strudel',
    name: 'Strudel',
    url: 'https://strudel.cc',
    category: 'live-coding',
    tags: ['tidalcycles', 'patterns', 'open-source'],
    description:
      'Live-code music with TidalCycles patterns, straight from the browser.',
  },
  {
    id: 'glicol',
    name: 'Glicol',
    url: 'https://glicol.org',
    category: 'live-coding',
    tags: ['graph', 'wasm', 'open-source'],
    description:
      'Graph-oriented live-coding language that runs on WebAssembly and Web Audio.',
  },
  {
    id: 'audiotool',
    name: 'Audiotool',
    url: 'https://www.audiotool.com',
    category: 'daw',
    tags: ['production', 'community', 'collaboration'],
    description:
      'Full music studio in the browser, with a community of shared tracks and presets.',
  },
  {
    id: 'patatap',
    name: 'Patatap',
    url: 'https://patatap.com',
    category: 'playful',
    tags: ['keyboard', 'animation', 'audiovisual'],
    description: 'Press any key for a sound and an animation. Then keep going.',
  },
  {
    id: 'blob-opera',
    name: 'Blob Opera',
    url: 'https://artsandculture.google.com/experiment/blob-opera/AAHWrq360NcGbw',
    category: 'playful',
    tags: ['voice', 'machine-learning', 'harmony'],
    description:
      'Conduct four singing blobs. Machine learning fills in the harmony.',
  },
];
