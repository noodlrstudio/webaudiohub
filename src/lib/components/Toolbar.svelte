<script lang="ts">
  import type { SortMode, ViewMode } from '../types';

  let {
    query = $bindable(''),
    sort = $bindable<SortMode>('shuffle'),
    view = $bindable<ViewMode>('grid'),
    audiframeOnly = $bindable(false),
    hideUnreachable = $bindable(false),
    onsubmit,
  }: {
    query: string;
    sort: SortMode;
    view: ViewMode;
    audiframeOnly: boolean;
    hideUnreachable: boolean;
    onsubmit: () => void;
  } = $props();
</script>

<div class="toolbar">
  <label class="search">
    <span class="visually-hidden">Search apps</span>
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="M13 13l4.5 4.5" />
    </svg>
    <input
      type="search"
      placeholder="Search by name, tag or site"
      bind:value={query}
      autocomplete="off"
      spellcheck="false"
    />
  </label>

  <div class="switches">
    <div class="switch" role="group" aria-label="Order">
      <button
        type="button"
        aria-pressed={sort === 'shuffle'}
        onclick={() => (sort = 'shuffle')}>Shuffle</button
      >
      <button
        type="button"
        aria-pressed={sort === 'alphabetical'}
        onclick={() => (sort = 'alphabetical')}>A–Z</button
      >
    </div>

    <div class="switch" role="group" aria-label="Layout">
      <button
        type="button"
        aria-pressed={view === 'grid'}
        onclick={() => (view = 'grid')}>Grid</button
      >
      <button
        type="button"
        aria-pressed={view === 'list'}
        onclick={() => (view = 'list')}>List</button
      >
    </div>

    <label class="toggle">
      <input type="checkbox" bind:checked={audiframeOnly} />
      <span class="track" aria-hidden="true"></span>
      audiframe apps
    </label>

    <label class="toggle">
      <input type="checkbox" bind:checked={hideUnreachable} />
      <span class="track" aria-hidden="true"></span>
      Hide unreachable
    </label>

    <button type="button" class="add" onclick={onsubmit}>Add an app</button>
  </div>
</div>

<style>
  .toolbar {
    display: grid;
    gap: 12px;
  }

  @media (min-width: 1000px) {
    .toolbar {
      grid-template-columns: minmax(240px, 1fr) auto;
      align-items: center;
    }
  }

  .search {
    position: relative;
    display: block;
  }

  .search svg {
    position: absolute;
    top: 50%;
    left: 12px;
    width: 18px;
    height: 18px;
    transform: translateY(-50%);
    fill: none;
    stroke: var(--slate);
    stroke-width: 1.6;
    stroke-linecap: round;
    pointer-events: none;
  }

  .search input {
    width: 100%;
    height: 44px;
    padding: 0 12px 0 38px;
    border: 1px solid var(--seam);
    border-radius: var(--radius-key);
    background: var(--panel);
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.06);
  }

  .search input::placeholder {
    color: var(--slate);
  }

  .switches {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 16px;
  }

  .switch {
    display: inline-flex;
    padding: 2px;
    border: 1px solid var(--seam);
    border-radius: var(--radius-key);
    background: var(--panel-sunk);
  }

  .switch button {
    min-height: 36px;
    padding: 0 12px;
    border: 0;
    border-radius: 2px;
    background: transparent;
    color: var(--slate);
    cursor: pointer;
  }

  .switch button[aria-pressed='true'] {
    background: var(--panel);
    color: var(--ink);
    box-shadow: 0 1px 0 var(--seam);
  }

  .toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 36px;
    cursor: pointer;
    user-select: none;
  }

  .toggle input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }

  .track {
    position: relative;
    width: 34px;
    height: 18px;
    border-radius: 9px;
    background: var(--panel-sunk);
    box-shadow: inset 0 0 0 1px var(--seam);
    transition: background-color 150ms ease;
  }

  .track::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--panel);
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
    transition: transform 150ms ease;
  }

  .toggle input:checked + .track {
    background: var(--signal);
    box-shadow: none;
  }

  .toggle input:checked + .track::after {
    transform: translateX(16px);
  }

  .toggle input:focus-visible + .track {
    outline: 2px solid var(--focus);
    outline-offset: 2px;
  }

  .add {
    min-height: 38px;
    padding: 0 16px;
    border: 1px solid var(--ink);
    border-radius: var(--radius-key);
    background: var(--ink);
    color: var(--base);
    font-weight: 600;
    cursor: pointer;
  }

  .add:hover {
    background: color-mix(in srgb, var(--ink) 85%, var(--signal));
  }
</style>
