<script lang="ts">
  import type { Site } from '../types';
  import { hostOf } from '../utils';

  let {
    next,
    count,
    onroll,
  }: { next: Site | undefined; count: number; onroll: () => void } = $props();

  let pressed = $state(false);

  function press() {
    pressed = true;
    setTimeout(() => (pressed = false), 260);
    // Let the link open the current pick first, then queue the next one.
    setTimeout(onroll, 0);
  }
</script>

<section class="faceplate" aria-labelledby="site-title">
  <div class="wrap grid">
    <div class="intro">
      <h1 id="site-title" class="wordmark">
        <span>webaudio</span><span>hub</span>
      </h1>
      <p class="lede">
        A curated directory of instruments, sequencers and sound toys that play
        in your browser. Nothing to install. Find one, open it, make a noise.
      </p>
    </div>

    <div class="control" aria-label="Random app">
      <div class="grille" aria-hidden="true"></div>
      <div class="deck">
        <a
          class="play"
          class:pressed
          href={next?.url}
          target="_blank"
          rel="noopener noreferrer"
          onclick={press}
          aria-describedby="next-readout"
        >
          <span class="cap" aria-hidden="true"></span>
          <span class="visually-hidden">Open a random app</span>
        </a>
        <div class="readout" id="next-readout" aria-live="polite">
          <span class="readout-label">Up next, from {count}</span>
          <span class="readout-name">{next?.name ?? 'Nothing matches'}</span>
          <span class="readout-host">{next ? hostOf(next.url) : '—'}</span>
        </div>
        <button class="key" type="button" onclick={onroll}>Roll again</button>
      </div>
    </div>
  </div>
</section>

<style>
  .faceplate {
    border-bottom: 1px solid var(--seam);
    background: var(--panel);
  }

  .grid {
    display: grid;
    gap: 32px;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  @media (min-width: 880px) {
    .grid {
      grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
      align-items: center;
      padding-top: 64px;
      padding-bottom: 64px;
    }
  }

  .wordmark {
    margin: 0;
    font-size: var(--step-4);
    line-height: 0.9;
    font-weight: 800;
    font-variation-settings: 'wdth' 125;
    letter-spacing: -0.02em;
  }

  .wordmark span {
    display: block;
  }

  .wordmark span + span {
    font-weight: 300;
    color: var(--slate);
  }

  .lede {
    max-width: 34em;
    margin: 24px 0 0;
    font-size: var(--step-1);
    line-height: 1.5;
    color: var(--slate);
  }

  .control {
    position: relative;
    display: grid;
    gap: 20px;
    padding: 20px;
    border: 1px solid var(--seam);
    border-radius: var(--radius-panel);
    background: var(--panel-sunk);
  }

  .grille {
    height: 88px;
    border-radius: var(--radius-key);
    background-image: radial-gradient(
      circle,
      color-mix(in srgb, var(--ink) 38%, transparent) 1.6px,
      transparent 2px
    );
    background-size: 11px 11px;
    background-position: center;
  }

  .deck {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    grid-template-areas:
      'play readout'
      'play key';
    gap: 12px 18px;
    align-items: center;
  }

  .play {
    grid-area: play;
    position: relative;
    display: grid;
    place-items: center;
    width: 112px;
    height: 112px;
    border-radius: 50%;
    background: var(--panel);
    box-shadow:
      inset 0 0 0 1px var(--seam),
      0 1px 0 rgb(255 255 255 / 0.5);
    text-decoration: none;
  }

  .cap {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    background: radial-gradient(
      circle at 38% 32%,
      color-mix(in srgb, var(--signal) 70%, white),
      var(--signal) 58%
    );
    box-shadow:
      0 3px 0 color-mix(in srgb, var(--signal) 60%, black),
      0 6px 14px rgb(0 0 0 / 0.18);
    transition:
      transform 120ms ease,
      box-shadow 120ms ease;
  }

  .play:hover .cap {
    transform: translateY(-1px);
  }

  .play:active .cap,
  .play.pressed .cap {
    transform: translateY(3px);
    box-shadow:
      0 0 0 color-mix(in srgb, var(--signal) 60%, black),
      0 2px 6px rgb(0 0 0 / 0.2);
  }

  .readout {
    grid-area: readout;
    display: grid;
    gap: 2px;
    min-width: 0;
    padding: 10px 12px;
    border-radius: var(--radius-key);
    background: var(--display);
    color: #f4f4ef;
  }

  .readout-label {
    font-size: var(--step--1);
    color: #9c9d98;
  }

  .readout-name {
    overflow: hidden;
    font-size: var(--step-1);
    font-weight: 650;
    font-variation-settings: 'wdth' 112;
    color: var(--signal);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .readout-host {
    overflow: hidden;
    font-size: var(--step--1);
    color: #c9cac5;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .key {
    grid-area: key;
    justify-self: start;
    padding: 7px 14px;
    border: 1px solid var(--seam);
    border-radius: var(--radius-key);
    background: var(--panel);
    box-shadow: 0 1px 0 var(--seam);
    cursor: pointer;
  }

  .key:active {
    transform: translateY(1px);
    box-shadow: none;
  }
</style>
