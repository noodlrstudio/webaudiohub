# Contributing to WebAudio Hub

Thanks for helping grow the directory of playable Web Audio apps.

## What we're looking for

Websites that make sound with the Web Audio API in a meaningful way:

- synths and instruments
- drum machines, grooveboxes and sequencers
- modular and visual-patching environments
- live-coding tools
- browser studios and DAWs
- educational tools and playful sound toys

If it's browser-based, musical and plays without an install, it probably belongs here. Your own app is welcome.

## How to add an app

1. Fork [github.com/noodlrstudio/webaudiohub](https://github.com/noodlrstudio/webaudiohub), or open [`src/lib/data.ts`](./src/lib/data.ts) on GitHub and use the edit button, which forks for you.
2. Add an entry to the `sites` list:

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

3. Run `npm run format:data` if you can. CI checks the file's formatting.
4. Open a pull request with a line about the app.

## Fields

| Field         | Required | Notes                                                                                       |
| ------------- | -------- | ------------------------------------------------------------------------------------------- |
| `id`          | yes      | Short, unique, lowercase, hyphenated.                                                       |
| `name`        | yes      | The app's own name.                                                                         |
| `url`         | yes      | Canonical, working HTTPS URL of the playable app.                                           |
| `category`    | yes      | `drums`, `sequencer`, `synth`, `modular`, `live-coding`, `daw` or `playful`.                |
| `tags`        | yes      | Lowercase, hyphenated. Reuse existing tags where they fit. The first three show on the card. |
| `description` | yes      | One or two plain sentences on what it does. No marketing language.                          |
| `audiframe`   | no       | `'supported'` if the live app implements audiframe; `'in-development'` if it's on the way.  |

Use the `webmidi` tag if the app can use MIDI devices, and `open-source` if the source is public.

## audiframe

Listing does not require [audiframe](https://github.com/noodlrstudio/audiframe). Apps that support it get extra powers in compatible hosts such as [Noodlr Board](https://noodlr.xyz): MIDI routing, saved and recalled state, and more. The `audiframe` field is self-declared for now; conformance-tested badges will follow once the audiframe conformance runner covers each capability.

## We may decline

- apps that don't make sound with Web Audio
- broken, inaccessible or paywalled-before-playing sites
- spammy, misleading or deceptive entries
- duplicates

## Editing entries

Corrections are welcome: changed URLs, broken sites, better descriptions or tags.

## Licensing

Code contributions are licensed under the [MIT License](./LICENSE). Directory entries, descriptions and tags are licensed under [CC BY 4.0](./LICENSE-DATA).

## Be decent

Be respectful, constructive and clear. Thanks for helping.
