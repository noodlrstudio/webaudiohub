# WebAudio Hub

[WebAudio Hub](https://noodlrstudio.github.io/webaudiohub/) is a curated, community-driven directory of playable **Web Audio** apps: synths, drum machines, sequencers, modular patchers, live-coding environments and sound toys that run in a browser with nothing to install.

It is one part of an open web audio ecosystem from **noodlr studio**:

| Part                                                         | Job                                                                                                             |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **WebAudio Hub** (this repo)                                 | Discover and curate playable Web Audio apps.                                                                    |
| **[audiframe](https://github.com/noodlrstudio/audiframe)**   | Open, host-neutral protocol that lets web music apps talk to the hosts that embed them (MIDI, state, clock, parameters). |
| **[Noodlr Board](https://noodlr.xyz)**                       | Collaborative host for playing web instruments together. Loads any listed app, and gives audiframe apps extra powers. |

The Hub is open by design: a listing does **not** require audiframe, and audiframe is not tied to Noodlr.

## What belongs here

Useful, interesting and working websites that make sound with the Web Audio API, including:

- synths and instruments
- drum machines, grooveboxes and sequencers
- modular and visual-patching environments
- live-coding tools
- browser studios and DAWs
- educational tools and playful sound toys

Apps should be free to try, publicly reachable and stable.

## Add an app

The directory lives in [`src/lib/data.ts`](./src/lib/data.ts). To add an app, open a pull request with an entry like this:

```ts
{
  id: 'your-app',
  name: 'Your App',
  url: 'https://example.com/',
  category: 'synth',
  tags: ['fm', 'webmidi'],
  description: 'One plain sentence about what it does.',
},
```

- `category` is one of `drums`, `sequencer`, `synth`, `modular`, `live-coding`, `daw` or `playful`.
- `audiframe` is optional. Set it to `'supported'` if the live app implements [audiframe](https://github.com/noodlrstudio/audiframe), or `'in-development'` if an integration is on the way.
- Run `npm run format:data` before committing. CI checks the formatting.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guidelines.

## Develop

```sh
npm install
npm run dev               # http://localhost:3000
npm run check             # type-check
npm run generate:previews # optional: screenshots of each app (needs `npx playwright install chromium`)
npm run build
```

The site is a Svelte 5 + Vite single-page app. Pushes to `main` build and deploy to GitHub Pages, including fresh screenshots of every listed app. The design brief is in [docs/design-brief.md](./docs/design-brief.md).

## License

- **Code** is licensed under the [MIT License](./LICENSE).
- **Directory content and data** are licensed under [CC BY 4.0](./LICENSE-DATA).

Listed apps belong to their makers and are not affiliated with noodlr studio unless stated. Looking for WebMIDI tools? See [MIDIWeb Hub](https://github.com/5of12/MIDIWeb-Hub), which this project follows in spirit and structure.

© noodlr studio ltd.
